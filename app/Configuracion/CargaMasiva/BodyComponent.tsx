"use client";
import React, { useEffect, useTransition } from "react";
import TitleButton from "../TitleButton";
import * as XLSX from "xlsx";
import axios from "axios";
import { Estudiante } from "../../../typings";
import TableStudiantes from "./TableStudiantes";
import Title from "../../Title";
import Loading from "./loading";
import TablaIncorrectos from "./TablaIncorrectos";
import { useSearchParams } from "next/navigation";

const BodyComponent = () => {
  const [data, setData] = React.useState([] as Estudiante[]);
  const [Estudiantes, setEstudiantes] = React.useState([] as Estudiante[]);

  const [NameFile, setNameFile] = React.useState("");
  const [Cargando, setCargando] = React.useState(false);

  const [DatosIncorrectos, setDatosIncorrectos] = React.useState([] as any);

  const [Data2, setData2] = React.useState({
    IdSubSede: localStorage.getItem("IdSubSede") || "",
  } as any);
  const searchParams = useSearchParams();
  const [isPending, setIsPending] = React.useState(false as boolean);

  const handleFile = (e: any) => {
    try {
      const file = e?.target?.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e?.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const first_sheet_name = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[first_sheet_name];
        const estudiantes = XLSX.utils.sheet_to_json(worksheet, { raw: true });

        setEstudiantes(estudiantes as []);
        console.log(estudiantes);

        alert(`${file.name} Puede ser subido`);
      };
      reader.readAsBinaryString(file);
      setNameFile(file.name);
    } catch (error) {
      console.error(error);
      setEstudiantes([]);
    }
  };

  const getData = async () => {
    try {
      setIsPending(true);
      const SubSede = searchParams.get("SubSede");

      const res: any = await fetch(
        `/api/Configuracion/CargaMasiva/GetStudents?SubSede=${SubSede}`
      ).then((res) => res.json());
      setData(res?.estudiantes || []);
      setIsPending(false);
    } catch (error) {
      console.log(error);
      alert("Error al cargar los datos");
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {data?.length > 0 ? (
        <>
          <Title title="Carga Masiva Estudiantes" />

          <TableStudiantes info={data} />
        </>
      ) : (
        <>
          <TitleButton title="Carga Masiva estudiantes">
            <button
              disabled={Estudiantes.length === 0}
              onClick={async (e) => {
                e.preventDefault();

                // peticion de tipo post
                try {
                  setCargando(true);

                  const chunkSize = 5000;
                  const result = Estudiantes.reduce(
                    (acc: any, _, i: number) => {
                      const chunkIndex: any = Math.floor(i / chunkSize);

                      if (!acc[chunkIndex]) {
                        acc[chunkIndex] = [];
                      }
                      acc[chunkIndex].push(Estudiantes[i]);
                      return acc;
                    },
                    []
                  );

                  // if (result.length > 1) {
                  //   alert(
                  //     "No se puede subir mas de 100000 estudiantes a la vez"
                  //   );
                  //   return;
                  //   }

                  for (const iterator of result) {
                    const res = await axios.post(
                      `/api/Configuracion/CargaMasiva/AddEstudiantes?SubSede=${Data2?.IdSubSede}`,
                      {
                        Estudiantes: iterator,
                      }
                    );

                    if (res?.data?.DatosIncorrectos?.length > 0) {
                      fetch(
                        `/api/Configuracion/CargaMasiva/DeleteEstudianes?SubSede=${Data2?.IdSubSede}`,
                        {
                          method: "DELETE",
                        }
                      ).then((res) => {});
                      setDatosIncorrectos(res?.data?.DatosIncorrectos || []);
                      alert(res?.data?.body || "Error al subir estudiantes");
                      return;
                    }

                    alert("Se subieron los estudiantes correctamente");
                  }

                  // console.log(result);

                  setCargando(false);
                } catch (error) {
                  console.error(error);
                }
              }}
              autoFocus
              className="ml-2 border-2 border-[#4448A2] p-2 text-white hover:text-white hover:bg-[#4448A2] rounded-lg flex disabled:opacity-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <span>Subir Estudiantes</span>
            </button>
          </TitleButton>

          {isPending ? (
            <Loading />
          ) : (
            <>
              {Estudiantes?.length > 0 ? (
                <>
                  {Cargando && <Loading />}

                  {DatosIncorrectos?.length > 0 ? (
                    <TablaIncorrectos info={DatosIncorrectos} />
                  ) : (
                    <TableStudiantes info={Estudiantes} />
                  )}
                </>
              ) : (
                <>
                  <div>
                    <div className=" max-w-2xl mx-auto ">
                      <div className="p-4  max-w-[380px] m-auto  rounded-lg ">
                        <div className=" bg-blue-100  border-4 border-dashed border-blue-600 rounded-lg hover:bg-blue-200">
                          <label htmlFor="dropzone" className="w-full -full">
                            {/* svg */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="text-blue-500 w-24 mx-auto mb-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>

                            <div className="flex flex-col w-auto mx-auto text-center  pb-4">
                              <label className="">
                                <input
                                  className="text-sm cursor-pointer w-36  "
                                  type="file"
                                  id="dropzone"
                                  hidden
                                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                  onChange={handleFile}
                                />
                                <div className="bg-blue-900 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-blue-500">
                                  {NameFile
                                    ? `${NameFile}`
                                    : " Click para precargar el archivo"}
                                </div>
                              </label>
                              {/* <div className="text-blue-900 uppercase">
                  SOLTAR ARCHIVOS AQUÍ
                </div> */}
                            </div>
                          </label>
                        </div>
                      </div>
                      {/* <div className="text-center">
          <button className="p-4 bg-green-500 rounded-md" onClick={click}>
            enviar
          </button>
        </div> */}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default BodyComponent;
