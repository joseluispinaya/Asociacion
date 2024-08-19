using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using System.Web.Services;
using System.Globalization;

namespace CapaPresentacion
{
    public partial class TransaccionA : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<EAsociacion>> BuscarAsociacion(string buscarporNombre)
        {
            List<EAsociacion> lista = NAsociacion.getInstance().ObtenerAsociacion();
            if (lista != null)
            {
                var listaFiltrada = lista.Where(u => u.Nombre.IndexOf(buscarporNombre, StringComparison.OrdinalIgnoreCase) >= 0).ToList();
                return new Respuesta<List<EAsociacion>>() { estado = true, objeto = listaFiltrada };
            }
            else
            {
                return new Respuesta<List<EAsociacion>>() { estado = false, objeto = null };
            }
        }

        [WebMethod]
        public static Respuesta<List<ETipoTransaccion>> ObtenerTipoTransa()
        {
            List<ETipoTransaccion> Lista = NTipos.getInstance().ObtenerTipoTransaccion();
            //Lista = NTipos.getInstance().ObtenerRol();

            if (Lista != null)
            {
                return new Respuesta<List<ETipoTransaccion>>() { estado = true, objeto = Lista };
            }
            else
            {
                return new Respuesta<List<ETipoTransaccion>>() { estado = false, objeto = null };
            }
        }

        [WebMethod]
        public static Respuesta<List<ETransaccion>> ListTtansaccionesId(int IdAsoci)
        {
            List<ETransaccion> Lista = NTransaccion.getInstance().ObtenerTransaccionesId(IdAsoci);

            if (Lista != null)
            {
                return new Respuesta<List<ETransaccion>>() { estado = true, objeto = Lista };
            }
            else
            {
                return new Respuesta<List<ETransaccion>>() { estado = false, objeto = null };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(ETransaccion eTransaccion)
        {
            try
            {
                DateTime fecharetra = DateTime.ParseExact(eTransaccion.FechaTransacadena, "MM/dd/yyyy", CultureInfo.InvariantCulture);
                //DateTime fechatra = Convert.ToDateTime(eTransaccion.FechaTransacadena);
                ETransaccion obj = new ETransaccion
                {
                    IdTransa = eTransaccion.IdTransa,
                    Idasoci = eTransaccion.Idasoci,
                    Itipotra = eTransaccion.Itipotra,
                    Descripcion = eTransaccion.Descripcion,
                    Total = eTransaccion.Total,
                    FechaTransaccion = fecharetra
                    //FechaTransaccion = fechatra
                };

                bool Respuesta = NTransaccion.getInstance().RegistrarTransaccion(obj);
                var respuesta = new Respuesta<bool>
                {
                    estado = Respuesta,
                    valor = Respuesta ? "Se registro correctamente" : "Error al registrar intente mas tarde"
                };
                return respuesta;

            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { estado = false, valor = "Ocurrió un error: " + ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Actualizar(ETransaccion eTransaccion)
        {
            try
            {
                DateTime fecharetra = DateTime.ParseExact(eTransaccion.FechaTransacadena, "MM/dd/yyyy", CultureInfo.InvariantCulture);

                //DateTime fechatra = Convert.ToDateTime(eTransaccion.FechaTransacadena);
                ETransaccion obj = new ETransaccion
                {
                    IdTransa = eTransaccion.IdTransa,
                    Idasoci = eTransaccion.Idasoci,
                    Itipotra = eTransaccion.Itipotra,
                    Descripcion = eTransaccion.Descripcion,
                    Total = eTransaccion.Total,
                    FechaTransaccion = fecharetra
                    //FechaTransaccion = fechatra
                };

                bool Respuesta = NTransaccion.getInstance().ActualizarTransaccion(obj);
                var respuesta = new Respuesta<bool>
                {
                    estado = Respuesta,
                    valor = Respuesta ? "Se registro correctamente" : "Error al registrar intente mas tarde"
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