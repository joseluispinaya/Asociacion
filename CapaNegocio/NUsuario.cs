﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NUsuario
    {
        #region "PATRON SINGLETON"
        private static NUsuario daoEmpleado = null;
        private NUsuario() { }
        public static NUsuario getInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NUsuario();
            }
            return daoEmpleado;
        }
        #endregion

        public bool RegistrarUsuario(EUsuario oUsuario)
        {
            return DUsuario.getInstance().RegistrarUsuario(oUsuario);
        }
        public bool ActualizarUsuario(EUsuario oUsuario)
        {
            return DUsuario.getInstance().ActualizarUsuario(oUsuario);
        }
        public List<EUsuario> ObtenerUsuarios()
        {
            return DUsuario.getInstance().ObtenerUsuariosZ();
        }

        public ResponseUsuario LoginUsuarioApp(string Usuario, string Clave)
        {
            return DUsuario.getInstance().LoginUsuarioApp(Usuario, Clave);
        }

        public EUsuario LoginUsuarioWeb(string Usuario, string Clave)
        {
            return DUsuario.getInstance().LoginUsuarioWeb(Usuario, Clave);
        }
        public bool ActualizarToken(int IdUsu, string token)
        {
            return DUsuario.getInstance().ActualizarToken(IdUsu, token);
        }
        public string ObtenerToken(int IdUsu)
        {
            return DUsuario.getInstance().ObtenerToken(IdUsu);
        }
    }
}
