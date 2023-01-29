import React from "react";
import { useState } from "react";
import Modal from "../modal/Modal";
import Datetime from "react-datetime";
import moment from "moment/moment";
import "moment/locale/es";
import formatHelpers from "@/lib/frontendHelpers/formatHelpers";

// const categories = [
//   { id: "1", label: "A", value: "A" },
//   { id: "2", label: "B", value: "B" },
//   { id: "3", label: "C", value: "C" },
//   { id: "4", label: "D", value: "D" },
//   { id: "5", label: "D", value: "D" },
//   { id: "6", label: "D", value: "D" },
//   { id: "7", label: "D", value: "D" },
//   { id: "8", label: "D", value: "D" },
//   { id: "9", label: "D", value: "D" },
//   { id: "10", label: "D", value: "D" },
//   { id: "11", label: "D", value: "D" },
//   { id: "12", label: "D", value: "D" },
//   { id: "13", label: "D", value: "D" },
//   { id: "14", label: "D", value: "D" },
//   { id: "15", label: "D", value: "D" },
//   { id: "16", label: "D", value: "D" },
//   { id: "17", label: "D", value: "D" },
//   { id: "18", label: "D", value: "D" },
//   { id: "19", label: "D", value: "D" },
//   { id: "20", label: "D", value: "D" },
//   { id: "21", label: "D", value: "D" },
//   { id: "22", label: "D", value: "D" },
// ];

function AddExpense({ setData, data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({
    description: "",
    sum: "",
    spentAt: new Date(),
    _categoryId: "",
  });
  const [errors, setErrors] = useState({
    description: "",
    sum: "",
    category: "",
  });
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
        spentAt: new Date(),
        _categoryId: "",
      };
    });
    setErrors((prev) => {
      return {
        ...prev,
        description: "",
        sum: "",
        _categoryId: "",
      };
    });
  }
  function checkErrors() {
    let pass = true;
    if (input.description === "") {
      pass = false;
      setErrors((prev) => {
        return { ...prev, description: "Este campo es requerido" };
      });
    }
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
  function handleInputChange(e) {
    setInput((prev) => {
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
    const submitInput = async () => {
      // console.log("PASS", input);
      const response = await fetch("/api/expense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      console.log(await response.json());
      if (response.ok) {
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    };
    if (pass) {
      submitInput();
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
              <label htmlFor="sum">Cantidad de pagada</label>
              <input
                type="text"
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
              <label htmlFor="_categoryId">Categoría</label>
              <select
                name="_categoryId"
                value={input._categoryId}
                onChange={handleInputChange}
              >
                <option value="">{""}</option>
                {data.categories?.map((cat) => {
                  return (
                    <option key={cat.id} value={cat._id}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>
              <br />
              {errors._categoryId && (
                <p className="error">{errors._categoryId}</p>
              )}
            </div>
          </div>
          <label htmlFor="spentAt">Fecha</label>
          <div className="datePickerDiv">
            <Datetime
              name="spentAt"
              onChange={(date) =>
                setInput({
                  ...input,
                  spentAt: new Date(date._d),
                })
              }
              value={input.spentAt}
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
