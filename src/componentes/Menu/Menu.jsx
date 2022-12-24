import React, { useRef, useState } from "react";
import IconArrow from "./IconArrow";
import MenuItem from "./MenuItem";
import "./index.css";
const Menu = ({
  label = "label",
  placeholder = "placeholder",
  children,
  saveItem = () => {},
  testingArray = [],
}) => {
  const [country, changeCountry] = useState(localStorage.theme);

  const [show, setShow] = useState(false);

  const menu = useRef();
  const menuTablet = useRef();

  const setCountry = (value) => {
    changeCountry(value);
    saveItem(value);
  };

  const hideMenu = (e) => {
    menu.current.classList.remove("show-menu-item-component-css-react");
    menuTablet.current.classList.remove(
      "show-menu-item-component-css-react-tablet"
    );
    setShow(false);
  };

  const showMenu = () => {
    if (!show) {
      setShow(true);
      menu.current.classList.add("show-menu-item-component-css-react");
      menuTablet.current.classList.add(
        "show-menu-item-component-css-react-tablet"
      );
    } else {
      setShow(false);
      menu.current.classList.remove("show-menu-item-component-css-react");
      menuTablet.current.classList.remove(
        "show-menu-item-component-css-react-tablet"
      );
    }
  };

  const getCountry = (e) => {
    setCountry(e.target.value);
    hideMenu();
  };

  const getCountryTablet = (e) => {
    setCountry(e.target.value);
    hideMenu();
  };

  return (
    <div className="">
      <label className="text-2xl font-bold dark:text-white ">{label}</label>
      <div
        onClick={showMenu}
        className="border-2 border-black p-2 dark:border-white dark:bg-black rounded-md grid grid-cols-[max-content,1fr,max-content] items-center gap-1 px-2 select-none w-full"
      >
        {children}
        {country ? (
          <p className="text-lg text-center dark:text-white font-medium capitalize">
            {country}
          </p>
        ) : (
          <p className="text-lg text-center font-medium ">{placeholder}</p>
        )}
        <img className="justify-self-end dark:invert" src={IconArrow} alt="" />
      </div>

      <div
        onClick={showMenu}
        ref={menu}
        className="md:hidden absolute opacity-0 translate-y-full transition-all flex flex-col h-[100dvh] items-center justify-end top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.5)]"
      >
        <div onClick={(e)=>{
            e.stopPropagation();
        }} className="flex flex-col w-[90%] items-center">
          <div className="w-full bg-white dark:bg-[#393737] rounded-lg flex max-h-56 scroll-p-1 overflow-x-hidden flex-col items-center">
            {testingArray.map((element) => (
              <MenuItem
                key={element + "-" + Math.random()}
                value={element}
                onClick={getCountry}
                name={element + "-"}
              />
            ))}
          </div>

          <button
            onClick={hideMenu}
            className="bg-white dark:bg-[#393737] dark:text-white text-black  text-xl p-2 py-3 w-full  rounded-xl my-4 "
          >
            <p>Aceptar</p>
          </button>
        </div>
      </div>

      <div
        ref={menuTablet}
        className="hidden my-5 rounded-lg dark:border-[#4F4F4F]  border scroll-style flex-col w-full items-center"
      >
        <div className="w-full bg-white dark:bg-[#393737] rounded-lg flex max-h-56 scroll-p-1  overflow-x-hidden flex-col items-center">
          {testingArray.map((element) => (
            <MenuItem
              key={element + "-" + Math.random()}
              value={element}
              onClick={getCountryTablet}
              name={element}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
