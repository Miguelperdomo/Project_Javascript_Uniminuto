"use client";
import Loading from "@/app/loading";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DatosAcademicos from "./DatosAcademicos";

type Props = {
  docu: number;

  InfoUrl: {
    SubSede: string;
  };
};
type sectionFo = {
  seccion: string;
  id: number;
  comparar: string;
};
const BodyComponent = ({ docu, InfoUrl }: Props) => {
  const [accept, setAccept] = useState(false);
  const [data, setData] = useState({
    info: {},
  } as any);

  const [Cargando, setCargando] = useState(false);

  const change = (e: any) => {
    const { value } = e.target;
    if (value == "S") {
      setAccept(true);
    } else {
      setAccept(false);
    }
  };
  const sectionForm: sectionFo[] = [
    {
      seccion: "DATOS ACADÉMICOS",
      id: 1,
      comparar: "DatosAcademicos",
    },
    {
      seccion: "INFORMACIÓN BÁSICA DEL ESTUDIANTE",
      id: 2,
      comparar: "INFORMACION DEL ESTUDIANTE",
    },
    {
      seccion: "NECESIDADES EDUCATIVAS ESPECIALES N.E.E",
      id: 3,
      comparar: "N.E.E",
    },

    {
      seccion: "ESTUDIANTE VÍCTIMA DE CONFLICTO	",
      id: 6,
      comparar: "VICTIMA CONFLICTO",
    },
    {
      seccion: "INFORMACIÓN SOBRE SALUD DEL ESTUDIANTE",
      id: 7,
      comparar: "SALUD ESTUDIANTE",
    },
  ];
  const SectionFormated: any = [];
  sectionForm.map((info) => {
    const compara = data?.save?.find((e: any) => e.Seccion == info.comparar);
    if (compara) {
      SectionFormated.push({ ...info, save: true });
    } else {
      SectionFormated.push({ ...info, save: false });
    }
  });

  useEffect(() => {
    const GetData = async () => {
      setCargando(true);
      const res = await fetch(
        `/api/Estudiantes/QueremosConocerte/BaseInfoColegio?SubSede=${InfoUrl?.SubSede}`
      ).then((res) => res.json());
      console.log("res", res);

      setData(res?.DatosUniversidad);
      setCargando(false);
    };

    try {
      GetData();
    } catch (error) {
      console.log("error", error);
      alert("Error al cargar la información del colegio");
    }
  }, []);

  return (
    <>
      <div className="container max-w-6xl mx-auto bg-blue-50">
        {/* header */}

        {Cargando ? (
          <Loading />
        ) : (
          <div className="">
            <section className="flex text-white text-center  space-x-8 justify-around bg-[#070E54]  rounded-b-2xl">
              <figure>
                <Image
                  src="/EscudoUniminuto.gif"
                  alt="Uniminuto"
                  width={250}
                  height={250}
                  className="object-cover"
                />
              </figure>
              {data && (
                <>
                  <div className="text-sm sm:text-lg  flex flex-col items-center justify-center lg:text-xl font-bold">
                    <h1 className=" uppercase">{data?.nombre || ""}.</h1>
                    <h3 className="">
                      {`Telefonos: ${data?.telefono1} - ${data.telefono2}`}
                    </h3>
                    <h3 className="">{`${data.direccion}`}</h3>
                  </div>
                </>
              )}
            </section>
            <hr className="my-8 h-px bg-gray-900 border-0"></hr>
            <section className="text-center text-xl ">
              <b>
                <h1>FORMULARIO ÚNICO DE INSCRIPCIÓN PARA REGISTRO</h1>
              </b>
            </section>
            <section className="text-center">
              {/* title */}
              <div>
                <b>
                  <i>
                    <h1>
                      Los campos con{" "}
                      <b>
                        <span className="text-red-600 font-bold">(*)</span>
                      </b>{" "}
                      de color{" "}
                      <b>
                        <span className="text-red-600 font-bold">rojo</span>
                      </b>{" "}
                      son obligatorios y deben ser diligenciados en su totalidad
                    </h1>
                  </i>
                </b>
                <br></br>
                <p className="max-h-25 max-w-4xl m-auto">
                  <b>Aviso de privacidad:</b> He leído, he sido informado (a), y
                  autorizo a <b>UNIMINUTO</b> el tratamiento de mis datos
                  personales para los fines previamente comunicados y acepto la
                  política de tratamiento de datos personales. Conoce nuestra
                  política de tratamiento de datos personales:{" "}
                  <a
                    href="https://portalweb-uniminuto.s3.us-east-1.amazonaws.com/activos_digitales/DocInstitucionales/Politicas/4-Res1484_PolTratamientoInf.pdf"
                    className="text-blue-600 underline"
                    target="_blank"
                  >
                    Politicas de Tratamiento de datos
                  </a>
                </p>
                <center>
                  <select
                    name="aceptacion"
                    id="aceptacion"
                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => change(e)}
                  >
                    <option value="" selected>
                      Seleccione
                    </option>
                    <option value="S">Si</option>
                    <option value="N">No</option>
                  </select>
                </center>
                <hr className="my-8 h-px bg-gray-900 border-0"></hr>
              </div>
            </section>
            {accept && (
              <>
                <div className="w-full py-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-[2.5rem]">
                    {SectionFormated?.map((item: any, key: number) => {
                      return (
                        <DatosAcademicos
                          key={key}
                          data={{
                            documento: docu,
                            informacion: item,
                            count: key,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default BodyComponent;
