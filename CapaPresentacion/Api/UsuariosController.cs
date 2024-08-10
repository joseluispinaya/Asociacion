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
    [RoutePrefix("api/usuarios")]
    public class UsuariosController : ApiController
    {
        [HttpPost]
        [Route("Login")]
        public IHttpActionResult InicioSession(LoginDTO loginDTO)
        {
            var obj = NUsuario.getInstance().LoginUsuarioApp(loginDTO.Correo, loginDTO.Clave);
            if (obj != null)
            {
                return Ok(obj);
            }
            else
            {
                return BadRequest("Informacion de Correo o Clave incorrectos.");
            }
        }
    }
}