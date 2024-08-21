<%@ Page Title="" Language="C#" MasterPageFile="~/Pagina.Master" AutoEventWireup="true" CodeBehind="PresidenteA.aspx.cs" Inherits="CapaPresentacion.PresidenteA" %>
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
    <h1 class="page-header">PRESIDENTE <small>Modulo Ejecutivo...</small></h1>

    <div class="panel panel-inverse">
        <div class="panel-heading">
            <h4 class="panel-title">Panel Presidente</h4>
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
                    <table id="tbPresidente" class="table table-striped table-bordered align-middle text-nowrap" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Imagen</th>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Celular</th>
                                <th>Asociacion</th>
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

    <div class="modal fade" id="modalPres" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="modalLabelA">Detalle Presidente</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                </div>
                <div class="modal-body">
                    <input id="txtIdPresident" class="model" name="IdPresident" value="0" type="hidden" />
                    <div class="row">
                        <div class="col-xl-6">
                            <div class="row">
                                <div class="col-xl-6">
                                    <div class="mb-3">
                                        <label class="form-label" for="txtNombre">Nombre</label>
                                        <input class="form-control model" type="text" id="txtNombre" placeholder="Nombres" name="Nombres" />
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label" for="txtNroci">Nro CI</label>
                                        <input class="form-control model" type="text" id="txtNroci" placeholder="Nro CI" name="Nro CI" />
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label" for="cboAsoci">Asociacion</label>
                                        <select class="form-select" id="cboAsoci">
                                        </select>
                                    </div>

                                </div>
                                <div class="col-xl-6">
                                    <div class="mb-3">
                                        <label class="form-label" for="txtApellidos">Apellidos</label>
                                        <input class="form-control model" type="text" id="txtApellidos" placeholder="Apellidos" name="Apellidos" />
                                    </div>

                                    <div class="mb-3">
                                        <label class="form-label" for="txtCelular">Celular</label>
                                        <input class="form-control model" type="text" id="txtCelular" placeholder="Celular" name="Celular" />
                                    </div>

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
                        <div class="col-xl-6">
                            <div class="mb-2">
                                <p class="mb-0">Debe seleccionar una foto</p>
                            </div>

                            <div class="mb-3">
                                <input class="form-control" type="file" accept="image/*" id="txtFotoP" />
                            </div>

                            <div class="mb-3 text-center">
                                <img id="imgUsuarioP" src="Imagenes/sinimagen.png" alt="Foto usuario" style="height: 130px; max-width: 130px; border-radius: 50%;">
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
    <script src="js/PresidenteA.js" type="text/javascript"></script>
</asp:Content>
