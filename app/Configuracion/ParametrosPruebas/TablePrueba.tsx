"use client";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Pruebas } from "../../../typings";
import { customStyles } from "../../../utils/CustomStylesTables";

type props = {
  info: Pruebas[];
  setPruebas: React.Dispatch<React.SetStateAction<Pruebas[]>>;
  Values: {
    Programa: number | null;
    TipoPrueba: string;
  };
};

// año actual
const TablePrueba = ({ info, setPruebas, Values }: props) => {
  const columns: any[] = [
    {
      name: "COA",
      selector: (row: any) => row.NombreSede,
      sortable: true,
      wrap: true,
    },

    {
      name: "Programa",
      selector: (row: any) => row.NombrePrograma,
      sortable: true,
      wrap: true,
    },
    {
      name: "Inicio Profesor",
      selector: (row: Pruebas) => {
        // locale to string
        const date = new Date(row?.InicioDocente);
        const options: {} = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        return date.toLocaleDateString("es-CO", options);
      },
      sortable: true,
      wrap: true,
    },
    {
      name: "Fin profesor",
      selector: (row: any) => {
        const date = new Date(row?.FinDocente);
        const options: {} = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        return date.toLocaleDateString("es-CO", options);
      },
      sortable: true,
      wrap: true,
    },
    // {
    //   name: "Prueba",
    //   selector: (row: Pruebas) => {
    //     // locale to string
    //     const date = new Date(row?.Inicio);
    //     const options: {} = {
    //       year: "numeric",
    //       month: "long",
    //       day: "numeric",
    //     };
    //     return date.toLocaleDateString("es-CO", options);
    //   },
    //   sortable: true,
    //   wrap: true,
    // },
    // {
    //   name: "Tipo de Prueba",
    //   selector: (row: Pruebas) => {
    //     // locale to string
    //     const date = new Date(row?.Inicio);
    //     const options: {} = {
    //       year: "numeric",
    //       month: "long",
    //       day: "numeric",
    //     };
    //     return date.toLocaleDateString("es-CO", options);
    //   },
    //   sortable: true,
    //   wrap: true,
    // },
    {
      name: "Inicio Estudiante",
      selector: (row: any) => {
        const date = new Date(row?.InicioEstudiante);
        const options: {} = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        return date.toLocaleDateString("es-CO", options);
      },
      sortable: true,
      wrap: true,
    },
    {
      name: "Fin Estudiante",
      selector: (row: any) => {
        const date = new Date(row?.FinEstudiantes);
        const options: {} = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        return date.toLocaleDateString("es-CO", options);
      },
      sortable: true,
      wrap: true,
    },
    {
      name: "Operaciones",
      selector: (row: any) => (
        <div className="flex flex-wrap justify-center items-center">
          <button
            className=" text-red-900"
            onClick={async () => {
              const validate = confirm("¿Está seguro de eliminar esta prueba?");
              if (validate) {
                // fecha de eliminación
                try {
                  const responseRemove = await fetch(
                    "/api/Configuracion/ParametrosPruebas/DeletePruebas",
                    {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        id: row.IdPrueba,
                      }),
                    }
                  ).then((res) => res.json());

                  const response = await axios.post(
                    "/api/Configuracion/ParametrosPruebas/GetPruebas",
                    {
                      programa: Values?.Programa,
                      tipo: Values?.TipoPrueba,
                    }
                  );

                  setPruebas(response?.data?.pruebas);
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
    <div className="border-t-2 border-t-white">
      <DataTable
        title="Lista de Pruebas Creadas"
        columns={columns}
        paginationComponentOptions={paginationComponentOptions}
        data={info}
        persistTableHead
        pagination
        responsive
        noDataComponent="No hay Pruebas"
        customStyles={customStyles}
        paginationPerPage={7}
      />
    </div>
  );
};

export default TablePrueba;
