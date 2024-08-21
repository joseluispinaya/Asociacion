

var table;

const MODELO_BASE = {
    Idasoci: 0,
    Nombre: "",
    Direccion: "",
    Telefono: "",
    Correo: "",
    Activo: true
}

$(document).ready(function () {

    dtAsociaa();
})

function dtAsociaa() {
    // Verificar si el DataTable ya está inicializado
    if ($.fn.DataTable.isDataTable("#tbAsociaciones")) {
        // Destruir el DataTable existente
        $("#tbAsociaciones").DataTable().destroy();
        // Limpiar el contenedor del DataTable
        $('#tbAsociaciones tbody').empty();
    }

    table = $("#tbAsociaciones").DataTable({
        responsive: true,
        "ajax": {
            "url": 'AsociacionA.aspx/ObtenerAsociacion',
            "type": "POST", // Cambiado a POST
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function (d) {
                return JSON.stringify(d);
            },
            "dataSrc": function (json) {
                //console.log("Response from server:", json.d.objeto);
                if (json.d.estado) {
                    return json.d.objeto; // Asegúrate de que esto apunta al array de datos
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "Idasoci", "visible": false, "searchable": false },
            { "data": "Nombre" },
            { "data": "Direccion" },
            { "data": "Telefono" },
            { "data": "Correo" },
            {
                "data": "Activo", render: function (data) {
                    if (data == true)
                        return '<span class="badge bg-yellow text-black">Activo</span>';
                    else
                        return '<span class="badge bg-danger">No Activo</span>';
                }
            },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-sm me-5px"><i class="fas fa-pencil-alt"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "50px"
            }
        ],
        "order": [[0, "desc"]],
        "dom": "Bfrtip",
        "buttons": [
            {
                text: 'Exportar Excel',
                extend: 'excelHtml5',
                title: '',
                filename: 'Informe Asociaciones',
                exportOptions: {
                    columns: [1, 2, 3, 4, 5] // Ajusta según las columnas que desees exportar
                }
            }
        ],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}


$.fn.inputFilter = function (inputFilter) {
    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
        if (inputFilter(this.value) || event.key === "Backspace" || event.key === " ") {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
            this.value = "";
        }
    });
};



$("#txtNrocel").inputFilter(function (value) {
    return /^\d*$/.test(value) && value.length <= 9;
});


function mostrarModal(modelo, cboEstadoDeshabilitado = true) {
    // Verificar si modelo es null
    modelo = modelo ?? MODELO_BASE;

    $("#txtIdAsos").val(modelo.Idasoci);
    $("#txtNombre").val(modelo.Nombre);
    $("#txtDireccion").val(modelo.Direccion);
    $("#txtCorreo").val(modelo.Correo);
    $("#txtNrocel").val(modelo.Telefono);
    $("#cboEstado").val(modelo.Activo == true ? 1 : 0);

    // Configurar el estado de cboEstado según cboEstadoDeshabilitado
    $("#cboEstado").prop("disabled", cboEstadoDeshabilitado);

    // Actualizar el título del modal
    if (cboEstadoDeshabilitado) {
        $("#modalLabelA").text("Nueva Asociacion");
    } else {
        $("#modalLabelA").text("Editar Asociacion");
    }

    $("#modalAso").modal("show");
}

$("#tbAsociaciones tbody").on("click", ".btn-editar", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();
    mostrarModal(model, false);
})

$('#btnNuevoReg').on('click', function () {

    mostrarModal(null, true);
})

function dataRegistrar() {
    const modelo = structuredClone(MODELO_BASE);
    modelo["Idasoci"] = parseInt($("#txtIdAsos").val());
    modelo["Nombre"] = $("#txtNombre").val();
    modelo["Direccion"] = $("#txtDireccion").val();
    modelo["Telefono"] = $("#txtNrocel").val();
    modelo["Correo"] = $("#txtCorreo").val();
    modelo["Activo"] = ($("#cboEstado").val() == "1" ? true : false);

    var request = {
        oAsocia: modelo
    };

    $.ajax({
        type: "POST",
        url: "AsociacionA.aspx/Guardar",
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
                dtAsociaa();
                $('#modalAso').modal('hide');
                swal("Mensaje", "Registro Exitoso", "success");
            } else {
                swal("Mensaje", "Error al registrar ingrese otro Nombre", "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $(".modal-body").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}

function dataActualizar() {
    const modelo = structuredClone(MODELO_BASE);
    modelo["Idasoci"] = parseInt($("#txtIdAsos").val());
    modelo["Nombre"] = $("#txtNombre").val();
    modelo["Direccion"] = $("#txtDireccion").val();
    modelo["Telefono"] = $("#txtNrocel").val();
    modelo["Correo"] = $("#txtCorreo").val();
    modelo["Activo"] = ($("#cboEstado").val() == "1" ? true : false);

    var request = {
        oAsocia: modelo
    };

    $.ajax({
        type: "POST",
        url: "AsociacionA.aspx/Actualizar",
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
                dtAsociaa();
                $('#modalAso').modal('hide');
                swal("Mensaje", "Actualizado Correctamente", "success");
            } else {
                swal("Mensaje", "Ocurrio un error intente mas tarde", "warning");
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

    const inputs = $("input.model").serializeArray();
    const inputs_sin_valor = inputs.filter((item) => item.value.trim() == "")

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo : "${inputs_sin_valor[0].name}"`;
        //toastr.warning("", mensaje)
        toastr.error(mensaje, "Advertencia");
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus()
        return;
    }

    if (parseInt($("#txtIdAsos").val()) == 0) {
        dataRegistrar();
    } else {
        //swal("Mensaje", "Falta para Actualizar.", "warning")
        dataActualizar();
    }
})