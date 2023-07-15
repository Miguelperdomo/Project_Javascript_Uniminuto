"use client";
import React, { useEffect } from "react";
import { VisibilidadModal } from "../../../typings";
import Select from "react-select";
import axios from "axios";
import AddSubSede from "./AddSubSede";
import TableSubSedes from "./TableSubSedes";
import EditSubSede from "./EditSubSede";
import { useSearchParams } from "next/navigation";
import Loading from "@/app/loading";

type Props = {
  rectorias: {
    rectorias: string[];
  };
  subSedes: { SedesSubSedes: string[] };
};
const BodyComponent = () => {
  const [ShowModal, setShowModal] = React.useState({} as VisibilidadModal);
  const [Values, setValues] = React.useState({} as any);
  const [InfoEditar, setInfoEditar] = React.useState({} as {});

  const [Data, setData] = React.useState({
    rectorias: [],
    SedesRectorias: [],
  });

  const [SubSedes, setSubSedes] = React.useState([] as any[]);
  const [isPending, setIsPending] = React.useState(false as boolean);
  const getData = async (RectoriaSelected: number) => {
    const response = await axios.get(
      "/api/Configuracion/SubSedes/getSedesRectorias",
      {
        params: {
          id: RectoriaSelected,
        },
      }
    );

    setData({ ...Data, SedesRectorias: response?.data?.sedesRectorias || [] });
    setValues({ ...Values, SedeRectoriaSelected: null });
  };

  useEffect(() => {
    if (Values?.RectoriaSelected) {
      getData(Values?.RectoriaSelected);
    }
  }, [Values?.RectoriaSelected]);

  useEffect(() => {
    async function GetRectorias() {
      const data = await fetch(
        `/api/Configuracion/SedeRectoria/GetRectorias`
      ).then((res) => res?.json());
      setData({ ...Data, rectorias: data?.rectorias || [] });
    }

    async function GetSubSedes() {
      setIsPending(true);
      const dataSedesSubSedes = await fetch(
        `/api/Configuracion/SubSedes/GetSedesSubSedes`
      ).then((res) => res?.json());
      setSubSedes(dataSedesSubSedes?.SedesSubSedes || []);
      setIsPending(false);
    }

    try {
      GetRectorias();
      GetSubSedes();
    } catch (error) {
      console.log(error);
      alert("Error al cargar los datos");
    }
  }, []);
  return (
    <>
      {ShowModal?.AddVisible && (
        <AddSubSede
          Config={Values}
          setShowModal={setShowModal}
          setSubSedes={setSubSedes}
        />
      )}

      {ShowModal?.EditVisible && (
        <EditSubSede
          InfoEditar={InfoEditar}
          setShowModal={setShowModal}
          setSubSedes={setSubSedes}
        />
      )}
      <div className="flex mt-10 flex-col sm:justify-center items-center">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-blue-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6" />
          <div className="card bg-red-400 shadow-lg w-full h-full rounded-3xl absolute  transform rotate-6" />
          <div className="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md border-2 border-gray-400">
            <form>
              <div className="mb-2">
                <label
                  htmlFor="Nombre"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Seleccione una Rectoría
                </label>
                <Select
                  options={Data?.rectorias}
                  getOptionLabel={(item: any) => item.Nombre}
                  getOptionValue={(item: any) => item.Id}
                  onChange={(item) => {
                    console.log(item);

                    setData({ ...Data, SedesRectorias: [] });
                    setValues({ ...Values, RectoriaSelected: item?.Id });
                  }}
                  placeholder="Seleccione una Opción"
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="Nombre"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Seleccione una Sede
                </label>
                {
                  <Select
                    options={Data?.SedesRectorias}
                    onChange={(item) => {
                      setValues({ ...Values, SedeRectoriaSelected: item?.Id });
                    }}
                    getOptionLabel={(item: any) => item?.NombreSede}
                    getOptionValue={(item?: any) => item?.Id}
                    placeholder="Seleccione una Opción"
                    isDisabled={Data?.SedesRectorias?.length === 0}
                  />
                }
              </div>
              {Values?.RectoriaSelected && Values?.SedeRectoriaSelected && (
                <div className="mt-7">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowModal({
                        AddVisible: true,
                      });
                    }}
                    className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
                  >
                    Crear un COA
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <div className="mt-10">
        {isPending ? (
          <Loading />
        ) : (
          <TableSubSedes
            info={SubSedes}
            setSubSedes={setSubSedes}
            setInfoEditar={setInfoEditar}
            setShowModal={setShowModal}
          />
        )}
      </div>
    </>
  );
};

export default BodyComponent;
