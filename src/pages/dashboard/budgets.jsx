import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import AddBudget from "../../components/budget/AddBudget";
import BudgetTable from "../../components/budget/BudgetTable";
import SearchBudget from "../../components/budget/SearchBudget";
import MainLayout from "../../components/layout/MainLayout";
import {
  BUDGET_CACHE,
  BUDGET_SECTION,
  SECTION_CACHE,
} from "../../global/constants";
import budgetRequest from "../../lib/frontendHelpers/requests/budget.request";
export const BudgetContext = React.createContext();
function Budgets() {
  const [data, setData] = useState({});
  const [search, setSearch] = useState("");
  const getRequestCalled = useRef(false);
  useEffect(() => {
    const empty = JSON.stringify({});
    const strJson = JSON.stringify(data);
    if (empty != strJson) {
      localStorage.setItem(BUDGET_CACHE, strJson);
    }
  }, [data]);
  useEffect(() => {
    localStorage.setItem(SECTION_CACHE, JSON.stringify(BUDGET_SECTION));
    if (!getRequestCalled.current) {
      const getData = async () => {
        const response = await budgetRequest.get();
        setData(response);
      };
      getData();
      getRequestCalled.current = true;
    }
  }, []);
  return (
    <BudgetContext.Provider value={{ data, setData, search, setSearch }}>
      <MainLayout>
        <Head>
          <title>Presupuesto</title>
        </Head>
        <h1 className="mainTitle">Presupuesto</h1>
        <hr />
        <div className="greybox">
          <ul className="infoList">
            <li>Exceso: ${data.excess}</li>
          </ul>
        </div>
        <div className="optionDiv">
          <AddBudget />
          <SearchBudget />
        </div>
        <BudgetTable />
      </MainLayout>
    </BudgetContext.Provider>
  );
}

export default Budgets;
