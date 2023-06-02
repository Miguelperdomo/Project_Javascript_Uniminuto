"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
// import React from "react";
import { Estudiante, VisibilidadModal } from "../../typings";
import EncriptarContraseña from "../../utils/EncriptarContraseña";
import ItemCOA from "../ItemCOA";

type Props = {
  // type props useState
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
  setEstudiante: React.Dispatch<React.SetStateAction<Estudiante[]>>;
  InfoEditar: Estudiante;
};

const ModalAddEstu = ({ setShowModal, setEstudiante, InfoEditar }: Props) => {
  const [Values, setValues] = useState({
    Nombre: InfoEditar?.Nombre || "",
    Apellidos: InfoEditar?.Apellidos || "",
    Email: InfoEditar?.Correo || "",
    Telefono: InfoEditar?.Celular || "",
    TipoDocumento: InfoEditar?.TipoDocumento || "",
    NumeroDocumento: InfoEditar?.Documento || null,
    Usuario: InfoEditar?.Usuario || "",
    Password: InfoEditar?.Pass || "",
    Id: InfoEditar?.Id || null,
    IdSubSede: localStorage.getItem("IdSubSede") || "",
  } as any);
  const [Data, setData] = useState({
    IdSubSede: localStorage.getItem("IdSubSede") || "",
  } as any);
  const [DatosGet, setDatosGet] = useState({
    IdPrograma: null,
    IdSemestre: null,
    IdJornada: null,
  } as {
    IdPrograma: number | null;
    IdSemestre: number | null;
    IdJornada: number | null;
  });
  const [IdsDataExistence, setIdsDataExistence] = useState(
    {} as {
      JornadaId: number | null;
      ProgramaId: number | null;
      SemestreId: number | null;
      GruposPrograma: number | null;
      GrupoId: number | null;
    }
  );

  const [GrupoEdit, setGrupoEdit] = useState({} as any);
  const searchParams = useSearchParams();
  const [isPending, setIsPending] = useState(false as boolean);

  const hanlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const SubSede = searchParams.get("SubSede");

      if (Object.keys(InfoEditar).length > 0) {
        const UpdateRes = await axios.put("/api/Estudiantes/UpdateStudents", {
          ...Values,
        });
        fetch(`/api/Configuracion/CargaMasiva/GetStudents?SubSede=${SubSede}`)
          .then((res) => {
            res.json().then((data) => {
              setEstudiante(data?.estudiantes || []);
            });
          })
          .catch((error) => {
            alert("Error al cargar los estudiantes");
            console.error(error);
          });

        setShowModal({
          AddVisible: false,
        });

        alert(UpdateRes?.data?.body);
      } else {
        const sentDataRes = await fetch("/api/Estudiantes/AddEstudiante", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Values),
        }).then((res: any) => {
          if (res?.status !== 200) {
            return res.json();
          }

          fetch(`/api/Configuracion/CargaMasiva/GetStudents?SubSede=${SubSede}`)
            .then((res) => {
              res.json().then((data) => {
                setEstudiante(data?.estudiantes || []);
              });
            })
            .catch((error) => {
              console.error(error);
              alert("Error al cargar los estudiantes");
            });

          setShowModal({
            AddVisible: false,
          });
          return res.json();
        });

        alert(sentDataRes?.body);
      }
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.body);
      setShowModal({
        AddVisible: false,
      });
    }
  };

  const hanlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...Values, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    try {
      const SubSede = searchParams.get("SubSede");

      if (SubSede == "0") {
        const InfoBase = await fetch(
          `/api/Configuracion/Docentes/GetInfoModal?SubSede=${SubSede}`
        ).then((res) => res.json());

        setData({
          ...Data,
          Documentos: InfoBase?.documentos,
        });
      } else {
        const InfoBase = await fetch(
          `/api/Configuracion/Docentes/GetInfoModal?SubSede=${SubSede}`
        ).then((res) => res.json());

        const ProgAcademico = await fetch(
          `/api/Configuracion/Programas/GetProgramas?SubSede=${SubSede || 0}`
        ).then((res) => res.json());

        setData({
          ...Data,
          Documentos: InfoBase?.documentos,
          Programas: ProgAcademico?.programas,
          Jornadas: InfoBase?.jornadas,
        });
        if (Object.keys(InfoEditar).length > 0) {
          const GetDemasInfo = await fetch(
            `/api/Estudiantes/GetEditStudent?SubSede=${SubSede || 0}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                IdEstudiante: InfoEditar?.Id,
              }),
            }
          ).then((res) => res.json());

          setDatosGet({
            ...DatosGet,
            IdPrograma: GetDemasInfo?.DemasInfo?.ProgramaId,
            IdSemestre: GetDemasInfo?.DemasInfo?.Semestre,
          });

          setValues({
            ...Values,
            Programa: GetDemasInfo?.DemasInfo?.ProgramaId,
            Semestre: GetDemasInfo?.DemasInfo?.Semestre,
            Jornada: GetDemasInfo?.DemasInfo?.JornadaId,
            Grupo: GetDemasInfo?.DemasInfo?.GrupoId,
          });
          console.log("GetDemasInfo.DemasInfo", GetDemasInfo.DemasInfo);

          setIdsDataExistence({
            ...IdsDataExistence,
            JornadaId: GetDemasInfo?.DemasInfo?.JornadaId,
            ProgramaId: GetDemasInfo?.DemasInfo?.ProgramaId,
            SemestreId: GetDemasInfo?.DemasInfo?.Semestre,
            GrupoId: GetDemasInfo?.DemasInfo?.GrupoId,
          });
        } else {
          setValues({
            ...Values,
            Password: EncriptarContraseña(),
          });
        }
      }
    } catch (error) {
      console.error(error);

      alert("Error al cargar la información");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getDataSede = async () => {
    try {
      const ProgAcademico = await fetch(
        `/api/Configuracion/Programas/GetProgramas?SubSede=${
          Values?.IdSubSede || 0
        }`
      ).then((res) => res.json());

      setData({
        ...Data,
        Programas: ProgAcademico?.programas,
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (Values?.IdSubSede != "0") {
      getDataSede();
    }
  }, [Values?.IdSubSede]);

  const GetGrupos = async (IdPrograma: number, IdSemestre: number) => {
    try {
      const Grupo = await axios(
        `/api/Estudiantes/GetProgramaGrado?SubSede=${Values?.IdSubSede || 0}`,
        {
          params: {
            IdPrograma: IdPrograma,
            IdSemestre: IdSemestre,
          },
        }
      );

      setGrupoEdit({
        GruposPrograma: Grupo?.data,
      });
    } catch (error) {
      console.error(error);
      alert("Error al cargar los grupos");
    }
  };
  useEffect(() => {
    if (DatosGet.IdPrograma && DatosGet.IdSemestre) {
      GetGrupos(DatosGet.IdPrograma, DatosGet.IdSemestre);
    }
  }, [DatosGet?.IdPrograma, DatosGet?.IdSemestre]);

  const GetSemestres = async (IdPrograma: number) => {
    try {
      const Semestre = await axios(
        `/api/Configuracion/GradosGrupos/GetSemestrePrograma`,
        {
          params: {
            IdPrograma: IdPrograma,
            IdSubSede: Data?.IdSubSede,
          },
        }
      );
      console.log("semestres", Semestre?.data);

      setData({
        ...Data,
        SemAcademico: Semestre?.data?.semestres,
      });
    } catch (error) {
      console.error(error);
      alert("Error al cargar los semestres");
    }
  };

  useEffect(() => {
    if (Values?.Programa) {
      GetSemestres(Values?.Programa);
    }
  }, [Values?.Programa]);

  return (
    <>
      <div className="bg-[#000236]/100 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
        <div className="container mx-auto  w-11/12 md:w-2/3 max-w-6xl">
          <form
            onSubmit={hanlerSubmit}
            className="py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400"
          >
            <h1 className="text-center text-lg tracking-normal leading-tight mb-4 bg-[#151A8B] w-full text-white p-4 rounded-lg font-bold ">
              {Object.keys(InfoEditar).length > 0
                ? "Actualizar Estudiante"
                : "Agregar Nuevo Estudiante"}
            </h1>

            <div className="max-h-[23rem] overflow-auto scrollbar-hide rounded-lg bg-gray-50 p-2  ">
              {Data?.IdSubSede == "0" && (
                <div className="mb-3">
                  <ItemCOA setValues={setValues} Values={Values} />
                </div>
              )}
              <div className="  grid sm:grid-cols-2 gap-2">
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
                    placeholder="Ingrese nombre"
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
                    title="Complete Este Campo Solo con Letras"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-2">
                <div className="mb-6">
                  <label
                    htmlFor="TipoDocumento"
                    className="mb-3 block text-base font-medium text-gray-800"
                  >
                    Tipo Documento <span className="text-red-900">(*)</span>
                  </label>

                  {Data?.Documentos?.length && (
                    <>
                      <select
                        id="TipoDocumento"
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 "
                        onChange={(e) => {
                          setValues({
                            ...Values,
                            TipoDocumento: e.target.value,
                          });
                        }}
                      >
                        <option value="">
                          por favor, seleccione una opción
                        </option>
                        {Data?.Documentos?.map((item: any, index: number) => (
                          <option
                            key={index}
                            selected={
                              InfoEditar?.TipoDocumento == item.Id
                                ? true
                                : false
                            }
                            value={item.Id}
                          >
                            {item?.Nombre}
                          </option>
                        ))}
                      </select>
                    </>
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
                    // validar longitud de caracteres min 8
                    pattern=".{8,}"
                    title="Complete Este Campo con minimo 8 caracteres"
                    defaultValue={InfoEditar?.Documento}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-2">
                <div className="mb-6">
                  <label
                    htmlFor="Programa"
                    className="mb-3 block text-base font-medium text-gray-800"
                  >
                    Programa <span className="text-red-900">(*)</span>
                  </label>

                  <select
                    id="Programa"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 "
                    onChange={(item) => {
                      setDatosGet({
                        ...DatosGet,
                        IdPrograma: parseInt(item.target.value),
                      });

                      setValues({
                        ...Values,
                        Programa: parseInt(item.target.value),
                      });
                    }}
                  >
                    <option value="">por favor, seleccione una opción</option>
                    {Data?.Programas?.map((item: any, index: number) => (
                      <option
                        key={index}
                        selected={
                          IdsDataExistence?.ProgramaId == item.Id ? true : false
                        }
                        value={item.Id}
                      >
                        {item?.Nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="SemestreAcademico"
                    className="mb-3 block text-base font-medium text-gray-800"
                  >
                    Semestre académico
                    <span className="text-red-900">(*)</span>
                  </label>

                  <select
                    id="SemestreAcademico"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 "
                    onChange={(item) => {
                      setDatosGet({
                        ...DatosGet,
                        IdSemestre: parseInt(item.target.value),
                      });
                      setValues({ ...Values, Semestre: item.target.value });
                    }}
                  >
                    <option value="">por favor, seleccione una opción</option>
                    {Data?.SemAcademico?.map((item: any, index: number) => (
                      <option
                        key={index}
                        selected={
                          IdsDataExistence?.SemestreId == item.SemestreId
                            ? true
                            : false
                        }
                        value={item.SemestreId}
                      >
                        {item?.NombreSemestre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="  grid sm:grid-cols-2 gap-2">
                <div className="mb-6">
                  <label
                    htmlFor="Grupo"
                    className="mb-3 block text-base font-medium text-gray-800"
                  >
                    Grupo <span className="text-red-900">(*)</span>
                  </label>

                  <select
                    id="Grupo"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 "
                    onChange={(item) => {
                      setValues({
                        ...Values,
                        GrupoDestino: parseInt(item?.target.value),
                      });
                    }}
                  >
                    <option value="">por favor, seleccione una opción</option>
                    {GrupoEdit?.GruposPrograma?.grupos?.map(
                      (item: any, index: number) => (
                        <>
                          <option
                            key={index}
                            selected={
                              IdsDataExistence?.GrupoId == item.Id
                                ? true
                                : false
                            }
                            value={item.Id}
                          >
                            {item?.Nombre}
                          </option>
                        </>
                      )
                    )}
                  </select>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-base font-medium text-gray-800"
                  >
                    Correo Electrónico <span className="text-red-900">(*)</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="email"
                    name="Email"
                    id="email"
                    required
                    onChange={hanlerChange}
                    placeholder="Ingrese Correo"
                    className="InputStyle"
                    // pattern=" /^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@a-zA-Z0-9?(?:.a-zA-Z0-9?)*$/"
                    title="Este Campo es para correo Electronico"
                    defaultValue={InfoEditar?.Correo}
                  />
                </div>
              </div>
              <div className="">
                <div className="mb-2">
                  <label
                    htmlFor="Telefono"
                    className="mb-3 block text-base font-medium text-gray-800"
                  >
                    WhatsApp <span className="text-red-900">(*)</span>
                  </label>
                  <input
                    autoComplete="off"
                    type="number"
                    name="Telefono"
                    id="Telefono"
                    required
                    onChange={hanlerChange}
                    placeholder="Ingrese Whattapp"
                    className="InputStyle"
                    pattern="/^[0-9]+$/"
                    title="Espacion Unicamente para Numero de Telefono"
                    defaultValue={InfoEditar?.Celular}
                  />
                </div>
              </div>

              {Object.keys(InfoEditar).length > 0 && (
                <div className="grid sm:grid-cols-2 gap-2">
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
                      onChange={hanlerChange}
                      placeholder="Ingrese Numero de Documento"
                      className="InputStyle"
                      defaultValue={InfoEditar?.Pass}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-around mt-3 gap-2">
              <button
                type="submit"
                className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
              >
                {Object.keys(InfoEditar).length > 0 ? "Actualizar" : "Guardar"}
              </button>
              <button
                className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal({
                    AddVisible: false,
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

export default ModalAddEstu;
