import { Dialog, Transition } from "@headlessui/react";
import { useCycle } from "framer-motion";
import { Fragment } from "react";
import {AiOutlineCloseCircle} from "react-icons/ai"

import { cloneElement } from "react";
const Modal = ({children, title, description,modalWidth = ''}) => {
  const [open, toggleModal] = useCycle(false, true);
  const Panel = cloneElement(children[1], {...children[1].props, toggleModal});
  const Button = cloneElement(children[0], {...children[0].props, toggleModal});
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          onClose={toggleModal}
          className="fixed my-4 md:my-0 top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed bg-[rgba(0,0,0,0.40)] top-0 left-0 right-0 bottom-0"></div>
          </Transition.Child>

          <Transition.Child
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            as={Fragment}
          >
            <Dialog.Panel
              className={
                "bg-white dark:bg-[#2F2F2F] rounded-md flex flex-col gap-4 p-6 mx-4 max-h-screen overflow-auto "+modalWidth
              }
            >
              <Dialog.Title className={"font-bold w-full text-xl md:text-3xl flex justify-between items-start"}>
                {title}
                <AiOutlineCloseCircle size={22} onClick={toggleModal} />
              </Dialog.Title>
              <Dialog.Description className={"text-gray-600 dark:text-white mt-3 text-start"}>
                 {description}
              </Dialog.Description>

              {Panel}
            
            
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>

      
      {Button}
    </>
  );
};

export default Modal;
