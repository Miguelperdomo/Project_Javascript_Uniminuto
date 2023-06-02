"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modulos, ModulosPerfiles, VisibilidadModal } from "../../../typings";
import ModuloItem from "./ModuloItem";

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
  setPerfiles: React.Dispatch<React.SetStateAction<ModulosPerfiles[]>>;
  InfoEditar: ModulosPerfiles;
};

type data = {
  Modulos: Modulos[];
};

const ModalEdit = ({ setShowModal, setPerfiles, InfoEditar }: Props) => {
  console.log(
    "🚀 ~ file: ModadEdit.tsx:18 ~ ModalEdit ~ InfoEditar",
    InfoEditar
  );

  const [Values, setValues] = useState<ModulosPerfiles>({
    Nombre: InfoEditar?.Nombre || "",
    Tipo: InfoEditar?.Tipo || null,
    Rol: InfoEditar?.Rol || null,
    Id: InfoEditar?.Id || null,
  });

  const [Data, setData] = useState({} as data);
  const [ListaModulosSelected, setListaModulosSelected] = useState<any>([]);

  const hanlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sentDataRes = await fetch("/api/Seguridad/UpdateModulosPerfil", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Values,
        ListaModulosSelected,
      }),
    }).then((res) => res.json());

    const getPerfiles = await fetch("/api/Seguridad/GetModulosPerfiles").then(
      (res) => res.json()
    );
    setPerfiles(getPerfiles?.perfiles || []);
    setShowModal({
      AddVisible: false,
    });
    alert(sentDataRes?.body);
  };

  const hanlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...Values, [e.target.name]: e.target.value });
    setListaModulosSelected([]);
  };

  const Tipo = [
    { value: 1, label: "Colaborador" },
    { value: 2, label: "Profesor" },
    { value: 3, label: "Estudiante" },
    { value: 4, label: "Acudiente" },
  ];

  const GetData = async () => {
    const getModulos = await axios("/api/Seguridad/GetModulosSelect", {
      params: {
        Id: InfoEditar?.Id || null,
      },
    });

    setData(getModulos.data || []);
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <>
      <div className="bg-[#000236]/100 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
        <div className="container mx-auto  w-11/12 md:w-2/3 max-w-6xl">
          <form
            onSubmit={hanlerSubmit}
            className="py-4  px-5 md:px-10 bg-white shadow-md rounded border border-gray-400 "
          >
            <h1 className="text-center text-lg tracking-normal leading-tight mb-4 bg-[#151A8B] w-full text-white p-4 rounded-lg font-bold ">
              Editar Perfil
            </h1>

            <div className=" rounded-lg bg-gray-50  ">
              <div className="  grid sm:grid-cols-2 gap-2">
                <div className="mb-6">
                  <label
                    htmlFor="Nombre"
                    className="mb-3 block text-base font-medium text-gray-800 capitalize"
                  >
                    Nombre del Perfil <span className="text-red-900">(*)</span>
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
                    defaultValue={Values?.Nombre}
                    title="Complete Este Campo Solo con Letras"
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="Rol"
                    className="mb-3 block text-base font-medium text-gray-800"
                  >
                    Rol <span className="text-red-900">(*)</span>
                  </label>

                  <select
                    id="Rol"
                    required
                    name="Rol"
                    onChange={(e) => {
                      setValues({ ...Values, [e.target.name]: e.target.value });
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Seleciona una opcion</option>

                    {Tipo.map((item, key) => (
                      <option
                        key={key}
                        selected={Values?.Tipo === item.value}
                        value={item.value}
                      >
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <>
              <div className=" max-h-[23rem] overflow-auto ">
                <h2 className="font-bold text-3xl tracking-tight text-center">
                  Lista de módulos - Rol{" "}
                  {Values?.Tipo && Tipo[Values?.Tipo - 1]?.label}
                </h2>
                <div className="grid grid-cols-2 gap-2 ">
                  {Data?.Modulos?.map((item: any, key: number) => (
                    <ModuloItem
                      key={key}
                      data={item}
                      Values={Values}
                      setListaModulosSelected={setListaModulosSelected}
                    />
                  ))}
                </div>
              </div>
            </>

            <div className="flex justify-around  gap-2">
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
    </>
  );
};

export default ModalEdit;
