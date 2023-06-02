"use client";
import Loading from "@/app/loading";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  Programa,
  Revisiones,
  SemestreAcademico,
  VisibilidadModal,
} from "../../../typings";
import ItemCOA from "../../ItemCOA";
import Title from "../../Title";
import ModalAdd from "./ModalAdd";
import { Preguntas } from "./viewPreguntas";

type Props = {
  Programas?: Programa[];
  Pruebas?: [];
  urlInfo?: {
    IdUser?: number;
    IdRol?: number;
  };
};

type Competencias = {
  E: [];
  G: [];
};
type addPregunta = {
  id: number;
  competencia: string;
  IdClick: number;
  DemasInfo: {};
};
const BodyComponent = () => {
  const searchParams = useSearchParams();

  const [Pruebas, setPruebas] = useState([] as []);
  const [Data, setData] = React.useState({
    Programas: null,
    IdSede: "",
  } as {
    semestres?: SemestreAcademico[];
    Pruebas?: [];
    Programas?: any;
    IdSede?: any;
  });
  const [Values, setValues] = React.useState({
    IdSubSede: "",
    IdUser: "",
    IdRol: "",
  } as {
    IdSubSede?: string;
    Programa?: number;
    TipoPrueba?: string | undefined;
    Semestre?: SemestreAcademico;
    PruebasId?: number;
    IdUser?: string;
    IdRol?: string;
  });
  const [actualizador, setActualiza] = useState({} as Revisiones);
  const [Competencias, setCompetencias] = React.useState({} as Competencias);
  const [dataEnvia, setDataEnvia] = useState({} as addPregunta);
  const [ShowModal, setShowModal] = React.useState({
    AddVisible: false,
    EditVisible: false,
  } as VisibilidadModal);
  const [isPending, setIsPending] = useState(false as boolean);

  const fetchData = async () => {
    const result = await axios.post(
      `/api/Pruebas/GetSemestrePrograma?SubSede=${Values.IdSubSede}`,
      {
        Values,
      }
    );
    setData({ ...Data, semestres: result.data?.semestres });
  };

  const fetchPrueba = async () => {
    const result = await axios.post(
      `/api/Pruebas/GetPruebas?SubSede=${Values.IdSubSede}`,
      {
        Values,
      }
    );

    setData({
      ...Data,
      Pruebas: result?.data?.pruebas,
    });
  };
  const GetProgramas = async (subSede: any) => {
    const ProgramasRes = await axios(
      `/api/Configuracion/Programas/GetProgramas?SubSede=${subSede}`
    );

    setData({ ...Data, Programas: ProgramasRes?.data?.programas });
  };
  const fetchCompetencias = async () => {
    const result = await axios.post("/api/Pruebas/GetCompetencias", {
      Values,
    });

    console.log("result?.data?.competencias", result?.data?.competencias);

    setCompetencias(result?.data?.competencias);
  };
  useEffect(() => {
    if (Values.PruebasId) {
      fetchCompetencias();
    }
  }, [Values?.PruebasId, actualizador?.Contador]);

  const getData = async () => {
    try {
      setIsPending(true);
      const SubSede = searchParams.get("SubSede");
      const IdRol = searchParams.get("IdRol");
      const IdUser = searchParams.get("IdUser");
      const IdPrueba = searchParams.get("IdPrueba");

      const data: any = await fetch(
        `/api/Pruebas/GetPruebasUser?SubSede=${SubSede}&IdRol=${IdRol}&IdUser=${IdUser}&IdPrueba=${
          IdPrueba || ""
        }`
      ).then((res) => res.json());
      setPruebas(data?.pruebas || []);
      setIsPending(false);
    } catch (error) {
      console.log(error);
      alert("Error al cargar los datos");
    }
  };

  useEffect(() => {
    setValues({
      ...Values,
      IdSubSede: searchParams.get("SubSede") || "",
      IdUser: searchParams.get("IdUser") || "",
      IdRol: searchParams.get("IdRol") || "",
    });
    setData({
      ...Data,
      IdSede: searchParams.get("SubSede") || "",
    });
    getData();
  }, []);
  return (
    <>
      {ShowModal?.EditVisible && (
        <Preguntas
          competencia={dataEnvia?.competencia}
          prueba={dataEnvia?.id}
          setShowModal={setShowModal}
        />
      )}
      {ShowModal?.AddVisible && (
        <ModalAdd
          setContador={setActualiza}
          setShowModal={setShowModal}
          data={dataEnvia}
          Prueba={Values?.PruebasId}
          Semestre={Values.Semestre}
          DemasInfo={dataEnvia?.DemasInfo}
        />
      )}
      <Title title="Ingreso de Preguntas" />
      {isPending ? (
        <Loading />
      ) : (
        <div className="flex mt-10 flex-col sm:justify-center items-center  ">
          <div className="relative sm:max-w-lg w-full">
            <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6" />
            <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6" />
            <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md border-2 border-gray-400">
              <form>
                <div className="mb-2">
                  {Data?.IdSede == "0" && (
                    <>
                      <ItemCOA
                        setValues={setValues}
                        Values={Values}
                        getDataModal={GetProgramas}
                      />
                    </>
                  )}
                </div>

                <div className="mb-2">
                  <label className="mb-3 block text-base font-medium text-gray-800">
                    Seleccione una prueba:
                  </label>
                  <Select
                    className="dark:text-black"
                    isDisabled={!Pruebas?.length}
                    options={Pruebas}
                    placeholder="Seleccione una opción"
                    getOptionLabel={(item) =>
                      `${item.NombrePrograma} (Prueba #  ${item?.PruebasId})`
                    }
                    getOptionValue={(item: any) => item?.PruebasId}
                    onChange={(e) => {
                      setValues({
                        ...Values,
                        ...e,
                      });
                    }}
                    // noOptionsMessage={() => "No hay pruebas disponibles"}
                  />
                </div>
              </form>
            </div>
          </div>
          {Competencias?.G?.length > 0 && (
            <div>
              <h1 className=" p-4 mt-10  bg-[#070e54] text-white text-center text-2xl font-bold rounded-lg">
                Competencias Generales
              </h1>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full p-4">
                {Competencias && Object.keys(Competencias)?.length ? (
                  <>
                    {Competencias?.G?.map((item: any) => {
                      return (
                        <div
                          key={item?.Id}
                          className="bg-[#070e54] py-2 rounded-md "
                        >
                          <div className="flex flex-col flex-wrap justify-between items-center">
                            <h2 className="flex  text-base md:text-2xl  px-2  text-white">
                              {item?.Nombre}
                            </h2>
                            <h2 className="text-base md:text-2xl  px-4 py-2 lg:px-8 text-white ">
                              {item?.cantidad} Preguntas Ingresadas
                            </h2>
                            <div className="flex justify-center items-center">
                              <svg
                                onClick={() => {
                                  console.log("item--", item);

                                  setDataEnvia({
                                    ...dataEnvia,
                                    competencia: item?.Nombre,
                                    id: item?.Id,
                                    DemasInfo: item,
                                  });
                                  setShowModal({
                                    AddVisible: true,
                                  });
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="cursor-pointer w-9 h-9 md:w-20 md:h-16 text-white hover:scale-110"
                              >
                                <title>Añadir Preguntas</title>
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <svg
                                onClick={() => {
                                  console.log("item", item);

                                  setDataEnvia({
                                    ...dataEnvia,
                                    competencia: item?.idCompetencia,
                                    id: Values?.PruebasId || 0,
                                    IdClick: item?.Id,
                                    DemasInfo: item,
                                  });
                                  setShowModal({
                                    EditVisible: true,
                                  });
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="cursor-pointer w-9 h-9 md:w-20 md:h-16 text-white hover:scale-110"
                              >
                                <title>Ver Preguntas</title>
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          )}

          {Competencias?.E?.length > 0 && (
            <div>
              <h1 className=" p-4 bg-[#070e54] text-white text-center text-2xl font-bold rounded-lg">
                Competencias Especificas
              </h1>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full p-4">
                {Competencias && Object.keys(Competencias)?.length ? (
                  <>
                    {Competencias?.E?.map((item: any) => {
                      return (
                        <div
                          key={item.Id}
                          className="bg-[#070e54] py-2 rounded-md "
                        >
                          <div className="flex text-center flex-col flex-wrap justify-between items-center">
                            <h2 className="flex  text-base md:text-2xl  px-2  text-white">
                              {item?.Nombre}
                            </h2>
                            <h2 className="text-base md:text-2xl  px-4 py-2 lg:px-8 text-white ">
                              {item?.cantidad} Preguntas Ingresadas
                            </h2>
                            <div className="flex justify-center items-center">
                              <svg
                                onClick={() => {
                                  setDataEnvia({
                                    ...dataEnvia,
                                    competencia: item.Nombre,
                                    id: item.Id,
                                    DemasInfo: item,
                                  });
                                  setShowModal({
                                    AddVisible: true,
                                  });
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="cursor-pointer w-9 h-9 md:w-20 md:h-16 text-white hover:scale-110"
                              >
                                <title>Añadir Preguntas</title>
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <svg
                                onClick={() => {
                                  setDataEnvia({
                                    ...dataEnvia,
                                    competencia: item.idCompetencia,
                                    id: Values?.PruebasId || 0,
                                  });
                                  setShowModal({
                                    EditVisible: true,
                                  });
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="cursor-pointer w-9 h-9 md:w-20 md:h-16 text-white hover:scale-110"
                              >
                                <title>Ver Preguntas</title>
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BodyComponent;
