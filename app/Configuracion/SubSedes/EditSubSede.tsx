"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { VisibilidadModal } from "../../../typings";
import Select from "react-select";

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
  InfoEditar: {
    IdSubSede?: number;
    NombreSubSede?: string;
    IdSede?: number;
  };
  setSubSedes: React.Dispatch<React.SetStateAction<any[]>>;
};

const EditSubSede = ({ InfoEditar, setShowModal, setSubSedes }: Props) => {
  const [Values, setValues] = useState({
    ...InfoEditar,
  } as {
    IdSubSede?: number;
    NombreSubSede?: string;
    IdSede?: number;
  });

  const [DataSedes, setDataSedes] = useState<any>({});

  const handerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const ResAdd = await axios.put(
        "/api/Configuracion/SubSedes/EditSubSede",
        {
          ...Values,
        }
      );

      const SubSedeRes = await axios.get(
        "/api/Configuracion/SubSedes/GetSedesSubSedes"
      );

      setSubSedes(SubSedeRes?.data?.SedesSubSedes);
      setShowModal((prev) => ({ ...prev, EditVisible: false }));

      alert(ResAdd?.data?.body);
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.body);
    }
  };

  const hanlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...Values, [e.target.name]: e.target.value.toUpperCase() });
  };

  const getData = async () => {
    try {
      const Res = await axios.get(
        "/api/Configuracion/SubSedes/GetSedesSubSedes"
      );

      let IndexDefault = Res?.data?.SedesSubSedes?.findIndex(
        (item: any) => item.IdSede == InfoEditar?.IdSede
      );

      setDataSedes({
        SubSedes: Res?.data?.SedesSubSedes,
        IndexDefault: IndexDefault,
      });
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.body);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-[#000236]/100 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
      <div className="container mx-auto  w-11/12 md:w-2/3 max-w-2xl">
        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <h1 className="text-center text-lg tracking-normal leading-tight mb-4 bg-[#151A8B] w-full text-white p-4 rounded-lg font-bold ">
            Editar <span title="Centro de operaciones académico">(COA)</span>
          </h1>

          <form onSubmit={handerSubmit}>
            <>
              <div className="">
                <div className="mb-2">
                  <label
                    htmlFor="NombreSubSede"
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
                    name="NombreSubSede"
                    id="NombreSubSede"
                    defaultValue={InfoEditar?.NombreSubSede}
                    required
                    onChange={hanlerChange}
                    placeholder="Ingrese el nombre de la Sede"
                    className="InputStyle"
                  />
                </div>
                <div>
                  <label
                    htmlFor="NombreSubSede"
                    className="mb-3 block text-base font-medium text-gray-800"
                  >
                    <span title="Sede">Sede</span>{" "}
                    <span className="text-red-900">(*)</span>
                  </label>

                  {DataSedes?.SubSedes && (
                    <Select
                      options={DataSedes?.SubSedes}
                      getOptionValue={(option) => option.IdSede}
                      getOptionLabel={(option) => option.NombreSede}
                      onChange={(e: any) => {
                        setValues({ ...Values, IdSede: e?.IdSede });
                      }}
                      placeholder="Seleccione una opción"
                      noOptionsMessage={() => "No hay opciones"}
                      defaultValue={
                        DataSedes?.SubSedes[DataSedes?.IndexDefault]
                      }
                    />
                  )}
                </div>
              </div>
            </>

            <div className="flex justify-around mt-3 gap-2">
              <button
                type="submit"
                className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
              >
                Editar
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

export default EditSubSede;
