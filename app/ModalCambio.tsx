"use client";
import axios from "axios";
import { useState } from "react";

type Props = {
  setModalCambiosPass: React.Dispatch<React.SetStateAction<boolean>>;
  IdUpdate: number;
};

const ModalCambio = ({ setModalCambiosPass, IdUpdate }: Props) => {
  console.log(
    "🚀 ~ file: ModalCambio.tsx:11 ~ ModalCambio ~ IdUpdate",
    IdUpdate
  );
  const [Values, setValues] = useState({} as any);
  const [Eyes, setEyes] = useState({
    Pass: false,
    ConfirmPass: false,
  });

  const handerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (Values?.Pass !== Values?.ConfirmPass) {
        alert("Las contraseñas no coinciden");
        return;
      }

      const UpdatePass = await axios.put("/api/ChangePass", {
        Id: IdUpdate,
        Pass: Values?.Pass,
      });
      setModalCambiosPass(false);

      alert(UpdatePass?.data?.body);
    } catch (error) {
      console.error(error);

      alert("Error al actualizar la contraseña");
    }
  };

  const hanlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...Values, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#000236]/100 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
      <div className="container mx-auto  w-11/12 md:w-2/3 max-w-3xl">
        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <h1 className="text-center text-lg tracking-normal leading-tight mb-4 bg-[#151A8B] w-full text-white p-4 rounded-lg font-bold ">
            Cambio Contraseña
          </h1>

          <b className="font-semibold">
            <p className="text-red-900 text-center text-2xl capitalize">
              Estimado usuario:{" "}
            </p>
          </b>
          <p className="text-center">
            Por temas de seguridad de la información de la plataforma es
            necesario que usted actualice su credencial de acceso.
          </p>
          <form onSubmit={handerSubmit}>
            <div className="grid sm:grid-cols-2 gap-2 pt-2">
              <div className="mb-2">
                <label
                  htmlFor="Pass"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Contraseña Nueva <span className="text-red-900">(*)</span>
                </label>
                <div className="relative">
                  <input
                    autoComplete="off"
                    autoFocus
                    type={Eyes.Pass ? "text" : "password"}
                    name="Pass"
                    id="Pass"
                    required
                    onChange={hanlerChange}
                    placeholder="Ingrese Nueva Contraseña"
                    className="InputStyle"
                    // genera una expresion regular para validar la siguiente información
                    // 1. Al menos una letra mayúscula
                    // 2. Al menos una un numero
                    // 3. Al menos 8 caracteres
                    // 4. No espacios en blanco
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Debe contener al menos una letra mayúscula, un número y 8 o más caracteres"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    {Eyes.Pass ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                        onClick={() => {
                          setEyes({ ...Eyes, Pass: !Eyes.Pass });
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                        onClick={() => {
                          setEyes({ ...Eyes, Pass: !Eyes.Pass });
                        }}
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
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-2">
                <label
                  htmlFor="ConfirmPass"
                  className="mb-3 block text-base font-medium text-gray-800"
                >
                  Confirma tu Contraseña{" "}
                  <span className="text-red-900">(*)</span>{" "}
                </label>
                <div className="relative">
                  <input
                    autoComplete="off"
                    type={Eyes.ConfirmPass ? "text" : "password"}
                    name="ConfirmPass"
                    id="ConfirmPass"
                    required
                    onChange={hanlerChange}
                    placeholder="Confirma tu contraseña"
                    className="InputStyle "
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    {Eyes.ConfirmPass ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                        onClick={() => {
                          setEyes({ ...Eyes, ConfirmPass: !Eyes.ConfirmPass });
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                        onClick={() => {
                          setEyes({ ...Eyes, ConfirmPass: !Eyes.ConfirmPass });
                        }}
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
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-around mt-3 gap-2">
              <button
                type="submit"
                className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
              >
                Guardar
              </button>
              {/* <button
                className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
                onClick={(e) => {
                  e.preventDefault();
                  setModalCambiosPass(false);
                }}
              >
                Cerrar
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalCambio;
