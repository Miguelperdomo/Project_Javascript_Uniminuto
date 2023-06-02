"use client";
import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { Estudiante } from "../../../typings";
import { customStyles } from "../../../utils/CustomStylesTables";

type props = {
  info: Estudiante[];
};
const TableStudiantes = ({ info }: props) => {
  const [filterText, setFilterText] = useState("");

  const filteredItems = info?.filter((item: any) => {
    let nombre = `${item?.Nombre?.toLowerCase()} ${item?.Apellidos?.toLowerCase()}`;

    return (
      nombre &&
      nombre
        ?.toString()
        ?.replace(/\s+/g, " ")
        ?.toLowerCase()
        ?.includes(filterText?.toLowerCase())
    );
  });

  const columns = [
    {
      name: "Nombre de estudiante",
      selector: (row: any) => `${row?.Nombre} ${row?.Apellidos}`,
      sortable: true,
      wrap: true,
      grow: 2,
    },
    {
      name: "Documento",
      selector: (row: any) => row?.Documento || row?.NumeroDocumento,
      sortable: true,
      wrap: true,
    },

    {
      name: "Correo",
      selector: (row: any) => row?.Correo,
      sortable: true,
      wrap: true,
    },
    {
      name: "WhatsApp",
      selector: (row: any) => row?.WhatsApp || row?.Documento,
      sortable: true,
      wrap: true,
    },
    // {
    //   name: "Jornada",
    //   selector: (row: any) => row?.Jornada || "No Disponible",
    //   sortable: true,
    //   wrap: true,
    // },
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
        autoComplete="off"
        onChange={(e) => setFilterText(e.target.value)}
        // onClear={handleClear}
        value={filterText}
        placeholder="Buscar por nombres y apellidos"
        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
      />
    );
  }, [filterText]);

  return (
    <div className="border-l-2 border-t-2 border-r-2 border-white">
      {" "}
      <DataTable
        title="Lista de Estudiantes"
        columns={columns}
        paginationComponentOptions={paginationComponentOptions}
        data={filteredItems}
        pagination
        persistTableHead
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        responsive
        noDataComponent="No hay estudiantes"
        customStyles={customStyles}
        paginationPerPage={7}
      />
    </div>
  );
};

export default TableStudiantes;
