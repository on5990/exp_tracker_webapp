import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  BILL_SECTION,
  BUDGET_SECTION,
  CHARTS_SECTION,
  EXPENSE_SECTION,
  SECTION_CACHE,
} from "../../global/constants";

const sections = [
  { id: EXPENSE_SECTION.section, name: "Gastos", url: "/dashboard" },
  { id: BILL_SECTION.section, name: "Cuentas", url: "/dashboard/bills" },
  {
    id: BUDGET_SECTION.section,
    name: "Presupuesto",
    url: "/dashboard/budgets",
  },
  { id: CHARTS_SECTION.section, name: "Gráficos", url: "/dashboard/charts" },
];

function Header() {
  const [section, setSection] = useState("");
  const router = useRouter();
  function logout() {
    const closeSession = async () => {
      const response = await fetch("/api/auth/logout", {
        method: "DELETE",
      });
      if (response.ok) {
        localStorage.clear();
        router.push("/");
      }
      console.log(await response.json());
    };
    closeSession();
  }
  useEffect(() => {
    let cache = localStorage.getItem(SECTION_CACHE);
    if (cache != null) {
      cache = JSON.parse(cache);
      setSection(cache.section);
    }
  }, []);
  function handleClick(e) {
    setSection(e.target.value);
  }
  return (
    <>
      <header className="navHeader">
        <nav className="navbar">
          <ul className="navUl">
            {sections.map((item) => {
              return (
                <li key={item.id} value={item.id} onClick={handleClick}>
                  <Link
                    className={`${
                      section == item.id ? "activeLink" : "navLink"
                    }`}
                    href={item.url}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="userSection">
          <p>Oscar Navarro Mondaca</p>
          <button onClick={logout}>Salir</button>
        </div>
      </header>
    </>
  );
}

export default Header;
