import React, { useContext, useEffect, useState } from "react";
import DeleteExpense from "./DeleteExpense";
import EditExpense from "./EditExpense";
import formatHelpers from "../../lib/frontendHelpers/formatHelpers";
import getHelpers from "../../lib/frontendHelpers/getHelpers";
import { ExpenseContext } from "../../pages/dashboard";
import { CATEGORY } from "../../global/constants";

const head = [
  { id: 1, name: "Descripción" },
  { id: 2, name: "Cantidad" },
  { id: 3, name: "Fecha" },
  { id: 4, name: "Categoría" },
  { id: 5, name: "" },
];

function ExpenseTable() {
  const { data, parameters } = useContext(ExpenseContext);
  const { dataToShow, setDataToShow } = useState([]);
  useEffect(() => {
    // NOTHING IS SELECTED OR SHOWTYPE === CATEGORY
    if (
      parameters.showType === CATEGORY ||
      (parameters.category?._id === "" && parameters.timeType === "")
    ) {
      console.log("NO PARAMETERS");
    }
    // IF ONLY CATEGORY IS SELECTED
    // IF ONLY TIME IS SELECTED
    // IF BOTH CATEGORY AND TIME ARE SELECTED
    console.log("PARAMS CHANGED");
  }, [parameters]);
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
                  <td className="tableTd">${item.sum}</td>
                  <td className="tableTd">
                    {formatHelpers.formatTime(item.spentAt)}
                  </td>
                  <td className="tableTd">
                    {
                      getHelpers.getById(item._categoryId, data.categories)
                        ?.name
                    }
                  </td>
                  <td className="tableTd">
                    <div className="cellBtnDiv">
                      <button>Subir</button>
                      <button>Descargar</button>
                      <EditExpense _id={item._id} />
                      <DeleteExpense _id={item._id} />
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
