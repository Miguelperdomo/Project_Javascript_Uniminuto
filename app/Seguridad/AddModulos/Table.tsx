"use client";
import DataTable from "react-data-table-component";
import React from "react";
import { customStyles } from "../../../utils/CustomStylesTables";
import { ItemSubModulo, VisibilidadModal } from "../../../typings";

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;

  info: [];
  setInfoUpdatePrincipal: React.Dispatch<React.SetStateAction<{}>>;
  setInfoEditar: React.Dispatch<React.SetStateAction<[]>>;
  setItemModulo: React.Dispatch<React.SetStateAction<ItemSubModulo>>;
};
const Table = ({
  info,
  setInfoEditar,
  setItemModulo,
  setShowModal,
  setInfoUpdatePrincipal,
}: Props) => {
  const columns: any = [
    {
      name: "Módulo Principal",
      selector: (row: any) => row.NombreModulo,
      sortable: true,
      wrap: true,
    },
    {
      name: "Submódulos",
      selector: (row: any) => (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 border-t gap-x-2 ">
            {row?.SubModulos?.map((grupo: any, key: any) => (
              <div
                onClick={(e) => {
                  e.preventDefault();

                  setShowModal(() => ({ EditVisible: true }));
                  setItemModulo({
                    ...grupo,
                    ModuloPrincipal: row?.Id,
                  });
                }}
                className="text-xs my-1 uppercase tracking-wider border px-2 text-[#070e54] border-[#070e54] hover:bg-[#070e54] hover:text-indigo-100 cursor-pointer"
                key={key}
              >
                <span>{grupo?.SubModulo}</span>
              </div>
            ))}
          </div>
        </>
      ),
      sortable: true,
      wrap: true,
      height: "192px",
    },
    {
      name: "Operaciones",
      selector: (row: any) => (
        <div className="flex flex-wrap justify-center items-center text-red-900">
          <button
            title="Elimiar Registro"
            onClick={async () => {
              const validate = confirm("¿Está seguro de eliminar ?");
              if (validate) {
                // fecha de eliminación
                try {
                  const responseRemove = await fetch(
                    "/api/Seguridad/DeleteModuloPrincipal",
                    {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        id: row?.Id,
                      }),
                    }
                  ).then((res) => res.json());

                  const ModulosSubmodulos = await fetch(
                    `/api/Seguridad/GetModulos`
                  ).then((res) => res.json());
                  setInfoEditar(ModulosSubmodulos?.Modulos || []);

                  alert(`${responseRemove.body}`);
                } catch (error) {
                  console.error(error);
                  alert("Error al eliminar");
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
            title="Editar Registro"
            onClick={(e) => {
              e.preventDefault();

              setInfoUpdatePrincipal(row);
              setShowModal({
                Actualizar: true,
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
      ),
      sortable: true,
      wrap: true,
      maxWidth: "150px",
    },
  ];
  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <>
      <div className="border-t-2 border-t-white">
        <DataTable
          title="Lista de Módulos"
          columns={columns}
          paginationComponentOptions={paginationComponentOptions}
          data={info}
          persistTableHead
          pagination
          responsive
          noDataComponent=" No hay datos"
          customStyles={customStyles}
          paginationPerPage={7}
        />
      </div>
    </>
  );
};

export default Table;
