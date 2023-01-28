import React, { useEffect, useState } from "react";
import { filterTypes, MONTH, YEAR } from "./const/const";
import formatHelpers from "@/lib/frontendHelpers/formatHelpers";
// const months

const currentYear = new Date().getFullYear().toString();
const currentMonth = new Date().getMonth();

const yearsArray = formatHelpers.generateYearArray();
const monthsArray = formatHelpers.generateMonthArray();

function FilterExpense({ parameters, setParameters }) {
  const [array, setArray] = useState([]);
  useEffect(() => {
    if (parameters.timeType === YEAR) {
      setArray(yearsArray);
      setParameters((prev) => {
        return { ...prev, time: currentYear };
      });
    } else if (parameters.timeType === MONTH) {
      setArray(monthsArray);
      setParameters((prev) => {
        return { ...prev, time: `${currentMonth},${currentYear}` };
      });
    } else {
      setArray([]);
    }
  }, [parameters.timeType]);
  function handleChange(e) {
    setParameters((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }
  return (
    <>
      <div className="searchDiv">
        <div className="filterItem">
          <p>Filtrar</p>
          <select name="time" value={parameters.time} onChange={handleChange}>
            <option value={""}>{""}</option>
            {array.map((item) => {
              return (
                <option key={item.id} value={item.value}>
                  {item.label}
                </option>
              );
            })}
            {/* {parameters.timeType === YEAR &&
              yearsArray.map((item) => {
                return (
                  <option key={item.id} value={item.value}>
                    {item.label}
                  </option>
                );
              })} */}
          </select>
        </div>
        <div className="filterItem">
          <p>Tipo</p>
          <select
            name="timeType"
            value={parameters.timeType}
            onChange={handleChange}
          >
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
