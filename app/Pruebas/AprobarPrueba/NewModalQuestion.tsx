import React from "react";
import NewModalEditQuestion from "./NewModalEditQuestion";
import NewModalSeeQuestion from "./NewModalSeeQuestion";

type Props = {
  ShowModal: {
    Show: boolean;
    Questions: any[];
    TipoPreguntas: string;
  };
  setShowModal: any;
  getData: Function;
};

const NewModalQuestion = ({ ShowModal, setShowModal, getData }: Props) => {
  const [ShowAllQuestions, setShowAllQuestions] = React.useState({
    Show: false,
    Questions: {},
    TypeSee: "",
  } as {
    Show: boolean;
    Questions: any;
    TypeSee: string;
  });
  const meses = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sept",
    "Oct",
    "Nov",
    "Dic",
  ];

  return (
    <>
      {ShowAllQuestions?.Show && ShowAllQuestions?.TypeSee == "Ver" && (
        <NewModalSeeQuestion
          setShowAllQuestions={setShowAllQuestions}
          ShowAllQuestions={ShowAllQuestions}
        />
      )}
      {ShowAllQuestions.Show && ShowAllQuestions.TypeSee == "Editar" && (
        <NewModalEditQuestion
          setShowAllQuestions={setShowAllQuestions}
          ShowAllQuestions={ShowAllQuestions}
          getData={getData}
        />
      )}
      <div className="bg-[#000236]/60 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
        <div className="container mx-auto  w-11/12 md:w-2/3 max-w-5xl  ">
          <div className="relative overflow-auto  max-h-screen   py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
            <h1 className="text-center text-lg tracking-normal leading-tight mb-4 bg-[#151A8B] w-full text-white p-4 rounded-lg font-bold ">
              Preguntas {ShowModal?.TipoPreguntas}
            </h1>

            <div className="grid md:grid-cols-2 justify-center gap-2 max-h-[33rem] overflow-auto ">
              {ShowModal?.Questions?.map((question, key) => {
                const fecha = new Date(question?.DateCreate);

                const mes = meses[fecha?.getMonth()];
                const dia = fecha?.getDate();
                const horas = fecha?.getHours();
                const minutos = fecha?.getMinutes();
                return (
                  <div
                    key={key}
                    className="h-63 flex mx-auto flex-col flex-wrap justify-between items-start bg-blue-200 rounded-lg border border-blue-300 mb-6 py-2 px-4"
                  >
                    <div>
                      <h4 className="text-gray-900 font-bold ">
                        {question?.NombreCompetencia || ""}
                      </h4>

                      {/* <p className="text-gray-800 text-sm line-clamp-2">
                      {question?.pregunta}
                    </p> */}
                      <div
                        className="text-gray-900 text-sm line-clamp-4"
                        dangerouslySetInnerHTML={{
                          __html: question?.pregunta || "",
                        }}
                      />
                    </div>
                    <div className="w-full flex flex-col items-start">
                      <div className=" border border-[#151a8b] rounded-full px-3 py-1 text-gray-800 text-xs flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-[#151a8b]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>

                        <p className="ml-2">
                          {dia || ""} {mes || ""}, {horas || ""}:{minutos || ""}
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-gray-800 w-full">
                        <p className="text-sm">
                          Profesor: {question?.NombreUno || ""}{" "}
                          {question?.NombreDos || ""}{" "}
                          {question?.ApellidoUno || ""}{" "}
                          {question?.ApellidoDos || ""}
                        </p>
                        {ShowModal.TipoPreguntas === "Pendientes" ? (
                          <>
                            <button
                              onClick={() => {
                                setShowAllQuestions({
                                  TypeSee: "Editar",
                                  Show: true,
                                  Questions: question,
                                });
                              }}
                              className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-blue-300  focus:ring-black"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-pencil"
                                width={20}
                                height={20}
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                                <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                              </svg>
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setShowAllQuestions({
                                  TypeSee: "Ver",
                                  Show: true,
                                  Questions: question,
                                });
                              }}
                              className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-blue-300  focus:ring-black hover:bg-green-800"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 "
                              >
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
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-around mt-3 gap-2">
              <button
                onClick={() => {
                  setShowModal({
                    Show: false,
                    Questions: [],
                  });
                }}
                className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewModalQuestion;
