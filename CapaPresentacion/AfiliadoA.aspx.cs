using CapaEntidad;
using CapaNegocio;
using System;
using System.Collections.Generic;
using System.IO;
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
        public static Respuesta<List<EAfiliado>> ObtenerAfiliadosNuevo()
        {
            var Lista = NAfiliado.getInstance().ObtenerAfiliadosNuevo();
            if (Lista != null)
            {
                return new Respuesta<List<EAfiliado>>() { estado = true, objeto = Lista };
            }
            else
            {
                return new Respuesta<List<EAfiliado>>() { estado = false, objeto = null };
            }
        }

        //sin usar
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
        public static Respuesta<bool> GuardarNuevo(EAfiliado oAfiliado)
        {
            try
            {
                var pdfvacio = string.Empty;

                EAfiliado obj = new EAfiliado
                {
                    Idasoci = oAfiliado.Idasoci,
                    NroCI = oAfiliado.NroCI,
                    Nombres = oAfiliado.Nombres,
                    Apellidos = oAfiliado.Apellidos,
                    Direccion = oAfiliado.Direccion,
                    Celular = oAfiliado.Celular,
                    Docpdf = pdfvacio
                };
                bool Respuesta = NAfiliado.getInstance().RegistrarAfiliadoNuevo(obj);
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

        [WebMethod]
        public static Respuesta<bool> ActualizarPdf(int IdAfi, byte[] pdfBytes)
        {
            try
            {
                // Validar que el usuario es correcto
                if (IdAfi <= 0)
                {
                    return new Respuesta<bool>() { estado = false, valor = "Datos inválidos" };
                }
                var Lista = NAfiliado.getInstance().ObtenerAfiliadosNuevo();
                //var oAfiliado = Lista.Where(x => x.IdAfiliado == IdAfi).FirstOrDefault();
                var oAfiliado = Lista.FirstOrDefault(x => x.IdAfiliado == IdAfi);
                if (oAfiliado == null)
                {
                    return new Respuesta<bool>() { estado = false, valor = "No se encontró el afiliado" };
                }
                string docpdf = oAfiliado.Docpdf;
                if (pdfBytes != null && pdfBytes.Length > 0)
                {
                    using (var stream = new MemoryStream(pdfBytes))
                    {
                        string folder = "/archivopdf/";
                        string newPdf = Utilidadesj.getInstance().UploadPdf(stream, folder);

                        if (!string.IsNullOrEmpty(newPdf))
                        {
                            // Eliminar el pdf anterior si existe
                            if (!string.IsNullOrEmpty(oAfiliado.Docpdf))
                            {
                                string oldImagePath = HttpContext.Current.Server.MapPath(oAfiliado.Docpdf);
                                if (File.Exists(oldImagePath))
                                {
                                    File.Delete(oldImagePath);
                                }
                            }
                            docpdf = newPdf;
                        }
                    }
                }
                bool Respuesta = NAfiliado.getInstance().ActualizarPdf(IdAfi, docpdf);
                var respuesta = new Respuesta<bool>
                {
                    estado = Respuesta,
                    valor = Respuesta ? "Actualizado correctamente" : "Ocurrio un error"
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