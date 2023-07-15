import axios from "axios";
import { type } from "os";
import React from "react";

type Props = {
  setModalRechazoQuestion: any;
  Pregunta: any;
  ShowAllQuestions: any;
  OptionsQuestion: any;
  getData: Function;
  ModalRechazoQuestion: any;
  setShowAllQuestions: any;
};
const ModalRechazo = ({
  setModalRechazoQuestion,
  Pregunta,
  ShowAllQuestions,
  OptionsQuestion,
  getData,
  ModalRechazoQuestion,
  setShowAllQuestions,
}: Props) => {
  const handlerRechazar = async () => {
    try {
      const response = await axios.post(
        "/api/Pruebas/AprobarPreguntas/RechazarPreguntas",
        {
          Pregunta: Pregunta,
          idPregunta: ShowAllQuestions?.Questions?.id,
          OptionsQuestion: OptionsQuestion,
          TipoPreguntas: ShowAllQuestions?.Questions?.TipoPreguntas,
          MsnRechazo: ModalRechazoQuestion?.MsnRechazo,
        }
      );
      getData();
      setShowAllQuestions({
        Show: false,
        Questions: {},
      });
      setModalRechazoQuestion({
        Show: false,
      });
      alert(response?.data?.body);
    } catch (error: any) {
      console.log("error", error);

      alert(error?.response?.data?.body);
    }
  };
  return (
    <div className="bg-[#000236]/100 transition duration-150 ease-in-out z-30 fixed top-0 right-0 bottom-0 left-0">
      <div className="container mx-auto  w-11/12 md:w-2/3 max-w-5xl">
        <div className="relative overflow-auto  max-h-screen  py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <div className="flex justify-between items-center text-center text-lg tracking-normal leading-tight mb-4 bg-[#151A8B] w-full text-white p-4 rounded-lg font-bold">
            <h1 className="text-center text-lg tracking-normal leading-tight  bg-[#151A8B] w-full text-white  rounded-lg font-bold ">
              Motivo del rechazo
            </h1>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlerRechazar();
            }}
            className="w-full max-w-sm mx-auto"
          >
            <textarea
              className="h-24 w-full border rounded-xl overflow-hidden resize-none 
              ring-blue-800 
              focus:border-blue-500 ring-2 ring-transparent focus:ring-blue-500 focus:outline-none text-black p-2 transition ease-in-out duration-300"
              placeholder="Por que motivo rechazo la prueba . . ."
              defaultValue={""}
              required
              onChange={(e) => {
                setModalRechazoQuestion({
                  Show: true,
                  MsnRechazo: e.target.value,
                });
              }}
              minLength={20}
              title="El motivo del rechazó debe tener minimo 20 caracteres"
            />

            <div className="flex justify-around mt-3 gap-2">
              <button
                type="submit"
                className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
              >
                Rechazar Pregunta
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setModalRechazoQuestion({
                    Show: false,
                    MsnRechazo: "",
                  });
                }}
                className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
              >
                Cerrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalRechazo;
