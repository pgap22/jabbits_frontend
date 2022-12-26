import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../componentes/spinner/Spinner";
import clientAxios from "../config/axiosClient";
import Skeleton from "../hoc/Skeleton";
import BoxCenter from "../layout/BoxCenter";
const ConfirmAccount = () => {
  const { id } = useParams();
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
  };

  useEffect(() => {
    confirmUser();
  }, []);

  return (
    <BoxCenter title={"Confirma tu cuenta"}>
      <Skeleton value={msg.msg} skeleton={<Spinner />}>
        <p className={msg.color}>{msg.msg}</p>
      </Skeleton>

      <Skeleton value={msg.success} skeleton={""}>
        <Link to={"/login"}>Haz click aqui para Iniciar Sesion !</Link>
      </Skeleton>
      
    </BoxCenter>
  );
};
export default ConfirmAccount;
