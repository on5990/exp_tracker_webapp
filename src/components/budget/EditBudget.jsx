import React, { useContext, useEffect, useState } from "react";
import Modal from "../modal/Modal";
import formatHelpers from "@/lib/frontendHelpers/formatHelpers";
import { BudgetContext } from "../../pages/dashboard/budgets";
import getHelpers from "../../lib/frontendHelpers/getHelpers";
import budgetRequest from "../../lib/frontendHelpers/requests/budget.request";

function EditBudget({ _id }) {
  const { data, setData } = useContext(BudgetContext);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({ sum: "" });
  const [errors, setErrors] = useState({ sum: "" });
  useEffect(() => {
    if (isOpen) {
      const budget = getHelpers.getById(_id, data.budgets);
      setInput((prev) => {
        return { ...prev, sum: budget.sum };
      });
    }
  }, [, isOpen]);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal(e) {
    e.preventDefault();
    setErrors((prev) => {
      return { ...prev, sum: "" };
    });
    setInput((prev) => {
      return { ...prev, sum: "" };
    });
    setIsOpen(false);
  }
  function handleInputChange(e) {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    if (input[e.target.name] !== "") {
      setErrors((prev) => {
        return { ...prev, [e.target.name]: "" };
      });
    }
  }
  function checkErrors() {
    let pass = true;
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
    return pass;
  }
  function handleSubmit(e) {
    e.preventDefault();
    const pass = checkErrors();
    const sendData = async () => {
      const response = await budgetRequest.update(_id, input);
      setData(response);
      // const response = await fetch(`/api/budget/${_id}`, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(input),
      // });
      // const content = await response.json();
      // if (response.ok) {
      //   setData(content.data);
      // } else {
      //   console.log(content);
      // }
    };
    if (pass) {
      sendData();
      closeModal(e);
    }
  }
  return (
    <>
      <button onClick={openModal}>Editar</button>
      <Modal
        title={"Editar presupuesto"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
      >
        <form className="modalForm">
          <label htmlFor="sum">Presupuesto</label>
          <input
            type="text"
            name="sum"
            maxLength={20}
            onChange={handleInputChange}
            value={input.sum}
          />
          <div className="paragraphDiv">
            {errors.sum && <p className="error">{errors.sum}</p>}
            <p className="charCounter">{`${
              input.sum.toString().length
            }/${20}`}</p>
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

export default EditBudget;
