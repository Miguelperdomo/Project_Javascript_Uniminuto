"use client";
import { useState } from "react";

import { Programa } from "../../../typings";
import ItemCOA from "../../ItemCOA";
import Select from "react-select";

type Props = {
  // type props useState
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setProgramas: React.Dispatch<React.SetStateAction<Programa[]>>;
  InfoEditar: Programa;
};

const ModalAdd = ({ setShowModal, setProgramas, InfoEditar }: Props) => {
  const [Values, setValues] = useState({
    Nombre: InfoEditar?.Nombre || "",
    Sigla: InfoEditar?.Sigla || "",
    Id: InfoEditar?.Id || 0,
    IdSubSede: localStorage.getItem("IdSubSede") || "",
    Periodicidad: InfoEditar?.Periodicidad || "",
  } as Programa);

  let periodicidad = [
    { value: "S", label: "Semestral" },
    { value: "C", label: "Cuatrimestral" },
  ];

  const [Data, setData] = useState({
    IdSubSede: localStorage.getItem("IdSubSede") || "",
  } as {
    IdSubSede: string;
  });

  console.log("Data", Data);

  const handerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (Values?.IdSubSede === "" || Values?.IdSubSede == "0") {
        alert("Selecciona un COA ");
        return;
      }

      if (Object.keys(InfoEditar).length > 0) {
        const sentDataRes = await fetch(
          `/api/Configuracion/Programas/UpdatePrograma`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(Values),
          }
        ).then((res) => res.json());

        const GetProgramasRes = await fetch(
          `/api/Configuracion/Programas/GetProgramas?SubSede=${Data?.IdSubSede}`
        ).then((res) => res.json());

        setProgramas(GetProgramasRes?.programas);
        setShowModal(false);

        alert(sentDataRes?.body);
      } else {
        const sentDataRes = await fetch(
          "/api/Configuracion/Programas/AddPrograma",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(Values),
          }
        ).then((res) => res.json());

        const GetProgramasRes = await fetch(
          `/api/Configuracion/Programas/GetProgramas?SubSede=${Data?.IdSubSede}`
        ).then((res) => res.json());

        setProgramas(GetProgramasRes?.programas);
        setShowModal(false);

        alert(sentDataRes?.body);
      }
    } catch (error) {
      console.error(error);
      alert("Error al Guardar");
    }
  };

  const hanlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...Values, [e.target.name]: e.target.value.toUpperCase() });
  };

  return (
    <div className="bg-[#000236]/100 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
      <div className="container mx-auto  w-11/12 md:w-2/3 max-w-2xl">
        <div className="relative overflow-auto  max-h-screen  py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <h1 className="text-center text-lg tracking-normal leading-tight mb-4 bg-[#151A8B] w-full text-white p-4 rounded-lg font-bold ">
            {Object.keys(InfoEditar).length > 0
              ? `Editar Programa ${InfoEditar.Nombre}`
              : "Agregar un Nuevo Programa"}
          </h1>

          <form onSubmit={handerSubmit}>
            {Data?.IdSubSede == "0" && (
              <>
                <ItemCOA setValues={setValues} Values={Values} />
              </>
            )}
            <div className="grid sm:grid-cols-2 gap-2">
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
                  placeholder="Ingrese Nombre Programa"
                  className="InputStyle"
                  defaultValue={InfoEditar?.Nombre || ""}
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="Periodicidad"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Periodicidad <span className="text-red-900">(*)</span>
                </label>

                <Select
                  className="dark:text-black"
                  options={periodicidad}
                  onChange={(item: any) => {
                    setValues({ ...Values, Periodicidad: item.value });
                  }}
                  placeholder="Seleccione un Opción"
                  defaultValue={
                    (InfoEditar?.Periodicidad == "S" && periodicidad[0]) ||
                    (InfoEditar?.Periodicidad == "C" && periodicidad[1])
                  }
                  required
                />
              </div>
            </div>

            <div className="">
              <div className="mb-2">
                <label
                  htmlFor="Sigla"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Sigla <span className="text-red-900">(*)</span>
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  name="Sigla"
                  id="Sigla"
                  required
                  onChange={hanlerChange}
                  placeholder="Ingrese Sigla o Abreviatura"
                  className="InputStyle"
                  defaultValue={InfoEditar?.Sigla || ""}
                />
              </div>
            </div>
            <div className="flex justify-around mt-3 gap-2">
              <button
                type="submit"
                className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
              >
                {Object.keys(InfoEditar).length > 0 ? "Editar" : "Guardar"}
              </button>
              <button
                className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(false);
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
