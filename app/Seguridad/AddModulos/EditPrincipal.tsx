"use client";
import { useState } from "react";
import { VisibilidadModal } from "../../../typings";

import axios from "axios";

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
  setEditInfo: React.Dispatch<React.SetStateAction<[]>>;
  PrincipalModulo: {
    NombreModulo: string;
    Id: number;
  };
};

const EditPrincipal = ({
  setShowModal,
  setEditInfo,
  PrincipalModulo,
}: Props) => {
  const [Values, setValues] = useState<{
    NombreModulo: string | "";
    Id: number | null;
  }>({
    NombreModulo: PrincipalModulo?.NombreModulo || "",
    Id: PrincipalModulo?.Id || null,
  });

  const handerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const UpdateInfo = await axios.put(
        `/api/Seguridad/UpdateModuloPrincipal`,
        Values
      );

      const data = await fetch(`/api/Seguridad/GetModulos`).then((res) =>
        res.json()
      );

      setEditInfo(data?.Modulos);
      setShowModal({ AddVisible: false, EditVisible: false });
      alert(UpdateInfo?.data?.body);
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.body || "Error al actualizar la información"
      );
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
            Editar Módulo Principal
          </h1>

          <form onSubmit={handerSubmit}>
            <div className="grid">
              <div className="mb-2">
                <label
                  htmlFor="NombreModulo"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Nombre Módulo <span className="text-red-900">(*)</span>
                </label>
                <input
                  autoComplete="off"
                  autoFocus
                  type="text"
                  name="NombreModulo"
                  id="NombreModulo"
                  required
                  onChange={hanlerChange}
                  placeholder="Ingrese NombreModulo"
                  className="InputStyle"
                  defaultValue={PrincipalModulo.NombreModulo}
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
                  setShowModal({ Actualizar: false });
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

export default EditPrincipal;
