import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import { CHARTS_SECTION, SECTION_CACHE } from "../../global/constants";
import expenseRequest from "../../lib/frontendHelpers/requests/expense.request";
import {
  totalMonths,
  totalWeeks,
  totalDays,
  totalCategoryMonth,
  totalCategoryYear,
  getProps,
} from "../../lib/frontendHelpers/chartHelpers";
import VertBarChart from "../../components/charts/VertBarChart";

export const ChartContext = React.createContext();

function Charts() {
  const [data, setData] = useState({
    expenses: [],
    totalsByCategory: [],
    categories: [],
  });
  const [chartInfo, setChartInfo] = useState({
    expenseMonth: [],
    expenseWeek: [],
    expenseDay: [],
    totalCatYear: [],
    totalCatMonth: [],
  });
  const getRequestSent = useRef(false);
  useEffect(() => {
    localStorage.setItem(SECTION_CACHE, JSON.stringify(CHARTS_SECTION));
    if (!getRequestSent.current) {
      const getData = async () => {
        const response = await expenseRequest.get();
        setData(response);
      };
      getData();
      getRequestSent.current = true;
    }
  }, []);
  useEffect(() => {
    const expMonthData = totalMonths(6, data.expenses);
    const expWeekData = totalWeeks(8, data.expenses);
    const expDayData = totalDays(15, data.expenses);
    setChartInfo((prev) => {
      return {
        ...prev,
        expenseMonth: {
          labels: getProps("label", expMonthData),
          totals: getProps("total", expMonthData),
        },
        expenseWeek: {
          labels: getProps("label", expWeekData),
          totals: getProps("total", expWeekData),
        },
        expenseDay: {
          labels: getProps("label", expDayData),
          totals: getProps("total", expDayData),
        },
      };
    });
  }, [data]);
  return (
    <ChartContext.Provider value={{ chartInfo }}>
      <MainLayout>
        <Head>
          <title>Gráficos</title>
        </Head>
        <h1 className="mainTitle">Gráficos</h1>
        <hr />
        <div className="chartSection">
          <div className="chartContainer">
            <VertBarChart
              title={"Gráfico de gastos por mes"}
              info={chartInfo.expenseMonth}
            />
          </div>
          <div className="chartContainer">
            <VertBarChart
              title={"Gráfico de gastos por semana"}
              info={chartInfo.expenseWeek}
            />
          </div>
          <div className="chartContainer">
            <VertBarChart
              title={"Gráfico de gastos por día"}
              info={chartInfo.expenseDay}
            />
          </div>
        </div>
      </MainLayout>
    </ChartContext.Provider>
  );
}

export default Charts;
