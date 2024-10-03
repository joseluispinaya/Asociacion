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
        public List<EPresidente> ObtenerPresidenteRpt()
        {
            return DPresidente.getInstance().ObtenerPresidenteRpt();
        }

        public List<EPresidente> ObtenerPresiAsomasAfiliados()
        {
            List<EPresidente> rptListaPresimasAsocimasAfili = new List<EPresidente>();

            try
            {
                // Obtener las listas de presidentes y afiliados
                var ListaPresidentes = DPresidente.getInstance().ObtenerPresidenteRpt();
                var ListaAfiliados = DAfiliado.getInstance().ObtenerAfiliadosZ();

                // Recorre cada presidente
                foreach (var presidente in ListaPresidentes)
                {
                    // Filtra los afiliados correspondientes a la misma asociación del presidente
                    var afiliadosEnAsociacion = ListaAfiliados.Where(afiliado => afiliado.Idasoci == presidente.Idasoci).ToList();

                    // Asigna los afiliados a la propiedad ListaAfiliados de la asociación
                    presidente.oAsociacion.ListaAfiliados = afiliadosEnAsociacion;

                    // Añade el presidente con su asociación y afiliados a la lista de resultados
                    rptListaPresimasAsocimasAfili.Add(new EPresidente()
                    {
                        IdPresident = presidente.IdPresident,
                        Idasoci = presidente.Idasoci,
                        NroCI = presidente.NroCI,
                        Nombres = presidente.Nombres,
                        Apellidos = presidente.Apellidos,
                        Foto = presidente.Foto,
                        Celular = presidente.Celular,
                        Activo = presidente.Activo,
                        oAsociacion = new EAsociacion()
                        {
                            Nombre = presidente.oAsociacion.Nombre,
                            Direccion = presidente.oAsociacion.Direccion,
                            Correo = presidente.oAsociacion.Correo,
                            ListaAfiliados = afiliadosEnAsociacion // Aquí se agrega la lista de afiliados
                        }
                    });
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al obtener la lista completa de presidentes con asociaciones y afiliados", ex);
            }

            return rptListaPresimasAsocimasAfili;
        }
    }
}
