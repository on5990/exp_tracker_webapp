import React from "react";
import DeleteExpense from "./DeleteExpense";
import EditExpense from "./EditExpense";
import formatHelpers from "../../lib/frontendHelpers/formatHelpers";

const head = [
  { id: 1, name: "Descripción" },
  { id: 2, name: "Cantidad" },
  { id: 3, name: "Fecha" },
  { id: 4, name: "Categoría" },
  { id: 5, name: "" },
];

function ExpenseTable({ data }) {
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
            {data.expenses?.map((item) => {
              return (
                <tr className="tableTr" key={item._id}>
                  <td className="tableTd">{item.description}</td>
                  <td className="tableTd">{item.sum}</td>
                  <td className="tableTd">
                    {formatHelpers.formatTime(item.spentAt)}
                  </td>
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
