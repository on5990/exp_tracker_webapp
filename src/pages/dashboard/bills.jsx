import React, { useEffect, useRef, useState } from "react";
import AddBill from "../../components/bills/AddBill";
import BillsTable from "../../components/bills/BillsTable";
import SearchBill from "../../components/bills/SearchBill";
import MainLayout from "../../components/layout/MainLayout";
export const BillContext = React.createContext();
function Bills() {
  const [data, setData] = useState({});
  const [search, setSearch] = useState("");
  const getRequestCalled = useRef(false);
  useEffect(() => {
    if (!getRequestCalled.current) {
      const getData = async () => {
        const response = await fetch("/api/bill", { method: "GET" });
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
    <BillContext.Provider value={{ data, setData, search }}>
      <MainLayout>
        <h1 className="mainTitle">Cuentas</h1>
        <hr />
        <div className="greybox">
          <ul className="infoList">
            <li>Total mensual: </li>
            <li>Total anual: </li>
          </ul>
        </div>
        <div className="optionDiv">
          <AddBill />
          <SearchBill />
        </div>
        <BillsTable />
      </MainLayout>
    </BillContext.Provider>
  );
}

export default Bills;
