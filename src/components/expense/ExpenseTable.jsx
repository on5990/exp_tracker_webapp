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
                  <td className="tableTd">{item.description}</td>
                  <td className="tableTd">{item.amount}</td>
                  <td className="tableTd">{item.date}</td>
                  <td className="tableTd">{item.category}</td>
                  <td className="tableTd">
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
      </div>
    </>
  );
}

export default ExpenseTable;
