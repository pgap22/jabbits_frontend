import { motion } from "framer-motion";
import React from "react";
import { useState } from "react";
import useProject from "../../hooks/useProyect";
import SpinnerButton from "../spinner/SpinnerButton";
const SaveTags = ({toggleOptions}) => {
  const [sending, setSending] = useState(false);
  const { task, tareaAPI } = useProject();

  const sendTags = async () => {
    setSending(true);
    try {
      await tareaAPI({ tags: task.tags }, task._id, "edit");
      toggleOptions();
    } catch (error) {
      console.log(error);
    }

  };
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      disabled={sending}
      onClick={sendTags}
      className="border p-3 enabled:hover:bg-sky-50 bg-sky-100 text-blue-700 font-medium  rounded-full w-fit min-w-[120px] flex justify-center"
    >
      {sending ? (
        <div
          style={{
            filter:
              "invert(26%) sepia(74%) saturate(1808%) hue-rotate(179deg) brightness(92%) contrast(98%)",
          }}
          className="w-8 h-8"
        >
          <SpinnerButton />
        </div>
      ) : (
        " Guardar Etiquetas"
      )}
    </motion.button>
  );
};

export default SaveTags;
