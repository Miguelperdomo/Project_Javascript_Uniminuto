import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Estudiante, VisibilidadModal } from "../../typings";
import EncriptarContraseña from "../../utils/EncriptarContraseña";

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
  InfoEditar: Estudiante;
  setEstudiante: React.Dispatch<React.SetStateAction<Estudiante[]>>;
};

const HojadeVidaEstu = ({ setShowModal, InfoEditar }: Props) => {
  const [Values, setValues] = useState({} as Estudiante);
  const [Data, setData] = useState({} as any);

  const handerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.keys(Values).length != 7) {
      alert("por favor, llene todos los campos");
      return;
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

    if (sentDataRes?.administrativo) {
      // setAdministrativos((prev) => [...prev, sentDataRes?.administrativo]);
      // setShowModal(false);
    }
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

      setData(InfoBase);
    } catch (error) {
      console.error(error);
      alert("Error al cargar la información");
    }

    setValues({
      ...Values,
      Password: EncriptarContraseña(),
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="max-h-[29rem] overflow-auto scrollbar-hide rounded-lg bg-gray-50 p-2  ">
        <div className="my-4 flex flex-col space-y-4 ">
          <div className="w-full flex flex-col ">
            <div className="flex-1 bg-white rounded-lg shadow-xl px-4">
              <form className="">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
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
                        defaultValue={InfoEditar?.Nombre}
                        pattern="/^[a-zA-Z ]+$/"
                        title="Complete Este Campo Solo con Letras"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-2">
                      <label
                        htmlFor="Apellido"
                        className="mb-3 block text-base font-medium text-gray-800"
                      >
                        Apellido <span className="text-red-900">(*)</span>
                      </label>
                      <input
                        autoComplete="off"
                        type="text"
                        name="Apellido"
                        id="Apellido"
                        required
                        onChange={hanlerChange}
                        placeholder="Ingrese Apellido"
                        className="InputStyle"
                        defaultValue={InfoEditar?.Apellidos}
                        pattern="/^[a-zA-Z ]+$/"
                        title="Complete Este Campo Solo con Letras"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-2">
                      <label
                        htmlFor="Nombre"
                        className="mb-3 block text-base font-medium text-gray-800"
                      >
                        Correo <span className="text-red-900">(*)</span>
                      </label>
                      <input
                        autoComplete="off"
                        type="text"
                        name="Nombre"
                        id="Nombre"
                        required
                        onChange={hanlerChange}
                        placeholder="Correo Eletronico"
                        className="InputStyle"
                        pattern=" /^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@a-zA-Z0-9?(?:.a-zA-Z0-9?)*$/"
                        title="Este Campo es para correo Electronico"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid sm:grid-cols-2 gap-3">
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
                          setValues({
                            ...Values,
                            TipoDocumento: item.id,
                          });
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
                      type="number"
                      name="NumeroDocumento"
                      id="NumeroDocumento"
                      required
                      onChange={hanlerChange}
                      placeholder="Ingrese Numero de Documento"
                      className="InputStyle"
                      defaultValue={InfoEditar?.Documento}
                      pattern="/^[0-9]+$/"
                      title="Espacion Unicamente para Numero de Documento"
                    />
                  </div>
                </div>
                <div className="mt-6 grid sm:grid-cols-2 gap-2">
                  <div className="mb-2">
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
                      autoComplete="off"
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
                </div>
              </form>
            </div>
          </div>
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
              EditVisible: false,
            });
          }}
        >
          Cerrar
        </button>
      </div>
    </>
  );
};

export default HojadeVidaEstu;
