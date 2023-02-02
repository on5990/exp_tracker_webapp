import React, { useContext } from "react";
import { BillContext } from "../../pages/dashboard/bills";

function SearchBill() {
  const { search, setSearch } = useContext(BillContext);
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

export default SearchBill;
