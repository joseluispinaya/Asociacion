using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Globalization;

namespace CapaEntidad
{
    public class ETransaccion
    {
        public int IdTransa { get; set; }
        public int Idasoci { get; set; }
        public int Itipotra { get; set; }
        public string Descripcion { get; set; }
        public float Total { get; set; }
        public DateTime FechaTransaccion { get; set; }
        public string FechaTransacadena { get; set; }
        public bool Activo { get; set; }
        public DateTime FechaRegistro { get; set; }
        public EAsociacion oAsociacion { get; set; }
        public ETipoTransaccion oTipoTransaccion { get; set; }

        public string TotalCadena => $"Bs/ {Total:F2}";
        public string TotalCadenaUn => $"Bs/ {Total.ToString("F2", CultureInfo.InvariantCulture)}";
        //public string FechaTransacadena => FechaTransaccion.ToString("dd/MM/yyyy");
    }
}
