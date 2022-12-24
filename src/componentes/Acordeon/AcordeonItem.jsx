import { useState } from "react";
import AnimateHeight from "react-animate-height";
import { SlArrowDown } from "react-icons/sl";
import "./acordeon.css";

const AcordeonItem = ({ item }) => {
  const [first, setFirst] = useState(0);
  const toggleItem = () => {
    if (!first) {
      setFirst("auto");
      return;
    }
    setFirst(0);
  };
  return (
    <div className="dark:border-white border border-black p-4 rounded-md ">
      <div
        onClick={toggleItem}
        className="cursor-pointer  flex justify-between items-center"
      >
        <h1 className="font-bold  py-1 text-xl">{item.title}</h1>
        <SlArrowDown className=""/>
      </div>
      <AnimateHeight
        height={first}
        duration={250}
      >
        <p className="py-1">{item.text}</p>
      </AnimateHeight>
    </div>
  );
};

export default AcordeonItem;
