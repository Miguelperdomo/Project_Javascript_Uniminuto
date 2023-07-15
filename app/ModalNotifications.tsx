import Link from "next/link";
import React, { useRef } from "react";
import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import es from "timeago.js/lib/lang/es";

type Props = {
  Notification: [];
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalNotifications = ({ Notification, setShowNotification }: Props) => {
  timeago.register("es", es);

  const areaRef: any = useRef(null);

  const handleClick = (event: any) => {
    console.log("areaRef", areaRef?.current?.contains(event.target));

    if (!areaRef?.current?.contains(event?.target)) {
      // El clic se produjo fuera del área
      // Aquí puedes escribir tu código para manejar el evento
      setShowNotification(false);
    }
  };
  return (
    <>
      <div
        onClick={handleClick}
        className="w-full h-full bg-gray-800/30 z-50 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0"
      >
        <div className="w-full absolute z-50 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700">
          <div
            ref={areaRef}
            id="area"
            className=" xl:w-[25%] bg-gray-50 h-screen overflow-y-auto p-6 absolute top-0 right-0"
          >
            <div className="flex items-center justify-between">
              <p className="focus:outline-none text-2xl font-semibold leading-6 text-gray-800">
                Notificaciones
              </p>
              <button
                onClick={() => setShowNotification(false)}
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md cursor-pointer"
              >
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18"
                    stroke="#4B5563"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 6L18 18"
                    stroke="#4B5563"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className=" p-3 mt-3 bg-white rounded flex justify-around items-center ">
              <div className="pl-3 w-full space-y-4">
                {Notification.map((item: any, key: any) => (
                  <div key={key}>
                    <Link
                      href={item.Link}
                      onClick={() => setShowNotification(false)}
                      className=" flex items-center justify-between w-full"
                    >
                      <p
                        dangerouslySetInnerHTML={{ __html: item.message }}
                        className="focus:outline-none text-sm leading-none"
                      >
                        {/* <span className="text-indigo-700">Sash</span> added you
                        to the group:{" "}
                        <span className="text-indigo-700">UX Designers</span> */}
                      </p>
                      <div className="pl-2 focus:outline-none cursor-pointer">
                        <svg
                          width={14}
                          height={14}
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.5 3.5L3.5 10.5"
                            stroke="#4B5563"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3.5 3.5L10.5 10.5"
                            stroke="#4B5563"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </Link>
                    <p className="focus:outline-none text-xs leading-3 pt-1 text-gray-500">
                      <TimeAgo datetime={item?.date_created} locale="es" />
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalNotifications;
