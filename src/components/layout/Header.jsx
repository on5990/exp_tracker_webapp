import Link from "next/link";
import React from "react";

function Header() {
  return (
    <>
      <header className="navHeader">
        <nav className="navbar">
          <ul className="navUl">
            <li>
              <Link className="navLink" href="/dashboard">
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
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
