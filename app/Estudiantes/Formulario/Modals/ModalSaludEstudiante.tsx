import React, { useEffect, useState } from "react";
import { visibleFormulario } from "../../../../typings";
import AddEnfermedades from "./Component/AddEnfermedades";
type Props = {
  setVisible: React.Dispatch<React.SetStateAction<visibleFormulario>>;
  Documento: number;
};
type Enfermadades = {
  EnfermedadesPadecidas: [""] | ["Ninguna"] | [];
  EnfermedadesCronicas: [""] | ["Ninguna"] | [];
  PadecimientoAlergias: [""] | ["Ninguna"] | [];
  MedicamentosEspeciales: [""] | ["Ninguna"] | [];
  ImpedimentosEjerciciosFisicos: [""] | ["Ninguna"] | [];
  ComplicacionesVisuales: [""] | ["Ninguna"] | [];
  ComplicacionesAuditivas: [""] | ["Ninguna"] | [];
};
function ModalSaludEstudiante({ setVisible, Documento }: Props) {
  const [data, setData] = useState({});
  const [Enfermedades, setEnfermedades] = useState({
    EnfermedadesPadecidas: [],
    EnfermedadesCronicas: [],
    PadecimientoAlergias: [],
    MedicamentosEspeciales: [],
    ImpedimentosEjerciciosFisicos: [],
    ComplicacionesVisuales: [],
    ComplicacionesAuditivas: [],
  } as Enfermadades);
  let TipoEnfermedades = [
    {
      id: 1,
      titulo: "Enfermedades - Padecidas",
      placeholder: "Ej: Bronquitis",
      VariableMap: "EnfermedadesPadecidas",
      Array: Enfermedades?.EnfermedadesPadecidas,
      isRequired: false,
    },

    {
      id: 2,
      titulo: "Enfermedades - Crónicas",
      placeholder: "Ej: Artristis",
      VariableMap: "EnfermedadesCronicas",
      Array: Enfermedades?.EnfermedadesCronicas,
      isRequired: false,
    },

    {
      id: 3,
      titulo: "Padecimiento - Alergias",
      placeholder: "Ej: Rinitis",
      VariableMap: "PadecimientoAlergias",
      Array: Enfermedades?.PadecimientoAlergias,
      isRequired: false,
    },
    {
      id: 4,
      titulo: "Qué Medicamentos Especiales toma?",
      placeholder: "Ej: Clonazepam",
      VariableMap: "MedicamentosEspeciales",
      Array: Enfermedades?.MedicamentosEspeciales,
      isRequired: false,
    },
    {
      id: 5,
      titulo: "Impedimentos para realizar ejercicios físicos:",
      placeholder: "Ej: Obesidad",
      VariableMap: "ImpedimentosEjerciciosFisicos",
      Array: Enfermedades?.ImpedimentosEjerciciosFisicos,
      isRequired: false,
    },
    {
      id: 6,
      titulo: "Complicaciones - Visuales",
      placeholder: "Ej: Estrabismo",
      VariableMap: "ComplicacionesVisuales",
      Array: Enfermedades?.ComplicacionesVisuales,
      isRequired: false,
    },
    {
      id: 7,
      titulo: "Complicaciones - Auditivas",
      placeholder: "Ej: Otitis",
      VariableMap: "ComplicacionesAuditivas",
      Array: Enfermedades?.ComplicacionesAuditivas,
      isRequired: false,
    },
  ];
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
        `/api/Formulario/BaseInfoSaludEstudiante?num=${Documento}`
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
      <div className="bg-[#070e54]/100 transition duration-150 ease-in-out z-30 fixed top-0 right-0 bottom-0 left-0">
        <div className="container mx-auto  w-11/12 md:w-full max-w-6xl">
          <div className="pt-4 pb-3 overflow-auto h-auto md:min-h-[34vh] md:max-h-[90vh] px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
            <h1 className="text-white flex justify-center bg-[#151A8B] text-center font-lg font-bold tracking-normal leading-tight mb-4 p-4 rounded-lg">
              INFORMACIÓN SOBRE SALUD DEL ESTUDIANTE
            </h1>
            <div className="justify-center pb-6 flex items-center">
              <label className="mx-3 text-base font-medium hover:font-bold text-[#b33e2e]">
                De clic en el recuadro si el estudiante no padece ninguna
                enfermedad o control de medicamentos, para llenar con (NINGUNA)
                todos los campos solicitados o restantes.
              </label>
              <input
                autoComplete="off"
                autoFocus
                type="checkbox"
                className="h-5 w-5 "
                onChange={(e) => {
                  if (e.target.checked) {
                    setEnfermedades({
                      EnfermedadesPadecidas: Enfermedades?.EnfermedadesPadecidas
                        ?.length
                        ? [...Enfermedades?.EnfermedadesPadecidas]
                        : ["Ninguna"],
                      EnfermedadesCronicas: Enfermedades?.EnfermedadesCronicas
                        ?.length
                        ? [...Enfermedades?.EnfermedadesCronicas]
                        : ["Ninguna"],
                      PadecimientoAlergias: Enfermedades?.PadecimientoAlergias
                        ?.length
                        ? [...Enfermedades?.PadecimientoAlergias]
                        : ["Ninguna"],
                      MedicamentosEspeciales: Enfermedades
                        ?.MedicamentosEspeciales?.length
                        ? [...Enfermedades?.MedicamentosEspeciales]
                        : ["Ninguna"],
                      ImpedimentosEjerciciosFisicos: Enfermedades
                        ?.ImpedimentosEjerciciosFisicos?.length
                        ? [...Enfermedades?.ImpedimentosEjerciciosFisicos]
                        : ["Ninguna"],
                      ComplicacionesVisuales: Enfermedades
                        ?.ComplicacionesVisuales?.length
                        ? [...Enfermedades?.ComplicacionesVisuales]
                        : ["Ninguna"],
                      ComplicacionesAuditivas: Enfermedades
                        ?.ComplicacionesAuditivas?.length
                        ? [...Enfermedades?.ComplicacionesAuditivas]
                        : ["Ninguna"],
                    });
                  } else {
                    setEnfermedades({
                      EnfermedadesPadecidas:
                        Enfermedades?.EnfermedadesPadecidas?.length &&
                        !Enfermedades?.EnfermedadesPadecidas[0]
                          ?.toLowerCase()
                          ?.includes("ningun")
                          ? [...Enfermedades?.EnfermedadesPadecidas]
                          : [],
                      EnfermedadesCronicas:
                        Enfermedades?.EnfermedadesCronicas?.length &&
                        !Enfermedades?.EnfermedadesCronicas[0]
                          ?.toLowerCase()
                          ?.includes("ningun")
                          ? [...Enfermedades?.EnfermedadesCronicas]
                          : [],
                      PadecimientoAlergias:
                        Enfermedades?.PadecimientoAlergias?.length &&
                        !Enfermedades?.PadecimientoAlergias[0]
                          ?.toLowerCase()
                          ?.includes("ningun")
                          ? [...Enfermedades?.PadecimientoAlergias]
                          : [],
                      MedicamentosEspeciales:
                        Enfermedades?.MedicamentosEspeciales?.length &&
                        !Enfermedades?.MedicamentosEspeciales[0]
                          ?.toLowerCase()
                          ?.includes("ningun")
                          ? [...Enfermedades?.MedicamentosEspeciales]
                          : [],
                      ImpedimentosEjerciciosFisicos:
                        Enfermedades?.ImpedimentosEjerciciosFisicos?.length &&
                        !Enfermedades?.ImpedimentosEjerciciosFisicos[0]
                          ?.toLowerCase()
                          ?.includes("ningun")
                          ? [...Enfermedades?.ImpedimentosEjerciciosFisicos]
                          : [],
                      ComplicacionesVisuales:
                        Enfermedades?.ComplicacionesVisuales?.length &&
                        !Enfermedades?.ComplicacionesVisuales[0]
                          ?.toLowerCase()
                          ?.includes("ningun")
                          ? [...Enfermedades?.ComplicacionesVisuales]
                          : [],
                      ComplicacionesAuditivas:
                        Enfermedades?.ComplicacionesAuditivas?.length &&
                        !Enfermedades?.ComplicacionesAuditivas[0]
                          ?.toLowerCase()
                          ?.includes("ningun")
                          ? [...Enfermedades?.ComplicacionesAuditivas]
                          : [],
                    });
                  }
                }}
              />
            </div>
            <div className="grid grid-cols-1 overflow-auto h-[20rem] md:grid-cols-2 lg:grid-cols-3 justify-center items-start">
              {Object.keys(data).length
                ? TipoEnfermedades.map((item) => (
                    <div key={item.id}>
                      <AddEnfermedades
                        titulo={item.titulo}
                        setEnfermedades={setEnfermedades}
                        VariableMap={item.VariableMap}
                        Enfermedades={Enfermedades}
                        EnfermedadId={item.id}
                        Arreglo={item.Array}
                        placeholder={item.placeholder}
                        isRequired={item.isRequired}
                      />
                    </div>
                  ))
                : ""}
            </div>

            <div className="flex justify-around mt-3">
              <button
                type="submit"
                className="mr-1 md:mr-0  disabled:opacity-30 text-white bg-[#151A8B] hover:bg-[#070E54] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                onClick={() => handerSubmit}
              >
                Guardar Sección
              </button>
              <button
                className="text-white bg-[#151A8B] hover:bg-[#070E54] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                onClick={(e) => {
                  e.preventDefault();
                  setVisible({ SaludStudent: false });
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalSaludEstudiante;
