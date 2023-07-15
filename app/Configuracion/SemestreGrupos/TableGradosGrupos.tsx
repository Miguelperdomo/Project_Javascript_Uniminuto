"use client";
import DataTable from "react-data-table-component";
import { VisibilidadModal } from "../../../typings";
import { customStyles } from "../../../utils/CustomStylesTables";
import { useSearchParams } from "next/navigation";

type props = {
  info: any[];
  setGradosGrupos: React.Dispatch<React.SetStateAction<any[]>>;
  setInfoGradoEditar: React.Dispatch<React.SetStateAction<any>>;
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
};

const TableGradosGrupos = ({
  info,
  setGradosGrupos,
  setInfoGradoEditar,
  setShowModal,
}: props) => {
  const searchParams = useSearchParams();

  const columns: any = [
    {
      name: "COA",
      selector: (row: any) => <p className="font-semibold">{row?.COA}</p>,
      sortable: true,
      wrap: true,
    },

    {
      name: "Semestre y Programas",
      selector: (row: any) => (
        <>
          <h1 className="font-bold">{row?.SemestreNombre} </h1>
          <hr className="bg-blue-900 h-1  " />
          <div>{row?.NombrePrograma}</div>
        </>
      ),
      sortable: true,
      wrap: true,
    },
    {
      name: "Semestre Lectivo",

      selector: (row: any) => (
        <>
          <div className="flex justify-start items-center">
            <h1 className="font-bold">
              {(row?.Periodicidad == "S" && "Semestral") ||
                (row?.Periodicidad == "C" && "Cuatrimestral")}
            </h1>
          </div>
          <hr className="bg-blue-900 h-1  " />
          <div className="grid grid-rows-1 justify-center">
            <p>{row.Meses}</p>
          </div>
        </>
      ),
      sortable: true,
      wrap: true,
    },
    {
      name: "Grupos",
      // grow: 3,
      selector: (row: any) => (
        <div>
          <button
            title="Agregar grupo"
            onClick={async (e) => {
              try {
                e.preventDefault();

                console.log(row);

                const response = await fetch(
                  "/api/Configuracion/GradosGrupos/AddGrupo",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      Semestre: row?.SemestreId,
                      Sigla: row?.SiglaPrograma,
                      Grado: row?.GradoId,
                      Periodicidad: row?.Periodicidad,
                      SemestreSigla: row?.SemestreSigla,
                    }),
                  }
                ).then((res) => res.json());

                const data = await fetch(
                  `/api/Configuracion/GradosGrupos/GetGradosGrupos?SubSede=${
                    searchParams?.get("SubSede") ||
                    localStorage.getItem("IdSubSede")
                  }`
                ).then((res) => res.json());

                setGradosGrupos(data?.grados);
                alert(response?.body);
              } catch (error) {
                console.error(error);
                alert("Error al agregar grupo");
              }
            }}
            className="font-bold"
          >
            Nuevo Grupo
          </button>
          <hr className="bg-blue-900 h-1 " />
          <div className="grid sm:grid-cols-3 border-t gap-x-2 max-h-48 overflow-auto scrollbar-hide">
            {row?.Grupos?.map((grupo: any, key: any) => (
              <div key={key} className="flex justify-center items-center">
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModal((prev) => ({ ...prev, EditVisible: true }));
                    setInfoGradoEditar({
                      ...grupo,
                      Programa: row.NombrePrograma,
                      Sigla: row.SiglaPrograma,
                      Semestre: row.SemestreNombre,
                      Lectivo: row.Meses,
                      GrupoId: grupo?.GrupoId,
                      Periodicidad: row.Periodicidad,
                      GrupoUbicacion: grupo?.GrupoUbicacion,
                    });
                  }}
                  className="text-xs my-1 uppercase tracking-wider border px-2 text-[#070e54] border-[#070e54] hover:bg-[#070e54] hover:text-indigo-100 cursor-pointer"
                  key={key}
                >
                  <span>{grupo?.NombreGrupo}</span>
                </div>
                <button
                  title={`Eliminar grupo ${grupo?.NombreGrupo}`}
                  onClick={async (e) => {
                    const validate = confirm(
                      "¿Está seguro que desea eliminar el grupo?"
                    );
                    if (validate) {
                      try {
                        const response: any = await fetch(
                          "/api/Configuracion/GradosGrupos/DeleteGrupo",
                          {
                            method: "DELETE",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              id: grupo?.GrupoId,
                            }),
                          }
                        ).then((res) => res.json());

                        const data = await fetch(
                          `/api/Configuracion/GradosGrupos/GetGradosGrupos?SubSede=${
                            searchParams?.get("SubSede") ||
                            localStorage.getItem("IdSubSede")
                          }`
                        ).then((res) => res.json());

                        setGradosGrupos(data?.grados);
                        alert(response?.body);
                      } catch (error) {
                        console.log(error);
                        alert("Error al eliminar grupo");
                      }
                    }
                  }}
                >
                  <svg
                    xlinkTitle="Eliminar grupo"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-red-900"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      ),
      sortable: true,
      wrap: true,
      grow: 2,
    },
    {
      name: "Operaciones",
      width: "150px",
      selector: (row: any) => (
        <>
          <button
            className="text-red-900 flex justify-center w-full mx-auto"
            title="Eliminar registro"
            onClick={async () => {
              const validate = confirm(
                `¿Está seguro que desea eliminar el ${row?.SemestreNombre} del programa ${row?.NombrePrograma}?`
              );
              if (validate) {
                // fecha de eliminación
                try {
                  const responseRemove = await fetch(
                    "/api/Configuracion/GradosGrupos/DeleteGrados",
                    {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        id: row?.GradoId,
                      }),
                    }
                  ).then((res) => res.json());

                  setGradosGrupos((prev) =>
                    prev.filter((item) => item?.GradoId != row?.GradoId)
                  );
                  if (responseRemove?.body) {
                    alert(`${responseRemove?.body}`);
                  }

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

  return (
    <div className="border-t-2 border-t-white">
      <DataTable
        title="Lista de Semestres, Cuatrimestres y Grupos"
        columns={columns}
        paginationComponentOptions={paginationComponentOptions}
        data={info}
        persistTableHead
        pagination
        responsive
        noDataComponent="No hay Datos"
        customStyles={customStyles}
        paginationPerPage={7}
      />
    </div>
  );
};

export default TableGradosGrupos;
