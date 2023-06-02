"use client";
import { useEffect, useState } from "react";
import { Administrativo, VisibilidadModal } from "../../../typings";
import Header from "./Header";
import TableAdministrativos from "./TableAdministrativos";
import { Lightbox } from "react-modal-image";
import { useSearchParams } from "next/navigation";
import Loading from "./loading";

type props = {
  data: Administrativo[];
};

const BodyComponent = () => {
  const [administrativos, setAdministrativos] = useState<Administrativo[]>([]);
  const searchParams = useSearchParams();
  const [isPending, setIsPending] = useState(false as boolean);

  const [showModal, setShowModal] = useState<VisibilidadModal>({
    AddVisible: false,
    EditVisible: false,
  });

  const [InfoEditar, setInfoEditar] = useState({} as Administrativo);

  const [ShowImage, setShowImage] = useState<{
    Image: string;
    Visible: boolean;
  }>({
    Image: "",
    Visible: false,
  });

  const getData = async () => {
    try {
      setIsPending(true);
      const SubSede: any = searchParams.get("SubSede");

      const data: any = await fetch(
        `/api/Configuracion/Administrativos/GetAdministrativos?SubSede=${SubSede}`
      ).then((res) => res.json());
      const administrativos: Administrativo[] = data.administrativos;
      setAdministrativos(administrativos);
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
      <Header
        setAdministrativos={setAdministrativos}
        setShowModal={setShowModal}
        showModal={showModal}
        InfoEditar={InfoEditar}
      />
      {isPending ? (
        <Loading />
      ) : (
        <>
          <TableAdministrativos
            info={administrativos}
            setAdministrativos={setAdministrativos}
            setShowModal={setShowModal}
            setInfoEditar={setInfoEditar}
            setShowImage={setShowImage}
          />
        </>
      )}
    </>
  );
};

export default BodyComponent;
