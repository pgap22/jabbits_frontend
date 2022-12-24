import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Logo } from "../assets/logo";
import Spinner from "../componentes/spinner/Spinner";
import clientAxios from "../config/axiosClient";
import useAuth from "../hooks/useAuth";
const AcceptProject = () => {
  const { id } = useParams();
  const [spinner, setSpinner] = useState(true);
  const [msg, setMsg] = useState({ color: "text-green-500", msg: "" });
  const { auth } = useAuth();

  const acceptingProject = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clientAxios(`/proyectos/aceptar-invitacion/${id}`,config);
        
        setMsg({
          color: "text-green-500",
          msg: "Invitacion Aceptada",
          success: true,
        });
    } catch (error) {
      setMsg({ color: "text-red-500", msg: "Invitacion Invalida" });
    }
    setSpinner(false);
  };

  useEffect(() => {
    if (auth._id) {
      acceptingProject();
    }
  }, [auth]);

  return (
    <main className="md:min-h-screen flex md:items-center justify-center">
      <div className="border-2 shadow-lg p-4 max-w-lg text-center rounded-md w-[90%] flex flex-col items-center gap-4">
        <img src={Logo} alt="Logo" className="dark:invert" width={200} />
        <h1 className="font-bold text-2xl">Invitacion de proyecto</h1>
        {spinner ? (
          <>
            <Spinner />
          </>
        ) : (
          <>
            <p className={msg.color}>{msg.msg}</p>
          </>
        )}
        {msg.success && (
          <Link to={"/projects"}>Haz click aqui para ver el proyecto !</Link>
        )}
      </div>
    </main>
  );
};
export default AcceptProject;
