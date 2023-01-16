import clsx from "clsx";
import useTasks from "../../hooks/useTasks";

const Task = ({task}) => {
  const { nombre: title, descripcion: description, status } = task;
  const {showTaskModal,setMainTask } = useTasks();
  return (
    <div
      onClick={()=>{
        showTaskModal();
        setMainTask(task);
      }}
      className={clsx(
        "bg-white",
        "p-4",
        "shadow",
        "flex",
        "flex-col",
        "justify-between",
        "gap-6",
        "rounded-md",
        "cursor-pointer",
        "hover:scale-[1.02]",
        "transition-all",
      )}
    >
      <div>
        <h1 className="text-2xl font-bold break-words">{title}</h1>

        <p className="text-gray-600 break-words">{description}</p>
      </div>
      <Status state={status} />
    </div>
  );
};

const Status = ({ state }) => {
  let status = "";
  let statusText = "";

  if (state == "expired") {
    status = "bg-gray-200 text-gray-780";
    statusText = "Expirado";
  }
  if (state == "completed") {
    status = "bg-green-200 text-green-800";
    statusText = "Completado";
  }
  if (state == "pending") {
    status = "bg-yellow-200 text-yellow-700";
    statusText = "Pendiente";
  }

  return (
    <div
      className={clsx(
        "w-full",
        "p-[2px]",
        "rounded-full",
        "text-center",
        status,
        "text-sm"
      )}
    >
      {statusText}
    </div>
  );
};

export default Task;
