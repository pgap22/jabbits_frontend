import { Link } from "react-router-dom";
import Auth from "../../hoc/Auth";

const HeaderAuth = () => {
  return (
    <>
      <Auth>
        <Link
          to={"/projects"}
          className="p-2 px-3 text-center dark:bg-white dark:text-black dark:border-white dark:hover:bg-black dark:hover:text-white  border-black border-2 rounded-md font-medium  hover:text-white hover:bg-black transition-all"
        >
          Ir a los projectos
        </Link>

        <>
          <div className="flex md:flex-row flex-col gap-2">
            <Link to={"/login"}>
              <div className="p-2  bg-white text-center text-black border-2 border-black rounded-md font-medium">
                Iniciar Sesion
              </div>
            </Link>
            <Link to={"/register"}>
              <div className="p-2 dark:border-white bg-black text-center text-white border-2 border-black rounded-md font-medium hover:bg-white  hover:text-black">
                Empezar
              </div>
            </Link>
          </div>
        </>
      </Auth>
    </>
  );
};

export default HeaderAuth;
