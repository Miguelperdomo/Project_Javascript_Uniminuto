"use client";
import Loading from "@/app/loading";
import React, { useEffect } from "react";
import { ModulosPerfiles, VisibilidadModal } from "../../../typings";
import TitleButton from "../../Configuracion/TitleButton";
import ModalEdit from "./ModadEdit";
import ModalAdd from "./ModalAdd";
import Table from "./Table";

const BodyComponent = () => {
  const [perfiles, setPerfiles] = React.useState([] as ModulosPerfiles[]);
  const [ShowModal, setShowModal] = React.useState({} as VisibilidadModal);
  const [InfoEditar, setInfoEditar] = React.useState({} as ModulosPerfiles);
  const [isPending, setIsPending] = React.useState(false as boolean);

  useEffect(() => {
    const GetData = async () => {
      setIsPending(true);

      const data = await fetch(`/api/Seguridad/GetModulosPerfiles`).then(
        (res) => res.json()
      );
      const { perfiles } = data;

      setPerfiles(perfiles);
      setIsPending(false);
    };
    try {
      GetData();
    } catch (error) {
      console.log(error);
      alert("Error al obtener la información");
    }
  }, []);
  return (
    <>
      {ShowModal.AddVisible && (
        <ModalAdd setShowModal={setShowModal} setPerfiles={setPerfiles} />
      )}
      {ShowModal.EditVisible && (
        <ModalEdit
          setShowModal={setShowModal}
          setPerfiles={setPerfiles}
          InfoEditar={InfoEditar}
        />
      )}
      <TitleButton title="Módulos por perfil">
        <button
          autoFocus
          onClick={() => {
            setShowModal({
              AddVisible: true,
            });

            setInfoEditar({
              Id: 0,
              Nombre: "",
              Tipo: 0,
              Modulos: [],
            } as ModulosPerfiles);
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

          <span>Agregar Perfil</span>
        </button>
      </TitleButton>

      {isPending ? (
        <Loading />
      ) : (
        <Table
          info={perfiles}
          setPerfiles={setPerfiles}
          setInfoEditar={setInfoEditar}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export default BodyComponent;
