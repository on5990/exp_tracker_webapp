import React, { useState } from "react";
import AddCategory from "../../components/expense/AddCategory";
import AddExpense from "../../components/expense/AddExpense";
import ExpenseTable from "../../components/expense/ExpenseTable";
import FilterExpense from "../../components/expense/FilterExpense";
import SwitchBtn from "../../components/expense/SwitchBtn";
import MainLayout from "../../components/layout/MainLayout";

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
  const [parameters, setParameters] = useState({
    category: { _id: "", isDefault: true, name: "" },
    // Search by month or year
    timeType: "",
    // Selected time expression
    time: "",
    // List of expenses or list of totals by category
    showType: "",
  });
  function handleCatClick(e) {
    const jsonData = JSON.parse(e.currentTarget.value);
    setParameters((prev) => {
      return { ...prev, category: jsonData };
    });
    setTimeout(1000);
  }
  console.log(parameters);
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
            {categories.map((item) => {
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
            <AddCategory />
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
