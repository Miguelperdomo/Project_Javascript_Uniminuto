import React, { useEffect, useState } from "react";
import { visibleFormulario } from "../../../../typings";
import Select from "react-select";
import axios from "axios";
import { useSearchParams } from "next/navigation";

type Props = {
  setVisible: React.Dispatch<React.SetStateAction<visibleFormulario>>;
  Documento: number;
};

type DatosMatricula = {
  MatriYear: number;
  NombreCoa: string;
  NombrePrograma: string;
  alumno_id: number;
  CodBeneficiarioRuv: string;
  CodFliaAccion: string;
  CodFliaBeneficiario: string;
  CodRuv: string;
  CodBeneficiarioFliaAccion: string;
  BeneficiarioFliaAccion: string;
  RUV: string;
};

type Values = {
  BeneficiarioFliaAccion?: string;
  CodBeneficiarioFliaAccion?: string;
  CodBeneficiarioRuv?: string;
  CodFliaAccion?: string;
  CodRuv?: string;
  MatriYear?: number;
  NombreCoa?: string;
  NombrePrograma?: string;
  RUV?: string;
  alumno_id?: number;
  FliaAccion?: string;
  CodigoFliaAccion?: string;
  InputCodigoFliaBeneficiario?: string;
  InputCodigRUV?: string;
  InputCodigBeneficiarioRUV?: string;
};

function ModalDatosAcademicos({ setVisible, Documento }: Props) {
  const searchParams = useSearchParams();

  const [DataEstudiante, setDataEstudiantes] = useState({} as DatosMatricula);

  const [Value, setValue] = useState({
    FliaAccion: "",
    CodigoFliaAccion: "",
    InputCodigoFliaBeneficiario: "",
    RUV: "",
    InputCodigRUV: "",
    CodBeneficiarioFliaAccion: "",
    InputCodigBeneficiarioRUV: "",
  } as Values);

  console.log("Value", Value);

  const handerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "/api/Estudiantes/QueremosConocerte/DatosAcademicos",
        {
          Value,
          Documento: searchParams?.get("Doc"),
          Rol: searchParams?.get("IdRol"),
          IdUser: searchParams?.get("IdUser"),
        }
      );
      setVisible({ DatosAcademicos: false });

      alert(res?.data?.body);
    } catch (error: any) {
      console.log(error);
      alert(error?.response?.data?.body || "Error al cargar la Información");
    }
  };

  const options = [
    { value: "S", label: "Si" },
    { value: "N", label: "No" },
  ];

  const hanlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...Value, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    try {
      const res = await axios(
        `/api/Estudiantes/QueremosConocerte/DatosAcademicos`,
        {
          params: {
            Documento: searchParams?.get("Doc"),
            Rol: searchParams?.get("IdRol"),
            IdUser: searchParams?.get("IdUser"),
          },
        }
      );
      console.log("res", res?.data);

      setDataEstudiantes(res?.data?.InfoDatos || {});
      setValue({
        FliaAccion: res?.data?.InfoDatos?.BeneficiarioFliaAccion || "",
        InputCodigoFliaBeneficiario:
          res?.data?.InfoDatos?.CodBeneficiarioFliaAccion || "",
        CodigoFliaAccion: res?.data?.InfoDatos?.CodFliaAccion || "",

        RUV: res?.data?.InfoDatos?.RUV || "",
        InputCodigRUV: res?.data?.InfoDatos?.CodRuv || "",
        InputCodigBeneficiarioRUV:
          res?.data?.InfoDatos?.CodBeneficiarioRuv || "",
      });
    } catch (error) {
      console.log("error", error);
      alert("Error al cargar la información");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="bg-[#000236]/100 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
        <div className="container mx-auto  w-11/12 md:w-2/3 max-w-2xl">
          <div className="bg-[#000236]/100/50 transition duration-150 ease-in-out z-20 fixed top-0 right-0 bottom-0 left-0">
            <div className="container mx-auto h-screen overflow-auto w-11/12 md:w-full max-w-6xl">
              <div className="pt-2 pb-2    px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                <h1 className="text-white bg-[#151A8B] text-center font-lg font-bold tracking-normal leading-tight mb-4 p-4 rounded-lg">
                  DATOS ACADÉMICOS
                </h1>

                <>
                  <form onSubmit={(e) => handerSubmit(e)}>
                    <div className="grid gap-4 mb-6 lg:grid-cols-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 ">
                          Año
                        </label>
                        <input
                          autoComplete="off"
                          className="w-full p-[0.5rem] bg-gray-200 mt-2  rounded border-2 border-slate-200 "
                          type="text"
                          disabled={true}
                          defaultValue={DataEstudiante.MatriYear}
                          // placeholder={data?.year?.Year}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 ">
                          COA{" "}
                        </label>
                        <input
                          autoComplete="off"
                          className="w-full p-[0.5rem] bg-gray-200 mt-2  rounded border-2 border-slate-200 "
                          type="text"
                          defaultValue={DataEstudiante.NombreCoa}
                          disabled={true}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 ">
                          Programa
                        </label>
                        <input
                          autoComplete="off"
                          className="w-full p-[0.5rem] bg-gray-200 mt-2  rounded border-2 border-slate-200 "
                          type="text"
                          disabled={true}
                          defaultValue={DataEstudiante.NombrePrograma}
                          // placeholder={data?.info?.Programa}
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 mb-6 lg:grid-cols-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 pb-2">
                          Beneficiario de Familias en Acción{" "}
                        </label>

                        {Object.keys(DataEstudiante).length > 0 && (
                          <Select
                            options={options}
                            defaultValue={
                              DataEstudiante?.BeneficiarioFliaAccion == "S"
                                ? options[0]
                                : DataEstudiante?.BeneficiarioFliaAccion ==
                                    "N" && options[1]
                            }
                            onChange={(e: any) => {
                              setValue({
                                ...Value,
                                FliaAccion: e.value,
                              });

                              if (e.value == "N") {
                                setValue({
                                  ...Value,
                                  FliaAccion: e.value,
                                  CodigoFliaAccion: "",
                                  InputCodigoFliaBeneficiario: "",
                                });
                              }
                            }}
                          />
                        )}
                      </div>

                      {Value.FliaAccion == "S" && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-900 ">
                              Código Familia en Acción{" "}
                            </label>
                            <input
                              autoComplete="off"
                              className="w-full p-[0.5rem] bg-gray-200 mt-2  rounded border-2 border-slate-200 "
                              type="text"
                              name="CodigoFliaAccion"
                              required
                              onChange={hanlerChange}
                              placeholder="Ingrese código familia en acción"
                              defaultValue={DataEstudiante?.CodFliaAccion || ""}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-900 ">
                              Código Beneficiario Familia en Acción
                            </label>
                            <input
                              autoComplete="off"
                              className="w-full p-[0.5rem] bg-gray-200 mt-2  rounded border-2 border-slate-200 "
                              type="text"
                              name="InputCodigoFliaBeneficiario"
                              required
                              defaultValue={
                                DataEstudiante?.CodBeneficiarioFliaAccion || ""
                              }
                              onChange={hanlerChange}
                              placeholder="Ingrese código beneficiario "
                            />
                          </div>
                        </>
                      )}
                    </div>

                    <div className="grid gap-4 mb-6 lg:grid-cols-3">
                      {Object.keys(DataEstudiante).length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-900 pb-2">
                            Registro Único de Víctimas (RUV)
                          </label>

                          <div className="sticky top-0">
                            <Select
                              options={options}
                              defaultValue={
                                DataEstudiante?.RUV == "S"
                                  ? options[0]
                                  : DataEstudiante?.RUV == "N" && options[1]
                              }
                              onChange={(e: any) => {
                                setValue({
                                  ...Value,
                                  RUV: e.value,
                                });

                                if (e.value == "N") {
                                  setValue({
                                    ...Value,
                                    RUV: e.value,
                                    InputCodigRUV: "",
                                    InputCodigBeneficiarioRUV: "",
                                  });
                                }
                              }}
                              // styles={customStyles}
                            />
                          </div>
                        </div>
                      )}

                      {Value.RUV == "S" && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-900 ">
                              Código Familia{" "}
                            </label>
                            <input
                              autoComplete="off"
                              className="w-full p-[0.5rem] bg-gray-200 mt-2  rounded border-2 border-slate-200 "
                              type="text"
                              required
                              name="InputCodigRUV"
                              onChange={hanlerChange}
                              placeholder="Ingrese código del RUV"
                              defaultValue={DataEstudiante?.CodRuv || ""}
                              // onChange={(e) => {
                              //   hanlerChange(e);
                              // }}
                              // expresion regular para validad que el codigo sea numerico y longitud de 4
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-900 ">
                              Código Beneficiario RUV
                            </label>
                            <input
                              autoComplete="off"
                              className="w-full p-[0.5rem] bg-gray-200 mt-2  rounded border-2 border-slate-200 "
                              type="text"
                              name="InputCodigBeneficiarioRUV"
                              required
                              onChange={hanlerChange}
                              placeholder="Ingrese código de beneficiario RUV"
                              defaultValue={
                                DataEstudiante?.CodBeneficiarioRuv || ""
                              }
                              // onChange={(e) => {
                              //   hanlerChange(e);
                              // }}
                            />
                          </div>
                        </>
                      )}
                    </div>

                    <div className="flex justify-around mt-3">
                      <button
                        type="submit"
                        className="disabled:opacity-30 text-white bg-[#151A8B] hover:bg-[#070E54] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                      >
                        Guardar Sección
                      </button>
                      <button
                        className="text-white bg-[#151A8B] hover:bg-[#070E54] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        onClick={(e) => {
                          e.preventDefault();
                          setVisible({ DatosAcademicos: false });
                        }}
                      >
                        Cerrar
                      </button>
                    </div>
                  </form>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalDatosAcademicos;
