import "./tag.css";
const TagTask = ({ tag }) => {
    
  return (
    <div
      style={{
        backgroundColor: tag.color+'20',
      }}
      className={`rounded-full w-fit p-1 px-4`}
    >
      <p
        style={{
          color: tag.color,
        }}
        className={`text-xs font-medium md:text-[13px] whitespace-nowrap`}
      >
        {tag.nombre}
      </p>
    </div>
  );
};

export default TagTask;
