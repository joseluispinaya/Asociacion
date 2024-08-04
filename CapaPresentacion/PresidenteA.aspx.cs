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
        public static Respuesta<bool> Guardar(EPresidente oPresidente, byte[] imageBytes)
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
                    NroCI = oPresidente.NroCI,
                    Nombres = oPresidente.Nombres,
                    Apellidos = oPresidente.Apellidos,
                    Celular = oPresidente.Celular,
                    Foto = imageUrl,
                    Idasoci = oPresidente.Idasoci
                };
                bool Respuesta = NPresidente.getInstance().RegistrarPresi(obj);

                var respuesta = new Respuesta<bool>
                {
                    estado = Respuesta,
                    valor = Respuesta ? "Se registro correctamente" : "Error al registrar ingrese otro Nro CI"
                };
                return respuesta;

            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { estado = false, valor = "Ocurrió un error: " + ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Actualizar(EPresidente oPresidente, byte[] imageBytes)
        {
            try
            {
                var imageUrl = string.Empty;
                var Lista = NPresidente.getInstance().ObtenerPresidenteZ();
                var item = Lista.FirstOrDefault(x => x.IdPresident == oPresidente.IdPresident);

                if (item == null)
                {
                    return new Respuesta<bool>() { estado = false, valor = "Ocurrio un inconveniente intente mas tarde" };
                }

                if (imageBytes != null && imageBytes.Length > 0)
                {
                    var stream = new MemoryStream(imageBytes);
                    string folder = "/ImagenesPr/";
                    imageUrl = Utilidadesj.getInstance().UploadPhotoA(stream, folder);

                    if (!string.IsNullOrEmpty(imageUrl))
                    {
                        if (!string.IsNullOrEmpty(item.Foto))
                        {
                            File.Delete(HttpContext.Current.Server.MapPath(item.Foto));
                        }
                    }
                    else
                    {
                        imageUrl = item.Foto;
                    }
                }
                else
                {
                    imageUrl = item.Foto;
                }

                item.IdPresident = oPresidente.IdPresident;
                item.Idasoci = oPresidente.Idasoci;
                item.NroCI = oPresidente.NroCI;
                item.Nombres = oPresidente.Nombres;
                item.Apellidos = oPresidente.Apellidos;
                item.Foto = imageUrl;
                item.Celular = oPresidente.Celular;
                item.Activo = oPresidente.Activo;

                bool Respuesta = NPresidente.getInstance().ActualizarPresi(item);

                var respuesta = new Respuesta<bool>
                {
                    estado = Respuesta,
                    valor = Respuesta ? "Se actualizo correctamente" : "Error al actualizar ingrese otro Nro CI"
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