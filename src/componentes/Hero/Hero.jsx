import { Link } from "react-router-dom";
import Auth from "../../hoc/Auth";
import GetStartedButton from "../buttons/GetStartedButton";
import LearnMoreButton from "../buttons/LearnMoreButton";
import DemoTask from "../DemoTask/DemoTask";

const Hero = ({ scroll }) => {
  return (
    <>
      <section className="mt-10 flex flex-col items-center text-center gap-9 md:flex-row md:justify-between ">
        <div className="flex flex-col items-center text-center gap-9 md:items-start md:text-start md:max-w-xl">
          <h1 className="dark:text-white font-bold capitalize text-2xl md:text-5xl lg:text-6xl">
            Haga que sus proyectos sean mejores
          </h1>
          <p className="dark:text-white text-base max-w-[280px] md:text-lg md:max-w-none">
            Organiza todas tus tareas en un solo lugar y optimiza tu
            productividad en tus futuros proyectos.
          </p>

          <div className="flex gap-6">
            <Auth>
              <Link to={"/projects"}>
                <GetStartedButton text={"Ir a Proyectos"} />
              </Link>
              <Link to={"/register"}>
                <GetStartedButton text={"Comenzar"} />
              </Link>
            </Auth>
            <LearnMoreButton click={scroll} text={"Aprende mas"} />
          </div>
        </div>
        <DemoTask />
      </section>
    </>
  );
};

export default Hero;
