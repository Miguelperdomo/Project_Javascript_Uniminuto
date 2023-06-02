"use client";
import React, { useEffect } from "react";
import { DepartamentoMunicipio, InfoEmpresa } from "../../../typings";
import Select from "react-select";

import axios from "axios";

import { useSearchParams } from "next/navigation";
import Loading from "@/app/loading";

const DatosInput = () => {
  const [InputValues, setInputValues] = React.useState({} as any);
  const [Data, setData] = React.useState({} as any);
  const searchParams = useSearchParams();
  const [isPending, setIsPending] = React.useState(false as boolean);

  const [IndexSelected, setIndexSelected] = React.useState(null as any);

  const HanlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/Configuracion/Datos/AddDatos", {
        InputValues,
      });
      alert(res?.data?.body);
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.body);
    }
  };

  useEffect(() => {
    const fetcher = async () => {
      setIsPending(true);

      const SubSede: any = searchParams.get("SubSede");

      const res: any = await fetch(
        `/api/Configuracion/Datos/MunicipioSelected?SubSede=${SubSede || 0}`
      ).then((res) => res.json());

      setIndexSelected(res?.IndexSelected || null);

      console.log(`adadadasdasdas`, res);

      let InfoBase = {} as any;

      if (SubSede != 0 || SubSede != undefined) {
        const getInfoBase = await fetch(
          `/api/Configuracion/Datos/GetDatos?SubSede=${SubSede}`
        ).then((res) => res.json());

        InfoBase = getInfoBase || {};
        setInputValues({
          ...InfoBase?.InfoBase,
        } as any);
        setData(InfoBase);
      }

      setIsPending(false);
    };
    fetcher();
  }, []);

  const hanlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...InputValues,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      {isPending ? (
        <Loading />
      ) : (
        <form onSubmit={HanlerSubmit}>
          <div className="max-h-[37.5rem] overflow-auto scrollbar-hide rounded-md m-2  bg-[#ffffff] border border-slate-400 shadow-2xl ">
            {Object.keys(InputValues || {}).length > 0 ? (
              <div className="mx-3 m-4 mt-2">
                <div className=" container grid  gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <div>
                    <div className="group">
                      <input
                        autoComplete="off"
                        onChange={hanlerChange}
                        type="text"
                        name="nombreUniversidad"
                        title="Nombre de la Universidad"
                        required
                        id="nombreUniversidad"
                        defaultValue={Data?.InfoBase?.nombreUniversidad || ""}
                        className="InputStyle  rounded-md m-1 mt-6 bg-transparent border border-slate-400 shadow-lg"
                      />
                      <span className="highlight" />
                      <label>Nombre</label>
                    </div>
                  </div>
                  <div>
                    <div className="group">
                      <input
                        autoComplete="off"
                        onChange={hanlerChange}
                        type="text"
                        name="direccion"
                        id="direccion"
                        title="Dirección de la Universidad"
                        required
                        defaultValue={Data?.InfoBase?.direccion || ""}
                        className="InputStyle rounded-md m-1 mt-6  bg-transparent border border-slate-400 shadow-lg"
                      />
                      <span className="highlight" />
                      <label>Dirección</label>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="flex justify-between mb-7 "></div>
                    {Data?.Municipios?.length && (
                      <Select
                        className=" w-full rounded-md  bg-transparent border border-slate-400 shadow-lg"
                        placeholder="Seleccione Municipio"
                        options={Data?.Municipios}
                        onChange={(e: any) => {
                          setInputValues({
                            ...InputValues,
                            municipioId: e?.municipio_id,
                          });
                        }}
                        getOptionLabel={(item: any) => item.municipio_nombre}
                        getOptionValue={(item: any) => item.municipio_id}
                        defaultValue={Data?.Municipios[IndexSelected]}
                      />
                    )}
                  </div>
                  <div>
                    <div className="group">
                      <input
                        autoComplete="off"
                        onChange={hanlerChange}
                        type="text"
                        name="siglaRectoria"
                        required
                        title="Abreviatura de la Rectoría"
                        id="siglaRectoria"
                        defaultValue={Data?.InfoBase?.siglaRectoria || ""}
                        className="InputStyle rounded-md m-1 mt-6 bg-transparent border border-slate-400 shadow-lg"
                      />
                      <span className="highlight" />
                      <label>Sigla Rectoría</label>
                    </div>
                  </div>
                  <div>
                    <div className="group">
                      <input
                        autoComplete="off"
                        onChange={hanlerChange}
                        readOnly={true}
                        type="text"
                        name="siglaUniversidad"
                        id="siglaUniversidad"
                        title="Dirección de la Universidad"
                        required
                        defaultValue={Data?.InfoBase?.siglaUniversidad || ""}
                        className="InputStyle rounded-md m-1 mt-6  bg-transparent border border-slate-400 shadow-lg"
                      />
                      <span className="highlight" />
                      {/* <label>Sigla Universidad</label> */}
                    </div>
                  </div>
                  <div>
                    <div className="group">
                      <input
                        autoComplete="off"
                        onChange={hanlerChange}
                        type="text"
                        name="telefono1"
                        required
                        title="Teléfono Principal"
                        id="telefono1"
                        defaultValue={Data?.InfoBase?.telefono1 || ""}
                        className="InputStyle rounded-md m-1 mt-6 bg-transparent border border-slate-400 shadow-lg"
                      />
                      <span className="highlight" />
                      <label>Telefono1</label>
                    </div>
                  </div>
                  <div>
                    {/* <div className="flex justify-between mb-2">
                  <label
                    htmlFor="Tel2"
                    className="text-sm text-black font-semibold"
                  >
                    Tel 2
                  </label>
                </div>
                <input
                  onChange={hanlerChange}
                  type="text"
                  name="Tel2"
                  id="Tel2"
                  defaultValue={Data?.InfoBase?.Tel2 || ""}
                  placeholder="Ingresa teléfono 2"
                  className="InputStyle rounded-md m-1 bg-transparent border border-slate-400 shadow-lg"
                /> */}
                    <div className="group">
                      <input
                        autoComplete="off"
                        onChange={hanlerChange}
                        type="text"
                        name="telefono2"
                        required
                        title="Teléfono Secundario"
                        id="telefono2"
                        defaultValue={Data?.InfoBase?.telefono2 || ""}
                        className="InputStyle rounded-md m-1 mt-6 bg-transparent border border-slate-400 shadow-lg"
                      />
                      <span className="highlight" />
                      <label>Telefono2</label>
                    </div>
                  </div>
                  <div>
                    <div className="group">
                      <input
                        autoComplete="off"
                        onChange={hanlerChange}
                        type="text"
                        name="correo"
                        required
                        title="Correo Electrónico"
                        id="correo"
                        defaultValue={Data?.InfoBase?.correo || ""}
                        className="InputStyle rounded-md m-1 mt-6 bg-transparent border border-slate-400 shadow-lg"
                      />
                      <span className="highlight" />
                      <label>Correo</label>
                    </div>
                  </div>

                  <div>
                    <div className="group">
                      <input
                        autoComplete="off"
                        onChange={hanlerChange}
                        type="text"
                        name="web"
                        required
                        title="Dirección del Sitio Web"
                        id="web"
                        defaultValue={Data?.InfoBase?.web || ""}
                        className="InputStyle rounded-md m-1 mt-6 bg-transparent border border-slate-400 shadow-lg"
                      />
                      <span className="highlight" />
                      <label>Sitio Web</label>
                    </div>
                  </div>
                  <div>
                    <div className="group">
                      <input
                        autoComplete="off"
                        onChange={hanlerChange}
                        type="text"
                        name="icfes"
                        required
                        title="Resolución Icfes"
                        id="icfes"
                        defaultValue={Data?.InfoBase?.icfes || ""}
                        className="InputStyle rounded-md m-1 mt-6 bg-transparent border border-slate-400 shadow-lg"
                      />
                      <span className="highlight" />
                      <label>Icfes</label>
                    </div>
                  </div>
                  <div>
                    <div className="group">
                      <input
                        autoComplete="off"
                        onChange={hanlerChange}
                        type="text"
                        name="resolucionSem"
                        required
                        // title="N° Resolución del Ministerio de Educacion Nacional"
                        id="resolucionSem"
                        defaultValue={Data?.InfoBase?.resolucionSem || ""}
                        className="InputStyle rounded-md m-1 mt-6 bg-transparent border border-slate-400 shadow-lg"
                      />
                      <span className="highlight" />
                      <label>Resolución M.E.N</label>
                    </div>
                  </div>
                  <div>
                    <div className="group">
                      <input
                        autoComplete="off"
                        onChange={hanlerChange}
                        type="text"
                        name="nombreRector"
                        required
                        // title="Nombre del Rector de la Universidad"
                        id="nombreRector"
                        defaultValue={Data?.InfoBase?.nombreRector || ""}
                        className="InputStyle rounded-md m-1 mt-6 bg-transparent border border-slate-400 shadow-lg"
                      />
                      <span className="highlight" />
                      <label>Nombre Rector/a</label>
                    </div>
                  </div>

                  <div>
                    <div className="group">
                      <input
                        autoComplete="off"
                        onChange={hanlerChange}
                        type="text"
                        name="nit"
                        required
                        title="N° del Nit"
                        id="nit"
                        defaultValue={Data?.InfoBase?.nit || ""}
                        className="InputStyle rounded-md m-1 mt-6 bg-transparent border border-slate-400 shadow-lg"
                      />
                      <span className="highlight" />
                      <label>Nit</label>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              "Este Usuario no pertenece a una Universidad"
            )}
          </div>
          <div className="flex">
            <button className="bg-blue-500 w-[98%] m-2 mx-auto font-bold py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-[1.018]">
              Actualizar
            </button>
          </div>
        </form>
      )}

      <style jsx>{`
        /* form starting stylings ------------------------------- */
        .group {
          position: relative;
        }
        input {
          font-size: 18px;
          padding: 10px 10px 10px 5px;
          display: block;
          border: none;
           {
            /* border-bottom: 1px solid #757575; */
          }
        }
        input:focus {
          outline: none;
        }

        /* LABEL ======================================= */
        label {
          color: #999;
          font-size: 18px;
          font-weight: normal;
          position: absolute;
          pointer-events: none;
          left: 5px;
          top: 10px;
          transition: 0.2s ease all;
          -moz-transition: 0.2s ease all;
          -webkit-transition: 0.2s ease all;
        }

        /* active state */
        input:focus ~ label,
        input:valid ~ label {
          top: -22px;
          font-size: 15px;
          color: #071b4d;
        }

        /* BOTTOM BARS ================================= */
        .bar {
          position: relative;
          display: block;
          width: 300px;
        }
        .bar:before,
        .bar:after {
          content: "";
          height: 2px;
          width: 0;
          bottom: 1px;
          position: absolute;
          background: #5264ae;
          transition: 0.2s ease all;
          -moz-transition: 0.2s ease all;
          -webkit-transition: 0.2s ease all;
        }
        .bar:before {
          left: 50%;
        }
        .bar:after {
          right: 50%;
        }

        /* active state */
        input:focus ~ .bar:before,
        input:focus ~ .bar:after {
          width: 50%;
        }

        /* HIGHLIGHTER ================================== */
        .highlight {
          position: absolute;
          height: 60%;
          width: 100px;
          top: 25%;
          left: 0;
          pointer-events: none;
          opacity: 0.5;
        }

        /* active state */
        input:focus ~ .highlight {
          -webkit-animation: inputHighlighter 0.3s ease;
          -moz-animation: inputHighlighter 0.3s ease;
          animation: inputHighlighter 0.3s ease;
        }

        /* ANIMATIONS ================ */
        @-webkit-keyframes inputHighlighter {
          from {
            background: #5264ae;
          }
          to {
            width: 0;
            background: transparent;
          }
        }
        @-moz-keyframes inputHighlighter {
          from {
            background: #5264ae;
          }
          to {
            width: 0;
            background: transparent;
          }
        }
        @keyframes inputHighlighter {
          from {
            background: #5264ae;
          }
          to {
            width: 0;
            background: transparent;
          }
        }
      `}</style>
    </>
  );
};

export default DatosInput;
