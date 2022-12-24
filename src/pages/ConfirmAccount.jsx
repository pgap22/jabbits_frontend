import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Logo } from "../assets/logo";
import Spinner from "../componentes/spinner/Spinner";
import clientAxios from "../config/axiosClient";
const ConfirmAccount = () => {
  const { id } = useParams();
  const [spinner, setSpinner] = useState(true);
  const [msg, setMsg] = useState({ color: "text-green-500", msg: "" });

  const confirmUser = async () => {
    try {
      clientAxios;
      const { data } = await clientAxios.get(`/usuarios/confirmar/${id}`);
      console.log(data);
      setMsg({
        color: "text-green-500",
        msg: "Cuenta confirmada con exito",
        success: true,
      });
    } catch (error) {
      console.log(error.response.data);
      setMsg({ color: "text-red-500", msg: "Token Invalido" });
    }
    setSpinner(false);
  };

  useEffect(() => {
    confirmUser();
  }, []);

  return (
    <main className="md:min-h-screen flex md:items-center justify-center">
      <div className="border-2 shadow-lg p-4 max-w-lg text-center rounded-md w-[90%] flex flex-col items-center gap-4">
        <img src={Logo} alt="Logo" className="dark:invert" width={200} />
        <h1 className="font-bold text-2xl">Confirma tu cuenta</h1>
        {spinner ? (
          <>
            <Spinner />
          </>
        ) : (
          <>
            <p className={msg.color}>{msg.msg}</p>
          </>
        )}
        {msg.success && <Link to={"/login"}>Haz click aqui para Iniciar Sesion !</Link>}
      </div>
    </main>
  );
};
export default ConfirmAccount;
