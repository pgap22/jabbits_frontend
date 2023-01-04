import { Listbox, Transition } from "@headlessui/react";
import { forwardRef, useState } from "react";
import useInputError from "../../hooks/useInputError";
import { FiChevronDown } from "react-icons/fi";
import { useEffect } from "react";
const SelectInput = forwardRef(({ error, valueDefault, func, value }, ref) => { 
  const options = [
    { id: "Baja", value: "Baja", name: "Baja", unavailable: false },
    { id: "Media", value: "Media", name: "Media", unavailable: false },
    { id: "Alta", value: "Alta ", name: "Alta", unavailable: false },
  ];

  const [selectedOption, setOption] = useState(valueDefault);

  const inputError = useInputError(error);

  useEffect(()=>{
    if(value){
      setOption(value)
    }
  },[value])
  return (
    <>
      <Listbox
        value={selectedOption}
        onChange={(value) => {
          setOption(value);
          func();
        }}
      >
        <Listbox.Button
          className={`${inputError ? "error-input" : ""} ${
            selectedOption !== valueDefault ? "border-black dark:border-white" : "dark:border-gray-500 "
          }  border w-full text-start p-2 flex justify-between items-center rounded-md`}
        >
          {({ open }) => (
            <>
              {selectedOption}
              <FiChevronDown
                className={
                  open ? "transition-all rotate-180" : "transition-all"
                }
              />
            </>
          )}
        </Listbox.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Listbox.Options className={"border mt-2 rounded-md shadow-md dark:border-stone-500"}>
            {options.map((option, i) => (
              <Listbox.Option
                className={`p-2 dark:hover:bg-stone-700 border-b hover:bg-gray-100 dark:border-stone-600 cursor-pointer bg-white dark:bg-stone-900
                  first:rounded-t-md last:rounded-b-md last:border-none 
                `}
                key={option.id}
                value={option.name}
                disabled={option.unavailable}
              >
                {option.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
      <span className="text-red-500">{inputError ? inputError : ""}</span>
      <input
        ref={ref}
        value={selectedOption}
        readOnly
        className="hidden"
        type="text"
      />
    </>
  );
});
export default SelectInput;
