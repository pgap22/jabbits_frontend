import { createContext, useState } from "react";
import useModalTask from "../hooks/useModalTask";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTareas] = useState([]);
  const [mainTask, setMainTask] = useState({});

  const [setmodal, TaskModal, openTaskModal, closeTaskModal, showTaskModal] =
    useModalTask();

  const add = (task) => {
    setTareas([...tasks, task]);
  };
  const deleteTask = (id) => {
    setTareas(tasks.filter((task) => task.id !== id));
  };
  const edit = (taskEdited, id) => {
    setTareas(tasks.map((task) => (task.id === id ? taskEdited : task)));
  };

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
      
        mainTask,
        setMainTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };
