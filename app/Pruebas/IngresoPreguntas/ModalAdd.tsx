"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Select from "react-select";
import {
  preguntaIngreso,
  Revisiones,
  VisibilidadModal,
} from "../../../typings";
import Tipo1 from "./ModalPreguntas/Tipo1";
import Tipo2 from "./ModalPreguntas/Tipo2";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import Tipo3 from "./ModalPreguntas/Tipo3";
type Props = {
  // type props useState
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
  setContador: React.Dispatch<React.SetStateAction<Revisiones>>;
  data: any;
  Semestre: any;
  Prueba: any;
  DemasInfo: any;
};
const FroalaEditor = dynamic(
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
const ModalAdd = ({
  setShowModal,
  data,
  Semestre,
  Prueba,
  setContador,
}: Props) => {
  console.log("data", data);

  const [Values, setValues] = useState({} as preguntaIngreso);

  const preguntas = [
    {
      value: 1,
      label: "Tipo Icfes con una respuesta correcta",
    },
    {
      value: 2,
      label: "Tipo Icfes con distintas respuestas correctas",
    },
    {
      value: 3,
      label: "Un texto para distintas preguntas",
    },
    {
      value: 4,
      label: "Un texto para respuesta digitada por el estudiante",
    },
  ];
  const getData = async () => {
    try {
      const InfoBase = await fetch(
        `/api/Configuracion/Docentes/GetInfoModal`
      ).then((res) => res.json());
    } catch (error) {
      console.error(error);
      alert("Error al cargar la información");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-[#000236]/100 overflow-auto  transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
      <div className="container mx-auto   w-11/12 md:w-2/3 max-w-4xl  ">
        <div className="relative   py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400 ">
          <h1 className="text-center text-lg tracking-normal leading-tight mb-4 bg-[#151A8B] w-full text-white p-4 rounded-lg font-bold ">
            Agregar Preguntas para la competencia {data?.competencia || ""}
          </h1>

          <p>
            El tiempo designado para esta competencia es : Hora:{" "}
            {data?.DemasInfo?.Hora} - Minutos: {data?.DemasInfo?.Minutos}
          </p>
          <div className="space-y-2">
            <span>¿Tipo de Pregunta?</span>
            <Select
              className=" dark:text-black "
              options={preguntas}
              placeholder="Seleccione una opción "
              onChange={(e: any) =>
                setValues({ ...Values, tipo: parseInt(e?.value) })
              }
            />
          </div>

          {Values?.tipo == 1 && (
            <Tipo1
              Editor={FroalaEditor}
              setContador={setContador}
              competencia={data?.competencia || ""}
              Prueba={Prueba}
              Semestre={Semestre}
              setShowModal={setShowModal}
            />
          )}
          {Values?.tipo == 2 && (
            <Tipo2
              Editor={FroalaEditor}
              setContador={setContador}
              competencia={data.competencia || ""}
              Prueba={Prueba}
              Semestre={Semestre}
              setShowModal={setShowModal}
            />
          )}
          {Values?.tipo == 3 && (
            <Tipo3
              Editor={FroalaEditor}
              setContador={setContador}
              competencia={data.competencia || ""}
              Prueba={Prueba}
              Semestre={Semestre}
              setShowModal={setShowModal}
            />
          )}
          {Values?.tipo == 4 && "Tipo 4"}
        </div>
      </div>
    </div>
  );
};

export default ModalAdd;
