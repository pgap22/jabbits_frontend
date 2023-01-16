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
import { useEffect } from "react";

const MyTask = () => {
  const [modal, MyModal, openFormModal, closeModal, showModal] = useModalTask();

  const { TaskModal, openTaskModal, closeTaskModal, mainTask } = useTasks();

  return (
    <DashboardPage heading={<Heading />}>
      <div>
        <div className="md:hidden">
          <OneColumn add={<Button setModal={showModal} />} />
        </div>

        <div className="hidden md:block xl:hidden">
          <TwoColumns add={<Button setModal={showModal} />} />
        </div>

        <div className="hidden xl:block">
          <ThreeColumns add={<Button setModal={showModal} />} />
        </div>

        <AnimatePresence>
          {openFormModal ? (
            <MyModal form={<Form setModal={closeModal} />} />
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {openTaskModal && (
            <TaskModal form={<Form setModal={closeTaskModal} />} />
          )}
        </AnimatePresence>
      </div>
    </DashboardPage>
  );
};

const Column = ({ children }) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};

const OneColumn = ({ add }) => {
  const { tasks } = useTasks();
  return (
    <Column>
      {add}
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </Column>
  );
};

const TwoColumns = ({ add }) => {
  const { tasks } = useTasks();

  const firstColumn = tasks.filter((t, i) => i % 2 != 0);
  const secondColumn = tasks.filter((t, i) => i % 2 == 0);

  return (
    <div className="grid grid-cols-2 gap-4">
      <Column>
        {add}
        {firstColumn.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </Column>
      <Column>
        {secondColumn.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </Column>
    </div>
  );
};

const ThreeColumns = ({ add }) => {
  const { tasks } = useTasks();

  return (
    <div className="grid grid-cols-3 gap-4">
      <Column>
        {add}
        {tasks.map((t, i) => {
          const task = tasks[i * 3 + 3 - 1];
          if (task) {
            return <Task key={task.id} task={task} />;
          }
        })}
      </Column>
      <Column>
        {tasks.map((t, i) => {
          const task = tasks[i * 3 + 1 - 1];
          if (task) {
            return <Task key={task.id} task={task} />;
          }
        })}
      </Column>
      <Column>
        {tasks.map((t, i) => {
          const task = tasks[i * 3 + 2 - 1];
          if (task) {
            return <Task key={task.id} task={task} />;
          }
        })}
      </Column>
    </div>
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
  const { task, add, setMainTask,mainTask,closeTaskModal} = useTasks();

  const isTask = mainTask.nombre ? true : false

  const { handleSubmit, control, formState } = useForm({
    defaultValues: isTask ? {
      ...mainTask
    } : {
      nombre: '',
      descripcion: '',
      fecha:  defaultDate(new Date()),
    },
  });




  const submitSuccess = async (data) => {
    const newTask = {
      id: Math.random(),
      ...data,
      status: "pending",
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


  if(mainTask.nombre){
    useEffect(() => {
      return () => {
        setMainTask({});
      };
    }, []);
  }

  return (
    <>
      <div className="p-4 flex-col flex gap-8">
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-2xl ">{isTask ? 'Editar Tarea' : 'Creando Tarea'}</h2>
          <p className="text-gray-500">
            {isTask ? 'Llena todos los campos y edita esta tarea para organizarte' : 'Llena todos los campos y crea una nueva tarea para organizarte'}
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

          {
            isTask && <Controller 
            name="status"
            control={control}
            rules={requiredValue('El Status es obligatorio')}
            render={(controller) => (
              <FormSelect
                input={{
                  ...controller.field
                }}
                fieldState={controller.fieldState}
                options={[
                  { id: Math.random(), name: "Pending" },
                  { id: Math.random(), name: "Completed" },
                  { id: Math.random(), name: "Expired" },
                ]}
              />
            )}
            />
          }

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
