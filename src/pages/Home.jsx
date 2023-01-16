import Header from "../componentes/Header/Header";
import Hero from "../componentes/Hero/Hero";
import Task from "../componentes/Task/Task";
import TwoColumn from "../hoc/TwoColumn";
import Wrapper from "../hoc/Wrapper";
import TeamLogo from "../assets/team.svg";
import Acordeon from "../componentes/Acordeon/Acordeon";
import HomePhoto from "../assets/home-photo.png";
import { forwardRef, useRef } from "react";
const Home = () => {
  const learnMore = useRef();
  const scrollToComponent = () => {
    learnMore.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <>
      <Wrapper>
        <Header />
        <Hero scroll={scrollToComponent} />
        <Features />
        <WhyUseJabbits ref={learnMore}/>
      </Wrapper>

      <Footer />
    </>
  );
};

const Features = () => {
  return (
    <>
      <TwoColumn>
        <div className="home-task">
          <Task
            key={"demo-hook"}
            enabled={false}
            tarea={{
              nombre: "Crear un custom hook",
              descripcion:
                "Crear un custom hook que obtenga los valores de la API",
              tags: [
                {_id: Math.random(), nombre: "Alta", color: "#a3a3a3" },
                {_id: Math.random(), nombre: "Pendiente", color: "#eab308" },
              ],
            }}
          />
        </div>

        <div className="flex flex-col gap-10">
          <h2 className="font-medium text-3xl md:text-4xl ">Tareas</h2>
          <p className="max-w-sm">
            Crea tareas sencillas para organizar tus proyectos, puedes añadir
            algunas etiquetas para comprobar su estado y categoría.
          </p>
        </div>
      </TwoColumn>
      <TwoColumn reverse={true}>
        <div className="flex flex-col gap-10">
          <h2 className="font-medium capitalize text-3xl md:text-4xl ">
            Invita a tu equipo
          </h2>
          <p className="max-w-md ">
            Una característica sorprendente de esta aplicación es que puedes
            invitar a tus compañeros de equipo a utilizarla y organizarlos.
          </p>
        </div>

        <div>
          <img
            className="dark:invert w-32 md:w-44"
            src={TeamLogo}
            alt="team-logo"
          />
        </div>
      </TwoColumn>
    </>
  );
};

const WhyUseJabbits = forwardRef((props, learnMore) => {
  return (
    <section ref={learnMore}>
      <h2 className="dark:border-white md:my-14 text-center font-medium text-3xl md:text-4xl  py-5 border-b-2 border-black w-full">
        Porque Usar Jabbits
      </h2>
      <Wrapper>
        <div className="grid grid-cols-1 justify-items-center">
          <div className="md:grid md:max-w-5xl w-full grid-cols-2 gap-16 justify-items-start">
            <Acordeon
              items={[
                {
                  title: "Efficient",
                  text: "Fusce convallis vestibulum massa vitae gravida. Nullam massa lacus, aliquam quis tempus eu, volutpat nec justo. ",
                },
                {
                  title: "Efficient",
                  text: "Fusce convallis vestibulum massa vitae gravida. Nullam massa lacus, aliquam quis tempus eu, volutpat nec justo. ",
                },
                {
                  title: "Efficient",
                  text: "Fusce convallis vestibulum massa vitae gravida. Nullam massa lacus, aliquam quis tempus eu, volutpat nec justo. ",
                },
              ]}
            />
            <img
              width={320}
              className={"hidden md:block"}
              src={HomePhoto}
              alt=""
            />
          </div>
        </div>
      </Wrapper>
    </section>
  );
});

const Footer = () => {
  return (
    <footer className="w-full text-center p-4 dark:border-t dark:border-white bg-black text-white">
      <p className="font-bold text-xl ">Jabbits {new Date().getFullYear()} &copy;</p>
    </footer>
  );
};

export default Home;
