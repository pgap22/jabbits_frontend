import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import AddTeamate from "../componentes/buttons/AddTeamate";
import ConfigProject from "../componentes/buttons/ConfigProject";
import TaskButton from "../componentes/buttons/TaskButton";
import PriorityHeader from "../componentes/Task/PriorityHeader";
import Task from "../componentes/Task/Task";
import TaskContainer from "../hoc/TaskContainer";
import useAuth from "../hooks/useAuth";
import useProject from "../hooks/useProyect";

let socket;

const ProjectBoard = () => {
  const { id } = useParams();



  const {
    project,
    tareas,
    getProject,
    projectLoading,
    setLoading,
    addTareaState,
    editTareaState,
    deleteTareaState
  } = useProject();

  const { auth } = useAuth();

  useEffect(() => {
    getProject(id);
    return () => {
      setLoading(false);
    };
  }, [id]);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND);
    socket.emit("abrir-proyecto", id);
  }, []);

  useEffect(() => {
    socket.on("tarea-agregada", (tarea) => {
      addTareaState(tarea);
    });
    return () => {
      return socket.off("tarea-agregada");
    };
  }, [tareas]);
  
  useEffect(() => {
    socket.on("tarea-editada", (tarea) => {
      editTareaState(tarea, tarea._id);
    });
    return () => {
      return socket.off("tarea-editada");
    };
  }, [tareas]);

  useEffect(() => {
    socket.on("tarea-eliminada", (tarea) => {
      deleteTareaState(tarea.tarea_id)
    });
    return () => {
      return socket.off("tarea-eliminada");
    };
  }, [tareas]);


  if (!projectLoading)
    return (
      <>
        <main className="w-full">
          <div className="bg-white dark:bg-[#1D1D1D] dark:border-[#535050] w-full p-6 md:p-8 border-t flex justify-center">
            <div className="max-w-[1600px] w-full flex items-center justify-between animate-pulse">
              <div className="w-1/2 bg-gray-300 dark:bg-stone-600 h-6 rounded-full"></div>
              <div className=" bg-gray-300 dark:bg-stone-600 h-12 aspect-square rounded-md"></div>
            </div>
          </div>
          <div className="w-full p-6 md:p-8 border-t dark:border-[#535050] flex justify-center">
            <div className="max-w-[1600px] w-full flex flex-col gap-12 justify-between animate-pulse">
              <div className="w-2/3 bg-gray-300 dark:bg-stone-600 h-6 rounded-full"></div>
              <div className="w-4/1 bg-gray-300 dark:bg-stone-600 h-6 rounded-full"></div>
              <div className="w-1/2 bg-gray-300 dark:bg-stone-600 h-6 rounded-full"></div>
            </div>
          </div>
        </main>
      </>
    );

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-[#1D1D1D] dark:border-[#535050] w-full h-full items-start border-t grid grid-rows-[max-content_1fr]"
    >
      <div className="gap-5 p-6 md:p-8 w-full max-w-[1600px] justify-self-center">
        <div className="w-full flex justify-between">
          <div className="flex flex-col gap-3">
            <h1 className=" text-2xl md:text-3xl font-bold">
              {project.nombre}
            </h1>
            <p>{project.descripcion}</p>
            <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
              <TaskButton />
              {auth._id == project.creador ? <AddTeamate /> : ""}
            </div>
          </div>
          {auth._id == project.creador ? <ConfigProject /> : ""}
        </div>
      </div>

      <TaskContainer>
        

          {tareas.filter((tarea) => tarea.prioridad == "Baja").length ? (
            <div
              className="flex flex-col gap-2"
            >
              <PriorityHeader text={"Baja"} color={"bg-green-300 dark:bg-green-700"} />

              <AnimatePresence>
                {tareas
                  .filter((tarea) => tarea.prioridad == "Baja")
                  .map((tarea) => (
                    <Task key={tarea._id} tarea={tarea} />
                  ))}
              </AnimatePresence>
            </div>
          ) : null}


          {tareas.filter((tarea) => tarea.prioridad == "Media").length ? (
            <div
              className="flex flex-col gap-2"
            >
              <PriorityHeader key={'medium-heading'} text={"Media"} color={"bg-blue-300 dark:bg-blue-700"} />

              <AnimatePresence>
                {tareas
                  .filter((tarea) => tarea.prioridad == "Media")
                  .map((tarea) => (
                    <Task key={tarea._id} tarea={tarea} />
                  ))}
              </AnimatePresence>
            </div>
          ) : null}



          {tareas.filter((tarea) => tarea.prioridad == "Alta").length ? (
            <div
              className="flex flex-col gap-2"
            >
              <PriorityHeader key={'high-heading'} text={"Alta"} color={"bg-orange-300 dark:bg-orange-700"} />

              <AnimatePresence>
                {tareas
                  .filter((tarea) => tarea.prioridad == "Alta")
                  .map((tarea) => (
                    <Task key={tarea._id} tarea={tarea} />
                  ))}
              </AnimatePresence>
            </div>
          ) : null}


      </TaskContainer>
    </motion.main>
  );
};

export default ProjectBoard;
