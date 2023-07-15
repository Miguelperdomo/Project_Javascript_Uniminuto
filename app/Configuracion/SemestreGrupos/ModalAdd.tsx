"use client";
import { useEffect, useState } from "react";
import { Administrativo, VisibilidadModal } from "../../../typings";
import Select from "react-select";
import ItemCOA from "../../ItemCOA";

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
  setGradosGrupos: React.Dispatch<React.SetStateAction<Administrativo[]>>;
};

const ModalAdd = ({ setShowModal, setGradosGrupos }: Props) => {
  const [Values, setValues] = useState({
    IdSubSede: localStorage.getItem("IdSubSede") || "",
  } as any);
  const [Data, setData] = useState({
    IdSubSede: localStorage.getItem("IdSubSede") || 0,
  } as any);

  const handerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Values?.IdSubSede === "" || Values?.IdSubSede == "0") {
      alert("Selecciona un COA ");
      return;
    }

    console.log("🚀 ~ file: ModalAdd.tsx:38 ~ handerSubmit ~ Values", Values);

    if (Object.keys(Values).length != 8) {
      alert("por favor, llene todos los campos");
      return;
    }

    try {
      const sentDataRes = await fetch(
        "/api/Configuracion/GradosGrupos/AddGradosGrupos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Values),
        }
      ).then((res) => res.json());

      const resGrados = await fetch(
        `/api/Configuracion/GradosGrupos/GetGradosGrupos?SubSede=${Data?.IdSubSede}`
      ).then((res) => res.json());

      setGradosGrupos(resGrados?.grados);
      setShowModal((prev) => ({ ...prev, AddVisible: false }));

      alert(sentDataRes?.body);
    } catch (error) {
      console.error(error);
      alert("Error al enviar la información");
    }

    // setGradosGrupos((prev) => [...prev, sentDataRes?.administrativo]);
  };

  const hanlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...Values, [e.target.name]: e.target.value });
  };

  const getData = async (IdSubSede: string) => {
    try {
      const InfoBase = await fetch(
        `/api/Configuracion/GradosGrupos/GetInfoModal?SubSede=${IdSubSede}`
      ).then((res) => res.json());

      setData({
        ...Data,
        ...InfoBase,
      });
    } catch (error) {
      alert("Error al cargar la información");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("IdSubSede") != "0") {
      let IdSubSede = localStorage.getItem("IdSubSede") || "";
      getData(IdSubSede);
    }
  }, []);

  // useEffect(() => {

  // }, [Values?.ProgramAcademico])

  return (
    <div className="bg-[#000236]/100 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
      <div className="container mx-auto  w-11/12 md:w-2/3 max-w-3xl">
        <div className="relative overflow-auto  max-h-screen  py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <h1 className="text-center text-lg tracking-normal leading-tight mb-4 bg-[#151A8B] w-full text-white p-4 rounded-lg font-bold ">
            Agregar Grupos
          </h1>

          <form onSubmit={handerSubmit}>
            {Data?.IdSubSede == "0" && (
              <>
                <ItemCOA
                  setValues={setValues}
                  Values={Values}
                  getDataModal={getData}
                />
              </>
            )}
            <div className="mb-4 ">
              <div className="mb-2">
                <label
                  htmlFor="Programa Academico"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Programa<span className="text-red-900">(*)</span>
                </label>
                <Select
                  options={Data?.programa || []}
                  getOptionLabel={(item: any) => item.Nombre}
                  getOptionValue={(item: any) => item.Id}
                  onChange={async (item: any) => {
                    setValues({
                      ...Values,
                      ProgramAcademico: item.Id,
                      Sigla: item.Sigla,
                      Periodisidad: item.Periodisidad,
                      SemestreAcademico: null,
                    });

                    try {
                      const PeriodisidadRes = await fetch(
                        `/api/Configuracion/GradosGrupos/GetSemestreLectivo?Periodisidad=${item?.Periodisidad}`
                      ).then((res) => res?.json());

                      setData({
                        ...Data,
                        semestreAcademico: PeriodisidadRes?.semestreLectivo,
                        Semestres: PeriodisidadRes?.Semestres,
                      });
                    } catch (error) {
                      console.error(error);
                      alert("Error al cargar la información");
                    }
                  }}
                  placeholder="Seleccione un Programa"
                />
              </div>
            </div>
            <div className="mb-4 grid sm:grid-cols-2 gap-6">
              <div className="mb-2">
                <label
                  htmlFor="SemestreAcademico"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Semestre<span className="text-red-900">(*)</span>
                </label>
                <Select
                  options={Data?.Semestres}
                  isDisabled={!Data?.Semestres?.length}
                  placeholder="Seleccione un Semestre"
                  onChange={(item: any) => {
                    setValues({
                      ...Values,
                      SemestresId: item.Id,
                      SiglaSemestre: item.Numero,
                    });
                  }}
                  getOptionLabel={(item: any) => item?.Nombre}
                  getOptionValue={(item: any) => item?.Id}
                />{" "}
              </div>

              {/* periodicidad  */}
              <div className="mb-2">
                {(Values?.Periodisidad == "C" && (
                  <>
                    <label
                      htmlFor="SemestreYear"
                      className="mb-3 block text-base font-medium text-gray-800"
                    >
                      ¿En qué cuatrimestre se encuentra?{" "}
                      <span className="text-red-900">(*)</span>
                    </label>
                    <>
                      <Select
                        options={Data?.semestreAcademico || []}
                        placeholder="Seleccione un periodo"
                        onChange={(item: any) => {
                          setValues({ ...Values, SemestreAcademico: item.Id });
                        }}
                        getOptionLabel={(item: any) => item.Nombre}
                        getOptionValue={(item: any) => item.Id}
                      />
                    </>
                  </>
                )) ||
                  (Values?.Periodisidad == "S" && (
                    <>
                      <label
                        htmlFor="SemestreYear"
                        className="mb-3 block text-base font-medium text-gray-800"
                      >
                        ¿En qué semestre se encuentra?{" "}
                        <span className="text-red-900">(*)</span>
                      </label>

                      <>
                        <Select
                          options={Data?.semestreAcademico || []}
                          placeholder="Seleccione un periodo"
                          onChange={(item: any) => {
                            setValues({
                              ...Values,
                              SemestreAcademico: item.Id,
                            });
                          }}
                          getOptionLabel={(item: any) => item.Nombre}
                          getOptionValue={(item: any) => item.Id}
                        />
                      </>
                    </>
                  ))}
              </div>
            </div>
            <div className="mb-4 grid sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="NumeroGrupos"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Cantidad de Grupos <span className="text-red-900">(*)</span>
                </label>
                <input
                  autoComplete="off"
                  type="number"
                  name="NumeroGrupos"
                  required
                  onChange={hanlerChange}
                  id="NumeroGrupos"
                  placeholder="Ingrese número de grupos"
                  className="InputStyle"
                />
              </div>
              {/* <div>
                <label
                  htmlFor="NumeroGrupos"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Dirección Sede <span className="text-red-900">(*)</span>
                </label>
                <input
                  type="number"
                  name="NumeroGrupos"
                  required
                  onChange={hanlerChange}
                  id="NumeroGrupos"
                  placeholder="Ingrese Dirección Sede"
                  className="InputStyle"
                />
              </div> */}
            </div>
            <div className=" flex justify-around mt-3 gap-6">
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
                  setShowModal((prev) => ({ ...prev, AddVisible: false }));
                }}
              >
                Cerrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalAdd;
