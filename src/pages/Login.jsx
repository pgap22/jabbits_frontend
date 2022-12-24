import { Logo } from "../assets/logo";
import { Link, useNavigate } from "react-router-dom";

import LayoutAuth from "../layout/LayoutAuth";
import PasswordField from "../componentes/Inputs/PasswordField";
import { useRef } from "react";
import { useState } from "react";
import clientAxios from "../config/axiosClient";
import NormalInput from "../componentes/Inputs/NormalInput";
import FormsButtons from "../componentes/buttons/FormButtons";
import useAuth from "../hooks/useAuth";
import ThemeButton from "../componentes/buttons/ThemeButton";

const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [alerta, setAlerta] = useState("");

  const email = useRef();
  const password = useRef();

  const { setAuth } = useAuth();

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const { value: emailValue } = email.current;
    const { value: passwordValue } = password.current;

    const errors = {
      email: "",
      password: "",
    };
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(emailValue)) {
      errors.email = "Email no valido";
    }
    if (!emailValue) {
      errors.email = "Email esta vacio";
    }
    if (!passwordValue) {
      errors.password = "Contraseña esta vacia";
    }
    setErrors(errors);
    if (!errors.email & !errors.password) {
      try {
        const { data } = await clientAxios.post(`/usuarios/login`, {
          email: emailValue,
          password: passwordValue,
        });

        setAuth(data);
        localStorage.setItem("token", data.token);
        navigate("/")
      } catch (error) {
        setAlerta("El email o la contraseña estan incorrectos");
        setErrors({
          email: true,
          password: true,
        });
      }
    }
  };

  return (
    <>
      <LayoutAuth nextPage={"register"}>
        <div className="flex flex-col gap-6 md:gap-12 items-center ">
          <Link to={"/"}>
            <img
              src={Logo}
              width={150}
              alt="jabbits-logo"
              className="dark:invert"
            />
          </Link>

          <div className="flex flex-col gap-5 text-center">
            <h1 className="font-bold text-2xl md:text-5xl">Bienvenido Otra Vez !</h1>
            <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300">
              Sigue aumentando la productividad de tus proyectos
            </p>
            <span className="text-red-500 font-bold">{alerta && alerta}</span>
          </div>

          <form
            onSubmit={handlerSubmit}
            noValidate
            className="max-w-sm flex flex-col gap-10 w-full"
            action=""
          >
            <NormalInput
              input={{
                placeholder: "Email",
                name: "email",
                type: "email",
                onClick: () => {
                  setErrors({ ...errors, email: false });
                },
                onChange: () => {
                  setErrors({ ...errors, email: false });
                },
              }}
              error={errors.email}
              ref={email}
            />

            <PasswordField
              input={{
                name: "password",
                placeholder: "Contraseña",
                onClick: () => {
                  setErrors({ ...errors, password: false });
                },
                onChange: () => {
                  setErrors({ ...errors, password: false });
                },
              }}
              error={errors.password}
              ref={password}
            />

            <FormsButtons text={"Iniciar Sesion"} />
          </form>

          <div className="flex flex-col items-center gap-5 pb-5">
            <p className="text-sm md:text-base">
              No tienes una cuenta{" "}
              <Link className="text-blue-600" to={"/register"}>
                Registrate
              </Link>
            </p>
            <p className="text-sm md:text-base">
              Olvidaste la contraseña ?{" "}
              <Link className="text-blue-600" to={"/forget-password"}>
                Haz click aqui
              </Link>
            </p>
            <ThemeButton style={"md:hidden border-none p-0 m-0"} />
          </div>
        </div>
      </LayoutAuth>
    </>
  );
};

export default Login;
