import { AnimatePresence, motion, useCycle } from "framer-motion";
import { useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { SlClose } from "react-icons/sl";
import { equalsArray } from "../../helper/equalsArray";
import { formatDate } from "../../helper/formatDate";
import useProject from "../../hooks/useProyect";
import DeleteTask from "../buttons/DeleteTask";
import TaskButton from "../buttons/TaskButton";
import AddTag from "./AddTag";
import EditableTagTask from "./EditableTagTask";
import SaveTags from "./SaveTags";
import TagTask from "./TagTask";

const Task = ({ tarea = {}, enabled = true }) => {
  const [showOptions, toggleOptions] = useCycle(false, enabled);
  const { task, setTask } = useProject();

  useEffect(() => {
    if (showOptions) {
      setTask(tarea);
    }
  }, [showOptions]);

  return (
    <>
      <motion.div
        initial={{ translateY: "200%", opacity: 0 }}
        animate={{ translateY: "0%", opacity: 1 }}
        exit={{ translateX: "300%", opacity: 0 }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 130,
          duration: 0.2,
        }}
        className="dark:bg-[#252525] bg-white flex flex-col gap-1 z-0 shadow rounded-2xl p-4"
      >
        <div className="grid grid-cols-[minmax(0,1fr)_max-content] gap-4">
          <h3 className="font-medium md:text-xl justify-self-start break-words max-w-full">
            {tarea.nombre}
          </h3>
          <BsThreeDots
            onClick={toggleOptions}
            className="select-none cursor-pointer hover:text-gray-400 transition-all text-gray-500"
            size={25}
          />
        </div>
        <div className="flex gap-2 mt-1 overflow-x-scroll scrollbar-thin pb-5 scrollbar-thumb-rounded-md scrollbar-thumb-gray-200">
          {tarea.tags.map((tag) => (
            <TagTask key={tag._id} tag={tag} />
          ))}
        </div>
        <div className="text-start mt-1">
          <p className="dark:text-white text-gray-500 text-xs md:text-base first-letter:uppercase break-words">
            {tarea.descripcion}
          </p>
        </div>
      </motion.div>

      <AnimatePresence key={"animate-background-" + tarea.name}>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={toggleOptions}
            className="fixed h-[100vh] top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.50)] z-10 flex justify-end overflow-x-hidden"
          >
            <motion.div
              initial={{ translateX: "200%" }}
              animate={{ translateX: "0" }}
              exit={{ translateX: "200%" }}
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="bg-white flex flex-col gap-5 p-6 m-2 rounded-md min-h-[500px] overflow-hidden overflow-y-auto sm:w-[30rem] max-w-[30rem]"
            >
              <div className="flex justify-between items-center">
                <p className="text-gray-500">
                  En la lista{" "}
                  <span className=" underline ">{tarea.prioridad}</span>
                </p>
                <SlClose
                  onClick={toggleOptions}
                  className="cursor-pointer"
                  size={22}
                />
              </div>

              <div className="">
                <h2 className="text-4xl font-bold break-words">
                  {tarea.nombre}
                </h2>
              </div>

              <div className="flex flex-col gap-4 mt-4">
                <div className="grid grid-cols-[max-content_1fr] gap-y-4 gap-x-2">
                  <h3 className="font-medium">Estado: </h3>
                  <p className="text-gray-500">{tarea.prioridad}</p>

                  <h3 className="font-medium">Creador por: </h3>
                  <p className="text-gray-500">{tarea.creadorPor.nombre}</p>

                  <h3 className="font-medium">Fecha De Entrega: </h3>
                  <p className="text-gray-500">
                    {formatDate(tarea.fechaEntrega)}
                  </p>

                  <h3 className="font-medium">Etiquetas: </h3>
                  <div className="flex gap-2 max-w-xs flex-wrap  ">
                    {task._id
                      ? task.tags.map((tag) => (
                          <>
                            <EditableTagTask key={tag._id} tag={tag} tareasProps={tarea} />
                          </>
                        ))
                      : null}

                    <AddTag />
                  </div>
                </div>
                {!equalsArray(task.tags, tarea.tags) ? <SaveTags toggleOptions={toggleOptions}/> : null}
              </div>

              <div className="mt-4 space-y-2">
                <h3 className="font-bold text-xl">Descripcion</h3>
                <p className="text-gray-500 break-words">{tarea.descripcion}</p>
              </div>

              <div className="flex flex-col gap-5">
                <div className="border-b border-gray-300 flex justify-between px-3 overflow-auto gap-5">
                  <p className="border-b-4 border-b-black p-1 cursor-pointer">
                    Configuraciones
                  </p>
                </div>

                <div className="flex flex-col gap-5 max-w-[200px]">
                  <TaskButton id={tarea._id} />
                  <DeleteTask id={tarea._id} toggleOptions={toggleOptions} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Task;
