import { Competencia } from "@/typings";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React from "react";
import ModalAsignarDocente from "./ModalAsignarDocente";
type ShowModalType = {
  Visible?: boolean;
  TypeTest?: string;
  Programa?: number | null;
  SemestreAcademico?: string;
  MaxSemestre?: string;
  Periodicidad?: String;
  StartStudents?: string;
};
type Props = {
  ShowModal: ShowModalType;
  setMenu: React.Dispatch<React.SetStateAction<any>>;
  Asignacion: any;
  setCompetenciaEspecifica: React.Dispatch<React.SetStateAction<any>>;
  setAsignacion: React.Dispatch<React.SetStateAction<any>>;
  DocentesDb: any;
  setDocentesDb: React.Dispatch<React.SetStateAction<any>>;
  startDateDocentes: any;
  endDateDocentes: any;
  StartDateAprobacion: any;
  EndDateAprobacion: any;
  startDateEstudiantes: any;
  endDateEstudiantes: any;
  CompetenciaGenerica: Competencia[];
  CompetenciaEspecifica: Competencia[];
  setShowModal: React.Dispatch<React.SetStateAction<any>>;
  getData: Function;
};
const CompetenciasEspecificas = ({
  ShowModal,
  setMenu,
  Asignacion,
  setAsignacion,
  setCompetenciaEspecifica,
  DocentesDb,
  setDocentesDb,
  startDateDocentes,
  endDateDocentes,
  StartDateAprobacion,
  EndDateAprobacion,
  startDateEstudiantes,
  endDateEstudiantes,
  CompetenciaGenerica,
  CompetenciaEspecifica,
  setShowModal,
  getData,
}: Props) => {
  const searchParams = useSearchParams();

  const hanlerSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const SubSede = searchParams.get("SubSede");

      const res = await axios.post(
        "/api/Configuracion/ParametrosPruebas/AddPruebas",
        {
          CompetenciaEspecifica: CompetenciaEspecifica || [],
          CompetenciaGenerica: CompetenciaGenerica || [],
          startDateDocentes,
          endDateDocentes,
          StartDateAprobacion,
          EndDateAprobacion,
          startDateEstudiantes,
          endDateEstudiantes,
          SubSede,
          InfoPrueba: ShowModal,
        }
      );

      console.log(ShowModal);

      getData(
        ShowModal.Programa,
        ShowModal.SemestreAcademico,
        ShowModal.TypeTest
      );
      setShowModal((prev: any) => ({ ...prev, Visible: false }));

      alert(res?.data?.body);
    } catch (error) {
      console.log(error);
      alert("Error al guardar");
    }
  };
  return (
    <>
      {Asignacion?.Show && (
        <ModalAsignarDocente
          Asignacion={Asignacion}
          setAsignacion={setAsignacion}
          setCompetenciaGenerica={setCompetenciaEspecifica}
          setDocentesDb={setDocentesDb}
          DocentesDb={DocentesDb}
          CompetenciaGenerica={CompetenciaEspecifica}
        />
      )}
      <section className="flex justify-center">
        {ShowModal?.TypeTest === "SP" && (
          <div className="w-[90%] grid grid-cols-2 gap-2 max-h-[80vh] overflow-y-auto ">
            {CompetenciaEspecifica?.length > 0 ? (
              CompetenciaEspecifica?.map((el: Competencia, index: number) => (
                <div
                  key={el.Id}
                  onClick={() => {
                    setAsignacion({
                      Show: true,
                      Competencia: { ...el, index },
                      Docentes: DocentesDb,
                    } as any);
                  }}
                  className="mt-2 mb-8 p-2 w-[85%]  cursor-pointer hover:shadow-2xl hover:scale-105 border border-gray-200"
                >
                  <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
                    {el?.Nombre} - {el?.Abreviatura}
                  </h4>
                  <p className="mt-2 px-2 text-base text-gray-600">
                    {el?.DocenteAsignado?.Nombre}{" "}
                    {el?.DocenteAsignado?.Apellidos}
                  </p>
                  <p className="mt-2 px-2 text-base text-gray-600">
                    Hora: {el?.Hora} Minutos: {el?.Minutos}
                  </p>
                </div>
              ))
            ) : (
              <>No hay competencias Especificas</>
            )}
          </div>
        )}
      </section>

      <div className="flex justify-around mt-3 gap-2">
        <button
          onClick={() => {
            setMenu({
              Docentes: false,
              Aprobacion: false,
              Estudiantes: false,
              Genericas: true,
              Especificas: false,
            });
          }}
          className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
        >
          Devolver
        </button>
        {
          <button
            onClick={hanlerSubmit}
            className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
          >
            Crear Prueba
          </button>
        }
      </div>
    </>
  );
};

export default CompetenciasEspecificas;
