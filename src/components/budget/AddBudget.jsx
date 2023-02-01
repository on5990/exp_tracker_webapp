import React, { useContext, useRef, useState } from "react";
import Modal from "../modal/Modal";
import { types } from "../../global/constants";
import formatHelpers from "@/lib/frontendHelpers/formatHelpers";
import { BudgetContext } from "../../pages/dashboard/budgets";

const categories = types;
function AddBudget() {
  const { data, setData } = useContext(BudgetContext);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({ sum: "", _categoryId: "" });
  const [errors, setErrors] = useState({ sum: "", _categoryId: "" });
  function openModal() {
    setIsOpen(true);
  }
  function closeModal(e) {
    e.preventDefault();
    setIsOpen(false);
    setInput((prev) => {
      return { ...prev, sum: "", _categoryId: "" };
    });
    setErrors((prev) => {
      return { ...prev, sum: "", _categoryId: "" };
    });
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
    if (input._categoryId === "") {
      pass = false;
      setErrors((prev) => {
        return { ...prev, _categoryId: "Este campo es requerido" };
      });
    }
    return pass;
  }
  function handleSubmit(e) {
    e.preventDefault();
    const pass = checkErrors();
    const sendData = async () => {
      console.log("PASS", input);
      const response = await fetch("/api/budget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const content = await response.json();
      if (response.ok) {
        setData(content.data);
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
      <button className="buttonActive" onClick={openModal}>
        + Agregar presupuesto
      </button>
      <Modal
        title={"Agregar presupuesto"}
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
            <p className="charCounter">{`${input.sum.length}/${20}`}</p>
          </div>
          <label htmlFor="_categoryId">Categoría</label>
          <select
            name="_categoryId"
            value={input._categoryId}
            onChange={handleInputChange}
          >
            <option value="">{""}</option>
            {data.categories &&
              data.categories.map((cat) => {
                return (
                  <option key={cat._id} value={`${cat._id}`}>
                    {cat.name}
                  </option>
                );
              })}
          </select>
          {errors._categoryId && <p className="error">{errors._categoryId}</p>}
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

export default AddBudget;
