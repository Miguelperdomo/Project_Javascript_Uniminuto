import Image from "next/image";
import React from "react";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

type Props = {
  setShowAllQuestions: any;
  ShowAllQuestions: {
    Show: boolean;
    Questions: any;
    TypeSee: string;
  };
};
const NewModalSeeQuestion = ({
  setShowAllQuestions,
  ShowAllQuestions,
}: Props) => {
  const [OptionsQuestion, setOptionsQuestion] = React.useState<any>(
    ShowAllQuestions?.Questions?.opciones?.split("@")
  );
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  console.log("ShowAllQuestions", ShowAllQuestions);

  function createMarkup(pregunta: any) {
    return { __html: `${pregunta}` };
  }

  return (
    <div className="bg-[#000236]/70 transition duration-150 ease-in-out z-20 fixed top-0 right-0 bottom-0 left-0">
      <div className="container mx-auto  w-11/12 md:w-2/3 max-w-5xl">
        <div className="relative overflow-auto  max-h-screen  py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <div className="flex justify-between items-center text-center text-lg tracking-normal leading-tight mb-4 bg-[#151A8B] w-full text-white p-4 rounded-lg font-bold">
            <h1 className="text-center text-lg tracking-normal leading-tight  bg-[#151A8B] w-full text-white  rounded-lg font-bold ">
              Pregunta Completa
            </h1>
          </div>
          {ShowAllQuestions?.Questions?.MsnRechazo.length > 0 && (
            <p>
              <b className="text-[#000236]">Motivo de rechazo: </b>
              {ShowAllQuestions?.Questions?.MsnRechazo}
            </p>
          )}
          <br />
          <hr />
          <FroalaEditorView model={ShowAllQuestions?.Questions?.pregunta} />
          <div className="col-span-2 dark:text-black">
            <h2 className="font-bold pb-2">Opciones de respuesta: </h2>
            <div className="grid md:grid-cols-2 items-center gap-2">
              {OptionsQuestion?.map((option: any, index: number) => (
                <div
                  className={`flex ${
                    index ==
                      alphabet?.findIndex(
                        (letra) =>
                          letra.toLowerCase() ==
                          ShowAllQuestions?.Questions?.respuesta
                      ) && "border-2  border-green-900 text-justify p-1"
                  }`}
                  key={index}
                >
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
                          <b className="text-[#000236]">{alphabet[index]}- </b>
                          <div
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
          <div className="flex justify-around mt-3 gap-2">
            <button
              onClick={() => {
                setShowAllQuestions({
                  TypeSee: "",
                  Show: false,
                  Questions: [],
                });
              }}
              className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewModalSeeQuestion;
