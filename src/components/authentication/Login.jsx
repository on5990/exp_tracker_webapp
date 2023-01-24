import formatHelpers from "@/lib/frontendHelpers/formatHelpers";
import { encryptData } from "@/lib/frontendHelpers/encryptData.tsx";
import React, { useEffect, useState } from "react";

function Login(props) {
  const { setShowLogin } = props;
  const [data, setData] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);
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
  useEffect(() => {
    if (errorMsg) {
      setTimeout(() => {
        setErrorMsg("");
      }, 5000);
    }
    if (disableSubmit) {
      setTimeout(() => {
        setDisableSubmit(false);
      }, 5000);
    }
  }, [errorMsg, disableSubmit]);
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
        const encryptedData = encryptData({
          email: trEmail,
          password: trPass,
        });
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            encryptedData: encryptedData,
          }),
        });
        console.log(await response.json());
        if (response.status === 404) {
          setErrorMsg("Usuario no existe");
        } else if (response.status === 401) {
          setErrorMsg("Contraseña incorrecta");
          setDisableSubmit(true);
        } else if (response.status === 400) {
          setErrorMsg("Ocurrió un error, intente más tarde");
        }
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
            {!disableSubmit && (
              <button type="submit" className="formBtn" onClick={handleSubmit}>
                Ingresar
              </button>
            )}
            {errorMsg && (
              <div className="errorMsg">
                <p>{errorMsg}</p>
              </div>
            )}
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
