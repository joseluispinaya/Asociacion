<%@ Page Title="" Language="C#" MasterPageFile="~/Pagina.Master" AutoEventWireup="true" CodeBehind="AsociacionA.aspx.cs" Inherits="CapaPresentacion.AsociacionA" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .buttons-excel {
            color: #fff !important;
            background-color: #2c4762 !important;
            border-color: #2c4762 !important;
        }
        .dt-buttons {
            float: left;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <h1 class="page-header">ASOCIACIONES <small>Modulo Administrativo...</small></h1>

    <div class="panel panel-inverse">
        <div class="panel-heading">
            <h4 class="panel-title">Panel Asociaciones</h4>
            <div class="panel-heading-btn">
                <a href="javascript:;" class="btn btn-xs btn-icon btn-warning" data-toggle="panel-collapse"><i class="fa fa-minus"></i></a>
            </div>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-xl-12 text-center">
                    <button id="btnNuevoReg" type="button" class="btn btn-lime"><i class="fas fa-pencil me-2"></i> Nuevo Registro</button>
                </div>
            </div>

            <div class="row">
                <div class="col-xl-12">
                    <table id="tbAsociaciones" class="table table-striped table-bordered align-middle text-nowrap" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombres</th>
                                <th>Direccion</th>
                                <th>Contacto</th>
                                <th>Correo</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
    </div>

    <div class="modal fade" id="modalAso" tabindex="-1" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="modalLabelA">Detalle Asociacion</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                </div>
                <div class="modal-body">
                    <input id="txtIdAsos" class="model" name="IdAsociacion" value="0" type="hidden" />
                    <div class="mb-3">
                        <label class="form-label" for="txtNombre">Nombre</label>
                        <input class="form-control model" type="text" id="txtNombre" placeholder="Nombre"
                            name="Nombre" />
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="txtDireccion">Direccion</label>
                        <input class="form-control model" type="text" id="txtDireccion" placeholder="Direccion"
                            name="Direccion" />
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="txtCorreo">Correo</label>
                        <input class="form-control model" type="text" id="txtCorreo" placeholder="Correo"
                            name="Correo" />
                    </div>

                    <div class="row">
                        <div class="col-xl-6">
                            <div class="mb-3">
                                <label class="form-label" for="txtNrocel">Contacto</label>
                                <input class="form-control model" type="text" id="txtNrocel" placeholder="Nro Contacto"
                                    name="Nro Contacto" />
                            </div>
                        </div>
                        <div class="col-xl-6">
                            <div class="mb-3">
                                <label class="form-label" for="cboEstado">Estado</label>
                                <select class="form-select" id="cboEstado">
                                    <option value="1">Activo</option>
                                    <option value="0">No Activo</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="javascript:;" class="btn btn-white" data-bs-dismiss="modal">Cancelar</a>
                    <button id="btnGuardarCambios" type="button" class="btn btn-success">Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="assets/plugins/sweetalert/sweetalert.min.js"></script>
    <script src="js/AsociacionA.js" type="text/javascript"></script>
</asp:Content>
