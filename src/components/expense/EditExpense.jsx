import React, { useContext, useEffect, useState } from "react";
import Modal from "../modal/Modal";
import Datetime from "react-datetime";
import formatHelpers from "@/lib/frontendHelpers/formatHelpers";
import { ExpenseContext } from "../../pages/dashboard";
import getHelpers from "../../lib/frontendHelpers/getHelpers";
import { REQUEST_BUDGET, REQUEST_TRUE } from "../../global/constants";
import expenseRequest from "../../lib/frontendHelpers/requests/expense.request";

function EditExpense({ _id }) {
  const { setData, data } = useContext(ExpenseContext);
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
    _categoryId: "",
  });
  useEffect(() => {
    if (isOpen) {
      const exp = getHelpers.getById(_id, data.expenses);
      setInput((prev) => {
        return {
          ...prev,
          description: exp.description,
          sum: exp.sum,
          spentAt: new Date(exp.spentAt),
          _categoryId: exp._categoryId,
        };
      });
    }
  }, [, isOpen]);
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
      const response = await expenseRequest.update(_id, input);
      setData((prev) => {
        return {
          ...prev,
          expenses: response.expenses,
          monthlyAvg: response.monthlyAvg,
          yearlyAvg: response.yearlyAvg,
          weeklyTotal: response.weeklyTotal,
          monthlyTotal: response.monthlyTotal,
          yearlyTotal: response.yearlyTotal,
          totalsByCategory: response.totalsByCategory,
        };
      });
    };
    if (pass) {
      submitInput();
      closeModal(e);
    }
  }
  return (
    <>
      <button onClick={openModal}>Editar</button>
      <Modal
        title={"Editar gasto"}
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
                {data.categories.map((cat) => {
                  return (
                    <option key={cat._id} value={cat._id}>
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

export default EditExpense;
