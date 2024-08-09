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
    public class DTransaccion
    {
        #region "PATRON SINGLETON"
        public static DTransaccion _instancia = null;

        private DTransaccion()
        {

        }

        public static DTransaccion getInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DTransaccion();
            }
            return _instancia;
        }
        #endregion

        public bool RegistrarTransaccion(ETransaccion oUsuario)
        {
            bool respuesta = false;

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarTransaccion", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@Idasoci", oUsuario.Idasoci);
                        cmd.Parameters.AddWithValue("@Itipotra", oUsuario.Itipotra);
                        cmd.Parameters.AddWithValue("@Descripcion", oUsuario.Descripcion);
                        cmd.Parameters.AddWithValue("@Total", oUsuario.Total);
                        cmd.Parameters.AddWithValue("@FechaTransaccion", oUsuario.FechaTransaccion);

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

        public bool ActualizarTransaccion(ETransaccion oUsuario)
        {
            bool respuesta = false;

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ModificarTransaccion", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdTransa", oUsuario.IdTransa);
                        cmd.Parameters.AddWithValue("@Idasoci", oUsuario.Idasoci);
                        cmd.Parameters.AddWithValue("@Itipotra", oUsuario.Itipotra);
                        cmd.Parameters.AddWithValue("@Descripcion", oUsuario.Descripcion);
                        cmd.Parameters.AddWithValue("@Total", oUsuario.Total);
                        cmd.Parameters.AddWithValue("@FechaTransaccion", oUsuario.FechaTransaccion);

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

        public List<ETransaccion> ObtenerTransacciones()
        {
            List<ETransaccion> rptListaUsuario = new List<ETransaccion>();

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerTransaccion", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptListaUsuario.Add(new ETransaccion()
                                {
                                    IdTransa = Convert.ToInt32(dr["IdTransa"]),
                                    Idasoci = Convert.ToInt32(dr["Idasoci"]),
                                    Itipotra = Convert.ToInt32(dr["Itipotra"]),
                                    Descripcion = dr["Descripcion"].ToString(),
                                    Total = float.Parse(dr["Total"].ToString()),
                                    FechaTransaccion = Convert.ToDateTime(dr["FechaTransaccion"]),
                                    FechaTransacadena = Convert.ToDateTime(dr["FechaTransaccion"].ToString()).ToString("dd/MM/yyyy"),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    oAsociacion = new EAsociacion() { Nombre = dr["Nombre"].ToString() },
                                    oTipoTransaccion = new ETipoTransaccion() { Tipo = dr["Tipo"].ToString() }
                                });
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                //throw ex;
                throw new Exception("Error al obtener las transacciones", ex);
            }

            return rptListaUsuario;
        }

        public List<ETransaccion> ObtenerTransaccionesId(int idAso)
        {
            List<ETransaccion> rptListaUsuario = new List<ETransaccion>();

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerTransaccionId", con))
                    {
                        comando.Parameters.AddWithValue("@Idasoci", idAso);
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptListaUsuario.Add(new ETransaccion()
                                {
                                    IdTransa = Convert.ToInt32(dr["IdTransa"]),
                                    Idasoci = Convert.ToInt32(dr["Idasoci"]),
                                    Itipotra = Convert.ToInt32(dr["Itipotra"]),
                                    Descripcion = dr["Descripcion"].ToString(),
                                    Total = float.Parse(dr["Total"].ToString()),
                                    FechaTransaccion = Convert.ToDateTime(dr["FechaTransaccion"]),
                                    FechaTransacadena = Convert.ToDateTime(dr["FechaTransaccion"].ToString()).ToString("dd/MM/yyyy"),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    oAsociacion = new EAsociacion() { Nombre = dr["Nombre"].ToString() },
                                    oTipoTransaccion = new ETipoTransaccion() { Tipo = dr["Tipo"].ToString() }
                                });
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                //throw ex;
                throw new Exception("Error al obtener las transacciones", ex);
            }

            return rptListaUsuario;
        }
    }
}
