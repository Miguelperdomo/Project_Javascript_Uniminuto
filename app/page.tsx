import Image from "next/image";

const HomePage = () => {
  return (
    <div className="h-screen">
      <div className=" h-full container m-auto col-span-7  w-full flex-col bg-[url('/fondoWelcome.webp')] bg-cover bg-no-repeat flex items-center justify-center p-5 ">
        <div className="bg-[#070E54]/90 text-white rounded-[1rem] shadow-xl py-5 px-5 w-full lg:w-10/12 xl:w-3/4">
          <div className="flex flex-wrap -mx-3 items-center">
            <div
              className="w-full md:w-[25%] px-3 text-center hidden md:block"
              style={{ filter: "drop-shadow(0px 0px 6px #020415)" }}
            >
              <Image
                src="/EscudoUniminuto.webp"
                width={200}
                height={200}
                alt="Logo Uniminuto"
                title="Logo Uniminuto"
              />
            </div>
            <div className="w-full md:w-[50%] px-3">
              <div className="p-5 xl:px-8 md:py-5">
                <h1
                  className="lg:text-[1.3rem] text-center font-bold uppercase"
                  style={{ filter: "drop-shadow(0px 0px 6px #020415)" }}
                >
                  Bienvendo a SYGESAUNIV {new Date().getFullYear()}
                </h1>
                <h5
                  style={{ filter: "drop-shadow(0px 0px 6px #020415)" }}
                  className="uppercase text-[#c2c9ff] lg:text-[3rem] font-medium text-center"
                >
                  Uniminuto{" "}
                </h5>
              </div>
            </div>
            <div
              className="w-full md:w-[25%] px-3 text-center border-b-[2px] border-white/70 pb-4 md:border-none md:pb-0"
              style={{
                filter: "drop-shadow(0px 0px 6px #020415)",
                textAlign: "center",
              }}
            >
              <Image
                src="/LogoSYGESCOL.webp"
                width={200}
                height={200}
                alt="Logo Sygescol"
                title="Logo Sygescol"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
