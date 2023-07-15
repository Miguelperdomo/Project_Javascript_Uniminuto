import axios from "axios";
import Image from "next/image";
import Select from "react-select";
import { Administrativo, VisibilidadModal } from "../../../typings";

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<VisibilidadModal>>;
  InfoEditar: Administrativo;
  setValues: React.Dispatch<React.SetStateAction<Administrativo>>;
  Values: Administrativo;
  Data: any;
  setAdministrativos: React.Dispatch<React.SetStateAction<Administrativo[]>>;
};

const HojadeVida = ({
  setShowModal,
  InfoEditar,
  setValues,
  Values,
  Data,
  setAdministrativos,
}: Props) => {
  const Genero = [
    { value: "M", label: "Masculino" },
    { value: "F", label: "Femenino" },
  ];

  const handerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const sentDataRes = await axios.put(
        "/api/Configuracion/Administrativos/UpdateAdministrativo",
        {
          ...Values,
        }
      );

      const GetAdministrativos = await fetch(
        "/api/Configuracion/Administrativos/GetAdministrativos"
      ).then((res) => res.json());

      setAdministrativos(GetAdministrativos?.administrativos);

      setShowModal({
        AddVisible: false,
        EditVisible: false,
      });
      alert(sentDataRes?.data?.body);
    } catch (error) {
      console.error(error);
      alert("Error al actualizar datos");
    }
  };

  const hanlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...Values, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handerSubmit}>
      <div className=" rounded-lg bg-gray-50 p-2  ">
        <div className="bg-white rounded-lg shadow-xl ">
          <div className=" w-full h-[10.6rem] ">
            <img
              src="/ProfileBackground.webp"
              className="w-full h-full rounded-tl-lg rounded-tr-lg"
            />
          </div>

          <div className="flex flex-col items-center -mt-[10.3rem]">
            <Image
              src={`https://sygescol.uniminuto.sistemasivhorsnet.com/sygescol2023/images/fotos/administrativos/${
                InfoEditar?.Imagen || "SinFotoAdmin.png"
              }`}
              width={160}
              height={160}
              alt="Foto de perfil"
              className="border-4 border-white rounded-full"
            />
            {/* <img className="w-40 border-4 border-white rounded-full" /> */}
          </div>
        </div>

        <div className="my-4 flex flex-col space-y-4 ">
          <div className="w-full flex flex-col ">
            <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
              <h4 className="text-xl text-center text-gray-900 font-bold">
                Información Personal
              </h4>
              <div className="mt-6">
                <div className="grid sm:grid-cols-2 gap-3">
                  <>
                    <div className="mb-2">
                      <label
                        htmlFor="Nombre"
                        className="mb-3 block text-base font-medium text-gray-800"
                      >
                        Nombre
                      </label>
                      <input
                        autoComplete="off"
                        autoFocus
                        type="text"
                        name="Nombre"
                        id="Nombre"
                        onChange={hanlerChange}
                        placeholder="Ingrese nombre"
                        className="InputStyle"
                        defaultValue={InfoEditar?.Nombre}
                        title="Complete Este Campo Solo con Letras"
                      />
                    </div>
                  </>
                  <>
                    <div className="mb-2">
                      <label
                        htmlFor="Apellido"
                        className="mb-3 block text-base font-medium text-gray-800"
                      >
                        Apellidos
                      </label>
                      <input
                        autoComplete="off"
                        type="text"
                        name="Apellidos"
                        id="Apellido"
                        onChange={hanlerChange}
                        placeholder="Ingrese Apellido"
                        className="InputStyle"
                        defaultValue={InfoEditar?.Apellidos}
                        title="Complete Este Campo Solo con Letras"
                      />
                    </div>
                  </>
                </div>
                <div className="mt-6 grid sm:grid-cols-2 gap-3">
                  <div className="mb-2">
                    <label
                      htmlFor="TipoDocumento"
                      className="mb-3 block text-base font-medium text-gray-800"
                    >
                      Tipo Documento
                    </label>

                    {Data?.documentos && (
                      <Select
                        options={Data?.documentos}
                        getOptionLabel={(item: any) => item.nombre}
                        getOptionValue={(item: any) => item.id}
                        onChange={(item: any) => {
                          setValues({
                            ...Values,
                            TipoDocumento: item.id,
                          });
                        }}
                        placeholder="Seleccione Tipo Documento"
                        defaultValue={Data?.documentos[Values?.IndexDocumento]}
                      />
                    )}
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="Documento"
                      className="mb-3 block text-base font-medium text-gray-800"
                    >
                      Número Documento
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      name="Documento"
                      id="Documento"
                      onChange={hanlerChange}
                      placeholder="Ingrese Numero de Documento"
                      className="InputStyle"
                      defaultValue={InfoEditar?.Documento}
                      // title="Espacion Unicamente para Numero de Documento"
                      pattern="^[a-zA-Z0-9]{9,14}$"
                      title="Por favor, agrega un número de documento válido de 9 a 14 caracteres para continuar."
                    />
                  </div>
                </div>
                <div className="mt-6 grid sm:grid-cols-2 gap-3">
                  <div className="mb-2">
                    <label
                      htmlFor="Cargo"
                      className="mb-3 block text-base font-medium text-gray-800"
                    >
                      Cargo
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      name="Cargo"
                      onChange={hanlerChange}
                      id="Cargo"
                      placeholder="Ingrese Cargo"
                      className="InputStyle"
                      defaultValue={InfoEditar?.Cargo}
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="NumeroDocumento"
                      className="mb-3 block text-base font-medium text-gray-800"
                    >
                      Perfil
                    </label>

                    {Data?.roles && (
                      <Select
                        options={Data.roles}
                        getOptionLabel={(item: any) => item?.Nombre}
                        getOptionValue={(item: any) => item?.Id}
                        onChange={(item: any) => {
                          setValues({ ...Values, TipoUsuario: item?.Id });
                        }}
                        placeholder="Seleccione Perfil"
                        defaultValue={Data?.roles[Values?.IndexRol]}
                      />
                    )}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  <div className="mb-2">
                    <label
                      htmlFor="Correo "
                      className="mb-3 block text-base font-medium text-gray-800"
                    >
                      Correo Electronico{" "}
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      name="Correo"
                      onChange={hanlerChange}
                      id="Correo"
                      placeholder="Ingrese Correo"
                      className="InputStyle"
                      defaultValue={InfoEditar?.Correo}
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor=""
                      className="mb-3 block text-base font-medium text-gray-800"
                    >
                      Genero
                    </label>
                    <Select
                      options={Genero}
                      onChange={(item: any) => {
                        setValues({ ...Values, Genero: item.value });
                      }}
                      placeholder="Seleccione Perfil"
                      defaultValue={Genero[InfoEditar?.Genero === "M" ? 0 : 1]}
                    />
                  </div>
                </div>
                <div className="mt-6 grid sm:grid-cols-2 gap-2">
                  <div className="mb-2">
                    <label
                      htmlFor="Usuario"
                      className="mb-3 block text-base font-medium text-gray-800"
                    >
                      Usuario
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      name="Usuario"
                      id="Usuario"
                      disabled
                      onChange={hanlerChange}
                      className="InputStyle"
                      defaultValue={InfoEditar?.Usuario}
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="Pass"
                      className="mb-3 block text-base font-medium text-gray-800"
                    >
                      Contraseña
                    </label>
                    <input
                      autoComplete="off"
                      type="text"
                      name="Pass"
                      id="Pass"
                      disabled
                      onChange={hanlerChange}
                      defaultValue={InfoEditar?.Pass}
                      placeholder="Ingrese Numero de Documento"
                      className="InputStyle"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-around mt-3 gap-2">
        <button
          type="submit"
          className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
        >
          Guardar
        </button>
        <button
          className="block w-full max-w-xs mx-auto bg-[#151a8b] hover:bg-blue-700 focus:bg-blue-700 text-white rounded-lg px-3 py-3 font-semibold"
          onClick={(e) => {
            e.preventDefault();
            setShowModal({
              AddVisible: false,
              EditVisible: false,
            });
          }}
        >
          Cerrar
        </button>
      </div>
    </form>
  );
};

export default HojadeVida;
