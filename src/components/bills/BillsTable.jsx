import React, { useContext } from "react";
import { BillContext } from "../../pages/dashboard/bills";
import BillHistory from "./BillHistory";
import DeleteBill from "./DeleteBill";
import EditBill from "./EditBill";
import PayBill from "./PayBill";
const head = [
  { id: 1, name: "Descripción" },
  { id: 2, name: "Tipo" },
  { id: 3, name: "Cantidad" },
  { id: 4, name: "Primer pago" },
  { id: 5, name: "Pago final" },
  { id: 6, name: "Último pago" },
  { id: 7, name: "Próximo pago" },
  { id: 8, name: "Estado" },
  { id: 9, name: "" },
];
const content = [
  {
    _id: 1,
    description: "Descripción...",
    type: "Mensual",
    amount: "$100",
    firstPayment: "05-01-2023",
    finalPayment: "05-01-2023",
    lastPayment: "05-01-2023",
    nextPayment: "05-01-2023",
    state: "Atrasado",
  },
  {
    _id: 2,
    description: "Descripción...",
    type: "Mensual",
    amount: "$100",
    firstPayment: "05-01-2023",
    finalPayment: "05-01-2023",
    lastPayment: "05-01-2023",
    nextPayment: "05-01-2023",
    state: "Atrasado",
  },
  {
    _id: 2,
    description: "Descripción...",
    type: "Mensual",
    amount: "$100",
    firstPayment: "05-01-2023",
    finalPayment: "05-01-2023",
    lastPayment: "05-01-2023",
    nextPayment: "05-01-2023",
    state: "Atrasado",
  },
];
function BillsTable() {
  const { data } = useContext(BillContext);
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
                <tr className="tableTr" key={item._id}>
                  <td className="tableTd">{item.description}</td>
                  <td className="tableTd">{item.type}</td>
                  <td className="tableTd">{item.amount}</td>
                  <td className="tableTd">{item.firstPayment}</td>
                  <td className="tableTd">{item.finalPayment}</td>
                  <td className="tableTd">{item.lastPayment}</td>
                  <td className="tableTd">{item.nextPayment}</td>
                  <td className="tableTd">{item.state}</td>
                  <td className="tableTd">
                    <div className="cellBtnDiv">
                      <PayBill _id={item._id} />
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
