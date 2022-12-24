import { Popover } from "@headlessui/react";
import { useRef } from "react";
import { useState } from "react";
import { equalsArray } from "../../helper/equalsArray";
import useProject from "../../hooks/useProyect";
import NormalInput from "../Inputs/NormalInput";
import SpinnerButton from "../spinner/SpinnerButton";
import "./tag.css";
import TagTask from "./TagTask";
const EditableTagTask = ({ tag, tareasProps }) => {
  if (tag.mandatory) return <TagTask tag={tag} />;

  const [colorTag, setColor] = useState("#6b7280");
  const [spinner, setSpinner] = useState(false);
  const [contentLoaded, setContent] = useState(false);

  const nombreRef = useRef();

  const { task, setTask, tareaAPI } = useProject();

  const changeColorTag = (e) => {
    setColor(e.target.value);
  };

  const handlerSubmit = async (e) => {
    setSpinner(true);
    e.preventDefault();

    const tagEdited = {
      nombre: nombreRef.current.value,
      color: colorTag,
    };

    if (!nombreRef.current.value) {
      const taskTagEdited = task.tags.filter(
        (taskTag) => taskTag._id !== tag._id
      );
      const taskEdited = {
        tags: taskTagEdited,
      };

      await tareaAPI(taskEdited, task._id, "edit");

      setSpinner(false);
      setContent(true);

      return;
    }

    const taskTagEdited = task.tags.map((taskTag) =>
      taskTag._id == tag._id ? tagEdited : taskTag
    );
    const taskEdited = {
      tags: taskTagEdited,
    };
    await tareaAPI(taskEdited, task._id, "edit");

    setSpinner(false);
    setContent(true);

    console.log(tagEdited);
  };


  return (
    <Popover className={"relative"}>
      {({ open }) => {
        return (
          <>
            <Popover.Button
              style={{
                backgroundColor: tag.color + "20",
              }}
              className={`rounded-full outline-none w-fit p-1 px-4 hover:opacity-75 cursor-pointer`}
            >
              <p
                style={{
                  color: tag.color,
                }}
                className={`text-xs font-medium md:text-[13px]`}
              >
                {tag.nombre}
              </p>
            </Popover.Button>
            {open && !contentLoaded && (
              <Popover.Panel className="shadow-lg bg-white border p-2 absolute -left-8 -translate-x-1/2 z-50 rounded-md top-full w-[200px] m-1">
                <form
                  onSubmit={handlerSubmit}
                  className="w-full flex-col space-y-5"
                  noValidate
                >
                  <div className="flex justify-between w-full">
                    <input
                      onChange={changeColorTag}
                      defaultValue={tag.color}
                      type="color"
                    />
                    <TagTask
                      tag={{
                        nombre: "Prueba",
                        color: colorTag,
                      }}
                    />
                  </div>
                  <NormalInput
                    input={{
                      placeholder: "Tag",
                      defaultValue: tag.nombre,
                    }}
                    ref={nombreRef}
                  />
                  <button className="text-center flex justify-center hover:bg-blue-100 hover:text-blue-800 w-full rounded-full p-1 border">
                    {spinner ? (
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
                      !equalsArray(task.tags, tareasProps.tags) ? "Guardar Etiquetas" : "Actualizar"
                    )}
                  </button>
                </form>
              </Popover.Panel>
            )}
          </>
        );
      }}
    </Popover>
  );
};

export default EditableTagTask;
