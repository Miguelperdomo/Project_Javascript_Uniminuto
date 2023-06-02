"use client";
import axios from "axios";
import DataTable from "react-data-table-component";
import { VisibilidadModal } from "../../../typings";
import { customStyles } from "../../../utils/CustomStylesTables";

type props = {
  info: Array<any>;
  setSubSedes: React.Dispatch<React.SetStateAction<any>>;
  setInfoEditar: React.Dispatch<React.SetStateAction<any>>;
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
};

// año actual
const TableSubSedes = ({
  info,
  setSubSedes,
  setInfoEditar,
  setShowModal,
}: props) => {
  const columns: any = [
    {
      name: "Rectoría",
      selector: (row: any) => {
        return (
          <h1>
            <span>{row.NombreRectoria}</span>
          </h1>
        );
      },
      sortable: true,
      wrap: true,
    },
    {
      name: "Sede",
      selector: (row: any) => {
        return (
          <h1>
            <span>{row.NombreSede}</span>
          </h1>
        );
      },
      sortable: true,
      wrap: true,
    },
    {
      name: "COA",
      selector: (row: any) => {
        return (
          <div className="w-full">
            <h1>
              <span>{row?.CodigoCOA}</span>
            </h1>

            <div className="grid sm:grid-cols-3 border-t gap-x-2 max-h-48 overflow-auto scrollbar-hide">
              {row?.SubSedes?.map((coa: any, key: any) => (
                <div key={key} className="flex gap-x-1 ">
                  <button
                    title="Eliminar Registro"
                    onClick={async () => {
                      const validate = confirm(
                        "Eliminar COA eliminará usuarios. ¿Está seguro?"
                      );
                      if (validate) {
                        console.log(coa);

                        // fecha de eliminación
                        try {
                          const responseRemove = await axios.delete(
                            "/api/Configuracion/SubSedes/DeleteCoa",
                            {
                              data: {
                                id: coa.IdSubSede,
                              },
                            }
                          );

                          const SubSedeRes = await axios.get(
                            "/api/Configuracion/SubSedes/GetSedesSubSedes"
                          );

                          setSubSedes(SubSedeRes?.data?.SedesSubSedes);

                          alert(`${responseRemove?.data?.body}`);
                        } catch (error: any) {
                          console.error(error);
                          alert(error.response.data.body);
                        }

                        // alert("Eliminado");
                      }
                    }}
                    className="text-red-900 "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                  <button
                    title="Editar Registro"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowModal({
                        EditVisible: true,
                      });
                      setInfoEditar({
                        ...coa,
                        IdSede: row.IdSede,
                      });
                    }}
                    className=" flex w-full items-center text-xs my-1 uppercase tracking-wider border px-2 text-[#070e54] border-[#070e54] hover:bg-[#070e54] hover:text-indigo-100 cursor-pointer"
                  >
                    {coa?.NombreSubSede}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      },
      grow: 2,
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
        title="Lista de Centro de Operaciones Académicos (COA)"
        columns={columns}
        paginationComponentOptions={paginationComponentOptions}
        data={info}
        persistTableHead
        pagination
        responsive
        noDataComponent="No hay datos"
        customStyles={customStyles}
        paginationPerPage={7}
      />
    </div>
  );
};

export default TableSubSedes;
