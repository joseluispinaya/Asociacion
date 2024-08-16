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
    public class DAfiliado
    {
        #region "PATRON SINGLETON"
        public static DAfiliado _instancia = null;

        private DAfiliado()
        {

        }

        public static DAfiliado getInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DAfiliado();
            }
            return _instancia;
        }
        #endregion

        public bool RegistrarAfiliado(EAfiliado oUsuario)
        {
            bool respuesta = false;

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarAfiliado", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@Idasoci", oUsuario.Idasoci);
                        cmd.Parameters.AddWithValue("@NroCI", oUsuario.NroCI);
                        cmd.Parameters.AddWithValue("@Nombres", oUsuario.Nombres);
                        cmd.Parameters.AddWithValue("@Apellidos", oUsuario.Apellidos);
                        cmd.Parameters.AddWithValue("@Direccion", oUsuario.Direccion);
                        cmd.Parameters.AddWithValue("@Celular", oUsuario.Celular);

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

        public bool ActualizarAfiliado(EAfiliado oUsuario)
        {
            bool respuesta = false;

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ModificarAfiliado", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdAfiliado", oUsuario.IdAfiliado);
                        cmd.Parameters.AddWithValue("@Idasoci", oUsuario.Idasoci);
                        cmd.Parameters.AddWithValue("@NroCI", oUsuario.NroCI);
                        cmd.Parameters.AddWithValue("@Nombres", oUsuario.Nombres);
                        cmd.Parameters.AddWithValue("@Apellidos", oUsuario.Apellidos);
                        cmd.Parameters.AddWithValue("@Direccion", oUsuario.Direccion);
                        cmd.Parameters.AddWithValue("@Celular", oUsuario.Celular);
                        cmd.Parameters.AddWithValue("@Activo", oUsuario.Activo);

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

        public List<EAfiliado> ObtenerAfiliadosZ()
        {
            List<EAfiliado> rptListaUsuario = new List<EAfiliado>();

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerAfiliados", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptListaUsuario.Add(new EAfiliado()
                                {
                                    IdAfiliado = Convert.ToInt32(dr["IdAfiliado"]),
                                    Idasoci = Convert.ToInt32(dr["Idasoci"]),
                                    NroCI = dr["NroCI"].ToString(),
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    oAsociacion = new EAsociacion() { Nombre = dr["NombreA"].ToString() },
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
                throw new Exception("Error al obtener los afiliados", ex);
            }

            return rptListaUsuario;
        }

        public bool VerificarCI(string nrCI)
        {
            bool respuesta = false;

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_VerificarCI", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@NroCI", nrCI);

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
            catch (SqlException ex)
            {
                // Manejar errores específicos de SQL
                throw new Exception("Error en la base de datos al verificar. Intente más tarde.", ex);
            }
            catch (Exception ex)
            {
                throw new Exception("Error al verificar. Intente más tarde.", ex);
            }

            return respuesta;
        }

        public List<AfiliadoResponse> ObtenerAfiliadosIdAsoc(int idAso)
        {
            List<AfiliadoResponse> rptListaUsuario = new List<AfiliadoResponse>();

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerAfiliadosPorAsoc", con))
                    {
                        comando.Parameters.AddWithValue("@Idasoci", idAso);
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptListaUsuario.Add(new AfiliadoResponse()
                                {
                                    IdAfiliado = Convert.ToInt32(dr["IdAfiliado"]),
                                    Idasoci = Convert.ToInt32(dr["Idasoci"]),
                                    NroCI = dr["NroCI"].ToString(),
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    AsociacionNom = dr["NombreA"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Activo"])
                                });
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                //throw ex;
                throw new Exception("Error al obtener los afiliados", ex);
            }

            return rptListaUsuario;
        }
    }
}
