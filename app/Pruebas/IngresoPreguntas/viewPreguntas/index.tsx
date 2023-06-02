import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { VisibilidadModal } from "../../../../typings";
import { Pregunta1 } from "./pregunta1";
import { Pregunta2 } from "./pregunta2";
import { Pregunta3 } from "./pregunta3";
export type Props = {
  competencia: string;
  prueba: number;
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
};
export function Preguntas({ competencia, prueba, setShowModal }: Props) {
  const [data, setData] = useState([] as any);
  const [ShowQuestion, setShowQuestion] = useState({} as any);

  // Search params
  const searchParams: any = useSearchParams();

  const getData = async () => {
    await axios
      .post("/api/Pruebas/ShowPreguntas/BaseInfoPreguntas", {
        competencia: competencia,
        prueba: prueba,
        IdUser: searchParams?.get("IdUser") || 0,
        IdRol: searchParams?.get("IdRol") || 0,
        SubSede: searchParams?.get("SubSede") || 0,
      })
      .then((res: any) => {
        setData(res?.data?.informacion);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="bg-[#000236]/100 overflow-auto  transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
        <div className="container mx-auto w-11/12 md:w-2/3 max-w-4xl  ">
          <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400 ">
            <h1 className="text-center text-lg tracking-normal leading-tight mb-4 bg-[#151A8B] w-full text-white p-4 rounded-lg font-bold ">
              Consulta de preguntas ingresadas para la competencia{" "}
              {data[0]?.eje_nom || ""}
            </h1>
            <div className="flex gap-2 flex-wrap justify-around">
              {data?.map((preg: any, key: number) => {
                return (
                  <>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setShowQuestion({
                          ...preg,
                        });
                      }}
                      title={`Pregunta ${
                        (preg?.aprobo == 0 && "Pendiente") ||
                        (preg.aprobo == 1 && "Rechazada") ||
                        (preg.aprobo == 2 && "Aprobada")
                      }`}
                      className={`${
                        (preg?.aprobo == 0 &&
                          "bg-yellow-500 hover:bg-yellow-900 cursor-auto") ||
                        (preg.aprobo == 1 && "bg-red-500 hover:bg-red-900") ||
                        (preg.aprobo == 2 &&
                          "bg-green-500 hover:bg-green-900 cursor-auto")
                      } rounded-md p-4 text-white font-bold`}
                    >
                      Pregunta {key + 1}
                    </button>
                  </>
                );
              })}
            </div>
            {ShowQuestion?.TipoPregunta == 1 && (
              <Pregunta1 data={ShowQuestion} />
            )}
            {ShowQuestion?.TipoPregunta == 2 && (
              <Pregunta2 data={ShowQuestion} />
            )}
            {ShowQuestion?.TipoPregunta == 3 && (
              <Pregunta3 data={ShowQuestion} />
            )}

            <div className="flex justify-around mt-3 gap-2">
              <button
                className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal({
                    AddVisible: false,
                  });
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
