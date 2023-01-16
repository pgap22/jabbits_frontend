import clsx from "clsx";

const Wrapper = ({ children }) => {
  return (
    <div className={clsx("flex", "justify-center")}>
      <div className={clsx("p-4", "md:px-6", "max-w-7xl", "w-full")}>
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
