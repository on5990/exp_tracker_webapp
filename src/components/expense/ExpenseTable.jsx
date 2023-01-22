import React from "react";
import DeleteExpense from "./DeleteExpense";
import EditExpense from "./EditExpense";

const head = [
  { id: 1, name: "Descripción" },
  { id: 2, name: "Cantidad" },
  { id: 3, name: "Fecha" },
  { id: 4, name: "Categoría" },
  { id: 5, name: "" },
];
const content = [
  {
    id: 1,
    description: "Descripción...",
    amount: "$100",
    date: "05-01-2023",
    category: "Abarrotes",
  },
  {
    id: 2,
    description: "Descripción...",
    amount: "$100",
    date: "05-01-2023",
    category: "Abarrotes",
  },
  {
    id: 3,
    description: "Descripción...",
    amount: "$100",
    date: "05-01-2023",
    category: "Abarrotes",
  },
  {
    id: 4,
    description: "Descripción...",
    amount: "$100",
    date: "05-01-2023",
    category: "Abarrotes",
  },
];

function ExpenseTable() {
  return (
    <>
      <table className="expenseTable">
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
                <td>{item.description}</td>
                <td>{item.amount}</td>
                <td>{item.date}</td>
                <td>{item.category}</td>
                <td>
                  <div className="cellBtnDiv">
                    <button>Subir</button>
                    <button>Descargar</button>
                    <EditExpense />
                    <DeleteExpense />
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

export default ExpenseTable;
