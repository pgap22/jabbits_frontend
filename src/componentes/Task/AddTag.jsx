import "./tag.css";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import useProject from "../../hooks/useProyect";

const AddTag = () => {
  const [inputLength, setInputLenght] = useState(1);
  const [mode, setMode] = useState(false);

  const { task, setTask } = useProject();

  const inputRef = useRef();

  const handlerOnChange = (e) => {
    setInputLenght(e.target.value.length);
  };

  const handlerClick = () => {
    setMode(true);
    setInputLenght(1);
  };

  const saveCurrentTag = () => {
    setMode(false);
    if (inputRef.current.value) {
      const newTag = {
        nombre: inputRef.current.value,
        color: "#6b7280",
        mandatory: false,
      };
      setTask({
        ...task,
        tags: [...task.tags, newTag],
      });
    }
  };

  const handlerKeyDown = (e) => {
    if (e.code == "Enter") {
      saveCurrentTag();
    }
  };

  const handlerBlur = () => {
    saveCurrentTag();
  };

  useEffect(() => {
    if (mode) {
      inputRef.current.focus();
    }
  }, [mode]);

  return (
    <>
      <div
        onClick={handlerClick}
        className={`rounded-full relative p-1 px-3 border hover:bg-gray-100 group cursor-pointer `}
      >
        <div className={`flex items-center gap-2`}>
          {mode ? (
            <form
            onSubmit={(e)=>{e.preventDefault();}}
            className="flex"
            >
              <input
                ref={inputRef}
                onBlur={handlerBlur}
                onKeyDown={handlerKeyDown}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onChange={handlerOnChange}
                style={{
                  width: inputLength + 1 + "ch",
                }}
                className={`outline-none text-xs font-medium md:text-[13px] group-hover:bg-gray-100`}
                type="text"
              />
            </form>
          ) : (
            <>
              {" "}
              <IoMdAdd />
              <p className="text-xs font-medium md:text-[13px]">
                Añadir Etiqueta
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AddTag;
