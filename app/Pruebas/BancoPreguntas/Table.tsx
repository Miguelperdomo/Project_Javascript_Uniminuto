"use client";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Pruebas } from "../../../typings";
import { customStyles } from "../../../utils/CustomStylesTables";

type props = {
  info: Pruebas[];
  setSeeQuestion: React.Dispatch<
    React.SetStateAction<{
      Show: boolean;
      Pregunta: {};
    }>
  >;
};

// año actual
const Table = ({ info, setSeeQuestion }: props) => {
  console.log("info", info);

  function createMarkup(pregunta: any) {
    return { __html: `${pregunta}` };
  }

  const columns: any[] = [
    {
      name: "COA",
      selector: (row: any) => {
        return row?.NombreCoa;
      },
      sortable: true,
      wrap: true,
      maxWidth: "250px",
    },
    {
      name: "Programa",
      selector: (row: any) => {
        return row?.NombrePrograma;
      },
      sortable: true,
      wrap: true,
      maxWidth: "180px",
    },
    {
      name: "Competencia ",
      selector: (row: any) =>
        (row.TipoCompetencia == "G" && "GENÉRICA") ||
        (row.TipoCompetencia == "E" && "ESPECÍFICA"),
      sortable: true,
      wrap: true,
      maxWidth: "150px",
    },
    {
      name: "Pregunta ",
      selector: (row: any) => {
        return (
          <div className="flex flex-wrap gap-2">
            {row?.Preguntas?.map((pregunta: any, index: number) => {
              return (
                <button
                  title="Ver pregunta"
                  onClick={() => {
                    setSeeQuestion(() => ({
                      Show: true,
                      Pregunta: pregunta,
                    }));
                  }}
                  key={index}
                  className="bg-[#070e54] hover:bg-[#1b4cd3ce]   text-white duration-300 rounded-full px-4 py-2 font-light text-sm"
                >
                  Pregunta {index + 1}
                </button>
              );
            })}
          </div>
        );
      },
      sortable: true,
      wrap: true,
    },

    // {
    //   name: "Operaciones",
    //   selector: (row: any) => (
    //     <div className="flex flex-wrap justify-center items-center">
    //       <button
    //         title="Ver pregunta"
    //         className="text-green-900"
    //         onClick={() => {
    //           //   setSeeQuestion(() => ({
    //           //     Show: true,
    //           //     Pregunta: row,
    //           //     Retro: retro.filter((bus: any) => {
    //           //       // console.log(`${bus.pregunta} == ${row.id}`, row);
    //           //       return bus.pregunta == row.id;
    //           //     }),
    //           //   }));
    //         }}
    //       >
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           strokeWidth={1.5}
    //           stroke="currentColor"
    //           className="w-6 h-6"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
    //           />
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    //           />
    //         </svg>
    //       </button>
    //     </div>
    //   ),
    //   sortable: true,
    //   wrap: true,
    //   maxWidth: "160px",
    // },
  ];
  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <div className="border-l-2 border-t-2 border-r-2 border-white">
      <DataTable
        title="Banco de preguntas"
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
