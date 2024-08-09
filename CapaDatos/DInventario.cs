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
    public class DInventario
    {
        #region "PATRON SINGLETON"
        public static DInventario _instancia = null;

        private DInventario()
        {

        }

        public static DInventario getInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DInventario();
            }
            return _instancia;
        }
        #endregion

        public bool RegistrarInventario(EInventario oUsuario)
        {
            bool respuesta = false;

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarInventario", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@Idasoci", oUsuario.Idasoci);
                        cmd.Parameters.AddWithValue("@Descripcion", oUsuario.Descripcion);
                        cmd.Parameters.AddWithValue("@Cantidad", oUsuario.Cantidad);
                        cmd.Parameters.AddWithValue("@Motototal", oUsuario.Motototal);

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

        public bool ActualizarInventario(EInventario oUsuario)
        {
            bool respuesta = false;

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ModificarInventario", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdInvent", oUsuario.IdInvent);
                        cmd.Parameters.AddWithValue("@Idasoci", oUsuario.Idasoci);
                        cmd.Parameters.AddWithValue("@Descripcion", oUsuario.Descripcion);
                        cmd.Parameters.AddWithValue("@Cantidad", oUsuario.Cantidad);
                        cmd.Parameters.AddWithValue("@Motototal", oUsuario.Motototal);

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


        public List<EInventario> ObtenerInventario()
        {
            List<EInventario> rptListaUsuario = new List<EInventario>();

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerInventario", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptListaUsuario.Add(new EInventario()
                                {
                                    IdInvent = Convert.ToInt32(dr["IdInvent"]),
                                    Idasoci = Convert.ToInt32(dr["Idasoci"]),
                                    Descripcion = dr["Descripcion"].ToString(),
                                    Cantidad = Convert.ToInt32(dr["Cantidad"]),
                                    Motototal = float.Parse(dr["Motototal"].ToString()),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    oAsociacion = new EAsociacion() { Nombre = dr["Nombre"].ToString() },
                                });
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                //throw ex;
                throw new Exception("Error al obtener los inventarios", ex);
            }

            return rptListaUsuario;
        }

        public List<EInventario> ObtenerInventarioId(int idAso)
        {
            List<EInventario> rptListaUsuario = new List<EInventario>();

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerInventarioId", con))
                    {
                        comando.Parameters.AddWithValue("@Idasoci", idAso);
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptListaUsuario.Add(new EInventario()
                                {
                                    IdInvent = Convert.ToInt32(dr["IdInvent"]),
                                    Idasoci = Convert.ToInt32(dr["Idasoci"]),
                                    Descripcion = dr["Descripcion"].ToString(),
                                    Cantidad = Convert.ToInt32(dr["Cantidad"]),
                                    Motototal = float.Parse(dr["Motototal"].ToString()),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    oAsociacion = new EAsociacion() { Nombre = dr["Nombre"].ToString() },
                                });
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                //throw ex;
                throw new Exception("Error al obtener las inventarios", ex);
            }

            return rptListaUsuario;
        }
    }
}
