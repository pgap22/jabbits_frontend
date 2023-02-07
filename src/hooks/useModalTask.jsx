import clsx from "clsx";
import { motion } from "framer-motion";
import { useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
const useModalTask = () => {
  const [openFormModal, setModal] = useState(false);
  
  const md = useMediaQuery('(min-width:768px)');

  const initial = md ? {opacity: 0,  WebkitTransform: 'translate(-50%,-50%)'}  :    {WebkitTransform: 'translateY(200%)'};
  const animate = md ? {opacity: 1,  WebkitTransform: 'translate(-50%,-50%)'}  :    {WebkitTransform: '0'};
  const exit  =   md ? {opacity: 0,  WebkitTransform: 'translate(-50%,-50%)'}  :    {WebkitTransform: 'translateY(200%)'};
  
  const closeModal = () => {
    setModal(false);
  };
  const showModal = () => {
    setModal(true);
  };

  const ModalTask = ({ form = "" }) => {
    const DURATION = 0.2;
    return (
      <>
        <motion.div
          key={"modal-task"}
          initial={initial}
          animate={animate}
          exit={exit}
          style={{WebkitFontSmoothing: 'subpixel-antialiased'}}
          transition={{ duration: DURATION }}
          className={clsx(
            "rounded-t-lg",
            "bg-white",
            "z-10",
            "fixed",
            "bottom-0",
            "left-0",
            "right-0",

            "dark:bg-[#333333]",

            "md:bottom-auto",
            "md:left-1/2",
            "md:top-1/2",
            "md:rounded-md"
          )}
        >
          {form}
        </motion.div>

        <motion.div
          key={"bg-task-modal-new"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DURATION }}
          onClick={closeModal}
          className={clsx(
            "fixed",
            "bottom-0",
            "left-0",
            "right-0",
            "top-0",
            "bg-[rgba(0,0,0,0.40)]"
          )}
        ></motion.div>
      </>
    );
  };

  return [setModal, ModalTask, openFormModal, closeModal, showModal];
};
export default useModalTask;
