using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;

namespace CapaPresentacion
{
    public class Utilidadesj
    {
        #region "PATRON SINGLETON"
        public static Utilidadesj _instancia = null;

        private Utilidadesj()
        {

        }

        public static Utilidadesj getInstance()
        {
            if (_instancia == null)
            {
                _instancia = new Utilidadesj();
            }
            return _instancia;
        }
        #endregion

        public string UploadPhotoA(MemoryStream stream, string folder)
        {
            string rutaa = "";

            try
            {
                stream.Position = 0;

                var guid = Guid.NewGuid().ToString();
                var file = $"{guid}.jpg";

                var fullPath = $"{folder}{file}";
                var path = Path.Combine(HttpContext.Current.Server.MapPath(folder), file);

                // Guardar la imagen en el sistema de archivos
                File.WriteAllBytes(path, stream.ToArray());

                // Verificar si el archivo fue guardado correctamente
                if (File.Exists(path))
                {
                    rutaa = fullPath;
                }
            }
            catch (IOException)
            {
                // Registrar el error en un logger si es necesario
                // Logger.LogError(ioEx.Message);
                rutaa = "";  // Asegura que devuelva una cadena vacía en caso de error de E/S
            }
            catch (Exception)
            {
                // Registrar el error pero continuar el flujo
                // Puedes usar un logger si es necesario
                // Logger.LogError(ex.Message);
                rutaa = "";  // Asegura que devuelva una cadena vacía en caso de error
            }
            return rutaa;
        }

        public string UploadPdf(MemoryStream stream, string folder)
        {
            string rutaa = "";

            try
            {
                stream.Position = 0;

                var guid = Guid.NewGuid().ToString();
                var file = $"{guid}.pdf";

                var fullPath = $"{folder}{file}";
                var path = Path.Combine(HttpContext.Current.Server.MapPath(folder), file);

                // Guardar la imagen en el sistema de archivos
                File.WriteAllBytes(path, stream.ToArray());

                // Verificar si el archivo fue guardado correctamente
                if (File.Exists(path))
                {
                    rutaa = fullPath;
                }
            }
            catch (IOException)
            {
                // Registrar el error en un logger si es necesario
                // Logger.LogError(ioEx.Message);
                rutaa = "";  // Asegura que devuelva una cadena vacía en caso de error de E/S
            }
            catch (Exception)
            {
                // Registrar el error pero continuar el flujo
                // Puedes usar un logger si es necesario
                // Logger.LogError(ex.Message);
                rutaa = "";  // Asegura que devuelva una cadena vacía en caso de error
            }
            return rutaa;
        }
        public bool EnviaElCorreo(string toEmail, string clave)
        {
            try
            {
                var from = "joseluisdelta1@gmail.com";
                var name = "Desarrollo Agropecuario";
                var smtps = "smtp.gmail.com";
                var port = 587;
                var password = "msuwhzlqbyoxcgrw";
                var correo = new MailMessage();

                correo.From = new MailAddress(from, name);
                correo.To.Add(toEmail);
                correo.Subject = "Recuperacion de Clave";


                string cuerposss =
                "<table style='max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;'>" +
                "  <tr>" +
                "     <td colspan='3' style='background-color: #34495e; text-align: center; padding: 0'>" +
                "     <a 'https://asociacion-001-site1.ktempurl.com/'>" +
                "     <img width = '30%' style = 'display:block; margin: 1.5% 3%' src= 'https://asociacion-001-site1.ktempurl.com/imagenes/separadorCo.png'>" +
                "     </a>" +
                "  </td>" +
                "  </tr>" +

                "  <tr>" +
                "  <td colspan='3' style = 'padding: 0'>" +
                "     <img style = 'padding: 0; display: block' src = 'https://asociacion-001-site1.ktempurl.com/imagenes/ImgCorreo.png' width = '100%'>" +
                "  </td>" +
                "</tr>" +

                "<tr>" +
                " <td colspan='3' style = 'background-color: #ecf0f1'>" +
                "      <div style = 'color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif'>" +
                "         <h2 style='color: #e67e22; margin: 0 0 7px'>" + "Soporte tecnico del sistema Usuario" +
                "         </h2>" +
                "           <p style = 'margin: 2px; font-size: 15px'>" +
                "             Su Clave de acceso al Sistema es: " + clave + "</p>" +
                "  </div>" +
                "  </td>" +
                "</tr>" +

                "<tr>" +
                  " <td colspan='3' style = 'background-color: #ecf0f1'>" +
                  "      <div style = 'color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif'>" +
                  "       <p style = 'margin: 2px; font-size: 15px'>" +
                  "       Recomendaciones de Seguridad:</p>" +
                  "      <ul style = 'font-size: 15px;  margin: 10px 0'>" +
                  "        <li> No Compartir Credenciales.</li>" +
                  "        <li> Cambiar Clave.</li>" +
                  "        <li> Usar Mayusculas y Numeros.</li>" +
                  "      </ul>" +
                  "  <div style = 'width: 100%;margin:20px 0; text-align: center'>" +
                  "    <a style ='text-decoration: none; border-radius: 5px; padding: 11px 23px; color: white; background-color: #3498db' href = 'https://asociacion-001-site1.ktempurl.com/'>Ir a la Pagina</a>" +
                  "  </div>" +
                  "    <p style = 'color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0' > Sistema Agropecuario y Artesania </p>" +
                  "  </div>" +
                  " </td >" +
                  "</tr>" +
                "</table>";

                correo.Body = cuerposss;
                correo.IsBodyHtml = true;
                correo.Priority = MailPriority.Normal;

                SmtpClient smtp = new SmtpClient();
                smtp.Host = smtps;
                smtp.Port = port;
                smtp.Credentials = new NetworkCredential(from, password);
                smtp.EnableSsl = true;

                smtp.Send(correo);
                return true;
            }
            catch (SmtpException)
            {
                return false;
            }
            catch
            {
                return false;
            }
        }
        public bool EnviaElCorreod(string toEmail, string clave, string usuario)
        {
            try
            {
                var from = "joseluisdelta1@gmail.com";
                var name = "Restaurant la J";
                var smtps = "smtp.gmail.com";
                var port = 587;
                var password = "xyipqkdicmyimzor";
                var correo = new MailMessage();

                correo.From = new MailAddress(from, name);
                correo.To.Add(toEmail);
                correo.Subject = "Cuenta Creada";

                string cuerposss =
                    "<div style='width:400px;border-radius:5px; margin:auto;background-color:#dbdbdb;box-shadow:0px 0px 10px  #DEDEDE;padding:20px'>" +
                    "    <table style='width:100%'>" +
                    "        <tr>" +
                    "            <td align='center' colspan='2'>" +
                    "                <h2 style='color:#004DAF'>Bienvenido Restaurant la Jota</h2>" +
                    "            </td>" +
                    "        </tr>" +
                    "        <tr>" +
                    "            <td align='left' colspan='2'>" +
                    "                <p>Se creó exitosamente tu usuario. Los detalles de tu cuenta son:</p>" +
                    "            </td>" +
                    "        </tr>" +
                    "        <tr>" +
                    "            <td><h4 style='color:#004DAF;margin:2px'>Usuario:</h4></td>" +
                    $"            <td>{usuario}</td>" +
                    "        </tr>" +
                    "        <tr>" +
                    "            <td><h4 style='color:#004DAF;margin:2px'>Contraseña:</h4></td>" +
                    $"            <td>{clave}</td>" +
                    "        </tr>" +
                    "    </table>" +
                    "    <div style='background-color:#FFE1CE;padding:15px;margin-top:15px;margin-bottom:15px'>" +
                    "        <p style='margin:0px;color: #F45E00;'>Le recomendamos cambiar la contraseña una vez inicie sesión.</p>" +
                    "    </div>" +
                    "    <table>" +
                    "        <tr>" +
                    "            <td>Para iniciar sesión ingrese a la siguiente URL:</td>" +
                    "        </tr>" +
                    "    </table>" +
                    "    <a href='#' >Iniciar Sesión</a>" +
                    "</div>";

                correo.Body = cuerposss;
                correo.IsBodyHtml = true;
                correo.Priority = MailPriority.Normal;

                SmtpClient smtp = new SmtpClient();
                smtp.Host = smtps;
                smtp.Port = port;
                smtp.Credentials = new NetworkCredential(from, password);
                smtp.EnableSsl = true;

                smtp.Send(correo);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}