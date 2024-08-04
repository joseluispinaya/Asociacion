using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NAfiliado
    {
        #region "PATRON SINGLETON"
        private static NAfiliado daoEmpleado = null;
        private NAfiliado() { }
        public static NAfiliado getInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NAfiliado();
            }
            return daoEmpleado;
        }
        #endregion

        public bool RegistrarAfiliado(EAfiliado oUsuario)
        {
            return DAfiliado.getInstance().RegistrarAfiliado(oUsuario);
        }
        public bool ActualizarAfiliado(EAfiliado oUsuario)
        {
            return DAfiliado.getInstance().ActualizarAfiliado(oUsuario);
        }
        public List<EAfiliado> ObtenerAfiliadosZ()
        {
            return DAfiliado.getInstance().ObtenerAfiliadosZ();
        }
    }
}
