import React from "react";
import { useState } from "react";
import { CATEGORY, SPECIFIC } from "../../global/constants";

function SwitchBtn() {
  const [activeBtn, setActiveBtn] = useState(SPECIFIC);
  function setSpecific() {
    setActiveBtn(SPECIFIC);
  }
  function setCategory() {
    setActiveBtn(CATEGORY);
  }
  return (
    <>
      <div className="dualButton">
        <button
          className={activeBtn === SPECIFIC ? "buttonStatic" : "buttonIgnored"}
          onClick={setSpecific}
        >
          Específico
        </button>
        <button
          className={activeBtn === CATEGORY ? "buttonStatic" : "buttonIgnored"}
          onClick={setCategory}
        >
          Total por categoría
        </button>
      </div>
    </>
  );
}

export default SwitchBtn;
