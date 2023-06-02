"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Estudiante } from "../../../../../../typings";
import Loading from "../../../../../loading";

type Props = {
  params: {
    doc: string;
    id: string;
    rol: string;
  };
  setEstudiante?: React.Dispatch<React.SetStateAction<Estudiante[]>>;
};

const BodyComponent = ({ params }: Props) => {
  const [Data, setData] = useState({} as any);
  const [Values, setValues] = useState<{}>({
    Rol: params.rol,
    IdUser: params.id,
  });

  const [isPending, setIsPending] = useState(false as boolean);

  const router = useRouter();

  const hanlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...Values, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    try {
      setIsPending(true);
      const InfoBase = await fetch(
        `/api/Configuracion/Administrativos/GetInfoModal`
      ).then((res) => res.json());

      const InfoUser = await fetch(
        `/api/Seguridad/EditProfiler?Documento=${params.doc}&Id=${params.id}&Rol=${params.rol}`
      ).then((res) => res.json());

      setValues({
        ...Values,
        Nombre: InfoUser?.InfoDb?.Nombre || "",
        Apellidos: InfoUser?.InfoDb?.Apellidos || "",
        Correo: InfoUser?.InfoDb?.Correo || "",
        Documento: InfoUser?.InfoDb?.Documento || "",
        Usuario: InfoUser?.InfoDb?.Usuario || "",
        Pass: InfoUser?.InfoDb?.Pass || "",
        Celular: InfoUser?.InfoDb?.Celular || "",
        TipoDocumento: InfoUser?.InfoDb?.TipoDocumento || "",
      });

      setData({
        ...InfoBase,
        ...InfoUser,
      });

      // limpiar localstorage
      setIsPending(false);
    } catch (error) {
      console.error(error);
      setIsPending(false);

      alert("Error al cargar la información");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.put("/api/Seguridad/UpdateUser", Values);
      localStorage?.clear();
      router.replace("/");
      alert(res.data.body);
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.body || "Error al actualizar el usuario");
    }
  };

  return (
    <>
      {isPending ? (
        <Loading />
      ) : (
        <div className="max-h-[90vh] overflow-auto rounded-lg bg-gray-50 p-2">
          <div className="my-1 flex flex-col space-y-4 ">
            <div className="w-full flex flex-col border border-slate-400 rounded-md shadow-2xl ">
              <div className="flex-1 bg-white rounded-lg shadow-xl px-6">
                <form onSubmit={handleSubmit} className="m-3">
                  <div className="grid sm:grid-cols-2 gap-3 relative">
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
                          placeholder="Ingrese Nombre"
                          className="InputStyle"
                          defaultValue={Data?.InfoDb?.Nombre}
                          // pattern="/^[a-zA-Z ]+$/"
                          title="Complete Este Campo Solo con Letras"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="mb-2">
                        <label
                          htmlFor="Apellidos"
                          className="mb-3 block text-base font-medium text-gray-800"
                        >
                          Apellido <span className="text-red-900">(*)</span>
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
                          defaultValue={Data?.InfoDb?.Apellidos}
                          // pattern="/^[a-zA-Z ]+$/"
                          title="Complete Este Campo Solo con Letras"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="mb-2">
                        <label
                          htmlFor="Correo"
                          className="mb-3 block text-base font-medium text-gray-800"
                        >
                          Correo <span className="text-red-900">(*)</span>
                        </label>
                        <input
                          autoComplete="off"
                          type="text"
                          name="Correo"
                          id="Correo"
                          required
                          onChange={hanlerChange}
                          placeholder="Correo Electrónico"
                          className="InputStyle"
                          defaultValue={Data?.InfoDb?.Correo}
                          // pattern=" /^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@a-zA-Z0-9?(?:.a-zA-Z0-9?)*$/"
                          title="Este Campo es para correo Electrónico"
                        />
                      </div>
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="Celular"
                        className="mb-3 block text-base font-medium text-gray-800"
                      >
                        Número Telefónico{" "}
                        <span className="text-red-900">(*)</span>
                      </label>
                      <input
                        autoComplete="off"
                        type="number"
                        name="Celular"
                        id="Celular"
                        required
                        onChange={hanlerChange}
                        placeholder="Ingrese Número de Teléfono"
                        className="InputStyle"
                        defaultValue={Data?.InfoDb?.Celular}
                        pattern="/^[0-9]+$/"
                        title="Espacio Únicamente para Número Telefónico"
                      />
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

                      <select
                        id="TipoDocumento"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => {
                          setValues({
                            ...Values,
                            TipoDocumento: e.target.value,
                          });
                        }}
                        required
                      >
                        <option value="">Seleccione una Opción</option>
                        {Data?.documentos?.map((Documento: any) => (
                          <option
                            selected={
                              Documento.id == Data?.InfoDb?.TipoDocumento
                                ? true
                                : false
                            }
                            key={Documento?.id}
                            value={Documento.id}
                          >
                            {Documento.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="Documento"
                        className="mb-3 block text-base font-medium text-gray-800"
                      >
                        Número Documento{" "}
                        <span className="text-red-900">(*)</span>
                      </label>
                      <input
                        autoComplete="off"
                        type="number"
                        name="Documento"
                        id="Documento"
                        required
                        onChange={hanlerChange}
                        placeholder="Ingrese Número de Documento"
                        className="InputStyle"
                        defaultValue={Data?.InfoDb?.Documento}
                        pattern="/^[0-9]+$/"
                        title="Espacio Únicamente para Número de Documento"
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
                        defaultValue={Data?.InfoDb?.Usuario || ""}
                        onChange={hanlerChange}
                        className="InputStyle"
                        placeholder="Ingrese Usuario"
                        readOnly
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="Pass"
                        className="mb-3 block text-base font-medium text-gray-800"
                      >
                        Contraseña <span className="text-red-900">(*)</span>
                      </label>
                      <input
                        autoComplete="off"
                        type="text"
                        name="Pass"
                        id="Pass"
                        onChange={hanlerChange}
                        defaultValue={Data?.InfoDb?.Pass || ""}
                        placeholder="Ingrese Contraseña"
                        className="InputStyle"
                      />
                    </div>
                  </div>
                  <div className="flex">
                    <button
                      type="submit"
                      className="bg-blue-500 w-[98%] m-2 mx-auto font-bold py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-[1.018]"
                    >
                      Actualizar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BodyComponent;
