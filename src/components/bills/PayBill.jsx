import React, { useState } from "react";
import Modal from "../modal/Modal";
import Datetime from "react-datetime";

function PayBill() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({ sum: "", date: new Date(), periods: "" });
  const [errors, setErrors] = useState({ sum: "", periods: "" });
  function openModal() {
    setIsOpen(true);
  }
  function closeModal(e) {
    e.preventDefault();
    setIsOpen(false);
  }
  function handleInputChange() {}
  function checkErrors() {}
  function handleSubmit(e) {
    e.preventDefault();
    setIsOpen(false);
  }
  return (
    <>
      <button onClick={openModal}>Pagar</button>
      <Modal
        title={"Marcar como pagado"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
      >
        <form className="modalForm">
          <div className="modalFlexDiv">
            <div className="modalHalfDiv">
              <label htmlFor="sum">Cantidad de pagada</label>
              <input
                type="text"
                placeholder="Opcional"
                name="sum"
                maxLength={20}
                onChange={handleInputChange}
                value={data.sum}
              />
              <br />
              <div className="paragraphDiv">
                {errors.sum && <p className="error">{errors.sum}</p>}
                <p className="charCounter">{`${data.sum.length}/${20}`}</p>
              </div>
            </div>
            <div className="modalHalfDiv lastHalf">
              <label htmlFor="periods">Cantidad de cuotas</label>
              <input
                type="text"
                placeholder="Opcional"
                name="periods"
                maxLength={20}
                onChange={handleInputChange}
                value={data.periods}
              />
              <br />
              <div className="paragraphDiv">
                {errors.periods && <p className="error">{errors.periods}</p>}
                <p className="charCounter">{`${data.periods.length}/${20}`}</p>
              </div>
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
        </form>
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
      </Modal>
    </>
  );
}

export default PayBill;
