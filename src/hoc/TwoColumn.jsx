import clsx from "clsx";

const TwoColumn = ({ children, reverse = false }) => {
  return (
    <div
      className={clsx(
        "mt-12",
        "md:mt-24",
        "text-center",
        "flex",
        "flex-col-reverse",
        "md:flex-row",
        "md:justify-between",
        "md:text-start",
        "items-center",
        "gap-10",
        "justify-items-between",
        reverse ? 'reverse' : null
      )}
    >
      <div>{children[0]}</div>
      <div>{children[1]}</div>
    </div>
  );
};

export default TwoColumn;
