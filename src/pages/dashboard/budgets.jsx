import React, { useEffect, useRef, useState } from "react";
import AddBudget from "../../components/budget/AddBudget";
import BudgetTable from "../../components/budget/BudgetTable";
import SearchBudget from "../../components/budget/SearchBudget";
import MainLayout from "../../components/layout/MainLayout";
export const BudgetContext = React.createContext();
function Budgets() {
  const [data, setData] = useState({});
  const [search, setSearch] = useState("");
  const getRequestCalled = useRef(false);
  useEffect(() => {
    if (!getRequestCalled.current) {
      const getData = async () => {
        const response = await fetch("/api/budget", {
          method: "GET",
        });
        const content = await response.json();
        if (response.ok) {
          setData(content.data);
        } else {
          console.log(content);
        }
      };
      getData();
      getRequestCalled.current = true;
    }
  }, []);
  return (
    <BudgetContext.Provider value={{ data, setData, search }}>
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
