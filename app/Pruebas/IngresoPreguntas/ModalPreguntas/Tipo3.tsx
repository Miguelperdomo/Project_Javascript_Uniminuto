import React, { useEffect, useState } from "react";
import Select from "react-select";
// Require Editor CSS files.
import { useSearchParams } from "next/navigation";

import { abecedario } from "../../../../utils/Abecedario";
import axios from "axios";

import { Revisiones, VisibilidadModal } from "../../../../typings";
type props = {
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
  setContador: React.Dispatch<React.SetStateAction<Revisiones>>;
  competencia: any;
  Prueba: any;
  Semestre: any;
  Editor: any;
};
function Tipo3({
  competencia,
  Prueba,
  Semestre,
  setShowModal,
  setContador,
  Editor,
}: props) {
  // DEFINICIÓN DE VARIABLES
  const [values, setValues] = useState([{}] as any);
  const [puntos, setPuntos] = useState(null);
  const [cantidadPreguntas, setCantidad] = useState([] as any);
  const [texto, setTexto] = useState("" as any);
  const letras = [] as any;

  const searchParams: any = useSearchParams();

  let cantidadRespuestas = 4;
  let obligatorias = 4;
  if (competencia.toLowerCase() == "inglés") {
    cantidadRespuestas = 8;
    obligatorias = 3;
  }
  async function getBase64FromUrls(urls: any) {
    const base64Strings = [];
    for (const url of urls) {
      const base64String = await getBase64FromUrl(url);
      base64Strings.push({ final: base64String, origen: url });
    }
    return base64Strings;
  }
  // TRAE LA INFORMACION DE LA IMAGEN EN BASE64
  function getBase64FromUrl(url: any) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = reject;
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    });
  }
  // TRAE LA INFORMACION DE LA IMAGEN INPUT EN BASE64
  function getBase64FromInput(input: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(input.files[0]);
    });
  }
  const num = [
    {
      label: 2,
      value: 2,
    },
    {
      label: 3,
      value: 3,
    },
    {
      label: 4,
      value: 4,
    },
    {
      label: 5,
      value: 5,
    },
    {
      label: 6,
      value: 6,
    },
    {
      label: 7,
      value: 7,
    },
    {
      label: 8,
      value: 8,
    },
    {
      label: 9,
      value: 9,
    },
    {
      label: 10,
      value: 10,
    },
  ];
  const tipos = [
    {
      label: "Seleccione",
      value: "",
    },
    {
      label: "Texto",
      value: "T",
    },
    {
      label: "Imagen",
      value: "I",
    },
  ];
  for (let index = 0; index < cantidadRespuestas; index++) {
    letras.push({
      id: index + 1,
      name: abecedario[index],
    });
  }
  const inputchange = (val: any, index: any, key: number) => {
    const cambia: any = document.querySelector(
      `[data-content="id${key}${index}"]`
    );
    if (val == "T") {
      cambia.type = "text";
    } else if (val == "I") {
      cambia.type = "file";
    } else {
      cambia.type = "hidden";
    }
  };
  const handleChange = (e: any, key: number) => {
    const { value, name } = e.target;
    const newData = [...values];
    newData[key] = {
      ...values[key],
      [name]: value,
    };
    setValues(newData);
  };
  useEffect(() => {
    const dataPreguntas = axios
      .post("/api/Pruebas/BaseInfoPreguntas", {
        prueba: Prueba,
        semestre: Semestre,
        competencia: competencia,
      })
      .then((res) => {
        if (res.status == 200) {
          setPuntos(res.data?.puntos);
        }
      });
  }, []);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!texto) {
      alert("Debe ingresar el contexto para las distintas preguntas");
      return false;
    }
    let contenidoTexto = texto?.includes("Froala")
      ? texto?.substring(0, texto?.length - 229)
      : texto;
    let imagenes = [];
    imagenes = contenidoTexto.split('"');
    imagenes = imagenes.filter((e: any) => e.includes("blob:"));
    if (imagenes.length > 0) {
      let retorno = await getBase64FromUrls(imagenes);
      retorno.map((res) => {
        contenidoTexto = contenidoTexto.replace(res.origen, res.final);
      });
    }
    setTexto(contenidoTexto);
    let puntTotal = 0;
    values.forEach(async (element: any, key: number) => {
      if (!element?.puntos || element?.puntos == 0) {
        alert("Debe ingresar el puntaje para la pregunta " + (key + 1));
        return false;
      }
      puntTotal += parseInt(element?.puntos);
      if (!element?.Pregunta) {
        alert(`Debe ingresar una contexto para la pregunta ${key + 1}`);
        return false;
      }
      let contenido = element?.Pregunta.includes("Froala")
        ? element?.Pregunta.substring(0, element?.Pregunta.length - 229)
        : element?.Pregunta;
      let imagenes = [];
      imagenes = contenido.split('"');
      imagenes = imagenes.filter((e: any) => e.includes("blob:"));
      if (imagenes.length > 0) {
        let retorno = await getBase64FromUrls(imagenes);
        retorno.map((res) => {
          contenido = contenido.replace(res.origen, res.final);
        });
      }
      element.Pregunta = contenido.replace(/'/g, "\"");
      if (element?.Respuestas?.length != obligatorias) {
        alert(
          `Debe registrar ${obligatorias} respuestas obligatoriamente para la pregunta ${key + 1
          }`
        );
        return false;
      }
      if (!element?.correcta) {
        alert(
          "Debe ingresar cual pregunta es la correcta para la pregunta" +
          (key + 1)
        );
        return false;
      }
    });
    console.log(puntTotal);
    if (puntTotal > (puntos || 0)) {
      alert(
        `La sumatoria de los puntos ingresados: ${puntTotal}, supera la cantidad de puntos posibles los cuales son: ${puntos}`
      );
    }
    axios
      .post("/api/Pruebas/Save/SavePregunta3", {
        data: values,
        text: contenidoTexto.replace(/'/g, "\""),
        competencia: competencia,
        prueba: Prueba,
        semestre: Semestre,
        IdRol: searchParams?.get("IdRol") || 0,
        IdUser: searchParams?.get("IdUser") || 0,
      })
      .then((res) => {
        if (res.status == 200) {
          alert(res.data?.body);
          setContador({ Contador: puntos || 0 });
          setShowModal({ AddVisible: false });
        }
      });
    console.log(
      "Values-->",
      values,
      "\r\nPuntos-->",
      puntos,
      "Texto-->",
      texto
    );
  };
  return (
    <>
      <div className="p-2 text-center">
        <h1 className="text-2xl font-bold">
          REGISTRO DE TEXTO PARA LAS MULTIPLES PREGUNTAS
        </h1>
      </div>
      <div className="mt-2 mb-2">
        <Editor
          onModelChange={(e: any) => {
            setTexto(e);
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
      </div>
      <div className="w-full">
        <Select
          options={num}
          className="z-50 w-1/3 mx-auto dark:text-black"
          onChange={(e: any) => {
            setCantidad(null);
            let newData = [];
            for (let i = 0; i < e.value; i++) {
              newData[i] = "Pregunta";
            }
            setCantidad(newData);
          }}
        />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <div className="text-center p-4">
          {(cantidadPreguntas.length &&
            cantidadPreguntas.map((res: any, key: number) => {
              return (
                <>
                  <div
                    className="mt-4 text-left text-xl dark:text-black"
                    key={key}
                  >
                    <h2>Pregunta {key + 1}</h2>
                  </div>
                  <div className="relative flex h-10 w-full justify-center overflow-clip rounded-lg">
                    <input
                      className="peer w-1/4 rounded-l-lg border border-slate-400 px-2 text-slate-900 placeholder-slate-400 transition-colors duration-300 focus:border-[#151A8B] focus:outline-none"
                      type="number"
                      required
                      disabled={puntos ? false : true}
                      min={0}
                      max={puntos || 0}
                      name="puntos"
                      onChange={(e: any) => {
                        handleChange(e, key);
                      }}
                      autoComplete="off"
                    />
                    <label
                      className="flex items-center rounded-r-lg border border-slate-400 bg-slate-50 px-2 text-sm text-slate-400 transition-colors duration-300 peer-focus:border-[#151A8B] peer-focus:bg-[#151A8B] peer-focus:text-white"
                      htmlFor="domain"
                    >
                      Puntos
                    </label>
                  </div>
                  <div className="mt-2">
                    <Editor
                      onModelChange={(e: any) => {
                        const newData = [...values];
                        newData[key] = {
                          ...values[key],
                          [`Pregunta`]: e,
                        };
                        setValues(newData);
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
                  </div>
                  <div className="grid grid-rows-3 grid-flow-col mt-2 gap-4">
                    {letras.map((letr: any, key2: number) => {
                      return (
                        <>
                          <div className="text-left flex flex-row align-middle items-center">
                            <input
                              className="mr-2"
                              required
                              type="radio"
                              name="correcta"
                              id="correcta"
                              value={letr.name}
                              onClick={(e: any) => {
                                handleChange(e, key);
                              }}
                            />
                            <span className="font-bold mr-2 dark:text-black">
                              {letr.name.toUpperCase()})
                            </span>
                            <Select
                              required
                              className="dark:text-black w-2/4"
                              options={tipos}
                              placeholder="Seleccione"
                              onChange={(e: any) => {
                                const data1 =
                                  (values[key]?.Opciones && [
                                    ...values[key]?.Opciones,
                                  ]) ||
                                  [];
                                data1[key2] = e.value;
                                const newData = [...values];
                                newData[key] = {
                                  ...values[key],
                                  [`Opciones`]: data1,
                                };
                                setValues(newData);
                                inputchange(e.value, letr.name, key);
                              }}
                            />
                            <input
                              autoComplete="off"
                              required
                              className="peer ml-2 rounded-md border border-slate-400 px-2 text-slate-900 placeholder-slate-400 transition-colors duration-300 focus:border-[#151A8B] focus:outline-none"
                              type="hidden"
                              onChange={(e: any) => {
                                const data1 =
                                  (values[key]?.Respuestas && [
                                    ...values[key]?.Respuestas,
                                  ]) ||
                                  [];
                                data1[key2] = e.target.value;
                                const newData = [...values];
                                newData[key] = {
                                  ...values[key],
                                  [`Respuestas`]: data1,
                                };
                                setValues(newData);
                              }}
                              name={`respuesta${letr.name}`}
                              data-content={`id${key}${letr.name}`}
                            />
                          </div>
                        </>
                      );
                    })}
                  </div>
                  <div className="p-2 text-center">
                    <h1 className="text-2xl font-bold dark:text-black">
                      REGISTRO DE RETROALIMENTACIONES
                    </h1>
                  </div>
                  <div className="grid grid-rows-3 grid-flow-col mt-2 gap-4">
                    {letras.map((letr: any, key2: number) => {
                      return (
                        <>
                          <div className="text-left flex flex-row align-middle items-center">
                            <span className="font-bold mr-2 dark:text-black">
                              {letr.name.toUpperCase()})
                            </span>
                            <input
                              autoComplete="off"
                              required
                              className="peer ml-2 rounded-md border border-slate-400 px-2 text-slate-900 placeholder-slate-400 transition-colors duration-300 focus:border-[#151A8B] focus:outline-none"
                              type="text"
                              onChange={(e: any) => {
                                const data1 =
                                  (values[key]?.Retro && [
                                    ...values[key]?.Retro,
                                  ]) ||
                                  [];
                                data1[key2] = e.target.value;
                                const newData = [...values];
                                newData[key] = {
                                  ...values[key],
                                  [`Retro`]: data1,
                                };
                                setValues(newData);
                              }}
                              name={`retro${letr.name}`}
                              data-content={`id${letr.name}`}
                            />
                          </div>
                        </>
                      );
                    })}
                  </div>
                </>
              );
            })) || (
              <span className="dark:text-black">
                Debe seleccionar una cantidad de preguntas
              </span>
            )}

          <div className="flex justify-around mt-3 gap-2">
            <button
              type="submit"
              className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
            >
              Guardar
            </button>
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
      </form>
    </>
  );
}

export default Tipo3;
