"use client";
import React, { useState } from "react";
import { Estudiante, VisibilidadModal } from "../../../typings";
import TitleButton from "../../Configuracion/TitleButton";
import FormRequerir from "./FormRequerir";
import TableRequerir from "./TableRequerir";

type props = {
  data: Estudiante[];
};

const BodyComponent = ({ data }: props) => {
  const [ShowModal, setShowModal] = useState({
    AddVisible: false,
    EdditVisible: false,
  } as VisibilidadModal);

  const [Estudiante, setEstudiante] = useState<Estudiante[]>(data);
  const [InfoEditar, setInfoEditar] = useState({} as Estudiante);
  const [ShowImage, setShowImage] = useState<{
    Image: string;
    Visible: boolean;
  }>({
    Image: "",
    Visible: false,
  });
  return (
    <>
      <TitleButton title="Requerimientos">
        <button
          autoFocus
          onClick={() => {
            setInfoEditar({} as any);

            setShowModal({
              AddVisible: true,
            });
          }}
          className=" BtnHeader hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <span>Agregar Requerimiento</span>
        </button>
      </TitleButton>

      {ShowModal.AddVisible && (
        <FormRequerir
          setShowModal={setShowModal}
          setEstudiante={setEstudiante}
          InfoEditar={InfoEditar}
        />
      )}
      <TableRequerir
        info={Estudiante}
        setEstudiante={setEstudiante}
        setShowModal={setShowModal}
        setInfoEditar={setInfoEditar}
        setShowImage={setShowImage}
      />
    </>
  );
};

export default BodyComponent;
