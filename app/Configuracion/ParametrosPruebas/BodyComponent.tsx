"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Programa, Pruebas } from "../../../typings";
import axios from "axios";
import ModalAdd from "./ModalAdd";
import TablePrueba from "./TablePrueba";
import ItemCOA from "../../ItemCOA";
import { useSearchParams } from "next/navigation";
import Loading from "@/app/loading";

type Props = {
  data: Programa[];
};
type ShowModalType = {
  Visible: boolean;
  TypeTest: string;
  Programa: number | null;
  SemestreAcademico: string;
  MaxSemestre?: string;
  Periodicidad: String;
  StartStudents?: string;
};

const BodyComponent = () => {
  const [Values, setValues] = useState({
    IdSubSede: localStorage.getItem("IdSubSede") || "",
  } as any);
  const searchParams = useSearchParams();
  const [isPending, setIsPending] = useState(false as boolean);

  const [Pruebas, setPruebas] = useState([] as Pruebas[]);
  const [ShowModal, setShowModal] = useState<ShowModalType>({
    Visible: false,
    TypeTest: "",
    Programa: null,
    SemestreAcademico: "",
    Periodicidad: "",
  });

  const [Clear, setClear] = useState({
    Semestre: false,
    Periodicidad: false,
  });

  const [Data, setData] = useState({
    IdSubSede: localStorage.getItem("IdSubSede") || 0,
    Programas: [] as Programa[],
  } as any);

  const [PeriodicidadItem, setPeriodicidadItem] = useState([]);

  const TipoPrueba = [
    { value: "SP", label: "Saber Pro" },
    { value: "SS", label: "SESA" },
  ];

  const getData = async (
    programa: number,
    SemestreAcademico: number,
    tipo: string,
    SemestreLectivo: number
  ) => {
    try {
      const response = await axios.post(
        `/api/Configuracion/ParametrosPruebas/GetPruebas?SubSede=${Values.IdSubSede}`,
        {
          programa,
          SemestreAcademico,
          tipo,
          SemestreLectivo,
        }
      );

      setPruebas(response?.data?.pruebas);
    } catch (error) {
      console.log(error);
      alert("Error al obtener los datos");
    }
  };
  useEffect(() => {
    if (Values.Programa && Values.TipoPrueba) {
      getData(
        Values.Programa,
        Values.SemestreAcademico,
        Values.TipoPrueba,
        Values?.SemestreLectivo
      );
    }
  }, [
    Values.Programa,
    Values.SemestreAcademico,
    Values.TipoPrueba,
    Values?.SemestreLectivo,
  ]);

  const GetProgramas = async (subSede: any) => {
    const ProgramasRes = await axios(
      `/api/Configuracion/Programas/GetProgramas?SubSede=${subSede}`
    );

    setData({ ...Data, Programas: ProgramasRes?.data?.programas });
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
    if (Values?.Programa) {
      GetSemestres(Values?.Programa);
    }
  }, [Values?.Programa, Values?.Periodicidad]);

  // useEffect(() => {
  //   if (Values?.Programa && Values?.SemestreAcademico) {
  //     GetPeriodicidad(Values?.Periodicidad);
  //   }
  // }, [Values?.Programa, Values?.SemestreAcademico]);

  useEffect(() => {
    const getData = async () => {
      setIsPending(true);

      const SubSede = searchParams.get("SubSede");

      const info = await fetch(
        `/api/Configuracion/GradosGrupos/GetInfoModal?SubSede=${SubSede}`
      ).then((res) => res?.json());

      setData({
        ...Data,
        Programas: info?.programa || [],
      });
      setIsPending(false);
    };

    try {
      getData();
    } catch (error) {
      console.log(error);
      alert("Error al obtener los datos");
    }
  }, []);

  return (
    <>
      {ShowModal?.Visible && (
        <ModalAdd
          ShowModal={ShowModal}
          setShowModal={setShowModal}
          ValuesInfo={Values}
          setPruebas={setPruebas}
          getData={getData}
        />
      )}
      {isPending ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <div className="flex mt-10 flex-col sm:justify-center items-center">
            <div className="relative sm:max-w-sm w-full">
              <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6" />
              <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6" />
              <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md border-2 border-gray-400">
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
                    <label className="mb-3 block text-base font-medium text-gray-800">
                      Seleccione el Programa{" "}
                      <span className="text-red-900">(*)</span>
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
                      Semestre académico
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
                      isClearable={Clear?.Semestre}
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
                            isClearable={Clear?.Periodicidad}
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
                                  SemestreLectivo: item.END,
                                  StartStudent: item.StartStudent,
                                });
                              }}
                              getOptionLabel={(item: any) => item.Nombre}
                              getOptionValue={(item: any) =>
                                item.IdPeriodicidad
                              }
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
                  {Values?.Programa &&
                    Values.SemestreAcademico &&
                    Values?.TipoPrueba && (
                      <div className="mt-7">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setShowModal({
                              Visible: true,
                              TypeTest: Values?.TipoPrueba,
                              Programa: Values?.Programa,
                              SemestreAcademico: Values?.SemestreAcademico,
                              Periodicidad: Values?.Periodicidad,
                              MaxSemestre: Values?.SemestreLectivo,
                              StartStudents: Values?.StartStudent,
                            });
                          }}
                          className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                        >
                          Crear Prueba
                        </button>
                      </div>
                    )}
                </form>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <TablePrueba
              info={Pruebas}
              setPruebas={setPruebas}
              Values={Values}
            />
          </div>
        </>
      )}
    </>
  );
};

export default BodyComponent;
