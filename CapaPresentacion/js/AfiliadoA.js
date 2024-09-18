
var table;


const MODELO_BASE = {
    IdAfiliado: 0,
    Idasoci: 0,
    NroCI: "",
    Nombres: "",
    Apellidos: "",
    Direccion: "",
    Celular: "",
    Activo: true
}


$(document).ready(function () {
    dtAfiliados();
    cargarAsocia();
})

function dtAfiliados() {
    // Verificar si el DataTable ya está inicializado
    if ($.fn.DataTable.isDataTable("#tbAfiliado")) {
        // Destruir el DataTable existente
        $("#tbAfiliado").DataTable().destroy();
        // Limpiar el contenedor del DataTable
        $('#tbAfiliado tbody').empty();
    }

    table = $("#tbAfiliado").DataTable({
        responsive: true,
        "ajax": {
            "url": 'AfiliadoA.aspx/ObtenerAfiliados',
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
            { "data": "IdAfiliado", "visible": false, "searchable": false },
            { "data": "Nombres" },
            { "data": "Apellidos" },
            { "data": "Celular" },
            { "data": "oAsociacion.Nombre" },
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
                filename: 'Informe Afiliados',
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




function cargarAsocia() {
    $("#cboAsoci").html("");

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
                $.each(data.d.objeto, function (i, row) {
                    if (row.Activo == true) {
                        $("<option>").attr({ "value": row.Idasoci }).text(row.Nombre).appendTo("#cboAsoci");
                    }

                })
            }

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

$("#txtNombre").inputFilter(function (value) {
    return /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/u.test(value);
});
$("#txtApellidos").inputFilter(function (value) {
    return /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/u.test(value);
});
$("#txtNroci").inputFilter(function (value) {
    return /^\d*$/.test(value) && value.length <= 10;
});

$("#txtCelular").inputFilter(function (value) {
    return /^\d*$/.test(value) && value.length <= 9;
});



function mostrarModal(modelo, cboEstadoDeshabilitado = true) {
    // Verificar si modelo es null
    modelo = modelo ?? MODELO_BASE;

    $("#txtIdAfiliado").val(modelo.IdAfiliado);
    $("#txtNombre").val(modelo.Nombres);
    $("#txtNroci").val(modelo.NroCI);
    $("#txtApellidos").val(modelo.Apellidos);
    $("#txtCelular").val(modelo.Celular);
    $("#txtDireccion").val(modelo.Direccion);
    $("#cboAsoci").val(modelo.Idasoci == 0 ? $("#cboAsoci option:first").val() : modelo.Idasoci);
    $("#cboEstado").val(modelo.Activo == true ? 1 : 0);

    // Configurar el estado de cboEstado según cboEstadoDeshabilitado
    $("#cboEstado").prop("disabled", cboEstadoDeshabilitado);

    // Actualizar el título del modal
    if (cboEstadoDeshabilitado) {
        $("#modalLabelA").text("Nuevo Afiliado");
    } else {
        $("#modalLabelA").text("Editar Afiliado");
    }

    $("#modalAfil").modal("show");
}

$("#tbAfiliado tbody").on("click", ".btn-editar", function (e) {
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
    //$("#modalAfil").modal("show");
    mostrarModal(null, true);
})


function dataRegistrar() {
    const modelo = structuredClone(MODELO_BASE);
    modelo["IdAfiliado"] = parseInt($("#txtIdAfiliado").val());
    modelo["Idasoci"] = $("#cboAsoci").val();
    modelo["NroCI"] = $("#txtNroci").val();
    modelo["Nombres"] = $("#txtNombre").val();
    modelo["Apellidos"] = $("#txtApellidos").val();
    modelo["Direccion"] = $("#txtDireccion").val();
    modelo["Celular"] = $("#txtCelular").val();

    var request = {
        oAfiliado: modelo
    };

    $.ajax({
        type: "POST",
        url: "AfiliadoA.aspx/Guardar",
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
                dtAfiliados();
                $('#modalAfil').modal('hide');
                swal("Mensaje", "Registro Exitoso", "success");
            } else {
                swal("Mensaje", "Error al registrar verifique nro CI", "warning");
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
    modelo["IdAfiliado"] = parseInt($("#txtIdAfiliado").val());
    modelo["Idasoci"] = $("#cboAsoci").val();
    modelo["NroCI"] = $("#txtNroci").val();
    modelo["Nombres"] = $("#txtNombre").val();
    modelo["Apellidos"] = $("#txtApellidos").val();
    modelo["Direccion"] = $("#txtDireccion").val();
    modelo["Celular"] = $("#txtCelular").val();
    modelo["Activo"] = ($("#cboEstado").val() == "1" ? true : false);

    var request = {
        oAfiliado: modelo
    };

    $.ajax({
        type: "POST",
        url: "AfiliadoA.aspx/Actualizar",
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
                dtAfiliados();
                $('#modalAfil').modal('hide');
                swal("Mensaje", "Actualizado Correctamente", "success");
            } else {
                swal("Mensaje", "Error verifique nro CI o intente mas tarde", "warning");
                //swal("Mensaje", "Error al registrar verifique nro CI", "warning");
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

    if (parseInt($("#txtIdAfiliado").val()) == 0) {
        dataRegistrar();
    } else {
        //swal("Mensaje", "Falta para Actualizar.", "warning")
        dataActualizar();
    }
})