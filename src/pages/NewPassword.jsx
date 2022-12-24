import { Link, useNavigate, useParams } from "react-router-dom";
import LayoutAuth from "../layout/LayoutAuth";
import { Logo } from "../assets/logo";
import BackgroundImage from "../assets/bg2.jpg";
import { useEffect, useRef } from "react";
import { useState } from "react";
import PasswordField from "../componentes/Inputs/PasswordField";
import clientAxios from "../config/axiosClient";

const NewPassword = () => {
  const { token } = useParams();
  const [tokenValid, setToken] = useState(false);

  const validateToken = async () => {
    try {
      const { data } = await clientAxios.get(
        `/usuarios/olvide-password/${token}`
      );
      console.log(data);
      setToken(true);
    } catch (error) {
      console.log(error.response.data);
      setToken(false);
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  const [error, setError] = useState("");
  const [alerta, setAlerta] = useState("");
  const password = useRef();
  const navigator = useNavigate();

  const handlerSubmit = async (e) => {
    e.preventDefault();

    const { value: passwordValue } = password.current;

    if (!passwordValue) {
      setError("Password is empty");
      return;
    }

    try {
      await clientAxios.put(`/usuarios/olvide-password/${token}`, {
        password: passwordValue,
      });
      setAlerta("Tu Contraseña a sido cambiada. Redireccionando a Iniciar Sesion !");
      setTimeout(() => {
        navigator("/login");
      }, 2000);
    } catch (error) {
      setAlerta("Hubo un error");
    }
  };

  if (!tokenValid) {
    return (
      <main className="md:min-h-screen flex md:items-center justify-center">
        <div className="border-2 shadow-lg p-4 max-w-lg text-center rounded-md w-[90%] flex flex-col items-center gap-4">
          <Link to={"/"}>
            <img src={Logo} alt="Logo" className="dark:invert" width={200} />
          </Link>
          <h1 className="font-bold text-2xl">Cambia tu contraseña</h1>
          <p className="text-red-500">Token invalido</p>
          <Link to={"/"}>Go home</Link>
        </div>
      </main>
    );
  }

  return (
    <LayoutAuth imageBg={BackgroundImage}>
      <div className="flex flex-col gap-12 items-center ">
        <Link to={"/"}>
          <img
            src={Logo}
            width={150}
            alt="jabbits-logo"
            className="dark:invert"
          />
        </Link>

        <div className="flex flex-col gap-5 text-center">
          <h1 className="font-bold text-2xl md:text-5xl">Cambia tu contraseña</h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
            Estamos felices que recuperes el acceso a tus proyectos
          </p>
          <span className="text-green-500">{alerta}</span>
        </div>

        <form
          onSubmit={handlerSubmit}
          noValidate
          className="flex flex-col max-w-sm gap-10 w-full"
        >
          <PasswordField
            input={{
              placeholder: "Password",
              onClick: () => {
                setError("");
              },
              onChange: () => {
                setError("");
              },
            }}
            error={error}
            ref={password}
          />

          <div className="flex flex-col gap-3">
            <button className="dark:border-white border border-black bg-black p-2 text-white text-lg font-bold rounded-full">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </LayoutAuth>
  );
};
export default NewPassword;
