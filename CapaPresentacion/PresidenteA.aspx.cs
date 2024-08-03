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
    public partial class PresidenteA : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<EPresidente>> ObtenerPresi()
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

        [WebMethod]
        public static Respuesta<bool> Guardar(EPresidente oUsuario, byte[] imageBytes)
        {
            try
            {
                var imageUrl = string.Empty;

                if (imageBytes != null && imageBytes.Length > 0)
                {
                    var stream = new MemoryStream(imageBytes);
                    string folder = "/ImagenesPr/";
                    imageUrl = Utilidadesj.getInstance().UploadPhotoA(stream, folder);
                }

                EPresidente obj = new EPresidente
                {
                    NroCI = oUsuario.NroCI,
                    Nombres = oUsuario.Nombres,
                    Apellidos = oUsuario.Apellidos,
                    Celular = oUsuario.Celular,
                    Foto = imageUrl,
                    Idasoci = oUsuario.Idasoci
                };
                bool Respuesta = NPresidente.getInstance().RegistrarPresi(obj);

                var respuesta = new Respuesta<bool>
                {
                    estado = Respuesta,
                    valor = Respuesta ? "Se registro correctamente" : "Error al registrar ingrese otro correo"
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