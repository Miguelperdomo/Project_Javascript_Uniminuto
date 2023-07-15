"use client";
import React from "react";
import axios from "axios";

type props = {
  setUser: any;
};

const Login = ({ setUser }: props) => {
  const [InputValues, setInputValues] = React.useState({});

  // const hanlerSubimit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post("/api/LoginPruebas", {
  //       InputValues,
  //     });

  //     if (response?.status == 200) {
  //       localStorage.setItem("rol_nombre", response?.data?.user[0]?.rol_nombre);
  //       localStorage.setItem("usu_rol", response?.data?.user[0]?.usu_rol);
  //       localStorage.setItem(
  //         "menu",
  //         JSON.stringify(response?.data?.Menu || [])
  //       );
  //       setUser(response?.data?.user[0]?.usu_rol);
  //     }
  //   } catch (error) {
  //     alert("Usuario o contraseña incorrectos");
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      <div className="bg-[#172744] absolute top-0 left-0  bottom-0 leading-5 h-full w-full overflow-hidden"></div>
      <div className="relative min-h-screen  flex flex-row px-[2rem] justify-center bg-transparent rounded-3xl shadow-xl">
        <div className="flex-col flex  self-center lg:px-14 sm:max-w-4xl xl:max-w-lg z-10">
          <div className="self-start hidden lg:flex flex-col text-white">
            <h1 className="my-3 font-bold text-4xl">
              Ingreso a consulta de resultados
            </h1>
            <p className="pr-3 text-md font-medium opacity-75">
              Para poder consultar los resultados de las Pruebas realizadas por
              favor ingresa tu usuario y contraseña
            </p>
          </div>
        </div>
        <div className="flex justify-center self-center z-10">
          <div className="p-12 bg-white mx-auto rounded-3xl md:w-[24rem]">
            <form
            // onSubmit={hanlerSubimit}
            >
              <div className="space-y-6">
                <div>
                  <h1 className="text-[#132035] font-bold ml-[1%]">Usuario</h1>
                  <input
                    // onChange={(e) => {
                    //   setInputValues({
                    //     ...InputValues,
                    //     [e.target.name]: e.target.value,
                    //   });
                    // }}
                    className="InputStyle"
                    name="Usuario"
                    id="Usuario"
                    type="text"
                    placeholder="Usuario"
                    required
                  />
                </div>
                <div className="relative mt-[1%]">
                  <h1 className="text-[#132035] font-bold ml-[1%]">
                    Contraseña
                  </h1>
                  <input
                    // onChange={(e) => {
                    //   setInputValues({
                    //     ...InputValues,
                    //     [e.target.name]: e.target.value,
                    //   });
                    // }}
                    name="Pass"
                    id="Pass"
                    placeholder="Contraseña"
                    type="password"
                    className="InputStyle"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <a href="/LoginPruebas/ResultadosPruebas">
                    <button className="w-full flex justify-center bg-[#3D5C87] hover:bg-[#223B60] text-white hover:text-white focus:bg-[#223B60] focus:text-white p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500">
                      Ingresar
                    </button>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <svg
        className="absolute bottom-0 left-0 "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#223B60"
          fillOpacity={1}
          d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        />
      </svg>
      <svg
        className="absolute bottom-[-90px] left-0 "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#3D5C87"
          fillOpacity={1}
          d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        />
      </svg>
      <svg
        className="absolute bottom-[-186px] left-0 "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#8B9DB7"
          fillOpacity={1}
          d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        />
      </svg>
    </div>
  );
};

export default Login;
