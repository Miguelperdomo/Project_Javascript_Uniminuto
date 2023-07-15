import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import axios from "axios";
import ModalRechazo from "./ModalRechazo";
type Props = {
  setShowAllQuestions: any;
  ShowAllQuestions: {
    Show: boolean;
    Questions: any;
    TypeSee: string;
  };
  getData: Function;
};
const FroalaEditor: any = dynamic(
  async () => {
    const values = await Promise.all([
      import("react-froala-wysiwyg"), // must be first import since we are doing values[0] in return
      import("froala-editor/js/plugins.pkgd.min.js"),
    ]);
    return values[0];
  },
  {
    loading: () => <p>Cargando el editor de texto...</p>,
    ssr: false,
  }
);
//@ts-ignore
window.FroalaEditor = require("froala-editor");
require("@wiris/mathtype-froala3");

const NewModalEditQuestion = ({
  setShowAllQuestions,
  ShowAllQuestions,
  getData,
}: Props) => {
  const [OptionsQuestion, setOptionsQuestion] = React.useState<any>(
    ShowAllQuestions?.Questions?.opciones?.split("@")
  );

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const [EditQuestion, setEditQuestion] = React.useState<any>({
    Show: false,
    Questions: {},
  });
  const [Pregunta, setPregunta] = React.useState(
    ShowAllQuestions?.Questions?.pregunta || ""
  );

  const [ModalRechazoQuestion, setModalRechazoQuestion] = React.useState({
    Show: false,
    MsnRechazo: "",
  });

  function createMarkup(pregunta: any) {
    return { __html: `${pregunta}` };
  }

  const [EditResponse, setEditResponse] = React.useState(false);

  const handlerAceptar = async () => {
    try {
      const response = await axios.post(
        "/api/Pruebas/AprobarPreguntas/AceptarPruebas",
        {
          Pregunta: Pregunta,
          idPregunta: ShowAllQuestions?.Questions?.id,
          OptionsQuestion: OptionsQuestion,
          TipoPreguntas: ShowAllQuestions?.Questions?.TipoPreguntas,
        }
      );

      console.log("response", response);

      getData();

      setShowAllQuestions({
        TypeSee: "",
        Show: false,
        Questions: [],
      });
      alert(response?.data?.body);
    } catch (error: any) {
      console.log("error", error);

      alert(error?.response?.data?.body);
    }
  };

  return (
    <>
      {ModalRechazoQuestion.Show && (
        <>
          <ModalRechazo
            Pregunta={Pregunta}
            ShowAllQuestions={ShowAllQuestions}
            OptionsQuestion={OptionsQuestion}
            setModalRechazoQuestion={setModalRechazoQuestion}
            getData={getData}
            ModalRechazoQuestion={ModalRechazoQuestion}
            setShowAllQuestions={setShowAllQuestions}
          />
        </>
      )}
      <div className="bg-[#000236]/70 transition duration-150 ease-in-out z-20 fixed top-0 right-0 bottom-0 left-0">
        <div className="container mx-auto  w-11/12 md:w-2/3 max-w-5xl">
          <div className="relative overflow-auto  max-h-screen  py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
            <div className="flex justify-between items-center text-center text-lg tracking-normal leading-tight mb-4 bg-[#151A8B] w-full text-white p-4 rounded-lg font-bold">
              <h1 className="text-center text-lg tracking-normal leading-tight  bg-[#151A8B] w-full text-white  rounded-lg font-bold ">
                Pregunta Completa
              </h1>

              <button
                onClick={() => {
                  setShowAllQuestions({
                    TypeSee: "",
                    Show: false,
                    Questions: [],
                  });
                }}
              >
                {" "}
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

            {ShowAllQuestions?.Questions?.TipoPreguntas == "1" && (
              <>
                <div className="flex justify-center">
                  {EditQuestion?.Show ? (
                    <>
                      <FroalaEditor
                        model={Pregunta}
                        onModelChange={(e: any) => {
                          setPregunta(e);
                        }}
                        config={{
                          toolbarButtons: {
                            moreText: {
                              buttons: [
                                "bold",
                                "italic",
                                "underline",
                                "strikeThrough",
                                "subscript",
                                "superscript",
                                "fontFamily",
                                "fontSize",
                                "textColor",
                                "backgroundColor",
                                "inlineClass",
                                "inlineStyle",
                                "clearFormatting",
                              ],
                            },
                            moreParagraph: {
                              buttons: [
                                "alignLeft",
                                "alignCenter",
                                "formatOLSimple",
                                "alignRight",
                                "alignJustify",
                                "formatOL",
                                "formatUL",
                                "paragraphFormat",
                                "paragraphStyle",
                                "lineHeight",
                                "outdent",
                                "indent",
                                "quote",
                              ],
                            },
                            moreRich: {
                              buttons: [
                                "insertImage",
                                "insertVideo",
                                "insertTable",
                                "emoticons",
                                "fontAwesome",
                                "specialCharacters",
                                "embedly",
                                "insertHR",
                              ],
                            },
                            moreMisc: {
                              buttons: [
                                "undo",
                                "redo",
                                "spellChecker",
                                "selectAll",
                                "wirisEditor",
                                "wirisChemistry",
                              ],
                              align: "right",
                              buttonsVisible: 2,
                            },
                          },
                          // Allow all tags, in order to allow MathML:
                          htmlAllowedTags: [".*"],
                          htmlAllowedAttrs: [".*"],
                          // Allow empty tags on these next elements for proper formula rendering:
                          htmlAllowedEmptyTags: ["mprescripts", "none"],
                          language: "es",
                          attribution: false,
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <FroalaEditorView model={Pregunta} />
                    </>
                  )}
                  <span>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => {
                        setEditQuestion({
                          Show: !EditQuestion.Show,
                          Questions: Pregunta,
                        });
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </span>
                </div>

                <div className="col-span-2 dark:text-black">
                  <div className="flex">
                    <h2 className="font-bold pb-2">Opciones de respuesta: </h2>

                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => {
                          setEditResponse(!EditResponse);
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 items-center gap-2">
                    {OptionsQuestion?.map((option: any, index: number) => (
                      <div
                        className={`flex ${
                          index ==
                            alphabet?.findIndex(
                              (letra) =>
                                letra.toLowerCase() ==
                                ShowAllQuestions?.Questions?.respuesta
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
                                {EditResponse ? (
                                  <>
                                    <input
                                      className="InputStyle"
                                      type="text"
                                      onChange={(e) => {
                                        const newOptions = OptionsQuestion?.map(
                                          (
                                            option: any,
                                            indexOption: number
                                          ) => {
                                            if (indexOption == index) {
                                              return `@T~${e.target.value}`;
                                            } else {
                                              return option;
                                            }
                                          }
                                        );
                                        setOptionsQuestion(newOptions);
                                      }}
                                      value={option?.split("~")[1]}
                                    />
                                  </>
                                ) : (
                                  <>
                                    <div
                                      dangerouslySetInnerHTML={createMarkup(
                                        option?.split("~")[1]
                                      )}
                                    />
                                  </>
                                )}
                                {/* <div
                                dangerouslySetInnerHTML={createMarkup(
                                  option?.split("~")[1]
                                )}
                              /> */}
                              </>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-around mt-3 gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handlerAceptar();
                }}
                className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
              >
                Aprobar
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  setModalRechazoQuestion({
                    ...ModalRechazoQuestion,
                    Show: true,
                  });
                }}
                className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
              >
                rechazar
              </button>
              {/* <button
              onClick={() => {
               
              }}
              className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
            >
              Cerrar
            </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewModalEditQuestion;
