"use client";
// import { Page, PDFViewer, View, Text, StyleSheet, Document } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import { BlobProvider, Document, Page, Text } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import { FaArrowCircleDown } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import ReactSelect from "react-select";
import Loading from "@/app/loading";

const BodyComponent = () => {
  const searchParams = useSearchParams();

  const [Data, setData] = useState({} as any);
  const [IsLoading, setIsLoading] = useState(false as boolean);
  const [Values, setValues] = useState({} as any);

  const [InfoPdf, setInfoPdf] = useState({} as any);

  const GetData = async () => {
    setIsLoading(true);
    const SubSede = searchParams.get("SubSede");
    const IdRol = searchParams.get("IdRol");
    const IdUser = searchParams.get("IdUser");
    const Doc = searchParams.get("Doc");

    const Pruebas = await fetch(
      `/api/Estudiantes/GetPruebasReporte?SubSede=${SubSede}&IdRol=${IdRol}&IdUser=${IdUser}&Doc=${Doc}`
    ).then((res) => res.json());

    setData({
      Prueba: Pruebas?.pruebas || [],
    });
    setIsLoading(false);
  };
  useEffect(() => {
    GetData();
  }, []);

  useEffect(() => {
    if (Values?.IdPrueba) {
      const GetInfoPdf = async () => {
        const SubSede = searchParams.get("SubSede");
        const IdRol = searchParams.get("IdRol");
        const IdUser = searchParams.get("IdUser");
        const Doc = searchParams.get("Doc");

        const Info = await fetch(
          `/api/Estudiantes/ReportesPdf/InfoEstuPrueba?SubSede=${SubSede}&IdRol=${IdRol}&IdUser=${IdUser}&Doc=${Doc}&IdPrueba=${Values.IdPrueba}`
        ).then((res) => res.json());

        setInfoPdf({
          ...Info,
        });

        console.log(Info);
      };
      GetInfoPdf();
    }
  }, [Values.IdPrueba]);

  return (
    <>
      <div className="md:w-[60%] lg:w-[40%] flex flex-col justify-center items-center bg-[#0c1790] mt-4 text-center p-3 rounded-lg gap-2 mx-4 md:mx-auto">
        <h1 className="text-white lg:text-2xl font-medium">
          Seleccione Prueba para ver el reporte
        </h1>
        <FaArrowCircleDown className="text-white text-2xl animate-bounce" />
      </div>

      <div className="flex flex-col mt-10 sm:justify-center items-center p-8">
        {IsLoading ? (
          <Loading />
        ) : (
          <div className="relative md:w-[60%] lg:w-[40%]">
            <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6" />
            <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6" />
            <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md border-2 border-gray-400">
              <form>
                <div className="mb-3">
                  <label className="mb-2 block lg:text-base font-medium text-gray-800">
                    Seleccione una Prueba{" "}
                    <span className="text-red-900">(*)</span>
                  </label>
                  <ReactSelect
                    className="dark:text-black"
                    options={Data?.Prueba}
                    // getOptionLabel={(item: any) =>
                    //   `${item.NombrePrograma} Prueba (# ${item.IdPrueba})`
                    // }
                    getOptionLabel={(item: any) =>
                      `Saber Pro (# ${item.IdPrueba})`
                    }
                    placeholder="Seleccione una Opción"
                    onChange={(e: any) => {
                      setValues({
                        ...Values,
                        IdPrueba: e?.IdPrueba,
                      });
                    }}
                  />
                </div>

                {Object.keys(InfoPdf).length > 0 && (
                  <>
                    {" "}
                    <BlobProvider document={<MyDocument InfoPdf={InfoPdf} />}>
                      {({ blob, url, loading, error }: any) =>
                        loading ? (
                          "Loading document..."
                        ) : (
                          <a
                            className=" bg-blue-500 px-10 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                            href={url}
                            target="_blank"
                          >
                            Ver Reporte
                          </a>
                        )
                      }
                    </BlobProvider>
                  </>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BodyComponent;
