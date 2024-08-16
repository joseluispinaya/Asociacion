using System;
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
                var obj = NUsuario.getInstance().LoginUsuarioWeb(Usuario, Clave);

                if (obj == null)
                {
                    return new Respuesta<EUsuario>() { estado = false };
                }
                Configuracion.oUsuario = obj;

                return new Respuesta<EUsuario>() { estado = true, objeto = obj };
            }
            catch (Exception ex)
            {
                return new Respuesta<EUsuario> { estado = false, valor = "Ocurrió un error: " + ex.Message };
                //throw;
            }
        }
    }
}