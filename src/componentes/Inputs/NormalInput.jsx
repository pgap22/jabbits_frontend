import { forwardRef } from "react";
import useInputError from "../../hooks/useInputError";

const NormalInput = forwardRef(({ input, error }, ref) => {

  const inputError = useInputError(error)

  return (
    <div>
      <input
        className={`${inputError ? "error-input" : ""} input-form`}
        required
        ref={ref}
        {...input}
      />
      {inputError && <span className="text-red-500">{inputError ? inputError: ''}</span>}
    </div>
  );
});
export default NormalInput;
