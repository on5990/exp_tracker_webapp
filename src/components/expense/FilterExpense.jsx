import React, { useState } from "react";
import { filterTypes } from "./const/const";
function FilterExpense() {
  const [filter, setFilter] = useState({ type: "", time: "" });
  function handleChange(e) {
    setFilter((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  return (
    <>
      <div className="searchDiv">
        <div className="filterItem">
          <p>Filtrar</p>
          <select name="time" value={filter.time} onChange={handleChange}>
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
        <div className="filterItem">
          <p>Tipo</p>
          <select name="type" value={filter.type} onChange={handleChange}>
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
