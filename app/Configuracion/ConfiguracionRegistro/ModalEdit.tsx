// import React from "react";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Estudiante, VisibilidadModal } from "../../../typings";
import EncriptarContraseña from "../../../utils/EncriptarContraseña";

type Props = {
  // type props useState
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
  setEstudiante?: React.Dispatch<React.SetStateAction<Estudiante[]>>;
  InfoEditar?: Estudiante;
};

const ModalEdit = ({ setShowModal, InfoEditar }: Props) => {
  const [Values, setValues] = useState({} as Estudiante);
  const [Data, setData] = useState({} as any);

  const hanlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!Values?.TipoDocumento) {
      alert("Seleccione el documento");
      return;
    }
    if (!Values?.Semestre) {
      alert("Seleccione el semestre");
      return;
    }
    if (!Values?.Programa) {
      alert("Seleccione el programa");
      return;
    }

    // const sentDataRes = await fetch("/api/Configuracion/Docentes/AddDocente", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(Values),
    // }).then((res) => res.json());

    // alert(sentDataRes?.body);
  };

  const hanlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...Values, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    try {
      const InfoBase = await fetch(
        `/api/Configuracion/Docentes/GetInfoModal`
      ).then((res) => res.json());

      const SemAcademico = await fetch(
        `/api/Configuracion/GradosGrupos/GetSemestreAcademico`
      ).then((res) => res.json());

      const ProgAcademico = await fetch(
        `/api/Configuracion/Programas/GetProgramas`
      ).then((res) => res.json());

      setData({
        Documentos: InfoBase?.documentos,
        SemAcademico: SemAcademico?.semestreAcademico,
        Programas: ProgAcademico?.programas,
      });

      //   setValues({
      //     ...Values,
      //     Password: EncriptarContraseña(),
      //   });
    } catch (error) {
      console.error(error);

      alert("Error al cargar la información");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <form
        onSubmit={hanlerSubmit}
        className="m-1 py-3 px-10 md:px-3 bg-white shadow-md rounded border border-gray-400"
      >
        {/* <h1 className="text-center text-lg tracking-normal leading-tight mb-4 bg-[#151A8B] w-full text-white p-4 rounded-lg font-bold ">
          Agregar Nuevo Estudiante
        </h1> */}

        {/* <h1 className="text-center text-lg tracking-normal leading-tight mb-2 bg-transparent w-full text-blue p-4 rounded-lg font-bold ">
              Información de la Matrícula
            </h1> */}

        <div className="max-h-[30rem] overflow-auto scrollbar-hide rounded-lg bg-gray-50 p-2  ">
          <div className="  grid sm:grid-cols-2 gap-9">
            <div className="mb-6">
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
                defaultValue={InfoEditar?.Nombre}
                // pattern="/^[a-zA-Z ]+$/"
                title="Complete Este Campo Solo con Letras"
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
                defaultValue={InfoEditar?.Apellidos}
                // pattern="/^[a-zA-Z ]+$/"
                title="Complete Este Campo Solo con Letras"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-9">
            <div className="mb-6">
              <label
                htmlFor="TipoDocumento"
                className="mb-3 block text-base font-medium text-gray-800"
              >
                Tipo Documento <span className="text-red-900">(*)</span>
              </label>

              <Select
                options={Data?.Documentos}
                getOptionLabel={(item: any) => item.Nombre}
                getOptionValue={(item: any) => item.Id}
                onChange={(item: any) => {
                  setValues({
                    ...Values,
                    TipoDocumento: item.Id,
                  });
                }}
                placeholder="Seleccione Tipo Documento"
                required
              />
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
                type="number"
                name="NumeroDocumento"
                id="NumeroDocumento"
                required
                onChange={hanlerChange}
                placeholder="Ingrese Número de Documento"
                className="InputStyle"
                pattern="/^[0-9]+$/"
                title="Espacion Unicamente para Numero de Documento"
              />
            </div>
          </div>
          <div className="  grid sm:grid-cols-2 gap-9">
            <div className="mb-6">
              <label
                htmlFor="email"
                className="mb-3 block text-base font-medium text-gray-800"
              >
                Correo Electrónico <span className="text-red-900">(*)</span>
              </label>
              <input
                autoComplete="off"
                type="text"
                name="Email"
                id="email"
                required
                onChange={hanlerChange}
                placeholder="Ingrese Correo"
                className="InputStyle"
                // pattern=" /^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@a-zA-Z0-9?(?:.a-zA-Z0-9?)*$/"
                title="Este Campo es para correo Electronico"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="Telefono"
                className="mb-3 block text-base font-medium text-gray-800"
              >
                Teléfono <span className="text-red-900">(*)</span>
              </label>
              <input
                autoComplete="off"
                type="number"
                name="Telefono"
                id="Telefono"
                required
                onChange={hanlerChange}
                placeholder="Ingrese Teléfono"
                className="InputStyle"
                pattern="/^[0-9]+$/"
                title="Espacion Unicamente para Numero de Telefono"
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-9">
            <div className="mb-6">
              <label
                htmlFor="TipoDocumento"
                className="mb-3 block text-base font-medium text-gray-800"
              >
                Semestre Lectivo <span className="text-red-900">(*)</span>
              </label>
              <Select
                options={Data.SemAcademico}
                getOptionLabel={(item: any) => item.Nombre}
                getOptionValue={(item: any) => item.Id}
                onChange={(item: any) => {
                  setValues({ ...Values, Semestre: item.Id });
                }}
                placeholder="Seleccione el Semestre"
                required
              />
            </div>
            {/* <div className="mb-2">
                  <label
                    htmlFor="TipoDocumento"
                    className="mb-3 block text-base font-medium text-gray-800"
                  >
                    Semestre Año <span className="text-red-900">(*)</span>
                  </label>

                  <Select
                    options={Data.documentos}
                    getOptionLabel={(item: any) => item.Nombre}
                    getOptionValue={(item: any) => item.Id}
                    onChange={(item: any) => {
                      setValues({ ...Values, TipoDocumento: item.Id });
                    }}
                    placeholder="Seleccione Tipo Documento"
                    required
                  />
                </div> */}
            <div className="mb-6">
              <label
                htmlFor="TipoDocumento"
                className="mb-3 block text-base font-medium text-gray-800"
              >
                Programa <span className="text-red-900">(*)</span>
              </label>

              <Select
                options={Data.Programas}
                getOptionLabel={(item: any) => item.Nombre}
                getOptionValue={(item: any) => item.Id}
                onChange={(item: any) => {
                  setValues({ ...Values, Programa: item.Id });
                }}
                placeholder="Seleccione un Programa Académico"
                required
              />
            </div>
          </div>

          {/* <div className="grid sm:grid-cols-2 gap-2">
            <div className="mb-2">
              <label
                htmlFor="Usuario"
                className="mb-3 block text-base font-medium text-gray-800"
              >
                Usuario <span className="text-red-900">(*)</span>
              </label>
              <input
                type="text"
                name="Usuario"
                id="Usuario"
                disabled
                value={`${Values?.Nombre?.split(" ")[0] || ""}${
                  Values?.Apellidos?.split(" ")[0] || ""
                }`}
                onChange={hanlerChange}
                className="InputStyle"
              />
            </div>
            <div className="mb-2">
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
            </div>
          </div> */}
        </div>
        <div className="flex justify-around mt-3 gap-2">
          <button
            type="submit"
            className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
          >
            Guardar
          </button>
          {/* <button
            className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
            onClick={(e) => {
              e.preventDefault();
              setShowModal({
                AddVisible: false,
              });
            }}
          >
            Cerrar
          </button> */}
        </div>
      </form>

      {/* <div className="bg-[#000236]/100 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
        <div className="container mx-auto  w-11/12  md:w-2/3 ">
          
        </div>
      </div> */}
    </>
  );
};

export default ModalEdit;
