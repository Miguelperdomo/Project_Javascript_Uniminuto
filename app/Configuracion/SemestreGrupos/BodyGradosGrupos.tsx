"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { VisibilidadModal } from "../../../typings";
import TitleButton from "../TitleButton";
import Loading from "./loading";
import ModalAdd from "./ModalAdd";
import ModalEdit from "./ModalEdit";
import TableGradosGrupos from "./TableGradosGrupos";

type Props = {
  grados: Array<any>;
};
const BodyGradosGrupos = () => {
  const [showModal, setShowModal] = useState({
    AddVisible: false,
    EditVisible: false,
  } as VisibilidadModal);
  const [gradosGrupos, setGradosGrupos] = useState<any>([]);
  const [InfoGradoEditar, setInfoGradoEditar] = useState<any>({});

  const searchParams = useSearchParams();
  const [isPending, setIsPending] = useState(false as boolean);

  useEffect(() => {
    const GetData = async () => {
      setIsPending(true);
      const SubSede = searchParams.get("SubSede");

      const data = await fetch(
        `/api/Configuracion/GradosGrupos/GetGradosGrupos?SubSede=${SubSede}`
      ).then((res) => res?.json());

      setGradosGrupos(data?.grados || []);
      setIsPending(false);
    };

    try {
      GetData();
    } catch (error) {
      console.log(error);
      alert("Error al cargar los datos");
    }
  }, []);
  return (
    <>
      {showModal?.AddVisible && (
        <ModalAdd
          setShowModal={setShowModal}
          setGradosGrupos={setGradosGrupos}
        />
      )}
      {showModal?.EditVisible && (
        <ModalEdit
          setShowModal={setShowModal}
          InfoGradoEditar={InfoGradoEditar}
          setGradosGrupos={setGradosGrupos}
        />
      )}
      <TitleButton title="Semestres y Grupos">
        <div>
          <button
            autoFocus
            onClick={() =>
              setShowModal((prev) => ({ ...prev, AddVisible: true }))
            }
            className="BtnHeader hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
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

            <span>Agregar Grupos</span>
          </button>
        </div>
      </TitleButton>
      {isPending ? (
        <Loading />
      ) : (
        <TableGradosGrupos
          info={gradosGrupos}
          setGradosGrupos={setGradosGrupos}
          setInfoGradoEditar={setInfoGradoEditar}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export default BodyGradosGrupos;
