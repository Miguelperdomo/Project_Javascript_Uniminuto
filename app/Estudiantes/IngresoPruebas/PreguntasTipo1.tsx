import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
type Props = {
  pregunta: {
    pregunta: string;
    opciones: string;
    Prueba: number;
    IdPrueba: number;
    PreguntaId: number;
    CompetenciaNombre: string;
  };
  setResponseStudent: React.Dispatch<
    React.SetStateAction<{
      Pregunta: number;
      IdEstudiante: number;
      Prueba: number;
      Respuesta: string;
      NombreCompetencia: string;
    }>
  >;
  setResetChecked: React.Dispatch<React.SetStateAction<number | null>>;
  ResetChecked: number | null;
};

const PreguntasTipo1 = ({
  pregunta,
  setResponseStudent,
  setResetChecked,
  ResetChecked,
}: Props) => {
  const [OptionsQuestion, setOptionsQuestion] = React.useState<any>(
    pregunta?.opciones?.split("@")
  );

  const searchParams: any = useSearchParams();

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  function createMarkup(pregunta: any) {
    return { __html: `${pregunta}` };
  }

  useEffect(() => {
    setOptionsQuestion(pregunta?.opciones?.split("@"));
  }, [pregunta?.opciones]);

  const handleOptionChange = (index: number) => {
    setResetChecked(index);
  };

  return (
    <>
      <div className="grid grid-cols-1">
        <div>
          <h2>
            <span className="font-bold dark:text-black">Pregunta: </span>
          </h2>

          <FroalaEditorView model={pregunta?.pregunta} />
        </div>

        <div className="col-span-2 dark:text-black">
          <h2 className="font-bold pb-2">Opciones de respuesta: </h2>
          <div className="grid md:grid-cols-2 items-center gap-2">
            {OptionsQuestion?.map((option: any, index: number) => (
              <div className={`flex `} key={index}>
                {option?.split("~")[0] == "I" ? (
                  <>
                    {alphabet[index]}
                    -
                    <Image
                      src={`${option?.split("~")[1]}`}
                      alt={`${index}`}
                      width={400}
                      height={400}
                      className="bg-cover"
                    />
                  </>
                ) : (
                  <>
                    {option?.split("~")[1]?.length > 0 && (
                      <>
                        <input
                          onChange={() => {
                            setResponseStudent({
                              Pregunta: pregunta?.PreguntaId || 0,
                              Respuesta: alphabet[index],
                              Prueba: pregunta?.IdPrueba || 0,
                              IdEstudiante: searchParams?.get("IdUser") || 0,
                              NombreCompetencia: pregunta?.CompetenciaNombre,
                            });
                            handleOptionChange(index);
                          }}
                          type="radio"
                          name="pregunta"
                          id={`${index}`}
                          checked={ResetChecked === index ? true : false} // Establece el estado del radio button
                        />
                        <b className="text-[#000236] pl-1">
                          {alphabet[index]}-{" "}
                        </b>
                        <label
                          htmlFor={`${index}`}
                          dangerouslySetInnerHTML={createMarkup(
                            option?.split("~")[1]
                          )}
                        />
                      </>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PreguntasTipo1;
