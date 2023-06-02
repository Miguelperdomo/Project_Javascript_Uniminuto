import React, { useEffect, useState } from "react";
import Select from "react-select";
import { visibleFormulario } from "../../../../typings";
type Props = {
  setVisible: React.Dispatch<React.SetStateAction<visibleFormulario>>;
  Documento: number;
};
const ModalInfEstudiante = ({ setVisible, Documento }: Props) => {
  const [munSisb, setMunSis] = useState([{}]);
  const showDpto = (e: any) => {
    const MunFormated = data.Municipios.filter(
      (info: any) => info.departamento_id == parseInt(e.codigo)
    );
    setMunSis(MunFormated);
  };
  const YesOrNot = [
    {
      value: "S",
      label: "Si",
    },
    {
      value: "N",
      label: "No",
    },
  ];
  const [data, setData] = useState({
    selectCupo: {
      cupo_nom1: "",
      cupo_nom2: "",
      cupo_ape1: "",
      cupo_ape2: "",
      cupo_num_docu: "",
      cupo_tip_docu: 0,
    },
    TiposDocumento: {
      nombre: "",
    },
    Municipios: [{ municipio_id: 0, departamento_id: 0, municipio_nombre: "" }],
    GrupoSanguineo: [],
    Eps: [],
    Departamentos: [],
    Genero: [],
  });
  const [InputData, setInputData] = useState({
    DateNacimiento: "",
    DateExpedicion: "",
    MunNacimiento: [
      {
        municipio_id: 0,
        departamento_id: 0,
        municipio_nombre: "",
      },
    ],
    MunExpedicion: [
      {
        municipio_id: 0,
        departamento_id: 0,
        municipio_nombre: "",
      },
    ],
    OtroPais: "",
    Rh: [
      {
        id: 0,
        nombre: "",
      },
    ],
    Eps: [
      {
        id: 0,
        nombre: "",
      },
    ],
    SisbenPuntaje: "",
    DptoExpSisben: [
      {
        id: 0,
        codigo: 0,
        nombre: "",
        indicativo: 0,
      },
    ],
    MunicipioExpSisben: [
      {
        municipio_id: 0,
        departamento_id: 0,
        municipio_nombre: "",
      },
    ],
    Sisben: "",
    SisbenId: 0,
    HijoMadreCabeza: "",
    Genero: "",
  });
  const [sisben, setSisben] = useState(false);
  const [eps, setEps] = useState(false);
  const getData = async () => {
    try {
      const InfoBase = await fetch(
        `/api/Estudiantes/QueremosConocerte/InformacionEstudiante?num=${Documento}`
      ).then((res) => res.json());

      console.log("InfoBase", InfoBase);

      setData(InfoBase);
      const DptoExpedicion = InfoBase?.Departamentos?.filter(
        (dpto: any) => dpto.id == InfoBase?.DataSave.depa_exp_id
      );
      const Muni = InfoBase?.Municipios?.filter(
        (mun: any) => mun.municipio_id == InfoBase?.DataSave.muni_exp_id
      );
      const MuniNacimiento = InfoBase?.Municipios?.filter(
        (mun: any) => mun.municipio_id == InfoBase?.DataSave.muni_nac_id
      );

      const GrupoSanguineo = InfoBase?.GrupoSanguineo?.filter(
        (gs: any) => gs.id == InfoBase?.DataSave.rh_id
      );
      const Eps = InfoBase?.Eps?.filter(
        (eps: any) => eps.id == InfoBase?.DataSave.eps_id
      );
      const DptoSisben = InfoBase?.Departamentos.filter(
        (dpto: any) =>
          dpto.id ==
          InfoBase?.DataSave?.sisben_mun_exp_id.toString().substring(0, 2)
      );
      const MuniSisben = InfoBase?.Municipios?.filter(
        (mun: any) => mun.municipio_id == InfoBase?.DataSave.sisben_mun_exp_id
      );
      if (InfoBase?.DataSave?.sin_sisben == 1) {
        setSisben(!sisben);
      }
      if (InfoBase?.DataSave?.eps_id) {
        setEps(!eps);
      }
      setInputData({
        ...InputData,
        DateNacimiento: InfoBase?.dateNacimientoRemisiones?.fecha_estudiante,
        DateExpedicion: InfoBase?.DataSave?.alumno_fec_exp,
        MunExpedicion: Muni,
        MunNacimiento: MuniNacimiento,
        Genero: InfoBase?.DataSave?.alumno_genero,
        DptoExpSisben: DptoSisben,
        Eps: Eps,
        MunicipioExpSisben: MuniSisben,
        OtroPais: InfoBase?.DataSave?.otro_pais_nac,
        Rh: GrupoSanguineo,
        HijoMadreCabeza: InfoBase?.DataSave?.alumno_hmcf,
        SisbenPuntaje: InfoBase?.DataSave?.sisben_id,
      });
    } catch (error) {
      console.error(error);
      alert("Error al cargar la información");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const hanlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({ ...InputData, [e.target.name]: e.target.value });
  };
  const handerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sentDataRes = await fetch(
      "/api/Estudiantes/QueremosConocerte/InformacionEstudiante",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: InputData,
          data2: data,
          num: Documento,
        }),
      }
    ).then((res) => res.json());
    alert(sentDataRes.body);
    if (sentDataRes.body == "Información Cargada Con Exitó") {
      setVisible({ DatosAcademicos: false });
    }
  };

  return (
    <>
      <div className="bg-[#000236]/100 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
        <div className="container mx-auto  w-11/12 md:w-2/3 max-w-2xl">
          <div className="bg-[#000236]/100/50 transition duration-150 ease-in-out z-20 fixed top-0 right-0 bottom-0 left-0">
            <div className="container mx-auto h-screen overflow-auto w-11/12 md:w-full max-w-6xl">
              <div className="pt-2 pb-2   px-5  md:px-10 bg-white shadow-md rounded border border-gray-400">
                <h1 className="text-white bg-[#151A8B] text-center font-lg font-bold tracking-normal leading-tight mb-4 p-4 rounded-lg">
                  INFORMACIÓN BÁSICA DEL ESTUDIANTE
                </h1>

                <form onSubmit={handerSubmit}>
                  <div className="grid lg:grid-cols-4 ">
                    {/* <div className="lg:col-span-4">
                      <label className="block text-sm md:text-lg font-medium text-gray-900 text-center">
                        Nombre y Apellidos
                      </label>
                      <p className="text-center text-4xl uppercase font-bold mb-2">{`${data?.DataSave?.Nombre}`}</p>
                    </div> */}
                  </div>
                  {/* <div className="grid gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <label className="block font-medium text-sm  text-gray-900 ">
                        Tipo de Documento
                      </label>
                      <input
                        autoComplete="off"
                        className="w-full p-[0.5rem] bg-gray-200 mt-2  rounded border-2 border-slate-200 "
                        type="text"
                        disabled={true}
                        placeholder={data?.TiposDocumento?.nombre}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 ">
                        Número de Documento{" "}
                      </label>
                      <input
                        autoComplete="off"
                        className="w-full p-[0.5rem] bg-gray-200 mt-2  rounded border-2 border-slate-200 "
                        type="text"
                        disabled={true}
                        placeholder={Documento}
                        required
                      />
                    </div>
                    {data?.selectCupo?.cupo_tip_docu == 3 ||
                    data?.selectCupo?.cupo_tip_docu == 13 ? (
                      <div>
                        <label className="block text-sm font-medium text-gray-900 ">
                          Otro Pais{" "}
                        </label>
                        <input
                          autoComplete="off"
                          className="w-full p-[0.5rem] bg-gray-200 mt-2  rounded border-2 border-slate-200 "
                          type="text"
                          name="OtroPais"
                          defaultValue={InputData?.OtroPais}
                          required
                        />
                      </div>
                    ) : (
                      <>
                        <div className="col-span-2">
                          <label
                            className={`block pb-2 text-sm font-medium text-gray-900 `}
                          >
                            Mcpio Expedición{" "}
                          </label>

                          <>
                            <Select
                              name="MunNacimiento"
                              getOptionLabel={(e: any) => {
                                return e.municipio_nombre;
                              }}
                              value={(e: any) =>
                                e == data?.Municipios[0]?.municipio_nombre ||
                                "Seleccione uno"
                              }
                              options={data?.Municipios}
                              onChange={(e: any) =>
                                setInputData({
                                  ...InputData,
                                  MunExpedicion: e,
                                })
                              }
                            />
                          </>
                        </div>
                      </>
                    )}
                  </div> */}
                  {/* <div className="grid gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 ">
                        Fecha Nacimiento
                      </label>
                      <input
                        autoComplete="off"
                        className="mt-2 h-[2.5rem] border-[1px] border-gray-200 w-full"
                        type="date"
                        name="DateNacimiento"
                        defaultValue={InputData?.DateNacimiento?.substring(
                          0,
                          10
                        )}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 ">
                        Fecha Expedición
                      </label>
                      <input
                        autoComplete="off"
                        className="mt-2 h-[2.5rem] border-[1px] border-gray-200 w-full"
                        type="date"
                        name="DateExpedicion"
                        defaultValue={InputData?.DateExpedicion?.substring(
                          0,
                          10
                        )}
                      />
                    </div>
                    {data?.selectCupo?.cupo_tip_docu == 3 ||
                    data?.selectCupo?.cupo_tip_docu == 13 ? (
                      <div>
                        <label className="block text-sm font-medium text-gray-900 ">
                          Otro Pais{" "}
                        </label>
                        <input
                          autoComplete="off"
                          className="w-full p-[0.5rem] bg-gray-200 mt-2  rounded border-2 border-slate-200 "
                          type="text"
                          name="OtroPais"
                          defaultValue={InputData?.OtroPais}
                          required
                        />
                      </div>
                    ) : (
                      <>
                        <div className="col-span-2">
                          <label
                            className={`block pb-2 text-sm font-medium text-gray-900 `}
                          >
                            Mcpio Nacimiento{" "}
                          </label>
                          <>
                            <Select
                              getOptionLabel={(e: any) => {
                                return e.municipio_nombre;
                              }}
                              value={(e: any) =>
                                e == data?.Municipios[0]?.municipio_nombre ||
                                "Seleccione uno"
                              }
                              options={data?.Municipios}
                              onChange={(e: any) =>
                                setInputData({
                                  ...InputData,
                                  MunNacimiento: e,
                                })
                              }
                            />
                          </>
                        </div>
                      </>
                    )}
                  </div> */}
                  <div className="grid gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <label className="block pb-2 text-sm font-medium text-gray-900 ">
                        Grupo Sanguíneo
                      </label>
                      <Select
                        getOptionLabel={(e: any) => {
                          return e.nombre;
                        }}
                        options={data.GrupoSanguineo}
                        onChange={(e: any) =>
                          setInputData({
                            ...InputData,
                            Rh: e,
                          })
                        }
                        placeholder={
                          InputData?.Rh[0]?.nombre || "Seleccione uno"
                        }
                      />
                    </div>
                    <div>
                      <label
                        className={`
                      block pb-2 text-sm font-medium text-gray-900
                      `}
                      >
                        E.P.S -{" "}
                        <input
                          autoComplete="off"
                          type="checkbox"
                          onClick={() => setEps(!eps)}
                          checked={sisben}
                        />{" "}
                        -{" "}
                        <span className="text-blue-900">
                          <a
                            href="https://www.adres.gov.co/consulte-su-eps"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Consulta FOSYGA
                          </a>
                        </span>
                      </label>

                      <Select
                        isDisabled={!eps && true}
                        getOptionLabel={(e: any) => {
                          return e.nombre;
                        }}
                        onChange={(e: any) =>
                          setInputData({
                            ...InputData,
                            Eps: e,
                          })
                        }
                        placeholder={
                          InputData?.Eps[0]?.nombre || "Seleccione uno"
                        }
                        options={data.Eps}
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium text-gray-900`}
                      >
                        Sisben -{" "}
                        <input
                          type="checkbox"
                          onClick={() => setSisben(!sisben)}
                          checked={sisben}
                        />{" "}
                        -{" "}
                        <span className="text-blue-900">
                          <a
                            href="https://www.sisben.gov.co/Paginas/consulta-tu-grupo.aspx"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Consulta Puntaje
                          </a>
                        </span>
                      </label>
                      <input
                        autoComplete="off"
                        className="w-full p-[0.5rem] bg-gray-200 mt-2  rounded border-2 border-slate-200 "
                        type="text"
                        placeholder="ej. =  A1...A5, B1...B7"
                        defaultValue={
                          InputData?.SisbenPuntaje == ""
                            ? ""
                            : InputData?.SisbenPuntaje
                        }
                        onChange={(e) => hanlerChange(e)}
                        disabled={!sisben && true}
                        name="SisbenPuntaje"
                        //expresion regular para validar que sea alfanumerico [A,B,,C,D,a,b,c,d] max 1 letra max 2 numeros
                        pattern="^[A-Da-d]{1}[0-9]{1,2}$"
                        title="ejm. = A1...A5, B1...B7, C1...C18, D1...D21"
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium pb-2 text-gray-900`}
                      >
                        Dpto. Expedición del Sisben{" "}
                      </label>

                      <Select
                        isDisabled={!sisben && true}
                        getOptionLabel={(e: any) => {
                          return e.nombre;
                        }}
                        options={data.Departamentos}
                        onChange={(e: any) => {
                          setInputData({
                            ...InputData,
                            DptoExpSisben: e,
                          });
                          showDpto(e);
                        }}
                        placeholder={
                          InputData?.DptoExpSisben[0]?.nombre ||
                          "Seleccione uno"
                        }
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <label
                        className={`block text-sm font-medium pb-2 text-gray-900`}
                      >
                        Mcpio. Expedición del Sisben
                      </label>

                      <Select
                        isDisabled={!sisben && true}
                        getOptionLabel={(e: any) => {
                          return e.municipio_nombre;
                        }}
                        options={munSisb}
                        onChange={(e: any) =>
                          setInputData({
                            ...InputData,
                            MunicipioExpSisben: e,
                          })
                        }
                        placeholder={
                          InputData?.MunicipioExpSisben[0]?.municipio_nombre ||
                          "Seleccione uno"
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm pb-2 font-medium text-gray-900 ">
                        Hijo Madre Cabeza de Familia
                      </label>
                      <Select
                        placeholder={
                          (!InputData?.HijoMadreCabeza &&
                            "Seleccion una Opción") ||
                          InputData?.HijoMadreCabeza
                        }
                        options={YesOrNot}
                        onChange={(e: any) =>
                          setInputData({
                            ...InputData,
                            HijoMadreCabeza: e?.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm pb-2 font-medium text-gray-900 ">
                        Género
                      </label>
                      <Select
                        getOptionLabel={(e: any) => {
                          return e.nombre;
                        }}
                        onChange={(e: any) => {
                          setInputData({ ...InputData, Genero: e });
                        }}
                        options={data.Genero}
                        placeholder={
                          (!InputData?.Genero && "Seleccion un Género") ||
                          InputData?.Genero
                        }
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
                        setVisible({ InfoStudent: false });
                      }}
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
    </>
  );
};

export default ModalInfEstudiante;
