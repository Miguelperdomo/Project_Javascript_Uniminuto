import Image from "next/image";
import React, { useState } from "react";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

type Props = {
  SeeQuestion: any;
  setSeeQuestion: any;
};
const ShowQuestion = ({ SeeQuestion, setSeeQuestion }: Props) => {
  const [Question, setQuestion] = useState<any>(
    SeeQuestion?.Pregunta?.pregunta
  );
  const [OptionsQuestion, setOptionsQuestion] = React.useState<any>(
    SeeQuestion?.Pregunta?.opciones?.split("@")
  );
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  function createMarkup(pregunta: any) {
    return { __html: `${pregunta}` };
  }

  console.log("SeeQuestion", SeeQuestion);

  return (
    <div className="bg-[#000236]/100 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
      <div className="container mx-auto  w-11/12 md:w-2/3 max-w-5xl">
        <div className="relative overflow-auto  max-h-screen  py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <div className="flex justify-between items-center text-center text-lg tracking-normal leading-tight mb-4 bg-[#151A8B] w-full text-white p-4 rounded-lg font-bold">
            <h1 className=" ">
              Tipo:{" "}
              {(SeeQuestion?.Pregunta?.Tipo == "SP" && "Saber Pro") ||
                (SeeQuestion?.Pregunta?.Tipo == "SS" && "SESA")}{" "}
              - Programa : {SeeQuestion?.Pregunta?.NombrePrograma} - Competencia
              : {SeeQuestion?.Pregunta?.NombreCompetencia}
            </h1>
            <button
              onClick={(e) => {
                e.preventDefault();
                setSeeQuestion({
                  ...SeeQuestion,
                  Show: false,
                });
              }}
              className="text-white"
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
          </div>

          <div>
            {SeeQuestion?.Pregunta?.TipoPregunta == 1 && (
              <>
                <div className="grid grid-cols-1">
                  <div>
                    <h2>
                      <span className="font-bold dark:text-black">
                        Pregunta:{" "}
                      </span>
                    </h2>

                    <FroalaEditorView model={SeeQuestion?.Pregunta?.Pregunta} />
                  </div>

                  <div className="pt-6 col-span-2 dark:text-black">
                    <h2 className="font-bold pb-2">Opciones de respuesta: </h2>
                    <div className="grid md:grid-cols-2 items-center gap-2">
                      {OptionsQuestion?.map((option: any, index: number) => (
                        <div
                          className={`flex ${
                            index ==
                              alphabet?.findIndex(
                                (letra) =>
                                  letra.toLowerCase() ==
                                  SeeQuestion?.Pregunta?.respuesta
                              ) && "border-2  border-green-900 text-justify p-1"
                          }`}
                          key={index}
                        >
                          {option?.split("~")[0] == "I" ? (
                            <>
                              {alphabet[index]}
                              -
                              <Image
                                src={`${option?.split("~")[1]}`}
                                alt={`${index}`}
                                width={400}
                                height={400}
                                className="bg-cover"
                              />
                            </>
                          ) : (
                            <>
                              {option?.split("~")[1]?.length > 0 && (
                                <>
                                  <b className="text-[#000236]">
                                    {alphabet[index]}-{" "}
                                  </b>
                                  <div
                                    dangerouslySetInnerHTML={createMarkup(
                                      option?.split("~")[1]
                                    )}
                                  />
                                </>
                              )}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-xl font-bold">
                    Pregunta realizada por:{" "}
                    <span>{SeeQuestion?.Pregunta?.NombreCompleto}</span>
                  </p>
                </div>
              </>
            )}
          </div>

          <div>
            {SeeQuestion?.Pregunta?.TipoPregunta == 2 && (
              <>
                <div className="grid grid-cols-1">
                  <div>
                    <h2>
                      <span className="font-bold dark:text-black">
                        Pregunta:{" "}
                      </span>
                    </h2>

                    <FroalaEditorView model={SeeQuestion?.Pregunta?.Pregunta} />
                  </div>

                  <div className="pt-6 col-span-2 dark:text-black">
                    <h2 className="font-bold pb-2">Opciones de respuesta: </h2>
                    <div className="grid md:grid-cols-2 items-center gap-2">
                      {OptionsQuestion?.map((option: any, index: number) => (
                        <div
                          className={`flex ${
                            (index ==
                              alphabet?.findIndex(
                                (letra) =>
                                  letra.toLowerCase() ==
                                  SeeQuestion?.Pregunta?.respuesta?.split(
                                    "@"
                                  )[0]
                              ) &&
                              "border-2  border-green-900 text-justify p-1") ||
                            (index ==
                              alphabet?.findIndex(
                                (letra) =>
                                  letra.toLowerCase() ==
                                  SeeQuestion?.Pregunta?.respuesta?.split(
                                    "@"
                                  )[1]
                              ) &&
                              "border-2  border-green-900 text-justify p-1")
                          }`}
                          key={index}
                        >
                          {option?.split("~")[0] == "I" ? (
                            <>
                              {alphabet[index]}
                              -
                              <Image
                                src={`${option?.split("~")[1]}`}
                                alt={`${index}`}
                                width={400}
                                height={400}
                                className="bg-cover"
                              />
                            </>
                          ) : (
                            <>
                              {option?.split("~")[1]?.length > 0 && (
                                <>
                                  <b className="text-[#000236]">
                                    {alphabet[index]}-{" "}
                                  </b>
                                  <div
                                    dangerouslySetInnerHTML={createMarkup(
                                      option?.split("~")[1]
                                    )}
                                  />
                                </>
                              )}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div>
            {SeeQuestion?.Pregunta?.TipoPregunta == 3 && (
              <>
                <div className="grid grid-cols-1">
                  <div>
                    <h2>
                      <span className="font-bold dark:text-black">
                        Pregunta:{" "}
                      </span>
                    </h2>

                    <FroalaEditorView model={SeeQuestion?.Pregunta?.Pregunta} />
                  </div>

                  {SeeQuestion?.Pregunta?.Preguntas?.map(
                    (pre: any, key: number) => (
                      <div key={key} className="col-span-2 dark:text-black">
                        <h2 className="font-bold ">
                          Opciones de pregunta {key + 1}:{" "}
                        </h2>
                        <FroalaEditorView model={pre.pregunta} />
                        <div className="grid md:grid-cols-2 items-center gap-2">
                          {pre?.opciones
                            ?.split("@")
                            ?.map((option: any, index: number) => (
                              <div
                                className={`flex ${
                                  index ==
                                    alphabet?.findIndex(
                                      (letra) =>
                                        letra?.toLowerCase() == pre?.respuesta
                                    ) &&
                                  "border-2  border-green-900 text-justify p-1"
                                }`}
                                key={index}
                              >
                                {option?.split("~")[0] == "I" ? (
                                  <>
                                    {alphabet[index]}
                                    -
                                    <Image
                                      src={`${option?.split("~")[1]}`}
                                      alt={`${index}`}
                                      width={400}
                                      height={400}
                                      className="bg-cover"
                                    />
                                  </>
                                ) : (
                                  <>
                                    {option?.split("~")[1]?.length > 0 && (
                                      <>
                                        <b className="text-[#000236]">
                                          {alphabet[index]}-{" "}
                                        </b>
                                        <div
                                          dangerouslySetInnerHTML={createMarkup(
                                            option?.split("~")[1]
                                          )}
                                        />
                                      </>
                                    )}
                                  </>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </>
            )}
          </div>
          <div className="flex justify-around mt-3 gap-2">
            <button
              onClick={() =>
                setSeeQuestion({
                  ...SeeQuestion,
                  Show: false,
                })
              }
              className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowQuestion;
