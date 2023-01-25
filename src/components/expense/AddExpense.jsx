import React from "react";
import { useState } from "react";
import Modal from "../modal/Modal";
import Datetime from "react-datetime";
import moment from "moment/moment";
import "moment/locale/es";
import formatHelpers from "@/lib/frontendHelpers/formatHelpers";

const categories = [
  { id: 1, label: "A", value: "A" },
  { id: 2, label: "B", value: "B" },
  { id: 3, label: "C", value: "C" },
  { id: 4, label: "D", value: "D" },
  { id: 5, label: "D", value: "D" },
  { id: 6, label: "D", value: "D" },
  { id: 7, label: "D", value: "D" },
  { id: 8, label: "D", value: "D" },
  { id: 9, label: "D", value: "D" },
  { id: 10, label: "D", value: "D" },
  { id: 11, label: "D", value: "D" },
  { id: 12, label: "D", value: "D" },
  { id: 13, label: "D", value: "D" },
  { id: 14, label: "D", value: "D" },
  { id: 15, label: "D", value: "D" },
  { id: 16, label: "D", value: "D" },
  { id: 17, label: "D", value: "D" },
  { id: 18, label: "D", value: "D" },
  { id: 19, label: "D", value: "D" },
  { id: 20, label: "D", value: "D" },
  { id: 21, label: "D", value: "D" },
  { id: 22, label: "D", value: "D" },
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
    description: "",
    amount: "",
    category: "",
  });
  // console.log("DATE2", data);
  console.log("AMOUNT", formatHelpers.validAmount(data.amount));
  function openModal() {
    setIsOpen(true);
  }
  function closeModal(e) {
    e.preventDefault();
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
    setErrors((prev) => {
      return {
        ...prev,
        description: "",
        amount: "",
        category: "",
      };
    });
  }
  function checkErrors() {
    let pass = true;
    if (data.description === "") {
      pass = false;
      setErrors((prev) => {
        return { ...prev, description: "Este campo es requerido" };
      });
    }
    if (data.amount === "") {
      pass = false;
      setErrors((prev) => {
        return { ...prev, amount: "Este campo es requerido" };
      });
    } else if (!formatHelpers.validAmount(data.amount)) {
      pass = false;
      setErrors((prev) => {
        return { ...prev, amount: "Debe ingresar un número positivo" };
      });
    }
    if (data.category === "") {
      pass = false;
      setErrors((prev) => {
        return { ...prev, category: "Este campo es requerido" };
      });
    }
    return pass;
  }
  function handleInputChange(e) {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    if (errors[e.target.name] !== "") {
      setErrors((prev) => {
        return { ...prev, [e.target.name]: "" };
      });
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    const pass = checkErrors();
    const submitData = async () => {
      console.log("PASS");
    };
    if (pass) {
      submitData();
      closeModal(e);
    }
  }
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
              <label htmlFor="amount">Cantidad de pagada</label>
              <input
                type="text"
                name="amount"
                maxLength={20}
                onChange={handleInputChange}
                value={data.amount}
              />
              <br />
              <div className="paragraphDiv">
                {errors.amount && <p className="error">{errors.amount}</p>}
                <p className="charCounter">{`${data.amount.length}/${20}`}</p>
              </div>
            </div>
            <div className="modalHalfDiv lastHalf">
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
              <br />
              {errors.category && <p className="error">{errors.category}</p>}
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
