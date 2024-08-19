
var table;

const MODELO_BASET = {
    IdTransa: 0,
    Idasoci: 0,
    Itipotra: 0,
    Descripcion: "",
    Total: 0.0, // Inicializado como float
    FechaTransacadena: "",
}



$.datepicker.regional['es'] = {
    closeText: 'Cerrar',
    prevText: '< Ant',
    nextText: 'Sig >',
    currentText: 'Hoy',
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
    dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
    weekHeader: 'Sm',
    dateFormat: 'mm/dd/yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
};

$.datepicker.setDefaults($.datepicker.regional['es']);

//dateFormat: 'dd/mm/yy',

function ObtenerFecha() {

    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = (('' + day).length < 2 ? '0' : '') + day + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + d.getFullYear();

    return output;
}

function ObtenerFechaIa() {
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = (('' + month).length < 2 ? '0' : '') + month + '/' + (('' + day).length < 2 ? '0' : '') + day + '/' + d.getFullYear();

    return output;
}

$(document).ready(function () {
    $("#txtFechap").datepicker();
    $("#txtFechap").val(ObtenerFechaIa());
    //$("#txtFechap").val(ObtenerFecha());
    cargarTipoTransa();
    cargarAsociaciones();
});


function cargarTipoTransa() {
    $("#cboTipoTra").html("");

    $.ajax({
        type: "POST",
        url: "TransaccionA.aspx/ObtenerTipoTransa",
        data: {},
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.estado) {
                $.each(data.d.objeto, function (i, row) {
                    if (row.Activo == true) {
                        $("<option>").attr({ "value": row.Itipotra }).text(row.Tipo).appendTo("#cboTipoTra");
                    }

                })
            }

        }
    });
}

function dtListaTransaccionesId(IdAsoci) {
    if ($.fn.DataTable.isDataTable("#tbTransacciones")) {
        $("#tbTransacciones").DataTable().destroy();
        $('#tbTransacciones tbody').empty();
    }

    var request = { IdAsoci: IdAsoci }

    table = $("#tbTransacciones").DataTable({
        responsive: true,
        "ajax": {
            "url": 'TransaccionA.aspx/ListTtansaccionesId',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function () {
                return JSON.stringify(request);
            },
            "dataSrc": function (json) {
                if (json.d.estado) {
                    return json.d.objeto;
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdTransa", "visible": false, "searchable": false },
            { "data": "oAsociacion.Nombre" },
            { "data": "oTipoTransaccion.Tipo" },
            { "data": "FechaTransacadena" },
            { "data": "TotalCadenaUn" },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-sm me-5px"><i class="fas fa-pencil-alt"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "40px"
            }
        ],
        "order": [[0, "desc"]],
        "dom": "Bfrtip",
        "buttons": [
            {
                text: 'Exportar Excel',
                extend: 'excelHtml5',
                title: '',
                filename: 'Informe Transacciones',
                exportOptions: {
                    columns: [1, 2, 3, 4] // Ajusta según las columnas que desees exportar
                }
            }
        ],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

function cargarAsociaciones() {

    $("#cboAsoci").select2({
        ajax: {
            url: "TransaccionA.aspx/BuscarAsociacion",
            dataType: 'json',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            delay: 250,
            data: function (params) {
                return JSON.stringify({ buscarporNombre: params.term });
            },
            processResults: function (data) {
                //console.log("Datos recibidos:", data.d.objeto);
                return {
                    results: data.d.objeto.map((item) => ({
                        id: item.Idasoci,
                        text: item.Nombre,
                        Telefono: item.Telefono,
                        Correo: item.Correo,
                        asociacion: item
                    }))
                };
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            }
        },
        language: "es",
        placeholder: 'Buscar Asociacion',
        minimumInputLength: 1,
        templateResult: formatoResultados
    });
}

function formatoResultados(data) {

    var imagenes = "ImagenesPr/logoa.png";
    // Esto es por defecto, ya que muestra el "buscando..."
    if (data.loading)
        return data.text;

    var contenedor = $(
        `<table width="100%">
            <tr>
                <td style="width:60px">
                    <img style="height:60px;width:60px;margin-right:10px" src="${imagenes}"/>
                </td>
                <td>
                    <p style="font-weight: bolder;margin:2px">${data.text}</p>
                    <p style="margin:2px">${data.Correo}</p>
                </td>
            </tr>
        </table>`
    );

    return contenedor;
}


$("#cboAsoci").on("select2:select", function (e) {

    var data = e.params.data.asociacion;

    $("#txtIdasocia").val(data.Idasoci);
    $("#txtNombres").val(data.Nombre);
    $("#txtTelefono").val(data.Telefono);

    dtListaTransaccionesId(data.Idasoci);

    $("#cboAsoci").val("").trigger("change")
    //console.log(data);
});


function mostrarModal(modelo, cboEstadoDeshabilitado = true) {
    // Verificar si modelo es null
    modelo = modelo ?? MODELO_BASET;

    $("#txtIdTransa").val(modelo.IdTransa);
    $("#txtIdasocia").val(modelo.Idasoci);
    $("#cboTipoTra").val(modelo.Itipotra == 0 ? $("#cboTipoTra option:first").val() : modelo.Itipotra);
    $("#txtDescripcion").val(modelo.Descripcion);
    $("#txtMonto").val(modelo.Total);

    $("#txtFechap").val(modelo.FechaTransacadena == "" ? ObtenerFecha() : modelo.FechaTransacadena);


    // Actualizar el título del modal
    if (cboEstadoDeshabilitado) {
        $("#modalLabelA").text("Nueva Transaccion");
    } else {
        $("#modalLabelA").text("Editar Transaccion");
    }

    $("#modalTransa").modal("show");
}


$("#tbTransacciones tbody").on("click", ".btn-editar", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const modelo = table.row(filaSeleccionada).data();

    $("#txtIdTransa").val(modelo.IdTransa);
    $("#txtIdasocia").val(modelo.Idasoci);
    $("#cboTipoTra").val(modelo.Itipotra);
    $("#txtDescripcion").val(modelo.Descripcion);
    $("#txtMonto").val(modelo.Total);

    //FechaTransServ  $("#txtFechap").val(modelo.FechaTransacadena);
    $("#txtFechap").val(modelo.FechaTransServ);

    $("#modalLabelA").text("Editar Transaccion");

    $("#modalTransa").modal("show");

    //mostrarModal(model, false);
})

$('#btnNuevoReg').on('click', function () {

    //if (parseInt($("#txtIdasocia").val()) == 0) {
    //    swal("Mensaje", "Error debe seleccionar una Asociacion", "warning");
    //    return;
    //}

    if (parseInt($("#txtIdasocia").val()) == 0) {
        swal("Mensaje", "Error debe seleccionar una Asociación", "warning")
            .then(() => {
                // Hacer focus en el select2
                $('#cboAsoci').select2('open'); // Abre el dropdown de Select2
            });
        return;
    }


    $("#txtIdTransa").val("0");
    //$("#txtIdasocia").val("0");
    $("select#cboTipoTra").prop('selectedIndex', 0);
    $("#txtDescripcion").val("");
    $("#txtMonto").val("0");

    //$("#txtFechap").val(ObtenerFecha());

    $("#modalLabelA").text("Nueva Transaccion");

    $("#modalTransa").modal("show");
    //mostrarModal(null, true);
})



function dataRegistrar() {
    const modelo = structuredClone(MODELO_BASET);
    modelo["IdTransa"] = parseInt($("#txtIdTransa").val());
    modelo["Idasoci"] = $("#txtIdasocia").val();
    modelo["Itipotra"] = $("#cboTipoTra").val();
    modelo["Descripcion"] = $("#txtDescripcion").val();
    modelo["Total"] = parseFloat($("#txtMonto").val());
    modelo["FechaTransacadena"] = $("#txtFechap").val();

    var request = {
        eTransaccion: modelo
    };

    $.ajax({
        type: "POST",
        url: "TransaccionA.aspx/Guardar",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            // Mostrar overlay de carga antes de enviar la solicitud modal-content
            $(".modal-body").LoadingOverlay("show", {
                image: "",
                fontawesome: "fas fa-cog fa-spin"
            });
        },
        success: function (response) {
            $(".modal-body").LoadingOverlay("hide");
            if (response.d.estado) {
                dtListaTransaccionesId($("#txtIdasocia").val());
                $('#modalTransa').modal('hide');
                swal("Mensaje", "Registro Exitoso", "success");
            } else {
                swal("Mensaje", "Error al registrar Intente mas tarde", "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $(".modal-body").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}


function dataActualizar() {
    const modelo = structuredClone(MODELO_BASET);
    modelo["IdTransa"] = parseInt($("#txtIdTransa").val());
    modelo["Idasoci"] = $("#txtIdasocia").val();
    modelo["Itipotra"] = $("#cboTipoTra").val();
    modelo["Descripcion"] = $("#txtDescripcion").val();
    modelo["Total"] = parseFloat($("#txtMonto").val());
    modelo["FechaTransacadena"] = $("#txtFechap").val();

    var request = {
        eTransaccion: modelo
    };

    $.ajax({
        type: "POST",
        url: "TransaccionA.aspx/Actualizar",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            // Mostrar overlay de carga antes de enviar la solicitud modal-content
            $(".modal-body").LoadingOverlay("show", {
                image: "",
                fontawesome: "fas fa-cog fa-spin"
            });
        },
        success: function (response) {
            $(".modal-body").LoadingOverlay("hide");
            if (response.d.estado) {
                dtListaTransaccionesId($("#txtIdasocia").val());
                $('#modalTransa').modal('hide');
                swal("Mensaje", "Actualizado Correctamente", "success");
            } else {
                swal("Mensaje", "Error al Actualizar Intente mas tarde", "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $(".modal-body").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}


$('#btnGuardarCambios').on('click', function () {

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "3000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };


    if ($("#txtDescripcion").val().trim() == "") {
        toastr.error("Debe completar el campo Descripcion", "Advertencia");
        $("#txtDescripcion").focus();
        return;
    }

    var montoPresupuesto = parseFloat($("#txtMonto").val().trim());
    if (isNaN(montoPresupuesto) || montoPresupuesto === 0) {
        toastr.error("Debe ingresar un Monto válido", "Advertencia");
        $("#txtMonto").focus();
        return;
    }


    if (parseInt($("#txtIdTransa").val()) == 0) {
        dataRegistrar();
    } else {
        //swal("Mensaje", "Falta para Actualizar.", "warning")
        dataActualizar();
    }
})