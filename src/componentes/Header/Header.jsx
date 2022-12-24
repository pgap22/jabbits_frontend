import { Logo } from "../../assets/logo";
import { CgMenuLeftAlt } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import "./header.css";
import Wrapper from "../../hoc/Wrapper";
import LoginButton from "../buttons/LoginButton";
import GetStartedButton from "../buttons/GetStartedButton";
import { Link } from "react-router-dom";
import Menu from "../Menu/Menu";
import { HiOutlineSun } from "react-icons/hi";
import theme from "../../helper/theme";
import ThemeButton from "../buttons/ThemeButton";
import HeaderAuth from "./HeaderAuth";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const changeTheme = (e) => {
    theme(e.toLowerCase());
  };

  return (
    <>
      <header className="flex justify-between items-center">
        <Link to={"/"}>
          <img className="dark:invert w-36" src={Logo} alt="Logo jabbits" />
        </Link>
        <div onClick={toggleMenu} className="md:hidden" >
          <CgMenuLeftAlt  size={30} />
        </div>
        <div className="hidden md:grid grid-cols-[max-content_1fr] gap-2 items-center">
          <ThemeButton />
          <HeaderAuth/>
        </div>
      </header>

      <div
        className={`md:hidden ${showMenu ? 'translate-y-0' : 'translate-y-[200%]'} dark:bg-black fixed bg-white top-0 left-0 right-0 bottom-0 z-20 transition-all`}
      >
        <Wrapper>
          <div className="flex justify-between items-center">
            <Link to={"/"}>
              <img
                className="dark:invert w-36 "
                src={Logo}
                alt="Logo jabbits"
              />
            </Link>
            <AiOutlineClose
              onClick={toggleMenu}
              className="md:hidden z-30"
              size={30}
            />
          </div>

          <div className="mt-12 flex flex-col gap-5">
            <Link to={"/login"}>
              <LoginButton />
            </Link>
            <Link to={"/register"} className="flex flex-col w-full">
              <GetStartedButton text={"Get Started"} />
            </Link>
          </div>
          <div className="mt-12">
            <Menu
              placeholder="Select Theme"
              label=""
              saveItem={(e) => {
                changeTheme(e);
              }}
              testingArray={["Dark", "Light"]}
            >
              <HiOutlineSun size={30} />
            </Menu>
          </div>
        </Wrapper>
      </div>
    </>
  );
};

export default Header;
