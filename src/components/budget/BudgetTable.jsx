import { nanoid } from "nanoid";
import React, { useContext, useEffect, useState } from "react";
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
function BudgetTable() {
  const { data, search } = useContext(BudgetContext);
  const [dataToShow, setDataToShow] = useState([]);
  useEffect(() => {
    const info = data.budgets?.filter((item) =>
      item.categoryName.toLowerCase().includes(search.toLowerCase())
    );
    setDataToShow({ ...data, budgets: info });
  }, [, data, search]);
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
            {dataToShow.budgets?.map((item) => {
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
