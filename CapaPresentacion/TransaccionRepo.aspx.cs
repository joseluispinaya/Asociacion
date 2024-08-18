using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using System.Web.Services;
using System.Globalization;

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
        public static Respuesta<List<ResumenTransa>> ListTtansaccioId(int IdAsoci)
        {
            
            try
            {
                List<ETransaccion> Lista = NTransaccion.getInstance().ObtenerTransaccionesId(IdAsoci);
                if (Lista != null && Lista.Count > 0)
                {
                    DateTime primerafecha = Lista.Min(transaccion => transaccion.FechaTransaccion.Date);
                    DateTime ultimafecha = Lista.Max(transaccion => transaccion.FechaTransaccion.Date);

                    List<ResumenTransa> oListaGrupo = ObtenerGroup(primerafecha, ultimafecha, Lista);

                    float totalMonto = oListaGrupo?.Sum(pago => pago.TotalAmount) ?? 0;
                    string totmil = "Total:  " + totalMonto.ToString("F2") + " Bs";

                    return new Respuesta<List<ResumenTransa>>() { estado = true, valor = totmil, objeto = oListaGrupo };
                }
                else
                {
                    return new Respuesta<List<ResumenTransa>>() { estado = false, objeto = null };
                }


            }
            catch (Exception ex)
            {
                return new Respuesta<List<ResumenTransa>>() { estado = false, valor = "Error al obtener la lista: " + ex.Message, objeto = null };
                //throw;
            }

        }

        [WebMethod]
        public static Respuesta<List<ResumenTransa>> ListTtansaccioFech(string fechainicio, string fechafin)
        {

            try
            {
                List<ETransaccion> Lista = NTransaccion.getInstance().ObtenerTransacciones();
                if (Lista != null && Lista.Count > 0)
                {
                    if (DateTime.TryParse(fechainicio, out DateTime desde) && DateTime.TryParse(fechafin, out DateTime hasta))
                    {
                        Lista = Lista
                            .Where(t => t.FechaTransaccion.Date >= desde && t.FechaTransaccion.Date <= hasta)
                            .ToList();

                        List<ResumenTransa> oListaGrupo = ObtenerGroup(desde, hasta, Lista);

                        float totalMonto = oListaGrupo?.Sum(pago => pago.TotalAmount) ?? 0;
                        string totmil = "Total:  " + totalMonto.ToString("F2") + " Bs";

                        return new Respuesta<List<ResumenTransa>>() { estado = true, valor = totmil, objeto = oListaGrupo };
                    }
                    else
                    {
                        return new Respuesta<List<ResumenTransa>>() { estado = false, objeto = null };
                    }

                }
                else
                {
                    return new Respuesta<List<ResumenTransa>>() { estado = false, objeto = null };
                }


            }
            catch (Exception ex)
            {
                return new Respuesta<List<ResumenTransa>>() { estado = false, valor = "Error al obtener la lista: " + ex.Message, objeto = null };
                //throw;
            }

        }

        public static List<ResumenTransa> ObtenerGroup(DateTime fechainicio, DateTime fechafin, List<ETransaccion> list)
        {
            string feservini = fechainicio.ToString("yyyy/MM/dd");
            string feservfin = fechafin.ToString("yyyy/MM/dd");

            List<ResumenTransa> oListaVentam = new List<ResumenTransa>();
            var oListaVenta = list;

            var listaTemporalDate = (from ventaRepoFecha in oListaVenta
                                     group ventaRepoFecha by ventaRepoFecha.FechaTransaccion
                                     into listaVenre
                                     select new
                                     {
                                         date = listaVenre.Key,
                                         monto = listaVenre.Sum(item => item.Total)
                                     }).AsEnumerable();

            int totalDays = Convert.ToInt32((fechafin - fechainicio).Days);

            if (totalDays <= 7)
            {
                oListaVentam = (from ventaRepoFecha in listaTemporalDate
                                group ventaRepoFecha by ventaRepoFecha.date.ToString("dd-MMM-yyyy")
                                into listaVenre
                                select new ResumenTransa
                                {
                                    Month = listaVenre.Key,
                                    TotalAmount = listaVenre.Sum(item => item.monto)
                                }).ToList();
            }
            else if (totalDays <= 30)
            {
                oListaVentam = (from ventaRepoFecha in listaTemporalDate
                                group ventaRepoFecha by
                                CultureInfo.CurrentCulture.Calendar.GetWeekOfYear(
                                    ventaRepoFecha.date, CalendarWeekRule.FirstDay, DayOfWeek.Monday)
                                into listaVenre
                                select new ResumenTransa
                                {
                                    Month = "Semana" + listaVenre.Key.ToString(),
                                    TotalAmount = listaVenre.Sum(item => item.monto)
                                }).ToList();
            }
            else if (totalDays <= 365)
            {
                oListaVentam = (from ventaRepoFecha in listaTemporalDate
                                group ventaRepoFecha by ventaRepoFecha.date.ToString("MMM-yyyy")
                                into listaVenre
                                select new ResumenTransa
                                {
                                    Month = listaVenre.Key,
                                    TotalAmount = listaVenre.Sum(item => item.monto)
                                }).ToList();
            }
            else
            {
                oListaVentam = (from ventaRepoFecha in listaTemporalDate
                                group ventaRepoFecha by ventaRepoFecha.date.ToString("yyyy")
                                into listaVenre
                                select new ResumenTransa
                                {
                                    Month = listaVenre.Key,
                                    TotalAmount = listaVenre.Sum(item => item.monto)
                                }).ToList();
            }

            return oListaVentam.Any() ? oListaVentam : new List<ResumenTransa>();
        }

        // sin uso
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