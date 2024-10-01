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

        public bool VerificarCI(string nrCI)
        {
            return DAfiliado.getInstance().VerificarCI(nrCI);
        }

        public List<AfiliadoResponse> ObtenerAfiliadosIdAsoc(int idAso)
        {
            return DAfiliado.getInstance().ObtenerAfiliadosIdAsoc(idAso);
        }

        public bool RegistrarAfiliadoNuevo(EAfiliado oUsuario)
        {
            return DAfiliado.getInstance().RegistrarAfiliadoNuevo(oUsuario);
        }
        public List<EAfiliado> ObtenerAfiliadosNuevo()
        {
            return DAfiliado.getInstance().ObtenerAfiliadosNuevo();
        }

        public bool ActualizarPdf(int IdAfi, string pdf)
        {
            return DAfiliado.getInstance().ActualizarPdf(IdAfi, pdf);
        }
    }
}
