

$(document).ready(function () {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const IdAso = urlParams.get('id')

    if (IdAso !== null) {
        cargarAsociacioneConAfi(IdAso);
    } else {
        cargarAsociacioneGeneral();
    }
    //cargarAsociacioneGeneral();
})

function cargarAsociacioneGeneral() {
    $.ajax({
        type: "POST",
        url: "ReporteAs.aspx/ObtenerPresiRpt",
        data: JSON.stringify({}), // Asegúrate de que no falte la conversión a JSON si envías datos
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.estado) {
                var asociaciones = data.d.objeto;

                var container = $('.invoice');
                // Limpiar el contenedor antes de agregar los datos, excepto la imagen de invoice-company
                container.find('.invoice-company').nextAll().remove();

                // Recorremos las asociaciones
                asociaciones.forEach(function (asociacion) {
                    var presidente = asociacion;
                    var listaAfiliados = presidente.oAsociacion.ListaAfiliados;

                    // Generar el HTML de la cabecera (presidente y asociación)
                    var html = `
                        <div class="invoice-header">
                            <div class="invoice-from">
                                <address class="mt-5px mb-5px">
                                    <strong class="text-dark">Detalle Asociación</strong><br />
                                    ${presidente.oAsociacion.Nombre}<br />
                                    ${presidente.oAsociacion.Direccion}<br />
                                    ${presidente.oAsociacion.Correo}
                                </address>
                            </div>
                            <div class="invoice-to">
                                <address class="mt-5px mb-5px">
                                    <strong class="text-dark">Presidente</strong><br />
                                    ${presidente.Nombres}<br />
                                    ${presidente.Apellidos}<br />
                                    ${presidente.Celular}
                                </address>
                            </div>
                            <div class="invoice-date">
                                <img id="imgUsuarioP" src="${presidente.ImageFull}" alt="Foto presidente" style="height: 90px; max-width: 90px; border-radius: 50%;">
                            </div>
                        </div>
                    `;

                    // Generar el HTML de la lista de afiliados o el mensaje de que no hay afiliados
                    if (listaAfiliados && listaAfiliados.length > 0) {
                        // Si tiene afiliados, generar la tabla
                        html += `
                            <div class="titulo-tabla">
                                <p class="text-center fw-bold">LISTA DE AFILIADOS</p>
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
                                    <tbody>`;

                        listaAfiliados.forEach(function (afiliado) {
                            html += `
                                <tr>
                                    <td>${afiliado.Nombres}</td>
                                    <td>${afiliado.Apellidos}</td>
                                    <td class="text-center">${afiliado.NroCI}</td>
                                    <td class="text-center">${afiliado.Celular}</td>
                                    <td>${afiliado.Direccion}</td>
                                </tr>`;
                        });

                        html += `
                                    </tbody>
                                </table>
                            </div>
                        `;
                    } else {
                        // Si no tiene afiliados, mostrar un mensaje
                        html += `
                            <div class="titulo-tabla">
                                <p class="text-center fw-bold">NO TIENE LISTA DE AFILIADOS</p>
                            </div>
                        `;
                    }

                    // Insertar el HTML generado en el contenedor
                    container.append(html);
                });
            }
        }
    });
}

//function cargarAsociacioneGeneral() {

//    $.ajax({
//        type: "POST",
//        url: "ReporteAs.aspx/ObtenerPresiRpt",
//        data: {},
//        dataType: "json",
//        contentType: 'application/json; charset=utf-8',
//        error: function (xhr, ajaxOptions, thrownError) {
//            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
//        },
//        success: function (data) {
//            if (data.d.estado) {
//                var asociaciones = data.d.objeto;
//                console.log("llega: ", asociaciones);
//                var container = $('.invoice');
//                container.find('.invoice-company').nextAll().remove();
//            }

//        }
//    });
//}

function cargarAsociacioneConAfi($IdAsocia) {
    var request = {
        IdAso: $IdAsocia
    };

    $.ajax({
        type: "POST",
        url: "ReporteAs.aspx/ObtenerAsociacionId",
        data: JSON.stringify(request), // Asegúrate de que no falte la conversión a JSON si envías datos
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.estado) {
                var asociaciones = data.d.objeto;

                var container = $('.invoice');
                // Limpiar el contenedor antes de agregar los datos, excepto la imagen de invoice-company
                container.find('.invoice-company').nextAll().remove();

                // Recorremos las asociaciones
                asociaciones.forEach(function (asociacion) {
                    var presidente = asociacion;
                    var listaAfiliados = presidente.oAsociacion.ListaAfiliados;

                    // Generar el HTML de la cabecera (presidente y asociación)
                    var html = `
                        <div class="invoice-header">
                            <div class="invoice-from">
                                <address class="mt-5px mb-5px">
                                    <strong class="text-dark">Detalle Asociación</strong><br />
                                    ${presidente.oAsociacion.Nombre}<br />
                                    ${presidente.oAsociacion.Direccion}<br />
                                    ${presidente.oAsociacion.Correo}
                                </address>
                            </div>
                            <div class="invoice-to">
                                <address class="mt-5px mb-5px">
                                    <strong class="text-dark">Presidente</strong><br />
                                    ${presidente.Nombres}<br />
                                    ${presidente.Apellidos}<br />
                                    ${presidente.Celular}
                                </address>
                            </div>
                            <div class="invoice-date">
                                <img id="imgUsuarioP" src="${presidente.ImageFull}" alt="Foto presidente" style="height: 90px; max-width: 90px; border-radius: 50%;">
                            </div>
                        </div>
                    `;

                    // Generar el HTML de la lista de afiliados o el mensaje de que no hay afiliados
                    if (listaAfiliados && listaAfiliados.length > 0) {
                        // Si tiene afiliados, generar la tabla
                        html += `
                            <div class="titulo-tabla">
                                <p class="text-center fw-bold">LISTA DE AFILIADOS</p>
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
                                    <tbody>`;

                        listaAfiliados.forEach(function (afiliado) {
                            html += `
                                <tr>
                                    <td>${afiliado.Nombres}</td>
                                    <td>${afiliado.Apellidos}</td>
                                    <td class="text-center">${afiliado.NroCI}</td>
                                    <td class="text-center">${afiliado.Celular}</td>
                                    <td>${afiliado.Direccion}</td>
                                </tr>`;
                        });

                        html += `
                                    </tbody>
                                </table>
                            </div>
                        `;
                    } else {
                        // Si no tiene afiliados, mostrar un mensaje
                        html += `
                            <div class="titulo-tabla">
                                <p class="text-center fw-bold">NO TIENE LISTA DE AFILIADOS</p>
                            </div>
                        `;
                    }

                    // Insertar el HTML generado en el contenedor
                    container.append(html);
                });
            }
        }
    });
}

function imprSelec(nombre) {
    var printContents = document.getElementById(nombre).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}
function hide() {
    document.getElementById('Imprimir').style.visibility = "hidden";
}