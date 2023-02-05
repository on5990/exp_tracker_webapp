import {
  ACT_UPDATE,
  BILL_ACTIVE,
  BILL_FINISHED,
  BILL_OVERDUE,
  BUDGET_EXCEEDED,
  BUDGET_OK,
  MONTHLY_FIXED,
  MONTHLY_UND,
  YEARLY_FIXED,
  YEARLY_UND,
} from "@/global/constants";
import billValidation from "@/lib/backendHelpers/validations/bill.validation";
import budgetRepository from "@/repositories/budget.repository";
import categoryRepository from "@/repositories/category.repository";
import billService from "@/services/bill.service";
import budgetService from "@/services/budget.service";
import expenseService from "@/services/expense.service";
import mathService from "@/services/math.service";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
interface Data {
  description: string;
  sum: number;
  spentAt: Date;
  _userId: any;
  _categoryId: any;
  _billId: any;
  payments: number;
}
async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, body, query, headers } = req;
    const payload = headers.payload && JSON.parse(headers.payload as string);
    const userId = payload.id;
    const id = query.id?.toString() || "";
    // CHECK IF ID IS VALID
    const validId = mongoose.Types.ObjectId.isValid(id as string);
    if (!validId) {
      res.status(400);
      return res.json({ success: false, error: "Invalid id" });
    }
    // CHECK IF BILL EXISTS
    const bill = await billService.getOne(id);
    if (!bill) {
      res.status(404);
      return res.json({ success: false, error: "Bill not found" });
    }
    switch (method) {
      case "POST":
        // VALIDATE DATA FROM FRONTEND
        await billValidation.paySchema.validateAsync(body);
        // PREPARE DATA
        const { sum, date, periods } = body;
        const billCategory = await categoryRepository.createBillCategory();
        let data: Data = {
          description: `Pago de cuenta: ${bill.description}. Cuotas pagadas: ${periods}`,
          sum,
          spentAt: new Date(date),
          _userId: userId,
          _categoryId: billCategory._id,
          _billId: id,
          payments: periods,
        };
        // CREATE EXPENSE
        await expenseService.create(data);
        // PREPARE BILL UPDATE
        let payments = +bill.payments + +periods;
        let state = BILL_ACTIVE;
        const argLastPayment =
          bill.lastPayment == undefined
            ? new Date(
                new Date(date).getFullYear(),
                new Date(date).getMonth(),
                0
              )
            : bill.lastPayment;

        // console.log("ARG ", argLastPayment);
        let last = mathService.calcLastPayment(
          bill.lastPayment || argLastPayment,
          periods,
          bill.type,
          ACT_UPDATE
        );
        let next: Date | Boolean = new Date();
        if (bill.type == MONTHLY_FIXED || bill.type == YEARLY_FIXED) {
          next = new Date(last as Date);
        }
        if (bill.amount == payments) {
          state = BILL_FINISHED;
        } else if (bill.amount == undefined || bill.amount > payments) {
          next = mathService.calcLastPayment(last, 1, bill.type, ACT_UPDATE);
        }
        if (new Date().getTime() > new Date(next as Date).getTime()) {
          state = BILL_OVERDUE;
        }
        if (bill.amount < payments) {
          payments = bill.amount;
          state = BILL_FINISHED;
        }
        let _data = {
          payments,
          state,
          lastPayment: new Date(last as Date),
          nextPayment: new Date(next as Date),
        };
        // console.log("BILL UPDATE", _data);
        // UPDATE BILL
        await billService.update(id, _data);
        // UPDATE BUDGET
        const budget = await budgetRepository.getByCategory(billCategory._id);
        if (budget) {
          const lastExpense = new Date(date);
          const usedAmount = +budget.usedAmount + +sum;
          const state = budget.sum < usedAmount ? BUDGET_EXCEEDED : BUDGET_OK;
          console.log("BUDGET UPDATE", { lastExpense, usedAmount, state });
          await budgetService.update(budget._id, {
            lastExpense,
            usedAmount,
            state,
          });
        }
        // GET BILLS
        const bills = await billService.getAll(userId);
        const monthTotal = mathService.calcBillMonth(bills || []);
        const yearTotal = mathService.calcBillYear(bills || []);
        // SUCCESSFUL REQUEST
        res.status(200);
        return res.json({
          success: true,
          data: { bills, monthTotal, yearTotal },
        });
      default:
        res.status(404);
        return res.json({ success: false, error: "Route not found" });
    }
  } catch (error) {
    res.status(400);
    return res.json({ success: false, error });
  }
}
export default handler;
