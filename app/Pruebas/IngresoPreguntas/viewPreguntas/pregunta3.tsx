import Image from "next/image";
import React from "react";
export type Props = {
  data: any;
};
export function Pregunta3({ data }: Props) {
  function createMarkup(pregunta: any) {
    return { __html: `${pregunta}` };
  }
  const abecedario = "a,b,c,d,e,f,g,h,i,j,k,l,m,o,p,q,r,s,t,u,v".split(",");
  const respuestas = data?.opciones
    .substring(0, data?.opciones.length - 1)
    .split("@");
  const correctas = data?.respuesta.split("@");
  console.log(correctas);
  return (
    <>
      <div className="grid grid-cols-2 my-2">
        <div>
          <span className="font-bold" style={{ color: "black" }}>
            Puntos asignados:{" "}
          </span>
          {data?.punto}
        </div>
        <div style={{ color: "black" }}>
          <span className="font-bold">Estado de la pregunta: </span>
          {(data?.aprobo == 0 && "Pendiente por autorización") ||
            (data?.aprobo == 1 && "Rechazada") ||
            "Aprobada"}
        </div>
      </div>
      <div className="my-2">
        <h1 className="font-bold p-2 rounded-md bg-blue-700 text-white text-center">
          Pregunta:
        </h1>
      </div>
      <div
        className="p-4"
        style={{ color: "black" }}
        dangerouslySetInnerHTML={createMarkup(data?.Pregunta)}
      ></div>
      <div className="my-2">
        <h1 className="font-bold p-2 rounded-md bg-blue-700 text-white text-center">
          Respuestas:
        </h1>
      </div>
      <div
        className="grid md:grid-cols-2 items-center gap-2"
        style={{ color: "black" }}
      >
        {respuestas &&
          respuestas.map((info: any, key: number) => {
            const explode = info.split("~");

            console.log("corre", correctas.indexOf(abecedario[key]));
            return (
              <>
                <div
                  className={`${
                    correctas.indexOf(abecedario[key]) >= 0 &&
                    "border-2 border-green-800 p-2"
                  }`}
                >
                  <span className="font-bold text-xl">
                    {abecedario[key].toUpperCase()}){" "}
                  </span>
                  {explode[0] === "I" ? (
                    <img
                      src={`/${explode[1]}`} // Ruta relativa a la carpeta "public"
                      alt={`${key}`}
                      width={400}
                      height={400}
                      className="bg-cover"
                    />
                  ) : (
                    <>{explode[1]?.length > 0 && <>{explode[1]}</>}</>
                  )}

                  <span className="text-2xl">
                    {correctas.indexOf(abecedario[key]) >= 0 && <>&#10004;</>}
                  </span>
                </div>
              </>
            );
          })}
      </div>
      <div className="my-2">
        <h1 className="font-bold p-2 rounded-md bg-blue-700 text-white text-center">
          Retroalimentaciones:
        </h1>
      </div>
      <div
        className="grid md:grid-cols-2 items-center gap-2"
        style={{ color: "black" }}
      ></div>
    </>
  );
}
