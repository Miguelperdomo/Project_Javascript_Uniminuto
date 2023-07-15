import React from "react";

type props = {
  title: string;
  children: React.ReactNode;
};

const TitleButton = ({ title, children }: props) => {
  return (
    <div className="p-3 flex justify-around bg-[#070E54] ">
      <div className="text-sm sm:text-[1.5rem] uppercase text-white font-bold place-self-center">
        {title}
      </div>
      <section className="block md:flex">{children}</section>
    </div>
  );
};

export default TitleButton;
