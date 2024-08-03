using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NAsociacion
    {
        #region "PATRON SINGLETON"
        private static NAsociacion daoEmpleado = null;
        private NAsociacion() { }
        public static NAsociacion getInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NAsociacion();
            }
            return daoEmpleado;
        }
        #endregion

        public bool RegistrarAsociacion(EAsociacion asocia)
        {
            return DAsociacion.getInstance().RegistrarAsociacion(asocia);
        }

        public bool ActualizarAsociacion(EAsociacion asocia)
        {
            return DAsociacion.getInstance().ActualizarAsociacion(asocia);
        }
        public List<EAsociacion> ObtenerAsociacion()
        {
            return DAsociacion.getInstance().ObtenerAsociacion();
        }
    }
}
