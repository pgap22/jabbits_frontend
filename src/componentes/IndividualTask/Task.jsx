import clsx from "clsx";
import { formatDate } from "../../helper/formatDate";
import { traditionalDate } from "../../helper/traditionalDate";
import useTasks from "../../hooks/useTasks";

const Task = ({task}) => {
  const { nombre: title, descripcion: description, status,fecha } = task;
  const now = new Date(new Date().setHours(-1)).toISOString().split("T")[0];
  const limitDate = new Date(fecha).toISOString().split("T")[0]
  
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
        "hover:scale-[1.01]",
        "transition-all",
        "dark:bg-[#252525]"
      )}
    >
      <div className="space-y-2">
        <h1 className="text-2xl font-bold break-words">{title}</h1>

        <p className="text-gray-600 break-words dark:text-gray-300">{description}</p>

        <p className="font-bold">{traditionalDate(fecha)}</p>
      </div>
      <Status state={ (new Date(limitDate) < new Date(now)) ? 'expired' : status} />
    </div>
  );
};

const Status = ({ state }) => {
  let status = "";
  let statusText = "";

  if (state == "expired") {
    status = "bg-gray-200 text-gray-780 dark:bg-gray-800 dark:text-gray-300";
    statusText = "Expirado";
  }
  if (state == "completed") {
    status = "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-300";
    statusText = "Completado";
  }
  if (state == "pending") {
    status = "bg-yellow-200 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300";
    statusText = "Pendiente";
  }

  return (
    <div
      className={clsx(
        "w-full",
        "font-bold",
        "p-[2px]",
        "rounded-full",
        "text-center",
        status,
      )}
    >
      {statusText}
    </div>
  );
};

export default Task;
