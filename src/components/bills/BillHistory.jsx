import React, { useEffect, useState } from "react";
import { EXPENSE_CACHE, REQUEST_EXPENSE } from "../../global/constants";
import formatHelpers from "../../lib/frontendHelpers/formatHelpers";
import expenseRequest from "../../lib/frontendHelpers/requests/expense.request";
import Modal from "../modal/Modal";
import DelPayment from "./DelPayment";

const tableHeaders = [
  { id: "1", name: "Monto pagado" },
  { id: "2", name: "Fecha" },
  { id: "3", name: "Cuotas pagadas" },
  { id: "4", name: "Eliminar" },
];

function BillHistory({ _id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [expenseInfo, setExpenseInfo] = useState([]);
  function openModal() {
    setIsOpen(true);
  }
  useEffect(() => {
    let expenseCache = localStorage.getItem(EXPENSE_CACHE);
    let shouldRequest = localStorage.getItem(REQUEST_EXPENSE);
    shouldRequest = shouldRequest ? JSON.parse(shouldRequest) : false;
    if (
      expenseCache != null &&
      shouldRequest != null &&
      !shouldRequest.request
    ) {
      console.log("HISTORY FROM CACHE");
      expenseCache = JSON.parse(expenseCache);
      const info = expenseCache.expenses?.filter((item) => item._billId == _id);
      setExpenseInfo(info);
    } else {
      console.log("HISTORY FROM SERVER");
      const getData = async () => {
        const response = await expenseRequest.get();
        const info = response.expenses?.filter((item) => item._billId == _id);
        setExpenseInfo(info);
      };
      getData();
    }
  }, [, isOpen, reload]);
  function closeModal(e) {
    e.preventDefault();
    setIsOpen(false);
  }
  return (
    <>
      <button onClick={openModal}>Historial</button>
      <Modal
        title={"Historial de pagos"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
      >
        <div className="tableContainer">
          <table className="modalTable">
            <thead>
              <tr className="modalTr">
                {tableHeaders.map((item) => {
                  return (
                    <th className="modalTh" key={item.id}>
                      {item.name}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {expenseInfo.map((item) => {
                return (
                  <tr key={item._id} className="modalTr">
                    <td className="modalTd">${item.sum}</td>
                    <td className="modalTd">
                      {formatHelpers.formatTime(item.spentAt)}
                    </td>
                    <td className="modalTd">{item.payments}</td>
                    <td className="modalTd">
                      <DelPayment _id={item._id} setReload={setReload} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Modal>
    </>
  );
}

export default BillHistory;
