import {
  preguntaIngreso,
  Revisiones,
  VisibilidadModal,
} from "../../../typings";
import { useEffect, useState } from "react";
import Select from "react-select";
import Tipo1 from "./ModalPreguntas/Tipo1";
import Tipo2 from "./ModalPreguntas/Tipo2";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import Tipo3 from "./ModalPreguntas/Tipo3";
import dynamic from "next/dynamic";

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
  setContador: React.Dispatch<React.SetStateAction<Revisiones>>;
  data: any;
  Semestre: any;
  Prueba: any;
  DemasInfo: any;
preguntas:any
  agregarPregunta: (pregunta: any) => void;
};

const ModalAdd = ({
  setShowModal,
  data,
  Semestre,
  Prueba,
  agregarPregunta,
  setContador,
}: Props) => {
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

  const FroalaEditor = dynamic(
    () => import("react-froala-wysiwyg").then((module) => module.default),
    {
      loading: () => <p>Cargando el editor de texto...</p>,
      ssr: false,
    }
  );

  const handleSubmit = (pregunta: any) => {
    agregarPregunta(pregunta);
    setShowModal({ AddVisible: false }); // Envolver el valor booleano en un objeto VisibilidadModal
  };

  return (
    <div className="bg-[#000236]/100 overflow-auto  transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
      <div className="container mx-auto   w-11/12 md:w-2/3 max-w-4xl  ">
        <div className="relative   py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400 ">
          <h1 className="text-center text-lg tracking-normal leading-tight mb-4 bg-[#151A8B] w-full text-white p-4 rounded-lg font-bold ">
            Agregar Preguntas para la competencia {data?.competencia || ""}
          </h1>

          <p>
            El tiempo designado para esta competencia es: Hora:{" "}
            {data?.DemasInfo?.Hora} - Minutos: {data?.DemasInfo?.Minutos}
          </p>
          <div className="space-y-2">
            <span>¿Tipo de Pregunta?</span>
            <Select
              className="dark:text-black"
              options={preguntas}
              placeholder="Seleccione una opción"
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
              agregarPregunta={handleSubmit}
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
              // agregarPregunta={handleSubmit}
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
              // agregarPregunta={handleSubmit}
            />
          )}
          {Values?.tipo == 4 && "Tipo 4"}
        </div>
      </div>
    </div>
  );
};

export default ModalAdd;
