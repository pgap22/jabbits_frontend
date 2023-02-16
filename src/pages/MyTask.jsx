import DashboardPage from "../layout/DashboardPage";

import Task from "../componentes/IndividualTask/Task";
import useTasks from "../hooks/useTasks";
import useModalTask from "../hooks/useModalTask";
import { AnimatePresence } from "framer-motion";
import { MdOutlineAdd } from "react-icons/md";

import { BiTrash } from "react-icons/bi";

import clsx from "clsx";
import { Controller, useForm } from "react-hook-form";
import defaultDate from "../helper/defaultDate";
import FormText from "../componentes/Form/FormText";
import FormTextarea from "../componentes/Form/FormTextarea";
import FormDate from "../componentes/Form/FormDate";
import FormSelect from "../componentes/Form/FormSelect";
import Skeleton from "../hoc/Skeleton";
import SpinnerButton from "../componentes/spinner/SpinnerButton";
import { formatDate } from "../helper/formatDate";
import { useState } from "react";

const MyTask = () => {
  const [
    modal,
    CreateTask,
    stateCreateModal,
    closeCreateModal,
    showCreateModal,
  ] = useModalTask();
  const { TaskModal, openTaskModal, closeTaskModal, mainTask, tasks } =
    useTasks();

  return (
    <DashboardPage heading={<Heading />}>
      <div>
        <div className="flex flex-col gap-4">
          <Button setModal={showCreateModal} />
          {tasks.map((task) => (
            <Task key={task._id} task={task} />
          ))}
        </div>

        <AnimatePresence>
          {openTaskModal && (
            <TaskModal form={<Form setModal={closeTaskModal} />} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {stateCreateModal && (
            <CreateTask form={<CreateForm setModal={closeCreateModal} />} />
          )}
        </AnimatePresence>
      </div>
    </DashboardPage>
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
        "transition-all"
      )}
    >
      <MdOutlineAdd />
    </div>
  );
};

const Form = ({ setModal }) => {
  const { mainTask, edit, deleteTask, setMainTask } = useTasks();
  const [deleteButtonLoading, setLoadingDelete] = useState(true);

  let limitDate = Date.now();

  const now = new Date(new Date().setHours(-1)).toISOString().split("T")[0];
  if (mainTask.fecha) {
    limitDate = new Date(mainTask.fecha).toISOString().split("T")[0];
  }

  const { handleSubmit, control, formState } = useForm({
    defaultValues: {
      ...mainTask,
      status:
        new Date(limitDate) < new Date(now) ? "Expirado" : mainTask.status,
      fecha: formatDate(mainTask.fecha ? mainTask.fecha : ""),
    },
  });

  const submitSuccess = async (data) => {
    const newTask = {
      ...data,
      status:
        data.status.toLowerCase() == "completado" ? "completed" : "pending",
    };

    await edit(newTask);

    setModal();
  };
  const deleteMainTask = async () => {
    setLoadingDelete(false);
    await deleteTask(mainTask);
    setMainTask({});
    setLoadingDelete(true);
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
          <h2 className="font-bold text-2xl ">Editar Tarea</h2>
          <p className="text-gray-500 dark:text-gray-300">
            Llena todos los campos y edita esta tarea para organizarte
          </p>
        </div>

        <form noValidate className="flex flex-col gap-4">
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
              required: {
                value: true,
                message: "La fecha es obligatoria",
              },
              min: {
                value: defaultDate(new Date()),
                message: "No se admiten fechas pasadas",
              },
            }}
            render={(controller) => (
              <FormDate
                input={controller.field}
                fieldState={controller.fieldState}
              />
            )}
          />

          <Controller
            name="status"
            control={control}
            rules={requiredValue("El Status es obligatorio")}
            render={(controller) => (
              <FormSelect
                input={{
                  ...controller.field,
                }}
                fieldState={controller.fieldState}
                options={[
                  { id: Math.random(), name: "Pendiente" },
                  { id: Math.random(), name: "Completado" },
                ]}
              />
            )}
          />

          <div className="grid grid-cols-[1fr_0.2fr] gap-4">
            <button
              onClick={handleSubmit(submitSuccess)}
              type="submit"
              className="w-full rounded-full bg-black text-white font-bold p-2 py-3 flex flex-col items-center justify-center"
            >
              <Skeleton
                value={!formState.isSubmitting}
                skeleton={<SpinnerButton />}
              >
                Enviar
              </Skeleton>
            </button>

            <button
              onClick={deleteMainTask}
              type="button"
              className="w-full rounded-full bg-red-500 text-white font-bold p-2 py-3 flex flex-col items-center justify-center"
            >
              <Skeleton
                value={deleteButtonLoading}
                skeleton={<SpinnerButton />}
              >
                <BiTrash size={32} />
              </Skeleton>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const CreateForm = ({ setModal }) => {
  const { add } = useTasks();

  const { handleSubmit, control, formState } = useForm({
    defaultValues: {
      nombre: "",
      descripcion: "",
      fecha: defaultDate(new Date()),
    },
  });

  const submitSuccess = async (data) => {
    await add(data);

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
          <p className="text-gray-500 dark:text-gray-300">
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
              required: {
                value: true,
                message: "La fecha es obligatoria",
              },
              min: {
                value: defaultDate(new Date()),
                message: "No se admiten fechas pasadas",
              },
            }}
            render={(controller) => (
              <FormDate
                input={controller.field}
                fieldState={controller.fieldState}
              />
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

const Heading = () => {
  return (
    <div className="space-y-2">
      <h1 className="font-bold text-2xl">Mis Tareas</h1>
      <p>Aqui puedes organizar tus tareas</p>
    </div>
  );
};

export default MyTask;
