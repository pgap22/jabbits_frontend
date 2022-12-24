import { useContext } from "react";
import { ProyectContext } from "../context/ProyectProvider";

const useProject = () => {
  return useContext(ProyectContext);
};

export default useProject;
