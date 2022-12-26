import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../componentes/spinner/Spinner";
import clientAxios from "../config/axiosClient";
import Skeleton from "../hoc/Skeleton";
import useAuth from "../hooks/useAuth";
import BoxCenter from "../layout/BoxCenter";
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

      const { data } = await clientAxios(
        `/proyectos/aceptar-invitacion/${id}`,
        config
      );

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
    <BoxCenter title={"Invitacion de Proyecto"}>
      <Skeleton value={msg.msg} skeleton={<Spinner />}>
        <p className={msg.color}>{msg.msg}</p>
      </Skeleton>

      <Skeleton value={msg.success} skeleton={""}>
        <Link to={"/projects"}>Haz click aqui para ver el proyecto !</Link>
      </Skeleton>
    </BoxCenter>
  );
};
export default AcceptProject;
