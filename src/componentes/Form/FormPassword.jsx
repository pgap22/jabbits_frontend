import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";

const FormPassword = React.forwardRef(({ input, error }, ref) => {
  const [inputError, c] = useState('');
  useEffect(()=>{
    c(error)
  },[error])


  const [inputType, setType] = useState(true);
  const handlerClick = () => {
    setType(!inputType);
  };
  return (
    <div>
      <div
        className={`${inputError ? 'error-input' : ''} password-container input-form grid grid-cols-[1fr_max-content] items-center`}
      >
        <input
          type={inputType ? "password" : "text"}
          className="bg-transparent outline-none group"
          required
          ref={ref}
          {...input}
        />
        <div className="px-4">
          <BsFillEyeFill
            size={22}
            className={"cursor-pointer select-none"}
            onClick={handlerClick}
          />
        </div>
      </div>
      <span className="text-red-500">{inputError ? inputError: ''}</span>
    </div>
  );
});

export default FormPassword;
