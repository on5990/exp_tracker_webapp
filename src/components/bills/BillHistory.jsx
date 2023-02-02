import React, { useEffect, useState } from "react";
import { EXPENSE_CACHE } from "../../global/constants";
import Modal from "../modal/Modal";

function BillHistory({ _id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [expenseInfo, setExpenseInfo] = useState({});
  function openModal() {
    setIsOpen(true);
  }
  // console.log("CACHE EXPENSE", expenseInfo);
  useEffect(() => {
    let expenseCache = localStorage.getItem(EXPENSE_CACHE);
    if (expenseCache != null) {
      expenseCache = JSON.parse(expenseCache);
      const info = expenseCache.expenses?.filter((item) => item._billId == _id);
      setExpenseInfo(info);
      // setExpenseInfo(JSON.parse(expenseCache));
    }
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
        <table>
          <thead>
            <tr>
              <th>ASD</th>
              <th>ASD</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>asd</td>
              <td>asd</td>
            </tr>
          </tbody>
        </table>
      </Modal>
    </>
  );
}

export default BillHistory;
