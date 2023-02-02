import React, { useEffect } from "react";
import MainLayout from "../../components/layout/MainLayout";
import { CHARTS_SECTION, SECTION_CACHE } from "../../global/constants";

function Charts() {
  useEffect(() => {
    localStorage.setItem(SECTION_CACHE, JSON.stringify(CHARTS_SECTION));
  }, []);
  return (
    <>
      <MainLayout>
        <h1 className="mainTitle">Gráficos</h1>
        <hr />
      </MainLayout>
    </>
  );
}

export default Charts;
