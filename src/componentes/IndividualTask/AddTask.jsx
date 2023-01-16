import clsx from "clsx";
import { MdOutlineAdd } from "react-icons/md";
import { Controller, useForm } from "react-hook-form";
import ModalTask from "../../hoc/ModalTask";
import FormText from "../Form/FormText";
import FormTextarea from "../Form/FormTextarea";
import Skeleton from "../../hoc/Skeleton";
import SpinnerButton from "../spinner/SpinnerButton";
import useTasks from "../../hooks/useTasks";
import FormDate from "../Form/FormDate";
import defaultDate from "../../helper/defaultDate";
const AddTask = () => {
  return (
    <ModalTask>
      
    </ModalTask>
  );
};

const Button = ({ setModal }) => {
  return (
    <div
      onClick={setModal}
      className={clsx(
        "w-full",
        "bg-black",
        "text-white",
        "p-4",
        "rounded-md",
        "flex",
        "items-center",
        "justify-center",
        "text-3xl md:text-6xl",
        "cursor-pointer select-none",
        "hover:opacity-80",
        "transition-all",
      )}
    >
      <MdOutlineAdd />
    </div>
  );
};

const Form = ({setModal}) => {
  const { add } = useTasks();
  const { handleSubmit, control, formState } = useForm({
    defaultValues:{
      nombre: '',
      descripcion: '',
      fecha: defaultDate(new Date),
    }
  });
  const submitSuccess = async (data) => {
    
    const newTask = {
      id: Math.random(),
      ...data,
      status: 'pending',
    };

    add(newTask);

    setModal();
  };

  const requiredValue = (message) => {
    return {
      required: {
        value: true,
        message: message,
      },
    };
  };
  const inputController = (controller, placeholder) => {
    return {
      ...controller.field,
      placeholder,
    };
  };

  return (
    <>
      <div className="p-4 flex-col flex gap-8">
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-2xl ">Creando Tarea</h2>
          <p className="text-gray-500">
            Llena todos los campos y crea una nueva tarea para organizarte
          </p>
        </div>

        <form
          onSubmit={handleSubmit(submitSuccess)}
          noValidate
          className="flex flex-col gap-4"
        >
          <Controller
            name="nombre"
            control={control}
            rules={requiredValue("Nombre de la tarea esta vacio")}
            render={(controller) => (
              <FormText
                input={inputController(controller, "Nombre de la tarea")}
                fieldState={controller.fieldState}
              />
            )}
          />

          <Controller
            name="descripcion"
            control={control}
            rules={requiredValue("La descripcion esta vacia")}
            render={(controller) => (
              <FormTextarea
                input={inputController(controller, "Descripcion de la tarea")}
                fieldState={controller.fieldState}
              />
            )}
          />

          <Controller
            name="fecha"
            control={control}
            rules={{
              required:{
                value: true,
                message: 'La fecha es obligatoria'
              },
              min:{
                value: defaultDate(new Date()),
                message: 'No se admiten fechas pasadas'
              }
            }}
            render={(controller) => (
              <FormDate input={controller.field} fieldState={controller.fieldState} />
            )}
          />

          <button className="w-full rounded-full bg-black text-white font-bold p-2 py-3 flex flex-col items-center justify-center">
            <Skeleton
              value={!formState.isSubmitting}
              skeleton={<SpinnerButton />}
            >
              Enviar
            </Skeleton>
          </button>
        </form>
      </div>
    </>
  );
};

export default AddTask;
