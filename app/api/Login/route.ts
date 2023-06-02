import { NextResponse } from "next/server";
import { User } from "../../../typings";
import connectionPool from "../../../config/db";

export async function GET(req: any) {
  const { searchParams } = new URL(req.url);

  try {
    const Usuario = searchParams?.get("Usuario");
    const Pass = searchParams?.get("Pass");

    let consulta = `SELECT rol, rol_nombre, idUsuario, tipo, subsede,ChangePass FROM usuario INNER JOIN rol ON usuario.rol = rol.rol_id WHERE login = '${Usuario?.toLowerCase()}' AND pass = '${Pass}'`;

    let DemasInfo = {};
    let Notificaciones: [] = [];

    // console.log(consulta);

    const [user]: any = await connectionPool.query(consulta);

    let Menu = [];

    if (user?.length > 0) {
      if (user[0]?.tipo == "ADMINISTRATIVO") {
        const [Administrativo]: any = await connectionPool.query(
          `
        SELECT concat(admco.admco_nom1,' ',admco.admco_nom2) as Nombre,concat(admco.admco_ape1,' ',admco.admco_ape2) as Apellidos,admco.documento as Documento FROM admco WHERE id = ${user[0]?.idUsuario}
        `
        );

        DemasInfo = {
          Nombre: Administrativo[0]?.Nombre,
          Apellidos: Administrativo[0]?.Apellidos,
          Documento: Administrativo[0]?.Documento,
          RolTipo: user[0]?.rol,
          Id: user[0]?.idUsuario,
        };
      }
      if (user[0]?.tipo == "ESTUDIANTE") {
        const [Estudiante]: any = await connectionPool.query(
          `select alumno_num_docu as Documento,concat (alumno_nom1,' ',alumno_nom2) as Nombre,concat (alumno_ape1,' ',alumno_ape2) as Apellidos from pfc_alumno where alumno_id = ${user[0]?.idUsuario}`
        );
        DemasInfo = {
          Nombre: Estudiante[0]?.Nombre,
          Apellidos: Estudiante[0]?.Apellidos,
          Documento: Estudiante[0]?.Documento,
          RolTipo: user[0]?.rol,
          Id: user[0]?.idUsuario,
        };
      }

      if (user[0]?.tipo == "PROFESOR") {
        const [NotificacionesRes]: any = await connectionPool.query(
          `SELECT id, Rol,message,date_range_start,date_range_end,Link,date_created FROM notifications WHERE Rol='${user[0]?.rol}' AND user_id='${user[0]?.idUsuario}' AND status='0' ORDER BY date_created DESC`
        );

        if (NotificacionesRes?.length > 0) {
          const NewNotifications = NotificacionesRes.filter((item: any) => {
            if (item.date_range_start) {
              const date = new Date();
              const date2 = new Date(item.date_range_start);
              if (date2.getTime() < date.getTime()) {
                return {
                  ...item,
                  status: "1",
                };
              }
            }
          });

          Notificaciones = NewNotifications;
        }

        const [Docente]: any = await connectionPool.query(
          `select concat(dcne.dcne_nom1,' ',dcne.dcne_nom2) as Nombre, concat(dcne.dcne_ape1,' ',dcne.dcne_ape2) as Apellidos,dcne_num_docu as Documento  from dcne
        where dcne.i = ${user[0]?.idUsuario}`
        );
        DemasInfo = {
          Nombre: Docente[0]?.Nombre,
          Apellidos: Docente[0]?.Apellidos,
          Documento: Docente[0]?.Documento,
          RolTipo: user[0]?.rol,
          Id: user[0]?.idUsuario,
        };
      }

      let key = 100;

      const [Modulos]: any = await connectionPool.query(`
    SELECT NewModulosSygescol.mod_nombre as Nombre,NewModulosSygescol.mod_image as Icon,NewModulosSygescol.mod_link as Link ,NewModulosSygescol.mod_id as id FROM ModulosPerfilAcceso INNER JOIN NewModulosSygescol ON (ModulosPerfilAcceso.mod_id=NewModulosSygescol.mod_id) WHERE ModulosPerfilAcceso.perfil_id=${user[0]?.rol} and NewModulosSygescol.submod_id = 0 
    `);

      if (Modulos?.length > 0) {
        for (const Module of Modulos) {
          const [SubModulos]: any = await connectionPool.query(
            `SELECT NewModulosSygescol.mod_nombre as SubModulo,NewModulosSygescol.mod_image as Icon,NewModulosSygescol.mod_link as Link ,NewModulosSygescol.mod_id as id FROM ModulosPerfilAcceso INNER JOIN NewModulosSygescol ON (ModulosPerfilAcceso.mod_id=NewModulosSygescol.mod_id) WHERE ModulosPerfilAcceso.perfil_id=${user[0]?.rol} and NewModulosSygescol.submod_id != 0 and NewModulosSygescol.submod_id=${Module.id} order by NewModulosSygescol.mod_posicion
          `
          );

          if (SubModulos?.length > 0) {
            Menu.push({
              key: key++,
              NombreModulo: Module.Nombre,
              SubModulos: SubModulos,
            });
          }
        }
      }
    }

    if (user?.length == 0) {
      return NextResponse.json(
        { body: "Unauthorized" },
        {
          status: 401,
        }
      );
    }

    return NextResponse.json({
      user: user as User[],
      DemasInfo,
      Menu: Menu || [],
      Notificaciones: Notificaciones || [],
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { body: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}
