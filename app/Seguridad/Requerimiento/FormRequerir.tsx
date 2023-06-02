"use client";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { json } from "stream/consumers";
import { Estudiante, VisibilidadModal } from "../../../typings";
import NewEditor from "./NewEditor";

type Props = {
  // type props useState
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
  setEstudiante: React.Dispatch<React.SetStateAction<Estudiante[]>>;
  InfoEditar: Estudiante;
};

const FormRequerir = ({ setShowModal }: Props) => {
  const [InputValue, setInputValue] = useState({
    IdUsuario: JSON.parse(localStorage?.DemasInfo),
    Rol: localStorage.usu_rol,
    SedeId: localStorage.IdSubSede,
  } as any);

  const getResponseApi = async (url: string) => {
    try {
      const response = await axios(url);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(InputValue);

    //   try {
    //     e.preventDefault();

    //     const res = await axios.post(
    //       "",
    //       {
    //         InputValue,
    //       }
    //     );

    //     console.log(res?.data);
    //   } catch (error) {
    //     alert("Error al enviar el formulario");
    //     console.error(error);
    //   }
    // };
  };

  return (
    <>
      <div className="bg-[#000236]/100 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
        <div className="mx-auto max-w-5xl max-h-screen overflow-auto scrollbar-hide">
          <form
            onSubmit={handlerSubmit}
            className=" md:px-8 bg-white shadow-md rounded border border-gray-400"
          >
            <h1 className="text-center text-lg tracking-normal leading-tight mb-4 bg-[#151A8B] w-full text-white p-4 rounded-lg font-bold ">
              Agregar Nuevo Requerimiento
            </h1>

            <section id="contact w-full">
              <div className="  bg-white p-2">
                <div className="px-2 py-2 rounded-md border border-black shadow-2xl">
                  <article>
                    <div className="text-justify text-xl text-red-700 font-bold">
                      <p>
                        Bienvenido al formulario de creación de requerimientos.
                        Aquí podrá crear y enviar su peticion con facilidad.
                        Simplemente siga las instrucciones y rellene los campos
                        Solicitados.
                      </p>
                      <p className="mt-3 text-center">
                        ¡Gracias por usar nuestro servicio!
                      </p>
                    </div>
                    <label
                      htmlFor="checkcontact"
                      className="contactbutton rounded-md"
                    >
                      <div className="mail" />
                    </label>
                    <input id="checkcontact" type="checkbox" />
                    <div className="contactform">
                      <p className="input_wrapper rounded-md">
                        <input
                          autoComplete="off"
                          // valida que solo pueda ingresar texto con una expresion regular
                          pattern="[A-Za-z ]{1,50}"
                          type="text"
                          name="contact_email"
                          defaultValue={" "}
                          id="contact_REQ"
                          onChange={(e) => {
                            setInputValue({
                              ...InputValue,
                              Asunto: e.target.value,
                            });
                          }}
                          title="Solo se permiten letras"
                        />
                        <label className="rounded-md" htmlFor="contact_REQ">
                          Asunto
                        </label>
                      </p>

                      <p className="textarea_wrapper">
                        <NewEditor setInputValue={setInputValue} />
                      </p>

                      {/* <p className="submit_wrapper">
                        <input type="submit" defaultValue="ENVOYER" />
                      </p> */}
                      <div className="flex justify-around mt-2 gap-2">
                        {/* <button
                          type="submit"
                        >
                          Enviar
                        </button> */}

                        <input
                          type="submit"
                          value="enviar"
                          className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
                        />
                        <button
                          className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
                          onClick={(e) => {
                            e.preventDefault();
                            setShowModal({
                              AddVisible: false,
                            });
                          }}
                        >
                          Cerrar
                        </button>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>

      <style jsx>{`
        #contact {
          width: 500px;
          margin: 0.5em auto;
          background: white;
          position: relative;
        }
        #contact::after {
          content: "";
          display: block;
          height: 30px;
          width: 90%;
          left: 5%;
          bottom: 0;
          position: absolute;
          -webkit-box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.19);
          box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.19);
          border-radius: 100%;
          z-index: -1;
        }
        #contact article {
          padding: 1em;
        }
        #contact h1 {
          background: #1b115c;
          font-family: Oswald, sans-serif;
          font-size: 1.75em;
          padding: 0.6em 0 0.6em 0.4em;
          color: white;
          text-shadow: 0 0.06em 0 #424242;
          position: relative;
          border-radius: 9px;
        }
        .contactbutton {
          background: #1b115c;
          -webkit-box-shadow: 1px 1px 0 0 #f0f4f5, 2px 2px 0 0 #f0f4f5,
            3px 3px 0 0 #f0f4f5;
          box-shadow: 1px 1px 0 0 #f0f4f5, 2px 2px 0 0 #f0f4f5,
            3px 3px 0 0 #f0f4f5;
          text-align: center;
          display: block;
          width: 100%;
          height: 50px;
          margin-top: 20px;
          margin-bottom: 2px;
          cursor: pointer;
        }
        .contactbutton:hover {
          -webkit-box-shadow: 1px 1px 0 0 #f0f4f5, 0px 0px 0 0 #f0f4f5,
            0px 0px 0 0 #f0f4f5;
          box-shadow: 1px 1px 0 0 #f0f4f5, 0px 0px 0 0 #f0f4f5,
            0px 0px 0 0 #f0f4f5;
          margin-top: 22px;
          margin-left: 2px;
          margin-bottom: 0px;
        }
        .mail {
          margin-top: 11px;
          font-size: 15px;
          display: inline-block;
          border-top: 2em solid transparent;
          border-left: 2.6em solid #f0f4f5;
          height: 0;
          width: 0;
          position: relative;
        }
        .mail:before {
          content: "";
          top: -2.5em;
          left: -2.95em;
          display: block;
          position: absolute;
          border-top: 1.2em solid #f0f4f5;
          border-left: 1.6em solid transparent;
          border-right: 1.6em solid transparent;
          border-bottom: 1em solid transparent;
          font-size: 0.8em;
        }
        .mail::after {
          display: block;
          content: "";
          position: absolute;
          border-top: 2em solid transparent;
          border-right: 2.6em solid #f0f4f5;
          height: 0;
          width: 0;
          left: -2.18em;
          bottom: 0;
        }
        #checkcontact {
          position: absolute;
          left: -9999px;
        }
        .contactform {
          overflow: hidden;
          max-height: 0px;
          -webkit-transition: all linear 1s;
          -moz-transition: all linear 1s;
          -o-transition: all linear 1s;
          -ms-transition: all linear 1s;
          transition: all linear 1s;
        }
        #checkcontact:checked + .contactform {
          max-height: 1000px;
        }
        .input_wrapper {
          position: relative;
        }
        .textarea_wrapper textarea {
          margin-top: 20px;
          display: block;
          width: 100%;
          background: white;
          border: 1px solid #dadada;
          box-shadow: 0 0 1px 0 #e4e4e4;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          padding: 1em;
          -webkit-transition: all 250ms ease;
          -moz-transition: all 250ms ease;
          -ms-transition: all 250ms ease;
          -o-transition: all 250ms ease;
          transition: all 250ms ease;
          color: #5e5e5e;
        }
        .input_wrapper input[type="text"] {
          margin-top: 1em;
          display: block;
          width: 100%;

          background: white;
          border: 1px solid #dadada;
          box-shadow: 0 0 1px 0 #e4e4e4;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          padding: 1em;
          -webkit-transition: all 250ms ease;
          -moz-transition: all 250ms ease;
          -ms-transition: all 250ms ease;
          -o-transition: all 250ms ease;
          transition: all 250ms ease;
          color: #5e5e5e;
          text-indent: 15%;
        }
        .input_wrapper input[type="text"]:focus {
          background: rgba(242, 56, 90, 0.05);
          box-shadow: inset 2px 2px 5px 0 #dadada;
          outline: none;
          text-indent: 0;
        }
        .input_wrapper label {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          background: #1b115c;
          color: white;

          font-family: Oswald, sans-serif;
          box-sizing: border-box;
          width: 15%;
          text-align: center;
          line-height: 2.8em;
          -webkit-transition: all 250ms ease;
          -moz-transition: all 250ms ease;
          -ms-transition: all 250ms ease;
          -o-transition: all 250ms ease;
          transition: all 250ms ease;
        }
        .input_wrapper input[type="text"]:focus + label {
          left: 85%;
        }
        .textarea_wrapper textarea {
          margin-top: 20px;
          display: block;
          width: 100%;
          min-height: 100px;
          background: white;
          border: 1px solid #dadada;
          box-shadow: 0 0 1px 0 #e4e4e4;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          padding: 1em;
          -webkit-transition: all 250ms ease;
          -moz-transition: all 250ms ease;
          -ms-transition: all 250ms ease;
          -o-transition: all 250ms ease;
          transition: all 250ms ease;
          color: #5e5e5e;
        }
        .textarea_wrapper textarea:focus {
          background: rgba(242, 56, 90, 0.05);
          box-shadow: inset 2px 2px 5px 0 #dadada;
          outline: none;
        }
        .submit_wrapper {
          text-align: center;
        }
        .submit_wrapper input {
          text-align: center;
          display: inline-block;
          width: 40%;
          height: 50px;
          margin-top: 1em;
          margin-bottom: 6px;
          cursor: pointer;
          background: #1b115c;
          color: white;
          font-family: Oswald, sans-serif;
          font-size: 1em;
          border: none;
          -webkit-box-shadow: 1px 1px 0 0 #f0f4f5, 2px 2px 0 0 #f0f4f5,
            3px 3px 0 0 #f0f4f5;
          box-shadow: 1px 1px 0 0 #f0f4f5, 2px 2px 0 0 #f0f4f5,
            3px 3px 0 0 #f0f4f5;
          -webkit-appearance: none;
          -webkit-transition: all 250ms ease;
          -moz-transition: all 250ms ease;
          -ms-transition: all 250ms ease;
          -o-transition: all 250ms ease;
          transition: all 250ms ease;
        }
        .submit_wrapper input:hover {
          -webkit-box-shadow: 1px 1px 0 0 #f0f4f5, 0px 0px 0 0 #f0f4f5,
            0px 0px 0 0 #f0f4f5;
          box-shadow: 1px 1px 0 0 #f0f4f5, 0px 0px 0 0 #f0f4f5,
            0px 0px 0 0 #f0f4f5;
          margin-top: 22px;
          margin-left: 2px;
          margin-bottom: 0px;
        }

        @media (max-width: 500px) {
          #contact {
            width: 100%;
          }
          .input_wrapper label {
            line-height: 3.5em;
            font-size: 0.8em;
          }
        }
      `}</style>
    </>
  );
};

export default FormRequerir;
