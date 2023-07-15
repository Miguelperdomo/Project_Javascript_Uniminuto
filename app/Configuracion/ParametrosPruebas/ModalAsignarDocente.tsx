import React from "react";

type Props = {
  Asignacion: any;
  setAsignacion: React.Dispatch<React.SetStateAction<any>>;
  setCompetenciaGenerica: React.Dispatch<React.SetStateAction<any>>;
  setDocentesDb: React.Dispatch<React.SetStateAction<any>>;
  DocentesDb: any;
  CompetenciaGenerica: any;
};
const ModalAsignarDocente = ({
  Asignacion,
  setAsignacion,
  setCompetenciaGenerica,
  setDocentesDb,
  DocentesDb,
  CompetenciaGenerica,
}: any) => {
  return (
    <>
      <div className="bg-[#000236]/20 transition duration-150 ease-in-out z-20 fixed top-0 right-0 bottom-0 left-0">
        <div className="container mx-auto  w-11/12 md:w-2/3 max-w-5xl">
          <div className="flex  w-full flex-col items-center justify-center gap-y-2">
            <div className="max-w-[25rem] min-w-[17rem] rounded-xl border border-gray-200 bg-white pt-4 px-2 shadow-md shadow-gray-100">
              <div className="flex items-center justify-between px-2 text-base font-medium text-gray-700">
                <div>Docentes - {Asignacion?.Competencia?.Nombre}</div>

                <div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setAsignacion({ Show: false } as any);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-black"
                  >
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 18L18 6M6 6l12 12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <input
                autoComplete="off"
                // value={filterText}
                onChange={(e) => {
                  const { value } = e.target;

                  console.log("value", value);

                  const filteredData = DocentesDb?.filter((el: any) => {
                    const nombre = el?.Nombre;
                    const apellido = el?.Apellidos;

                    const programa = el?.NombrePrograma?.normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .toLowerCase();

                    const nombreCompleto = `${nombre}${apellido}`;

                    return (
                      (nombreCompleto &&
                        nombreCompleto
                          ?.toString()
                          ?.replace(/\s+/g, " ")
                          ?.toLowerCase()
                          .includes(value.toLowerCase())) ||
                      (programa &&
                        programa
                          ?.toString()
                          ?.replace(/\s+/g, " ")
                          ?.toLowerCase()
                          .includes(value.toLowerCase()))
                    );
                  });

                  setAsignacion({
                    ...Asignacion,
                    Docentes: filteredData,
                  });
                }}
                autoFocus
                placeholder="Buscar por nombres o programa"
                className="mt-2 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              />
              <div className="mt-2">
                <div className="flex max-h-[400px] w-full flex-col overflow-y-auto ">
                  {Asignacion?.Docentes?.map((el: any) => (
                    <button
                      key={el?.Id}
                      onClick={(e) => {
                        e.preventDefault();
                        setCompetenciaGenerica((prev: any) => {
                          prev[Asignacion?.Competencia?.index] = {
                            ...prev[Asignacion?.Competencia?.index],
                            DocenteAsignado: { ...el },
                          };

                          return [...prev];
                        });
                      }}
                      className="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-green-10 focus:bg-green-700 focus:text-white text-gray-700 focus:font-bold"
                    >
                      <div className="flex h-12 w-12 items-center rounded-lg bg-gray-200 text-black group-hover:bg-green-200">
                        <span className="tag w-full text-center text-2xl font-medium  group-hover:text-green-900">
                          {el?.Nombre?.charAt(0)}
                        </span>
                      </div>
                      <div className="flex flex-col items-start justify-between font-light ">
                        <p className="text-[15px]">
                          {" "}
                          {el?.Nombre?.toUpperCase()}{" "}
                          {el?.Apellidos?.toUpperCase()}
                        </p>
                        <span className="text-xs font-light ">
                          {el?.NombrePrograma}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label
                  htmlFor="Mooc"
                  className="my-2 px-4 text-[15px] text-gray-700"
                >
                  Link Mooc:
                </label>
                <input
                  placeholder="Ingrese link para reforzar la competencia"
                  className="InputStyle"
                  type="text"
                  name="LinkMooc"
                  id="Mooc"
                  onChange={(e) => {
                    e.preventDefault();
                    setCompetenciaGenerica((prev: any) => {
                      prev[Asignacion?.Competencia?.index] = {
                        ...prev[Asignacion?.Competencia?.index],
                        LinkMock: e.target.value,
                      };

                      return [...prev];
                    });
                  }}
                  // expresion regular para validad que sea un link
                  pattern="https?://.+"
                />
              </div>

              <div>
                <label className="my-2 px-4 text-[15px] text-gray-700">
                  Duración
                </label>
                <div className="flex justify-center">
                  <div className="">
                    Hora :
                    <select
                      required
                      className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 
                      text-gray-600 placeholder-gray-400
                      outline-none"
                      onChange={(e) => {
                        e.preventDefault();
                        setCompetenciaGenerica((prev: any) => {
                          prev[Asignacion?.Competencia?.index] = {
                            ...prev[Asignacion?.Competencia?.index],
                            Hora: e.target.value,
                          };

                          return [...prev];
                        });
                      }}
                    >
                      <option value="">Hora</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    Minutos :
                    <select
                      className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 
                  text-gray-600 placeholder-gray-400
                  outline-none"
                      onChange={(e) => {
                        e.preventDefault();
                        setCompetenciaGenerica((prev: any) => {
                          prev[Asignacion?.Competencia?.index] = {
                            ...prev[Asignacion?.Competencia?.index],
                            Minutos: e.target.value,
                          };

                          return [...prev];
                        });
                      }}
                    >
                      <option value="">Minutos</option>
                      <option value="00">00</option>

                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                      <option value="25">25</option>
                      <option value="30">30</option>
                      <option value="35">35</option>
                      <option value="40">40</option>
                      <option value="45">45</option>
                      <option value="50">50</option>
                      <option value="55">55</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-around mt-3 gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();

                    if (
                      !CompetenciaGenerica[Asignacion?.Competencia?.index]
                        .DocenteAsignado?.Id
                    ) {
                      alert("Debe seleccionar un docente");
                      return;
                    }

                    if (
                      !CompetenciaGenerica[Asignacion?.Competencia?.index]?.Hora
                    ) {
                      alert("Debe seleccionar una hora");
                      return;
                    }
                    if (
                      !CompetenciaGenerica[Asignacion?.Competencia?.index]
                        ?.Minutos
                    ) {
                      alert("Debe seleccionar un minuto");
                      return;
                    }

                    setAsignacion({ Show: false } as any);

                    alert("Asignado correctamente");
                  }}
                  className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
                >
                  Asignar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalAsignarDocente;
