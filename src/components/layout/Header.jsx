import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const sections = [
  { id: "1", name: "Gastos", url: "/dashboard" },
  { id: "2", name: "Cuentas", url: "/dashboard/bills" },
  { id: "3", name: "Presupuesto", url: "/dashboard/budgets" },
  { id: "4", name: "Gráficos", url: "/dashboard/charts" },
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
        router.push("/dashboard");
      }
      console.log(await response.json());
    };
    closeSession();
  }
  function handleClick(e) {
    setSection(e.target.value);
  }
  console.log("SECTION", section);
  return (
    <>
      <header className="navHeader">
        <nav className="navbar">
          <ul className="navUl">
            {sections.map((item) => {
              return (
                <li key={item.id} value={item.id} onClick={handleClick}>
                  <Link
                    className={`navLink ${
                      section === item.id ? "activeLink" : ""
                    }`}
                    href={item.url}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
            {/* <li>
              <Link className="navLink"  href="/dashboard">
                Gastos
              </Link>
            </li>
            <li>
              <Link className="navLink" href="/dashboard/bills">
                Cuentas
              </Link>
            </li>
            <li>
              <Link className="navLink" href="/dashboard/budgets">
                Presupuesto
              </Link>
            </li>
            <li>
              <Link className="navLink" href="/dashboard/charts">
                Gráficos
              </Link>
            </li> */}
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
