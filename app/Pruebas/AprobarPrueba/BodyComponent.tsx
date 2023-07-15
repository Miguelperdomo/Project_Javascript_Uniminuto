"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Programa, Pruebas } from "../../../typings";
import ItemCOA from "../../ItemCOA";
import ModalSeeQuestion from "./ModalSeeQuestion";
import Table from "./Table";

const BodyComponent = () => {
  const [Values, setValues] = useState({
    IdSubSede: localStorage.getItem("IdSubSede") || "",
  } as any);
  const [Pruebas, setPruebas] = useState([] as Pruebas[]);

  const [Preguntas, setPreguntas] = useState([] as []);
  const [Retroalimentacion, setRetro] = useState([] as []);
  const [Data, setData] = useState({
    IdSubSede: localStorage.getItem("IdSubSede") || 0,
    Programas: [],
    SemestreAcademico: [],
  } as {
    semestres: { Nombre: number; Id: string }[];
    Programas: Programa[] | [];
    IdSubSede: string;
    SemestreAcademico: [];
  });

  const [SeeQuestion, setSeeQuestion] = useState({
    Show: false,
    Pregunta: {},
    Retro: {},
  });

  const [PeriodicidadItem, setPeriodicidadItem] = useState([]);
  const TipoPrueba = [
    { value: "SP", label: "Saber Pro" },
    { value: "SS", label: "SESA" },
  ];

  const searchParams = useSearchParams();
  const [isPending, setIsPending] = useState(false as boolean);

  // console.log("values", Values);

  const GetPrueba = async (
    programa: number,
    SemestreAcademico: number,
    tipo: string
  ) => {
    try {
      const response = await axios.post(
        `/api/Configuracion/ParametrosPruebas/GetPruebas?SubSede=${Values.IdSubSede}`,
        {
          programa,
          SemestreAcademico,
          tipo,
        }
      );

      setPruebas(response?.data?.pruebas);
    } catch (error) {
      console.log(error);
      alert("Error al obtener los datos");
    }
  };

  const GetPreguntas = async () => {
    try {
      const response = await axios.post("/api/Pruebas/GetPreguntasAprobacion", {
        Values,
      });
      console.log("response", response);
      setRetro(response?.data?.retroalimentacion);
      setPreguntas(response?.data?.preguntas);
    } catch (error) {
      console.error(error);
      alert("Error al obtener las preguntas");
    }
  };

  const GetSemestres = async (IdPrograma: number) => {
    try {
      const Semestre = await axios(
        `/api/Configuracion/GradosGrupos/GetSemestrePrograma`,
        {
          params: {
            IdPrograma: IdPrograma,
            IdSubSede: Data?.IdSubSede,
          },
        }
      );

      // setClear({
      //   Semestre: true,
      //   Periodicidad: true,
      // });

      setValues({
        ...Values,
        SemestreAcademico: "",
        SemestreLectivo: "",
        StartStudent: "",
      });
      setData({
        ...Data,
        SemestreAcademico: Semestre?.data?.semestres,
      });
    } catch (error) {
      console.log(error);
      alert("Error al cargar los semestres");
    }
  };

  const GetPeriodicidad = async (Periodicidad: string) => {
    try {
      const PeriodicidadRes = await fetch(
        `/api/Configuracion/ParametrosPruebas/GetPeriodicidadProgramaSemestre?Periodicidad=${Periodicidad}&Programa=${Values?.Programa}&Semestre=${Values?.SemestreAcademico}&IdSubSede=${Values.IdSubSede}`
      ).then((res) => res?.json());

      setPeriodicidadItem(PeriodicidadRes?.semestreLectivo);
    } catch (error) {
      console.log(error);
      alert("Error al cargar la información");
    }
  };

  useEffect(() => {
    if (Values?.Programa && Values?.SemestreAcademico) {
      GetPeriodicidad(Values?.Periodicidad);
    }
  }, [Values?.Programa, Values?.SemestreAcademico]);

  const GetProgramas = async (subSede: any) => {
    console.log(subSede);

    const ProgramasRes = await axios(
      `/api/Configuracion/Programas/GetProgramas?SubSede=${subSede}`
    );

    setData({ ...Data, Programas: ProgramasRes?.data?.programas });
  };

  useEffect(() => {
    if (Values?.Programa) {
      GetSemestres(Values?.Programa);
    }
  }, [Values?.Programa, Values?.Periodicidad]);
  useEffect(() => {
    if (Values?.Programa && Values?.SemestreAcademico && Values?.TipoPrueba) {
      GetPrueba(Values.Programa, Values.SemestreAcademico, Values.TipoPrueba);
    }
  }, [Values.Programa, Values.SemestreAcademico, Values.TipoPrueba, ,]);

  useEffect(() => {
    if (Values?.IdPrueba) {
      console.log("id prueba", Values?.IdPrueba);

      GetPreguntas();
    }
  }, [Values?.IdPrueba]);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsPending(true);
        const SubSede = searchParams.get("SubSede");

        const data: any = await fetch(
          `/api/Configuracion/GradosGrupos/GetInfoModal?SubSede=${SubSede}`
        ).then((res) => res.json());
        setData({
          ...Data,
          Programas: data?.programa || [],
        });
        setIsPending(false);
      } catch (error) {
        console.log(error);
        alert("Error al cargar los datos");
      }
    };
    getData();
  }, []);
  return (
    <>
      {SeeQuestion.Show && (
        <ModalSeeQuestion
          SeeQuestion={SeeQuestion}
          setSeeQuestion={setSeeQuestion}
          GetPreguntas={GetPreguntas}
        />
      )}
      <div className="flex mt-10 flex-col sm:justify-center items-center">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6" />
          <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6" />
          <div className="border-2 border-gray-400 relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
            <form>
              {Data?.IdSubSede == "0" && (
                <>
                  <ItemCOA
                    setValues={setValues}
                    Values={Values}
                    getDataModal={GetProgramas}
                  />
                </>
              )}
              <div className="mb-2">
                <label
                  htmlFor="Nombre"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Seleccione el Programa:
                </label>
                <Select
                  className="dark:text-black"
                  options={Data.Programas}
                  getOptionLabel={(item: any) => item.Nombre}
                  getOptionValue={(item) => item.Id}
                  onChange={(item) => {
                    setValues({
                      ...Values,
                      Programa: item?.Id,
                      Periodicidad: item?.Periodisidad,
                    });
                  }}
                  placeholder="Seleccione una Opción"
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="Nombre"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Seleccione un Semestre{" "}
                  <span className="text-red-900">(*)</span>
                </label>

                <Select
                  className="dark:text-black"
                  options={Data?.SemestreAcademico}
                  getOptionLabel={(item: any) => item.NombreSemestre}
                  getOptionValue={(item) => item.SemestreId}
                  onChange={(item) => {
                    setValues({
                      ...Values,
                      SemestreAcademico: item?.SemestreId,
                    });
                  }}
                  placeholder="Seleccione una Opción"
                />
              </div>
              {/* <div className="mb-2">
                {(Values?.Periodicidad == "C" && (
                  <>
                    <label
                      htmlFor="SemestreYear"
                      className="mb-3 block text-base font-medium text-gray-800"
                    >
                      ¿En qué cuatrimestre se encuentra?{" "}
                      <span className="text-red-900">(*)</span>
                    </label>
                    <>
                      <Select
                        options={PeriodicidadItem || []}
                        placeholder="Seleccione un periodo"
                        onChange={(item: any) => {
                          // setClear({
                          //   ...Clear,
                          //   Periodicidad: false,
                          // });
                          setValues({
                            ...Values,
                            SemestreLectivo: item.END,
                            StartStudent: item.StartStudent,
                          });
                        }}
                        getOptionLabel={(item: any) => item.Nombre}
                        getOptionValue={(item: any) => item.IdPeriodicidad}
                      />
                    </>
                  </>
                )) ||
                  (Values?.Periodicidad == "S" && (
                    <>
                      <label
                        htmlFor="SemestreYear"
                        className="mb-3 block text-base font-medium text-gray-800"
                      >
                        ¿En qué semestre se encuentra?{" "}
                        <span className="text-red-900">(*)</span>
                      </label>

                      <>
                        <Select
                          options={PeriodicidadItem || []}
                          placeholder="Seleccione un periodo"
                          onChange={(item: any) => {
                            setValues({
                              ...Values,
                              SemestreLectivo: item?.END,
                              StartStudent: item?.StartStudent,
                            });
                          }}
                          getOptionLabel={(item: any) => item?.Nombre}
                          getOptionValue={(item: any) => item?.IdPeriodicidad}
                        />
                      </>
                    </>
                  ))}
              </div> */}
              <div className="mb-2">
                <label
                  htmlFor="Nombre"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Seleccione el Tipo de Prueba{" "}
                  <span className="text-red-900">(*)</span>
                </label>
                <Select
                  className="dark:text-black"
                  options={TipoPrueba}
                  onChange={(item) => {
                    setValues({ ...Values, TipoPrueba: item?.value });
                  }}
                  placeholder="Seleccione una Opción"
                />
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
                    `${item.NombrePrograma} # - ${item?.IdPrueba}`
                  }
                  getOptionValue={(item: any) => item?.IdPrueba}
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
      </div>
      <div className="mt-10">
        {Preguntas?.length > 0 ? (
          <Table
            retro={Retroalimentacion}
            info={Preguntas}
            setPruebas={setPruebas}
            Values={Values}
            setSeeQuestion={setSeeQuestion}
          />
        ) : (
          <p className="text-center text-gray-800 text-lg font-medium">
            No hay preguntas
          </p>
        )}
      </div>
    </>
  );
};

export default BodyComponent;
