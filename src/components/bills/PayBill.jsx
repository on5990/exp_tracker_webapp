import React, { useContext, useEffect, useState } from "react";
import Modal from "../modal/Modal";
import Datetime from "react-datetime";
import formatHelpers from "@/lib/frontendHelpers/formatHelpers";
import { BillContext } from "../../pages/dashboard/bills";
import billRequest from "../../lib/frontendHelpers/requests/bill.request";

function PayBill({ billData }) {
  const { setData } = useContext(BillContext);
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
    let totalPayments = billData.payments + +input.periods;
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
    } else if (billData.amount && billData.amount < totalPayments) {
      pass = false;
      setErrors((prev) => {
        return {
          ...prev,
          periods: `No puede pagar más cuotas que la cantidad establecida. Cuotas restantes: ${
            billData.amount - billData.payments
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
      const response = await billRequest.pay(billData._id, input);
      setData(response);
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
