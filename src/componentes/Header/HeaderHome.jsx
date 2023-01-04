import { AiOutlineSearch } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { HiOutlineUserCircle, HiChevronDown } from "react-icons/hi";
import { CgMenuLeftAlt } from "react-icons/cg";
import AsideHome from "../Aside/AsideHome";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import useProject from "../../hooks/useProyect";
import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {BsTriangleHalf} from "react-icons/bs";
import toggleTheme from "../../helper/toggleTheme";


const HeaderHome = () => {
  const { menu, toggleMenu } = useProject();
  const { Logout, auth } = useAuth();
  const [searchBar, setSearch] = useState("");
  const { proyectos } = useProject();
  const navigate = useNavigate();

  const handlerOnChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };
  const { id } = useParams();

  useEffect(() => {
    setSearch("");
  }, [id]);

  return (
    <>
      <div className="bg-white dark:bg-[#1D1D1D] md:flex md:justify-center">
        <section className="py-5 md:py-10 w-full grid grid-cols-2 px-6 md:max-w-[1600px]">
          <CgMenuLeftAlt
            onClick={toggleMenu}
            className="md:hidden cursor-pointer"
            size={34}
          />

          <div className="bg-gray-200 dark:bg-[#2D2D2D] relative gap-2 items-center rounded-md px-2 w-full max-w-md hidden md:flex">
            <AiOutlineSearch color="gray" size={30} />
            <input
              type="search"
              placeholder="Search"
              onChange={handlerOnChange}
              value={searchBar}
              className="bg-gray-200 dark:bg-[#2D2D2D] w-full p-2 outline-none border-none"
            />
            {searchBar ? (
              <div className="bg-white dark:bg-[#2D2D2D] dark:border-[#535050] w-[90%] flex flex-col absolute rounded-md left-[40px] top-[45px] z-10 border shadow-lg ">
                {proyectos
                  .filter(({ nombre }) => nombre.toLowerCase().match(searchBar))
                  .map((proyecto, i) => {
                    return (
                      <div
                        key={proyecto._id}
                        onClick={() => {
                          navigate("/projects/" + proyecto._id);
                        }}
                        className={`p-4 w-full py-2 border-b dark:border-[#535050] cursor-pointer dark:hover:bg-[#1C1B1B] hover:bg-gray-100 transition-all
                          last:border-none last:rounded-b-md first:rounded-t-md
                        `}
                      >
                        <p
                          dangerouslySetInnerHTML={{
                            __html: proyecto.nombre
                              .toLowerCase()
                              .replaceAll(
                                searchBar,
                                `<span class='font-bold'>${searchBar}</span>`
                              ),
                          }}
                        ></p>
                      </div>
                    );
                  })}
              </div>
            ) : null}
          </div>

          <Popover className="relative flex items-center select-none gap-4 justify-self-end">
            <p className="text-xl">{auth.nombre}</p>
            <HiOutlineUserCircle size={40} />

            <Popover.Button className={"outline-none"}>
              <HiChevronDown size={20} />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Popover.Panel className="absolute right-[-10%] top-12 z-10 w-[12rem] ">
                <div className="rounded-md bg-white dark:bg-[#282828] dark:border-[#535050] shadow-md p-2 border flex flex-col gap-3">
                  
                  <div
                    onClick={Logout}
                    className="flex gap-2 p-1 items-center dark:hover:bg-[#480A0A] dark:hover:text-[#DD3B3B] hover:bg-red-100 rounded-md cursor-pointer hover:text-red-700 transition-all"
                  >
                    <BiLogOut size={24} />
                    <p className="md:text-lg">Cerrar Sesion</p>
                  </div>

                  <div
                    onClick={toggleTheme}
                    className="flex gap-2 p-1 items-center hover:bg-gray-100 dark:hover:bg-stone-700 rounded-md cursor-pointer transition-all"
                  >
                    <BsTriangleHalf size={24} />
                    <p className="md:text-lg">Cambiar Tema</p>
                  </div>

                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </section>
      </div>

      <AnimatePresence>
        {menu && (
          <>
            <motion.div
              onClick={() => {
                toggleMenu(0);
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.40)] md:hidden z-50"
            >
              <motion.div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                initial={{ transform: "translateX(-250%)" }}
                animate={{ transform: "translateX(0%)" }}
                exit={{ transform: "translateX(-250%)" }}
                transition={{ duration: 0.5 }}
                className="md:hidden absolute top-0 bottom-0"
              >
                <AsideHome closeMenu={toggleMenu} />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderHome;
