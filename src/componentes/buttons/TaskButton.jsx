import Modal from "../../hoc/Modal";
import { MdAddToPhotos } from "react-icons/md";
import NormalInput from "../Inputs/NormalInput";
import TextareaInput from "../Inputs/TextareaInput";
import SelectInput from "../Inputs/SelectInput";
import SelectMobil from "../Inputs/SelectMobil";
import SpinnerButton from "../spinner/SpinnerButton";
import { useRef, useState } from "react";
import useProject from "../../hooks/useProyect";
import { BsPencilSquare } from "react-icons/bs";
import { useEffect } from "react";
import cleanError from "../../helper/cleanError";
import InputDate from "../Inputs/InputDate";
import { formatDate } from "../../helper/formatDate";
import useAuth from "../../hooks/useAuth";
import { checkPastDate } from "../../helper/checkPastDate";

const TaskButton = ({ id = "" }) => {
  return (
    <Modal
      modalWidth={"md:min-w-[400px]"}
      title={id ? "Editar Tarea"  : "Crear Tarea"}
      description={id? "Edita tu tarea para tu proyecto" :"Asigna una tarea para tu proyecto"}
    >
      <Button id={id} />
      <Form id={id} />
    </Modal>
  );
};

const Button = ({ toggleModal, id }) => {
  return (
    <div
      onClick={toggleModal}
      className={`"flex items-center cursor-pointer p-3  transition-all  select-none justify-between rounded-md
        ${
          id
            ? `bg-yellow-200 text-yellow-800
               hover:bg-yellow-100 hover:text-yellow-600`
            : ` bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-400
                hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-800 dark:hover:text-blue-300 `
        }
      "`}
    >
      <div className="flex items-center   gap-3">
        {id ? <BsPencilSquare size={28} /> : <MdAddToPhotos size={28} />}
        <p className="text-xl font-medium">
          {id ? "Editar Tarea" : "Crear Tarea"}
        </p>
      </div>
    </div>
  );
};

const Form = ({ toggleModal, id }) => {
  const {auth} = useAuth();

  const { tareas, addTarea,tareaAPI } = useProject();

  const [tarea, setTarea] = useState({
    nombre: "",
    descripcion: "",
    prioridad: "",
    fechaEntrega: "",
  });

  useEffect(()=>{
    if (id && tareas.filter((tarea) => tarea._id === id).length !== 0) {
      setTarea(tareas.filter((tarea) => tarea._id === id)[0])
    }
  },[])

  const [spinner, setSpinner] = useState(false);

  const [errores, setErrores] = useState({
    nombre: "",
    descripcion: "",
    prioridad: "",
    date: "",
  });

  const nombre = useRef();
  const selectValue = useRef();
  const descripcion = useRef();
  const projectDate = useRef();

  const handlerSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    const { value: name } = nombre.current;
    const { value: select } = selectValue.current;
    const { value: date } = projectDate.current;
    const { value: description } = descripcion.current;
    const Error = {};

    if (!name) {
      Error.nombre = "El Nombre esta vacio";
    }

    if (!description) {
      Error.descripcion = "La descripcion esta vacia";
    }
    if ((select != "Alta") & (select != "Media") & (select != "Baja")) {
      Error.prioridad = "Debes agregar una prioridad";
    }

    if (checkPastDate(date)) {
      Error.date = "No se permiten fechas pasadas";
    }
    if (!date) {
      Error.date = "No se ha establecido una fecha";
    }

    setErrores(Error);
    
    if (Object.entries(Error).length !== 0) {
      setSpinner(false)
      return
    };

    if (id) {
      await tareaAPI({
        nombre: name,
        prioridad: select,
        descripcion: description,
        fechaEntrega: new Date(date),
      },id,'edit');
    } else {
      await tareaAPI({
        nombre: name,
        prioridad: select,
        descripcion: description,
        fechaEntrega: date,
        creadorPor: auth._id,
      },'','add');
    }

    setSpinner(false);
    toggleModal();
  };

  return (
    <form
      onSubmit={handlerSubmit}
      noValidate
      className="w-full flex-col flex gap-4"
    >
      <NormalInput
        input={{
          name: "tarea",
          placeholder: "Nombre de la tarea",
          ...cleanError(errores, setErrores, "nombre"),
          defaultValue: tarea.nombre ? tarea.nombre : '',
        }}
        ref={nombre}
        error={errores.nombre}
      />
      <TextareaInput
        ref={descripcion}
        error={errores.descripcion}
        input={{
          placeholder: "Descripcion de la tarea",
          ...cleanError(errores, setErrores, "descripcion"),
          defaultValue: tarea.descripcion ? tarea.descripcion : '',
        }}
      />

      <InputDate
        ref={projectDate}
        error={errores.date}
        input={{
          ...cleanError(errores, setErrores, "date"),
          defaultValue: tarea.fechaEntrega ? formatDate(tarea.fechaEntrega) : '',
        }}
      />

      <div>
        <SelectInput
          error={errores.prioridad}
          ref={selectValue}
          func={() => {
            setErrores({ ...errores, prioridad: "" });
          }}
          value={tarea.prioridad ? tarea.prioridad : ''}
          valueDefault="Prioridad"
        />
      </div>

      <button
        disabled={spinner}
        className="dark:border-white border-white bg-black p-2 text-white enabled:hover:bg-white enabled:hover:text-black  enabled:hover:border-black enabled:cursor-pointer flex items-center justify-center transition-all border capitalize  text-lg font-bold rounded-full"
      >
        {spinner ? <SpinnerButton /> : id ?  "Editar Tarea" :  "Crear Tarea"}
      </button>
    </form>
  );
};

export default TaskButton;
