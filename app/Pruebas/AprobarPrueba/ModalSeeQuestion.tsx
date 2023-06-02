"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

// Require Editor JS files.
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/js/third_party/embedly.min.js";
// import "froala-editor/js/plugins/fullscreen.min.js"

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/third_party/embedly.min.css";
import "froala-editor/css/plugins/fullscreen.min.css";

import Froala from "react-froala-wysiwyg";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import Tribute from "tributejs";
import "tributejs/dist/tribute.css";
import { options } from "./Options";

type Props = {
  SeeQuestion: any;
  setSeeQuestion: any;
  GetPreguntas: Function;
};

const ModalSeeQuestion = ({
  SeeQuestion,
  setSeeQuestion,
  GetPreguntas,
}: Props) => {
  const ref: any = useRef({ editor: null });
  const [isFroalaInitialized, setIsFroalaInitialized] = useState(false);
  const tribute = new Tribute(options);
  const [editor, setEditor] = useState<any>("");
  const [model, setModel] = useState<string>(SeeQuestion?.Pregunta?.pregunta);

  const handleModelChange = (model: any) => {
    setModel(model);
  };

  useEffect(() => {
    setEditor(ref.current.editor);
    editor && setIsFroalaInitialized(true);
  }, [ref.current]);

  useEffect(() => {
    if (isFroalaInitialized) {
      tribute.attach(editor.el);
      editor.html.set(model);
    }
  }, [isFroalaInitialized]);
  // ---------
  const [OptionsQuestion, setOptionsQuestion] = React.useState<any>(
    SeeQuestion?.Pregunta?.opciones?.split("@")
  );

  const [Question, setQuestion] = React.useState<any>(
    SeeQuestion?.Pregunta?.pregunta
  );

  // generate una const con el abecedario
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  console.log("SeeQuestion", SeeQuestion);

  const handlerAceptar = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/Pruebas/AprobarPreguntas/AceptarPruebas",
        {
          Pregunta: model,
          idPregunta: SeeQuestion?.Pregunta?.id,
          idPrueba: SeeQuestion?.Pregunta?.idPrueba,
          idDocente: SeeQuestion?.Pregunta?.IdDocente,
          TipoPreguntas: SeeQuestion?.Pregunta?.TipoPreguntas,
        }
      );

      GetPreguntas();
      setSeeQuestion({
        ...SeeQuestion,
        Show: false,
      });
      alert(response?.data?.body);
    } catch (error: any) {
      console.log("error", error);

      alert(error?.response?.data?.body);
    }
  };

  const handlerRechazar = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();

      const response = await axios.post(
        "/api/Pruebas/AprobarPreguntas/RechazarPreguntas",
        {
          Pregunta: Question,
          idPregunta: SeeQuestion?.Pregunta?.id,
          idPrueba: SeeQuestion?.Pregunta?.idPrueba,
          idDocente: SeeQuestion?.Pregunta?.IdDocente,
        }
      );
      GetPreguntas();
      setSeeQuestion({
        ...SeeQuestion,
        Show: false,
      });
      alert(response?.data?.body);
    } catch (error: any) {
      console.log("error", error);

      alert(error?.response?.data?.body);
    }
  };

  function createMarkup(pregunta: any) {
    return { __html: `${pregunta}` };
  }

  return (
    <>
      <div className="bg-[#000236]/100 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
        <div className="container mx-auto  w-11/12 md:w-2/3 max-w-5xl">
          <div className="relative overflow-auto  max-h-screen  py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
            <div className="flex justify-between items-center text-center text-lg tracking-normal leading-tight mb-4 bg-[#151A8B] w-full text-white p-4 rounded-lg font-bold">
              <h1 className=" ">
                Programa: {SeeQuestion?.Pregunta?.NombrePrograma} - Competencia
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
            <div className="dark:text-black">
              <h1>
                Puntos asociados {""}
                {(SeeQuestion?.Pregunta?.TipoPreguntas != 3 && (
                  <span className="font-bold">
                    {SeeQuestion?.Pregunta?.punto}
                  </span>
                )) ||
                  SeeQuestion?.Pregunta?.Preguntas?.reduce(
                    (acc: number, el: any) => acc + el.punto,
                    0
                  )}
              </h1>
            </div>
            {SeeQuestion?.Pregunta?.TipoPreguntas == 1 && (
              <>
                <div className="grid grid-cols-1">
                  <div>
                    <h2>
                      <span className="font-bold dark:text-black">
                        Pregunta:{" "}
                      </span>
                    </h2>

                    <Froala
                      ref={ref}
                      model={model}
                      onModelChange={handleModelChange}
                      tag="textarea"
                      config={{
                        attribution: false,
                        placeholder: "Start typing...",
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
                              "insertLink",
                              "insertImage",
                              "insertVideo",
                              "insertTable",
                              "emoticons",
                              "fontAwesome",
                              "specialCharacters",
                              "embedly",
                              "insertFile",
                              "insertHR",
                            ],
                          },
                          moreMisc: {
                            buttons: [
                              "undo",
                              "redo",
                              "fullscreen",
                              "print",
                              "getPDF",
                              "spellChecker",
                              "selectAll",
                              "html",
                              "help",
                            ],
                            align: "right",
                            buttonsVisible: 2,
                          },
                        },
                        pluginsEnabled: [
                          "table",
                          "spell",
                          "quote",
                          "save",
                          "quickInsert",
                          "paragraphFormat",
                          "paragraphStyle",
                          "help",
                          "draggable",
                          "align",
                          "link",
                          "lists",
                          "file",
                          "image",
                          "emoticons",
                          "url",
                          "video",
                          "embedly",
                          "colors",
                          "entities",
                          "inlineClass",
                          "inlineStyle",
                          "codeBeautif ",
                          "spellChecker",
                          "imageTUI",
                        ],
                      }}
                    />
                  </div>

                  <div className="col-span-2 dark:text-black">
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
                  <div className="col-span-2 dark:text-black">
                    <h2 className="font-bold pb-2">
                      Retroalimentaciones ingresadas por el docente:{" "}
                    </h2>
                    <div className="grid md:grid-cols-2 items-center gap-2">
                      {SeeQuestion?.Retro.map((option: any, index: number) => (
                        <div className={`flex `} key={index}>
                          {option?.posicion?.toUpperCase()}) {option?.texto}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {SeeQuestion?.Pregunta?.TipoPreguntas == 2 && (
              <>
                <div className="grid grid-cols-1">
                  <div>
                    <h2>
                      <span className="font-bold dark:text-black">
                        Pregunta:{" "}
                      </span>
                    </h2>

                    <Froala
                      ref={ref}
                      model={model}
                      onModelChange={handleModelChange}
                      tag="textarea"
                      config={{
                        attribution: false,
                        placeholder: "Start typing...",
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
                              "insertLink",
                              "insertImage",
                              "insertVideo",
                              "insertTable",
                              "emoticons",
                              "fontAwesome",
                              "specialCharacters",
                              "embedly",
                              "insertFile",
                              "insertHR",
                            ],
                          },
                          moreMisc: {
                            buttons: [
                              "undo",
                              "redo",
                              "fullscreen",
                              "print",
                              "getPDF",
                              "spellChecker",
                              "selectAll",
                              "html",
                              "help",
                            ],
                            align: "right",
                            buttonsVisible: 2,
                          },
                        },
                        pluginsEnabled: [
                          "table",
                          "spell",
                          "quote",
                          "save",
                          "quickInsert",
                          "paragraphFormat",
                          "paragraphStyle",
                          "help",
                          "draggable",
                          "align",
                          "link",
                          "lists",
                          "file",
                          "image",
                          "emoticons",
                          "url",
                          "video",
                          "embedly",
                          "colors",
                          "entities",
                          "inlineClass",
                          "inlineStyle",
                          "codeBeautif ",
                          "spellChecker",
                          "imageTUI",
                        ],
                      }}
                    />
                  </div>

                  <div className="col-span-2 dark:text-black">
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
                                <div>
                                  <b className="text-[#000236]">
                                    {alphabet[index]}-{" "}
                                  </b>
                                  <div
                                    dangerouslySetInnerHTML={createMarkup(
                                      option?.split("~")[1]
                                    )}
                                  />
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-2 dark:text-black">
                    <h2 className="font-bold pb-2">
                      Retroalimentaciones ingresadas por el docente:{" "}
                    </h2>
                    <div className="grid md:grid-cols-2 items-center gap-2">
                      {SeeQuestion?.Retro.map((option: any, index: number) => (
                        <div className={`flex `} key={index}>
                          {option?.posicion?.toUpperCase()}) {option?.texto}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {SeeQuestion?.Pregunta?.TipoPreguntas == 3 && (
              <>
                <div className="grid grid-cols-1">
                  <div>
                    <h2>
                      <span className="font-bold dark:text-black">
                        Pregunta:{" "}
                      </span>
                    </h2>

                    <Froala
                      ref={ref}
                      model={model}
                      onModelChange={handleModelChange}
                      tag="textarea"
                      config={{
                        attribution: false,
                        placeholder: "Start typing...",
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
                              "insertLink",
                              "insertImage",
                              "insertVideo",
                              "insertTable",
                              "emoticons",
                              "fontAwesome",
                              "specialCharacters",
                              "embedly",
                              "insertFile",
                              "insertHR",
                            ],
                          },
                          moreMisc: {
                            buttons: [
                              "undo",
                              "redo",
                              "fullscreen",
                              "print",
                              "getPDF",
                              "spellChecker",
                              "selectAll",
                              "html",
                              "help",
                            ],
                            align: "right",
                            buttonsVisible: 2,
                          },
                        },
                        pluginsEnabled: [
                          "table",
                          "spell",
                          "quote",
                          "save",
                          "quickInsert",
                          "paragraphFormat",
                          "paragraphStyle",
                          "help",
                          "draggable",
                          "align",
                          "link",
                          "lists",
                          "file",
                          "image",
                          "emoticons",
                          "url",
                          "video",
                          "embedly",
                          "colors",
                          "entities",
                          "inlineClass",
                          "inlineStyle",
                          "codeBeautif ",
                          "spellChecker",
                          "imageTUI",
                        ],
                      }}
                    />
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
            <div className="flex justify-around mt-3 gap-2">
              <button
                onClick={handlerAceptar}
                className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
              >
                Aceptar
              </button>
              <button
                className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
                onClick={handlerRechazar}
              >
                Rechazar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalSeeQuestion;
