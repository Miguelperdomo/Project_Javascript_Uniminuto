"use client";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Pruebas } from "../../../typings";
import { customStyles } from "../../../utils/CustomStylesTables";

type props = {
  info: Pruebas[];
  retro: any;
  setPruebas: React.Dispatch<React.SetStateAction<Pruebas[]>>;
  Values: {
    Programa: number | null;
    TipoPrueba: string;
  };
  setSeeQuestion: React.Dispatch<
    React.SetStateAction<{
      Show: boolean;
      Pregunta: {};
      Retro: {};
    }>
  >;
};
function createMarkup(pregunta: any) {
  return { __html: `${pregunta}` };
}

// año actual
const Table = ({ retro, info, setPruebas, Values, setSeeQuestion }: props) => {
  console.log("info", info);

  const columns: any[] = [
    {
      name: "Programa",
      selector: (row: any) => {
        return row?.NombrePrograma;
      },
      sortable: true,
      wrap: true,
      maxWidth: "150px",
    },
    {
      name: "Nombre Competencia",
      selector: (row: any) => {
        return row?.NombreCompetencia;
      },
      sortable: true,
      wrap: true,
      maxWidth: "180px",
    },
    {
      name: "Tipo ",
      selector: (row: any) =>
        (row.CompetenciaTipo == "G" && "General") ||
        (row.CompetenciaTipo == "E" && "Específica"),
      sortable: true,
      wrap: true,
      maxWidth: "100px",
    },
    {
      name: "Pregunta ",
      selector: (row: any) => {
        return <div dangerouslySetInnerHTML={createMarkup(row.pregunta)} />;
      },
      sortable: true,
      wrap: true,
    },

    {
      name: "Operaciones",
      selector: (row: any) => (
        <div className="flex flex-wrap justify-center items-center">
          {/* <button
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
                        id: row.Id,
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
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button> */}

          <button
            title="Ver pregunta"
            className="text-green-900"
            onClick={() => {
              setSeeQuestion(() => ({
                Show: true,
                Pregunta: row,
                Retro: retro.filter((bus: any) => {
                  // console.log(`${bus.pregunta} == ${row.id}`, row);
                  return bus.pregunta == row.id;
                }),
              }));
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
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      ),
      sortable: true,
      wrap: true,
      maxWidth: "160px",
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
        title="Lista de preguntas para aprobar"
        columns={columns}
        paginationComponentOptions={paginationComponentOptions}
        data={info}
        persistTableHead
        pagination
        responsive
        noDataComponent="No hay preguntas"
        customStyles={customStyles}
        paginationPerPage={7}
      />
    </div>
  );
};

export default Table;
