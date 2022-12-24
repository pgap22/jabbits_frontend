import Task from "../Task/Task";
import TaskHeading from "./TaskHeading";
import Wrapper from "../../hoc/Wrapper";
const DemoTask = () => {
  return (
    <div className="w-full max-w-md">
      <div className="dark:bg-[#2C2C2C] bg-gray-200 rounded-lg p-2 px-0">
        <div className="flex justify-around">
          <TaskHeading title={"Que Hacer"} active />
          <TaskHeading title={"En Progreso"} />
        </div>

        <div className="border-2 -mt-1  rounded-full border-[#D9D9D9] dark:border-[#626262]"></div>

        <Wrapper>
          <div className="flex flex-col gap-5">
            <Task
              enabled={false}
              tarea={
                {
                  nombre: 'Diseñar logotipo',
                  tags: [
                    { nombre: "Alta", color: "#a3a3a3" },
                    { nombre: "UI/UX", color: "#0ea5e9"},
                  ]
                }
              }
            />
            <Task
              enabled={false}
              tarea={
                {
                  nombre: 'Investigar requerimientos',
                  tags: [
                    { nombre: "Alta", color: "#a3a3a3" },
                    { nombre: "Completado", color: "#10b981"},
                  ]
                }
              }
            />
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default DemoTask;
