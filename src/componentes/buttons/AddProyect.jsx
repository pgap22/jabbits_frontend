import { CgAddR } from "react-icons/cg";
import { useState } from "react";
import NormalInput from "../Inputs/NormalInput";
import { useRef } from "react";
import TextareaInput from "../Inputs/TextareaInput";
import { useEffect } from "react";
import InputDate from "../Inputs/InputDate";
import cleanError from "../../helper/cleanError";
import useProject from "../../hooks/useProyect";
import SpinnerButton from "../spinner/SpinnerButton";
import Modal from "../../hoc/Modal";
import { checkPastDate } from "../../helper/checkPastDate";

const AddProyect = () => {

  return (
    <>
      <Modal title={'Crear Proyecto'} description={'Rellena todos los campos necesarios, para empezar a tu proyecto'}>
        <Button />
        <Form />
      </Modal>
    </>
  );
};

const Button = ({toggleModal}) => {
  return (
    <div
      onClick={toggleModal}
      className="dark:border-[#686767] flex items-center mx-3 cursor-pointer p-3 hover:bg-white hover:text-black text-white hover:border-black  transition-all  select-none justify-between bg-black border border-white rounded-md"
    >
      <div className="flex items-center justify-center  gap-3">
        <CgAddR size={28} />
        <p className="text-xl font-medium">Añadir Proyecto</p>
      </div>
    </div>
  );
};

const Form = ({toggleModal }) => {
  const {toggleMenu} = useProject();
  const projectName = useRef();
  const projectDescription = useRef();
  const projectDate = useRef();

  const [spinner, setSpinner] = useState(false);

  const [errors, setError] = useState({
    name: "",

    description: "",
    date: "",
  });

  const { submitProyecto } = useProject();

  useEffect(() => {
    return () => {
      setError({
        name: "",
        description: "",
        date: "",
      });
    };
  }, []);

  const handlerSubmit = async (e) => {
    setSpinner(true);
    e.preventDefault();
    const { value: name } = projectName.current;
    const { value: description } = projectDescription.current;
    const { value: date } = projectDate.current;
    const Error = {};
    console.log(date);
    if (!name) {
      Error.name = "El Nombre del proyecto esta vacio";
    }

    if (!description) {
      Error.description = "La descripcion esta vacia";
    }
    if (checkPastDate(date)) {
      Error.date = "No se permiten fechas pasadas";
    }
    if (!date) {
      Error.date = "No se ha establecido una fecha";
    }

    setError(Error);

    if (Object.entries(Error).length !== 0) {
      setSpinner(false);
      return;
    }

    await submitProyecto({
      nombre: name,
      descripcion: description,
      fechaEntrega: date,
    });

    setSpinner(false);
    toggleModal();
    toggleMenu();
  };

  return (
    <form
      onSubmit={handlerSubmit}
      className="w-full flex flex-col gap-6"
      noValidate
    >
      <NormalInput
        input={{
          placeholder: "Nombre del proyecto",
          name: "nombre-proyecto",
          ...cleanError(errors, setError, "name"),
        }}
        error={errors.name}
        ref={projectName}
      />


      <TextareaInput
        input={{
          placeholder: "Descripcion del proyecto",
          name: "descripcion",
          ...cleanError(errors, setError, "description"),
        }}
        error={errors.description}
        ref={projectDescription}
      />
      <InputDate
        ref={projectDate}
        error={errors.date}
        input={{ ...cleanError(errors, setError, "date") }}
      />

      <button
        disabled={spinner}
        className="dark:border-white  enabled:hover:invert enabled:cursor-pointer flex items-center justify-center transition-all border capitalize border-white bg-black p-2 text-white text-lg font-bold rounded-full"
      >
        {spinner ? <SpinnerButton /> : "Crear Proyecto"}
      </button>
    </form>
  );
};

export default AddProyect;
