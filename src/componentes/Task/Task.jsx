import { motion } from "framer-motion";

import { BsThreeDots } from "react-icons/bs";

import useProject from "../../hooks/useProyect";

import TagTask from "./TagTask";

const Task = ({ tarea = {}, enabled = true }) => {
  const { task, showInfoTask} = useProject();
  
  const handlerClick = ()=>{
    showInfoTask(tarea)
  }

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
            onClick={handlerClick}
            className="select-none cursor-pointer hover:text-gray-400 transition-all text-gray-500 dark:text-gray-400"
            size={25}
          />
        </div>
        <div className="flex gap-2 mt-1 overflow-x-scroll scrollbar-thin pb-5 scrollbar-thumb-rounded-md dark:scrollbar-thumb-stone-600 scrollbar-thumb-gray-200">
          {tarea.tags.map((tag) => (
            <TagTask key={tag._id} tag={tag} />
          ))}
        </div>
        <div className="text-start mt-1">
          <p className="text-gray-500 dark:text-gray-400 text-xs md:text-base first-letter:uppercase break-words">
            {tarea.descripcion}
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default Task;
