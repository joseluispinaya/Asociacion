
$('#btnIniciarSesion').on('click', function () {

    //loginUsuario();
    if ($("#emailAddress").val().trim() == "") {
        swal("Mensaje", "Ingrese su Correo Electronico", "warning");
        return;
    }
    loginSistema();
})

function loginSistema() {

    $.ajax({
        type: "POST",
        url: "Login.aspx/Logeo",
        data: JSON.stringify({ Usuario: $("#emailAddress").val(), Clave: $("#password").val() }),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {

            $.LoadingOverlay("show", {
                image: "",
                fontawesome: "fas fa-cog fa-spin"
            });
        },
        success: function (response) {
            $.LoadingOverlay("hide");
            if (response.d.estado) {
                window.location.href = 'Inicio.aspx';
            } else {
                swal("Mensaje", "No se encontro el usuario", "warning")
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $.LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}