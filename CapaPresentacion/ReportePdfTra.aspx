<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ReportePdfTra.aspx.cs" Inherits="CapaPresentacion.ReportePdfTra" %>

<!DOCTYPE html>

<html>
<head runat="server">
<meta charset="utf-8" />
    <title>Sistema COE</title>
	<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />

    <link href="assets/css/reporte.css" rel="stylesheet" type="text/css" />
</head>
<body>

    <div style="font-size: 11px; text-align: right;">
        <div style="text-align: center;">
            <button type="button" id="Imprimir" onclick="javascript:imprSelec('seleccion')" style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
                IMPRIMIR
            </button>
        </div>
        <br />
    </div>

    <div class="invoice" id="seleccion">
        <!-- BEGIN invoice-company -->
        <div class="invoice-company">
            <img src="Imagenes/logorep.png" alt="Company Logo" class="company-logo" />
        </div>
        <!-- END invoice-company -->
        <!-- BEGIN invoice-header -->
        <div class="invoice-header">
            <div class="invoice-from">
                <small>De:</small>
                <address class="mt-5px mb-5px">
                    <strong class="text-dark">Unidad Municipal.</strong><br />
                    Barrio Integracion<br />
                    Contacto: (591) 73999726<br />
                    Correo: G.A.M.R@GMAIL.COM
                </address>
            </div>
            <div class="invoice-to">
                <small>A:</small>
                <address class="mt-5px mb-5px">
                    <strong class="text-dark">Solicitante</strong><br />
                    otros datos<br />
                    otros datos Code<br />
                    Cel: 78451254
                </address>
            </div>
            <div class="invoice-date">
                <small>Detalle de Reporte</small>
                <div class="date text-dark mt-5px">19/08/2024</div>
                <div class="invoice-detail">
                    #0000123DSS<br />
                    -----------
                </div>
            </div>
        </div>
        <div class="invoice-content">
            <div class="row">
                <div class="col-sm-8">
                    <div class="titulo-tabla">
                        <p class="text-center fw-bold">
                            INFORMACION TRANSACCION
                        </p>
                    </div>

                    <div class="table-responsive">
                        <table id="tbReporteT" class="table table-invoice">
                            <thead>
                                <tr>
                                    <th>Fecha Tra</th>
                                    <th class="text-center">Asociacion</th>
                                    <th class="text-center">Transaccion</th>
                                    <th class="text-end">Monto</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="titulo-tabla">
                        <p class="text-center fw-bold">
                            TOTALES AGRUPADOS
                        </p>
                    </div>

                    <div class="table-responsive">
                        <table id="tbTotales" class="table table-invoice">
                            <thead>
                                <tr>
                                    <th>Motivo</th>
                                    <th class="text-end">Totales</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>

                    <div class="invoice-price">
                        <div class="invoice-price-left">
                            <div class="invoice-price-row">
                                <div class="sub-price">
                                    <small></small>
                                </div>
                            </div>
                        </div>
                        <div class="invoice-price-right">
                            <span id="totalacu" class="fw-bold"></span>
                        </div>
                    </div>

                </div>
            </div>

        </div>
        <div class="invoice-footer">
            <p class="text-center mb-5px fw-bold">
                TRABAJANDO POR EL DESARROLLO
            </p>
            <p class="text-center">
                <span class="me-10px"><i class="fa fa-fw fa-lg fa-globe"></i>GAMR.com</span>
                <span class="me-10px"><i class="fa fa-fw fa-lg fa-phone-volume"></i>T:73999726</span>
                <span class="me-10px"><i class="fa fa-fw fa-lg fa-envelope"></i>GAMR@gmail.com</span>
            </p>
        </div>
    </div>

    <script src="assets/js/vendor.min.js"></script>
    <script src="js/ReportePdfTra.js" type="text/javascript"></script>
</body>
</html>
