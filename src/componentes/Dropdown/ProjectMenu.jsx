import { MdOutlineWidgets } from "react-icons/md";
const ProjectMenu = () => {
  return (
    <>
      <div className="flex items-center select-none rounded-md justify-between cursor-pointer">
        <div className="flex items-center gap-3">
          <MdOutlineWidgets size={28} />
          <p className="text-xl">Projectos</p>
        </div>
      </div>
    </>
  );
};

export default ProjectMenu;
