using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using System.Web.Services;

namespace CapaPresentacion
{
    public partial class InventarioA : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<EInventario>> ListTaInventarioId(int IdAsoci)
        {
            List<EInventario> Lista = NInventario.getInstance().ObtenerInventarioId(IdAsoci);

            if (Lista != null)
            {
                return new Respuesta<List<EInventario>>() { estado = true, objeto = Lista };
            }
            else
            {
                return new Respuesta<List<EInventario>>() { estado = false, objeto = null };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(EInventario eInventario)
        {
            try
            {
                EInventario obj = new EInventario
                {
                    IdInvent = eInventario.IdInvent,
                    Idasoci = eInventario.Idasoci,
                    Cantidad = eInventario.Cantidad,
                    Descripcion = eInventario.Descripcion,
                    Motototal = eInventario.Motototal
                };

                bool Respuesta = NInventario.getInstance().RegistrarInventario(obj);
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
        public static Respuesta<bool> Actualizar(EInventario eInventario)
        {
            try
            {
                EInventario obj = new EInventario
                {
                    IdInvent = eInventario.IdInvent,
                    Idasoci = eInventario.Idasoci,
                    Cantidad = eInventario.Cantidad,
                    Descripcion = eInventario.Descripcion,
                    Motototal = eInventario.Motototal
                };

                bool Respuesta = NInventario.getInstance().ActualizarInventario(obj);
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