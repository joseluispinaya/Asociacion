using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NTransaccion
    {
        #region "PATRON SINGLETON"
        private static NTransaccion daoEmpleado = null;
        private NTransaccion() { }
        public static NTransaccion getInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NTransaccion();
            }
            return daoEmpleado;
        }
        #endregion

        public bool RegistrarTransaccion(ETransaccion oUsuario)
        {
            return DTransaccion.getInstance().RegistrarTransaccion(oUsuario);
        }

        public bool ActualizarTransaccion(ETransaccion oUsuario)
        {
            return DTransaccion.getInstance().ActualizarTransaccion(oUsuario);
        }

        public List<ETransaccion> ObtenerTransacciones()
        {
            return DTransaccion.getInstance().ObtenerTransacciones();
        }

        public List<ETransaccion> ObtenerTransaccionesId(int idAso)
        {
            return DTransaccion.getInstance().ObtenerTransaccionesId(idAso);
        }

        public List<ResumenTransa> ObtenerRepoFechas(DateTime FechaInicio, DateTime FechaFin)
        {
            return DTransaccion.getInstance().ObtenerRepoFechas(FechaInicio, FechaFin);
        }

        public List<ResumenTransa> ObtenerRepoIdAso(int idAso)
        {
            return DTransaccion.getInstance().ObtenerRepoIdAso(idAso);
        }
    }
}
