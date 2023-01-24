import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function Header() {
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
        <div className="userSection">
          <p>Oscar Navarro Mondaca</p>
          <button onClick={logout}>Salir</button>
        </div>
      </header>
    </>
  );
}

export default Header;
