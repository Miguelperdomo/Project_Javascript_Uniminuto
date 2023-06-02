"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import Select from "react-select";
import { VisibilidadModal } from "../../../typings";

type Props = {
  // type props useState
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
  setRectorias: React.Dispatch<React.SetStateAction<any>>;
  InfoEditar?: {
    RectoriaSedeId?: number;
    NombreRectoria?: string;
    SedeIdRectoria?: number;
    IdRectoria?: number;
    NombreSede?: string;
    IdSedes?: number;
  };
};

const ModalEditSede = ({ setShowModal, setRectorias, InfoEditar }: Props) => {
  const [Values, setValues] = useState({
    NombreSede: InfoEditar?.NombreSede || "",
    SedeIdRectoria: InfoEditar?.SedeIdRectoria || "",
    IdSede: InfoEditar?.IdSedes || "",
  } as any);

  const [Data, setData] = useState({} as any);

  const handerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const res = await axios.put(
        "/api/Configuracion/SedeRectoria/PutSede",
        Values
      );

      const data = await fetch(
        `/api/Configuracion/SedeRectoria/GetRectoriaSede`
      ).then((res) => res.json());

      setRectorias(Object.values(data?.RectoriasSedes));
      setShowModal({
        Actualizar: false,
      });
      alert(res?.data?.body);
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.body);
    }
  };

  const hanlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...Values, [e.target.name]: e.target.value.toUpperCase() });
  };

  useEffect(() => {
    const getRectorias = async () => {
      try {
        const res = await axios("/api/Configuracion/SedeRectoria/GetRectorias");

        let IndexDefault = res?.data?.rectorias?.findIndex(
          (item: any) => item.Id == InfoEditar?.SedeIdRectoria
        );
        setData({
          ...res?.data,
          indexRectoria: IndexDefault,
        });
      } catch (error: any) {
        console.error(error);
        alert(error.response?.data?.body);
      }
    };

    getRectorias();
  }, []);
  return (
    <div className="bg-[#000236]/100 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
      <div className="container mx-auto  w-11/12 md:w-2/3 max-w-2xl">
        <div className="relative overflow-auto  max-h-screen  py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <h1 className="text-center text-lg tracking-normal leading-tight mb-4 bg-[#151A8B] w-full text-white p-4 rounded-lg font-bold ">
            Editar Sede
          </h1>

          <form onSubmit={handerSubmit}>
            <>
              <div className="">
                <div className="mb-2">
                  <label
                    htmlFor="NombreSede"
                    className="mb-3 block text-base font-medium text-gray-800"
                  >
                    Nombre Sede <span className="text-red-900">(*)</span>
                  </label>
                  <input
                    autoComplete="off"
                    autoFocus
                    type="text"
                    name="NombreSede"
                    id="NombreSede"
                    required
                    onChange={hanlerChange}
                    placeholder="Ingrese el nombre de la Sede"
                    className="InputStyle"
                    defaultValue={InfoEditar?.NombreSede}
                  />
                </div>
              </div>
              <label className="mb-3 block text-base font-medium text-gray-800">
                Rectoria <span className="text-red-900">(*)</span>
              </label>
              {Data?.rectorias?.length && (
                <Select
                  options={Data?.rectorias || []}
                  defaultValue={Data?.rectorias[Data?.indexRectoria]}
                  getOptionLabel={(option: any) => option.Nombre}
                  getOptionValue={(option: any) => option.Id}
                  placeholder="Seleccione una Rectoría"
                  onChange={(e: any) => {
                    setValues({ ...Values, SedeIdRectoria: e?.Id });
                  }}
                />
              )}
            </>
            <div className="flex justify-around mt-3 gap-2">
              <button
                type="submit"
                className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
              >
                Actualizar
              </button>
              <button
                className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal({
                    Actualizar: false,
                  });
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

export default ModalEditSede;
