using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace CapaDatos
{
    public class ConexionBD
    {
        #region "PATRON SINGLETON"
        public static ConexionBD conexion = null;

        public ConexionBD() { }

        public static ConexionBD getInstance()
        {
            if (conexion == null)
            {
                conexion = new ConexionBD();
            }
            return conexion;
        }
        #endregion

        public SqlConnection ConexionDB()
        {
            SqlConnection conexion = new SqlConnection();
            //conexion.ConnectionString = "Data Source=.;Initial Catalog=AsociacionL;Integrated Security=True";
            //conexion.ConnectionString = "Data Source=AQUI TU CONEXION A SQL;Initial Catalog=AsociacionL;Integrated Security=True";
            conexion.ConnectionString = @"Data Source=SQL8004.site4now.net;Initial Catalog=db_aabed1_asociacion;User Id=db_aabed1_asociacion_admin;Password=Elzero2023@";

            return conexion;
        }
    }
}
