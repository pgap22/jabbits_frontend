const FormText = ({ input, placeholder, fieldState }) => {
  return (
    <>
      <div>
        <input
          required
          placeholder={placeholder}
          className={`${fieldState.error && 'error-input'} input-form`}
          {...input}
        />
        <span className="text-red-500 mt-1">
          {fieldState.error && fieldState.error.message}
        </span>
      </div>
    </>
  );
};
export default FormText;
