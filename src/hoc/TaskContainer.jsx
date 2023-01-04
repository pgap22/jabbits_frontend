const TaskContainer = ({ children }) => {
  return (
    <div className="w-full bg-[#f0f0f0] dark:bg-[#2F2F2F] flex flex-col items-center h-full ">
      <div className="gap-5 p-6 md:p-8 w-full max-w-[1600px] h-full  ">
        <div className="w-full flex justify-between h-full ">
          <div className="w-full grid grid-cols-1 bg-[#f0f0f0] dark:bg-[#2F2F2F] h-full ">
            <div className="grid h-full grid-cols-[repeat(3,320px)] py-4 gap-12 overflow-auto scrollbar-thumb-black scrollbar-thin scrollbar-thumb-rounded-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskContainer;
