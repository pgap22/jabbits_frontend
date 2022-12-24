import { Popover, Transition } from "@headlessui/react";
import { useCycle } from "framer-motion";
import { useRef } from "react";
import { useEffect } from "react";
import { FiSettings } from "react-icons/fi";
import DeleteProject from "./DeleteProject";
import EditProject from "./EditProyect";
const ConfigProject = () => {
  const [open, togglePopover] = useCycle(false, true);
  const button = useRef();
  const panel = useRef();

  useEffect(() => {
    if (open) {
      document.onclick = (e) => {
        if(!button.current.contains(e.target) && !panel.current.contains(e.target)){
          togglePopover();
        }
      };
    } else {
      document.onclick = null;
    }
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={button}
        onClick={togglePopover}
        className={
          "bg-white text-black hover:text-gray-400 p-2 rounded-md border-2 border-white transition-all outline-none"
        }
      >
        <FiSettings size={28} />
      </button>

      <Transition
        show={open}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div ref={panel} className="absolute right-0 z-20 w-max bg-white shadow-md p-4 rounded-md">
          <div className="w-full flex md:flex-col gap-2">
            <EditProject />
            <DeleteProject />
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default ConfigProject;
