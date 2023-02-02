import React, { useContext, useEffect, useState } from "react";
import Modal from "../modal/Modal";
import Datetime from "react-datetime";
import formatHelpers from "@/lib/frontendHelpers/formatHelpers";
import { BillContext } from "../../pages/dashboard/bills";
import getHelpers from "../../lib/frontendHelpers/getHelpers";
import { REQUEST_EXPENSE, REQUEST_TRUE } from "../../global/constants";

function PayBill({ _id }) {
  const { data, setData } = useContext(BillContext);
  const [bill, setBill] = useState({ amount: "", payments: "" });
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({
    sum: "",
    date: new Date(),
    periods: "",
  });
  const [errors, setErrors] = useState({ sum: "", periods: "" });
  function openModal() {
    setIsOpen(true);
  }
  useEffect(() => {
    const found = getHelpers.getById(_id, data.bills);
    setBill(found);
  }, [, data]);
  function closeModal(e) {
    e.preventDefault();
    setIsOpen(false);
    setInput((prev) => {
      return { ...prev, sum: "", date: new Date(), periods: "" };
    });
    setErrors((prev) => {
      return { ...prev, sum: "", periods: "" };
    });
    setInput((prev) => {
      return { ...prev, sum: "", date: new Date(), periods: "" };
    });
  }
  function handleInputChange(e) {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    if (e.target.value !== "") {
      setErrors((prev) => {
        return { ...prev, [e.target.name]: "" };
      });
    }
  }
  function checkErrors() {
    let pass = true;
    let totalPayments = bill.payments + +input.periods;

    console.log("BILL total payments", totalPayments);
    console.log("BILL amount", bill.amount);
    console.log("BOOL", bill.amount && bill.amount < totalPayments);
    if (input.sum === "") {
      pass = false;
      setErrors((prev) => {
        return { ...prev, sum: "Este campo es requerido" };
      });
    } else if (!formatHelpers.validAmount(input.sum)) {
      pass = false;
      setErrors((prev) => {
        return { ...prev, sum: "Debe ingresar un número positivo" };
      });
    }
    if (input.periods === "") {
      pass = false;
      setErrors((prev) => {
        return { ...prev, periods: "Este campo es requerido" };
      });
    } else if (!formatHelpers.isPositiveInteger(input.periods)) {
      pass = false;
      setErrors((prev) => {
        return { ...prev, periods: "Debe ingresar un número entero positivo" };
      });
    } else if (bill.amount && bill.amount < totalPayments) {
      pass = false;
      setErrors((prev) => {
        return {
          ...prev,
          periods: `No puede pagar más cuotas que la cantidad establecida. Cuotas restantes: ${
            bill.amount - bill.payments
          }`,
        };
      });
    }
    return pass;
  }
  function handleSubmit(e) {
    e.preventDefault();
    const pass = checkErrors();
    const sendData = async () => {
      console.log("PASS", input);
      const response = await fetch(`/api/bill/pay/${_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const content = await response.json();
      if (response.ok) {
        setData(content.data);
        localStorage.setItem(REQUEST_EXPENSE, JSON.stringify(REQUEST_TRUE));
      } else {
        console.log(content);
      }
    };
    if (pass) {
      sendData();
      closeModal(e);
    }
  }
  return (
    <>
      <button onClick={openModal}>Pagar</button>
      <Modal
        title={"Marcar como pagado"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
      >
        <form className="modalForm">
          <div className="modalFlexDiv">
            <div className="modalHalfDiv">
              <label htmlFor="sum">Cantidad de pagada</label>
              <input
                type="text"
                name="sum"
                maxLength={20}
                onChange={handleInputChange}
                value={input.sum}
              />
              <br />
              <div className="paragraphDiv">
                {errors.sum && <p className="error">{errors.sum}</p>}
                <p className="charCounter">{`${input.sum.length}/${20}`}</p>
              </div>
            </div>
            <div className="modalHalfDiv lastHalf">
              <label htmlFor="periods">Cantidad de cuotas</label>
              <input
                type="text"
                name="periods"
                maxLength={20}
                onChange={handleInputChange}
                value={input.periods}
              />
              <br />
              <div className="paragraphDiv">
                {errors.periods && <p className="error">{errors.periods}</p>}
                <p className="charCounter">{`${input.periods.length}/${20}`}</p>
              </div>
            </div>
          </div>
          <label htmlFor="date">Fecha</label>
          <div className="datePickerDiv">
            <Datetime
              name="date"
              onChange={(date) =>
                setInput({
                  ...input,
                  date: new Date(date._d),
                })
              }
              value={input.date}
            />
          </div>
        </form>
        <div className="outerBtnBox">
          <div className="innerBtnBox">
            <button
              className="modalButton"
              type="submit"
              onClick={handleSubmit}
            >
              Aceptar
            </button>
            <button className="modalButton" onClick={closeModal}>
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default PayBill;
