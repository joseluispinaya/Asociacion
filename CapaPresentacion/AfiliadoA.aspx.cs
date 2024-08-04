using CapaEntidad;
using CapaNegocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CapaPresentacion
{
    public partial class AfiliadoA : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<EAfiliado>> ObtenerAfiliados()
        {
            var Lista = NAfiliado.getInstance().ObtenerAfiliadosZ();
            if (Lista != null)
            {
                return new Respuesta<List<EAfiliado>>() { estado = true, objeto = Lista };
            }
            else
            {
                return new Respuesta<List<EAfiliado>>() { estado = false, objeto = null };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(EAfiliado oAfiliado)
        {
            try
            {
                bool Respuesta = NAfiliado.getInstance().RegistrarAfiliado(oAfiliado);
                var respuesta = new Respuesta<bool>
                {
                    estado = Respuesta,
                    valor = Respuesta ? "Se registro correctamente" : "Error al registrar ingrese otro CI"
                };
                return respuesta;
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { estado = false, valor = "Ocurrió un error: " + ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Actualizar(EAfiliado oAfiliado)
        {
            try
            {
                bool Respuesta = NAfiliado.getInstance().ActualizarAfiliado(oAfiliado);
                var respuesta = new Respuesta<bool>
                {
                    estado = Respuesta,
                    valor = Respuesta ? "Actualizado correctamente" : "Ocurrio un error ya Existe el CI"
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