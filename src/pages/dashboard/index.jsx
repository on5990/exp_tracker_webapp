import React, { useEffect, useRef, useState } from "react";
import AddCategory from "../../components/expense/AddCategory";
import AddExpense from "../../components/expense/AddExpense";
import DeleteCategory from "../../components/expense/DeleteCategory";
import ExpenseTable from "../../components/expense/ExpenseTable";
import FilterExpense from "../../components/expense/FilterExpense";
import SwitchBtn from "../../components/expense/SwitchBtn";
import TotalTable from "../../components/expense/TotalTable";
import MainLayout from "../../components/layout/MainLayout";
import {
  EXPENSE_CACHE,
  EXPENSE_SECTION,
  REQUEST_EXPENSE,
  REQUEST_FALSE,
  SECTION_CACHE,
  SPECIFIC,
  TYPE_CATEGORY,
} from "../../global/constants";

export const ExpenseContext = React.createContext();
function Dashboard() {
  const [data, setData] = useState({
    expenses: [],
    categories: [],
    monthlyAvg: "",
    yearlyAvg: "",
    weeklyTotal: "",
    monthlyTotal: "",
    yearlyTotal: "",
    totalsByCategory: [],
  });
  const [parameters, setParameters] = useState({
    category: { _id: "", isDefault: true, name: "" },
    // Search by month or year
    timeType: "",
    // Selected time expression
    time: "",
    // List of expenses or list of totals by category
    showType: SPECIFIC,
  });
  const getRequestSent = useRef(false);
  useEffect(() => {
    const empty = JSON.stringify({
      expenses: [],
      categories: [],
      monthlyAvg: "",
      yearlyAvg: "",
      weeklyTotal: "",
      monthlyTotal: "",
      yearlyTotal: "",
      totalsByCategory: [],
    });
    const strJson = JSON.stringify(data);
    if (empty != strJson) {
      localStorage.setItem(EXPENSE_CACHE, strJson);
    }
  }, [data]);
  useEffect(() => {
    if (parameters.showType === TYPE_CATEGORY) {
      setParameters((prev) => {
        return {
          ...prev,
          category: { _id: "", isDefault: true, name: "" },
          timeType: "",
          time: "",
        };
      });
    }
  }, [parameters.showType]);
  useEffect(() => {
    localStorage.setItem(SECTION_CACHE, JSON.stringify(EXPENSE_SECTION));
    if (!getRequestSent.current) {
      const getData = async () => {
        console.log("REQUESTING EXPENSES");
        let response = await fetch(`/api/expense`, {
          method: "GET",
        });
        if (response.ok) {
          let content = await response.json();
          content = content.data;
          setData((prev) => {
            return {
              ...prev,
              expenses: content.expenses,
              categories: content.categories,
              monthlyAvg: content.monthlyAvg,
              yearlyAvg: content.yearlyAvg,
              weeklyTotal: content.weeklyTotal,
              monthlyTotal: content.monthlyTotal,
              yearlyTotal: content.yearlyTotal,
              totalsByCategory: content.totalsByCategory,
            };
          });
          localStorage.setItem(EXPENSE_CACHE, JSON.stringify(content));
          localStorage.setItem(REQUEST_EXPENSE, JSON.stringify(REQUEST_FALSE));
        } else {
          console.log(response);
        }
      };
      let cache = localStorage.getItem(EXPENSE_CACHE);
      let shouldRequest = localStorage.getItem(REQUEST_EXPENSE);
      shouldRequest = shouldRequest ? JSON.parse(shouldRequest) : false;
      if (cache != null && shouldRequest != null && !shouldRequest.request) {
        cache = JSON.parse(cache);
        setData((prev) => {
          return {
            ...prev,
            expenses: cache.expenses,
            categories: cache.categories,
            monthlyAvg: cache.monthlyAvg,
            yearlyAvg: cache.yearlyAvg,
            weeklyTotal: cache.weeklyTotal,
            monthlyTotal: cache.monthlyTotal,
            yearlyTotal: cache.yearlyTotal,
            totalsByCategory: cache.totalsByCategory,
          };
        });
      } else {
        getData();
      }
      getRequestSent.current = true;
    }
  }, []);
  function handleCatClick(e) {
    const strData = e.currentTarget.getAttribute("data-value");
    const jsonData = JSON.parse(strData);
    setParameters((prev) => {
      return { ...prev, category: jsonData };
    });
  }
  // console.log(data);
  return (
    <ExpenseContext.Provider value={{ setData, data, parameters }}>
      <MainLayout>
        <h1 className="mainTitle">Gastos</h1>
        <hr />
        <div className="greybox">
          <ul className="infoList">
            <li>Semana actual: ${data.weeklyTotal}</li>
            <li>Mes actual: ${data.monthlyTotal}</li>
            <li>Año actual: ${data.yearlyTotal}</li>
            <li>Gasto mensual promedio: ${data.monthlyAvg}</li>
            <li>Gasto anual promedio: ${data.yearlyAvg}</li>
          </ul>
        </div>
        <div className="greybox">
          <div className="infoList">
            <p>Categorías:</p>
            <div
              data-value={JSON.stringify({
                _id: "",
                isDefault: true,
                name: "",
              })}
              className={`category ${
                parameters.category._id === "" ? "activeCategory" : ""
              }`}
              onClick={handleCatClick}
            >
              <p>Todas</p>
            </div>
            {data.categories.map((item) => {
              return (
                <div
                  disabled={parameters.showType === TYPE_CATEGORY && true}
                  key={item._id}
                  data-value={JSON.stringify(item)}
                  className={`category ${
                    parameters.category._id === item._id ? "activeCategory" : ""
                  }`}
                  // onClick={handleCatClick}
                  onClick={
                    parameters.showType === SPECIFIC ? handleCatClick : () => {}
                  }
                >
                  <p>{item.name}</p>
                  {!item.isDefault && <DeleteCategory _id={item._id} />}
                </div>
              );
            })}
            <AddCategory setData={setData} />
          </div>
        </div>
        <div className="optionDiv">
          <AddExpense data={data} setData={setData} />
          <SwitchBtn setParameters={setParameters} />
          <FilterExpense
            parameters={parameters}
            setParameters={setParameters}
          />
        </div>
        {parameters.showType === SPECIFIC && <ExpenseTable data={data} />}
        {parameters.showType === TYPE_CATEGORY && <TotalTable data={data} />}
      </MainLayout>
    </ExpenseContext.Provider>
  );
}
export default Dashboard;
