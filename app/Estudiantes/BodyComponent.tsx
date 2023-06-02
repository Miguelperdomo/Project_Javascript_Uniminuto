"use client";
import React, { useEffect, useState } from "react";
import { Estudiante, VisibilidadModal } from "../../typings";
import TitleButton from "../Configuracion/TitleButton";
import ModalAddEstu from "./ModalAddEstu";
import TableEstudiantes from "./TableEstudiantes";
import { Lightbox } from "react-modal-image";
import Title from "../Title";
import { useSearchParams } from "next/navigation";
import Loading from "../loading";

type props = {
  InfoUser: {
    IdRol: number;
  };
};

const BodyComponent = ({ InfoUser }: props) => {
  const [ShowModal, setShowModal] = useState({
    AddVisible: false,
    EdditVisible: false,
  } as VisibilidadModal);
  const [Estudiante, setEstudiante] = useState<Estudiante[]>([]);

  const [InfoEditar, setInfoEditar] = useState({} as Estudiante);

  const [ShowImage, setShowImage] = useState<{
    Image: string;
    Visible: boolean;
  }>({
    Image: "",
    Visible: false,
  });
  const searchParams = useSearchParams();
  const [isPending, setIsPending] = useState(false as boolean);

  const getData = async () => {
    try {
      setIsPending(true);
      const SubSede = searchParams.get("SubSede");

      const data: any = await fetch(
        `/api/Configuracion/CargaMasiva/GetStudents?SubSede=${SubSede}`
      ).then((res) => res.json());
      setEstudiante(data?.estudiantes || []);
      setIsPending(false);
    } catch (error) {
      console.log(error);
      alert("Error al cargar los datos");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {ShowModal.AddVisible && (
        <ModalAddEstu
          setShowModal={setShowModal}
          setEstudiante={setEstudiante}
          InfoEditar={InfoEditar}
        />
      )}

      {InfoUser?.IdRol != 2 ? (
        <TitleButton title="Estudiantes">
          {
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

              <span>Agregar Estudiante</span>
            </button>
          }
        </TitleButton>
      ) : (
        <Title title="Estudiantes" />
      )}

      {ShowImage?.Visible && (
        <Lightbox
          medium={ShowImage?.Image}
          // large={ShowImage?.Image}
          // alt="Imagen COlaborador"
          onClose={(ShowImage: any) =>
            setShowImage({ Image: "", Visible: false })
          }
          hideDownload={true}
          hideZoom={true}
          showRotate={false}
        />
      )}
      {isPending ? (
        <Loading />
      ) : (
        <TableEstudiantes
          info={Estudiante}
          setEstudiante={setEstudiante}
          setShowModal={setShowModal}
          setInfoEditar={setInfoEditar}
          setShowImage={setShowImage}
          InfoUser={InfoUser}
        />
      )}
    </>
  );
};

export default BodyComponent;
