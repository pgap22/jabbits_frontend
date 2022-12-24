import { motion } from "framer-motion";
import { useEffect } from "react";
import ProjectBox from "../componentes/Box/ProjectBox";
import useProject from "../hooks/useProyect";

import io from "socket.io-client";

let socket;


const Projects = () => {
  
  const {proyectos} = useProject();

  return (
    <>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col gap-5 p-6 md:p-8 w-full max-w-[1600px]"
      >
        <h1 className="font-bold text-4xl">Tus Proyectos</h1>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {proyectos.length !== 0
            ? proyectos.map((proyect) => (
                <ProjectBox key={proyect._id} proyect={proyect} />
              ))
            : "No tienes ningun proyecto intenta crear uno !"}
        </div>
      </motion.main>
    </>
  );
};

export default Projects;
