import React from "react";
import DeleteBudget from "./DeleteBudget";
import EditBudget from "./EditBudget";

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
  return (
    <>
      <div className="tableContainer">
        <table className="infoTable">
          <thead>
            <tr className="tableTr">
              {head.map((item) => {
                return (
                  <th className="tableTh" key={item.id}>
                    {item.name}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {content.map((item) => {
              return (
                <tr className="tableTr" key={item.id}>
                  <td className="tableTd">{item.category}</td>
                  <td className="tableTd">{item.amount}</td>
                  <td className="tableTd">{item.spent}</td>
                  <td className="tableTd">{item.available}</td>
                  <td className="tableTd">{item.overExpense}</td>
                  <td className="tableTd">{item.lastUpdate}</td>
                  <td className="tableTd">{item.state}</td>
                  <td className="tableTd">
                    <div className="cellBtnDiv">
                      <EditBudget />
                      <DeleteBudget />
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
