import clsx from "clsx";
import ProjectBox from "../componentes/Box/ProjectBox";
import useProject from "../hooks/useProyect";
import DashboardLayout from "../layout/DashboardLayout";

const Projects = () => {
  const { proyectos } = useProject();

  return (
    <>
      <DashboardLayout>
        <h1 className="font-bold text-4xl">Tus Proyectos</h1>
        <div
          className={clsx(
            "grid",
            "lg:grid-cols-2",
            "xl:grid-cols-3",
            "2xl:grid-cols-4",
            "gap-6"
          )}
        >
          {proyectos.length !== 0
            ? proyectos.map((proyect) => (
                <ProjectBox key={proyect._id} proyect={proyect} />
              ))
            : "No tienes ningun proyecto intenta crear uno !"}
        </div>
      </DashboardLayout>
    </>
  );
};

export default Projects;
