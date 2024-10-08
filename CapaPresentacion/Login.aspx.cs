﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;

namespace CapaPresentacion
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Response.AppendHeader("Cache-Control", "no-store");
        }

        [WebMethod]
        public static Respuesta<EUsuario> Logeo(string Usuario, string Clave)
        {
            try
            {
                var tok = string.Empty;
                var obj = NUsuario.getInstance().LoginUsuarioWeb(Usuario, Clave);

                if (obj == null)
                {
                    return new Respuesta<EUsuario>() { estado = false };
                }
                //Configuracion.oUsuario = obj;

                var tokenSesion = Guid.NewGuid().ToString();
                bool RespuTo = NUsuario.getInstance().ActualizarToken(obj.IdUsuario, tokenSesion);
                if (RespuTo)
                {
                    tok = NUsuario.getInstance().ObtenerToken(obj.IdUsuario);
                }

                return new Respuesta<EUsuario>() { estado = true, objeto = obj, valor = tok };
            }
            catch (Exception ex)
            {
                return new Respuesta<EUsuario> { estado = false, valor = "Ocurrió un error: " + ex.Message };
                //throw;
            }
        }

        [WebMethod]
        public static Respuesta<bool> EnviarCorreo(string correo)
        {
            try
            {
                List<EUsuario> Lista = NUsuario.getInstance().ObtenerUsuarios();
                var item = Lista.FirstOrDefault(x => x.Correo == correo);
                if (item == null)
                {
                    return new Respuesta<bool>()
                    {
                        estado = false,
                        valor = "El correo ingresado no existe"
                    };
                }

                bool enviocorr = EnviarCorreoRecuperacion(item.Correo, item.Clave);

                return new Respuesta<bool>()
                {
                    estado = enviocorr,
                    valor = enviocorr ? "Se envio las Credenciales a su Correo" : "Ocurrio un error en el envio intente mas tarde"
                };
            }
            catch (Exception)
            {
                return new Respuesta<bool>()
                {
                    estado = false,
                    valor = "Ocurrió un error intente mas tarde"
                };
            }
        }

        private static bool EnviarCorreoRecuperacion(string correo, string clave)
        {
            try
            {
                return Utilidadesj.getInstance().EnviaElCorreo(correo, clave);
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}