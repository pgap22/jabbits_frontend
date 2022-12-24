import { Link } from "react-router-dom";
const ProjectBox = ({proyect}) => {
  const {_id, nombre, descripcion} = proyect;
  return (
    <div className="bg-white p-6 flex flex-col justify-between rounded-lg gap-12">
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-xl">{nombre}</h1>
        <p className="text-base">{descripcion}</p>
      </div>

      <Link to={_id} className="dark:border-white hover:invert enabled:cursor-pointer flex items-center justify-center transition-all border capitalize border-white bg-black p-2 text-white text-lg font-bold rounded-full">
        Ver Proyecto
      </Link>
    </div>
  );
};

export default ProjectBox;
