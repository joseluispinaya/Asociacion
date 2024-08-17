
var table;

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
    dateFormat: 'dd/mm/yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
};

$.datepicker.setDefaults($.datepicker.regional['es']);

const VISTA_BUSQUEDA = {

    busquedaFecha: () => {
        $("#txtFechaInicio").val("")
        $("#txtFechaFin").val("")
        $("#cboAsoci").html("")
        $("<option>").attr({ "value": 0 }).text("-- SELECCIONE ASOCIACION --").appendTo("#cboAsoci")

        $(".busqueda-fecha").show()
        $(".busqueda-asocia").hide()

        cargarAsocia();
    },
    busquedaAsocia: () => {
        $("#txtFechaInicio").val("")
        $("#txtFechaFin").val("")
        $("#cboAsoci").html("")
        $("<option>").attr({ "value": 0 }).text("-- SELECCIONE ASOCIACION --").appendTo("#cboAsoci")

        $(".busqueda-fecha").hide()
        $(".busqueda-asocia").show()

        cargarAsocia();
    }
}

$(document).ready(function () {

    VISTA_BUSQUEDA["busquedaFecha"]()
    //cargarAsocia();
    $("#txtFechaInicio").datepicker();
    $("#txtFechaFin").datepicker();
});

$('#cboBuscarPor').change(function () {

    if ($("#cboBuscarPor").val() == "fecha") {
        VISTA_BUSQUEDA["busquedaFecha"]()
    } else {
        VISTA_BUSQUEDA["busquedaAsocia"]()
    }
})

function cargarAsocia() {
    //$("#cboAsoci").html("");

    $.ajax({
        type: "POST",
        url: "AsociacionA.aspx/ObtenerAsociacion",
        data: {},
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.estado) {
                //console.log(data.d.objeto);
                /*$("<option>").attr({ "value": 0 }).text("-- SELECCIONE ASOCIACION --").appendTo("#cboAsoci");*/

                $.each(data.d.objeto, function (i, row) {
                    if (row.Activo == true) {
                        $("<option>").attr({ "value": row.Idasoci }).text(row.Nombre).appendTo("#cboAsoci");
                    }

                })
            } else {
                console.log("No se encontró el estado activo.");
            }

        }
    });
}


function CargarDatos(request) {
    if ($.fn.DataTable.isDataTable("#tbReporteT")) {
        $("#tbReporteT").DataTable().destroy();
        $('#tbReporteT tbody').empty();
    }


    table = $("#tbReporteT").DataTable({
        responsive: true,
        "ajax": {
            "url": 'TransaccionRepo.aspx/ListTtansaccionesIa',
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
            { "data": "FechaTransacadena" },
            { "data": "oAsociacion.Nombre" },
            { "data": "oTipoTransaccion.Tipo" },
            { "data": "TotalCadenaUn" },
            {
                "defaultContent": '<button class="btn btn-primary btn-infor btn-sm me-5px"><i class="fas fa-eye"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "40px"
            }
        ],
        "dom": "rt",
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$('#btnBuscar').on('click', function () {

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

    if ($("#cboBuscarPor").val() == "fecha") {

        if ($("#txtFechaInicio").val().trim() == "" || $("#txtFechaFin").val().trim() == "") {
            toastr.error("Debe Ingresar fecha inicio y fin", "Advertencia");
            return;
        }
    } else {
        if ($("#cboAsoci").val() == "0") {
            toastr.error("Debe seleccionar Asociacion", "Advertencia");
            return;
        }

        //var sele = $("#cboAsoci").val()
        //console.log("valor: ", sele);
    }

    //var seleas = $("#cboAsoci").val()
    //var fechaIni = $("#txtFechaInicio").val()
    //var fechaFin = $("#txtFechaFin").val()

    //console.log("selec: ", seleas);
    //console.log("fechaini: ", fechaIni);
    //console.log("fechaFini: ", fechaFin);

    var request = {
        fechainicio: $("#txtFechaInicio").val(),
        fechafin: $("#txtFechaFin").val(),
        IdAsoci: $("#cboAsoci").val()
    };

    CargarDatos(request);


    //$("#txtproductocantidad").val($("#txtproductocantidad").val() == "" ? "0" : $("#txtproductocantidad").val());
    //var montopago = $("#txtmontopago").val().trim() == "" ? 0 : parseFloat($("#txtmontopago").val().trim());
    //idtienda: $("#cboTienda").val() == null ? "0" : $("#cboTienda").val()
})