import clsx from "clsx";
import { motion } from "framer-motion";

const DashboardPage = ({ heading, children }) => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={clsx(
        "bg-white",
        "dark:bg-[#1D1D1D]",
        "dark:border-[#535050]",
        "w-full",
        "h-full",
        "items-start",
        "border-t",
        "grid",
        "grid-rows-[max-content_1fr]"
      )}
    >
      <div
        className={clsx(
          "gap-5",
          "p-6",
          "md:p-8",
          "w-full",
          "max-w-[1600px]",
          "justify-self-center"
        )}
      >
        {heading}
      </div>

      <div
        className={clsx(
          "w-full",
          "bg-[#f0f0f0]",
          "dark:bg-[#2F2F2F]",
          "flex",
          "flex-col",
          "items-center",
          "h-full"
        )}
      >
        <div
          className={clsx(
            "gap-5",
            "p-4",
            "md:p-8",
            "w-full",
            "max-w-[1600px]",
            "h-full"
          )}
        >
          <div className={clsx("w-full", "flex", "justify-between", "h-full")}>
            <div
              className={clsx(
                "w-full",
                "grid",
                "grid-cols-1",
                "bg-[#f0f0f0]",
                "dark:bg-[#2F2F2F]",
                "h-full"
              )}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
};

export default DashboardPage;
