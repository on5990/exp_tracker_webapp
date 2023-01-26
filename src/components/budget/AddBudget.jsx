import React, { useState } from "react";
import Modal from "../modal/Modal";
import { types } from "../bills/const/const";
const categories = types;
function AddBudget() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({ sum: "", category: "" });
  const [errors, setErrors] = useState({ sum: "aaa", category: "aaa" });
  function openModal() {
    setIsOpen(true);
  }
  function closeModal(e) {
    e.preventDefault();
    setErrors((prev) => {
      return { ...prev, sum: "", category: "" };
    });
    setIsOpen(false);
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
  function checkErrors() {}
  function handleSubmit(e) {
    e.preventDefault();
    const sendData = async () => {};
    let pass = true;
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
          <label htmlFor="category">Categoría</label>
          <select
            name="category"
            value={data.category}
            onChange={handleInputChange}
          >
            <option value="">{""}</option>
            {categories.map((cat) => {
              return (
                <option key={cat.id} value={cat.value}>
                  {cat.label}
                </option>
              );
            })}
          </select>
          {errors.category && <p className="error">{errors.category}</p>}
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
