"use client";
import { useState } from "react";
import { RequisitrosMatricula } from "../../../typings";
import Select from "react-select";

type Props = {
  // type props useState
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setRequisitosMatricula: React.Dispatch<
    React.SetStateAction<RequisitrosMatricula[]>
  >;
};

const ModalAdd = ({ setShowModal, setRequisitosMatricula }: Props) => {
  const [Values, setValues] = useState({} as any);

  const Quien = [
    { value: "N", label: "Estudiantes Nuevos" },
    { value: "A", label: "Estudiantes Antiguos" },
    { value: "2", label: "Ambos Tipos de Estudiantes" },
  ];

  const Tipo = [
    { value: "N", label: "Normal" },
    { value: "O", label: "Obligatorio" },
  ];
  const handerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (Object.keys(Values).length != 3) {
        alert("por favor, llene todos los campos");
        return;
      }

      const sentDataRes = await fetch(
        "/api/Configuracion/RequisitosMatricula/AddRequitosMatricula",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Values),
        }
      ).then((res) => res.json());
      if (sentDataRes?.requisito) {
        setRequisitosMatricula((prev) => [...prev, sentDataRes?.requisito]);
        setShowModal(false);
      }
      alert(sentDataRes?.body);
    } catch (error) {
      console.error(error);
      alert("Error al guardar");
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
            Agregar Requisito de Matricula
          </h1>

          <form onSubmit={handerSubmit}>
            <div className="grvalue sm:grid-cols-2 gap-2 ">
              <div className="mb-2 sm:col-span-2">
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
                  placeholder="Ingrese Nombre"
                  className="InputStyle"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              <div className="mb-2">
                <label className="mb-3 block text-base font-medium text-gray-800">
                  ¿Para Quién? <span className="text-red-900">(*)</span>
                </label>

                <Select
                  options={Quien}
                  onChange={(item: any) => {
                    setValues({ ...Values, Quien: item.value });
                  }}
                  placeholder="Seleccione Tipo Documento"
                />
              </div>
              <div className="mb-2">
                <label className="mb-3 block text-base font-medium text-gray-800">
                  Tipo <span className="text-red-900">(*)</span>
                </label>
                <Select
                  options={Tipo}
                  onChange={(item: any) => {
                    setValues({ ...Values, Tipo: item.value });
                  }}
                  placeholder="Seleccione Tipo Prerrequisito"
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
