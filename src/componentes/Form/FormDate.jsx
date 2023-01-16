const FormDate = ({ input, fieldState }) => {
  return (
    <div>
      <input
        type="date"
        className={`${
          fieldState.error ? "error-input" : ""
        } w-full border p-2 rounded input-border`}
        required
        {...input}
      />
      <span className="text-red-500">{fieldState.error && fieldState.error.message}</span>
    </div>
  );
};

export default FormDate;
