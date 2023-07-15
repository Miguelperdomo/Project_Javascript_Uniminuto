"use client";
import axios from "axios";
import { useState } from "react";
import { v4 as uuid } from "uuid";

import { VisibilidadModal } from "../../../typings";
type Props = {
  Config: {};
  setSubSedes: React.Dispatch<React.SetStateAction<any[]>>;
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
};

const AddSubSede = ({ Config, setShowModal, setSubSedes }: Props) => {
  const [Values, setValues] = useState({
    ...Config,
  } as {
    TipoAdd: number;
    Rectoria?: number;
    RectoriaSedeId?: number;
    NombreRectoria?: string;
  });

  const handerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const id = uuid();

      const ResAdd = await axios.post(
        "/api/Configuracion/SubSedes/AddSubSede",
        {
          ...Values,
          id,
        }
      );
      const SubSedeRes = await axios.get(
        "/api/Configuracion/SubSedes/GetSedesSubSedes"
      );

      setSubSedes(SubSedeRes?.data?.SedesSubSedes);
      setShowModal((prev) => ({ ...prev, EditVisible: false }));
      setShowModal({
        AddVisible: false,
      });
      alert(ResAdd?.data?.body);
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.body);
    }
  };

  const hanlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...Values, [e.target.name]: e.target.value.toUpperCase() });
  };

  return (
    <div className="bg-[#000236]/100 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
      <div className="container mx-auto  w-11/12 md:w-2/3 max-w-2xl">
        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <h1 className="text-center text-lg tracking-normal leading-tight mb-4 bg-[#151A8B] w-full text-white p-4 rounded-lg font-bold ">
            Agregar <span title="Centro de operaciones académico">(COA)</span>
          </h1>

          <form onSubmit={handerSubmit}>
            <>
              <div className="">
                <div className="mb-2">
                  <label
                    htmlFor="NombreCoa"
                    className="mb-3 block text-base font-medium text-gray-800"
                  >
                    Nombre{" "}
                    <span title="Centro de operaciones académico">(COA)</span>{" "}
                    <span className="text-red-900">(*)</span>
                  </label>
                  <input
                    autoComplete="off"
                    autoFocus
                    type="text"
                    name="NombreCoa"
                    id="NombreCoa"
                    required
                    onChange={hanlerChange}
                    placeholder="Ingrese el nombre del COA"
                    className="InputStyle"
                  />
                </div>
              </div>
            </>

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
                  setShowModal({
                    AddVisible: false,
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

export default AddSubSede;
