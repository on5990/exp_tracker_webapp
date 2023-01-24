import formatHelpers from "@/lib/frontendHelpers/formatHelpers";
import { encryptData } from "@/lib/frontendHelpers/encryptData.tsx";
import React, { useState } from "react";
import { useEffect } from "react";
function Signup(props) {
  const { setShowLogin } = props;
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmation: "",
  });
  const [errors, setErrors] = useState({
    emailError: "",
    passError: "",
    confirmationError: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    if (showSuccess) {
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }
    if (errorMsg) {
      setTimeout(() => {
        setErrorMsg("");
      }, 5000);
    }
  }, [showSuccess, errorMsg]);
  function renderLogin() {
    setShowLogin(true);
    setData((prev) => {
      return { ...prev, email: "", password: "", confirmation: "" };
    });
    setErrors((prev) => {
      return { ...prev, emailError: "", passError: "", confirmationError: "" };
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    let pass = true;
    const trEmail = data.email.trim();
    const trPass = data.password.trim();
    const trConf = data.confirmation.trim();
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
    } else if (!formatHelpers.isSafe(trPass)) {
      pass = false;
      setErrors((prev) => {
        return {
          ...prev,
          passError:
            "Esta contraseña no es segura, debe tener una longitud mínima de 9 caracteres y debe contener letras mayúsculas, minúsuculas, números y caracteres especiales (!@#$%^&*)",
        };
      });
    }
    if (trConf === "") {
      pass = false;
      setErrors((prev) => {
        return { ...prev, confirmationError: "Este campo es requerido" };
      });
    } else if (trConf !== trPass) {
      pass = false;
      setErrors((prev) => {
        return { ...prev, confirmationError: "Las contraseñas no coinciden" };
      });
    }
    if (pass) {
      const signup = async () => {
        const encryptedData = encryptData({
          email: trEmail,
          password: trPass,
        });
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            encryptedData: encryptedData,
          }),
        });
        console.log(await response.json());
        if (response.status === 409) {
          setErrorMsg("Este e-mail ya está registrado");
        } else if (response.status === 400) {
          setErrorMsg("Ocurrió un error, intente más tarde");
        } else if (response.status === 200) {
          setShowSuccess(true);
        }
        setData((prev) => {
          return { ...prev, email: "", password: "", confirmation: "" };
        });
        setErrors((prev) => {
          return {
            ...prev,
            emailError: "",
            passError: "",
            confirmationError: "",
          };
        });
      };
      signup();
    }
  }
  return (
    <>
      <div className="indexForm">
        <div className="formDiv">
          <h1>REGISTRO</h1>
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
            {errors.emailError && <p className="error">{errors.emailError}</p>}
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
            {errors.passError && <p className="error">{errors.passError}</p>}
            <label>Confirmar contraseña</label>
            <br />
            <input
              type="password"
              name="confirmation"
              value={data.confirmation}
              onChange={(e) => {
                setData((prev) => {
                  return { ...prev, confirmation: e.target.value };
                });
                if (e.target.value !== "") {
                  setErrors((prev) => {
                    return { ...prev, confirmationError: "" };
                  });
                }
              }}
            />
            <br />
            {errors.confirmationError && (
              <p className="error">{errors.confirmationError}</p>
            )}
            <button type="submit" className="formBtn" onClick={handleSubmit}>
              Aceptar
            </button>
            {errorMsg && (
              <div className="errorMsg">
                <p>{errorMsg}</p>
              </div>
            )}
            {showSuccess && (
              <div className="successMsg">
                <p>Registro realizado con éxito</p>
              </div>
            )}
          </form>
          <p className="back" onClick={renderLogin}>
            <u>Volver al inicio de sesión</u>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
