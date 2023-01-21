import React, { Component } from "react";
import AddCategory from "../../components/expense/AddCategory";
import MainLayout from "../../components/layout/MainLayout";

function Dashboard() {
  return (
    <>
      <MainLayout>
        <h1 className="mainTitle">Gastos</h1>
        <hr />
        <div className="greybox">
          <ul className="infoList">
            <li>Semana actual:</li>
            <li>Mes actual:</li>
            <li>Año actual:</li>
            <li>Exceso:</li>
            <li>Gasto semanal promedio:</li>
            <li>Gasto mensual promedio:</li>
            <li>Gasto anual promedio:</li>
          </ul>
        </div>
        <div className="greybox">
          <div className="infoList">
            <p>Categorías:</p>
            <div className="category">
              <p>Abarrotes</p>
            </div>
            <div className="category">
              <p>Verduras</p>
            </div>
            <div className="category">
              <p>Cuentas</p>
            </div>
            <div className="category">
              <p>Transporte</p>
            </div>
            <div className="category">
              <p>Viajes</p>
            </div>
            <div className="category">
              <p>Médico</p>
            </div>
            <div className="category">
              <p>Remedios</p>
            </div>
            <div className="category">
              <p>Otros</p>
            </div>
            <AddCategory />
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default Dashboard;
