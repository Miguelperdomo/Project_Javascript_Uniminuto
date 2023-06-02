"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import Select from "react-select";
import { Rectoria, VisibilidadModal } from "../../../typings";
type Props = {
  // type props useState
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
  setRectorias: React.Dispatch<React.SetStateAction<any>>;
};

const ModalAdd = ({ setShowModal, setRectorias }: Props) => {
  const [Values, setValues] = useState(
    {} as {
      TipoAdd: number;
      Rectoria?: number;
      RectoriaSedeId?: number;
      NombreRectoria?: string;
    }
  );

  const [Data, setData] = useState(
    {} as {
      rectorias: Rectoria[];
    }
  );

  let options = [
    {
      value: 2,
      label: "Rectoría",
    },
    {
      value: 1,
      label: "Sede",
    },
  ];

  const handerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (Values.TipoAdd === 1 && !Values.RectoriaSedeId) {
        alert("Seleccione una Rectoría");
        return;
      }

      const res = await axios.post(
        "/api/Configuracion/SedeRectoria/AddSedeRectoria",
        Values
      );

      const data = await fetch(
        `/api/Configuracion/SedeRectoria/GetRectoriaSede`
      ).then((res) => res.json());

      setRectorias(Object.values(data?.RectoriasSedes));
      setShowModal({ AddVisible: false });

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

        setData(res?.data);
      } catch (error: any) {
        console.log(error);
        alert("Error al cargar las Rectorías");
      }
    };

    getRectorias();
  }, []);

  return (
    <div className="bg-[#000236]/100 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
      <div className="container mx-auto  w-11/12 md:w-2/3 max-w-2xl">
        <div className="relative overflow-auto  max-h-screen  py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <h1 className="text-center text-lg tracking-normal leading-tight mb-4 bg-[#151A8B] w-full text-white p-4 rounded-lg font-bold ">
            Agregar Rectoría o Sede
          </h1>

          <form onSubmit={handerSubmit}>
            <div className="mb-2">
              <Select
                autoFocus
                options={options}
                placeholder="¿Qué desea agregar?"
                onChange={(e: any) => {
                  setValues({ ...Values, TipoAdd: e?.value });
                }}
              />
            </div>

            {Values.TipoAdd === 1 ? (
              <>
                <div className="">
                  <div className="mb-2">
                    <label className="mb-3 block text-base font-medium text-gray-800">
                      Rectoría <span className="text-red-900">(*)</span>
                    </label>
                    <Select
                      options={Data?.rectorias || []}
                      getOptionLabel={(option: any) => option.Nombre}
                      getOptionValue={(option: any) => option.Id}
                      placeholder="Seleccione una Rectoría"
                      onChange={(e: any) => {
                        setValues({ ...Values, RectoriaSedeId: e?.Id });
                      }}
                      noOptionsMessage={() => "No hay opciones"}
                    />
                    <label
                      htmlFor="NombreSede"
                      className="mb-3 mt-2 block text-base font-medium text-gray-800"
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
                    />
                  </div>
                </div>
              </>
            ) : (
              Values.TipoAdd === 2 && (
                <>
                  <div className="">
                    <div className="mb-2">
                      <label
                        htmlFor="NombreRectoria"
                        className="mb-3 block text-base font-medium text-gray-800"
                      >
                        Nombre Rectoría
                        <span className="text-red-900">(*)</span>
                      </label>
                      <input
                        autoComplete="off"
                        autoFocus
                        type="text"
                        name="NombreRectoria"
                        id="NombreRectoria"
                        required
                        onChange={hanlerChange}
                        placeholder="Ingrese el nombre de la Rectoría"
                        className="InputStyle"
                      />
                    </div>
                  </div>
                </>
              )
            )}
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
                  setShowModal({ AddVisible: false });
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

export default ModalAdd;
