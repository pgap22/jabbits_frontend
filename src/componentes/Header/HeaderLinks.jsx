import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineContactSupport } from "react-icons/md";
import { Link } from "react-router-dom";

const HeaderLinks = () => {
  return (
    <div className="flex flex-col md:flex-row md:gap-8">
      <LinkNav url={"/"} text={'Inicio'} Icon={AiOutlineHome}/>
      <LinkNav url={"/contact"} text={'Contacto'} Icon={MdOutlineContactSupport} />
    </div>
  );
};

const LinkNav = ({url,text,Icon}) => {
  return (
    <Link
      to={url}
      className="group flex items-center gap-4 border-t border-b py-4 md:border-none md:p-0 md:block"
    >
      <Icon size={32} className={"md:hidden"} />
      <div className="flex flex-col">
        <p>{text}</p>
        <div className="dark:bg-white group-hover:w-full w-0 transition-all h-[2px] bg-black"></div>
      </div>
    </Link>
  );
};

export default HeaderLinks;
