using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CapaEntidad;
using CapaNegocio;

namespace CapaPresentacion.Api
{
    [RoutePrefix("api/afiliados")]
    public class AfiliadosController : ApiController
    {

        [HttpGet]
        [Route("combo")]
        public IHttpActionResult GetCombo()
        {
            try
            {
                var Listage = NAsociacion.getInstance().ObtenerAsociacion();
                return Ok(Listage);
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [HttpGet]
        [Route("listaafi/{idaso:int}")]
        public IHttpActionResult GetAfiliados(int idaso)
        {
            var Lista = NAfiliado.getInstance().ObtenerAfiliadosIdAsoc(idaso);
            if (Lista != null)
            {
                return Ok(Lista);
            }
            else
            {
                return BadRequest("No se tiene lista de la asociacion");
            }
        }

        [HttpPost]
        [Route("Registrolis")]
        public IHttpActionResult PostLista(List<AfiliadoRequest> requestList)
        {
            int cantReg = 0;
            int cantNoReg = 0;

            if (requestList == null || !requestList.Any())
            {
                return BadRequest("La lista está vacía.");
            }

            foreach (var request in requestList)
            {
                bool validar = NAfiliado.getInstance().VerificarCI(request.NroCI);
                if (!validar)
                {
                    var oAfiliado = new EAfiliado
                    {
                        Idasoci = request.Idasoci,
                        NroCI = request.NroCI,
                        Nombres = request.Nombres,
                        Apellidos = request.Apellidos,
                        Direccion = request.Direccion,
                        Celular = request.Celular
                    };
                    bool respu = NAfiliado.getInstance().RegistrarAfiliado(oAfiliado);
                    if (!respu)
                    {
                        cantNoReg++;
                    }
                    else
                    {
                        cantReg++;
                    }

                }
                else
                {
                    cantNoReg++;
                }
                
            }
            var detalle = "Registrados: " + cantReg.ToString() + "Omitidos: " + cantNoReg.ToString();

            return Ok(detalle);
            //return Ok("Registro Exitoso de la lista.");
        }

        [HttpPost]
        [Route("Registrar")]
        public IHttpActionResult PostAfili(List<AfiliadoRequest> requestList)
        {
            if (requestList == null || !requestList.Any())
            {
                return BadRequest("La lista está vacía.");
            }

            int cantReg = 0;
            int cantNoReg = 0;


            foreach (var request in requestList)
            {
                try
                {
                    if (!NAfiliado.getInstance().VerificarCI(request.NroCI))
                    {
                        if (RegistrarAfiliado(request))
                        {
                            cantReg++;
                        }
                        else
                        {
                            cantNoReg++;
                        }
                    }
                    else
                    {
                        cantNoReg++;
                    }
                }
                catch
                {
                    // Aquí puedes registrar la excepción si es necesario
                    cantNoReg++;
                }
            }

            var detalle = $"Registrados: {cantReg}, Omitidos: {cantNoReg}";

            return Ok(detalle);
        }

        private bool RegistrarAfiliado(AfiliadoRequest request)
        {
            var pdfvacio = string.Empty;
            var oAfiliado = new EAfiliado
            {
                Idasoci = request.Idasoci,
                NroCI = request.NroCI,
                Nombres = request.Nombres,
                Apellidos = request.Apellidos,
                Direccion = request.Direccion,
                Celular = request.Celular,
                Docpdf = pdfvacio
            };

            //return NAfiliado.getInstance().RegistrarAfiliado(oAfiliado);
            return NAfiliado.getInstance().RegistrarAfiliadoNuevo(oAfiliado);
        }
    }
}