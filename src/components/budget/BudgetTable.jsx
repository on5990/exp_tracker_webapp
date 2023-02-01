import { nanoid } from "nanoid";
import React, { useContext } from "react";
import { BudgetContext } from "../../pages/dashboard/budgets";
import DeleteBudget from "./DeleteBudget";
import EditBudget from "./EditBudget";
import formatHelpers from "../../lib/frontendHelpers/formatHelpers";

const head = [
  { id: 1, name: "Categoría" },
  { id: 1, name: "Presupuesto" },
  { id: 1, name: "Gastado" },
  { id: 1, name: "Disponible" },
  { id: 1, name: "Exceso" },
  { id: 1, name: "Última actualización" },
  { id: 1, name: "Estado" },
  { id: 1, name: "" },
];
const content = [
  {
    id: 1,
    category: "Transporte",
    amount: "$1000",
    spent: "$600",
    available: "$400",
    overExpense: "$0",
    lastUpdate: "20/01/2023",
    state: "Ok",
  },
  {
    id: 2,
    category: "Transporte",
    amount: "$1000",
    spent: "$1200",
    available: "$0",
    overExpense: "$200",
    lastUpdate: "20/01/2023",
    state: "Excedido",
  },
  {
    id: 1,
    category: "Transporte",
    amount: "$1000",
    spent: "$600",
    available: "$400",
    overExpense: "$0",
    lastUpdate: "20/01/2023",
    state: "Ok",
  },
];
function BudgetTable() {
  const { data } = useContext(BudgetContext);
  return (
    <>
      <div className="tableContainer">
        <table className="infoTable">
          <thead>
            <tr className="tableTr">
              {head.map((item) => {
                return (
                  <th className="tableTh" key={nanoid()}>
                    {item.name}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.budgets?.map((item) => {
              return (
                <tr className="tableTr" key={item._id}>
                  <td className="tableTd">{item.categoryName}</td>
                  <td className="tableTd">{item.sum}</td>
                  <td className="tableTd">{item.usedAmount}</td>
                  <td className="tableTd">{item.availableAmount}</td>
                  <td className="tableTd">{item.excessAmount}</td>
                  <td className="tableTd">
                    {item.lastExpense
                      ? formatHelpers.formatTime(item.lastExpense)
                      : "-"}
                  </td>
                  <td className="tableTd">{item.state}</td>
                  <td className="tableTd">
                    <div className="cellBtnDiv">
                      <EditBudget _id={item._id} />
                      <DeleteBudget _id={item._id} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default BudgetTable;
