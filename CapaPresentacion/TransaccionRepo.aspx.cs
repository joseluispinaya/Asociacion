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
    public partial class TransaccionRepo : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<ETransaccion>> ListTtansaccionesIa(string fechainicio, string fechafin, int IdAsoci)
        {
            // Obtener la lista de transacciones
            List<ETransaccion> listaTransacciones = NTransaccion.getInstance().ObtenerTransacciones();

            // Validar si la lista de transacciones es nula o vacía
            if (listaTransacciones == null || listaTransacciones.Count == 0)
            {
                return new Respuesta<List<ETransaccion>>()
                {
                    estado = false,
                    objeto = null
                };
            }

            try
            {
                // Si las fechas son vacías o nulas, filtrar solo por IdAsoci
                if (string.IsNullOrEmpty(fechainicio) || string.IsNullOrEmpty(fechafin))
                {
                    listaTransacciones = listaTransacciones.Where(t => t.Idasoci == IdAsoci).ToList();
                }
                else
                {
                    // Convertir las fechas y filtrar por el rango de fechas
                    if (DateTime.TryParse(fechainicio, out DateTime desde) && DateTime.TryParse(fechafin, out DateTime hasta))
                    {
                        listaTransacciones = listaTransacciones
                            .Where(t => t.FechaTransaccion.Date >= desde && t.FechaTransaccion.Date <= hasta)
                            .ToList();
                    }
                    else
                    {
                        return new Respuesta<List<ETransaccion>>()
                        {
                            estado = false,
                            objeto = null
                        };
                    }
                }

                // Retornar la lista filtrada
                return new Respuesta<List<ETransaccion>>()
                {
                    estado = true,
                    objeto = listaTransacciones
                };
            }
            catch (Exception ex)
            {
                // Manejo de errores
                return new Respuesta<List<ETransaccion>>()
                {
                    estado = false,
                    objeto = null,
                    valor = "Ocurrió un error: " + ex.Message
                };
            }
        }

        [WebMethod]
        public static Respuesta<List<ETransaccion>> ListTtansacciones(string fechainicio, string fechafin, int IdAsoci)
        {
            List<ETransaccion> ListapaFiltrar = NTransaccion.getInstance().ObtenerTransacciones();

            

            if (ListapaFiltrar != null)
            {
                if (string.IsNullOrEmpty(fechainicio) || string.IsNullOrEmpty(fechafin))
                {
                    ListapaFiltrar = ListapaFiltrar.Where(t => t.Idasoci == IdAsoci).ToList();
                    
                }
                else
                {
                    DateTime desde = Convert.ToDateTime(fechainicio).Date;
                    DateTime hasta = Convert.ToDateTime(fechafin).Date;

                    ListapaFiltrar = ListapaFiltrar
                        .Where(f => f.FechaTransaccion.Date >= desde && f.FechaTransaccion.Date <= hasta).ToList();
                }

                return new Respuesta<List<ETransaccion>>() { estado = true, objeto = ListapaFiltrar };
            }
            else
            {
                return new Respuesta<List<ETransaccion>>() { estado = false, objeto = null };
            }

        }
    }
}