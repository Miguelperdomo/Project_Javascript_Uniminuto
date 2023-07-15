"use client";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { Estudiante, VisibilidadModal } from "../../../typings";
import { customStyles } from "../../../utils/CustomStylesTables";

type Props = {
  info: Estudiante[];
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
  setInfoEditar: React.Dispatch<React.SetStateAction<Estudiante>>;
  setEstudiante: React.Dispatch<React.SetStateAction<Estudiante[]>>;
  setShowImage: React.Dispatch<
    React.SetStateAction<{ Image: string; Visible: boolean }>
  >;
};

const TableRequerir = ({
  info,
  setShowModal,
  setInfoEditar,
  setEstudiante,
  setShowImage,
}: Props) => {
  const columns: any = [
    {
      name: "Nombre",
      selector: (row: any) => (
        <div className=" block  lg:flex lg:gap-3 px-6 py-4 font-normal text-gray-900">
          <div
            className="relative h-10 w-10 cursor-pointer"
            onClick={() => {
              setShowImage({
                Image: `https://sygescol.uniminuto.sistemasivhorsnet.com/sygescol2023/images/fotos/administrativos/${
                  row?.Imagen || "SinFotoAdmin.png"
                }`,
                Visible: true,
              });
            }}
          >
            {/* <img
              className="h-full w-full rounded-full object-cover object-center"
              src={`https://sygescol.uniminuto.sistemasivhorsnet.com/sygescol2023/images/fotos/administrativos/${
                row?.Imagen || "SinFotoAdmin.png"
              }`}
            /> */}
            {/* <span>
              <ModalImage
                small={"/EnConstruccion.webp"}
                large={"/EnConstruccion.webp"}
                alt="Hello World!"
              />
            </span> */}
            <Image
              src={`https://sygescol.uniminuto.sistemasivhorsnet.com/sygescol2023/images/fotos/administrativos/${
                row?.Imagen || "SinFotoAdmin.png"
              }`}
              alt="Foto Colaborador"
              width={40}
              height={40}
              className="rounded-full object-cover object-center"
            />
            <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white" />
          </div>
          <div className="text-sm">
            <div className="font-medium text-gray-900">
              {row.Nombre} {row.Apellidos}
            </div>
            <div className="text-gray-500">
              {row.Correo || "No registra correo"}
            </div>
          </div>
        </div>
      ),
      sortable: true,
      wrap: true,
      grow: 3.0,
    },
    {
      name: "Apellidos",
      selector: (row: any) => row.Apellidos,
      sortable: true,
      wrap: true,
      width: "auto",
    },
    {
      name: "Documento",
      selector: (row: any) => row.Documento,
      sortable: true,
      wrap: true,
      //   maxWidth: "150px",
    },
    {
      name: "Usuario",
      selector: (row: any) => row.Usuario,
      sortable: true,
      wrap: true,
    },
    // {
    //   name: "Contraseña",
    //   selector: (row: any) => row.Pass,
    //   sortable: true,
    //   wrap: true,
    // },
    {
      name: "Correo",
      selector: (row: any) => row.Correo,
      sortable: true,
      wrap: true,
    },
    {
      name: "Operaciones",
      selector: (row: any) => (
        <div className="flex flex-wrap justify-center items-center text-red-900">
          <button
            title="Eliminar Registro"
            onClick={async () => {
              const validate = confirm(
                "¿Está seguro de eliminar este Estudiante?"
              );
              if (validate) {
                // fecha de eliminación
                try {
                  const responseRemove = await fetch(
                    "/api/Estudiantes/DeleteStudent",
                    {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        id: row.Id,
                      }),
                    }
                  ).then((res) => res.json());

                  setEstudiante((prev) =>
                    prev.filter((item) => item.Id != row.Id)
                  );

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

              setInfoEditar(row);
              setShowModal({
                AddVisible: true,
                EditVisible: false,
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
      //   maxWidth: "150px",
    },
  ];
  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  const [filterText, setFilterText] = useState("");

  const filteredItems = info?.filter((item: any) => {
    let nombre = `${item?.Nombre?.toLowerCase()} ${item?.Apellidos?.toLowerCase()}`;

    return (
      (nombre &&
        nombre
          ?.toString()
          ?.replace(/\s+/g, " ")
          ?.toLowerCase()
          ?.includes(filterText?.toLowerCase())) ||
      item?.Documento?.toLowerCase()?.includes(filterText?.toLowerCase())
    );
  });

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <input
        autoComplete="off"
        onChange={(e) => setFilterText(e.target.value)}
        // onClear={handleClear}
        value={filterText}
        placeholder="Buscar por nombres y apellidos o numero de documento"
        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
      />
    );
  }, [filterText]);

  return (
    <>
      <div className="border-l-2 border-t-2 border-r-2 border-white">
        <DataTable
          title="Lista de Requerimientos"
          columns={columns}
          paginationComponentOptions={paginationComponentOptions}
          data={filteredItems}
          persistTableHead
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          pagination
          responsive
          noDataComponent="No hay Requerimientos"
          customStyles={customStyles}
          paginationPerPage={7}
        />
      </div>
    </>
  );
};

export default TableRequerir;
