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
      <table>
        <thead>
          <tr>
            {head.map((item) => {
              return <th key={item.id}>{item.name}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {content.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.category}</td>
                <td>{item.amount}</td>
                <td>{item.spent}</td>
                <td>{item.available}</td>
                <td>{item.overExpense}</td>
                <td>{item.lastUpdate}</td>
                <td>{item.state}</td>
                <td>
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
    </>
  );
}

export default BudgetTable;
