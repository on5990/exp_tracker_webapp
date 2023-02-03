import React, { useEffect, useRef, useState } from "react";
import AddBill from "../../components/bills/AddBill";
import BillsTable from "../../components/bills/BillsTable";
import SearchBill from "../../components/bills/SearchBill";
import MainLayout from "../../components/layout/MainLayout";
import {
  BILL_CACHE,
  BILL_SECTION,
  SECTION_CACHE,
} from "../../global/constants";
import billRequest from "../../lib/frontendHelpers/requests/bill.request";
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
        const response = await billRequest.get();
        console.log("BILLS RES", response);
        setData(response);
      };
      getData();
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
            <li>Total de este mes: ${data.monthTotal}</li>
            <li>Total de este año: ${data.yearTotal}</li>
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
