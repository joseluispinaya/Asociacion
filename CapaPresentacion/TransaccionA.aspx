<%@ Page Title="" Language="C#" MasterPageFile="~/Pagina.Master" AutoEventWireup="true" CodeBehind="TransaccionA.aspx.cs" Inherits="CapaPresentacion.TransaccionA" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/jquery-ui-1.12.1/jquery-ui.css" rel="stylesheet"/>
    <link href="assets/plugins/select2/select2.min.css" rel="stylesheet"/>
    <style>
        .buttons-excel {
            color: #fff !important;
            background-color: #2c4762 !important;
            border-color: #2c4762 !important;
        }
        .dt-buttons {
            float: left;
        }
        .select2 {
            width: 100% !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <h1 class="page-header">TRANSACCIONES <small>Modulo Transacciones...</small></h1>

    <div class="panel panel-inverse">
        <div class="panel-heading">
            <h4 class="panel-title">Panel Transacciones</h4>
            <div class="panel-heading-btn">
                <a href="javascript:;" class="btn btn-xs btn-icon btn-warning" data-toggle="panel-collapse"><i class="fa fa-minus"></i></a>
            </div>
        </div>
        <div class="panel-body">
            <input id="txtIdasocia" class="model" name="IdAsocia" value="0" type="hidden" />

            <div class="row mb-3">
                <div class="col-xl-3">
                    <div class="mb-3">
                        <label class="form-label" for="txtNombres">Asociacion</label>
                        <input class="form-control" type="text" id="txtNombres" disabled />
                    </div>
                </div>

                <div class="col-xl-3">
                    <div class="mb-3">
                        <label class="form-label" for="txtTelefono">Contacto</label>
                        <input class="form-control" type="text" id="txtTelefono" disabled />
                    </div>
                </div>

                <div class="col-xl-3">
                    <div class="mb-3">
                        <label class="form-label" for="cboAsoci">Seleccione</label>
                        <select class="form-control" id="cboAsoci">
                            <option value=""></option>
                        </select>
                    </div>
                </div>

                <div class="col-xl-3">
                    <div class="mb-3">
                        <br />
                        <button id="btnNuevoReg" type="button" class="btn btn-lime"><i class="fas fa-pencil me-2"></i>Nuevo Registro</button>
                    </div>
                </div>
            </div>


            <div class="row">
                <div class="col-xl-12">
                    <table id="tbTransacciones" class="table table-striped table-bordered align-middle text-nowrap" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Asociacion</th>
                                <th>Transaccion</th>
                                <th>Fecha</th>
                                <th>Monto</th>
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

    <div class="modal fade" id="modalTransa" tabindex="-1" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="modalLabelA">Detalle Transaccion</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                </div>
                <div class="modal-body">
                    <input id="txtIdTransa" class="model" name="IdTransac" value="0" type="hidden" />
                    <div class="row">
                        <div class="col-xl-4">
                            <div class="mb-3">
                                <label class="form-label" for="cboTipoTra">Tipo Transaccion</label>
                                <select class="form-select" id="cboTipoTra">
                                </select>
                            </div>

                        </div>

                        <div class="col-xl-4">
                            <div class="mb-3">
                                <label class="form-label" for="txtMonto">Monto</label>
                                <input class="form-control model" type="text" id="txtMonto" name="Monto" />
                            </div>
                        </div>
                        <div class="col-xl-4">

                            <div class="mb-3">
                                <label class="form-label" for="txtFechap">Fecha Pago</label>
                                <input class="form-control model" type="text" id="txtFechap" name="Fecha Pago" />
                            </div>

                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="txtDescripcion">Descripcion</label>
                        <textarea class="form-control" rows="3" id="txtDescripcion" placeholder="Igresar algun comentario o detalle"></textarea>
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
    <script src="assets/jquery-ui-1.12.1/jquery-ui.js"></script>
    <script src="assets/plugins/select2/select2.min.js"></script>
    <script src="assets/plugins/select2/es.min.js"></script>
    <script src="assets/plugins/sweetalert/sweetalert.min.js"></script>
    <script src="js/TransaccionA.js" type="text/javascript"></script>
</asp:Content>
