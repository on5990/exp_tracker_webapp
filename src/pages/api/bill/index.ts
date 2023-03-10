import {
  ACT_CREATE,
  ACT_UPDATE,
  BILL_ACTIVE,
  BILL_CATEGORY,
  BILL_FINISHED,
  BILL_OVERDUE,
  BUDGET_EXCEEDED,
  BUDGET_OK,
  MONTHLY_FIXED,
  YEARLY_FIXED,
} from "@/global/constants";
import billValidation from "@/lib/backendHelpers/validations/bill.validation";
import budgetRepository from "@/repositories/budget.repository";
import billService from "@/services/bill.service";
import budgetService from "@/services/budget.service";
import categoryService from "@/services/category.service";
import expenseService from "@/services/expense.service";
import mathService from "@/services/math.service";
import { NextApiRequest, NextApiResponse } from "next";
import { isDate } from "util/types";

interface Data {
  description: string;
  sum?: number;
  type: string;
  firstPayment?: Date;
  amount?: number;
  payments?: number;
  nextPayment?: Date;
  lastPayment?: Date;
  _userId?: string;
  state?: string;
  finalPayment?: Date;
  totalPaid?: number;
  totalRemaining?: number;
}

async function index(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, body, headers } = req;
    const payload = headers.payload && JSON.parse(headers.payload as string);
    const userId = payload.id;
    switch (method) {
      case "GET":
        // GET BILLS
        let bills = await billService.getAll(userId);
        const changeState = await billService.checkAndUpdate(bills);
        if (changeState) {
          bills = await billService.getAll(userId);
        }
        const monthTotal = mathService.calcBillMonth(bills || []);
        const yearTotal = mathService.calcBillYear(bills || []);
        // SUCCESSFUL REQUEST
        res.status(200);
        return res.json({
          success: true,
          data: { bills, monthTotal, yearTotal },
        });
      case "POST":
        // VALIDATE DATA FROM FRONTEND
        await billValidation.addSchema.validateAsync(body);
        // PREPARE DATA
        const { description, sum, type, firstPayment, amount, payments } = body;
        let data: Data = { description, type, _userId: userId };
        // IF SUM EXISTS --> ADD TO DATA
        if (sum) data = { ...data, sum };
        // IF FIRST PAYMENT EXISTS --> ADD TO DATA, ELSE FIRST PAYMENT IS NOW
        if (firstPayment) data = { ...data, firstPayment };
        else if (!firstPayment) {
          data = { ...data, firstPayment: new Date() };
        }
        // IF AMOUNT EXISTS --> ADD TO DATA
        if (amount) data = { ...data, amount };
        // IF PAYMENTS EXISTS --> ADD TO DATA
        if (payments) {
          data = { ...data, payments };
        } else {
          data = { ...data, payments: 0 };
        }
        // CALCULATE LAST PAYMENT AND NEXT PAYMENT
        let last = null;
        let next = null;
        last = mathService.calcLastPayment(
          data.firstPayment,
          data.payments || 0,
          data.type,
          ACT_CREATE
        );
        next = mathService.calcLastPayment(last, 1, data.type, ACT_UPDATE);
        // IF FIRST PAYMENT > LAST PAYMENT
        if (
          isDate(last) &&
          new Date(data.firstPayment as Date).getTime() >
            new Date(last).getTime()
        ) {
          last = false;
          next = new Date(data.firstPayment as Date);
        }
        // IF LAST PAYMENT EXISTS --> ADD TO DATA
        if (last && isDate(last)) data = { ...data, lastPayment: last };
        // IF NEXT PAYMENT EXISTS --> ADD TO DATA
        if (next && isDate(next)) data = { ...data, nextPayment: next };

        // CALCULATE FINAL PAYMENT
        // IF AMOUNT OF PAYMENTS IS UNDEFINED --> FINAL PAYMENT IS NOT SAVED
        if (data.type === MONTHLY_FIXED || data.type === YEARLY_FIXED) {
          const finalPayment = mathService.calcFinalPayment(
            data.firstPayment as Date,
            data.amount as number,
            data.type
          );
          data = { ...data, finalPayment };
        }

        // GET STATE
        let state = BILL_ACTIVE;
        if (data.payments == data.amount) {
          state = BILL_FINISHED;
          data = { ...data, nextPayment: data.lastPayment };
        } else if (
          data.nextPayment &&
          new Date().getTime() > new Date(data.nextPayment).getTime()
        ) {
          state = BILL_OVERDUE;
        }
        data = { ...data, state };
        // CALCULATE TOTAL PAID
        const totalPaid = mathService.calcTotalPaid2(
          data.payments || 0,
          data.sum || 0
        );
        // CALCULATE TOTAL REMAINING
        const totalRemaining = mathService.calcTotalRemaining(
          data.payments,
          data.sum,
          data.amount
        );

        data = { ...data, totalPaid };

        data = { ...data, totalRemaining };
        // CREATE BILL
        const bill = await billService.create(data);
        // CREATE EXPENSE
        const billCategory = await categoryService.getByName(BILL_CATEGORY);
        console.log("DATA PAYMENTS CHECK", data.payments);
        if (data.payments && data.payments > 0) {
          console.log("DDDDDDDDDDDDDdd");
          const exp = await expenseService.create({
            description: `Pago de cuenta "${data.description}". Cuotas pagadas: ${data.payments}`,
            sum: totalPaid,
            spentAt: data.firstPayment,
            _userId: userId,
            payments: bill.payments,
            _billId: bill._id,
            _categoryId: billCategory._id,
          });
          console.log("EXXXXXXXXXP", exp);
          const budget = await budgetRepository.getByCategory(billCategory._id);
          if (budget) {
            const lastExpense = new Date(data.firstPayment as Date);
            const usedAmount = +budget.usedAmount + +exp.sum;
            const state = budget.sum < usedAmount ? BUDGET_EXCEEDED : BUDGET_OK;
            await budgetService.update(budget._id, {
              lastExpense,
              usedAmount,
              state,
            });
          }
        }
        // UPDATE BUDGET

        // GET BILLS
        const _bills = await billService.getAll(userId);
        const _monthTotal = mathService.calcBillMonth(_bills || []);
        const _yearTotal = mathService.calcBillYear(_bills || []);
        // SUCCESSFUL REQUEST
        res.status(200);
        return res.json({
          success: true,
          data: {
            bills: _bills,
            monthTotal: _monthTotal,
            yearTotal: _yearTotal,
          },
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
export default index;
