import { Logo } from "../assets/logo";
import { Link } from "react-router-dom";
import LayoutAuth from "../layout/LayoutAuth";
import PasswordField from "../componentes/Inputs/PasswordField";
import { useRef } from "react";
import { useState } from "react";
import clientAxios from "../config/axiosClient";
import NormalInput from "../componentes/Inputs/NormalInput";
import FormsButtons from "../componentes/buttons/FormButtons";
import ThemeButton from "../componentes/buttons/ThemeButton";
const Register = () => {
  const passwordRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();

  const [error, setError] = useState({
    password: false,
    name: false,
    email: false,
  });

  const [enviado, setEnviado] = useState(false);

  const [alerta, setAlerta] = useState("");

  const formSubmit = async () => {
    if (alerta) {
      setAlerta("");
    }
    const { value: password } = passwordRef.current;
    const { value: name } = nameRef.current;
    const { value: email } = emailRef.current;

    const errors = {};

    if (!password) {
      errors.password = "Contraseña esta vacia";
    }
    if (!name) {
      errors.name = "Nombre esta vacio";
    }
    if (!email) {
      errors.email = "Email esta vacio";
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
      errors.email = "Email no  es valido";
    }

    setError(errors);
    if (!password || !name || errors.email) return;

    try {
      const { data } = await clientAxios.post(`/usuarios/registrar`, {
        nombre: name,
        password,
        email,
      });

      setAlerta(data.msg);
      setEnviado(true);
    } catch (error) {
      setError({
        [error.response.data.field]: error.response.data.msg,
      });
    }
  };

  return (
    <>
      <LayoutAuth nextPage={"login"}>
        <div className="max-w-md flex flex-col gap-12 items-center ">
          <Link to={"/"}>
            <img
              src={Logo}
              width={150}
              alt="jabbits-logo"
              className="dark:invert"
            />
          </Link>

          <div className="flex flex-col gap-5 text-center">
            <h1 className="font-bold text-2xl md:text-5xl">Crea una cuenta</h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
              Crea una cuenta para empezar a organizar de mejor manera tus
              futuros proyectos
            </p>
          </div>

          {alerta && (
            <p className="text-yellow-500 text-lg font-bold">{alerta}</p>
          )}
          {!enviado && (
            <>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  formSubmit();
                }}
                method="POST"
                noValidate
                className="flex flex-col gap-10 w-full"
              >
                <NormalInput
                  input={{
                    placeholder: "Nombre",
                    type: "text",
                    name: "name",
                    onClick: () => {
                      setError({ ...error, name: false });
                    },
                    onChange: () => {
                      setError({ ...error, name: false });
                    },
                  }}
                  ref={nameRef}
                  error={error.name}
                />

                <NormalInput
                  input={{
                    placeholder: "Email",
                    type: "email",
                    onClick: () => {
                      setError({ ...error, email: false });
                    },
                    onChange: () => {
                      setError({ ...error, email: false });
                    },
                  }}
                  ref={emailRef}
                  error={error.email}
                />

                <PasswordField
                  input={{
                    placeholder: "Contraseña",
                    onClick: () => {
                      setError({ ...error, password: false });
                    },
                    onChange: () => {
                      setError({ ...error, password: false });
                    },
                  }}
                  ref={passwordRef}
                  error={error.password}
                />

                <FormsButtons text={"Crea tu cuenta"} />
              </form>

              <div className="flex flex-col gap-2 items-center pb-2">
                <p className="">
                  Tienes una cuenta ?{" "}
                  <Link className="text-blue-600" to={"/login"}>
                    Inicia sesion
                  </Link>
                </p>
                <ThemeButton style={"md:hidden border-none p-0 m-0"} />
              </div>
            </>
          )}
        </div>
      </LayoutAuth>
    </>
  );
};

export default Register;
