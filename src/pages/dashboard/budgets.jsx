import React, { useEffect, useRef, useState } from "react";
import AddBudget from "../../components/budget/AddBudget";
import BudgetTable from "../../components/budget/BudgetTable";
import SearchBudget from "../../components/budget/SearchBudget";
import MainLayout from "../../components/layout/MainLayout";
import {
  BUDGET_CACHE,
  BUDGET_SECTION,
  REQUEST_BUDGET,
  REQUEST_FALSE,
  SECTION_CACHE,
} from "../../global/constants";
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
        console.log("REQUESTING BUDGET");
        const response = await fetch("/api/budget", {
          method: "GET",
        });
        const content = await response.json();
        if (response.ok) {
          setData(content.data);
          localStorage.setItem(BUDGET_CACHE, JSON.stringify(content.data));
          localStorage.setItem(REQUEST_BUDGET, JSON.stringify(REQUEST_FALSE));
        } else {
          console.log(content);
        }
      };
      let cache = localStorage.getItem(BUDGET_CACHE);
      let shouldRequest = localStorage.getItem(REQUEST_BUDGET);
      shouldRequest = shouldRequest ? JSON.parse(shouldRequest) : false;
      if (cache != null && shouldRequest != null && !shouldRequest.request) {
        cache = JSON.parse(cache);
        setData(cache);
      } else {
        getData();
      }
      getRequestCalled.current = true;
    }
  }, []);
  return (
    <BudgetContext.Provider value={{ data, setData, search, setSearch }}>
      <MainLayout>
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
