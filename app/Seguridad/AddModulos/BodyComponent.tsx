"use client";
import Loading from "@/app/loading";
import React, { useEffect, useState } from "react";
import { ItemSubModulo, VisibilidadModal } from "../../../typings";
import TitleButton from "../../Configuracion/TitleButton";
import EditModuloItem from "./EditModuloItem";
import EditPrincipal from "./EditPrincipal";

import ModalAdd from "./ModalAdd";
import Table from "./Table";

const BodyComponent = () => {
  const [ShowModal, setShowModal] = useState({
    AddVisible: false,
    EditVisible: false,
    Actualizar: false,
  } as VisibilidadModal);
  const [Data, setData] = useState([] as any);

  const [ItemModulo, setItemModulo] = useState({} as ItemSubModulo);

  const [isPending, setIsPending] = useState(false as boolean);

  const [InfoUpdatePrincipal, setInfoUpdatePrincipal] = useState({} as any);

  useEffect(() => {
    const GetData = async () => {
      setIsPending(true);

      const data = await fetch(`/api/Seguridad/GetModulos`).then((res) =>
        res.json()
      );
      const { Modulos } = data;

      setData(Modulos);
      setIsPending(false);
    };
    try {
      GetData();
    } catch (error) {
      console.error(error);
      alert("Error al obtener la información");
    }
  }, []);

  return (
    <>
      {ShowModal.AddVisible && (
        <ModalAdd setShowModal={setShowModal} setInfoTable={setData} />
      )}

      {ShowModal.EditVisible && (
        <EditModuloItem
          setShowModal={setShowModal}
          ItemModulo={ItemModulo}
          setEditInfo={setData}
        />
      )}
      {ShowModal.Actualizar && (
        <EditPrincipal
          setShowModal={setShowModal}
          PrincipalModulo={InfoUpdatePrincipal}
          setEditInfo={setData}
        />
      )}
      <TitleButton title="Consulta de módulos">
        <button
          autoFocus
          onClick={() =>
            setShowModal({
              AddVisible: true,
            })
          }
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

          <span>Agregar Módulo</span>
        </button>
      </TitleButton>
      {isPending ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <Table
            info={Data}
            setInfoEditar={setData}
            setItemModulo={setItemModulo}
            setShowModal={setShowModal}
            setInfoUpdatePrincipal={setInfoUpdatePrincipal}
          />
        </>
      )}
    </>
  );
};

export default BodyComponent;
