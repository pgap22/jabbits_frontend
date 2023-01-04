import Modal from "../../hoc/Modal";
import { BiUserCircle } from "react-icons/bi";
import NormalInput from "../Inputs/NormalInput";
import SpinnerButton from "../spinner/SpinnerButton";
import { useRef, useState } from "react";
import useProject from "../../hooks/useProyect";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import cleanError from "../../helper/cleanError";

const AddTeamate = () => {
  return (
    <Modal
      modalWidth={"md:min-w-[400px]"}
      title={"Añadir Colaborador"}
      description={"Añade un colaborador a tu proyecto"}
    >
      <Button />
      <Form />
    </Modal>
  );
};

const Button = ({ toggleModal, id }) => {
  return (
    <div
      onClick={toggleModal}
      className="flex items-center cursor-pointer p-3  transition-all  select-none justify-between rounded-md 
      bg-green-200       text-green-800   
      hover:bg-green-100 hover:text-green-600
        dark:bg-green-900 dark:text-green-400
        dark:hover:bg-green-800 dark:hover:text-green-300"
    >
      <div className="flex items-center   gap-3">
        <MdOutlinePersonAddAlt size={28} />
        <p className="text-xl font-medium">Añadir Colaborador</p>
      </div>
    </div>
  );
};

const Form = () => {
  const { buscarTeamate, enviarInvitacion } = useProject();

  const [spinner, setSpinner] = useState(false);
  const [contenidoCargado, setContenido] = useState(false);

  const [emailEnviado, setEnviadoEmail] = useState(false);

  const [respuesta, setRespuesta] = useState("");

  const [usuario, setUsuario] = useState({});

  const [errores, setErrores] = useState({
    email: "",
  });

  const emailRef = useRef();

  
  const invitacion = async () => {
    setEnviadoEmail(true);
    try {
      const data = await enviarInvitacion(usuario.email);
      console.log(data);
      setRespuesta({
        error: false,
        msg: data.msg,
      })
    } catch (error) {
      setRespuesta({
        error: true,
        msg: error.response.data.msg
      })
    }
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();

    const { value: email } = emailRef.current;

    const Error = {};

    if (!email) {
      Error.email = "El Email esta vacio";
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
      Error.email = "El Email no es valido";
    }

    setErrores(Error);
    if (Object.entries(Error).length !== 0) return;

    setSpinner(true);
    try {
      const data = await buscarTeamate(email);

      setUsuario(data);
      setContenido(true);
    } catch (error) {
      setSpinner(false);
      setErrores({ email: error.response.data.msg });
    }
  };

  if (contenidoCargado) {
    return (
      <div>
        <div className="flex flex-col md:flex-row  justify-between items-center gap-2">
          <div className="flex gap-2 items-center">
            <BiUserCircle size={32} />
            <p>{usuario.nombre}</p>
          </div>

          {respuesta 
            ? (
              <span className={`${respuesta.error ? 'text-red-500' : 'text-green-500'}`}>{respuesta.msg}</span>
            ) 
            : emailEnviado 
            ? (
              <div className="invert">
                <SpinnerButton />
              </div>
            ) 
            : (
              <div className="flex md:flex-row gap-2">
                <button
                  onClick={invitacion}
                  className="border p-2 rounded-md bg-blue-500 text-white hover:bg-blue-800 transition-all"
                >
                  Añadir
                </button>
                <button
                  onClick={() => {
                    setContenido(false);
                    setSpinner(false);
                  }}
                  className="border p-2 rounded-md border-black hover:bg-black hover:text-white transition-all"
                >
                  Cancelar
                </button>
              </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handlerSubmit}
      noValidate
      className="w-full flex-col flex gap-4"
    >
      <NormalInput
        input={{
          name: "email-colaborador",
          type: "email",
          placeholder: "Email",
          ...cleanError(errores, setErrores, "email"),
        }}
        ref={emailRef}
        error={errores.email}
      />

      <button
        disabled={spinner}
        className="dark:border-white border-white bg-black p-2 text-white enabled:hover:bg-white enabled:hover:text-black  enabled:hover:border-black enabled:cursor-pointer flex items-center justify-center transition-all border capitalize  text-lg font-bold rounded-full"
      >
        {spinner ? <SpinnerButton /> : "Buscar Colaborador"}
      </button>
    </form>
  );
};

export default AddTeamate;
