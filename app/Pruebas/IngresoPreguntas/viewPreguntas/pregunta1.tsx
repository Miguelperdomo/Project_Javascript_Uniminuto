import Image from "next/image";
import { useEffect } from "react";

export type Props = {
  data: any;
  
};
export function Pregunta1({ data}: Props) {
  console.log(data);
 
  function createMarkup(pregunta: any) {
    return { __html: pregunta };
  }
  const abecedario = "a,b,c,d,e,f,g,h,i,j,k,l,m,o,p,q,r,s,t,u,v".split(",");
  const respuestas = data?.opciones
    .substring(0, data?.opciones.length - 1)
    .split("@");
  return (
    <>
      <div className="grid grid-cols-2 my-2">
        <div>
          <span className="font-bold">Puntos asignados: </span>
          {data?.punto}
        </div>
        <div>
          <span className="font-bold">Estado de la pregunta: </span>
          {(data?.aprobo == 0 && "Pendiente por autorización") ||
            (data?.aprobo == 1 && "Rechazada") ||
            "Aprobada"}
        </div>

        <div className="col-span-2 ">
          <span className="font-bold"> Motivo rechazo: </span>
          {data?.MsnRechazo || ""}
        </div>
      </div>
      <div className="my-2">
        <h1 className="font-bold p-2 rounded-md bg-blue-700 text-white text-center">
          Pregunta:
        </h1>
      </div>
      <div
        className="p-4"
        dangerouslySetInnerHTML={createMarkup(data?.Pregunta)}
        style={{color:"black"}}
      ></div>
      <div className="my-2" >
        <h1 className="font-bold p-2 rounded-md bg-blue-700 text-white text-center">
          Respuestas:
        </h1>
      </div>
      <div className="grid md:grid-cols-2 items-center gap-2"  style={{color:"black"}}>
        {respuestas &&
          respuestas.map((info: any, key: number) => {
            const explode = info.split("~");
            return (
              <>
                <div
                  className={`${
                    data.respuesta == abecedario[key] &&
                    "border-2 border-green-800 p-2"
                  }`}
                >
                  <span className="font-bold text-xl">
                    {abecedario[key].toUpperCase()}){" "}
                  </span>
                  {explode[0] == "I" ? (
                    <>
                      <Image
                        src={`${explode[1]}`}
                        alt={`${key}`}
                        width={400}
                        height={400}
                        className="bg-cover"
                      />
                    </>
                  ) : (
                    <>{explode[1]?.length > 0 && <>{explode[1]}</>}</>
                  )}
                  <span className="text-2xl">
                    {data.respuesta == abecedario[key] && <>&#10004;</>}
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
      <div className="grid md:grid-cols-2 items-center gap-2"  style={{color:"black"}}>
        {data?.retro.map((ret: any, key: number) => {
          return (
            <>
              <div>
                <span className="font-bold text-xl">
                  {abecedario[key].toUpperCase()}){" "}
                </span>
                {ret?.texto}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
  
}
