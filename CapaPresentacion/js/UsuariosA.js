

var table;

const MODELO_BASE = {
    IdUsuario: 0,
    NroCI: "",
    Nombres: "",
    Apellidos: "",
    Correo: "",
    Clave: "",
    IdRol: 0,
    Estado: true,
    ImageFull: ""
}

$(document).ready(function () {
    //$('#data-table-buttons').DataTable({
    //    responsive: true
    //});
    dtUsuarios();
    cargarRoles();
})

function dtUsuarios() {
    // Verificar si el DataTable ya está inicializado
    if ($.fn.DataTable.isDataTable("#tbUsuario")) {
        // Destruir el DataTable existente
        $("#tbUsuario").DataTable().destroy();
        // Limpiar el contenedor del DataTable
        $('#tbUsuario tbody').empty();
    }

    table = $("#tbUsuario").DataTable({
        responsive: true,
        "ajax": {
            "url": 'UsuariosA.aspx/ObtenerUsuario',
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
            { "data": "IdUsuario", "visible": false, "searchable": false },
            {
                "data": "ImageFull", render: function (data) {
                    return `<img style="height:40px" src=${data} class="rounded mx-auto d-block"/>`
                }
            },
            { "data": "oRol.NomRol" },
            { "data": "Nombres" },
            { "data": "Apellidos" },
            { "data": "Correo" },
            {
                "data": "Estado", render: function (data) {
                    if (data == true)
                        return '<span class="badge bg-yellow text-black">Activo</span>';
                    else
                        return '<span class="badge bg-danger">No Activo</span>';
                }
            },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-sm me-5px"><i class="fas fa-pencil-alt"></i></button>' +
                    '<button class="btn btn-danger btn-eliminar btn-sm"><i class="fas fa-trash-alt"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "80px"
            }
        ],
        "order": [[0, "desc"]],
        "dom": "Bfrtip",
        "buttons": [
            {
                text: 'Exportar Excel',
                extend: 'excelHtml5',
                title: '',
                filename: 'Informe Usuarios',
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

function cargarRoles() {
    $("#cboRol").html("");

    $.ajax({
        type: "POST",
        url: "UsuariosA.aspx/ObtenerRol",
        data: {},
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.estado) {
                $.each(data.d.objeto, function (i, row) {
                    if (row.Activo == true) {
                        $("<option>").attr({ "value": row.Idrol }).text(row.NomRol).appendTo("#cboRol");
                    }

                })
            }

        }
    });
}

function mostrarImagenSeleccionada(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imgUsuarioM').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    } else {
        $('#imgUsuarioM').attr('src', "Imagenes/sinimagen.png");
    }
}

$('#txtFotoS').change(function () {
    mostrarImagenSeleccionada(this);
});


function mostrarModal(modelo, cboEstadoDeshabilitado = true) {
    // Verificar si modelo es null
    modelo = modelo ?? MODELO_BASE;

    $("#txtIdUsuario").val(modelo.IdUsuario);
    $("#txtNombre").val(modelo.Nombres);
    $("#txtNroci").val(modelo.NroCI);
    $("#txtclave").val(modelo.Clave);
    $("#txtApellidos").val(modelo.Apellidos);
    $("#txtCorreo").val(modelo.Correo);
    $("#cboRol").val(modelo.IdRol == 0 ? $("#cboRol option:first").val() : modelo.IdRol);
    $("#cboEstado").val(modelo.Estado == true ? 1 : 0);
    $("#imgUsuarioM").attr("src", modelo.ImageFull == "" ? "Imagenes/sinimagen.png" : modelo.ImageFull);

    // Configurar el estado de cboEstado según cboEstadoDeshabilitado jquery v 1.11.1
    $("#cboEstado").prop("disabled", cboEstadoDeshabilitado);

    //$("#txtCorreo").prop("disabled", !cboEstadoDeshabilitado);
    $("#txtFotoS").val("");

    $("#modal-dialog").modal("show");
}



$("#tbUsuario tbody").on("click", ".btn-editar", function (e) {
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

$('#btnNuevo').on('click', function (e) {
    e.preventDefault(); // Evita que el enlace siga el href
    mostrarModal(null, true);
});


function sendDataToServer(request) {
    $.ajax({
        type: "POST",
        url: "UsuariosA.aspx/GuardarUsua",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $(".modal-body").LoadingOverlay("show");
        },
        success: function (response) {
            $(".modal-body").LoadingOverlay("hide");
            if (response.d.estado) {
                dtUsuarios();
                $('#modal-dialog').modal('hide');
                swal("Mensaje", "Registro Exitoso", "success");
            } else {
                swal("Mensaje", "Error al registrar ingrese otro correo", "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $(".modal-body").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}


function registerDataAjax() {
    var fileInput = document.getElementById('txtFotoS');
    var file = fileInput.files[0];

    const modelo = structuredClone(MODELO_BASE);
    modelo["IdUsuario"] = parseInt($("#txtIdUsuario").val());
    modelo["Nombres"] = $("#txtNombre").val();
    modelo["NroCI"] = $("#txtNroci").val();
    modelo["Clave"] = $("#txtclave").val();
    modelo["Apellidos"] = $("#txtApellidos").val();
    modelo["Correo"] = $("#txtCorreo").val();
    modelo["IdRol"] = $("#cboRol").val();

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
                oUsuario: modelo,
                imageBytes: Array.from(bytes)
            };

            sendDataToServer(request);
        };

        reader.readAsArrayBuffer(file);
    } else {
        // Si no se selecciona ningún archivo, envía un valor nulo o vacío para imageBytes
        var request = {
            oUsuario: modelo,
            imageBytes: null // o cualquier otro valor que indique que no se envió ningún archivo
        };

        sendDataToServer(request);
    }
}


$('#btnGuardarCambios').on('click', function () {
    //$("#modal-dialog").modal("show");

    const inputs = $("input.model").serializeArray();
    const inputs_sin_valor = inputs.filter((item) => item.value.trim() == "")

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo : "${inputs_sin_valor[0].name}"`;
        //$.gritter.add({
        //    title: 'Advertencia',
        //    text: mensaje
        //});

        toastr.warning("", mensaje)
        $(`input[name="${inputs_sin_valor[0].name}"]`).focus()
        return;
    }

    if (parseInt($("#txtIdUsuario").val()) == 0) {
        //swal("Mensaje", "Guardado.", "success")
        registerDataAjax();
    } else {
        swal("Mensaje", "Falta para Actualizar personal.", "warning")
    }

    //swal("Error", "La imagen seleccionada es demasiado grande max 1.5 Mb.", "success");
})