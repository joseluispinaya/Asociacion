using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EAsociacion
    {
        public int Idasoci { get; set; }
        public string Nombre { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
        public string Correo { get; set; }
        public bool Activo { get; set; }
        public List<EAfiliado> ListaAfiliados { get; set; }
    }
}
