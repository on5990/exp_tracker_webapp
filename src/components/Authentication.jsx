import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

function Authentication() {
  const [showLogin, setShowLogin] = useState(false);
  const loginProps = {
    setShowLogin: setShowLogin,
  };
  return (
    <>
      {showLogin && <Login setShowLogin={setShowLogin} />}
      {!showLogin && <Signup setShowLogin={setShowLogin} />}
    </>
  );
}

export default Authentication;
