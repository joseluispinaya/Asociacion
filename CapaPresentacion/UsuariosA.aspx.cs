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
    public partial class UsuariosA : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<ERol>> ObtenerRol()
        {
            List<ERol> Lista = NTipos.getInstance().ObtenerRol();
            //Lista = NTipos.getInstance().ObtenerRol();

            if (Lista != null)
            {
                return new Respuesta<List<ERol>>() { estado = true, objeto = Lista };
            }
            else
            {
                return new Respuesta<List<ERol>>() { estado = false, objeto = null };
            }
        }

        [WebMethod]
        public static Respuesta<List<EUsuario>> ObtenerUsuario()
        {
            List<EUsuario> Lista = NUsuario.getInstance().ObtenerUsuarios();
            //Lista = NUsuario.getInstance().ObtenerUsuarios();

            if (Lista != null)
            {
                return new Respuesta<List<EUsuario>>() { estado = true, objeto = Lista };
            }
            else
            {
                return new Respuesta<List<EUsuario>>() { estado = false, objeto = null };
            }
        }

        [WebMethod]
        public static Respuesta<bool> GuardarUsua(EUsuario oUsuario, byte[] imageBytes)
        {
            try
            {
                var imageUrl = string.Empty;

                if (imageBytes != null && imageBytes.Length > 0)
                {
                    var stream = new MemoryStream(imageBytes);
                    string folder = "/Imagenes/";
                    imageUrl = Utilidadesj.getInstance().UploadPhotoA(stream, folder);
                }

                //se agrego TokenSesion
                EUsuario obj = new EUsuario
                {
                    NroCI = oUsuario.NroCI,
                    Nombres = oUsuario.Nombres,
                    Apellidos = oUsuario.Apellidos,
                    Correo = oUsuario.Correo,
                    Clave = oUsuario.Clave,
                    Foto = imageUrl,
                    IdRol = oUsuario.IdRol,
                    TokenSesion = Guid.NewGuid().ToString()
                };
                bool Respuesta = NUsuario.getInstance().RegistrarUsuario(obj);

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
        [WebMethod]
        public static Respuesta<bool> EditarUsuario(EUsuario oUsuario, byte[] imageBytes)
        {
            try
            {
                var imageUrl = string.Empty;

                List<EUsuario> Lista = NUsuario.getInstance().ObtenerUsuarios();
                var item = Lista.FirstOrDefault(x => x.IdUsuario == oUsuario.IdUsuario);
                if (item == null)
                {
                    return new Respuesta<bool>() { estado = false, valor = "Ocurrio un inconveniente intente mas tarde" };
                }
                if (imageBytes != null && imageBytes.Length > 0)
                {
                    var stream = new MemoryStream(imageBytes);
                    string folder = "/Imagenes/";
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

                item.IdUsuario = oUsuario.IdUsuario;
                item.NroCI = oUsuario.NroCI;
                item.Nombres = oUsuario.Nombres;
                item.Apellidos = oUsuario.Apellidos;
                item.Correo = oUsuario.Correo;
                item.Clave = oUsuario.Clave;
                item.Foto = imageUrl;
                item.IdRol = oUsuario.IdRol;
                item.Estado = oUsuario.Estado;

                
                bool Respuesta = NUsuario.getInstance().ActualizarUsuario(item);

                var respuesta = new Respuesta<bool>
                {
                    estado = Respuesta,
                    valor = Respuesta ? "Actualizado correctamente" : "Error al actualizar el Correo ya Existe"
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