import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useSearchParams } from "next/navigation";

// Require Editor CSS files.

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
function Tipo1({
  competencia,
  Prueba,
  Semestre,
  setShowModal,
  setContador,
  Editor,
}: props) {
  const [values, setValues] = useState({} as any);
  const [puntos, setPuntos] = useState(null);
  const [pregunta, setPregunta] = useState(null as any);
  let cantidadRespuestas = 4;
  let obligatorias = 4;
  const searchParams: any = useSearchParams();

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
  const [selectRespuestas, setSelect] = useState([] as any);
  const [respuestas, setRespuesta] = useState([] as any);
  const [retro, setRetro] = useState([] as any);
  const letras = [];
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
  const inputchange = (val: any, index: any) => {
    const cambia: any = document.querySelector(`[data-content="id${index}"]`);
    if (val == "T") {
      cambia.type = "text";
    } else if (val == "I") {
      cambia.type = "file";
    } else {
      cambia.type = "hidden";
    }
  };
  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!pregunta.length || pregunta == null) {
      alert("Debe ingresar el contenido de la pregunta");
      return false;
    }
    if (!values?.correcta) {
      alert("Debe seleccionar la respuesta correcta");
      return false;
    }
    if (
      selectRespuestas.length != obligatorias ||
      selectRespuestas.indexOf("") > 0
    ) {
      alert(
        "Existen opciones de respuestas que son obligatorias que no se han ingresado, tenga en cuenta que la pregunta debe tener " +
          obligatorias +
          " opciones de respuesta"
      );
      return false;
    }
    if (respuestas.length != obligatorias || respuestas.indexOf("") > 0) {
      alert(
        "Existen respuestas que son obligatorias que no se han ingresado, tenga en cuenta que la pregunta debe tener " +
          obligatorias +
          " opciones de respuesta"
      );
      return false;
    }
    let contenido = pregunta.includes("Froala")
      ? pregunta.substring(0, pregunta.length - 229)
      : pregunta;
    let imagenes = [];
    imagenes = contenido.split('"');
    imagenes = imagenes.filter((e: any) => e.includes("blob:"));
    if (imagenes.length > 0) {
      let retorno = await getBase64FromUrls(imagenes);
      retorno.map((res) => {
        contenido = contenido.replace(res.origen, res.final);
      });
    }
    axios
      .post("/api/Pruebas/Save/SavePregunta1", {
        pregunta: contenido.replace(/'/g, '"'),
        correcta: values.correcta,
        respuestas: selectRespuestas,
        textos: respuestas,
        punto: values.puntos,
        competencia: competencia,
        prueba: Prueba,
        semestre: Semestre,
        retro: retro,
        IdRol: searchParams?.get("IdRol") || 0,
        IdUser: searchParams?.get("IdUser") || 0,
      })
      .then((res) => {
        console.log("res ---------------->");

        alert(res.data?.body);
        setContador({ Contador: puntos || 0 });
        setShowModal({ AddVisible: false });
      });
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
  return (
    <>
      <div className="p-2 text-center">
        <h1 className="text-2xl font-bold dark:text-black">
          REGISTRO DE PREGUNTA
        </h1>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <div className="text-center p-4">
          <div className="relative flex h-10 w-full justify-center overflow-clip rounded-lg">
            <input
              className="peer w-1/4 rounded-l-lg border border-slate-400 px-2 text-slate-900 placeholder-slate-400 transition-colors duration-300 focus:border-[#151A8B] focus:outline-none"
              type="text"
              required
              disabled={puntos ? false : true}
              min={0}
              max={puntos || 0}
              name="puntos"
              onChange={(e: any) => {
                handleChange(e);
              }}
              autoComplete="off"
              // validar pattern que sean numeros ejm 10, 20, 30,40,50  hasta 300 max
              // pattern="^([1-2][0-9]{1,1}0|300)$"
              title="Solo se permiten intervalos de 10 puntos, hasta un máximo de 300 puntos"
              placeholder="Puntos"
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
          </div>
          <div className="grid grid-rows-3 grid-flow-col mt-2 gap-4">
            {letras.map((letr, key) => {
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
                        handleChange(e);
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
                        const newData = [...selectRespuestas];
                        newData[key] = e.value;
                        setSelect(newData);
                        inputchange(e.value, letr.name);
                      }}
                    />
                    <input
                      autoComplete="off"
                      required
                      className="peer ml-2 rounded-md border border-slate-400 px-2 text-slate-900 placeholder-slate-400 transition-colors duration-300 focus:border-[#151A8B] focus:outline-none"
                      type="hidden"
                      onChange={(e: any) => {
                        const newData = [...respuestas];
                        newData[key] = e.target.value;
                        setRespuesta(newData);
                      }}
                      name={`respuesta${letr.name}`}
                      data-content={`id${letr.name}`}
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
            {letras.map((letr, key) => {
              return (
                <>
                  <div className="text-left flex flex-row align-middle items-center">
                    <span className="font-bold mr-2 dark:text-black">
                      {letr.name.toUpperCase()})
                    </span>
                    <input
                      autoComplete="off"
                      // required
                      className="peer ml-2 rounded-md border border-slate-400 px-2 text-slate-900 placeholder-slate-400 transition-colors duration-300 focus:border-[#151A8B] focus:outline-none"
                      type="text"
                      onChange={(e: any) => {
                        const newData = [...retro];
                        newData[key] = e.target.value;
                        setRetro(newData);
                      }}
                      name={`retro${letr.name}`}
                      data-content={`id${letr.name}`}
                    />
                  </div>
                </>
              );
            })}
          </div>
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

export default Tipo1;
