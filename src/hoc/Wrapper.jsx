const Wrapper = ({ children }) => {
  return (
    <div className="flex justify-center">
      <div className="p-4 md:px-6 max-w-7xl w-full">{children}</div>
    </div>
  );
};

export default Wrapper;
