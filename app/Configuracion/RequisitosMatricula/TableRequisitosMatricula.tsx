"use client";
import DataTable from "react-data-table-component";
import { RequisitrosMatricula } from "../../../typings";
import { customStyles } from "../../../utils/CustomStylesTables";

type TableRequisitosMatriculaProps = {
  info: RequisitrosMatricula[];
  setData: React.Dispatch<React.SetStateAction<RequisitrosMatricula[]>>;
};
const TableRequisitosMatricula = ({
  info,
  setData,
}: TableRequisitosMatriculaProps) => {
  const columns = [
    {
      name: "Prerrequisitos",
      selector: (row: any) => row.Nombre,
      sortable: true,
      wrap: true,
    },
    {
      name: "¿Para Que Estudiantes? ",
      selector: (row: any) =>
        `${
          (row.Target == "2" && "Ambos") ||
          (row.Target == "A" && "Antiguos") ||
          (row.Target == "N" && "Nuevos")
        }`,
      sortable: true,
      wrap: true,
    },
    {
      name: "Tipo",
      selector: (row: any) =>
        `${
          (row.Tipo == "N" && "Normal") || (row.Tipo == "O" && "Obligatorio")
        }`,

      sortable: true,
      wrap: true,
    },
    {
      name: "Operaciones",
      selector: (row: any) => (
        <div className="flex flex-wrap justify-center items-center text-red-900">
          <button
            onClick={async () => {
              const validate = confirm(
                "¿Está seguro de eliminar este Prerrequisito?"
              );
              if (validate) {
                try {
                  const responseRemove = await fetch(
                    "/api/Configuracion/RequisitosMatricula/DeleteRequisito",
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
                  setData((prev) => prev.filter((item) => item.Id != row.Id));
                  alert(`${responseRemove.message}`);
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
        </div>
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

  return (
    <div className="grow justify-center">
      <DataTable
        title="Requisitos de Matrícula"
        columns={columns}
        paginationComponentOptions={paginationComponentOptions}
        data={info}
        persistTableHead
        pagination
        responsive
        noDataComponent="No Hay Datos"
        customStyles={customStyles}
        paginationPerPage={7}
      />
    </div>
  );
};

export default TableRequisitosMatricula;
