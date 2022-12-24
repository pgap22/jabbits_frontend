import React from "react";
import  IconCheck from "./IconCheck";
const MenuItem = ({name, onClick, value}) => {
  return (
    <div key={name} className="w-full">
      <input
        onChange={(e)=>{
            onClick(e);
        }}
        type="radio"
        className="menu-value-item-component-css-react"
        value={value}
        id={name}
        name="country"
      />
      <label
        htmlFor={name}
        className="text-xl dark:text-white menu-item-item-component-css-react transition-all py-3 w-full text-center border grid grid-cols-3 dark:border-[#4F4F4F] border-l-0 border-r-0 "
      >
        <p className="col-start-2">{value}</p>
        <img
          className=" hidden self-center justify-self-end pr-4 checked-img-item-component-css-react "
          src={IconCheck}
          alt=""
        />
      </label>
    </div>
  );
};

export default MenuItem;
