"use client";
import axios from "axios";
import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { Programa, VisibilidadModal } from "../../../typings";
import { customStyles } from "../../../utils/CustomStylesTables";

type props = {
  info: any;
  setRectorias: React.Dispatch<React.SetStateAction<any>>;
  setInfoEditar: React.Dispatch<React.SetStateAction<{}>>;
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
};
const TableSedeRectoria = ({
  info,
  setRectorias,
  setInfoEditar,
  setShowModal,
}: props) => {
  const [filterText, setFilterText] = useState("");

  const filteredItems = info?.filter((item: any) => {
    // quitar las tildes a un string

    let nombre = `${item?.NombreRectoria?.toLowerCase()
      ?.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")}`;

    return (
      nombre &&
      nombre
        .toString()
        .replace(/\s+/g, " ")
        .toLowerCase()
        .includes(
          filterText
            .toLowerCase()
            ?.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        )
    );
  });

  const columns: any = [
    {
      name: "Nombre Rectoría",
      selector: (row: any) => row.NombreRectoria,
      sortable: true,
      wrap: true,
    },
    {
      name: "Lista de Sedes",
      selector: (row: any) => (
        <div className="grid sm:grid-cols-3 border-t gap-x-2 max-h-48 overflow-auto scrollbar-hide">
          {row?.Sedes?.map((sede: any, key: any) => (
            <>
              {sede?.NombreSede && (
                <div className="flex">
                  <button
                    title="Eliminar sede"
                    onClick={async () => {
                      const validate = confirm(
                        " ¿Está seguro de eliminar esta sede?"
                      );
                      if (validate) {
                        // fecha de eliminación

                        console.log(sede);

                        try {
                          const responseRemove = await axios.delete(
                            "/api/Configuracion/SedeRectoria/DeleteSede",
                            {
                              data: {
                                id: sede.IdSedes,
                              },
                            }
                          );

                          const data = await fetch(
                            `/api/Configuracion/SedeRectoria/GetRectoriaSede`
                          ).then((res) => res.json());

                          setRectorias(Object.values(data?.RectoriasSedes));

                          alert(`${responseRemove?.data?.body}`);
                        } catch (error: any) {
                          console.error(error);
                          alert(error.response.data.body);
                        }

                        // alert("Eliminado");
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-red-900"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                  <div
                    title="Editar sede"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowModal({ Actualizar: true });
                      setInfoEditar({
                        ...sede,
                      });
                    }}
                    className="text-xs my-1 uppercase tracking-wider border px-2 text-[#070e54] border-[#070e54] hover:bg-[#070e54] hover:text-indigo-100 cursor-pointer"
                    key={key}
                  >
                    <span>{sede?.NombreSede}</span>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      ),
      sortable: true,
      wrap: true,
      grow: 2,
    },
    {
      name: "Operaciones Rectoría",
      selector: (row: any) => (
        <>
          <div className="grid grid-cols-3 justify-center items-center">
            <button
              className=" text-red-900"
              title="Eliminar Rectoría"
              onClick={async () => {
                const validate = confirm(
                  "¿Está seguro de eliminar esta Rectoría?"
                );
                if (validate) {
                  // fecha de eliminación
                  try {
                    const responseRemove = await fetch(
                      "/api/Configuracion/SedeRectoria/DeleteRectoria",
                      {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          id: row.IdRectoria,
                        }),
                      }
                    ).then((res) => res.json());

                    const data = await fetch(
                      `/api/Configuracion/SedeRectoria/GetRectoriaSede`
                    ).then((res) => res.json());

                    setRectorias(Object.values(data?.RectoriasSedes));
                    if (responseRemove?.body) {
                      alert(`${responseRemove?.body}`);
                    }
                  } catch (error) {
                    console.error(error);
                    alert("Error al eliminar");
                  }
                }
              }}
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
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
            <button
              title="Editar Rectoría"
              onClick={(e) => {
                e.preventDefault();

                setInfoEditar(row);
                setShowModal({
                  EditVisible: true,
                });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#0D7D1E"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>
          </div>
        </>
      ),
      sortable: true,
      wrap: true,
    },
  ];
  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <input
        onChange={(e) => setFilterText(e.target.value)}
        // onClear={handleClear}
        value={filterText}
        autoComplete="off"
        placeholder="Buscar por rectoría"
        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
      />
    );
  }, [filterText]);

  return (
    <div className="border-t-2 border-t-white">
      <DataTable
        title="Lista de rectorías y sedes"
        columns={columns}
        paginationComponentOptions={paginationComponentOptions}
        data={filteredItems}
        pagination
        persistTableHead
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        responsive
        noDataComponent="No hay datos"
        customStyles={customStyles}
        paginationPerPage={7}
      />
    </div>
  );
};

export default TableSedeRectoria;
