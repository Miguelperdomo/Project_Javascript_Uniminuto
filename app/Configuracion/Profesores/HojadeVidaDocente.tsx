// import React from "react";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Docente, VisibilidadModal } from "../../../typings";

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
  InfoEditar: Docente;
};

const HojadeVidaDocente = ({ InfoEditar }: Props) => {
  const [showModal, setShowModal] = React.useState(false);
  const [Data, setData] = useState({} as any);
  const [Values, setValues] = useState({} as Docente);

  return (
    <>
      {showModal ? (
        <>
          <div className="rounded-md justify-center items-center flex max-h-[40rem] overflow-auto scrollbar-hide fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="mt-auto relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}

                <div className="flex items-start  justify-between p-1 border-b border-solid border-slate-200 rounded-t    ">
                  <h3 className="ml-5 mt-2 text-center text-lg tracking-normal leading-tight mb-1 bg-[#151A8B] w-full text-white p-2 rounded-md font-bold ">
                    Hoja de Vida Profesor
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="bg-white rounded-md shadow-xl ">
                    {/* <div className="absolute right-12 mt-4 rounded">button righ</div> */}
                    <div className="w-full h-[9.4rem]">
                      {/* <img
                        src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
                        className="w-full h-full rounded-tl-lg rounded-tr-lg"
                      /> */}
                    </div>
                    <div className="flex flex-col items-center -mt-20">
                      {/* <img
                        src={`https://sygescol.uniminuto.sistemasivhorsnet.com/sygescol2023/images/fotos/docente/${
                          InfoEditar?.Imagen || "SinFotoAdmin.png"
                        }`}
                        className="w-40 border-4 border-white rounded-full"
                      /> */}
                      <div className="flex items-center space-x-2 mt-2">
                        {/* <p className="text-2xl">
                          {" "}
                          {InfoEditar?.Nombre} {InfoEditar.Apellidos}
                        </p> */}
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

                      {/* <p className="text-gray-700  capitalize">
                        {InfoEditar?.Cargo
                          ? InfoEditar?.Cargo
                          : "No registra cargo"}
                      </p> */}
                      <p className="text-sm text-gray-500">New York, USA</p>
                    </div>
                  </div>

                  <div className="my-1 flex flex-col space-y-4 ">
                    <div className="w-full flex flex-col ">
                      <div className="flex-1 bg-white rounded-lg shadow-xl ">
                        <h4 className="text-xl text-center text-gray-900 font-bold">
                          Información Personal
                        </h4>
                        <form className="mt-6">
                          <div className="grid sm:grid-cols-2 gap-3">
                            <div>
                              <div className="mb-2">
                                <label
                                  htmlFor="Nombre"
                                  className="mb-3 block text-base font-medium text-gray-800"
                                >
                                  Nombre{" "}
                                  <span className="text-red-900">(*)</span>
                                </label>
                                <input
                                  autoComplete="off"
                                  autoFocus
                                  type="text"
                                  name="Nombre"
                                  id="Nombre"
                                  required
                                  // onChange={hanlerChange}
                                  placeholder="Ingrese nombre"
                                  className="InputStyle"
                                  //   defaultValue={InfoEditar?.Nombre}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="mb-2">
                                <label
                                  htmlFor="Apellido"
                                  className="mb-3 block text-base font-medium text-gray-800"
                                >
                                  Apellido{" "}
                                  <span className="text-red-900">(*)</span>
                                </label>
                                <input
                                  autoComplete="off"
                                  autoFocus
                                  type="text"
                                  name="Apellido"
                                  id="Apellido"
                                  required
                                  //   onChange={hanlerChange}
                                  placeholder="Ingrese Apellido"
                                  className="InputStyle"
                                  //   defaultValue={InfoEditar?.Apellidos}
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
                                <span className="text-red-900">(*)</span>
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
                                Número Documento{" "}
                                <span className="text-red-900">(*)</span>
                              </label>
                              <input
                                autoComplete="off"
                                type="number"
                                name="NumeroDocumento"
                                id="NumeroDocumento"
                                required
                                // onChange={hanlerChange}
                                placeholder="Ingrese Numero de Documento"
                                className="InputStyle"
                                // defaultValue={InfoEditar?.Documento}
                              />
                            </div>
                          </div>
                          <div className="mt-6 grid sm:grid-cols-2 gap-3">
                            <div className="mb-2">
                              <label
                                htmlFor="Departamento"
                                className="mb-3 block text-base font-medium text-gray-800"
                              >
                                Departamento{" "}
                                <span className="text-red-900">(*)</span>
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
                                  placeholder="Seleccione Departamento"
                                  required
                                />
                              )}
                            </div>
                            <div className="mb-2">
                              <label
                                htmlFor="Municipio"
                                className="mb-3 block text-base font-medium text-gray-800"
                              >
                                Municipio{" "}
                                <span className="text-red-900">(*)</span>
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
                                  placeholder="Seleccione Municipio"
                                  required
                                />
                              )}
                            </div>
                          </div>
                          {/* <div className="mt-6 grid sm:grid-cols-2 gap-3">
                            <div className="mb-2">
                              <label
                                htmlFor="Cargo"
                                className="mb-3 block text-base font-medium text-gray-800"
                              >
                                Cargo <span className="text-red-900">(*)</span>
                              </label>
                              <input
                                type="text"
                                name="Cargo"
                                required
                                // onChange={hanlerChange}
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
                          </div> */}

                          <div className=" flex justify-around mt-4 gap-2">
                            <button
                              type="submit"
                              className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
                            >
                              Guardar
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowModal(false)}
                              className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
                              //   onClick={(e) => {
                              //     e.preventDefault();
                              //     setShowModal({
                              //       AddVisible: false,
                              //       EditVisible: false,
                              //     });
                              //   }}
                            >
                              Cerrar
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-[#000236]/100"></div>
        </>
      ) : null}
    </>
  );
};

export default HojadeVidaDocente;
