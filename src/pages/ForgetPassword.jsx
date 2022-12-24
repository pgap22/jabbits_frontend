import { Link } from "react-router-dom";
import LayoutAuth from "../layout/LayoutAuth";
import { Logo } from "../assets/logo";
import BackgroundImage from "../assets/bg2.jpg";
import { useRef } from "react";
import { useState } from "react";
import clientAxios from "../config/axiosClient";
import NormalInput from "../componentes/Inputs/NormalInput";
const ForgetPassword = () => {
  const [error, setError] = useState("");
  const [alerta, setAlerta] = useState({
    error: "",
    msg: "",
  });

  const email = useRef();

  const handlerSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { value: emailValue } = email.current;

    if (!emailValue) {
      setError("El Email no puede estar vcio");
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(emailValue)) {
      setError("No es un email vacio");
      return;
    }

    try {
      const { data } = await clientAxios.post(`/usuarios/olvide-password`, {
        email: emailValue,
      });
      setAlerta({
        success: true,
        error: false,
        msg: "Te enviamos las instrucciones a tu correo !",
      });
      console.log(data);
    } catch (error) {
      setAlerta({
        error: true,
        msg: "Esa cuenta no existe, comprueba tu correo",
      });
    }
  };

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
          <h1 className="font-bold text-2xl md:text-5xl">Olvidaste tu contraseña ?</h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
            Recupera tu contraseña, y no abandones tus proyectos !
          </p>
          <span
            className={`${alerta.error ? "text-yellow-500" : "text-green-500"}`}
          >
            {alerta.msg && alerta.msg}
          </span>
        </div>
        {!alerta.success && (
          <form
            onSubmit={handlerSubmit}
            className="flex flex-col max-w-sm gap-10 w-full"
            noValidate
            action=""
          >
            <NormalInput input={{
              placeholder: 'Email',
              type: 'email',
              name: 'email',
              onClick: ()=>{
                setError(false)
              },
              onChange: ()=>{
                setError(false)
              }
            }} error={error} ref={email} />


            <div className="flex flex-col gap-3">
              <button className="dark:border-white border border-black bg-black p-2 text-white text-lg font-bold rounded-full">
                Enviar
              </button>
            </div>
          </form>
        )}
      </div>
    </LayoutAuth>
  );
};
export default ForgetPassword;
