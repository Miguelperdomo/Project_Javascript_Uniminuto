"use client";
import { useEffect, useState } from "react";
import { Administrativo, VisibilidadModal } from "../../../typings";
import Select from "react-select";
import { useSearchParams } from "next/navigation";
import * as EmailValidator from "email-validator";

type Props = {
  // type props useState
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
  setAdministrativos: React.Dispatch<React.SetStateAction<Administrativo[]>>;
};

const ModalAdd = ({ setShowModal, setAdministrativos }: Props) => {
  const [Values, setValues] = useState({} as Administrativo);
  const [Data, setData] = useState({} as any);

  const searchParams: any = useSearchParams();

  const Genero = [
    { value: "M", label: "Masculino" },
    { value: "F", label: "Femenino" },
  ];

  const handerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const ValidationEmail = EmailValidator?.validate(`${Values?.Correo}`); // true

    if (!ValidationEmail) {
      alert("Por favor, ingrese un correo válido");
      return;
    }

    if (Values?.IdSubSede == "0" && Object.keys(Values).length != 10) {
      alert("por favor, llene todos los campos");
      return;
    } else {
      if (Object.keys(Values).length != 9) {
        alert("Por favor, llene todos los campos");
        return;
      }
    }

    const sentDataRes = await fetch(
      "/api/Configuracion/Administrativos/AddAdministrativo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Values),
      }
    ).then((res) => res.json());

    const ColaboradoresRes = await fetch(
      `/api/Configuracion/Administrativos/GetAdministrativos?SubSede=${
        searchParams.get("SubSede") || 0
      }`
    ).then((res) => res.json());

    setAdministrativos(ColaboradoresRes?.administrativos || []);
    setShowModal({ AddVisible: false, EditVisible: false });

    alert(sentDataRes?.body);
  };

  const hanlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...Values, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    try {
      const InfoBase = await fetch(
        `/api/Configuracion/Administrativos/GetInfoModal`
      ).then((res) => res.json());

      // get SubSedes
      const SubSedes = await fetch(
        "/api/Configuracion/SubSedes/GetAllSubSedes"
      ).then((res) => res.json());

      console.log("SubSedes", SubSedes);

      setData({
        ...InfoBase,
        IdSubSede: localStorage?.getItem("IdSubSede") || "",
        SubSedes: SubSedes?.SubSedes || [],
      });
      setValues({
        ...Values,
        // Password: EncriptarContraseña(),
        IdSubSede: localStorage?.getItem("IdSubSede") || "",
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
      <div className="container mx-auto  w-11/12 md:w-2/3 max-w-3xl  ">
        <div className="relative overflow-auto  max-h-screen   py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <h1 className="text-center text-lg tracking-normal leading-tight mb-4 bg-[#151A8B] w-full text-white p-4 rounded-lg font-bold ">
            Agregar Colaborador
          </h1>

          <form onSubmit={handerSubmit}>
            {Data?.IdSubSede == "0" && (
              <div className="grid sm:grid-cols-1 gap-2 ">
                <div className="mb-2">
                  <label className="mb-3 block text-base font-medium text-gray-800">
                    Selecciona COA <span className="text-red-900">(*)</span>
                  </label>

                  <Select
                    options={Data.SubSedes}
                    getOptionLabel={(item: any) => item.NombreSubSede}
                    getOptionValue={(item: any) => item.Id}
                    onChange={(item: any) => {
                      setValues({ ...Values, IdSubSede: item.Id });
                    }}
                    placeholder="Seleccione una Opción"
                    required
                  />
                </div>
              </div>
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

                {Data && (
                  <Select
                    options={Data.documentos}
                    getOptionLabel={(item: any) => item.nombre}
                    getOptionValue={(item: any) => item.id}
                    onChange={(item: any) => {
                      setValues({ ...Values, TipoDocumento: item.id });
                    }}
                    placeholder="Seleccione Tipo Documento"
                    required
                  />
                )}
              </div>
              <div className="mb-2">
                <label
                  htmlFor="NumeroDocumento"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Número Documento <span className="text-red-900">(*)</span>
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  name="NumeroDocumento"
                  id="NumeroDocumento"
                  required
                  onChange={hanlerChange}
                  placeholder="Ingrese Numero de Documento"
                  className="InputStyle"
                  pattern="^[a-zA-Z0-9]{8,14}$"
                  title="por favor, agrega un número de documento válido de 9 a 14 caracteres para continuar."
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              <div className="mb-2">
                <label
                  htmlFor="Cargo"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Nombre del Cargo <span className="text-red-900">(*)</span>
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  name="Cargo"
                  required
                  onChange={hanlerChange}
                  id="Cargo"
                  placeholder="Ingrese Cargo"
                  className="InputStyle"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="NumeroDocumento"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Perfil <span className="text-red-900">(*)</span>
                </label>
                <Select
                  options={Data.roles}
                  getOptionLabel={(item: any) => item.Nombre}
                  getOptionValue={(item: any) => item.Id}
                  onChange={(item: any) => {
                    setValues({ ...Values, Perfil: item.Id });
                  }}
                  placeholder="Seleccione Perfil"
                  required
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              <div className="mb-2">
                <label
                  htmlFor="Correo "
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Correo Electrónico <span className="text-red-900">(*)</span>
                </label>
                <input
                  autoComplete="off"
                  type="email"
                  name="Correo"
                  required
                  onChange={hanlerChange}
                  id="Correo"
                  placeholder="Ingrese Correo"
                  className="InputStyle"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="NumeroDocumento"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Género <span className="text-red-900">(*)</span>
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
            <div className="grid ">
              <div className="mb-2 ">
                <label
                  htmlFor="Usuario"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Usuario <span className="text-red-900">(*)</span>
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  name="Usuario"
                  id="Usuario"
                  disabled
                  value={`${
                    Values?.Nombre?.split(" ")[0]?.toLowerCase() || ""
                  }${Values?.Apellidos?.split(" ")[0]?.toLowerCase() || ""}`}
                  onChange={hanlerChange}
                  className="InputStyle"
                />
              </div>
              {/* <div className="mb-2">
                <label
                  htmlFor="Password"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Contraseña <span className="text-red-900">(*)</span>
                </label>
                <input
                  type="text"
                  name="Password"
                  id="Password"
                  disabled
                  onChange={hanlerChange}
                  value={Values?.Password || ""}
                  placeholder="Ingrese Numero de Documento"
                  className="InputStyle"
                />
              </div> */}
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

export default ModalAdd;
