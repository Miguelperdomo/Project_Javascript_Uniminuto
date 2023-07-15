"use client";
import { useEffect, useState } from "react";
import { Administrativo, VisibilidadModal } from "../../../typings";
import EncriptarContraseña from "../../../utils/EncriptarContraseña";
import HojadeVida from "./HojadeVida";

type Props = {
  // type props useState
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
  setAdministrativos: React.Dispatch<React.SetStateAction<Administrativo[]>>;
  InfoEditar: Administrativo;
};

const ModalUpgrade = ({
  setShowModal,
  setAdministrativos,
  InfoEditar,
}: Props) => {
  const [Values, setValues] = useState({} as Administrativo);
  const [Data, setData] = useState({} as any);

  const getData = async () => {
    try {
      const InfoBase = await fetch(
        `/api/Configuracion/Administrativos/GetInfoModal`
      ).then((res) => res.json());

      let IndexDefault = InfoBase?.documentos?.findIndex(
        (item: any) => item?.id == InfoEditar?.TipoDocumento
      );
      let IndexDefaultRol = InfoBase?.roles?.findIndex(
        (item: any) => item?.Id == InfoEditar?.TipoUsuario
      );

      setData(InfoBase);
      setValues({
        ...Values,
        ...InfoEditar,
        Password: EncriptarContraseña(),
        IndexDocumento: IndexDefault,
        IndexRol: IndexDefaultRol,
      });
    } catch (error) {
      console.error(error);
      alert("Error al cargar la información");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-[#000236]/100 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
      <div className="container mx-auto  w-11/12 md:w-2/3 max-w-4xl">
        <div className="relative overflow-auto  max-h-screen  py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <h1 className="text-center text-lg tracking-normal leading-tight mb-4 bg-[#151A8B] w-full text-white p-4 rounded-lg font-bold ">
            Datos Colaborador
          </h1>
          <HojadeVida
            setShowModal={setShowModal}
            InfoEditar={InfoEditar}
            setValues={setValues}
            Values={Values}
            Data={Data}
            setAdministrativos={setAdministrativos}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalUpgrade;
