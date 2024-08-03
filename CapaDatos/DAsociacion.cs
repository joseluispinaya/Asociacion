using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using CapaEntidad;

namespace CapaDatos
{
    public class DAsociacion
    {
        #region "PATRON SINGLETON"
        public static DAsociacion _instancia = null;

        private DAsociacion()
        {

        }

        public static DAsociacion getInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DAsociacion();
            }
            return _instancia;
        }
        #endregion

        public bool RegistrarAsociacion(EAsociacion asocia)
        {
            bool respuesta = false;

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarAsociacion", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@Nombre", asocia.Nombre);
                        cmd.Parameters.AddWithValue("@Direccion", asocia.Direccion);
                        cmd.Parameters.AddWithValue("@Telefono", asocia.Telefono);
                        cmd.Parameters.AddWithValue("@Correo", asocia.Correo);

                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Bit)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        respuesta = Convert.ToBoolean(outputParam.Value);
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al registrar. Intente más tarde.", ex);
            }

            return respuesta;
        }

        public bool ActualizarAsociacion(EAsociacion asocia)
        {
            bool respuesta = false;

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ModificarAsociacion", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@Idasoci", asocia.Idasoci);
                        cmd.Parameters.AddWithValue("@Nombre", asocia.Nombre);
                        cmd.Parameters.AddWithValue("@Direccion", asocia.Direccion);
                        cmd.Parameters.AddWithValue("@Telefono", asocia.Telefono);
                        cmd.Parameters.AddWithValue("@Correo", asocia.Correo);
                        cmd.Parameters.AddWithValue("@Activo", asocia.Activo);

                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Bit)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        respuesta = Convert.ToBoolean(outputParam.Value);
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error al actualizar. Intente más tarde.", ex);
            }

            return respuesta;
        }

        public List<EAsociacion> ObtenerAsociacion()
        {
            List<EAsociacion> rptListaRol = new List<EAsociacion>();

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerAsociaciones", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptListaRol.Add(new EAsociacion()
                                {
                                    Idasoci = Convert.ToInt32(dr["Idasoci"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    Telefono = dr["Telefono"].ToString(),
                                    Correo = dr["Correo"].ToString(),
                                    Activo = Convert.ToBoolean(dr["Activo"])
                                });
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                //throw ex;
                throw new Exception("Error al obtener las asociaciones", ex);
            }

            return rptListaRol;
        }
    }
}
