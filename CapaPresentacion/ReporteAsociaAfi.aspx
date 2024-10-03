<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ReporteAsociaAfi.aspx.cs" Inherits="CapaPresentacion.ReporteAsociaAfi" %>

<!DOCTYPE html>

<html>
<head runat="server">
<meta charset="utf-8" />
    <title>Reporte COE</title>
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
        <div class="invoice-company">
            <img src="Imagenes/logorep.png" alt="Company Logo" class="company-logo" />
        </div>
        <%--<div class="invoice-header">
            <div class="invoice-from">
                <address class="mt-5px mb-5px">
                    <strong class="text-dark">Detalle Asociacion</strong><br />
                    Aqui nombre de asociacion<br />
                    Aqui la direccion<br />
                    Aqui su correo
                </address>
            </div>
            <div class="invoice-to">
                <address class="mt-5px mb-5px">
                    <strong class="text-dark">Presidente</strong><br />
                    Aqui nombre del presidente<br />
                    Aqui su apellido<br />
                    Aqui numero de celular
                </address>
            </div>
            <div class="invoice-date">
                <img id="imgUsuarioP" src="Imagenes/sinimagen.png" alt="Foto usuario" style="height: 90px; max-width: 90px; border-radius: 50%;">
            </div>
        </div>
        <div class="invoice-content">
            <div class="titulo-tabla">
                <p class="text-center fw-bold">
                    LISTA DE AFILIADOS
                </p>
            </div>
            <div class="table-responsive">
                <table id="tbReporteT" class="table table-invoice">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th class="text-center">Nro CI</th>
                            <th class="text-center">Celular</th>
                            <th>Direccion</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Jose luis</td>
                            <td>Pinaya balder</td>
                            <td class="text-center">7645323</td>
                            <td class="text-center">69394012</td>
                            <td>Barrio la chonta calle trece</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>--%>
    </div>

    <script src="assets/js/vendor.min.js"></script>
    <script src="js/ReporteAsociaAfi.js" type="text/javascript"></script>
</body>
</html>
