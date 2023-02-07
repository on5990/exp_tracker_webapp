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
    let id = e.currentTarget.getAttribute("data-value");
    id = id.replace(/"/g, "");
    localStorage.setItem(SECTION_CACHE, JSON.stringify({ section: id }));
  }
  return (
    <>
      <header className="navHeader">
        <nav className="navbar">
          <ul className="navUl">
            {sections.map((item) => {
              return (
                <li key={item.id}>
                  <Link className={"navLink"} href={item.url}>
                    <span
                      className={section == item.id && "activeLink"}
                      data-value={JSON.stringify(item.id)}
                      onClick={handleClick}
                    >
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="userSection">
          <button onClick={logout}>Salir</button>
        </div>
      </header>
    </>
  );
}

export default Header;
