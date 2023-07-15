"use client";
import React, { useEffect, useState } from "react";
import { VisibilidadModal } from "../../../typings";
import Select from "react-select";
import PresentarPrueba from "./PresentarPrueba";
import { useSearchParams } from "next/navigation";
import Loading from "@/app/loading";

const BodyComponent = () => {
  const [Values, setValues] = useState({} as any);
  const [ShowModal, setShowModal] = useState<VisibilidadModal>({
    AddVisible: false,
  });
  const searchParams = useSearchParams();
  const [isPending, setIsPending] = useState(false as boolean);
  const [data, setData] = useState([] as any[]);

  const [IdPruebaSelected, setIdPruebaSelected] = useState(
    null as number | null
  );

  useEffect(() => {
    const GetData = async () => {
      setIsPending(true);
      const SubSede: any = searchParams.get("SubSede");
      const IdRol: any = searchParams.get("IdRol");
      const IdUser: any = searchParams.get("IdUser");
      const Doc: any = searchParams.get("Doc");

      const data = await fetch(
        `/api/Estudiantes/GetPruebasEstudiante?SubSede=${SubSede}&IdRol=${IdRol}&IdUser=${IdUser}&Doc=${Doc}`
      ).then((res) => res.json());

      setData(data?.pruebas || []);
      setIsPending(false);
    };

    try {
      GetData();
    } catch (error) {
      console.log(error);
      alert("Error al cargar los datos");
    }
  }, []);

  return (
    <>
      {ShowModal?.AddVisible && (
        <PresentarPrueba
          setShowModal={setShowModal}
          DataSelected={Values}
          IdPruebaSelected={IdPruebaSelected}
        />
      )}

      {isPending ? (
        <Loading />
      ) : (
        <div className="flex mt-10 flex-col sm:justify-center items-center">
          <div className="relative sm:max-w-sm w-full">
            <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6" />
            <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6" />
            <div className="border-2 border-gray-400 relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
              <form>
                <div className="mb-2">
                  <label
                    htmlFor="Nombre"
                    className="mb-3 block text-base font-medium text-gray-800"
                  >
                    Seleccione la prueba que desea presentar :
                  </label>
                  <Select
                    options={data}
                    isDisabled={data?.length === 0}
                    getOptionLabel={(item: any) =>
                      `Saber Pro (#${item.IdPrueba})`
                    }
                    getOptionValue={(item) => item.IdPrueba}
                    onChange={(item) => {
                      setValues({ ...Values, PruebaID: item?.IdPrueba });

                      setIdPruebaSelected(item?.IdPrueba);
                    }}
                    placeholder="Seleccione una Opción"
                  />
                </div>

                {Values?.PruebaID && (
                  <div>
                    <button
                      onClick={async (e) => {
                        try {
                          e.preventDefault();
                          setShowModal({
                            AddVisible: true,
                          });

                          const SubSede: any = searchParams.get("SubSede");
                          const IdRol: any = searchParams.get("IdRol");
                          const IdUser: any = searchParams.get("IdUser");
                          const Doc: any = searchParams.get("Doc");
                          const RegistrarAsistencia = await fetch(
                            "/api/Estudiantes/RegisterAsistencia",
                            {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                IdPrueba: Values?.PruebaID,
                                SubSede,
                                IdRol,
                                IdUser,
                                Doc,
                              }),
                            }
                          ).then((res) => res.json());
                          alert(RegistrarAsistencia?.body);
                          setValues({} as any);

                          setData((prev) =>
                            prev.filter(
                              (item) => item.IdPrueba !== Values?.PruebaID
                            )
                          );
                        } catch (error) {
                          console.log(error);
                          alert("Error al registrar la asistencia");
                        }
                      }}
                      className="BtnHeader ml-20 mt-5 hover:shadow-inner focus:outline-none transition duration-500 ease-in-out text-black transform hover:-translate-x hover:scale-105"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      <span>Presentar Prueba</span>
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BodyComponent;
