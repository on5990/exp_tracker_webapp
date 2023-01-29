import React, { useEffect } from "react";
import { useState } from "react";
import { TYPE_CATEGORY, SPECIFIC } from "../../global/constants";

function SwitchBtn({ setParameters }) {
  const [activeBtn, setActiveBtn] = useState(SPECIFIC);
  function setSpecific() {
    setActiveBtn(SPECIFIC);
    setParameters((prev) => {
      return { ...prev, showType: SPECIFIC };
    });
  }
  function setCategory() {
    setActiveBtn(TYPE_CATEGORY);
    setParameters((prev) => {
      return { ...prev, showType: TYPE_CATEGORY };
    });
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
          className={
            activeBtn === TYPE_CATEGORY ? "buttonStatic" : "buttonIgnored"
          }
          onClick={setCategory}
        >
          Total por categoría
        </button>
      </div>
    </>
  );
}

export default SwitchBtn;
