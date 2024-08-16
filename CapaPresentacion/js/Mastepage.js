

$(document).ready(function () {
    oDetalleUsuarioR();
    //cargarMenu();
});


//etiqueta <a> no es boton
$('#salirs').on('click', function (e) {
    e.preventDefault(); // Evita que el enlace siga el href
    CerrarSesion();
});



function oDetalleUsuarioR() {

    $.ajax({
        type: "POST",
        url: "Inicio.aspx/ObtenerDatos",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {

            if (response.d.estado) {
                $("#nombreusuariome").text(response.d.objeto.Apellidos);
                //$("#rolnomme").text(response.d.objeto.oRol.NomRol);
                $("#imgUsuarioMe").attr("src", response.d.objeto.ImageFull);
                $("#imageUserMe").attr("src", response.d.objeto.ImageFull);

                $(".flex-grow-1").text(response.d.objeto.oRol.NomRol);
                $("#rolnomme").text(response.d.objeto.Apellidos);
                //$("#rolusuario").html("<i class='fa fa-circle text-success'></i> " + response.d.objeto.oRol.Descripcion);
            } else {
                window.location.href = 'Default.aspx';
            }

        }
    });
}

function CerrarSesion() {
    //console.log("registra",request);

    $.ajax({
        type: "POST",
        url: "Inicio.aspx/CerrarSesion",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            if (response.d.estado) {
                window.location.href = 'Default.aspx';
                //window.location.href = 'IniciarSesion.aspx';
            }
        }
    });
}


//$(document).on('click', '#close', function (e) {
//    e.preventDefault();
//    CerrarSesion();
//});