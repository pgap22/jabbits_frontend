const FormTextarea = ({input, fieldState}) => {
  
  return (
    <div>
      <textarea
        className={` ${fieldState.error && "error-input"} w-full dark:bg-transparent textarea-border`}
        required
        {...input}
      ></textarea>
      <span className="text-red-500">{fieldState.error && fieldState.error.message}</span>
    </div>
  );
};

export default FormTextarea;
