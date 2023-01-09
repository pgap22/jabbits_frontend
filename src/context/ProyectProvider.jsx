import { useCycle } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import axiosClient from "../config/axiosClient";
import useAuth from "../hooks/useAuth";

let socket;

const ProyectContext = createContext();

const ProyectProvider = ({ children }) => {
  const [proyectos, setProyectos] = useState([]);
  const [project, setProject] = useState({});
  const [projectLoading, setLoading] = useState(false);
  const [menu, toggleMenu] = useCycle(false, true);
  const [tareas, setTareas] = useState([]);
  const [task, setTask] = useState({});
  const [originalTask, setOriginalTask] = useState({});

  const [zIndex, toggleZIndex] = useState(false);

  const { auth } = useAuth();

  const addProjectState = (proyectoNuevo) => {
    const searchProyecto = proyectos.filter(
      (proyecto) => proyecto._id == proyectoNuevo._id
    ).length;
    if (searchProyecto) return;
    setProyectos([...proyectos, proyectoNuevo]);
  };

  const addTareaState = (tareaNueva) => {
    const searchTarea = tareas.filter(
      (tarea) => tarea._id == tareaNueva._id
    ).length;
    if (searchTarea) return;
    setTareas([...tareas, tareaNueva]);
  };

  const editTareaState = (tarea, id) => {
    const tareasEdited = tareas.map((task) => (task._id != id ? task : tarea));

    if(task._id){
      setTask(tarea);
      setOriginalTask(tarea);
    }

    setTareas(tareasEdited);
  };
  const deleteTareaState = (id) => {
    const tareasEdited = tareas.filter((task) => task._id != id);
    setTareas(tareasEdited);
  };

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND);
  }, []);

  const submitProyecto = async (proyecto) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post("/proyectos", proyecto, config);
      setProyectos([...proyectos, data]);
    } catch (error) {}
  };
  const editProyecto = async (proyecto, id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.put(
        "/proyectos/" + id,
        proyecto,
        config
      );
      const projectMaped = proyectos.map((proyecto) =>
        proyecto._id == id ? data : proyecto
      );

      setProyectos(projectMaped);
      setProject(data);
    } catch (error) {}
  };

  const getProject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient("/proyectos/" + id, config);
      setProject(data.proyectos);
      setTareas(data.proyectos.tareas);
      setLoading(true);
    } catch (error) {
      navigate("/projects");
    }
  };
  const deleteProject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.delete("/proyectos/" + id, config);
      const projectsFilterd = proyectos.filter(
        (proyecto) => proyecto._id !== id
      );
      setProyectos(projectsFilterd);
      navigate("/projects");
    } catch (error) {
      return "";
    }
  };

  const tareaAPI = async (tarea, id, accion) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (accion == "add") {
        const { data } = await axiosClient.post(
          "/tarea",
          {
            ...tarea,
            proyecto: project._id,
          },
          config
        );
        addTareaState(data);
        socket.emit("nueva-tarea", data);
      }

      if (accion == "edit") {
        const { data } = await axiosClient.put(
          "/tarea/" + id,
          {
            ...tarea,
            proyecto: project._id,
          },
          config
        );

        editTareaState(data, id);
        const tareaSocket = {
          tarea: data,
          proyecto_id: project._id,
        };
        socket.emit("editar-tarea", tareaSocket);
      }

      if (accion == "delete") {
        await axiosClient.delete("/tarea/" + id, config);
        deleteTareaState(id);
        const tareaSocket = {
          tarea_id: id,
          proyecto_id: project._id,
        };
        socket.emit("eliminar-tarea", tareaSocket);
      }
    } catch (error) {}
  };
  const getProyectos = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient("/proyectos", config);
      setProyectos(data);
    } catch (error) {}
  };

  const buscarTeamate = async (email) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axiosClient.post(
      "/proyectos/colaborador",
      { email },
      config
    );

    return data;
  };
  const enviarInvitacion = async (email) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axiosClient.post(
      "/proyectos/enviar-invitacion/" + project._id,
      { email },
      config
    );

    return data;
  };

  const showInfoTask = (infoTask) => {
    setTask(infoTask);
    setOriginalTask(infoTask);
  };

  useEffect(() => {
    if (auth._id) {
      getProyectos();
    }
  }, [auth]);

  const navigate = useNavigate();

  return (
    <ProyectContext.Provider
      value={{
        addProjectState,

        proyectos,
        submitProyecto,
        getProject,
        getProyectos,
        project,
        editProyecto,
        deleteProject,

        projectLoading,
        setLoading,

        menu,
        toggleMenu,

        setTask,
        task,
        originalTask,

        tareas,
        showInfoTask,
        tareaAPI,
        addTareaState,
        deleteTareaState,
        editTareaState,

        buscarTeamate,
        enviarInvitacion,

        zIndex,
        toggleZIndex,
      }}
    >
      {children}
    </ProyectContext.Provider>
  );
};

export { ProyectContext, ProyectProvider };
