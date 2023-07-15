"use client";
import Loading from "@/app/loading";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import BodyComponent from "./BodyComponent";
import { ItemCompetencia } from "./ItemCompetencia";
import NewModalQuestion from "./NewModalQuestion";

const NewBody = () => {
  const searchParams = useSearchParams();
  const [Data, setData] = React.useState<any>({});
  const [LoadingData, setLoadingData] = React.useState<boolean>(false);

  const [ShowModal, setShowModal] = React.useState({
    Show: false,
    Questions: [],
    TipoPreguntas: "",
  } as {
    Show: boolean;
    Questions: any[];
    TipoPreguntas: string;
  });

  const getData = async () => {
    setLoadingData(true);
    const SubSede = searchParams?.get("SubSede");

    const res = await fetch(
      `/api/Pruebas/GetAllPreguntas?SubSede=${SubSede || 0}`
    ).then((res) => res.json());
    setData(res);
    setLoadingData(false);

    if (ShowModal?.Show && ShowModal?.TipoPreguntas == "Aprobadas") {
      setShowModal({
        ...ShowModal,
        Questions: res?.Genericas?.Aprobadas?.Preguntas,
      });
    }

    if (ShowModal?.Show && ShowModal?.TipoPreguntas == "Pendientes") {
      setShowModal({
        ...ShowModal,
        Questions: res?.Genericas?.Pendientes?.Preguntas,
      });
    }
    if (ShowModal?.Show && ShowModal?.TipoPreguntas == "NoAprobadas") {
      setShowModal({
        ...ShowModal,
        Questions: res?.Genericas?.NoAprobadas?.Preguntas,
      });
    }
  };

  useEffect(() => {
    try {
      getData();
    } catch (error) {
      console.log(error);
      alert("Error al cargar los datos");
    }
  }, []);

  return (
    <div className="space-y-3 mt-3 px-8">
      {ShowModal.Show && (
        <NewModalQuestion
          ShowModal={ShowModal}
          setShowModal={setShowModal}
          getData={getData}
        />
      )}
      {LoadingData ? (
        <Loading />
      ) : (
        <>
          <ItemCompetencia
            Title="Genéricas"
            Competencias={Data?.Genericas || []}
            setShowModal={setShowModal}
          />
          {/* <ItemCompetencia
            Title="Espeficifica"
            Competencias={Data?.Espeficificas || []}
            setShowModal={setShowModal}
          /> */}

          <h2 className=" text-2xl font-bold pb-2">Específicas</h2>

          <BodyComponent />
        </>
      )}
    </div>
  );
};

export default NewBody;
