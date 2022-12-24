import React from "react";
import { forwardRef } from "react";
import useInputError from "../../hooks/useInputError";
const SelectMobil = forwardRef(({ input, error, valueDefault }, ref) => {
  const inputError = useInputError(error);
  return (
    <>
      <select
        {...input}
        required
        className={`${
          inputError ? "error-input" : ""
        } w-full border p-2 rounded input-border`}
        defaultValue=""
      >
        <option  disabled value="">
          {valueDefault}
        </option>
        <option value="Baja">Baja</option>
        <option value="Media">Media</option>
        <option value="Alta">Alta</option>
      </select>
    </>
  );
});
export default SelectMobil;
