import React, { useState } from "react";
import Modal from "../modal/Modal";
import { types } from "../bills/const/const";
import formatHelpers from "@/lib/frontendHelpers/formatHelpers";

const categories = types;
function AddBudget() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({ sum: "", _categoryId: "" });
  const [errors, setErrors] = useState({ sum: "", _categoryId: "" });
  function openModal() {
    setIsOpen(true);
  }
  function closeModal(e) {
    e.preventDefault();
    setIsOpen(false);
    setData((prev) => {
      return { ...prev, sum: "", _categoryId: "" };
    });
    setErrors((prev) => {
      return { ...prev, sum: "", _categoryId: "" };
    });
  }
  function handleInputChange(e) {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    if (data[e.target.name] !== "") {
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
    if (data._categoryId === "") {
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
      console.log("PASS", data);
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
            value={data.sum}
          />
          <div className="paragraphDiv">
            {errors.sum && <p className="error">{errors.sum}</p>}
            <p className="charCounter">{`${data.sum.length}/${20}`}</p>
          </div>
          <label htmlFor="_categoryId">Categoría</label>
          <select
            name="_categoryId"
            value={data._categoryId}
            onChange={handleInputChange}
          >
            <option value="">{""}</option>
            {categories.map((cat) => {
              return (
                <option key={cat.id} value={`${cat.id}`}>
                  {cat.label}
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
