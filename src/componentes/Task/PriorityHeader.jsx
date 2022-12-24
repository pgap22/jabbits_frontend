const PriorityHeader = ({ text, color }) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="font-bold">{text}</h1>
      <div className={`"w-full h-1.5 ${color} rounded-full`}></div>
    </div>
  );
};

export default PriorityHeader;
