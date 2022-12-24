
import { FcGoogle } from "react-icons/fc";

const FormsButtons = ({text, primary,secondary}) => {
  return (
    <div className="flex flex-col gap-3">
      <button className="dark:border-white border capitalize border-black bg-black p-2 text-white text-lg font-bold rounded-full">
        {primary || text}
      </button>
      {/* <button className="dark:border-white dark:bg-white dark:text-black border p-2 capitalize border-black rounded-full flex justify-center items-center gap-4">
        <FcGoogle size={20} />
        <span className="font-bold ">{text || secondary} Con Google</span>
      </button> */}
    </div>
  );
};

export default FormsButtons;
