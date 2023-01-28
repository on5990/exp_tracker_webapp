import React, { useState } from "react";
import Modal from "../modal/Modal";
import Datetime from "react-datetime";
import { types } from "./const/const";
import formatHelpers from "@/lib/frontendHelpers/formatHelpers";

function EditBill() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({
    description: "",
    sum: "",
    type: "",
    firstPayment: null,
    amount: "",
    payments: "",
  });
  const [errors, setErrors] = useState({
    description: "",
    sum: "",
    type: "",
    amount: "",
    payments: "",
  });
  function openModal() {
    setIsOpen(true);
  }
  function closeModal(e) {
    e.preventDefault();
    setIsOpen(false);
    setErrors((prev) => {
      return {
        ...prev,
        description: "",
        sum: "",
        type: "",
        amount: "",
        payments: "",
      };
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
    if (data.description === "") {
      pass = false;
      setErrors((prev) => {
        return { ...prev, description: "Este campo es requerido" };
      });
    }
    if (data.sum !== "" && !formatHelpers.validAmount(data.sum)) {
      pass = false;
      setErrors((prev) => {
        return { ...prev, sum: "Debe ingresar un número positivo" };
      });
    }
    if (data.type === "") {
      pass = false;
      setErrors((prev) => {
        return { ...prev, type: "Este campo es requerido" };
      });
    }
    if (data.amount !== "" && !formatHelpers.isPositiveInteger(data.amount)) {
      pass = false;
      setErrors((prev) => {
        return { ...prev, amount: "Debe ingresar un número entero positivo" };
      });
    }
    if (
      data.payments !== "" &&
      !formatHelpers.isPositiveInteger(data.payments)
    ) {
      pass = false;
      setErrors((prev) => {
        return { ...prev, payments: "Debe ingresar un número entero positivo" };
      });
    }
    return pass;
  }
  function handleSubmit(e) {
    e.preventDefault();
    const sendData = async () => {};
    let pass = checkErrors();
    if (pass) {
      sendData();
      closeModal(e);
    }
  }
  return (
    <>
      <button onClick={openModal}>Editar</button>
      <Modal
        title={"Editar cuenta"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
      >
        <form className="modalForm">
          <label htmlFor="description">Descripción</label>
          <textarea
            type="text"
            name="description"
            maxLength={200}
            onChange={handleInputChange}
            value={data.description}
          />
          <div className="paragraphDiv">
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
            <p className="charCounter">{`${data.description.length}/${200}`}</p>
          </div>
          <div className="modalFlexDiv">
            <div className="modalHalfDiv">
              <label htmlFor="sum">Valor de cuota</label>
              <input
                type="text"
                placeholder="Opcional"
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
              <label htmlFor="type">Tipo de cuota</label>
              <select
                name="type"
                value={data.type}
                onChange={handleInputChange}
              >
                <option value="">{""}</option>
                {types.map((item) => {
                  return (
                    <option key={item.id} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
              </select>
              <br />
              {errors.type && <p className="error">{errors.type}</p>}
            </div>
          </div>
          <label htmlFor="date">Fecha del primer pago</label>
          <div className="datePickerDiv">
            <Datetime
              name="date"
              onChange={(date) =>
                setData({
                  ...data,
                  firstPayment: new Date(date._d),
                })
              }
              value={data.firstPayment}
            />
          </div>
          <div className="modalFlexDiv">
            <div className="modalHalfDiv">
              <label htmlFor="amount">Cantidad de cuotas</label>
              <input
                type="text"
                placeholder="Opcional"
                name="amount"
                maxLength={10}
                onChange={handleInputChange}
                value={data.amount}
              />
              <br />
              <div className="paragraphDiv">
                {errors.amount && <p className="error">{errors.amount}</p>}
                <p className="charCounter">{`${data.amount.length}/${10}`}</p>
              </div>
            </div>
            <div className="modalHalfDiv lastHalf">
              <label htmlFor="payments">Cantidad de cuotas pagadas</label>
              <input
                type="text"
                placeholder="Opcional"
                name="payments"
                maxLength={10}
                onChange={handleInputChange}
                value={data.payments}
              />
              <br />
              <div className="paragraphDiv">
                {errors.payments && <p className="error">{errors.payments}</p>}
                <p className="charCounter">{`${data.payments.length}/${10}`}</p>
              </div>
            </div>
          </div>
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
        </form>
      </Modal>
    </>
  );
}

export default EditBill;
