import { Logo } from "../../assets/logo";
import AddProyect from "../buttons/AddProyect";
import { Link } from "react-router-dom";
import AsideLink from "../Links/AsideLink";
import useProject from "../../hooks/useProyect";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlineWidgets, MdOutlineEventNote } from "react-icons/md";
import clsx from "clsx";

const AsideHome = () => {
  const { toggleMenu } = useProject();

  return (
    <aside
      className={clsx(
        "bg-white",
        "dark:bg-[#1D1D1D]",
        "dark:border-[#535050]",
        "w-[16rem]",
        "relative",
        "h-full",
        "min-h-screen",
        "border-r-2",
        "overflow-auto"
      )}
    >
      <div onClick={toggleMenu} className="md:hidden absolute p-3">
        <AiOutlineCloseCircle size={20} />
      </div>

      <div className="flex justify-center">
        <Link onClick={toggleMenu} to={"/projects"}>
          <img
            src={Logo}
            width={180}
            height={90}
            alt="jabbits-logo"
            className="border-b-2 border-black py-10 dark:invert"
          />
        </Link>
      </div>

      <div className="space-y-8 pt-12 mx-2">
        <div className="flex flex-col gap-6">
          <AsideLink
            Icon={MdOutlineWidgets}
            link={"/projects"}
            label={"Proyectos"}
          />

          <AsideLink
            Icon={MdOutlineEventNote}
            link={"/mytasks"}
            label={"Mis Tareas"}
          />
        </div>

        <AddProyect />
      </div>
    </aside>
  );
};

export default AsideHome;
