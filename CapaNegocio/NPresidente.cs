using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NPresidente
    {
        #region "PATRON SINGLETON"
        private static NPresidente daoEmpleado = null;
        private NPresidente() { }
        public static NPresidente getInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NPresidente();
            }
            return daoEmpleado;
        }
        #endregion

        public bool RegistrarPresi(EPresidente oUsuario)
        {
            return DPresidente.getInstance().RegistrarPresi(oUsuario);
        }

        public bool ActualizarPresi(EPresidente oUsuario)
        {
            return DPresidente.getInstance().ActualizarPresi(oUsuario);
        }
        public List<EPresidente> ObtenerPresidenteZ()
        {
            return DPresidente.getInstance().ObtenerPresidenteZ();
        }
    }
}
