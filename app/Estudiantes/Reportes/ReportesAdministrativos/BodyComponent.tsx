"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ReactSelect from "react-select";
import Loading from "@/app/loading";

function BodyComponent() {
  let semestre = [
    {
      value: 1,
      label: "semestral",
    },
  ];

  let competencia = [
    {
      value: 1,
      label: "RAZONAMIENTO CUANTITATIVO",
    },
  ];

  let estudiante = [
    {
      value: 1,
      label: "john",
    },
  ];

  const searchParams = useSearchParams();

  const [Data, setData] = useState({} as any);
  const [IsLoading, setIsLoading] = useState(false as boolean);

  console.log(Data, "data============");

  const GetData = async () => {
    setIsLoading(true);
    const SubSede = searchParams.get("SubSede");
    const IdRol = searchParams.get("IdRol");
    const IdUser = searchParams.get("IdUser");
    const Doc = searchParams.get("Doc");

    const Pruebas = await fetch(
      `/api/Estudiantes/GetPruebasEstudiante?SubSede=${SubSede}&IdRol=${IdRol}&IdUser=${IdUser}&Doc=${Doc}`
    ).then((res) => res.json());

    // console.log("Pruebas", Pruebas);

    setData({
      Prueba: Pruebas?.pruebas || [],
    });
    setIsLoading(false);
  };
  useEffect(() => {
    GetData();
  }, []);

  return (
    <>
      <div className="flex flex-col mt-10 sm:justify-center items-center p-8 mx-4">
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
                    Seleccione un programa{" "}
                    <span className="text-red-900">(*)</span>
                  </label>
                  <ReactSelect
                    className="dark:text-black"
                    options={Data?.Prueba}
                    getOptionLabel={(item: any) =>
                      `${item.NombrePrograma} Prueba (# ${item.IdPrueba})`
                    }
                    placeholder="Seleccione una Opción"
                  />
                </div>
                <div className="mb-3">
                  <label className="mb-2 block lg:text-base font-medium text-gray-800">
                    Seleccione un Semestre y Grupo{" "}
                    <span className="text-red-900">(*)</span>
                  </label>
                  <ReactSelect
                    className="dark:text-black"
                    options={semestre}
                    placeholder="Seleccione una Opción"
                  />
                </div>
                <div className="mb-3">
                  <label className="mb-2 block lg:text-base font-medium text-gray-800">
                    Seleccione una Competencia{" "}
                    <span className="text-red-900">(*)</span>
                  </label>
                  <ReactSelect
                    className="dark:text-black"
                    options={competencia}
                    placeholder="Seleccione una Opción"
                  />
                </div>
                <div className="mb-3">
                  <label className="mb-2 block lg:text-base font-medium text-gray-800">
                    Seleccione un Estudiante{" "}
                    <span className="text-red-900">(*)</span>
                  </label>
                  <ReactSelect
                    className="dark:text-black"
                    options={estudiante}
                    placeholder="Seleccione una Opción"
                  />
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    alert("En Proceso");
                  }}
                  title="Ver Reporte"
                  className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                >
                  Ver Reporte
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* select primero */}
      {/* <div className="flex flex-col justify-center">
        <div className="w-[50%] mx-auto bg-[#e7f1fe] rounded-b-xl border-2 border-[#a0b5d0] flex flex-col items-center justify-center gap-3 p-4">
          <CompSelect
            title="Grado y Grupo: "
            select={""}
            placeholder="Seleccione un Grupo"
          />
          <CompSelect
            title="Estudiante: "
            select={""}
            placeholder="Seleccione un Estudiante"
          />
          <CompSelect
            title="Semestre: "
            select={""}
            placeholder="Seleccione un Semestre"
          />
          <CompSelect
            title="Prueba: "
            select={""}
            placeholder="Seleccione una Prueba"
          />
          <button className="border-2 border-[#0c1790] p-2 text-[#0c1790] hover:bg-[#0c1790] rounded-lg hover:text-white hover:rounded-full hover:scale-105 transition duration-300 ease-in-out transform">
            Ver Reporte
          </button>
        </div>
      </div> */}
    </>
  );
}

export default BodyComponent;
