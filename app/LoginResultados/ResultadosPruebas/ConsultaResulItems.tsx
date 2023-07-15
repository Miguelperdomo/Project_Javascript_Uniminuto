"use client";
import React from "react";
import { GiLaptop } from "react-icons/gi";

interface Props {}

function ConsultaResulItems(props: Props) {
  const {} = props;

  return (
    <>
      <div className="mx-auto relative overflow-hidden flex flex-col rounded-xl w-[60%] h-[19rem] p-4 bg-[#172744] text-white hover:shadow-lg hover:shadow-[#223B60]">
        <div className="flex flex-col items-center gap-4">
          <GiLaptop className="w-[36%] h-full mb-[2%]" />
          <span className="!m-0 lg:text-[1.3rem] leading-[1] font-medium">
            Consulta de Resultados Pruebas Saber Pro
            {/* y SESA */}
          </span>
          <button className="mx-auto flex items-center justify-center text-[1rem] font-medium rounded-full px-4 py-2 space-x-1 border-[1px] bg-[#3D5C87] hover:bg-[#223B60]">
            <span>Consultar</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              stroke="#fff"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h13M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        {/* <div className="flex justify-between items-center">
          <button className="mx-auto flex items-center justify-center text-[1rem] font-medium rounded-full px-4 py-2 space-x-1 border-[1px] bg-[#3D5C87] hover:bg-[#223B60]">
            <span>Consultar</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              stroke="#fff"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h13M12 5l7 7-7 7" />
            </svg>
          </button>
        </div> */}
      </div>
    </>
  );
}

export default ConsultaResulItems;
