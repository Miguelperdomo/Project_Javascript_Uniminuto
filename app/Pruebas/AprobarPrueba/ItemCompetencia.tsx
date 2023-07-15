type Props = {
  Title?: string;
  Competencias?: any;
  setShowModal?: any;

  ShowModal?: {
    Show?: boolean;
    Questions?: any[];
  };
};

export const ItemCompetencia = ({
  Title,
  Competencias,
  setShowModal,
}: Props) => {
  return (
    <>
      {/* component */}
      <div className="flex flex-col  ">
        <h2 className=" text-2xl font-bold pb-2">{Title}</h2>
        <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
          <div
            onClick={(e) => {
              e.preventDefault();

              if (!Competencias?.Aprobadas?.Preguntas) {
                return;
              }

              setShowModal({
                TipoPreguntas: "Aprobadas",
                Show: true,
                Questions: Competencias?.Aprobadas?.Preguntas || [],
              });
            }}
            className={`flex items-start rounded-xl bg-blue-100 p-4 shadow-lg border-2 border-dashed border-[#070e54] hover:scale-105 duration-75 ${
              Competencias?.Aprobadas?.Preguntas?.length > 0 && "cursor-pointer"
            }`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-400 bg-blue-100 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-10 w-10 text-blue-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="font-semibold"> Aprobadas </h2>
              <p className="mt-2 text-sm text-gray-500">
                {Competencias?.Aprobadas?.Preguntas?.length || 0}
              </p>
            </div>
          </div>
          <div
            className={`flex items-start rounded-xl bg-blue-100 p-4 shadow-lg border-2 border-dashed border-[#070e54] hover:scale-105 duration-75 ${
              Competencias?.Pendientes?.Preguntas?.length > 0 &&
              "cursor-pointer"
            }`}
            onClick={(e) => {
              e.preventDefault();

              if (!Competencias?.Pendientes?.Preguntas) {
                return;
              }

              setShowModal({
                TipoPreguntas: "Pendientes",
                Show: true,
                Questions: Competencias?.Pendientes?.Preguntas || [],
              });
            }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-yellow-400 bg-yellow-50 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-9 w-9 text-orange-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="font-semibold">Pendientes</h2>
              <p className="mt-2 text-sm text-gray-500">
                {Competencias?.Pendientes?.Preguntas?.length || 0}
              </p>
            </div>
          </div>
          <div
            className={`flex items-start rounded-xl bg-blue-100 p-4 shadow-lg border-2 border-dashed border-[#070e54] hover:scale-105 duration-75 ${
              Competencias?.NoAprobadas?.Preguntas?.length > 0 &&
              "cursor-pointer"
            }`}
            onClick={(e) => {
              e.preventDefault();

              if (!Competencias?.NoAprobadas?.Preguntas) {
                return;
              }

              setShowModal({
                TipoPreguntas: "NoAprobadas",
                Show: true,
                Questions: Competencias?.NoAprobadas?.Preguntas || [],
              });
            }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-400 bg-red-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="font-semibold">No Aprobadas</h2>
              <p className="mt-2 text-sm text-gray-500">
                {Competencias?.NoAprobadas?.Preguntas?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
