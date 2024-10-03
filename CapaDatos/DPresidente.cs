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
    public class DPresidente
    {
        #region "PATRON SINGLETON"
        public static DPresidente _instancia = null;

        private DPresidente()
        {

        }

        public static DPresidente getInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DPresidente();
            }
            return _instancia;
        }
        #endregion

        public bool RegistrarPresi(EPresidente oUsuario)
        {
            bool respuesta = false;

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarPresidente", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@Idasoci", oUsuario.Idasoci);
                        cmd.Parameters.AddWithValue("@NroCI", oUsuario.NroCI);
                        cmd.Parameters.AddWithValue("@Nombres", oUsuario.Nombres);
                        cmd.Parameters.AddWithValue("@Apellidos", oUsuario.Apellidos);
                        cmd.Parameters.AddWithValue("@Foto", oUsuario.Foto);
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

        public bool ActualizarPresi(EPresidente oUsuario)
        {
            bool respuesta = false;

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ModificarPresidente", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdPresident", oUsuario.IdPresident);
                        cmd.Parameters.AddWithValue("@Idasoci", oUsuario.Idasoci);
                        cmd.Parameters.AddWithValue("@NroCI", oUsuario.NroCI);
                        cmd.Parameters.AddWithValue("@Nombres", oUsuario.Nombres);
                        cmd.Parameters.AddWithValue("@Apellidos", oUsuario.Apellidos);
                        cmd.Parameters.AddWithValue("@Foto", oUsuario.Foto);
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
        public List<EPresidente> ObtenerPresidenteZ()
        {
            List<EPresidente> rptListaUsuario = new List<EPresidente>();

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerPresidentes", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptListaUsuario.Add(new EPresidente()
                                {
                                    IdPresident = Convert.ToInt32(dr["IdPresident"]),
                                    Idasoci = Convert.ToInt32(dr["Idasoci"]),
                                    NroCI = dr["NroCI"].ToString(),
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),
                                    Foto = dr["Foto"].ToString(),
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
                throw new Exception("Error al obtener los presidentes", ex);
            }

            return rptListaUsuario;
        }

        public List<EPresidente> ObtenerPresidenteRpt()
        {
            List<EPresidente> rptListaUsuario = new List<EPresidente>();

            try
            {
                using (SqlConnection con = ConexionBD.getInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerPresidentesRpt", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptListaUsuario.Add(new EPresidente()
                                {
                                    IdPresident = Convert.ToInt32(dr["IdPresident"]),
                                    Idasoci = Convert.ToInt32(dr["Idasoci"]),
                                    NroCI = dr["NroCI"].ToString(),
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),
                                    Foto = dr["Foto"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    oAsociacion = new EAsociacion()
                                    {
                                        Nombre = dr["NombreA"].ToString(),
                                        Direccion = dr["Direccion"].ToString(),
                                        Correo = dr["Correo"].ToString()
                                    },
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
                throw new Exception("Error al obtener los presidentes", ex);
            }

            return rptListaUsuario;
        }
    }
}
