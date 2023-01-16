import { Listbox, Transition } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";

const FormSelect = ({ input, fieldState, options = [] }) => {
  return (
    <>
      <div className="flex flex-col justify-end">
        <Listbox onChange={input.onChange}>
          <Listbox.Button
            className={`py-2 border-b relative 
            ${input.value ? 'dark:border-white border-black': ''}
            ${fieldState.error && "error-input"}`}
          >
            {({ open }) => (
              <div className="flex items-center justify-between">
                <span className={!input.value ? "text-gray-400 capitalize" : "capitalize"}>
                  {input.value || input.placeholder}
                </span>
                <FiChevronDown
                  className={
                    open ? "transition-all rotate-180" : "transition-all"
                  }
                />
              </div>
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
            <Listbox.Options
              className={
                "border dark:border-stone-600  mt-2 rounded-md shadow-md absolute  left-0 right-0"
              }
            >
              {options.map((option, i) => (
                <Listbox.Option
                  className={`p-2 dark:hover:bg-stone-700 hover:bg-gray-100 dark:border-stone-600 cursor-pointer bg-white dark:bg-stone-900
                  ${i != options.length - 1 ? "border-b " : ""}
                  ${i == options.length - 1 ? "rounded-b-md" : ""}
                  ${i == 0 ? "rounded-t-md" : ""} `}
                  key={option.id}
                  value={option.name}
                >
                  {option.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </Listbox>
        <span className="text-red-500 mt-1">
          {fieldState.error && fieldState.error.message}
        </span>
      </div>
    </>
  );
};
export default FormSelect;
