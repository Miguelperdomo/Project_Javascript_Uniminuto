import React, { useEffect, useState } from "react";
import Select from "react-select";
import { visibleFormulario } from "../../../../typings";
type Props = {
  setVisible: React.Dispatch<React.SetStateAction<visibleFormulario>>;
  Documento: number;
};
function ModalVictimaConflicto({ setVisible, Documento }: Props) {
  const [ShowMcpio, setMcpio] = useState({
    municipioExpulsor: [],
    municipioReinsertado: [],
  });
  const [desplazado, setDesplazado] = useState(false);
  const [indigena, setIndigena] = useState(false);
  const [data, setData] = useState({
    DataSave: {
      alumno_desplazado: "",
      alumno_indigena: "",
      alumno_bvfp: "",
      alumno_bhn: "",
      alumno_poblacion_vulnerable: "",
    },
    Departamentos: [],
    Municipios: [
      {
        departamento_id: "",
      },
    ],
    PoblacionVictimaConflicto: [],
    Resguardo: [],
    Etnia: [],
  });
  const ShowDpto = (e: any) => {
    const { id } = e;
    const envia: any = data.Municipios.filter((e) => e?.departamento_id == id);
    setMcpio({ ...ShowMcpio, municipioExpulsor: envia });
  };
  const ShowDptoReinsertado = (e: any) => {
    const { id } = e;
    const envia: any = data.Municipios.filter((e) => e?.departamento_id == id);
    setMcpio({ ...ShowMcpio, municipioReinsertado: envia });
  };
  const YesOrNot = [
    // { value: "", label: " seleccione una opción" },
    {
      value: "S",
      label: "Si",
    },
    {
      value: "N",
      label: "No",
    },
  ];
  const hanlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const sentDataRes = await fetch(
    //   "/api/Formulario/Save/SaveDatosAcademicos",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       data: InputData,
    //       flia: FliaAccion,
    //       vic: RUV,
    //       num: Documento,
    //     }),
    //   }
    // ).then((res) => res.json());
    // alert(sentDataRes.body);
    // if (sentDataRes.body == "Información Cargada Con Exitó") {
    //   setVisible({ DatosAcademicos: false });
    // }
  };
  const getData = async () => {
    try {
      const InfoBase = await fetch(
        `/api/Formulario/BaseInfoVictima?num=${Documento}`
      ).then((res) => res.json());
      setData(InfoBase);
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
      <div className="bg-[#000236]/100 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
        <div className="container mx-auto  w-11/12 md:w-2/3 max-w-2xl">
          <div className="bg-[#000236]/100/50 transition duration-150 ease-in-out z-40 fixed top-0 right-0 bottom-0 left-0">
            <div className="container mx-auto h-screen overflow-auto w-11/12 md:w-full max-w-6xl">
              <div className="pt-2 pb-2    px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                <h1 className="text-white bg-[#151A8B] text-center font-lg font-bold tracking-normal leading-tight mb-4 p-4 rounded-lg">
                  ESTUDIANTE VÍCTIMA DE CONFLICTO
                </h1>
                <>
                  <form onSubmit={handerSubmit}>
                    <div className="grid gap-4 mb-6 lg:grid-cols-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 ">
                          Desplazado
                        </label>

                        <Select
                          options={YesOrNot}
                          placeholder=" Seleccione una opción"
                          defaultValue={
                            (data?.DataSave?.alumno_desplazado == "S" &&
                              YesOrNot[0]) ||
                            (data?.DataSave?.alumno_desplazado == "N" &&
                              YesOrNot[1]) ||
                            null
                          }
                          onChange={(e: any) => {
                            setDesplazado(e.value == "S" ? true : false);
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 ">
                          Dpto Expulsor{" "}
                        </label>
                        <Select
                          getOptionLabel={(e: any) => {
                            return e.nombre;
                          }}
                          //placeholder="Seleccione Dpto"
                          options={data.Departamentos}
                          onChange={(e) => {
                            //   setDptoSelected({
                            //     ...DptoSelected,
                            //     DptoExpulsor: e,
                            //   });
                            ShowDpto(e);
                          }}
                          // placeholder={
                          //   ShowDptoSave?.DptoExpursor[0]?.nombre ||
                          //   "Seleccione un Dpto"
                          // }
                          // components={animatedComponents}
                          isDisabled={!desplazado && true}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 ">
                          Mcpio Expulsor
                        </label>
                        <Select
                          getOptionLabel={(e: any) => {
                            return e.municipio_nombre;
                          }}
                          // placeholder="Seleccione Municipio"
                          options={ShowMcpio?.municipioExpulsor}
                          // onChange={(e) => {
                          //   setMunicipioSelected({
                          //     ...MunicipioSelected,
                          //     McpioExpursor: e,
                          //   });
                          // }}
                          isDisabled={!desplazado && true}
                          // placeholder={
                          //   ShowDptoSave?.MuniExpulsor[0]?.municipio_nombre ||
                          //   "Seleccione un Municipio"
                          // }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 ">
                          Dpto Reinsertado
                        </label>
                        <Select
                          getOptionLabel={(e: any) => {
                            return e.nombre;
                          }}
                          // placeholder={
                          //   ShowDptoSave?.DptoReinsertado[0]?.nombre ||
                          //   "Seleccione un Dpto"
                          // }
                          options={data.Departamentos}
                          onChange={(e) => {
                            //   setDptoSelected({
                            //     ...DptoSelected,
                            //     DptoReinsertado: e,
                            //   });
                            ShowDptoReinsertado(e);
                          }}
                          // defaultInputValue={
                          //   DataFormated?.DataSave?.depa_exp_id && {}
                          // }
                          isDisabled={!desplazado && true}
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 mb-6 lg:grid-cols-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 ">
                          Mcpio Reinsertado{" "}
                        </label>
                        <Select
                          getOptionLabel={(e: any) => {
                            return e.municipio_nombre;
                          }}
                          // placeholder={
                          //   ShowDptoSave?.MuniReinsertado[0]?.municipio_nombre ||
                          //   "Seleccione un Municipio"
                          // }
                          options={ShowMcpio?.municipioReinsertado}
                          // onChange={(e) => {
                          //   setMunicipioSelected({
                          //     ...MunicipioSelected,
                          //     McpioReinsert: e,
                          //   });
                          // }}
                          isDisabled={!desplazado && true}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 ">
                          Poblac. Vict. Conflicto{" "}
                        </label>
                        <Select
                          getOptionLabel={(e: any) => {
                            return e.pvc_nombre;
                          }}
                          // placeholder="Publacion Victima Conflicto"
                          // placeholder={
                          //   ShowDptoSave?.PoblacionVictima[0]?.pvc_nombre ||
                          //   "Publacion Victima Conflicto"
                          // }
                          options={data?.PoblacionVictimaConflicto}
                          // onChange={(e) => {
                          //   setMunicipioSelected({
                          //     ...MunicipioSelected,
                          //     PoblacionVictConflicti: e,
                          //   });
                          // }}
                          // isDisabled={InputSelect?.desplazado ? false : true}
                          // components={animatedComponents}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 ">
                          ¿Es Indigena?{" "}
                        </label>

                        <Select
                          options={YesOrNot}
                          placeholder=" Seleccione una opción"
                          defaultValue={
                            (data?.DataSave?.alumno_indigena == "S" &&
                              YesOrNot[0]) ||
                            (data?.DataSave?.alumno_indigena == "N" &&
                              YesOrNot[1]) ||
                            null
                          }
                          onChange={(e: any) => {
                            setIndigena(e.value == "S" ? true : false);
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 ">
                          Resguardo
                        </label>
                        <Select
                          getOptionLabel={(e: any) => {
                            return e.resgu_nombre;
                          }}
                          // placeholder={
                          //   ShowDptoSave?.Resguardo[0]?.resgu_nombre ||
                          //   "Ingrese resguardo"
                          // }
                          options={data?.Resguardo}
                          isDisabled={!indigena && true}
                          // onChange={(e) => {
                          //   setInputSelect({
                          //     ...InputSelect,
                          //     resgu_id: e,
                          //   });
                          // }}
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 mb-6 lg:grid-cols-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 ">
                          Etnia{" "}
                        </label>
                        <Select
                          getOptionLabel={(e: any) => {
                            return e.etnia_nombre;
                          }}
                          // placeholder="No aplica"
                          // placeholder={
                          //   ShowDptoSave?.Etnia[0]?.etnia_nombre ||
                          //   "Seleccione una Etnia"
                          // }
                          options={data?.Etnia}
                          // onChange={(e) => {
                          //   setInputSelect({
                          //     ...InputSelect,
                          //     etnia: e,
                          //   });
                          // }}
                          isDisabled={!indigena && true}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 ">
                          Beneficiario Veterano Fuerza Pública{" "}
                        </label>
                        <Select
                          options={YesOrNot}
                          placeholder=" Seleccione una opción"
                          defaultValue={
                            (data?.DataSave?.alumno_bvfp == "S" &&
                              YesOrNot[0]) ||
                            (data?.DataSave?.alumno_bvfp == "N" &&
                              YesOrNot[1]) ||
                            null
                          }
                          // onChange={(e) => {
                          //   setInputSelect({
                          //     ...InputSelect,
                          //     beneficiarioVeterano: e.value,
                          //   });
                          // }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 ">
                          Beneficiario Heroes de la Nación{" "}
                        </label>
                        <Select
                          options={YesOrNot}
                          placeholder=" Seleccione una opción"
                          defaultValue={
                            (data?.DataSave?.alumno_bhn == "S" &&
                              YesOrNot[0]) ||
                            (data?.DataSave?.alumno_bhn == "N" &&
                              YesOrNot[1]) ||
                            null
                          }
                          // onChange={(e) => {
                          //   setInputSelect({
                          //     ...InputSelect,
                          //     heroesNacion: e.value,
                          //   });
                          // }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 ">
                          Poblacion Vulnerable
                        </label>
                        <Select
                          options={YesOrNot}
                          placeholder=" Seleccione una opción"
                          defaultValue={
                            (data?.DataSave?.alumno_poblacion_vulnerable ==
                              "S" &&
                              YesOrNot[0]) ||
                            (data?.DataSave?.alumno_poblacion_vulnerable ==
                              "N" &&
                              YesOrNot[1]) ||
                            null
                          }
                          // onChange={(e) => {
                          //   setInputSelect({
                          //     ...InputSelect,
                          //     poblacionVulnerable: e.value,
                          //   });
                          // }}
                        />
                      </div>
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
                          setVisible({ VictimaConflicto: false });
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

export default ModalVictimaConflicto;
