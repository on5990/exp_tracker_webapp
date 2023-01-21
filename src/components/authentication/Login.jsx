import formatHelpers from "@/helpers/formatHelpers";
import React, { useState } from "react";

function Login(props) {
  const { setShowLogin } = props;
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ emailError: "", passError: "" });
  function renderSignup() {
    setShowLogin(false);
    setData((prev) => {
      return { ...prev, email: "", password: "" };
    });
    setErrors((prev) => {
      return { ...prev, emailError: "", passError: "" };
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    let pass = true;
    const trEmail = data.email.trim();
    const trPass = data.password.trim();
    if (trEmail === "") {
      pass = false;
      setErrors((prev) => {
        return { ...prev, emailError: "Este campo es requerido" };
      });
    } else if (!formatHelpers.isEmail(trEmail)) {
      pass = false;
      setErrors((prev) => {
        return { ...prev, emailError: "El e-mail ingresado es inválido" };
      });
    }
    if (trPass === "") {
      pass = false;
      setErrors((prev) => {
        return { ...prev, passError: "Este campo es requerido" };
      });
    }
    if (pass) {
      const login = async () => {
        console.log("PASS");
        setData((prev) => {
          return { ...prev, email: "", password: "" };
        });
      };
      login();
    }
  }
  return (
    <>
      <div className="indexForm">
        <div className="formDiv">
          <h1>INICIO DE SESIÓN</h1>
          <form>
            <label htmlFor="email">E-Mail</label>
            <br />
            <input
              type="text"
              name="email"
              value={data.email}
              onChange={(e) => {
                setData((prev) => {
                  return { ...prev, email: e.target.value };
                });
                if (e.target.value !== "") {
                  setErrors((prev) => {
                    return { ...prev, emailError: "" };
                  });
                }
              }}
            />
            <br />
            <p className="error">{errors.emailError}</p>
            <label htmlFor="password">Contraseña</label>
            <br />
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={(e) => {
                setData((prev) => {
                  return { ...prev, password: e.target.value };
                });
                if (e.target.value !== "") {
                  setErrors((prev) => {
                    return { ...prev, passError: "" };
                  });
                }
              }}
            />
            <br />
            <p className="error">{errors.passError}</p>
            <button type="submit" className="formBtn" onClick={handleSubmit}>
              Ingresar
            </button>
          </form>
          <p>
            ¿No tiene una cuenta?{" "}
            <span onClick={renderSignup}>
              <u>Regístrese</u>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
