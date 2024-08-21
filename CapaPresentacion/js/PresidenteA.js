
var table;

const MODELO_BASE = {
    IdPresident: 0,
    Idasoci: 0,
    NroCI: "",
    Nombres: "",
    Apellidos: "",
    Celular: "",
    Activo: true,
    ImageFull: ""
}


$(document).ready(function () {
    dtPresiden();
    cargarAsocia();
})


function dtPresiden() {
    // Verificar si el DataTable ya está inicializado
    if ($.fn.DataTable.isDataTable("#tbPresidente")) {
        // Destruir el DataTable existente
        $("#tbPresidente").DataTable().destroy();
        // Limpiar el contenedor del DataTable
        $('#tbPresidente tbody').empty();
    }

    table = $("#tbPresidente").DataTable({
        responsive: true,
        "ajax": {
            "url": 'PresidenteA.aspx/ObtenerPresi',
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
            { "data": "IdPresident", "visible": false, "searchable": false },
            {
                "data": "ImageFull", render: function (data) {
                    return `<img style="height:40px" src=${data} class="rounded mx-auto d-block"/>`
                }
            },
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
                filename: 'Informe Presidentes',
                exportOptions: {
                    columns: [2, 3, 4, 5, 6] // Ajusta según las columnas que desees exportar
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


function mostrarImagenSeleccionada(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imgUsuarioP').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    } else {
        $('#imgUsuarioP').attr('src', "Imagenes/sinimagen.png");
    }
}

$('#txtFotoP').change(function () {
    mostrarImagenSeleccionada(this);
});


function mostrarModal(modelo, cboEstadoDeshabilitado = true) {
    // Verificar si modelo es null
    modelo = modelo ?? MODELO_BASE;

    $("#txtIdPresident").val(modelo.IdPresident);
    $("#txtNombre").val(modelo.Nombres);
    $("#txtNroci").val(modelo.NroCI);
    $("#txtApellidos").val(modelo.Apellidos);
    $("#txtCelular").val(modelo.Celular);
    $("#cboAsoci").val(modelo.Idasoci == 0 ? $("#cboAsoci option:first").val() : modelo.Idasoci);
    $("#cboEstado").val(modelo.Activo == true ? 1 : 0);
    $("#imgUsuarioP").attr("src", modelo.ImageFull == "" ? "Imagenes/sinimagen.png" : modelo.ImageFull);

    // Configurar el estado de cboEstado según cboEstadoDeshabilitado jquery v 1.11.1
    $("#cboEstado").prop("disabled", cboEstadoDeshabilitado);

    // Actualizar el título del modal
    if (cboEstadoDeshabilitado) {
        $("#modalLabelA").text("Nuevo Presidente");
    } else {
        $("#modalLabelA").text("Editar Presidente");
    }

    //$("#txtCorreo").prop("disabled", !cboEstadoDeshabilitado);
    $("#txtFotoP").val("");

    $("#modalPres").modal("show");
}

$("#tbPresidente tbody").on("click", ".btn-editar", function (e) {
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

function sendDataToServer(request) {
    $.ajax({
        type: "POST",
        url: "PresidenteA.aspx/Guardar",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $(".modal-body").LoadingOverlay("show", {
                image: "",
                fontawesome: "fas fa-cog fa-spin"
            });
        },
        success: function (response) {
            $(".modal-body").LoadingOverlay("hide");
            if (response.d.estado) {
                dtPresiden();
                $('#modalPres').modal('hide');
                swal("Mensaje", "Registro Exitoso", "success");
            } else {
                swal("Mensaje", "Error verifique Nro Ci y Asociacion no se repitan en BD", "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $(".modal-body").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}


function registerDataAjax() {
    var fileInput = document.getElementById('txtFotoP');
    var file = fileInput.files[0];

    const modelo = structuredClone(MODELO_BASE);
    modelo["IdPresident"] = parseInt($("#txtIdPresident").val());
    modelo["Idasoci"] = $("#cboAsoci").val();
    modelo["NroCI"] = $("#txtNroci").val();
    modelo["Nombres"] = $("#txtNombre").val();
    modelo["Apellidos"] = $("#txtApellidos").val();
    modelo["Celular"] = $("#txtCelular").val();

    if (file) {

        var maxSize = 2 * 1024 * 1024; // 2 MB en bytes
        if (file.size > maxSize) {
            swal("Error", "La imagen seleccionada es demasiado grande max 1.5 Mb.", "error");
            return;
        }

        var reader = new FileReader();

        reader.onload = function (e) {
            var arrayBuffer = e.target.result;
            var bytes = new Uint8Array(arrayBuffer);

            var request = {
                oPresidente: modelo,
                imageBytes: Array.from(bytes)
            };

            sendDataToServer(request);
        };

        reader.readAsArrayBuffer(file);
    } else {
        // Si no se selecciona ningún archivo, envía un valor nulo o vacío para imageBytes
        var request = {
            oPresidente: modelo,
            imageBytes: null // o cualquier otro valor que indique que no se envió ningún archivo
        };

        sendDataToServer(request);
    }
}

//actualizar

function sendDataToServerActua(request) {
    $.ajax({
        type: "POST",
        url: "PresidenteA.aspx/Actualizar",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $(".modal-body").LoadingOverlay("show", {
                image: "",
                fontawesome: "fas fa-cog fa-spin"
            });
        },
        success: function (response) {
            $(".modal-body").LoadingOverlay("hide");
            if (response.d.estado) {
                dtPresiden();
                $('#modalPres').modal('hide');
                swal("Mensaje", "Actualizado Correctamente", "success");
            } else {
                swal("Mensaje", "Error verifique Nro Ci y Asociacion no se repitan en BD", "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $(".modal-body").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}


function dataActualizar() {
    var fileInput = document.getElementById('txtFotoP');
    var file = fileInput.files[0];

    const modelo = structuredClone(MODELO_BASE);
    modelo["IdPresident"] = parseInt($("#txtIdPresident").val());
    modelo["Idasoci"] = $("#cboAsoci").val();
    modelo["NroCI"] = $("#txtNroci").val();
    modelo["Nombres"] = $("#txtNombre").val();
    modelo["Apellidos"] = $("#txtApellidos").val();
    modelo["Celular"] = $("#txtCelular").val();
    modelo["Activo"] = ($("#cboEstado").val() == "1" ? true : false);

    if (file) {

        var maxSize = 2 * 1024 * 1024; // 2 MB en bytes
        if (file.size > maxSize) {
            swal("Error", "La imagen seleccionada es demasiado grande max 1.5 Mb.", "error");
            return;
        }

        var reader = new FileReader();

        reader.onload = function (e) {
            var arrayBuffer = e.target.result;
            var bytes = new Uint8Array(arrayBuffer);

            var request = {
                oPresidente: modelo,
                imageBytes: Array.from(bytes)
            };

            sendDataToServerActua(request);
        };

        reader.readAsArrayBuffer(file);
    } else {
        // Si no se selecciona ningún archivo, envía un valor nulo o vacío para imageBytes
        var request = {
            oPresidente: modelo,
            imageBytes: null // o cualquier otro valor que indique que no se envió ningún archivo
        };

        sendDataToServerActua(request);
    }
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

    if (parseInt($("#txtIdPresident").val()) == 0) {
        registerDataAjax();
    } else {
        //swal("Mensaje", "Falta para Actualizar.", "warning")
        dataActualizar();
    }
})