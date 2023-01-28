import React, { useState } from "react";
import Modal from "../modal/Modal";
import Datetime from "react-datetime";
import formatHelpers from "@/lib/frontendHelpers/formatHelpers";

function PayBill() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({ sum: "", date: new Date(), periods: "" });
  const [errors, setErrors] = useState({ sum: "", periods: "" });
  function openModal() {
    setIsOpen(true);
  }
  function closeModal(e) {
    e.preventDefault();
    setIsOpen(false);
    setData((prev) => {
      return { ...prev, sum: "", date: new Date(), periods: "" };
    });
    setErrors((prev) => {
      return { ...prev, sum: "", periods: "" };
    });
  }
  function handleInputChange(e) {
    setData((prev) => {
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
    if (data.sum === "") {
      pass = false;
      setErrors((prev) => {
        return { ...prev, sum: "Este campo es requerido" };
      });
    } else if (!formatHelpers.validAmount(data.sum)) {
      pass = false;
      setErrors((prev) => {
        return { ...prev, sum: "Debe ingresar un número positivo" };
      });
    }
    if (data.periods === "") {
      pass = false;
      setErrors((prev) => {
        return { ...prev, periods: "Este campo es requerido" };
      });
    } else if (!formatHelpers.isPositiveInteger(data.periods)) {
      pass = false;
      setErrors((prev) => {
        return { ...prev, periods: "Debe ingresar un número entero positivo" };
      });
    }
    return pass;
  }
  function handleSubmit(e) {
    e.preventDefault();
    const pass = checkErrors();
    const sendData = async () => {
      console.log("PASS", data);
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
                value={data.sum}
              />
              <br />
              <div className="paragraphDiv">
                {errors.sum && <p className="error">{errors.sum}</p>}
                <p className="charCounter">{`${data.sum.length}/${20}`}</p>
              </div>
            </div>
            <div className="modalHalfDiv lastHalf">
              <label htmlFor="periods">Cantidad de cuotas</label>
              <input
                type="text"
                name="periods"
                maxLength={20}
                onChange={handleInputChange}
                value={data.periods}
              />
              <br />
              <div className="paragraphDiv">
                {errors.periods && <p className="error">{errors.periods}</p>}
                <p className="charCounter">{`${data.periods.length}/${20}`}</p>
              </div>
            </div>
          </div>
          <label htmlFor="date">Fecha</label>
          <div className="datePickerDiv">
            <Datetime
              name="date"
              onChange={(date) =>
                setData({
                  ...data,
                  date: new Date(date._d),
                })
              }
              value={data.date}
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
