import React from "react";

type Props = {
  PreguntasResolver: any[];
  setPreguntaShow: React.Dispatch<React.SetStateAction<{}>>;
};
const Puntaje = ({ PreguntasResolver, setPreguntaShow }: Props) => {
  return (
    <>
      <div className="h-[98%] rounded-md  text-white backdrop-blur-sm bg-white/30 md:col-span-2    shadow-md shadow-white">
        <div className="flex flex-wrap">
          {PreguntasResolver.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setPreguntaShow(item);
              }}
            >
              {index + 1}-
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Puntaje;
