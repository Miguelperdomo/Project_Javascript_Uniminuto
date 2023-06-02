"use client";
import { useEffect, useState } from "react";
import { VisibilidadModal } from "../../../typings";
import Select from "react-select";

type Props = {
  // type props useState
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
  setInfoTable: React.Dispatch<React.SetStateAction<[]>>;
};

const ModalAdd = ({ setShowModal, setInfoTable }: Props) => {
  const [Values, setValues] = useState<{
    TipoModulo: number | null;
    ModuloPrincipal: number | null;
    NombreModuloPrincipal: string | "";
  }>({
    TipoModulo: null,
    ModuloPrincipal: null,
    NombreModuloPrincipal: "",
  });
  const [Data, setData] = useState({} as any);

  const TipoModulo: any = [
    { value: 1, label: "Principal" },
    {
      value: 2,
      label: "Secundario",
    },
  ];

  const handerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Values?.TipoModulo === 2 && !Values?.ModuloPrincipal) {
      alert("Debe seleccionar un módulo principal");
      return;
    }

    const sentDataRes = await fetch("/api/Seguridad/AddModulo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Values),
    }).then((res) => res.json());

    const ModulosSubmodulos = await fetch(`/api/Seguridad/GetModulos`).then(
      (res) => res.json()
    );
    setInfoTable(ModulosSubmodulos?.Modulos);
    alert(sentDataRes?.body);
    setShowModal({ AddVisible: false });
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
            Agregar un Módulo
          </h1>

          <form onSubmit={handerSubmit}>
            <div className="grid sm:grid-cols-2 gap-2">
              <div className="mb-2">
                <label
                  htmlFor="Apellidos"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Tipo de Módulo <span className="text-red-900">(*)</span>
                </label>
                <Select
                  options={TipoModulo}
                  placeholder="Seleccione una opción"
                  onChange={(item: any) => {
                    setValues({
                      ...Values,
                      TipoModulo: item.value,
                      ModuloPrincipal: null,
                      NombreModuloPrincipal: "",
                    });
                  }}
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="Nombre"
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
                  placeholder="Ingrese nombre"
                  className="InputStyle"
                />
              </div>
            </div>
            {Values.TipoModulo === 2 && (
              <>
                <div className="grid sm:grid-cols-1 ">
                  <div className="mb-1">
                    <label
                      htmlFor="Usuario"
                      className="mb-3 block text-base font-medium text-gray-800 text-center"
                    >
                      Módulo Principal <span className="text-red-900">(*)</span>
                    </label>
                  </div>
                  <Select
                    options={Data?.Modulos}
                    placeholder="Seleccione una opción"
                    onChange={(item: any) => {
                      setValues({
                        ...Values,
                        ModuloPrincipal: item.Id,
                        NombreModuloPrincipal: item.NombreModulo,
                      });
                    }}
                    getOptionLabel={(option: any) => option.NombreModulo}
                    getOptionValue={(option: any) => option.Id}
                  />
                </div>
              </>
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

export default ModalAdd;
