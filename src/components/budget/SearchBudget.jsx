import React, { useContext } from "react";
import { BudgetContext } from "../../pages/dashboard/budgets";

function SearchBudget() {
  const { search, setSearch } = useContext(BudgetContext);
  function handleChange(e) {
    setSearch(e.target.value);
  }
  return (
    <>
      <div className="searchDiv">
        <div className="filterItem searchItem">
          <p>Buscar: </p>
          <input
            type="text"
            name="search"
            value={search}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
}

export default SearchBudget;
