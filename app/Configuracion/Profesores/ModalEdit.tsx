"use client";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Docente, VisibilidadModal } from "../../../typings";
import axios from "axios";
import EncriptarContraseña from "../../../utils/EncriptarContraseña";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

type Props = {
  // type props useState
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
  // setAdministrativos: React.Dispatch<React.SetStateAction<Administrativo[]>>;
  InfoEditar: Docente;
  setDocentes: React.Dispatch<React.SetStateAction<Docente[]>>;
};

const ModalUpgrade = ({ setShowModal, InfoEditar, setDocentes }: Props) => {
  const [Values, setValues] = useState({
    Nombre: InfoEditar?.Nombre || "",
    Apellidos: InfoEditar?.Apellidos || "",
    Documento: InfoEditar?.Documento || "",
    Correo: InfoEditar?.Correo || "",
    TipoDocumento: InfoEditar?.TipoDocumento || "",
    IdDocente: InfoEditar?.Id || "",
    Password: InfoEditar?.Pass || "",
    Genero: InfoEditar?.Genero || "",
  });
  const [Data, setData] = useState({} as any);

  const Genero = [
    { value: "M", label: "Masculino" },
    { value: "F", label: "Femenino" },
  ];
  const searchParams: any = useSearchParams();

  const hanlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const SubSede = searchParams.get("SubSede");

      // generar una peticion tipo put
      const sentDataRes: any = await axios.put(
        "/api/Configuracion/Docentes/UpdateDocente",
        {
          ...Values,
        }
      );

      const NewDocentes = await axios.get(
        `/api/Configuracion/Docentes/GetDocentes?SubSede=${SubSede}`
      );

      setValues({
        ...Values,
        Password: EncriptarContraseña(),
      });
      setDocentes(NewDocentes?.data?.docentes);

      setShowModal({
        AddVisible: false,
        EditVisible: false,
      });
      alert(sentDataRes?.data?.body);
    } catch (error) {
      console.log(error);
      alert("Error al editar la información");
    }
  };

  const hanlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...Values, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    try {
      const InfoBase = await fetch(
        `/api/Configuracion/Administrativos/GetInfoModal`
      ).then((res) => res.json());

      let IndexDefault = InfoBase?.documentos.findIndex(
        (item: any) => item.nombre == Values?.TipoDocumento
      );

      setData({
        documentos: InfoBase?.documentos,
        IndexDefault,
      });

      // setValues({
      //   ...Values,
      //   Password: EncriptarContraseña(),
      // });
    } catch (error) {
      console.error(error);
      alert("Error al cargar la información");
    }
  };

  const AllInfoDocente = async () => {
    try {
      const InfoBase = await axios.post(
        "/api/Configuracion/Docentes/GetInfoModalDocentes",
        {
          Documento: InfoEditar?.Documento,
        }
      );

      setValues({
        ...Values,
        Correo: InfoBase?.data?.docente?.Correo || "",
        TipoDocumento: InfoBase?.data?.docente?.TipoDocumento || "",
      });
    } catch (error) {
      console.error(error);
      alert("Error al cargar la información");
    }
  };

  useEffect(() => {
    getData();
    AllInfoDocente();
  }, []);

  return (
    <>
      <div className="bg-[#000236]/100 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
        <div className="container mx-auto  w-11/12  md:w-2/3 ">
          <form
            onSubmit={hanlerSubmit}
            className="relative overflow-auto  max-h-screen  pt-5 pb-2 px-5  md:px-10 bg-white shadow-md rounded border border-gray-400"
          >
            <h1 className="text-center text-lg tracking-normal leading-tight mb-4 bg-[#151A8B] w-full text-white p-2 rounded-md font-bold ">
              Información Profesor
            </h1>

            <div className="max-h-[30rem] overflow-auto scrollbar-hide rounded-lg bg-gray-50 p-2  ">
              <div className="bg-white rounded-lg shadow-xl ">
                {/* <div className="absolute right-12 mt-4 rounded">button righ</div> */}
                <div className=" w-full h-[10.6rem] ">
                  <img
                    src="/ProfileBackground.webp"
                    className="w-full h-full rounded-tl-lg rounded-tr-lg "
                  />
                </div>
                <div className="flex flex-col items-center -mt-[10.3rem]">
                  {/* <img
                    src={`https://sygescol.uniminuto.sistemasivhorsnet.com/sygescol2023/images/fotos/administrativos/${
                      InfoEditar?.Imagen || "SinFotoAdmin.png"
                    }`}
                    className="w-40 border-4 border-white rounded-full"
                  /> */}

                  <Image
                    src={`https://sygescol.uniminuto.sistemasivhorsnet.com/sygescol2023/images/fotos/administrativos/${
                      InfoEditar?.Imagen || "SinFotoAdmin.png"
                    }`}
                    width={160}
                    height={160}
                    alt="Foto de perfil"
                    className="w-40 border-4 border-white rounded-full"
                  />
                </div>
                {/* <div className="flex flex-col items-center -mt-20">
                  <img
                    src={`https://sygescol.uniminuto.sistemasivhorsnet.com/sygescol2022/images/fotos/administrativos/${
                      InfoEditar?.Imagen || "SinFotoAdmin.png"
                    }`}
                    className="w-40 border-4 border-white rounded-full"
                  />
                  <div className="flex items-center space-x-2 mt-2">
                    <p className="text-2xl">
                      {" "}
                      {InfoEditar?.Nombre} {InfoEditar?.Apellidos}
                    </p>
                    <span
                      className="bg-blue-500 rounded-full p-1"
                      title="Verified"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-gray-100 h-2.5 w-2.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={4}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                  </div>

                  <p className="text-gray-700  capitalize">Docente</p>
                  <p className="text-sm text-gray-500">New York, USA</p>
                </div> */}
              </div>

              <div className="my-4 flex flex-col space-y-4 ">
                <div className="w-full flex flex-col ">
                  <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                    <h4 className="text-xl text-center text-gray-900 font-bold">
                      Información Personal
                    </h4>
                    <div className="mt-6">
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <div className="mb-2">
                            <label
                              htmlFor="Nombre"
                              className="mb-3 block text-base font-medium text-gray-800"
                            >
                              Nombre
                            </label>
                            <input
                              autoComplete="off"
                              autoFocus
                              type="text"
                              name="Nombre"
                              id="Nombre"
                              onChange={hanlerChange}
                              placeholder="Ingrese nombre"
                              className="InputStyle"
                              defaultValue={InfoEditar?.Nombre}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="mb-2">
                            <label
                              htmlFor="Apellidoss"
                              className="mb-3 block text-base font-medium text-gray-800"
                            >
                              Apellidos
                            </label>
                            <input
                              autoComplete="off"
                              type="text"
                              name="Apellidos"
                              id="Apellidos"
                              onChange={hanlerChange}
                              placeholder="Ingrese Apellido"
                              className="InputStyle"
                              defaultValue={InfoEditar?.Apellidos}
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
                            Tipo Documento{" "}
                          </label>

                          {Data.documentos?.length && (
                            <Select
                              options={Data?.documentos}
                              getOptionLabel={(item: any) => item.nombre}
                              getOptionValue={(item: any) => item.id}
                              onChange={(item: any) => {
                                setValues({
                                  ...Values,
                                  TipoDocumento: item.id,
                                });
                              }}
                              placeholder="Seleccione Tipo Documento"
                              defaultValue={Data.documentos[Data?.IndexDefault]}
                            />
                          )}
                        </div>
                        <div>
                          <div className="mb-2">
                            <label
                              htmlFor="Documento"
                              className="mb-3 block text-base font-medium text-gray-800"
                            >
                              Número Documento{" "}
                            </label>
                            <input
                              autoComplete="off"
                              type="text"
                              name="Documento"
                              id="Documento"
                              onChange={hanlerChange}
                              placeholder="Ingrese Numero de Documento"
                              className="InputStyle"
                              defaultValue={InfoEditar?.Documento}
                              // expresion regular para para validar 7 digitos
                              pattern="^[0-9]{7,12}$"
                              title="El documento debe tener entre 7 y 12 digitos."
                            />
                          </div>
                        </div>
                        <div>
                          <div className="mb-2">
                            <label
                              htmlFor="Correo"
                              className="mb-3 block text-base font-medium text-gray-800"
                            >
                              Correo
                            </label>
                            <input
                              autoComplete="off"
                              type="email"
                              name="Correo"
                              id="Correo"
                              onChange={hanlerChange}
                              placeholder="Correo Eletronico"
                              className="InputStyle"
                              defaultValue={Values?.Correo}
                              // expresion regular para validar correo electronico gmail
                            />
                          </div>
                        </div>
                        <div className="mb-2">
                          <label
                            htmlFor=""
                            className="mb-3 block text-base font-medium text-gray-800"
                          >
                            Genero
                          </label>
                          <Select
                            options={Genero}
                            onChange={(item: any) => {
                              setValues({ ...Values, Genero: item.value });
                            }}
                            placeholder="Seleccione Perfil"
                            defaultValue={
                              Genero[InfoEditar?.Genero === "M" ? 0 : 1]
                            }
                          />
                        </div>
                      </div>
                      <div className="mt-6 grid sm:grid-cols-2 gap-2">
                        <div className="mb-2">
                          <label
                            htmlFor="Usuario"
                            className="mb-3 block text-base font-medium text-gray-800"
                          >
                            Usuario
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
                            Contraseña
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
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-around mt-3">
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
          </form>
        </div>
      </div>
    </>
  );
};

export default ModalUpgrade;
