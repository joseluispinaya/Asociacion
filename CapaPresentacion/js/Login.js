
$('#btnIniciarSesion').on('click', function () {

    //loginUsuario();
    if ($("#emailAddress").val().trim() === "") {
        swal("Mensaje", "Ingrese su Correo Electronico", "warning");
        return;
    }
    loginSistema();
})

function loginSistema() {

    $.ajax({
        type: "POST",
        url: "Login.aspx/Logeo",
        data: JSON.stringify({ Usuario: $("#emailAddress").val().trim(), Clave: $("#password").val().trim() }),
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
                sessionStorage.setItem('tokenSesion', response.d.valor);
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

//etiqueta <a> no es boton
$('#btnRecup').on('click', function (e) {
    e.preventDefault(); // Evita que el enlace siga el href
    $("#modal-dialog").modal("show");
});

function enviarCorreo() {

    $.ajax({
        type: "POST",
        url: "Login.aspx/EnviarCorreo",
        data: JSON.stringify({ correo: $("#txtCorreoR").val().trim() }),
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
                $('#modal-dialog').modal('hide');
                swal("Mensaje", response.d.valor, "success");
            } else {
                swal("Mensaje", response.d.valor, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $.LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}


function esCorreoValido(correo) {
    // Expresión regular mejorada para validar correos electrónicos
    var emailRegex = /^[a-zA-Z0-9._%+-ñÑáéíóúÁÉÍÓÚ]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return correo !== "" && emailRegex.test(correo);
}

$('#btnEnviarCo').on('click', function () {

    var correo = $("#txtCorreoR").val().trim();
    if (!esCorreoValido(correo)) {
        swal("Mensaje", "Ingrese un correo válido", "warning");
        //mostrarMensaje("Mensaje", "Ingrese un correo válido", "warning");
        return;
    }

    // Deshabilitar el botón para evitar múltiples envíos
    $('#btnEnviarCo').text('Enviando...').prop('disabled', true);
    //$('#btnEnviarCo').prop('disabled', true);

    enviarCorreo().always(function () {
        // Rehabilitar el botón después de que se complete el envío
        $('#btnEnviarCo').text('Enviar').prop('disabled', false);
        //$('#btnEnviarCo').prop('disabled', false);
    });


    //VALIDACIONES DE CORREO
    //var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //var correo = $("#txtCorreoR").val().trim();

    //if (correo === "" || !emailRegex.test(correo)) {
    //    swal("Mensaje", "Ingrese un correo válido", "warning");
    //    return;
    //}
    //enviarCorreo();
})