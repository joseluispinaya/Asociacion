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
    public partial class ReporteAs : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<EPresidente>> ObtenerPresidentes()
        {
            var Lista = NPresidente.getInstance().ObtenerPresidenteZ();
            if (Lista != null)
            {
                return new Respuesta<List<EPresidente>>() { estado = true, objeto = Lista };
            }
            else
            {
                return new Respuesta<List<EPresidente>>() { estado = false, objeto = null };
            }
        }
    }
}