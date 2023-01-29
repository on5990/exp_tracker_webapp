import React, { useEffect, useRef, useState } from "react";
import AddCategory from "../../components/expense/AddCategory";
import AddExpense from "../../components/expense/AddExpense";
import ExpenseTable from "../../components/expense/ExpenseTable";
import FilterExpense from "../../components/expense/FilterExpense";
import SwitchBtn from "../../components/expense/SwitchBtn";
import MainLayout from "../../components/layout/MainLayout";
import { CATEGORY } from "../../global/constants";
import getHelpers from "../../lib/frontendHelpers/getHelpers";

const categories = [
  { _id: "1", isDefault: true, name: "Abarrotes" },
  { _id: "2", isDefault: true, name: "Verduras" },
  { _id: "3", isDefault: true, name: "Cuentas" },
  { _id: "4", isDefault: true, name: "Transporte" },
  { _id: "5", isDefault: true, name: "Viajes" },
  { _id: "6", isDefault: true, name: "Médico" },
  { _id: "7", isDefault: true, name: "Otros" },
];

function Dashboard() {
  const [data, setData] = useState({
    expenses: [],
    categories: [],
    weeklyAvg: null,
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
    showType: "",
  });
  const useEffectCalled = useRef(false);
  useEffect(() => {
    if (!useEffectCalled.current) {
      console.log("CALLING USE EFFECT");
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
              weeklyAvg: info.weeklyAvg,
              monthlyAvg: info.monthlyAvg,
              yearlyAvg: info.yearlyAvg,
            };
          });
        } else {
          throw new Error(`Error: ${response.status}`);
        }
      };
      getData();
      useEffectCalled.current = true;
    }
  }, []);
  useEffect(() => {
    if (parameters.showType === CATEGORY) {
      setParameters((prev) => {
        return {
          ...prev,
          timeType: "",
          category: { _id: "", isDefault: true, name: "" },
        };
      });
    }
  }, [parameters.showType]);
  function handleCatClick(e) {
    const jsonData = JSON.parse(e.currentTarget.value);
    setParameters((prev) => {
      return { ...prev, category: jsonData };
    });
  }
  // console.log(data);
  return (
    <>
      <MainLayout>
        <h1 className="mainTitle">Gastos</h1>
        <hr />
        <div className="greybox">
          <ul className="infoList">
            <li>Semana actual:</li>
            <li>Mes actual:</li>
            <li>Año actual:</li>
            <li>Exceso:</li>
            <li>Gasto mensual promedio:</li>
            <li>Gasto anual promedio:</li>
          </ul>
        </div>
        <div className="greybox">
          <div className="infoList">
            <p>Categorías:</p>
            {data.categories.map((item) => {
              return (
                <button
                  type="button"
                  key={item._id}
                  value={JSON.stringify(item)}
                  className={`category ${
                    parameters.category._id === item._id ? "activeCategory" : ""
                  }`}
                  onClick={handleCatClick}
                >
                  <p>{item.name}</p>
                </button>
              );
            })}
            <AddCategory setData={setData} />
          </div>
        </div>
        <div className="optionDiv">
          <AddExpense />
          <SwitchBtn setParameters={setParameters} />
          <FilterExpense
            parameters={parameters}
            setParameters={setParameters}
          />
        </div>
        <ExpenseTable />
      </MainLayout>
    </>
  );
}
export default Dashboard;
// export async function getServerSideProps() {
//   let data = await fetch(`localhost:3010/api/expense`, {
//     method: "GET",
//   });
//   console.log(data);
//   return {
//     props: { data: data },
//   };
// }
