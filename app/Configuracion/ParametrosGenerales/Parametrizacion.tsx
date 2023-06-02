"use client";
// import React from "react";
import React from "react";

const Parametrizacion = () => {
  return (
    <>
      <form>
        <div className="m-2  rounded-md shadow-xl">
          {/* <div>
          <h2 className="text-2xl text-sky-900 font-semibold sm:text-4xl">
            Sr. Usuario:
          </h2>
          <p className="mt-3 mb-8 text-justify text-sky-900 dark:text-gray-400 font-semibold text-xl">
            Bienvenido al módulo de parametrización de la UNIMINUTO. Este módulo
            le permitirá establecer los parámetros y criterios de calificación
            para las pruebas Saber-Pro y SESA, asegurando una evaluación justa y
            objetiva para todos los estudiantes. Por favor, seleccione las
            opciones deseadas dentro de los parametros que aparecen abajo para
            continuar.
          </p>
        </div> */}

          <div className="rounded-md  px-1 py-1 ">
            <div className="acordeon">
              <div className="m-2 acordeon__item  rounded-md border-solid border-2 border-indigo-600 px-2 py-2 shadow-xl">
                <input type="radio" name="acordeon" id="item1" />
                <label htmlFor="item1" className="font-bold acordeon__titulo">
                  1. CRITERIOS DE EVALUACIÓN Y PROMOCIÓN
                </label>
                <hr></hr>

                <p className="acordeon__contenido">Nombre: Jorge Salinas</p>
                <p className="acordeon__contenido">
                  E-mail: jasm291183@gmail.com
                </p>
                <p className="acordeon__contenido">
                  Profesion: Ingeniero en informatica // Web Developer
                </p>
                <p className="acordeon__contenido">Edad: 32 años</p>
                <p className="acordeon__contenido">
                  Teléfono de contacto: (+58)424-671-0177 // (+58)261-7977827
                </p>
              </div>

              <div className="m-2 acordeon__item rounded-md border-solid border-2 border-indigo-600 px-2 py-2 shadow-xl">
                <input type="radio" name="acordeon" id="item2" />
                <label htmlFor="item2" className="font-bold acordeon__titulo">
                  2. PROCESOS ASIGNADOS AL SISTEMA
                </label>
                <hr></hr>
                <p className="acordeon__contenido">
                  &gt;&gt;Introducción al diseño de paginas web // UNIDATA,
                  Maracaibo Agosto del 2000
                </p>
                <p className="acordeon__contenido">
                  &gt;&gt;Dia .NET URBE // Universidad Dr. Rafael Belloso
                  Chacín, Maracaibo Abril del 2005
                </p>
                <p className="acordeon__contenido">
                  &gt;&gt;Visual Basic Básico // UNIDATA, Maracaibo Junio del
                  2007
                </p>
                <p className="acordeon__contenido">
                  &gt;&gt;Diplomado: Diseño de medios digitales web //
                  Universidad Dr. Rafael Belloso Chacín, Maracaibo Mayo del 2009
                </p>
                <p className="acordeon__contenido">
                  &gt;&gt;Diplomado: Confiabilidad integral en sistemas
                  industriales // R2M - Reliability &amp; Risk Management,
                  Maracaibo Octubre del 2013
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <button className="bg-blue-500 w-[98%] m-2 mx-auto font-bold py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-[1.018]">
            Actualizar
          </button>
        </div>
      </form>

      <style jsx>{`
        .acordeon input {
          display: none;
        }

        .acordeon__titulo {
          display: block;
          padding: 15px;
          background: transparent;
          color: #000;
          font-size: 20px;
          cursor: pointer;
           {
            /* border-bottom: 3px solid #000; */
          }
          border-radius: 10px;
        }

        .acordeon__titulo:hover {
          background: rgba(60, 179, 113, 0.5);
        }

        .acordeon__contenido {
          height: 0;
          overflow: hidden;
          margin: 0;
          transition: all 0.5s;
        }

        .acordeon input:checked ~ .acordeon__contenido {
          height: auto;
          margin: 10px 0;
        }

        hr {
          border-width: 1px;
          border-color: rgba(200, 200, 200, 0.5);
        }
      `}</style>
    </>
  );
};

export default Parametrizacion;
