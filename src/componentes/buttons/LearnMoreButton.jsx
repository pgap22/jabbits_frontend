const LearnMoreButton = ({ text, click }) => {
  return (
    <button onClick={()=>{click()}} className="bg-[rgba(153,231,255,0.72)] rounded-md p-3 px-6 relative group cursor-pointer select-none">
      <p className="dark:text-white font-medium text-sm md:text-base">{text}</p>
      <div className=" border border-cyan-600 absolute top-0 right-0 left-0 bottom-0 rounded-md transition-all group-hover:-translate-x-1 -z-10 group-hover:-translate-y-1"></div>
    </button>
  );
};

export default LearnMoreButton;
