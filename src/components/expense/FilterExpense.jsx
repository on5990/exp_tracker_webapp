import React, { useContext, useEffect, useState } from "react";
import formatHelpers from "@/lib/frontendHelpers/formatHelpers";
import {
  TYPE_CATEGORY,
  filterTypes,
  SPECIFIC,
  YEAR,
  MONTH,
} from "../../global/constants";
import { ExpenseContext } from "../../pages/dashboard";

const currentYear = new Date().getFullYear().toString();
const currentMonth = new Date().getMonth();

const yearsArray = formatHelpers.generateYearArray();
const monthsArray = formatHelpers.generateMonthArray();

function FilterExpense() {
  const { parameters, setParameters } = useContext(ExpenseContext);
  const [array, setArray] = useState([]);
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    if (parameters.showType === TYPE_CATEGORY) {
      setDisable(true);
    }
    if (parameters.showType === SPECIFIC) {
      setDisable(false);
    }
  }, [parameters.showType]);

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
          <select
            disabled={disable}
            name="time"
            value={parameters.time}
            onChange={handleChange}
          >
            <option value={""}>{""}</option>
            {array.map((item) => {
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
          <select
            disabled={disable}
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
