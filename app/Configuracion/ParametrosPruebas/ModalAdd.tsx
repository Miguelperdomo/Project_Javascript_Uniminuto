"use client";
import { useEffect, useState } from "react";
import { Competencia, Docente } from "../../../typings";
import Docentes from "./Docentes";
import Estudiantes from "./Estudiantes";
import Aprobacion from "./Aprobacion";
import CompetenciasGenericas from "./CompetenciasGenericas";
import { useSearchParams } from "next/navigation";
import CompetenciasEspecificas from "./CompetenciasEspecificas";

type ShowModalType = {
  Visible: boolean;
  TypeTest: string;
  Programa?: number | null;
  SemestreAcademico?: string;
  MaxSemestre?: any;
  StartStudents?: any;
  Periodicidad?: String;
};
type Props = {
  // type props useState
  setShowModal: React.Dispatch<React.SetStateAction<any>>;
  ShowModal: ShowModalType;
  ValuesInfo: {
    Programa: number | null;
    TipoPrueba: string | "";
    IdSubSede: any;
  };
  setPruebas: React.Dispatch<React.SetStateAction<any>>;
  getData: Function;
};

type ValuesType = {
  SemestreAcademico?: string;
  IdSubSede?: string;
  InicioPrueba?: Date | string;
  FinPrueba?: Date | string;
  TipoPrueba?: string;
  Programa: number | null;
  SemestreId?: number;
  MaxSemestre?: Date;
  MinStrudent: any;
  CompetenciasGenericas:
    | []
    | [
        {
          IdAsignatura: number;
          Abreviatura: string;
          DocenteDocumento: number;
          DocenteId: number;
          NombreAsignatura: string;
          TipoCompetencia: string;
        }
      ];
  CompetenciasEspecificas:
    | []
    | [
        {
          IdAsignatura: number;
          Abreviatura: string;
          DocenteDocumento: number;
          DocenteId: number;
          NombreAsignatura: string;
          TipoCompetencia: string;
        }
      ];
};

const ModalAdd = ({
  setShowModal,
  ShowModal,
  ValuesInfo,
  setPruebas,
  getData,
}: Props) => {
  function lastDayOfMonth(date: Date, fecha: any) {
    return new Date(date.getFullYear(), fecha, 0).getDate();
  }

  let date = new Date();
  let lastDay = lastDayOfMonth(date, ShowModal.MaxSemestre);
  // let StartDayStudent = lastDayOfMonth(date, ShowModal.StartStudents);

  const [Values, setValues] = useState<ValuesType>({
    TipoPrueba: ShowModal?.TypeTest,
    CompetenciasGenericas: [],
    CompetenciasEspecificas: [],
    Programa: ShowModal?.Programa || null,
    IdSubSede: ValuesInfo.IdSubSede || "",
    SemestreAcademico: ShowModal?.SemestreAcademico || "",
    MaxSemestre: new Date(
      `${date.getFullYear()}-${ShowModal.MaxSemestre}-${lastDay}`
    ),

    MinStrudent: new Date(
      `${date.getFullYear()}-${ShowModal.StartStudents}-01`
    ),
  });

  const [SelectCompetenciasEspecificas, setSelectCompetenciasEspecificas] =
    useState([] as Competencia[]);
  const [Data, setData] = useState({
    IdSubSede: localStorage.getItem("IdSubSede") || "",
  } as {
    Especifica: Competencia[];
    General: Competencia[];
    Docentes: Docente[];
    Semestre: [];
    IdSubSede: string;
  });

  const [startDateDocentes, setStartDateDocentes] = useState(new Date());

  const [endDateDocentes, setEndDateDocentes] = useState(new Date());

  const [StartDateAprobacion, setStartDateAprobacion] = useState(new Date());

  const [EndDateAprobacion, setEndDateAprobacion] = useState(new Date());

  const [startDateEstudiantes, setStartDateEstudiantes] = useState(new Date());

  const [endDateEstudiantes, setEndDateEstudiantes] = useState(new Date());

  const [Menu, setMenu] = useState({
    Docentes: true,
    Aprobacion: false,
    Estudiantes: false,
    Genericas: false,
    Especificas: false,
  });

  const [Asignacion, setAsignacion] = useState({
    Show: false,
  } as any);

  const [CompetenciaGenerica, setCompetenciaGenerica] = useState([] as any[]);
  const [CompetenciaEspecifica, setCompetenciaEspecifica] = useState(
    [] as any[]
  );

  const [DocentesDb, setDocentesDb] = useState([] as any[]);
  const searchParams = useSearchParams();

  // const handerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   try {
  //     e.preventDefault();

  //     if (Values?.CompetenciasGenericas?.length < Data?.General?.length) {
  //       alert("Faltan competencias generales por llenar");
  //       return;
  //     }

  //     if (ShowModal?.TypeTest === "SS" && !Values.SemestreId) {
  //       alert("Falta seleccionar el Semestre Lectivo");
  //       return;
  //     }
  //     const sentDataRes = await fetch(
  //       "/api/Configuracion/ParametrosPruebas/AddPruebas",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           Fechas: {
  //             Docentes: {
  //               Inicio: startDateDocentes,
  //               Fin: endDateDocentes,
  //             },
  //             Estudiantes: {
  //               Inicio: startDateEstudiantes,
  //               Fin: endDateEstudiantes,
  //             },
  //           },
  //           Values,
  //         }),
  //       }
  //     ).then((res) => res.json());

  //     const response = await axios.post(
  //       "/api/Configuracion/ParametrosPruebas/GetPruebas",
  //       {
  //         programa: ValuesInfo?.Programa,
  //         tipo: ValuesInfo?.TipoPrueba,
  //       }
  //     );

  //     setPruebas(response?.data?.pruebas || []);

  //     setShowModal((prev: any) => ({ ...prev, Visible: false }));

  //     alert(sentDataRes?.body);
  //   } catch (error) {
  //     console.error(error);
  //     alert("Error al guardar");
  //   }
  // };

  // const hanlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setValues({ ...Values, [e.target.name]: e.target.value.toUpperCase() });
  // };

  // const resetInput = () => {
  //   setSearchInput("");
  // };

  const getCompetencias = async () => {
    try {
      const SubSede = searchParams.get("SubSede");

      const response = await fetch(
        `/api/Configuracion/Competencias/GetCompetencias?SubSede=${SubSede}`
      ).then((res) => res.json());

      const ResDocentes = await fetch(
        `/api/Configuracion/Docentes/GetDocentes?SubSede=${SubSede}`
      ).then((res) => res.json());

      // const Fechas = await fetch(
      //   `/api/Configuracion/ParametrosPruebas/GetFechasProgramaSemestre?SubSede=${ValuesInfo.IdSubSede}&Programa=${Values.Programa}&Semestre=${Values.SemestreAcademico}`
      // ).then((res) => res.json());

      // console.log("Fechas", Fechas);

      const TipoCompetencias = response?.competencia?.reduce(
        (acc: any, el: Competencia) => {
          const key = el?.TipoCompetencia;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(el);
          return acc;
        },
        {}
      );

      setDocentesDb(ResDocentes?.docentes || []);
      setCompetenciaGenerica(TipoCompetencias?.G);
      setCompetenciaEspecifica(TipoCompetencias?.E);
      // setData({
      //   ...Data,
      //   Especifica: TipoCompetencias?.E,
      //   Docentes: ,
      //   // Semestre: ResSemestre?.semestreAcademico,
      // });
    } catch (error) {
      console.log(error);
      alert("Error al cargar las competencias");
    }
  };

  useEffect(() => {
    getCompetencias();
  }, []);

  return (
    <div className="bg-[#000236]/100 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
      <div className="container mx-auto  w-11/12 md:w-2/3 max-w-5xl">
        <div className=" overflow-auto  max-h-screen  py-4 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <section className="text-center text-lg tracking-normal leading-tight mb-4 bg-[#151A8B] w-full text-white p-4 rounded-lg font-bold flex items-center justify-between">
            <h1>Asignación de fechas y Docentes para las Competencias</h1>
            <button
              onClick={() => {
                setShowModal((prev: any) => ({ ...prev, Visible: false }));
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </section>

          <div style={{ borderBottom: "2px solid #151a8b" }}>
            <ul className="flex cursor-pointer justify-center">
              <li
                onClick={() => {
                  setMenu({
                    Docentes: true,
                    Aprobacion: false,
                    Estudiantes: false,
                    Genericas: false,
                    Especificas: false,
                  });
                }}
                className={`py-2 px-6 rounded-t-lg ${
                  Menu.Docentes
                    ? " bg-[#151a8b] text-white"
                    : " bg-[#151a8b]/40 text-white"
                }`}
              >
                Formulación Preguntas
                {/* Docentes */}
              </li>
              <li
                onClick={() => {
                  setMenu({
                    Docentes: false,
                    Aprobacion: true,
                    Estudiantes: false,
                    Genericas: false,
                    Especificas: false,
                  });
                }}
                className={`py-2 px-6 rounded-t-lg ${
                  Menu.Aprobacion
                    ? " bg-[#151a8b] text-white"
                    : " bg-[#151a8b]/40 text-white"
                }`}
              >
                Aprobación Preguntas
              </li>
              <li
                onClick={() => {
                  setMenu({
                    Docentes: false,
                    Aprobacion: false,
                    Estudiantes: true,
                    Genericas: false,
                    Especificas: false,
                  });
                }}
                className={`py-2 px-6 rounded-t-lg ${
                  Menu.Estudiantes
                    ? " bg-[#151a8b] text-white"
                    : " bg-[#151a8b]/40 text-white"
                }`}
              >
                {/* Estudiantes */}
                Presentación Prueba Estudiante
              </li>
              <li
                onClick={() => {
                  setMenu({
                    Docentes: false,
                    Aprobacion: false,
                    Estudiantes: false,
                    Genericas: true,
                    Especificas: false,
                  });
                }}
                className={`py-2 px-6 rounded-t-lg ${
                  Menu.Genericas
                    ? " bg-[#151a8b] text-white"
                    : " bg-[#151a8b]/40 text-white"
                }`}
              >
                Competencias Genéricas{" "}
              </li>
              <li
                onClick={() => {
                  setMenu({
                    Docentes: false,
                    Aprobacion: false,
                    Estudiantes: false,
                    Genericas: false,
                    Especificas: true,
                  });
                }}
                className={`py-2 px-6 rounded-t-lg ${
                  Menu.Especificas
                    ? " bg-[#151a8b] text-white"
                    : " bg-[#151a8b]/40 text-white"
                }`}
              >
                Competencias Específicas{" "}
              </li>
            </ul>
          </div>

          <div>
            {Menu?.Docentes && (
              <Docentes
                ShowModal={ShowModal}
                setStartDateDocentes={setStartDateDocentes}
                setEndDateDocentes={setEndDateDocentes}
                startDateDocentes={startDateDocentes}
                endDateDocentes={endDateDocentes}
                setMenu={setMenu}
              />
            )}
            {Menu?.Aprobacion && (
              <Aprobacion
                ShowModal={ShowModal}
                setMenu={setMenu}
                setStartDateAprobacion={setStartDateAprobacion}
                setEndDateAprobacion={setEndDateAprobacion}
                StartDateAprobacion={StartDateAprobacion}
                EndDateAprobacion={EndDateAprobacion}
                setStartDateEstudiantes={setStartDateEstudiantes}
                setEndDateEstudiantes={setEndDateEstudiantes}
              />
            )}
            {Menu?.Estudiantes && (
              <Estudiantes
                ShowModal={ShowModal}
                setMenu={setMenu}
                startDateEstudiantes={startDateEstudiantes}
                endDateEstudiantes={endDateEstudiantes}
                setStartDateEstudiantes={setStartDateEstudiantes}
                setEndDateEstudiantes={setEndDateEstudiantes}
                EndDateAprobacion={EndDateAprobacion}
              />
            )}
            {Menu?.Genericas && (
              <CompetenciasGenericas
                ShowModal={ShowModal}
                setMenu={setMenu}
                Asignacion={Asignacion}
                setAsignacion={setAsignacion}
                setCompetenciaGenerica={setCompetenciaGenerica}
                CompetenciaGenerica={CompetenciaGenerica}
                DocentesDb={DocentesDb}
                setDocentesDb={setDocentesDb}
              />
            )}
            {Menu?.Especificas && (
              <CompetenciasEspecificas
                ShowModal={ShowModal}
                setMenu={setMenu}
                Asignacion={Asignacion}
                setAsignacion={setAsignacion}
                setCompetenciaEspecifica={setCompetenciaEspecifica}
                CompetenciaEspecifica={CompetenciaEspecifica}
                DocentesDb={DocentesDb}
                setDocentesDb={setDocentesDb}
                startDateDocentes={startDateDocentes}
                endDateDocentes={endDateDocentes}
                StartDateAprobacion={StartDateAprobacion}
                EndDateAprobacion={EndDateAprobacion}
                startDateEstudiantes={startDateEstudiantes}
                endDateEstudiantes={endDateEstudiantes}
                CompetenciaGenerica={CompetenciaGenerica}
                setShowModal={setShowModal}
                getData={getData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAdd;
