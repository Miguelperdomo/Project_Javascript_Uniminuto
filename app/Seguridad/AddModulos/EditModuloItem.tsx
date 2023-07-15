"use client";
import { useEffect, useState } from "react";
import { ItemSubModulo, VisibilidadModal } from "../../../typings";

import axios from "axios";

type Props = {
  // type props useState
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
  setEditInfo: React.Dispatch<React.SetStateAction<[]>>;
  ItemModulo: ItemSubModulo;
};

const EditModuloItem = ({ setShowModal, ItemModulo, setEditInfo }: Props) => {
  const [Values, setValues] = useState<{
    ModuloPrincipal: number | null;
    Nombre: string;
    Link: string;
    Id: number;
  }>({
    Nombre: ItemModulo?.SubModulo || "",
    ModuloPrincipal: ItemModulo?.ModuloPrincipal || null,
    Link: ItemModulo?.Link || "",
    Id: ItemModulo?.id || 0,
  });
  const [Data, setData] = useState({} as any);

  const handerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const UpdateInfo = await axios.put(
        `/api/Seguridad/UpdateSubModulo`,
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

  const getData = async () => {
    try {
      const InfoBase = await fetch(`/api/Seguridad/GetModulos`).then((res) =>
        res.json()
      );

      setData(InfoBase);
    } catch (error) {
      console.error(error);
      alert("Error al cargar la información");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-[#000236]/100 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
      <div className="container mx-auto  w-11/12 md:w-2/3 max-w-2xl">
        <div className="relative overflow-auto  max-h-screen  py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <h1 className="text-center text-lg tracking-normal leading-tight mb-4 bg-[#151A8B] w-full text-white p-4 rounded-lg font-bold ">
            Editar Sub Módulo
          </h1>

          <form onSubmit={handerSubmit}>
            <div className="grid sm:grid-cols-2 gap-2">
              <div className="mb-2">
                <label
                  htmlFor="Apellidos"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Nombre <span className="text-red-900">(*)</span>
                </label>
                <input
                  autoComplete="off"
                  autoFocus
                  type="text"
                  name="Nombre"
                  id="Nombre"
                  required
                  onChange={hanlerChange}
                  placeholder="Ingrese Nombre"
                  className="InputStyle"
                  defaultValue={ItemModulo.SubModulo}
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="Link"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Link <span className="text-red-900">(*)</span>
                </label>
                <input
                  autoComplete="off"
                  autoFocus
                  type="text"
                  name="Link"
                  id="Link"
                  required
                  onChange={hanlerChange}
                  placeholder="Ingrese Nombre"
                  className="InputStyle"
                  defaultValue={ItemModulo?.Link}
                />
              </div>
              <div className="mb-2 col-span-2">
                <label
                  htmlFor="ModuloPrincipal"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Módulo Principal <span className="text-red-900">(*)</span>
                </label>

                {Data?.Modulos?.length > 0 ? (
                  <select
                    id="ModuloPrincipal"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 "
                    onChange={(item) => {
                      setValues({
                        ...Values,
                        ModuloPrincipal: parseInt(item?.target.value),
                      });
                    }}
                  >
                    <option value="">Por favor, seleccione una opción</option>
                    {Data?.Modulos?.map((item: any, index: number) => (
                      <option
                        key={index}
                        selected={
                          ItemModulo?.ModuloPrincipal == item.Id ? true : false
                        }
                        value={item?.Id}
                      >
                        {item?.NombreModulo}
                      </option>
                    ))}
                  </select>
                ) : (
                  "Cargando..."
                )}
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
                  setShowModal({ AddVisible: false, EditVisible: false });
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

export default EditModuloItem;
