import Head from "next/head";
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
  SECTION_CACHE,
  SPECIFIC,
  TYPE_CATEGORY,
} from "../../global/constants";
import expenseRequest from "../../lib/frontendHelpers/requests/expense.request";

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
        const response = await expenseRequest.get();
        setData((prev) => {
          return {
            ...prev,
            expenses: response.expenses,
            categories: response.categories,
            monthlyAvg: response.monthlyAvg,
            yearlyAvg: response.yearlyAvg,
            weeklyTotal: response.weeklyTotal,
            monthlyTotal: response.monthlyTotal,
            yearlyTotal: response.yearlyTotal,
            totalsByCategory: response.totalsByCategory,
          };
        });
      };
      getData();
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
  return (
    <ExpenseContext.Provider
      value={{ setData, data, setParameters, parameters }}
    >
      <MainLayout>
        <Head>
          <title>Gastos</title>
        </Head>
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
            <AddCategory />
          </div>
        </div>
        <div className="optionDiv">
          <AddExpense />
          <SwitchBtn />
          <FilterExpense />
        </div>
        {parameters.showType === SPECIFIC && <ExpenseTable />}
        {parameters.showType === TYPE_CATEGORY && <TotalTable />}
      </MainLayout>
    </ExpenseContext.Provider>
  );
}
export default Dashboard;
