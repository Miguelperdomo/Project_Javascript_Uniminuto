import React from "react";

type props = {
  title: string;
};
const Title = ({ title }: props) => {
  return (
    <div className=" w-full mx-auto bg-[#070E54] text-center p-4 border-b-2 border-b-white">
      <h1 className="text-sm sm:text-[1.5rem] uppercase font-bold text-white place-self-center">
        {title}
      </h1>
    </div>
  );
};

export default Title;
