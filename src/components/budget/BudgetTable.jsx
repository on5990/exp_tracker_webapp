import { nanoid } from "nanoid";
import React, { useContext, useEffect, useState } from "react";
import { BudgetContext } from "../../pages/dashboard/budgets";
import DeleteBudget from "./DeleteBudget";
import EditBudget from "./EditBudget";
import formatHelpers from "../../lib/frontendHelpers/formatHelpers";

const head = [
  { id: 1, name: "Categoría", styleClass: "thSmall" },
  { id: 2, name: "Presupuesto", styleClass: "thMed" },
  { id: 3, name: "Gastado", styleClass: "thMed" },
  { id: 4, name: "Disponible", styleClass: "thMed" },
  { id: 5, name: "Exceso", styleClass: "thMed" },
  { id: 6, name: "Última actualización", styleClass: "thMed" },
  { id: 7, name: "Estado", styleClass: "thSmall" },
  { id: 8, name: "", styleClass: "thMed" },
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
                  <th className={`tableTh ${item.styleClass}`} key={nanoid()}>
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
                  <td className="tableTd">
                    {item.sum || item.sum == 0 ? `$${item.sum}` : "-"}
                  </td>
                  <td className="tableTd">
                    {item.usedAmount || item.usedAmount == 0
                      ? `$${item.usedAmount}`
                      : "-"}
                  </td>
                  <td className="tableTd">
                    {item.availableAmount || item.availableAmount == 0
                      ? `$${item.availableAmount}`
                      : "-"}
                  </td>
                  <td className="tableTd">
                    {item.excessAmount || item.excessAmount == 0
                      ? `$${item.excessAmount}`
                      : "-"}
                  </td>
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
