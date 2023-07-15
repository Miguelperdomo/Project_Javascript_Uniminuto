"use client";
// import React from "react";
import React, { useState } from "react";
import { Estudiante, VisibilidadModal } from "../../../typings";
import TitleButton from "../TitleButton";
import ModalEdit from "./ModalEdit";

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

  return (
    <>
      <TitleButton title="Configuración Registro Académico">
        <p>Vacio</p>
      </TitleButton>
      <ModalEdit
        setShowModal={setShowModal}
        InfoEditar={InfoEditar}
        setEstudiante={setEstudiante}
      />
    </>
  );
};

export default BodyComponent;
