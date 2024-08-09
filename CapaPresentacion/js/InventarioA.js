

var table;

const MODELO_BASEV = {
    IdInvent: 0,
    Idasoci: 0,
    Descripcion: "",
    Cantidad: 0,
    Motototal: 0.0,
}


$(document).ready(function () {
    cargarAsociaciones();
});


function dtListaInventarioId(IdAsoci) {
    if ($.fn.DataTable.isDataTable("#tbInvent")) {
        $("#tbInvent").DataTable().destroy();
        $('#tbInvent tbody').empty();
    }

    var request = { IdAsoci: IdAsoci }

    table = $("#tbInvent").DataTable({
        responsive: true,
        "ajax": {
            "url": 'InventarioA.aspx/ListTaInventarioId',
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
            { "data": "IdInvent", "visible": false, "searchable": false },
            { "data": "oAsociacion.Nombre" },
            { "data": "Descripcion" },
            { "data": "Cantidad" },
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
                filename: 'Informe Inventario',
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

    dtListaInventarioId(data.Idasoci);

    $("#cboAsoci").val("").trigger("change")
    //console.log(data);
});


$("#tbInvent tbody").on("click", ".btn-editar", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const modelo = table.row(filaSeleccionada).data();

    $("#txtIdInve").val(modelo.IdInvent);
    $("#txtIdasocia").val(modelo.Idasoci);
    $("#txtCantidad").val(modelo.Cantidad);
    $("#txtDescripcion").val(modelo.Descripcion);
    $("#txtMonto").val(modelo.Motototal);


    $("#modalLabelA").text("Editar Inventario");

    $("#modalInven").modal("show");

    //mostrarModal(model, false);
})


$('#btnNuevoReg').on('click', function () {


    if (parseInt($("#txtIdasocia").val()) == 0) {
        swal("Mensaje", "Error debe seleccionar una Asociación", "warning")
            .then(() => {
                // Hacer focus en el select2
                $('#cboAsoci').select2('open'); // Abre el dropdown de Select2
            });
        return;
    }


    $("#txtIdInve").val("0");
    $("#txtCantidad").val("0");
    $("#txtDescripcion").val("");
    $("#txtMonto").val("0");


    $("#modalLabelA").text("Nuevo Inventario");

    $("#modalInven").modal("show");
    //mostrarModal(null, true);
})



function dataRegistrar() {
    const modelo = structuredClone(MODELO_BASEV);
    modelo["IdInvent"] = parseInt($("#txtIdInve").val());
    modelo["Idasoci"] = $("#txtIdasocia").val();
    modelo["Cantidad"] = $("#txtCantidad").val();
    modelo["Descripcion"] = $("#txtDescripcion").val();
    modelo["Motototal"] = parseFloat($("#txtMonto").val());

    var request = {
        eInventario: modelo
    };

    $.ajax({
        type: "POST",
        url: "InventarioA.aspx/Guardar",
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
                dtListaInventarioId($("#txtIdasocia").val());
                $('#modalInven').modal('hide');
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
    const modelo = structuredClone(MODELO_BASEV);
    modelo["IdInvent"] = parseInt($("#txtIdInve").val());
    modelo["Idasoci"] = $("#txtIdasocia").val();
    modelo["Cantidad"] = $("#txtCantidad").val();
    modelo["Descripcion"] = $("#txtDescripcion").val();
    modelo["Motototal"] = parseFloat($("#txtMonto").val());

    var request = {
        eInventario: modelo
    };

    $.ajax({
        type: "POST",
        url: "InventarioA.aspx/Actualizar",
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
                dtListaInventarioId($("#txtIdasocia").val());
                $('#modalInven').modal('hide');
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

    var montocanti = parseFloat($("#txtCantidad").val().trim());
    if (isNaN(montocanti) || montocanti === 0) {
        toastr.error("Debe ingresar una Cantidad válido", "Advertencia");
        $("#txtCantidad").focus();
        return;
    }

    if (parseInt($("#txtIdInve").val()) == 0) {
        dataRegistrar();
    } else {
        //swal("Mensaje", "Falta para Actualizar.", "warning")
        dataActualizar();
    }
})