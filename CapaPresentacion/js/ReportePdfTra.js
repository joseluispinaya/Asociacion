
//$(document).ready(function () {
//    const queryString = window.location.search;
//    const urlParams = new URLSearchParams(queryString);
//    const fechainicioEncoded = urlParams.get('fi');
//    const fechafinEncoded = urlParams.get('ff');
//    const IdAsoci = urlParams.get('id');

//    const fechainicio = decodeURIComponent(fechainicioEncoded);
//    const fechafin = decodeURIComponent(fechafinEncoded);

//    // Validar si IdAsoci no es "0" cuando las fechas están vacías
//    if ((fechainicio.trim() === "" || fechafin.trim() === "") && IdAsoci === "0") {
//        alert("No hay un parámetro válido recibido. El formulario se cerrará.");
//        window.close();
//    } else if (fechainicio.trim() === "" || fechafin.trim() === "") {
//        // Si las fechas están vacías, cargar datos por IdAsoci
//        CargarDatosGroup(IdAsoci);
//    } else {
//        // Si las fechas están presentes, cargar datos por rango de fechas
//        CargarDatosGroupFech(fechainicio, fechafin);
//    }

//});


$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const fechainicioEncoded = urlParams.get('fi');
    const fechafinEncoded = urlParams.get('ff');
    const IdAsoci = urlParams.get('id');

    const fechainicio = decodeURIComponent(fechainicioEncoded);
    const fechafin = decodeURIComponent(fechafinEncoded);

    // Validar si IdAsoci no es "0" cuando las fechas están vacías
    if ((fechainicio.trim() === "" || fechafin.trim() === "") && IdAsoci === "0") {
        alert("No hay un parámetro válido recibido. El formulario se cerrará.");
        window.close();
    } else {
        CargarDatos(fechainicio, fechafin, IdAsoci);

        if (fechainicio.trim() === "" || fechafin.trim() === "") {
            CargarDatosGroup(IdAsoci);
        } else {
            CargarDatosGroupFech(fechainicio, fechafin);
        }

    }

});


function CargarDatos($fechainicio, $fechafin, $IdAsoci) {

    $("#tbReporteT tbody").html("");

    var request = {
        fechainicio: $fechainicio,
        fechafin: $fechafin,
        IdAsoci: $IdAsoci
    };

    $.ajax({
        type: "POST",
        url: "TransaccionRepo.aspx/ListTtansaccionesIasE",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.estado) {
                data.d.objeto.forEach((item) => {
                    $("#tbReporteT tbody").append(
                        $("<tr>").append(
                            $("<td>").text(item.FechaTransacadena),
                            $("<td>").addClass("text-center").text(item.oAsociacion.Nombre),
                            $("<td>").addClass("text-center").text(item.oTipoTransaccion.Tipo),
                            $("<td>").addClass("text-end").text(item.TotalCadenaUn)
                        )
                    )
                });

            } else {
                alert("Ocurrio un error.");
            }

        }
    });
}


function CargarDatosGroup($IdAsoci) {

    $("#tbTotales tbody").html("");

    var request = { IdAsoci: parseInt($IdAsoci) }

    //var request = {
    //    IdAsoci: $IdAsoci
    //};

    $.ajax({
        type: "POST",
        url: "TransaccionRepo.aspx/ListTtansaccioIdNuevo",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.estado) {
                data.d.objeto.forEach((item) => {
                    $("#tbTotales tbody").append(
                        $("<tr>").append(
                            $("<td>").text(item.Month),
                            $("<td>").addClass("text-end").text(item.TotalAmount)
                        )
                    )
                });

                //rango fechas
                $("#totalacu").text("De: " + data.d.valor);

            } else {
                alert("Ocurrio un error.");
            }

        }
    });
}


function CargarDatosGroupFech($fechainicio, $fechafin) {

    $("#tbTotales tbody").html("");

    var request = {
        fechainicio: $fechainicio,
        fechafin: $fechafin
    };
    $.ajax({
        type: "POST",
        url: "TransaccionRepo.aspx/ListTtansaccioFechNue",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.estado) {
                data.d.objeto.forEach((item) => {
                    $("#tbTotales tbody").append(
                        $("<tr>").append(
                            $("<td>").text(item.Month),
                            $("<td>").addClass("text-end").text(item.TotalAmount)
                        )
                    )
                });

                //rango fechas "De: " +
                $("#totalacu").text("De: " + data.d.valor);

            } else {
                alert("Ocurrio un error.");
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