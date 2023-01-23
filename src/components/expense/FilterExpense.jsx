import React, { useState } from "react";

function FilterExpense() {
  const [timeType, setTimeType] = useState(null);
  const [timeItem, setTimeItem] = useState(null);
  return (
    <>
      <div className="searchDiv">
        <div className="filterItem">
          <p>Filtrar</p>
          <input />
        </div>
        <div className="filterItem">
          <p>Tipo</p>
          <input />
        </div>
      </div>
    </>
  );
}

export default FilterExpense;
