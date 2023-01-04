import { forwardRef } from "react";
import useInputError from "../../hooks/useInputError";

const TextareaInput = forwardRef(({ input, error }, ref) => {

  const inputError = useInputError(error);
  
  return (
    <div>
      <textarea
        className={` dark:bg-transparent ${inputError ? "error-input" : ""} w-full border dark:border-gray-500 dark:focus:border-white dark:valid:border-white valid:border-black focus:border-black transition-all outline-none resize-none rounded p-1`}
        required
        {...input}
        ref={ref}
        error={error}
      ></textarea>
      <span className="text-red-500">{inputError ? inputError: ''}</span>
    </div>
  );
});

export default TextareaInput;
