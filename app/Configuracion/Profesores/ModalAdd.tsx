"use client";
import { useEffect, useState } from "react";
import { Docente, VisibilidadModal } from "../../../typings";

import Select, { StylesConfig } from "react-select";
import ItemCOA from "../../ItemCOA";
import { useSearchParams } from "next/navigation";

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
  setDocentes: React.Dispatch<React.SetStateAction<Docente[]>>;
};

const ModalAdd = ({ setShowModal, setDocentes }: Props) => {
  const [Values, setValues] = useState({} as Docente);
  const [Data, setData] = useState({} as any);

  const [Programas, setProgramas] = useState<any>([]);
  const searchParams: any = useSearchParams();

  const Genero = [
    { value: "M", label: "Masculino" },
    { value: "F", label: "Femenino" },
  ];

  const handerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.keys(Values)?.length != 8) {
      alert("por favor, llene todos los campos");
      return;
    }

    const sentDataRes = await fetch("/api/Configuracion/Docentes/AddDocente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Values),
    }).then((res) => res.json());

    const ResDocentes = await fetch(
      `/api/Configuracion/Docentes/GetDocentes?SubSede=${
        Values?.IdSubSede || 0
      }`
    ).then((res) => res.json());

    setDocentes(ResDocentes?.docentes);
    setShowModal({
      AddVisible: false,
    });

    alert(sentDataRes?.body);
  };

  const hanlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...Values, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    try {
      const SubSede = searchParams.get("SubSede");
      const InfoBase = await fetch(
        `/api/Configuracion/Docentes/GetInfoModal`
      ).then((res) => res.json());

      const ResProgramas = await fetch(
        `/api/Configuracion/Programas/GetProgramas?SubSede=${SubSede}`
      ).then((res) => res?.json());
      setProgramas(ResProgramas?.programas);
      setData({
        ...Data,
        ...InfoBase,
        IdSubSede: SubSede || 0,
      });
      setValues({
        ...Values,
        IdSubSede: SubSede || 0,
      });
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
      <div className="container mx-auto    w-11/12 md:w-2/3 max-w-2xl ">
        <div className="max-h-screen  overflow-auto   py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <h1 className="text-center text-lg tracking-normal leading-tight mb-4 bg-[#151A8B] w-full text-white p-4 rounded-lg font-bold ">
            Agregar Profesor
          </h1>

          <form onSubmit={handerSubmit}>
            {Data?.IdSubSede == "0" && (
              <>
                <ItemCOA setValues={setValues} Values={Values} />
              </>
            )}
            <div className="">
              <div className="mb-2">
                <label
                  htmlFor="Usuario"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Programa <span className="text-red-900">(*)</span>
                </label>
                <Select
                  options={Programas}
                  getOptionLabel={(item: any) => item.Nombre}
                  getOptionValue={(item: any) => item.Id}
                  onChange={(item: any) => {
                    setValues({ ...Values, Programa: item.Id });
                  }}
                  placeholder="Seleccione programa"
                  required
                />
              </div>
            </div>
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
                  placeholder="Ingrese Nombre"
                  className="InputStyle"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="Apellidos"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Apellidos <span className="text-red-900">(*)</span>
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  name="Apellidos"
                  id="Apellidos"
                  required
                  onChange={hanlerChange}
                  placeholder="Ingrese Apellidos"
                  className="InputStyle"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              <div className="mb-2">
                <label
                  htmlFor="TipoDocumento"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Tipo Documento <span className="text-red-900">(*)</span>
                </label>

                <Select
                  options={Data?.documentos}
                  getOptionLabel={(item: any) => item.Nombre}
                  getOptionValue={(item: any) => item.Id}
                  onChange={(item: any) => {
                    setValues({ ...Values, TipoDocumento: item.Id });
                  }}
                  placeholder="Seleccione Tipo Documento"
                  className=""
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="NumeroDocumento"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Numero Documento <span className="text-red-900">(*)</span>
                </label>
                <input
                  autoComplete="off"
                  type="number"
                  name="NumeroDocumento"
                  id="NumeroDocumento"
                  required
                  onChange={hanlerChange}
                  placeholder="Ingrese Numero de Documento"
                  className="InputStyle"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              <div className="mb-2">
                <label
                  htmlFor="Correo"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Correo <span className="text-red-900">(*)</span>
                </label>
                <input
                  autoComplete="off"
                  autoFocus
                  type="email"
                  name="Correo"
                  id="Correo"
                  required
                  onChange={hanlerChange}
                  placeholder="Ingrese correo electronico"
                  className="InputStyle"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="NumeroDocumento"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Genero <span className="text-red-900">(*)</span>
                </label>
                <Select
                  options={Genero}
                  onChange={(item: any) => {
                    setValues({ ...Values, Genero: item.value });
                  }}
                  placeholder="Seleccione Perfil"
                  required
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

export default ModalAdd;
