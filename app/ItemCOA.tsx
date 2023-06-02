"use client";
import React, { useEffect, useState } from "react";
import Select, { StylesConfig } from "react-select";

type Props = {
  setValues: React.Dispatch<React.SetStateAction<any>>;
  Values: {};
  getDataModal?: any;
};

const ItemCOA = ({ setValues, Values, getDataModal }: Props) => {
  const [Data, setData] = useState(
    {} as {
      SubSedes: [];
    }
  );

  const getData = async () => {
    try {
      // get SubSedes
      const SubSedes = await fetch(
        "/api/Configuracion/SubSedes/GetAllSubSedes"
      ).then((res) => res.json());

      console.log("SubSedes", SubSedes);

      setData({
        SubSedes: SubSedes?.SubSedes || [],
      });
      setValues({
        ...Values,
        IdSubSede: localStorage.getItem("IdSubSede") || "",
      });
    } catch (error) {
      console.error(error);
      alert("Error al cargar la información");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const colourStyles: StylesConfig<any> = {
    control: (styles) => ({ ...styles, overflow: "unset" }),
  };

  return (
    <div className="grid sm:grid-cols-1 gap-2  ">
      <div className="mb-2">
        <label className="mb-3 block text-base font-medium text-gray-800">
          Selecciona COA <span className="text-red-900">(*)</span>
        </label>

        <Select
          className="dark:text-black"
          options={Data.SubSedes}
          getOptionLabel={(item: any) => item?.NombreSubSede}
          getOptionValue={(item: any) => item?.Id}
          onChange={(item: any) => {
            if (typeof getDataModal == "function") {
              getDataModal(item.Id);
            }

            setValues({ ...Values, IdSubSede: item.Id });
          }}
          placeholder="Seleccione una opción"
          required
          styles={colourStyles}
        />
      </div>
    </div>
  );
};

export default ItemCOA;
