using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NInventario
    {
        #region "PATRON SINGLETON"
        private static NInventario daoEmpleado = null;
        private NInventario() { }
        public static NInventario getInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NInventario();
            }
            return daoEmpleado;
        }
        #endregion

        public bool RegistrarInventario(EInventario oUsuario)
        {
            return DInventario.getInstance().RegistrarInventario(oUsuario);
        }

        public bool ActualizarInventario(EInventario oUsuario)
        {
            return DInventario.getInstance().ActualizarInventario(oUsuario);
        }

        public List<EInventario> ObtenerInventario()
        {
            return DInventario.getInstance().ObtenerInventario();
        }

        public List<EInventario> ObtenerInventarioId(int idAso)
        {
            return DInventario.getInstance().ObtenerInventarioId(idAso);
        }
    }
}
