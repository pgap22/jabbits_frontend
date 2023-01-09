import { SlClose } from "react-icons/sl";
import { equalsArray } from "../../helper/equalsArray";
import { formatDate } from "../../helper/formatDate";
import DeleteTask from "../buttons/DeleteTask";
import TaskButton from "../buttons/TaskButton";
import AddTag from "./AddTag";
import EditableTagTask from "./EditableTagTask";
import SaveTags from "./SaveTags";
import { AnimatePresence, motion } from "framer-motion";
import useProject from "../../hooks/useProyect";

const TaskDetails = () => {
  const { task, showInfoTask,originalTask } = useProject();

  const toggleOptions = () => {
    showInfoTask({});
  };
  
  return (
    <AnimatePresence key={"animate-background-" + task.name}>
      {task._id && (
        <motion.div
          key={"task-info"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={toggleOptions}
          className="fixed h-[100vh] top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.50)] z-10 flex justify-end overflow-x-hidden"
        >
          <motion.div
            key={"task-info-background"}
            initial={{ translateX: "200%" }}
            animate={{ translateX: "0" }}
            exit={{ translateX: "200%" }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="bg-white dark:bg-[#2f2f2f] flex flex-col gap-5 p-6 m-2 rounded-md min-h-[730px]  overflow-y-auto sm:w-[30rem] max-w-[30rem]"
          >
            <div className="flex justify-between items-center">
              <p className="text-gray-500 dark:text-gray-400">
                En la lista{" "}
                <span className=" underline ">{task.prioridad}</span>
              </p>
              <SlClose
                onClick={toggleOptions}
                className="cursor-pointer"
                size={22}
              />
            </div>

            <div className="">
              <h2 className="text-4xl font-bold break-words">{task.nombre}</h2>
            </div>

            <div className="flex flex-col gap-4 mt-4">
              <div className="grid grid-cols-[max-content_1fr] gap-y-4 gap-x-2">
                <h3 className="font-medium">Estado: </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {task.prioridad}
                </p>

                <h3 className="font-medium">Creador por: </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {task.creadorPor.nombre}
                </p>

                <h3 className="font-medium">Fecha De Entrega: </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {formatDate(task.fechaEntrega)}
                </p>

                <h3 className="font-medium">Etiquetas: </h3>
                <div className="flex gap-2 max-w-xs flex-wrap items-start">
                  {task._id
                    ? task.tags.map((tag) => (  
                          <EditableTagTask
                            key={tag._id}
                            tag={tag}
                            tasksProps={task}
                          />
                      ))
                    : null}

                  <AddTag />
                </div>
              </div>
              {!equalsArray(task.tags, originalTask.tags) ? (
                <SaveTags toggleOptions={toggleOptions} />
              ) : null}
            </div>

            <div className="mt-4 space-y-2">
              <h3 className="font-bold text-xl">Descripcion</h3>
              <p className="text-gray-500 dark:text-gray-400 break-words">
                {task.descripcion}
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <div className="border-b border-gray-300 flex justify-between px-3 overflow-auto gap-5">
                <p className="border-b-4 border-b-black p-1 cursor-pointer">
                  Configuraciones
                </p>
              </div>

              <div className="flex flex-col gap-5 max-w-[200px]">
                <TaskButton id={task._id} />
                <DeleteTask id={task._id} toggleOptions={toggleOptions} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaskDetails;
