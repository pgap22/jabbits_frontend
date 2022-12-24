import { FiTrash } from "react-icons/fi";
import { useState } from "react";
import useProject from "../../hooks/useProyect";
import SpinnerButton from "../spinner/SpinnerButton";
import Modal from "../../hoc/Modal";
const DeleteTask = ({ id, toggleOptions }) => {
  return (
    <>
      <Modal
        modalWidth={"max-w-[420px]"}
        title={"Eliminar Tarea"}
        description={
          "Estas seguro de eliminar esta tarea, no podras recuperar esta tarea despues de borrarla"
        }
      >
        <Button />
        <ModalDelete toggleOptions={toggleOptions} id={id} />
      </Modal>
    </>
  );
};

const Button = ({ toggleModal }) => {
  return (
    <div
      onClick={toggleModal}
      className="flex items-center cursor-pointer p-3 hover:bg-red-100 hover:text-red-600 hover:border-red-300  transition-all  select-none justify-between text-red-700 bg-red-200 border border-red-200 rounded-md"
    >
      <div className="flex items-center justify-center  gap-3">
        <FiTrash size={28} />
        <p className="text-xl font-medium">Borrar Tarea</p>
      </div>
    </div>
  );
};
const ModalDelete = ({ toggleModal, id, toggleOptions }) => {
  const [spinner, setSpinner] = useState(false);

  const { tareaAPI } = useProject();

  const handlerSubmit = async (e) => {

    setSpinner(true);
    e.preventDefault();
    await tareaAPI({}, id, "delete");
    setSpinner(false);
    toggleModal();
    toggleOptions();
  };

  return (
    <form
      onSubmit={handlerSubmit}
      className="w-full flex flex-col gap-6"
      noValidate
    >
      <div className="grid grid-cols-[2fr_1fr] gap-6">
        <button
          disabled={spinner}
          className="dark:border-white  enabled:hover:bg-red-500 enabled:cursor-pointer flex items-center justify-center transition-all border capitalize border-white bg-black p-2 text-white md:text-lg font-bold rounded-full"
        >
          {spinner ? <SpinnerButton /> : "Borrar Tarea"}
        </button>
        <button
          type="button"
          onClick={() => {
            toggleModal();
          }}
          className="dark:border-white hover:bg-gray-100 hover:text-black enabled:cursor-pointer flex items-center justify-center transition-all border capitalize border-black bg-white p-2 text-black md:text-lg font-bold rounded-full"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default DeleteTask;
