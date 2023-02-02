import React, { useEffect, useRef, useState } from "react";
import AddBill from "../../components/bills/AddBill";
import BillsTable from "../../components/bills/BillsTable";
import SearchBill from "../../components/bills/SearchBill";
import MainLayout from "../../components/layout/MainLayout";
import {
  BILL_CACHE,
  BILL_SECTION,
  REQUEST_BILL,
  REQUEST_FALSE,
  SECTION_CACHE,
} from "../../global/constants";
export const BillContext = React.createContext();
function Bills() {
  const [data, setData] = useState({});
  const [search, setSearch] = useState("");
  const getRequestCalled = useRef(false);
  useEffect(() => {
    const empty = JSON.stringify({});
    const strJson = JSON.stringify(data);
    if (empty != strJson) {
      localStorage.setItem(BILL_CACHE, strJson);
    }
  }, [data]);
  useEffect(() => {
    localStorage.setItem(SECTION_CACHE, JSON.stringify(BILL_SECTION));
    if (!getRequestCalled.current) {
      const getData = async () => {
        console.log("REQUESTING BILL");
        const response = await fetch("/api/bill", { method: "GET" });
        const content = await response.json();
        if (response.ok) {
          setData(content.data);
          localStorage.setItem(BILL_CACHE, JSON.stringify(content.data));
          localStorage.setItem(REQUEST_BILL, JSON.stringify(REQUEST_FALSE));
        } else {
          console.log(content);
        }
      };
      let cache = localStorage.getItem(BILL_CACHE);
      let shouldRequest = localStorage.getItem(REQUEST_BILL);
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
    <BillContext.Provider value={{ data, setData, search, setSearch }}>
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
