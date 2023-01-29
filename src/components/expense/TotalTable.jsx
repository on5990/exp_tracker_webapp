import React, { useContext } from "react";
import getHelpers from "../../lib/frontendHelpers/getHelpers";
import { ExpenseContext } from "../../pages/dashboard";

const head = [
  { id: 1, name: "Categoría" },
  { id: 2, name: "Cantidad de gastos" },
  { id: 3, name: "Total" },
];

function TotalTable() {
  const { data } = useContext(ExpenseContext);
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
            {data.categories?.map((item) => {
              return (
                <tr className="tableTr" key={item._id}>
                  <td className="tableTd">{item.name}</td>
                  <td className="tableTd">
                    {getHelpers.getPropCustomId(
                      item._id,
                      "_categoryId",
                      data.totalsByCategory,
                      "expenses"
                    ).length || 0}
                  </td>
                  <td className="tableTd">
                    $
                    {getHelpers.getPropCustomId(
                      item._id,
                      "_categoryId",
                      data.totalsByCategory,
                      "total"
                    ) || 0}
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

export default TotalTable;
