import React, { useContext, useEffect, useState } from "react";
import Modal from "../modal/Modal";
import Datetime from "react-datetime";
import moment from "moment/moment";
import "moment/locale/es";
import {
  MONTHLY_FIXED,
  MONTHLY_UND,
  types,
  YEARLY_FIXED,
  YEARLY_UND,
} from "../../global/constants";
import formatHelpers from "@/lib/frontendHelpers/formatHelpers";
import { BillContext } from "../../pages/dashboard/bills";
import billRequest from "../../lib/frontendHelpers/requests/bill.request";

function AddBill() {
  const { setData } = useContext(BillContext);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({
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
  useEffect(() => {
    if (input.type == MONTHLY_UND || input.type === YEARLY_UND) {
      setErrors((prev) => {
        return { ...prev, amount: "" };
      });
    }
  }, [, input]);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal(e) {
    e.preventDefault();
    setIsOpen(false);
    setInput((prev) => {
      return {
        ...prev,
        description: "",
        sum: "",
        type: "",
        firstPayment: null,
        amount: "",
        payments: "",
      };
    });
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
    if (input.description === "") {
      pass = false;
      setErrors((prev) => {
        return { ...prev, description: "Este campo es requerido" };
      });
    }
    if (input.sum !== "" && !formatHelpers.validAmount(input.sum)) {
      pass = false;
      setErrors((prev) => {
        return { ...prev, sum: "Debe ingresar un número positivo" };
      });
    }
    if (input.type === "") {
      pass = false;
      setErrors((prev) => {
        return { ...prev, type: "Este campo es requerido" };
      });
    }
    if (
      input.amount === "" &&
      (input.type === MONTHLY_FIXED || input.type === YEARLY_FIXED)
    ) {
      pass = false;
      setErrors((prev) => {
        return { ...prev, amount: "Este campo es requerido" };
      });
    } else if (
      input.amount !== "" &&
      !formatHelpers.isPositiveInteger(input.amount)
    ) {
      pass = false;
      setErrors((prev) => {
        return { ...prev, amount: "Debe ingresar un número entero positivo" };
      });
    }
    if (input.payments == "" && input.firstPayment != null) {
      pass = false;
      setErrors((prev) => {
        return { ...prev, payments: "Este campo es requerido" };
      });
    } else if (
      input.payments !== "" &&
      !formatHelpers.isPositiveInteger(input.payments) &&
      input.payments != 0
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
    const sendData = async () => {
      let bodyInput = {
        description: input.description,
        type: input.type,
        firstPayment: input.firstPayment,
      };
      if (input.payments) {
        bodyInput = { ...bodyInput, payments: input.payments };
      } else {
        bodyInput = { ...bodyInput, payments: 0 };
      }
      if (input.sum) {
        bodyInput = { ...bodyInput, sum: input.sum };
      } else {
        bodyInput = { ...bodyInput, sum: 0 };
      }
      if (input.amount) {
        bodyInput = { ...bodyInput, amount: input.amount };
      } else {
        bodyInput = { ...bodyInput, amount: 0 };
      }
      const response = await billRequest.create(bodyInput);
      setData(response);
    };
    let pass = checkErrors();
    if (pass) {
      sendData();
      closeModal(e);
    }
  }
  return (
    <>
      <button className="buttonActive" onClick={openModal}>
        + Agregar cuenta
      </button>
      <Modal
        title={"Agregar cuenta"}
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
            value={input.description}
          />
          <div className="paragraphDiv">
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
            <p className="charCounter">{`${
              input.description.length
            }/${200}`}</p>
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
                value={input.sum}
              />
              <br />
              <div className="paragraphDiv">
                {errors.sum && <p className="error">{errors.sum}</p>}
                <p className="charCounter">{`${input.sum.length}/${20}`}</p>
              </div>
            </div>
            <div className="modalHalfDiv lastHalf">
              <label htmlFor="type">Tipo de cuota</label>
              <select
                name="type"
                value={input.type}
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
          <label htmlFor="date">{`Fecha del primer pago (Opcional)`}</label>
          <div className="datePickerDiv">
            {isOpen && (
              <Datetime
                name="date"
                onChange={(date) =>
                  setInput({
                    ...input,
                    firstPayment: new Date(date._d),
                  })
                }
                value={input.firstPayment}
              />
            )}
          </div>
          <div className="modalFlexDiv">
            <div className="modalHalfDiv">
              <label htmlFor="amount">Cuotas</label>
              <input
                type="text"
                disabled={
                  (input.type == MONTHLY_UND || input.type === YEARLY_UND) &&
                  true
                }
                name="amount"
                maxLength={10}
                onChange={handleInputChange}
                value={input.amount}
              />
              <br />
              <div className="paragraphDiv">
                {errors.amount && <p className="error">{errors.amount}</p>}
                <p className="charCounter">{`${input.amount.length}/${10}`}</p>
              </div>
            </div>
            <div className="modalHalfDiv lastHalf">
              <label htmlFor="payments">Cuotas pagadas</label>
              <input
                type="text"
                disabled={input.firstPayment == null && true}
                name="payments"
                maxLength={10}
                onChange={handleInputChange}
                value={input.payments}
              />
              <br />
              <div className="paragraphDiv">
                {errors.payments && <p className="error">{errors.payments}</p>}
                <p className="charCounter">{`${
                  input.payments.length
                }/${10}`}</p>
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

export default AddBill;
