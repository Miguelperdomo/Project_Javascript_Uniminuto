"use client";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Title from "../Title";
import SvgMapaColombia from "./SvgMapaColombia";

function BodyComponent() {
  // const router = useRouter();
  const [ShowInfo, setShowInfo] = useState(
    {} as {
      Icono?: any;
      NomRectoria?: string;
      SVG?: any;
      Sedes?: any;
      NombreRectoria?: string;
    }
  );
  console.log("ShowInfoXDDD", ShowInfo);

  return (
    <div className="flex flex-col">
      <Title title="Mapa UNIMINUTO" />
      {/* <div className="border-x-2 border-t-2 border-white bg-[#070E54] p-4">
        <h2 className="text-center lg:text-[1.9rem] leading-normal font-bold text-white mr-4">
          Mapa UNIMINUTO
        </h2>
      </div> */}
      <div className="lg:flex lg:flex-row lg:justify-between p-4 gap-4">
        <div className="map-container w-full h-auto">
          <SvgMapaColombia setShowInfo={setShowInfo} />
        </div>
        <div className="w-full h-auto bg-white border-2 border-[#151A8B]/30 rounded-lg hover:shadow-[#151A8B]/80 hover:shadow-md">
          <div className="flex justify-start flex-col pt-2 p-2">
            <div className="lg:text-xl font-medium bg-[#151A8B]/80 rounded-lg text-white text-center py-1 mb-4">
              <h1>
                {ShowInfo?.NomRectoria ? (
                  <>
                    Rectoría <b>{ShowInfo?.NombreRectoria}</b>
                    <hr className="border-[1px] my-1 rounded-full w-96 mx-auto" />
                    <h1 className="m-0">
                      Departamento: <b>{ShowInfo?.NomRectoria}</b>
                    </h1>
                  </>
                ) : (
                  <>Seleccione una Rectoría en el mapa</>
                )}
              </h1>
            </div>
            <div
              className="rounded-lg p-[0.29rem] flex flex-row justify-center"
              style={{ border: "3px dashed #151A8B" }}
            >
              {ShowInfo.NomRectoria ? (
                <>
                  <Image
                    width={300}
                    height={0}
                    src={ShowInfo.Icono}
                    alt={ShowInfo.Icono}
                    title={ShowInfo.NomRectoria}
                  />
                </>
              ) : (
                <>
                  <h1 className="text-center">
                    No ha seleccionado ninguna Rectoría
                  </h1>
                </>
              )}
            </div>
            <div className="flex flex-col">
              <>
                <h1 className="lg:text-[1.5rem] text-[#070e54] font-bold text-center my-4">
                  {ShowInfo?.NomRectoria ? (
                    <>
                      Sedes y COA de la Rectoría{" "}
                      <b>{ShowInfo?.NombreRectoria}</b>
                    </>
                  ) : (
                    <>Seleccione una Rectoría para ver las Sedes y el COA</>
                  )}
                </h1>
              </>
              <div>
                {ShowInfo?.Sedes?.length > 0 ? (
                  ShowInfo?.Sedes?.map((Sede: any) => {
                    return (
                      <div
                        key={Sede.idSede}
                        className="grid grid-cols-2 items-center"
                      >
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-7 h-7 hover:w-[1.80rem] hover:h-[1.80rem]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="#151A8B"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5H15v-18a.75.75 0 000-1.5H3zM6.75 19.5v-2.25a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75zM6 6.75A.75.75 0 016.75 6h.75a.75.75 0 010 1.5h-.75A.75.75 0 016 6.75zM6.75 9a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zM6 12.75a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM10.5 6a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zm-.75 3.75A.75.75 0 0110.5 9h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM10.5 12a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zM16.5 6.75v15h5.25a.75.75 0 000-1.5H21v-12a.75.75 0 000-1.5h-4.5zm1.5 4.5a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zm.75 2.25a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75h-.008zM18 17.25a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <p className="text-black lg:text-lg font-semibold">
                            {Sede?.NombreSede}
                          </p>
                        </div>
                        <div>
                          {Sede?.COA?.map((item: any) => {
                            return (
                              <h1
                                // onClick={() => {
                                //   router.push("");
                                // }}
                                key={item.idCoa}
                                className="leading-[1] font-medium text-xs lg:text-base"
                              >
                                -{` ${item?.NombreCoa}`}.
                              </h1>
                            );
                          })}
                        </div>
                        <hr
                          style={{ border: "1px dashed #151A8B" }}
                          className="col-span-2 mt-1"
                        />
                      </div>
                    );
                  })
                ) : (
                  <h1 className="text-center">
                    No se han ingresado Sedes en la Rectoría{" "}
                    <b>{ShowInfo?.NomRectoria}</b>
                  </h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BodyComponent;
