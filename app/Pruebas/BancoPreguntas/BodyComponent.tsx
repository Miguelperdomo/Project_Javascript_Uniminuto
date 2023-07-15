"use client";
import Loading from "@/app/loading";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { COA } from "../../../typings";
import ShowQuestion from "./ShowQuestion";
import Table from "./Table";

const BodyComponent = () => {
  const [Coa, setCoa] = useState([] as COA[]);
  const [Values, setValues] = useState({
    IdCoa: "",
    Tipo: "",
  } as {
    IdCoa: string | "";
    Tipo: string | "";
  });

  const [SeeQuestion, setSeeQuestion] = useState({
    Show: false,
    Pregunta: {},
    // Retro: {},
  });
  const searchParams = useSearchParams();
  const [isPending, setIsPending] = useState(false as boolean);

  const [Preguntas, setPreguntas] = useState([] as any[]);

  const GetPreguntasCoa = async (Coa: string, Tipo: string) => {
    try {
      console.log(
        `/api/Pruebas/BancoPreguntas/GetBancoPreguntas?Coa=${Coa}&Tipo=${Tipo}`
      );

      const data = await fetch(
        `/api/Pruebas/BancoPreguntas/GetBancoPreguntas?Coa=${Coa}&Tipo=${Tipo}`
      ).then((res) => res.json());
      setPreguntas(data?.Preguntas);
    } catch (error) {
      console.log(error);

      alert("Error al cargar las preguntas");
    }
  };

  useEffect(() => {
    if (Values?.IdCoa && Values?.Tipo) {
      GetPreguntasCoa(Values?.IdCoa, Values?.Tipo);
    }
  }, [Values?.IdCoa, Values?.Tipo]);

  const TipoPrueba = [
    { value: "SP", label: "Saber Pro" },
    { value: "SS", label: "SESA" },
  ];

  const getData = async () => {
    try {
      setIsPending(true);
      const SubSede = searchParams.get("SubSede");

      const data: any = await fetch(`/api/Pruebas/BancoPreguntas/GetCoa`).then(
        (res) => res?.json()
      );

      setCoa(data?.Coa || []);
      setIsPending(false);
    } catch (error) {
      console.log(error);
      alert("Error al cargar los datos");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {SeeQuestion.Show && (
        <ShowQuestion
          SeeQuestion={SeeQuestion}
          setSeeQuestion={setSeeQuestion}
        />
      )}
      {isPending ? (
        <Loading />
      ) : (
        <>
          <div className="pb-11 flex mt-10 flex-col sm:justify-center items-center bg-gray-100 ">
            <div className="relative sm:max-w-sm w-full">
              <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6" />
              <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6" />
              <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
                <form>
                  <div className="mb-2">
                    <label
                      htmlFor="Nombre"
                      className="mb-3 block text-base font-medium text-gray-800"
                    >
                      Seleccione un COA:
                    </label>
                    <Select
                      className="dark:text-black"
                      options={Coa}
                      getOptionLabel={(item: any) => item.Nombre}
                      getOptionValue={(item) => item.Id}
                      onChange={(item) => {
                        setValues({
                          ...Values,
                          IdCoa: item?.Id,
                        });
                      }}
                      placeholder="Seleccione una Opción"
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="Nombre"
                      className="mb-3 block text-base font-medium text-gray-800"
                    >
                      Seleccione un tipo:
                    </label>
                    <Select
                      className="dark:text-black"
                      options={TipoPrueba}
                      onChange={(item) => {
                        setValues({
                          ...Values,
                          Tipo: item?.value || "",
                        });
                      }}
                      placeholder="Seleccione una Opción"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Table info={Preguntas} setSeeQuestion={setSeeQuestion} />
        </>
      )}
    </>
  );
};

export default BodyComponent;
