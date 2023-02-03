import React, { useContext, useEffect, useState } from "react";
import Modal from "../modal/Modal";
import {
  MONTHLY_FIXED,
  MONTHLY_UND,
  YEARLY_FIXED,
  YEARLY_UND,
  BILL_FINISHED,
} from "../../global/constants";
import formatHelpers from "@/lib/frontendHelpers/formatHelpers";
import getHelpers from "../../lib/frontendHelpers/getHelpers";
import { BillContext } from "../../pages/dashboard/bills";
import billRequest from "../../lib/frontendHelpers/requests/bill.request";

function EditBill({ billData }) {
  const { data, setData } = useContext(BillContext);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({
    description: "",
    sum: "",
    amount: "",
  });
  const [errors, setErrors] = useState({
    description: "",
    sum: "",
    amount: "",
  });
  const [disable, setDisable] = useState({
    amount: false,
    sum: false,
  });
  useEffect(() => {
    setInput((prev) => {
      return {
        ...prev,
        description: billData.description,
        sum: billData.sum,
        amount: billData.amount,
      };
    });
  }, [, data]);

  useEffect(() => {
    if (billData.state === BILL_FINISHED) {
      setDisable((prev) => {
        return { ...prev, sum: true };
      });
    }
    if (
      billData.type == MONTHLY_UND ||
      billData.type === YEARLY_UND ||
      billData.state === BILL_FINISHED
    ) {
      setDisable((prev) => {
        return { ...prev, amount: true };
      });
    }
  }, [, data]);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal(e) {
    e.preventDefault();
    setIsOpen(false);
    setInput((prev) => {
      return {
        ...prev,
        description: billData.description,
        sum: billData.sum,
        amount: billData.amount,
      };
    });
    setErrors((prev) => {
      return {
        ...prev,
        description: "",
        sum: "",
        amount: "",
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
    if (
      input.sum !== undefined &&
      input.sum !== "" &&
      !formatHelpers.validAmount(input.sum)
    ) {
      pass = false;
      setErrors((prev) => {
        return { ...prev, sum: "Debe ingresar un número positivo" };
      });
    }
    if (
      billData.state !== BILL_FINISHED &&
      input.amount === "" &&
      (billData.type === MONTHLY_FIXED || billData.type === YEARLY_FIXED)
    ) {
      pass = false;
      setErrors((prev) => {
        return { ...prev, amount: "Este campo es requerido" };
      });
    } else if (
      billData.state !== BILL_FINISHED &&
      (billData.type === MONTHLY_FIXED || billData.type === YEARLY_FIXED) &&
      input.amount !== "" &&
      !formatHelpers.isPositiveInteger(input.amount)
    ) {
      pass = false;
      setErrors((prev) => {
        return { ...prev, amount: "Debe ingresar un número entero positivo" };
      });
    } else if (input.amount < billData.payments) {
      pass = false;
      setErrors((prev) => {
        return {
          ...prev,
          amount: `La cantidad de cuotas no puede ser inferior a las cuotas pagadas(${billData.payments})`,
        };
      });
    }
    return pass;
  }
  function handleSubmit(e) {
    e.preventDefault();
    const sendData = async () => {
      let inputBody = { description: input.description };
      if (input.sum) inputBody = { ...inputBody, sum: input.sum };
      if (input.amount) inputBody = { ...inputBody, amount: input.amount };
      const response = await billRequest.update(billData._id, inputBody);
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA", response);
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
            <label htmlFor="sum">Valor de cuota</label>
            <input
              type="text"
              placeholder="Opcional"
              disabled={disable.sum}
              name="sum"
              maxLength={20}
              onChange={handleInputChange}
              value={input.sum}
            />
            <br />
            <div className="paragraphDiv">
              {errors.sum && <p className="error">{errors.sum}</p>}
              <p className="charCounter">{`${
                input.sum ? input.sum.toString().length : 0
              }/${20}`}</p>
            </div>
          </div>
          <div className="modalFlexDiv">
            <label htmlFor="amount">Cantidad de cuotas</label>
            <input
              type="text"
              disabled={disable.amount}
              name="amount"
              maxLength={10}
              onChange={handleInputChange}
              value={input.amount}
            />
            <br />
            <div className="paragraphDiv">
              {errors.amount && <p className="error">{errors.amount}</p>}
              <p className="charCounter">{`${
                input.amount?.toString().length
              }/${10}`}</p>
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
