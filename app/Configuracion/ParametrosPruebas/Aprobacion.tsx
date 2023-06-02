import React from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { es } from "date-fns/locale";

type Props = {
  setMenu: React.Dispatch<React.SetStateAction<any>>;
  ShowModal: any;
  setStartDateAprobacion: React.Dispatch<React.SetStateAction<any>>;
  setEndDateAprobacion: React.Dispatch<React.SetStateAction<any>>;
  EndDateAprobacion: any;
  StartDateAprobacion: any;
  setStartDateEstudiantes: React.Dispatch<React.SetStateAction<any>>;
  setEndDateEstudiantes: React.Dispatch<React.SetStateAction<any>>;
};

const Aprobacion = ({
  setMenu,
  ShowModal,
  setStartDateAprobacion,
  setEndDateAprobacion,
  StartDateAprobacion,
  EndDateAprobacion,

  setStartDateEstudiantes,
  setEndDateEstudiantes,
}: Props) => {
  const handleSelectAprobacion = (ranges: any) => {
    setStartDateAprobacion(ranges.selection.startDate);
    setEndDateAprobacion(ranges.selection.endDate);
    setStartDateEstudiantes(ranges.selection.endDate);
    setEndDateEstudiantes(ranges.selection.endDate);
  };
  const selectionRangeDocentes = {
    startDate: StartDateAprobacion,
    endDate: EndDateAprobacion,
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
              Rango fechas para aprobación de preguntas
              <span className="text-red-900">(*)</span>
            </label>
            <DateRange
              ranges={[selectionRangeDocentes]}
              minDate={new Date()}
              rangeColors={["#3b82f6"]}
              onChange={handleSelectAprobacion}
              locale={es}
              // maxDate={Values.MaxSemestre}
            />
          </div>
        )}
      </section>{" "}
      <div className="flex justify-around mt-3 gap-2">
        <button
          onClick={() => {
            setMenu({
              Docentes: true,
              Aprobacion: false,
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
              Estudiantes: true,
              Genericas: false,
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

export default Aprobacion;
