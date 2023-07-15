import React from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { es } from "date-fns/locale";
type ShowModalType = {
  Visible: boolean;
  TypeTest: string;
  Programa?: number | null;
  SemestreAcademico?: string;
  MaxSemestre?: any;
  StartStudents?: any;
};
type Props = {
  ShowModal: ShowModalType;
  setMenu: React.Dispatch<React.SetStateAction<any>>;
  startDateEstudiantes: any;
  endDateEstudiantes: any;
  setStartDateEstudiantes: React.Dispatch<React.SetStateAction<any>>;
  setEndDateEstudiantes: any;
  EndDateAprobacion: any;
};

const Estudiantes = ({
  ShowModal,
  setMenu,
  startDateEstudiantes,
  endDateEstudiantes,
  setStartDateEstudiantes,
  setEndDateEstudiantes,
  EndDateAprobacion,
}: Props) => {
  console.log("EndDateAprobacion", EndDateAprobacion);

  const handleSelectEstudiantes = (ranges: any) => {
    setStartDateEstudiantes(ranges.selection.startDate);
    setEndDateEstudiantes(ranges.selection.endDate);
  };

  const selectionRangeEstudiantes = {
    startDate: startDateEstudiantes,
    endDate: endDateEstudiantes,
    key: "selection",
  };
  return (
    <div>
      <section className="flex justify-center">
        {ShowModal?.TypeTest === "SP" && (
          <div>
            <label
              htmlFor="InicioPrueba"
              className="mb-3 block text-base font-medium text-gray-800"
            >
              Rango fechas para presentar la prueba{" "}
              <span className="text-red-900">(*)</span>
            </label>
            <DateRange
              ranges={[selectionRangeEstudiantes]}
              minDate={EndDateAprobacion}
              rangeColors={["#3b82f6"]}
              onChange={handleSelectEstudiantes}
              locale={es}
            />
          </div>
        )}
      </section>
      {/* <div className="flex justify-around mt-3 gap-2">
        <button
          onClick={() => {
            setMenu({
              Docentes: false,
              Aprobacion: true,
              Estudiantes: false,
              Genericas: false,
              Especificas: false,
            });
          }}
          className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
        >
          Devolver
        </button>
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
          Siguiente
        </button>
      </div> */}

      <div className="flex justify-around mt-3 gap-2">
        <button
          onClick={() => {
            setMenu({
              Docentes: false,
              Aprobacion: true,
              Estudiantes: false,
              Genericas: false,
              Especificas: false,
            });
          }}
          className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
        >
          Devolver
        </button>
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
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Estudiantes;
