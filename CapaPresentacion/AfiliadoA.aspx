<%@ Page Title="" Language="C#" MasterPageFile="~/Pagina.Master" AutoEventWireup="true" CodeBehind="AfiliadoA.aspx.cs" Inherits="CapaPresentacion.AfiliadoA" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/jquery-ui-1.12.1/jquery-ui.css" rel="stylesheet"/>
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
    <h1 class="page-header">AFILIADOS <small>Modulo para Afiliados...</small></h1>

    <div class="panel panel-inverse">
        <div class="panel-heading">
            <h4 class="panel-title">Panel Afiliacion</h4>
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
                    <table id="tbAfiliado" class="table table-striped table-bordered align-middle text-nowrap" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>Id</th>
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


    <div class="modal fade" id="modalAfil" tabindex="-1" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="modalLabelA">Detalle Afiliado</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                </div>
                <div class="modal-body">
                    <input id="txtIdAfiliado" class="model" name="IdAfiliado" value="0" type="hidden" />
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

                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="txtDireccion">Direccion</label>
                        <input class="form-control model" type="text" id="txtDireccion" placeholder="Direccion"
                            name="Direccion" />
                    </div>

                    <div class="row">
                        <div class="col-xl-6">

                            <div class="mb-3">
                                <label class="form-label" for="cboAsoci">Asociacion</label>
                                <select class="form-select" id="cboAsoci">
                                </select>
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

    <div class="modal fade" id="modalpdf" tabindex="-1" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content" id="loaddddd">
                <div class="modal-header">
                    <h4 class="modal-title" id="modalLaA">Detalle</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                </div>
                <div class="modal-body">
                    <input id="txtIdAfiliadoPdf" class="model" name="IdAfi" value="0" type="hidden" />
                    <div class="mb-2 text-center">
                        <p class="mb-0">Debe seleccionar una Archivo PDF</p>
                    </div>

                    <div class="mb-3">
                        <input class="form-control" type="file" id="txtpdf" accept=".pdf" />
                    </div>

                    <div class="mb-3 text-center">
                        <iframe id="verPdf" style="width: 100%; height: 300px; border: none;"></iframe>
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="javascript:;" class="btn btn-white" data-bs-dismiss="modal">Cancelar</a>
                    <button id="btnGuardarCambiosPdf" type="button" class="btn btn-success">Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="assets/jquery-ui-1.12.1/jquery-ui.js"></script>
    <script src="assets/plugins/sweetalert/sweetalert.min.js"></script>
    <script src="js/AfiliadoA.js" type="text/javascript"></script>
</asp:Content>
