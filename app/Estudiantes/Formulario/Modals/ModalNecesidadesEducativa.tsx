import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Nees, visibleFormulario } from "../../../../typings";
import { SavePdf } from "../../../../utils/GuardaPdf";
type Props = {
  setVisible: React.Dispatch<React.SetStateAction<visibleFormulario>>;
  Documento: number;
};
const ModalNecesidadesEducativa = ({ setVisible, Documento }: Props) => {
  const [StateShowNecesidades, setShowNecesidades] = useState(false);
  const [InputFileValue, setInputFileValue] = useState({} as Nees);
  const [data, setData] = useState({
    neeFisica: [{ id_nee: 0, nombre_nee: "" }],
    neeSensorial: [{ id_nee: 0, nombre_nee: "" }],
    neePsiquica: [{ id_nee: 0, nombre_nee: "" }],
    neeCognitiva: [{ id_nee: 0, nombre_nee: "" }],
    neeTalentos: [{ id_nee: 0, nombre_nee: "" }],
    SeccionFormSave: {
      id: 0,
    },
  });
  const [SelectValue, setSelectValue] = useState({} as Nees);
  const ShowNecesidades = (e: any) => {
    if (e.target.checked) {
      setShowNecesidades(true);
    } else {
      setShowNecesidades(false);
    }
  };
  const handerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (Object.keys(InputFileValue?.neeFisica || {}).length) {
        for (const needFile in InputFileValue?.neeFisica) {
          let name = data?.neeFisica?.filter((ne) => {
            return (ne.id_nee = parseInt(needFile));
          });
          await SavePdf(
            InputFileValue?.neeFisica[needFile],
            Documento,
            `https://sygescol.uniminuto.sistemasivhorsnet.com/sygescol2023/subirArchivos.php`,
            `${name[0]?.nombre_nee}`,
            "N.E.E"
          );
        }
      }
      if (Object.keys(InputFileValue?.neeSensorial || {}).length) {
        for (const needFile in InputFileValue?.neeSensorial) {
          let name = data?.neeSensorial?.filter((ne) => {
            return (ne.id_nee = parseInt(needFile));
          });
          await SavePdf(
            InputFileValue?.neeSensorial[needFile],
            Documento,
            `https://sygescol.uniminuto.sistemasivhorsnet.com/sygescol2023/subirArchivos.php`,
            `${name[0]?.nombre_nee}`,
            "N.E.E"
          );
        }
      }
      if (Object.keys(InputFileValue?.neePsiquica || {}).length) {
        for (const needFile in InputFileValue?.neePsiquica) {
          let name = data?.neePsiquica?.filter((ne) => {
            return (ne.id_nee = parseInt(needFile));
          });
          await SavePdf(
            InputFileValue?.neePsiquica[needFile],
            Documento,
            `https://sygescol.uniminuto.sistemasivhorsnet.com/sygescol2023/subirArchivos.php`,
            `${name[0]?.nombre_nee}`,
            "N.E.E"
          );
        }
      }
      if (Object.keys(InputFileValue?.neeCognitiva || {}).length) {
        for (const needFile in InputFileValue?.neeCognitiva) {
          let name = data?.neeCognitiva?.filter((ne) => {
            return (ne.id_nee = parseInt(needFile));
          });
          await SavePdf(
            InputFileValue?.neeCognitiva[needFile],
            Documento,
            `https://sygescol.uniminuto.sistemasivhorsnet.com/sygescol2023/subirArchivos.php`,
            `${name[0]?.nombre_nee}`,
            "N.E.E"
          );
        }
      }
      if (Object.keys(InputFileValue?.neeTalentos || {}).length) {
        for (const needFile in InputFileValue?.neeTalentos) {
          let name = data?.neeTalentos?.filter((ne) => {
            return (ne.id_nee = parseInt(needFile));
          });
          await SavePdf(
            InputFileValue?.neeTalentos[needFile],
            Documento,
            `https://sygescol.uniminuto.sistemasivhorsnet.com/sygescol2023/subirArchivos.php`,
            `${name[0]?.nombre_nee}`,
            "N.E.E"
          );
        }
      }
    } catch (error) {
      console.error(error);
      alert("Existe un error al ingresar la información");
    }
    const sentDataRes = await fetch("/api/Formulario/Save/SaveNee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Documento: Documento,
      }),
    }).then((res) => res.json());
    alert(sentDataRes.body);
    if (sentDataRes.body == "Información Cargada Con Exitó") {
      setVisible({ NecesidadesEducativas: false });
    }
  };
  const getData = async () => {
    try {
      const InfoBase = await fetch(
        `/api/Formulario/BaseInfoNecesidadesEducativas?num=${Documento}`
      ).then((res) => res.json());

      setData(InfoBase);
    } catch (error) {
      console.error(error);
      alert("Error al cargar la información");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="bg-[#000236]/100 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-0">
        <div className="container mx-auto  w-11/12 md:w-2/3 max-w-2xl">
          <div className="bg-[#000236]/100/50 transition duration-150 ease-in-out z-20 fixed top-0 right-0 bottom-0 left-0">
            <div className="container mx-auto h-screen overflow-auto w-11/12 md:w-full max-w-6xl">
              <div className="pt-2 pb-2   px-5  md:px-10 bg-white shadow-md rounded border border-gray-400">
                <h1 className="text-white bg-[#151A8B] text-center font-lg font-bold tracking-normal leading-tight mb-4 p-4 rounded-lg">
                  NECESIDADES EDUCATIVAS ESPECIALES N.E.E
                </h1>

                {/* modal info usuario body */}
                <h1 className="text-justify">
                  <b>
                    <span className=" text-[red]">NOTA IMPORTANTE: </span>
                    Antes de continuar, es fundamental que tenga en cuenta lo
                    siguiente. Al dar clic en la casilla inferior, se
                    considerará que no tiene ninguna discapacidad. Si no
                    selecciona la casilla, asegúrese de verificar los documentos
                    anexos, ya que no podrá volver a ingresarlos una vez que
                    guarde la información en esta sección.
                  </b>

                  <div className="flex items-center">
                    <label
                      htmlFor="radioButton1"
                      className="mt-3 mx-3 text-base font-medium hover:font-bold text-[#e65643]"
                    >
                      (EN CASO DE NO PADECER NINGUNA, HAGA CLIC EN LA SIGUIENTE
                      CASILLA.)
                    </label>
                    <input
                      type="checkbox"
                      name="checkbox"
                      id="radioButton1"
                      className="h-5 w-5"
                      onClick={ShowNecesidades}
                      checked={StateShowNecesidades}
                    />
                  </div>
                </h1>
                <br></br>
                <form className="overflow-y-scroll ">
                  {!data?.SeccionFormSave?.id ? (
                    <>
                      {StateShowNecesidades ? (
                        <p className="animate-bounce pt-4 text-center">
                          <b className="flex justify-center items-center ">
                            <span className="text-green-500">
                              EL ESTUDIANTE NO PADECE NINGUNA NECESIDAD
                              ESPECIAL-
                            </span>

                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6 text-green-900"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                              />
                            </svg>
                          </b>
                        </p>
                      ) : (
                        <>
                          <div className="grid gap-4 mb-6 lg:grid-cols-2">
                            <div>
                              <label className="block text-sm font-medium text-gray-900 ">
                                Discapacidad Fisica{" "}
                                <span className="text-red-900"></span>
                              </label>

                              {data && (
                                <>
                                  <Select
                                    options={data?.neeFisica}
                                    getOptionLabel={(option: any) =>
                                      option.nombre_nee
                                    }
                                    getOptionValue={(option: any) =>
                                      option.id_nee
                                    }
                                    closeMenuOnSelect={false}
                                    isMulti
                                    placeholder="seleccione una opcion"
                                    onChange={(e: any) => {
                                      setSelectValue({
                                        ...SelectValue,
                                        neeFisica: e,
                                      });
                                    }}
                                  />
                                </>
                              )}
                              <div className="grid gap-4 mb-6 lg:grid-cols-1">
                                {SelectValue?.neeFisica?.map((nee, key) => {
                                  return (
                                    <form key={nee.id_nee}>
                                      <p className="flex flex-col">
                                        <label>{nee?.nombre_nee}</label>
                                        <input
                                          type="file"
                                          id="text"
                                          name="text"
                                          accept=".pdf, .txt"
                                          onChange={(e: any) => {
                                            setInputFileValue({
                                              ...InputFileValue,
                                              neeFisica: {
                                                ...InputFileValue.neeFisica,
                                                [nee.id_nee]: e.target.files[0],
                                              },
                                            });
                                          }}
                                        ></input>
                                      </p>
                                    </form>
                                  );
                                })}
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-900 ">
                                Discapacidad Sensorial{" "}
                                <span className="text-red-900"></span>
                              </label>

                              {data && (
                                <div>
                                  <Select
                                    options={data?.neeSensorial}
                                    getOptionLabel={(option: any) =>
                                      option.nombre_nee
                                    }
                                    getOptionValue={(option: any) =>
                                      option.id_nee
                                    }
                                    closeMenuOnSelect={false}
                                    placeholder="seleccione una opcion"
                                    onChange={(e: any) => {
                                      setSelectValue({
                                        ...SelectValue,
                                        neeSensorial: e,
                                      });
                                    }}
                                    isMulti
                                  />
                                  <div className="grid gap-4 mb-6 lg:grid-cols-1">
                                    {SelectValue?.neeSensorial?.map(
                                      (nee, key) => {
                                        return (
                                          <form key={nee.id_nee}>
                                            <p className="flex flex-col">
                                              <label>{nee?.nombre_nee}</label>
                                              <input
                                                type="file"
                                                id="text"
                                                name="text"
                                                accept=".pdf, .txt"
                                                onChange={(e: any) => {
                                                  setInputFileValue({
                                                    ...InputFileValue,
                                                    neeSensorial: {
                                                      ...InputFileValue.neeSensorial,
                                                      [nee.id_nee]:
                                                        e.target.files[0],
                                                    },
                                                  });
                                                }}
                                              ></input>
                                            </p>
                                          </form>
                                        );
                                      }
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-900 ">
                                Discapacidad Psíquica{" "}
                                <span className="text-red-900"></span>
                              </label>

                              {data && (
                                <div>
                                  <Select
                                    options={data?.neePsiquica}
                                    getOptionLabel={(option: any) =>
                                      option.nombre_nee
                                    }
                                    getOptionValue={(option: any) =>
                                      option.id_nee
                                    }
                                    closeMenuOnSelect={false}
                                    placeholder="seleccione una opcion"
                                    onChange={(e: any) => {
                                      setSelectValue({
                                        ...SelectValue,
                                        neePsiquica: e,
                                      });
                                    }}
                                    isMulti
                                  />
                                  <div className="grid gap-4 mb-6 lg:grid-cols-1">
                                    {SelectValue?.neePsiquica?.map(
                                      (nee, key) => {
                                        return (
                                          <form key={nee.id_nee}>
                                            <p className="flex flex-col">
                                              <label>{nee?.nombre_nee}</label>
                                              <input
                                                type="file"
                                                id="text"
                                                name="text"
                                                accept=".pdf, .txt"
                                                onChange={(e: any) => {
                                                  setInputFileValue({
                                                    ...InputFileValue,
                                                    neePsiquica: {
                                                      ...InputFileValue.neePsiquica,
                                                      [nee.id_nee]:
                                                        e.target.files[0],
                                                    },
                                                  });
                                                }}
                                              ></input>
                                            </p>
                                          </form>
                                        );
                                      }
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-900 ">
                                Discapacidad Cognitiva{" "}
                                <span className="text-red-900"></span>
                              </label>

                              {data && (
                                <div>
                                  <Select
                                    options={data?.neeCognitiva}
                                    getOptionLabel={(option: any) =>
                                      option.nombre_nee
                                    }
                                    getOptionValue={(option: any) =>
                                      option.id_nee
                                    }
                                    closeMenuOnSelect={false}
                                    placeholder="seleccione una opcion"
                                    onChange={(e: any) => {
                                      setSelectValue({
                                        ...SelectValue,
                                        neeCognitiva: e,
                                      });
                                    }}
                                    isMulti
                                  />
                                  <div className="grid gap-4 mb-6 lg:grid-cols-1">
                                    {SelectValue?.neeCognitiva?.map(
                                      (nee, key) => {
                                        return (
                                          <form key={nee.id_nee}>
                                            <p className="flex flex-col">
                                              <label>{nee?.nombre_nee}</label>
                                              <input
                                                type="file"
                                                id="text"
                                                name="text"
                                                accept=".pdf, .txt"
                                                onChange={(e: any) => {
                                                  setInputFileValue({
                                                    ...InputFileValue,
                                                    neeCognitiva: {
                                                      ...InputFileValue.neeCognitiva,
                                                      [nee.id_nee]:
                                                        e.target.files[0],
                                                    },
                                                  });
                                                }}
                                              ></input>
                                            </p>
                                          </form>
                                        );
                                      }
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <h1 className="text-white bg-[#151A8B] text-center font-lg font-bold tracking-normal leading-tight mb-6 p-4 rounded-lg grid gap-4 lg:grid-cols-1">
                            CAPACIDADES O TALENTOS EXCEPCIONALES
                          </h1>
                          <div>
                            <label className="block text-sm font-medium text-gray-900 ">
                              Talentos <span className="text-red-900"></span>
                            </label>

                            {data && (
                              <div>
                                <Select
                                  options={data?.neeTalentos}
                                  getOptionLabel={(option: any) =>
                                    option.nombre_nee
                                  }
                                  getOptionValue={(option: any) =>
                                    option.id_nee
                                  }
                                  closeMenuOnSelect={false}
                                  placeholder="seleccione una opcion"
                                  onChange={(e: any) => {
                                    setSelectValue({
                                      ...SelectValue,
                                      neeTalentos: e,
                                    });
                                  }}
                                  isMulti
                                />
                                <div className="grid gap-4 mb-6 lg:grid-cols-1">
                                  {SelectValue?.neeTalentos?.map((nee, key) => {
                                    return (
                                      <form key={nee.id_nee}>
                                        <p className="flex flex-col">
                                          <label>{nee?.nombre_nee}</label>
                                          <input
                                            type="file"
                                            id="text"
                                            name="text"
                                            accept=".pdf, .txt"
                                            onChange={(e: any) => {
                                              setInputFileValue({
                                                ...InputFileValue,
                                                neeTalentos: {
                                                  ...InputFileValue.neeTalentos,
                                                  [nee.id_nee]:
                                                    e.target.files[0],
                                                },
                                              });
                                            }}
                                          ></input>
                                        </p>
                                      </form>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <p className="animate-bounce pt-4 text-center">
                        <b className="flex pb-6 justify-center">
                          <span className="text-green-500">
                            LA INFORMACIÓN FUE GUARDAD CON EXITO -
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
                            />
                          </svg>
                        </b>
                      </p>
                    </>
                  )}
                  <div className="flex justify-around mt-3">
                    <button
                      onClick={(e: any) => handerSubmit(e)}
                      className="mr-2 md:mr-0 disabled:opacity-30 text-white bg-[#151A8B] hover:bg-[#070E54] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                      Guardar Sección
                    </button>
                    <button
                      className="text-white bg-[#151A8B] hover:bg-[#070E54] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                      onClick={(e) => {
                        e.preventDefault();
                        setVisible({ NecesidadesEducativas: false });
                      }}
                    >
                      Cerrar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalNecesidadesEducativa;
