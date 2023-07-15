import React, { useEffect, useState } from "react";

function AddEnfermedades({
  titulo,
  setEnfermedades,
  VariableMap,
  Enfermedades,
  EnfermedadId,
  Arreglo,
  placeholder,
  isRequired,
}: any) {
  // quitar los espacios a NewPerfil
  const [InputValue, setInputValue] = useState("");

  const [alerta, setAlerta] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handelClickAddEnfermedad = (e: any) => {
    e.preventDefault();
    if (InputValue === "") {
      setMensaje("No se puede agregar un campo vacio");
      setAlerta(true);
      // alert("No se puede agregar un campo vacio");
    } else {
      if (EnfermedadId == 1) {
        if (
          Enfermedades?.EnfermedadesPadecidas[0]
            ?.toLowerCase()
            ?.includes("ningun")
        ) {
          Enfermedades.EnfermedadesPadecidas = [];
        }

        if (Enfermedades?.EnfermedadesPadecidas?.length > 0) {
          if (InputValue?.toLowerCase()?.includes("ningun")) {
            return;
          }
        }

        setEnfermedades((prev: any) => {
          return {
            ...prev,
            EnfermedadesPadecidas: [...prev.EnfermedadesPadecidas, InputValue],
          };
        });
      }
      if (EnfermedadId == 2) {
        if (
          Enfermedades?.EnfermedadesCronicas[0]
            ?.toLowerCase()
            ?.includes("ningun")
        ) {
          Enfermedades.EnfermedadesCronicas = [];
        }

        if (Enfermedades?.EnfermedadesCronicas?.length > 0) {
          if (InputValue.toLowerCase()?.includes("ningun")) {
            return;
          }
        }

        setEnfermedades((prev: any) => {
          return {
            ...prev,
            EnfermedadesCronicas: [...prev.EnfermedadesCronicas, InputValue],
          };
        });
      }
      if (EnfermedadId == 3) {
        if (
          Enfermedades?.PadecimientoAlergias[0]
            ?.toLowerCase()
            ?.includes("ningun")
        ) {
          Enfermedades.PadecimientoAlergias = [];
        }

        if (Enfermedades?.PadecimientoAlergias?.length > 0) {
          if (InputValue.toLowerCase()?.includes("ningun")) {
            return;
          }
        }
        setEnfermedades((prev: any) => {
          return {
            ...prev,
            PadecimientoAlergias: [...prev.PadecimientoAlergias, InputValue],
          };
        });
      }
      if (EnfermedadId == 4) {
        if (
          Enfermedades?.MedicamentosEspeciales[0]
            ?.toLowerCase()
            ?.includes("ningun")
        ) {
          Enfermedades.MedicamentosEspeciales = [];
        }
        setEnfermedades((prev: any) => {
          return {
            ...prev,
            MedicamentosEspeciales: [
              ...prev.MedicamentosEspeciales,
              InputValue,
            ],
          };
        });
      }
      if (EnfermedadId == 5) {
        if (
          Enfermedades?.ImpedimentosEjerciciosFisicos[0]
            ?.toLowerCase()
            ?.includes("ningun")
        ) {
          Enfermedades.ImpedimentosEjerciciosFisicos = [];
        }
        if (Enfermedades?.ImpedimentosEjerciciosFisicos?.length > 0) {
          if (InputValue?.toLowerCase()?.includes("ningun")) {
            return;
          }
        }
        setEnfermedades((prev: any) => {
          return {
            ...prev,
            ImpedimentosEjerciciosFisicos: [
              ...prev.ImpedimentosEjerciciosFisicos,
              InputValue,
            ],
          };
        });
      }
      if (EnfermedadId == 6) {
        if (
          Enfermedades?.ComplicacionesVisuales[0]
            ?.toLowerCase()
            ?.includes("ningun")
        ) {
          Enfermedades.ComplicacionesVisuales = [];
        }
        if (Enfermedades?.ComplicacionesVisuales?.length > 0) {
          if (InputValue.toLowerCase()?.includes("ningun")) {
            return;
          }
        }
        setEnfermedades((prev: any) => {
          return {
            ...prev,
            ComplicacionesVisuales: [
              ...prev.ComplicacionesVisuales,
              InputValue,
            ],
          };
        });
      }
      if (EnfermedadId == 7) {
        if (
          Enfermedades?.ComplicacionesAuditivas[0]
            ?.toLowerCase()
            ?.includes("ningun")
        ) {
          Enfermedades.ComplicacionesAuditivas = [];
        }
        if (Enfermedades?.ComplicacionesAuditivas?.length > 0) {
          if (InputValue?.toLowerCase()?.includes("ningun")) {
            return;
          }
        }
        setEnfermedades((prev: any) => {
          return {
            ...prev,
            ComplicacionesAuditivas: [
              ...prev.ComplicacionesAuditivas,
              InputValue,
            ],
          };
        });
      }
    }

    setInputValue("");
  };
  const handerRemoveUser = (key: number, arreglo: any) => {
    const newArreglo = arreglo.filter(
      (item: any, index: number) => index !== key
    );
    if (EnfermedadId == 1) {
      setEnfermedades((prev: any) => {
        return { ...prev, EnfermedadesPadecidas: newArreglo };
      });
    }
    if (EnfermedadId == 2) {
      setEnfermedades((prev: any) => {
        return { ...prev, EnfermedadesCronicas: newArreglo };
      });
    }
    if (EnfermedadId == 3) {
      setEnfermedades((prev: any) => {
        return { ...prev, PadecimientoAlergias: newArreglo };
      });
    }
    if (EnfermedadId == 4) {
      setEnfermedades((prev: any) => {
        return { ...prev, MedicamentosEspeciales: newArreglo };
      });
    }
    if (EnfermedadId == 5) {
      setEnfermedades((prev: any) => {
        return { ...prev, ImpedimentosEjerciciosFisicos: newArreglo };
      });
    }
    if (EnfermedadId == 6) {
      setEnfermedades((prev: any) => {
        return { ...prev, ComplicacionesVisuales: newArreglo };
      });
    }
    if (EnfermedadId == 7) {
      setEnfermedades((prev: any) => {
        return { ...prev, ComplicacionesAuditivas: newArreglo };
      });
    }
  };
  return (
    <>
      <div className="container ">
        <div className="bg-white p-3 max-w-3xl mx-auto">
          <div className="text-center">
            <h1 className="text-xl font-bold">
              {titulo}
              {isRequired && (
                <>
                  <span className="text-red-700"> (*)</span>
                </>
              )}
            </h1>
            <form
              onSubmit={handelClickAddEnfermedad}
              className="mt-5 flex justify-between"
            >
              <input
                autoComplete="off"
                onChange={(e) => setInputValue(e.target.value)}
                className="w-80 border-b-2 border-gray-500 text-black capitalize"
                type="text"
                placeholder={placeholder}
                // autoFocus
                value={InputValue}
              />
              <button className="ml-2 border-2 border-blue-500 p-2 text-blue-500 hover:text-white hover:bg-teal-100 rounded-lg flex">
                <svg
                  className="h-4 w-4 text-blue-900"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <circle cx={12} cy={12} r={9} />{" "}
                  <line x1={9} y1={12} x2={15} y2={12} />{" "}
                  <line x1={12} y1={9} x2={12} y2={15} />
                </svg>
              </button>
            </form>
          </div>
          <div className="mt-8 max-h-[400px] overflow-auto">
            {Arreglo?.map((item: any, key: number) => {
              return (
                <ul key={key}>
                  <li className=" rounded-lg">
                    <div className="flex align-middle flex-row justify-between">
                      <div className="p-2">
                        <p className="text-lg text-black capitalize">{item}</p>
                      </div>
                      <div className="flex space-x-2 ">
                        <button
                          onClick={() => handerRemoveUser(key, Arreglo)}
                          // className=" text-red-500 border-2 border-red-500 p-2 hover:bg-red-200 rounded-lg"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-7 h-7 text-red-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>

                          {/* <span>Eliminar</span> */}
                        </button>
                      </div>
                    </div>
                    <hr className="mt-2" />
                  </li>
                </ul>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddEnfermedades;
