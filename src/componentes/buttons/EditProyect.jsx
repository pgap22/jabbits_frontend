import { BsPencilSquare } from "react-icons/bs";
import { useState } from "react";
import NormalInput from "../Inputs/NormalInput";
import { useRef } from "react";
import TextareaInput from "../Inputs/TextareaInput";
import { useEffect } from "react";
import InputDate from "../Inputs/InputDate";
import cleanError from "../../helper/cleanError";
import useProject from "../../hooks/useProyect";
import SpinnerButton from "../spinner/SpinnerButton";
import { formatDate } from "../../helper/formatDate";
import Modal from "../../hoc/Modal";
const EditProject = () => {

  return (
    <>
    <Modal title={'Editar Proyecto'} description={'Edita todos los campos necesarios, para retomar a tu proyecto'}>
      <Button />
      <Form/>
    </Modal>
    </>
  );
};

const Button = ({toggleModal}) => {
  return (
    <div
      onClick={toggleModal}
      className="flex items-center cursor-pointer p-3 hover:bg-yellow-100 hover:text-yellow-600 hover:border-yellow-300  transition-all  select-none justify-between text-yellow-700 bg-yellow-200 border border-yellow-200 rounded-md"
    >
      <div className="flex items-center justify-center  gap-3">
        <BsPencilSquare size={28} />
        <p className="text-xl font-medium hidden md:block">Editar Proyecto</p>
      </div>
    </div>
  );
};

const Form = ({ toggleModal }) => {
  const { project } = useProject();
  const projectName = useRef();
  const projectDescription = useRef();
  const projectDate = useRef();

  const [spinner, setSpinner] = useState(false);

  const [errors, setError] = useState({
    name: "",
    description: "",
    date: "",
  });

  const { editProyecto } = useProject();

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

    if (!name) {
      Error.name = "El Nombre del proyecto esta vacio";
    }

    if (!description) {
      Error.description = "La descripcion esta vacia";
    }
    if (new Date(date) < Date.now()) {
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

    await editProyecto(
      {
        nombre: name,
        descripcion: description,
        fechaEntrega: date,
      },
      project._id
    );

    setSpinner(false);
    toggleModal();
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
          defaultValue: project.nombre,
        }}
        error={errors.name}
        ref={projectName}
      />


      <TextareaInput
        input={{
          placeholder: "Descripcion del proyecto",
          name: "descripcion",
          ...cleanError(errors, setError, "description"),
          defaultValue: project.descripcion,
        }}
        error={errors.description}
        ref={projectDescription}
      />
      <InputDate
        ref={projectDate}
        error={errors.date}
        input={{
          ...cleanError(errors, setError, "date"),
          defaultValue: formatDate(project.fechaEntrega),
        }}
      />

      <button
        disabled={spinner}
        className="dark:border-white  enabled:hover:invert enabled:cursor-pointer flex items-center justify-center transition-all border capitalize border-white bg-black p-2 text-white text-lg font-bold rounded-full"
      >
        {spinner ? <SpinnerButton /> : "Editar Proyecto"}
      </button>
    </form>
  );
};

export default EditProject;
