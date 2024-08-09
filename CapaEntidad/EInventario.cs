using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Globalization;

namespace CapaEntidad
{
    public class EInventario
    {
        public int IdInvent { get; set; }
        public int Idasoci { get; set; }
        public string Descripcion { get; set; }
        public int Cantidad { get; set; }
        public float Motototal { get; set; }
        public bool Activo { get; set; }
        public DateTime FechaRegistro { get; set; }
        public EAsociacion oAsociacion { get; set; }
        public string TotalCadena => $"Bs/ {Motototal:F2}";
        public string TotalCadenaUn => $"Bs/ {Motototal.ToString("F2", CultureInfo.InvariantCulture)}";
    }
}
