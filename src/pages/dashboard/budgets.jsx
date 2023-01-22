import React from "react";
import AddBudget from "../../components/budget/AddBudget";
import BudgetTable from "../../components/budget/BudgetTable";
import SearchBudget from "../../components/budget/SearchBudget";
import MainLayout from "../../components/layout/MainLayout";

function Budgets() {
  return (
    <>
      <MainLayout>
        <h1 className="mainTitle">Presupuesto</h1>
        <hr />
        <div className="greybox">
          <ul className="infoList">
            <li>Exceso:</li>
          </ul>
        </div>
        <div className="optionDiv">
          <AddBudget />
          <SearchBudget />
        </div>
        <BudgetTable />
      </MainLayout>
    </>
  );
}

export default Budgets;
