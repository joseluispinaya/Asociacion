using CapaEntidad;
using CapaNegocio;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace CapaPresentacion
{
    public partial class AsociacionA : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<EAsociacion>> ObtenerAsociacion()
        {
            var Lista = NAsociacion.getInstance().ObtenerAsociacion();
            if (Lista != null)
            {
                return new Respuesta<List<EAsociacion>>() { estado = true, objeto = Lista };
            }
            else
            {
                return new Respuesta<List<EAsociacion>>() { estado = false, objeto = null };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(EAsociacion oAsocia)
        {
            try
            {
                bool Respuesta = NAsociacion.getInstance().RegistrarAsociacion(oAsocia);
                var respuesta = new Respuesta<bool>
                {
                    estado = Respuesta,
                    valor = Respuesta ? "Se registro correctamente" : "Error al registrar ingrese otro nombre"
                };
                return respuesta;
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { estado = false, valor = "Ocurrió un error: " + ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Actualizar(EAsociacion oAsocia)
        {
            try
            {
                bool Respuesta = NAsociacion.getInstance().ActualizarAsociacion(oAsocia);
                var respuesta = new Respuesta<bool>
                {
                    estado = Respuesta,
                    valor = Respuesta ? "Actualizado correctamente" : "Ocurrio un error la Asociacion ya Existe"
                };
                return respuesta;
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { estado = false, valor = "Ocurrió un error: " + ex.Message };
            }
        }
    }
}