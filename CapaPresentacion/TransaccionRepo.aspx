<%@ Page Title="" Language="C#" MasterPageFile="~/Pagina.Master" AutoEventWireup="true" CodeBehind="TransaccionRepo.aspx.cs" Inherits="CapaPresentacion.TransaccionRepo" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/jquery-ui-1.12.1/jquery-ui.css" rel="stylesheet"/>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    

    <div class="panel panel-inverse">
        <div class="panel-heading">
            <h4 class="panel-title">Panel Reporte</h4>
            <div class="panel-heading-btn">
                <a href="javascript:;" class="btn btn-xs btn-icon btn-warning" data-toggle="panel-collapse"><i class="fa fa-minus"></i></a>
            </div>
        </div>
        <div class="panel-body">
            <input id="txtIdasocia" class="model" name="IdAsocia" value="0" type="hidden" />

            <div class="row">
                <div class="col-xl-3">
                    <div class="mb-3">
                        <label class="form-label" for="cboBuscarPor">Buscar por:</label>
                        <select class="form-select" id="cboBuscarPor">
                            <option value="fecha">Fechas</option>
                            <option value="asociacion">Asociacion</option>
                        </select>
                    </div>
                </div>

                <div class="col-xl-3 busqueda-fecha">
                    <div class="mb-3">
                        <label class="form-label" for="txtFechaInicio">Fecha Inicio</label>
                        <input class="form-control" type="text" id="txtFechaInicio" />
                    </div>
                </div>

                <div class="col-xl-3 busqueda-fecha">
                    <div class="mb-3">
                        <label class="form-label" for="txtFechaFin">Fecha Fin</label>
                        <input class="form-control" type="text" id="txtFechaFin" />
                    </div>
                </div>

                <div class="col-xl-3 busqueda-asocia">
                    <div class="mb-3">
                        <label class="form-label" for="cboAsoci">Seleccione</label>
                        <select class="form-select" id="cboAsoci">
                        </select>
                    </div>
                </div>

                <div class="col-xl-3">
                    <div class="mb-3">
                        <br />
                        <button id="btnBuscar" type="button" class="btn btn-lime"><i class="fas fa-search me-2"></i>Buscar</button>
                        <button type="button" id="btnImprimiM" class="btn btn-primary" style="margin-left: 20px;">
                            <i class="fa fa-print t-plus-1 fa-fw fa-lg"></i>Imprimir
                        </button>
                    </div>
                </div>
            </div>

            <hr />

            <div class="row">
                <div class="col-xl-8">
                    <table id="tbReporteT" class="table table-striped table-bordered align-middle text-nowrap" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Fecha Tra</th>
                                <th>Asociacion</th>
                                <th>Transaccion</th>
                                <th>Monto</th>
                                <%--<th></th>--%>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>

                <div class="col-xl-4">
                    <p>Total Agrupados</p>
                    <div class="row">
                        <div class="col-xl-12">
                            <table id="tbTotales" class="table table-striped table-bordered align-middle text-nowrap" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>Fechas</th>
                                        <th>Total Transaccion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-4">
                            <p>Total Agrupados</p>
                        </div>
                        <div class="col-xl-8">
                            <div class="text-right">
                                <label class="form-label" for="drttt" id="lbltott">Seleccione</label>
                                <%--<input id="txttotg" readonly="readonly" type="text" class="form-control" value="0" />--%>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="assets/jquery-ui-1.12.1/jquery-ui.js"></script>
    <script src="assets/plugins/sweetalert/sweetalert.min.js"></script>
    <script src="js/TransaccionRepo.js" type="text/javascript"></script>
</asp:Content>
