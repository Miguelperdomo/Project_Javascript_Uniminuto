"use client";
import Image from "next/image";
import React, { useState } from "react";
import { SeccionGuardada, visibleFormulario } from "../../../typings";
import ModalDatosAcademicos from "./Modals/ModalDatosAcademicos";
import ModalInfEstudiante from "./Modals/ModalInfEstudiante";
import ModalNecesidadesEducativa from "./Modals/ModalNecesidadesEducativa";
import ModalSaludEstudiante from "./Modals/ModalSaludEstudiante";
import ModalVictimaConflicto from "./Modals/ModalVictimaConflicto";
type Props = {
  data: {
    documento: number;
    save?: SeccionGuardada;
    informacion: {
      seccion: string;
      id: number;
      comparar: string;
      save: boolean;
    };
    count: number;
  };
};
const DatosAcademicos = ({ data }: Props) => {
  const [visible, setVisible] = useState({
    DatosAcademicos: false,
    InfoStudent: false,
    NecesidadesEducativas: false,
    VictimaConflicto: false,
    SaludStudent: false,
  } as visibleFormulario);
  return (
    <>
      {visible?.DatosAcademicos && (
        <ModalDatosAcademicos
          setVisible={setVisible}
          Documento={data.documento}
        />
      )}
      {visible.InfoStudent && (
        <ModalInfEstudiante
          Documento={data.documento}
          setVisible={setVisible}
        />
      )}
      {visible.NecesidadesEducativas && (
        <ModalNecesidadesEducativa
          Documento={data.documento}
          setVisible={setVisible}
        />
      )}

      {visible.VictimaConflicto && (
        <ModalVictimaConflicto
          Documento={data.documento}
          setVisible={setVisible}
        />
      )}
      {visible.SaludStudent && (
        <ModalSaludEstudiante
          Documento={data.documento}
          setVisible={setVisible}
        />
      )}

      <>
        <div className={`container mx-auto `}>
          <div className="bg-white max-w-xs mx-auto rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
            <div
              id={`${data?.informacion?.id}`}
              onClick={(e) => {
                e.preventDefault();
                if (data?.informacion?.id == 1) {
                  setVisible({
                    ...visible,
                    DatosAcademicos: true,
                  });
                }
                if (data?.informacion?.id == 2) {
                  setVisible({
                    ...visible,
                    InfoStudent: true,
                  });
                }
                if (data?.informacion?.id == 3) {
                  setVisible({
                    ...visible,
                    NecesidadesEducativas: true,
                  });
                }

                if (data?.informacion?.id == 6) {
                  setVisible({
                    ...visible,
                    VictimaConflicto: true,
                  });
                }
                if (data?.informacion?.id == 7) {
                  setVisible({
                    ...visible,
                    SaludStudent: true,
                  });
                }
              }}
              className={`h-24  flex items-center justify-around ${
                (data?.informacion?.save && "bg-green-500") || "bg-red-500"
              } `}
            >
              <h1 className="text-white ml-4 border-2 py-2 px-4 rounded-full">
                {data?.count + 1}
              </h1>
              <p className="text-center text-white text-lg">
                {data?.informacion?.seccion}
              </p>
            </div>
            <div className="h-[180px] w-full">
              <Image
                width={1280}
                height={850}
                objectFit="fill"
                src={"/EnConstruccion.webp"}
                alt={`Miniatura${data?.informacion?.id}`}
              />
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default DatosAcademicos;
