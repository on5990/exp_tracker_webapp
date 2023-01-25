import React from "react";
import { useState } from "react";
import Modal from "../modal/Modal";
import Datetime from "react-datetime";
import moment from "moment/moment";
import "moment/locale/es";
// import formatHelpers from "@/lib/frontendHelpers/formatHelpers";
import formatHelpers from "../../lib/frontendHelpers/formatHelpers.tsx";

const categories = [
  { id: 1, label: "A", value: "A" },
  { id: 2, label: "B", value: "B" },
  { id: 3, label: "C", value: "C" },
  { id: 4, label: "D", value: "D" },
];

function AddExpense() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({
    description: "",
    amount: "",
    date: new Date(),
    category: "",
  });
  const [errors, setErrors] = useState({
    descError: "something",
    amountError: "somehting",
    categoryError: "something",
  });
  console.log("DATE2", data.date);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal(event) {
    event.preventDefault();
    setIsOpen(false);
    setData((prev) => {
      return {
        ...prev,
        description: "",
        amount: "",
        date: new Date(),
        category: "",
      };
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    const submitData = async () => {};
    submitData();
  }
  function handleInputChange() {}
  return (
    <>
      <button className="buttonActive" onClick={openModal}>
        + Agregar gasto
      </button>
      <Modal
        title={"Agregar gasto"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
      >
        <form className="modalForm">
          <label htmlFor="description">Descripción</label>
          <textarea
            type="text"
            name="description"
            onChange={handleInputChange}
            value={data.description}
          />
          {errors.descError && <p className="error">{errors.descError}</p>}
          <div className="modalFlexDiv">
            <div className="modalHalfDiv">
              <label htmlFor="amount">Cantidad</label>
              <input
                type="text"
                name="amount"
                onChange={handleInputChange}
                value={data.amount}
              />
              <br />
              {errors.amountError && (
                <p className="error">{errors.amountError}</p>
              )}
            </div>
            <div className="modalHalfDiv lastHalf">
              <label htmlFor="category">Categoría</label>
              <select
                name="category"
                value={data.category}
                onChange={(e) => {
                  setData({ ...data, category: e.target.value });
                }}
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
              <br />
              {errors.categoryError && (
                <p className="error">{errors.categoryError}</p>
              )}
            </div>
          </div>
          <label htmlFor="date">Fecha</label>
          {data.amountError && <p className="error">{data.amountError}</p>}
          <div className="datePickerDiv">
            <Datetime
              onChange={(date) =>
                setData({
                  ...data,
                  date: new Date(date._d),
                })
              }
              value={data.date}
            />
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

export default AddExpense;
