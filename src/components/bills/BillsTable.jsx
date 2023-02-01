import React, { useContext, useEffect, useState } from "react";
import { BillContext } from "../../pages/dashboard/bills";
import formatHelpers from "../../lib/frontendHelpers/formatHelpers";
import BillHistory from "./BillHistory";
import DeleteBill from "./DeleteBill";
import EditBill from "./EditBill";
import PayBill from "./PayBill";
import { BILL_FINISHED } from "../../global/constants";
const head = [
  { id: 1, name: "Descripción" },
  { id: 2, name: "Valor cuota" },
  { id: 3, name: "Tipo" },
  { id: 4, name: "Cuotas" },
  { id: 5, name: "Cuotas pagadas" },
  { id: 6, name: "Primer pago" },
  { id: 7, name: "Pago final" },
  { id: 8, name: "Último pago" },
  { id: 9, name: "Próximo pago" },
  { id: 10, name: "Estado" },
  { id: 11, name: "" },
];
function BillsTable() {
  const { data } = useContext(BillContext);
  const [dataToShow, setDataToShow] = useState([]);
  useEffect(() => {
    setDataToShow(data);
  }, [, data]);
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
            {data.bills?.map((item) => {
              return (
                <tr className="tableTr" key={item._id}>
                  <td className="tableTd">{item.description}</td>
                  <td className="tableTd">{item.sum ? `$${item.sum}` : "-"}</td>
                  <td className="tableTd">{item.type}</td>
                  <td className="tableTd">{item.amount || "-"}</td>
                  <td className="tableTd">{item.payments}</td>
                  <td className="tableTd">
                    {item.firstPayment
                      ? formatHelpers.formatDate(item.firstPayment)
                      : "-"}
                  </td>
                  <td className="tableTd">
                    {item.finalPayment
                      ? formatHelpers.formatDate(item.finalPayment)
                      : "-"}
                  </td>
                  <td className="tableTd">
                    {item.lastPayment
                      ? formatHelpers.formatDate(item.lastPayment)
                      : "-"}
                  </td>
                  <td className="tableTd">
                    {item.nextPayment
                      ? formatHelpers.formatDate(item.nextPayment)
                      : "-"}
                  </td>
                  <td className="tableTd">{item.state}</td>
                  <td className="tableTd">
                    <div className="cellBtnDiv">
                      {item.state !== BILL_FINISHED && (
                        <PayBill _id={item._id} />
                      )}
                      <BillHistory _id={item._id} />
                      <EditBill _id={item._id} />
                      <DeleteBill _id={item._id} />
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

export default BillsTable;
