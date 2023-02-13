import React, { useContext, useEffect, useState } from "react";
import { BillContext } from "../../pages/dashboard/bills";
import formatHelpers from "../../lib/frontendHelpers/formatHelpers";
import BillHistory from "./BillHistory";
import DeleteBill from "./DeleteBill";
import EditBill from "./EditBill";
import PayBill from "./PayBill";
import { BILL_FINISHED } from "../../global/constants";
const head = [
  { id: 1, name: "Descripción", styleClass: "thBig" },
  { id: 2, name: "Valor cuota", styleClass: "thMed" },
  { id: 3, name: "Tipo", styleClass: "thMed" },
  { id: 4, name: "Cuotas", styleClass: "thSmall" },
  { id: 5, name: "Cuotas pagadas", styleClass: "thSmall" },
  { id: 6, name: "Primer pago", styleClass: "thMed" },
  { id: 7, name: "Pago final", styleClass: "thMed" },
  { id: 8, name: "Último pago", styleClass: "thMed" },
  { id: 9, name: "Próximo pago", styleClass: "thMed" },
  { id: 10, name: "Total pagado", styleClass: "thMed" },
  { id: 11, name: "Total restante", styleClass: "thMed" },
  { id: 12, name: "Estado", styleClass: "thSmall" },
  { id: 13, name: "", styleClass: "thMed" },
];
function BillsTable() {
  const { data, search } = useContext(BillContext);
  const [dataToShow, setDataToShow] = useState([]);
  useEffect(() => {
    const info = data.bills?.filter((item) =>
      item.description.toLowerCase().includes(search.toLowerCase())
    );
    setDataToShow({ ...data, bills: info });
  }, [, data, search]);
  return (
    <>
      <div className="tableContainer">
        <table className="infoTable">
          <thead>
            <tr className="tableTr">
              {head.map((item) => {
                return (
                  <th className={`tableTh ${item.styleClass}`} key={item.id}>
                    {item.name}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {dataToShow.bills?.map((item) => {
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
                  <td className="tableTd">
                    {item.totalPaid || item.totalPaid == 0
                      ? `$${item.totalPaid}`
                      : "-"}
                  </td>
                  <td className="tableTd">
                    {item.totalRemaining && item.totalRemaining != -1
                      ? `$${item.totalRemaining}`
                      : "-"}
                  </td>
                  <td className="tableTd">{item.state}</td>
                  <td className="tableTd">
                    <div className="cellBtnDiv">
                      {item.state !== BILL_FINISHED && (
                        <PayBill billData={item} />
                      )}
                      <BillHistory _id={item._id} />
                      <EditBill billData={item} />
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
