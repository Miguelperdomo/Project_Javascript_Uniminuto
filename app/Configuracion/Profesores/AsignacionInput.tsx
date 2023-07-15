// import React from "react";
"use client";
import React, { useState } from "react";
import { Docente, VisibilidadModal } from "../../../typings";

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
  InfoEditar: Docente;
  setHorario: React.Dispatch<React.SetStateAction<Docente[]>>;
};

const AsignacionInput = ({ setShowModal, InfoEditar, setHorario }: Props) => {
  // const [showModal, setShowModal] = React.useState(false);
  const [isOccupied, setIsOccupied] = useState(false);
  const [linkText, setLinkText] = useState("Disponible");

  const Array = [
    {
      id: 1,
      status: "Disponible",
      state: false,
    },
    {
      id: 2,
      status: "Disponible",
      state: false,
    },
    {
      id: 3,
      status: "Disponible",
      state: false,
    },
    {
      id: 4,
      status: "Disponible",
      state: false,
    },
    {
      id: 5,
      status: "Disponible",
      state: false,
    },
    {
      id: 6,
      status: "Disponible",
      state: false,
    },
    {
      id: 7,
      status: "Disponible",
      state: false,
    },
  ];

  return (
    <>
      <div className="bg-[#000236]/100 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
        <div className="container mx-auto">
          <form
            //  onSubmit={hanlerSubmit}
            className="relative pt-5 pb-2 px-5  md:px-10 bg-white shadow-md rounded border border-gray-400"
          >
            <h1 className="text-center text-lg tracking-normal leading-tight mb-4 bg-[#151A8B] w-full text-white p-2 rounded-md font-bold ">
              Horario de Atención con el Profesor:{" "}
              {`${InfoEditar?.Nombre} ${InfoEditar?.Apellidos}`}
            </h1>
            <section className="m-1  bg-[#070E54]/90 py-10 lg:py-[1px]">
              <div className="container mx-auto">
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4">
                    <div className="max-w-full overflow-x-auto">
                      <table className="w-full table-auto">
                        <thead>
                          <tr className="bg-primary text-center">
                            <th className="w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-semibold text-white lg:py-2 lg:px-4">
                              Hora/Dia
                            </th>
                            <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-semibold text-white lg:py-7 lg:px-4">
                              Lunes
                            </th>
                            <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-semibold text-white lg:py-7 lg:px-4">
                              Martes
                            </th>
                            <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-semibold text-white lg:py-7 lg:px-4">
                              Miercoles
                            </th>
                            <th className="w-1/6 min-w-[160px] py-4 px-3 text-lg font-semibold text-white lg:py-7 lg:px-4">
                              Jueves
                            </th>
                            <th className="w-1/6 min-w-[160px] border-r border-transparent py-4 px-3 text-lg font-semibold text-white lg:py-7 lg:px-4">
                              Viernes
                            </th>
                            <th className="w-1/6 min-w-[160px] border-r border-transparent py-4 px-3 text-lg font-semibold text-white lg:py-7 lg:px-4">
                              Sabado
                            </th>
                            <th className="w-1/6 min-w-[160px] border-r border-transparent py-4 px-3 text-lg font-semibold text-white lg:py-7 lg:px-4">
                              Domingo
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] py-5 px-2 text-center text-base font-medium">
                              <h2>1 Bloque</h2>
                              <div>
                                <h1 className="mr-32">Desde</h1>
                                <input
                                  type="time"
                                  id="appt"
                                  name="appt"
                                  min="09:00"
                                  max="18:00"
                                  required
                                />
                                <h1 className="mr-32">Hasta</h1>
                                <input
                                  type="time"
                                  id="appt"
                                  name="appt"
                                  min="09:00"
                                  max="18:00"
                                  required
                                />
                              </div>
                            </td>

                            {Array.map((item, key) => (
                              <td
                                key={item.id}
                                onClick={(e) => {
                                  e.preventDefault();
                                  Array[key] = {
                                    ...item,
                                    state: true,
                                  };
                                }}
                                className="cursor-pointer text-dark border-b border-r border-[#E8E8E8] bg-white py-5 px-2 text-center text-base font-medium"
                              >
                                <a className="cursor-pointer border-primary text-primary hover:bg-primary inline-block rounded border py-2 px-6 hover:text-white">
                                  {"Disponible"}
                                </a>
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="flex">
              <button
                type="button"
                className="bg-blue-500 w-[99%] m-2 mx-auto font-bold py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-[1.018]"
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal({
                    AddVisible: false,
                    EditVisible: false,
                  });
                }}
              >
                cerrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AsignacionInput;
