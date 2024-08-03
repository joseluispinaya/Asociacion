
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

$('#btnNuevoReg').on('click', function () {
    $("#modalPres").modal("show");
    //mostrarModal(null, true);
})