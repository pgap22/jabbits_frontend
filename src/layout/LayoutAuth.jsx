import BackgroundImage from "../assets/background.jpg";
import { Link } from "react-router-dom";
import ThemeButton from "../componentes/buttons/ThemeButton";
const LayoutAuth = ({ children, nextPage, imageBg }) => {
  return (
    <>
      <main className=" md:grid grid-cols-2 md:h-[100vh]">
        <section className="flex md:h-full items-center flex-col md:justify-center px-5 mt-5 md:mt-0">
          {children}
        </section>

        <div className="hidden md:flex w-fit h-full relative">
          <div className="right-0 absolute m-5 flex gap-4 dark:bg-black  bg-white p-2 rounded-full items-center justify-between">
            <ThemeButton style={"p-0 m-0 mx-2"} />
            {nextPage && (
              <Link
                to={`/${nextPage}`}
                className="p-2 capitalize px-10 border text-xl font-bold rounded-full dark:bg-white dark:text-black dark:border-black bg-black text-white cursor-pointer"
              >
                {nextPage}
              </Link>
            )}
          </div>
          <img
            className="object-cover"
            src={imageBg || BackgroundImage}
            alt="background-image"
          />
        </div>
      </main>
    </>
  );
};

export default LayoutAuth;
