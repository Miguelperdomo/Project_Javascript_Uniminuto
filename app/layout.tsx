import CompBackground from "./Estudiantes/Reportes/ReportesAdministrativos/CompBackground";
import "./globals.css";
import Main from "./Main";

export const metadata = {
  title: "SYGESAUNIV",
  description:
    "Mejora tu desempeño en el examen Saber Pro con nuestra completa plataforma en línea. Nuestra aplicación web de administración de pruebas te brinda las herramientas necesarias para medir tu progreso, identificar tus fortalezas y áreas de mejora, y aumentar tus posibilidades de éxito en el examen. ¡Regístrate hoy mismo y prepárate para alcanzar tus metas académicas!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Main>{children}</Main>
    </html>
  );
}
