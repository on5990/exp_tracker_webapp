import React, { useState } from "react";
import { filterTypes } from "./const/const";
function FilterExpense() {
  const [filterType, setFilterType] = useState("");
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
          <select name="filterType" value={filterType}>
            <option value={""}>{""}</option>
            {filterTypes.map((item) => {
              return (
                <option key={item.id} value={item.value}>
                  {item.label}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </>
  );
}

export default FilterExpense;
