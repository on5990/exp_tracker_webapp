import React, { useEffect, useState } from "react";
import {
  EXPENSE_CACHE,
  REQUEST_EXPENSE,
  REQUEST_FALSE,
} from "../../global/constants";
import formatHelpers from "../../lib/frontendHelpers/formatHelpers";
import Modal from "../modal/Modal";

const tableHeaders = [
  { id: "1", name: "Monto pagado" },
  { id: "2", name: "Fecha" },
  { id: "3", name: "Cuotas pagadas" },
];

function BillHistory({ _id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [expenseInfo, setExpenseInfo] = useState([]);
  function openModal() {
    setIsOpen(true);
  }
  useEffect(() => {
    let expenseCache = localStorage.getItem(EXPENSE_CACHE);
    let shouldRequest = localStorage.getItem(REQUEST_EXPENSE);
    shouldRequest = shouldRequest ? JSON.parse(shouldRequest) : false;
    // console.log("SHOULD", shouldRequest != null && shouldRequest.request);
    if (
      expenseCache != null &&
      shouldRequest != null &&
      !shouldRequest.request
    ) {
      expenseCache = JSON.parse(expenseCache);
      const info = expenseCache.expenses?.filter((item) => item._billId == _id);
      setExpenseInfo(info);
    }
    // else {
    //   const getData = async () => {
    //     const response = await fetch("/api/expense", { method: "GET" });
    //     let content = await response.json();
    //     content = content.data;
    //     console.log("CONTTENT", content);
    //     if (response.ok) {
    //       let expenses = content.expenses;
    //       const info = expenses.filter((item) => item._billId == _id);
    //       console.log("INFO", info);
    //       setExpenseInfo(info);
    //       localStorage.setItem(EXPENSE_CACHE, JSON.stringify(content));
    //       localStorage.setItem(REQUEST_EXPENSE, JSON.stringify(REQUEST_FALSE));
    //     } else {
    //       console.log(content);
    //     }
    //   };
    //   getData();
    // }
  }, []);
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
