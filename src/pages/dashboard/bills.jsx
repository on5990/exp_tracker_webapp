import React from "react";
import AddBill from "../../components/bills/AddBill";
import BillsTable from "../../components/bills/BillsTable";
import SearchBill from "../../components/bills/SearchBill";
import MainLayout from "../../components/layout/MainLayout";

function Bills() {
  return (
    <>
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
    </>
  );
}

export default Bills;
