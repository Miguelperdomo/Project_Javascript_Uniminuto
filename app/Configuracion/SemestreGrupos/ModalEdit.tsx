"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { VisibilidadModal } from "../../../typings";

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
  setGradosGrupos: React.Dispatch<React.SetStateAction<[]>>;
  InfoGradoEditar: any;
};

const ModalEdit = ({
  setShowModal,
  setGradosGrupos,
  InfoGradoEditar,
}: Props) => {
  const [Values, setValues] = useState({
    Ubicacion: InfoGradoEditar?.GrupoUbicacion || "",
  } as {
    Ubicacion: string;
  });

  const handerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "/api/Configuracion/GradosGrupos/UpdateGrupos",
        {
          Values,
          Id: InfoGradoEditar?.GrupoId,
        }
      );

      const resGrados = await fetch(
        `/api/Configuracion/GradosGrupos/GetGradosGrupos?SubSede=${localStorage.getItem(
          "IdSubSede"
        )}`
      ).then((res) => res.json());

      setGradosGrupos(resGrados?.grados);
      setShowModal((prev) => ({ ...prev, EditVisible: false }));

      alert(response?.data?.body);
    } catch (error) {
      console.error("error", error);
    }
  };

  const hanlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...Values, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#000236]/100 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
      <div className="container mx-auto  w-11/12 md:w-2/3 max-w-2xl">
        <div className="relative overflow-auto  max-h-screen  py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <h1 className="text-center text-lg tracking-normal leading-tight mb-4 bg-[#151A8B] w-full text-white p-4 rounded-lg font-bold ">
            Editar Grupo {InfoGradoEditar?.pfc_grupo_nom || ""}
          </h1>

          <form onSubmit={handerSubmit}>
            <div className="grid sm:grid-cols-1 gap-2">
              <div className="mb-2">
                <label className="mb-3 block text-base font-medium text-gray-800">
                  Programa Académico
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  className="InputStyle"
                  disabled
                  readOnly
                  defaultValue={InfoGradoEditar?.Programa}
                />
              </div>
            </div>

            <div className=" grid sm:grid-cols-2 gap-2">
              <div className="mb-4">
                <label className="mb-3 block text-base font-medium text-gray-800">
                  Semestre Lectivo
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  className="InputStyle"
                  disabled
                  readOnly
                  defaultValue={InfoGradoEditar?.Semestre}
                />
                {/* <p>{InfoGradoEditar.pfc_grupo_sem}</p> */}
              </div>

              <div className="mb-2">
                <label
                  htmlFor="Orden"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Periodicidad
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  className="InputStyle "
                  disabled
                  readOnly
                  defaultValue={
                    (InfoGradoEditar?.Periodicidad == "C" && "Cuatrimestral") ||
                    (InfoGradoEditar?.Periodicidad == "S" && "Semestral") ||
                    ""
                  }
                />
              </div>
              <div className="mb-2 col-span-2">
                <label className="mb-3 block text-center text-base font-medium text-gray-800">
                  Fechas de Inicio y Fin
                </label>

                <input
                  autoComplete="off"
                  type="text"
                  className="InputStyle text-center"
                  disabled
                  defaultValue={InfoGradoEditar?.Lectivo}
                />
              </div>
            </div>

            <div>
              <div className="mb-2">
                <label
                  htmlFor="Ubicacion"
                  className="mb-3 block text-base font-medium text-gray-800 "
                >
                  Ubicación del aula de clase
                </label>
                <input
                  autoComplete="off"
                  autoFocus
                  type="text"
                  name="Ubicacion"
                  id="Ubicacion"
                  onChange={hanlerChange}
                  placeholder="Ingrese Ubicación Fisica"
                  className="InputStyle"
                  defaultValue={InfoGradoEditar?.GrupoUbicacion || ""}
                />
              </div>
            </div>
            <div className="flex justify-around mt-3 gap-2">
              <button
                type="submit"
                className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
              >
                Guardar
              </button>
              <button
                className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal((prev) => ({ ...prev, EditVisible: false }));
                }}
              >
                Cerrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalEdit;
