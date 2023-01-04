import { Logo } from "../../assets/logo";
import AddProyect from "../buttons/AddProyect";
import { NavLink, Link, useLocation } from "react-router-dom";
import ProjectMenu from "../Dropdown/ProjectMenu";
import useProject from "../../hooks/useProyect";
import {AiOutlineCloseCircle} from "react-icons/ai"

const AsideHome = () => {
  const location = useLocation();
  const {toggleMenu} = useProject();

  
  const navLinkStyle = (path)=>{
    if (location.pathname == path) return "bg-gray-200 dark:bg-[#3A3A3A] dark:text-white text-gray-700 mx-3 px-3 py-3 rounded-md ";
    return "mx-3 px-3 py-3 hover:bg-gray-100 dark:hover:bg-[#3A3A3A] rounded-md";
  }

  return (
    <aside className="bg-white dark:bg-[#1D1D1D] dark:border-[#535050] w-[16rem] relative h-full min-h-screen border-r-2 overflow-auto">
      <div onClick={toggleMenu} className="md:hidden absolute p-3">
        <AiOutlineCloseCircle size={20}/>
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
      <div className="flex flex-col gap-8 pt-12 mx-2">
        <NavLink
          to={"/projects"}
          onClick={toggleMenu}
          className={()=>{return navLinkStyle('/projects')}}
        >
          <ProjectMenu />
        </NavLink>

        <div>
          <AddProyect />
        </div>
      </div>
    </aside>
  );
};

export default AsideHome;
