using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EPresidente
    {
        public int IdPresident { get; set; }
        public int Idasoci { get; set; }
        public string NroCI { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Foto { get; set; }
        public string Celular { get; set; }
        public bool Activo { get; set; }
        public EAsociacion oAsociacion { get; set; }

        public string ImageFull => string.IsNullOrEmpty(Foto)
            ? $"/Imagenes/sinimagen.png"
            : Foto;
    }
}
