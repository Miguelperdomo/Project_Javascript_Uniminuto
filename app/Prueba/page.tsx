"use client";
import React, { useState } from "react";
import ReactSelect from "react-select";

const Prueba = () => {
  const [Values, setValues] = useState({});

  const options = [
    { id: "chocolate", Nombre: "Chocolate" },
    { id: "strawberry", Nombre: "Strawberry" },
    { id: "vanilla", Nombre: "Vanilla" },
  ];

  const HandlerChange = (e: any) => {
    setValues({
      ...Values,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          console.log(Values);

          alert("hola");
        }}
      >
        <div>
          <input
            type="text"
            className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500"
            placeholder="Name "
            name="name"
            onChange={HandlerChange}
          />
        </div>

        <div>
          <input
            type="text"
            className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8"
            placeholder="Country "
            onChange={HandlerChange}
            name="country"
          />
        </div>

        <ReactSelect
          options={options}
          onChange={(e) => {
            setValues({
              ...Values,
              OptionsSelected: e?.id,
            });
          }}
          getOptionLabel={(option) => option.Nombre}
          getOptionValue={(option) => option.id}
        />
        <div className="flex">
          <input type="checkbox" className="border-sky-400 " />
          <div className="px-3 text-gray-500">
            I accept terms &amp; conditions
          </div>
        </div>
        <div className="flex justify-center my-6">
          <button type="submit">Create Account</button>
        </div>
        <div className="flex justify-center ">
          <p className="text-gray-500">Already have an acount? </p>
        </div>
      </form>
    </>
  );
};

export default Prueba;
