using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using CapaEntidad;
using CapaNegocio;


namespace CapaPresentacion
{
    public partial class Inicio : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<string> ObtenerToken(int IdUsu)
        {
            try
            {
                //int IdUsuario = Configuracion.oUsuario.IdUsuario;
                var tokenSesion = NUsuario.getInstance().ObtenerToken(IdUsu);
                return new Respuesta<string>() { estado = true, valor = tokenSesion };
            }
            catch (Exception)
            {
                return new Respuesta<string>() { estado = false };
            }
        }

        //sin usar
        [WebMethod]
        public static Respuesta<EUsuario> ObtenerDatos()
        {
            try
            {
                if (Configuracion.oUsuario == null)
                {
                    return new Respuesta<EUsuario>() { estado = false };
                }

                var usuario = Configuracion.oUsuario;
                return new Respuesta<EUsuario>() { estado = true, objeto = usuario };
            }
            catch (Exception ex)
            {
                return new Respuesta<EUsuario> { estado = false, valor = "Ocurrió un error: " + ex.Message };
                //throw;
            }
        }

        [WebMethod]
        public static Respuesta<bool> CerrarSesion()
        {
            //Configuracion.oUsuario = null;

            return new Respuesta<bool>() { estado = true };

        }
    }
}