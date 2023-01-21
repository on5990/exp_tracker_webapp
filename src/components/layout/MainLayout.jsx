import React from "react";
import Navbar from "./Header";

function MainLayout({ children }) {
  return (
    <>
      <div className="mainLayout">
        <Navbar />
        <div className="pageContent">{children}</div>
      </div>
    </>
  );
}

export default MainLayout;
