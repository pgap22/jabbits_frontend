import { forwardRef } from "react";
import useInputError from "../../hooks/useInputError";

const InputDate = forwardRef(({ input, error }, ref) => {
  const inputError = useInputError(error);

  return (
    <div>
      <input
        type="date"
        className={`${
          inputError ? "error-input" : ""
        } dark:bg-transparent w-full border p-2 rounded input-border`}
        required
        ref={ref}
        {...input}
      />  
      <span className="text-red-500">{inputError ? inputError: ''}</span>
    </div>
  );
});

export default InputDate;
