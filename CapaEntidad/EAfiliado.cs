using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EAfiliado
    {
        public int IdAfiliado { get; set; }
        public int Idasoci { get; set; }
        public string NroCI { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Direccion { get; set; }
        public string Celular { get; set; }
        public bool Activo { get; set; }
        public EAsociacion oAsociacion { get; set; }
        //nuevo campo para pdf
        public string Docpdf { get; set; }
        public bool OpcionPdf => !string.IsNullOrEmpty(Docpdf);
        public string DocMostrar => string.IsNullOrEmpty(Docpdf)
            ? $"/archivopdf/SinPdfAfi.pdf"
            : Docpdf;

        //public bool OpcionPdf => string.IsNullOrEmpty(Docpdf)
        //    ? false
        //    : true;
    }
}
