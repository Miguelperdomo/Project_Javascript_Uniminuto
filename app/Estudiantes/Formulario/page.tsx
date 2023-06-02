import BodyComponent from "./BodyComponent";

async function Formulario({ searchParams }: any) {
  const docum = searchParams?.Doc;

  return (
    <>
      <BodyComponent docu={docum} InfoUrl={searchParams} />
    </>
  );
}
export default Formulario;
