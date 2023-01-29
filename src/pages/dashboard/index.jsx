import React, { useEffect, useRef, useState } from "react";
import AddCategory from "../../components/expense/AddCategory";
import AddExpense from "../../components/expense/AddExpense";
import DeleteCategory from "../../components/expense/DeleteCategory";
import ExpenseTable from "../../components/expense/ExpenseTable";
import FilterExpense from "../../components/expense/FilterExpense";
import SwitchBtn from "../../components/expense/SwitchBtn";
import TotalTable from "../../components/expense/TotalTable";
import MainLayout from "../../components/layout/MainLayout";
import { SPECIFIC, TYPE_CATEGORY } from "../../global/constants";

export const ExpenseContext = React.createContext();
function Dashboard() {
  const [data, setData] = useState({
    expenses: [],
    categories: [],
    monthlyAvg: null,
    yearlyAvg: null,
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
  // const sortByParams = useRef(false);
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
    if (!getRequestSent.current) {
      const getData = async () => {
        let response = await fetch(`/api/expense`, {
          method: "GET",
        });
        if (response.ok) {
          let info = await response.json();
          info = info.data;
          setData((prev) => {
            return {
              ...prev,
              expenses: info.expenses,
              categories: info.categories,
              monthlyAvg: info.monthlyAvg,
              yearlyAvg: info.yearlyAvg,
              weeklyTotal: info.weeklyTotal,
              monthlyTotal: info.monthlyTotal,
              yearlyTotal: info.yearlyTotal,
              totalsByCategory: info.totalsByCategory,
            };
          });
        } else {
          console.log(response);
        }
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
            <li>Exceso:</li>
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
