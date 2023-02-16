import { createContext, useEffect, useState } from "react";
import clientAxios from "../config/axiosClient";
import useAuth from "../hooks/useAuth";
import useModalTask from "../hooks/useModalTask";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTareas] = useState([]);
  const [mainTask, setMainTask] = useState({});
  const {auth} = useAuth();
  const [setmodal, TaskModal, openTaskModal, closeTaskModal, showTaskModal] =
    useModalTask();

  const add = async (task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post(
        "/tarea-individual",
        task,
        config
      );

      setTareas([...tasks, data]);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTask = async (taskDeleted) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.delete(
        "/tarea-individual/" + taskDeleted._id,
        config
      );

      setTareas(tasks.filter((task) => task._id !== taskDeleted._id));
    } catch (error) {
      console.log(error);
    }
  };
  const edit = async (taskEdited) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.put(
        "/tarea-individual/" + taskEdited._id,
        taskEdited,
        config
      );

      setTareas(tasks.map((task) => (task._id === data._id ? data : task)));
    } catch (error) {
      console.log(error);
    }
  };

  const getTareas = async()=>{
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios("/tarea-individual",config);
      console.log(data);
      setTareas(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
      getTareas();
  },[auth])

  return (
    <TaskContext.Provider
      value={{
        tasks,
        add,
        deleteTask,
        edit,
        TaskModal,
        openTaskModal,
        closeTaskModal,
        showTaskModal,
        getTareas,
        mainTask,
        setMainTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };
