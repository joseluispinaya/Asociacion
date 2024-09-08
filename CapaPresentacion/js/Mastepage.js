

$(document).ready(function () {
    obtenerTokkenR();
    oDetalleUsuarioR();
});


//etiqueta <a> no es boton
$('#salirs').on('click', function (e) {
    e.preventDefault();
    CerrarSesion();
});

async function obtenerTokkenR() {
    await $.ajax({
        type: "POST",
        url: "Inicio.aspx/ConsuTok",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.estado) {
                // Si el token almacenado en sessionStorage no coincide con el obtenido del servidor
                if (sessionStorage.getItem('tokenSesion') !== response.d.valor) {
                    CerrarSesion();
                }
            } else {
                window.location.href = 'Default.aspx';
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        }
    });
}


function obtenerTokkenRaa() {

    var tokenSesion = sessionStorage.getItem('tokenSesion');

    $.ajax({
        type: "POST",
        url: "Inicio.aspx/ConsuTok",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            if (response.d.estado) {
                //sessionStorage.setItem('tokenSesion', response.d.valor);
                if (tokenSesion !== response.d.valor) {
                    CerrarSesion();
                }
            } else {
                //redirectToLogin();
                window.location.href = 'Default.aspx';
            }
        }
    });
}

function oDetalleUsuarioR() {
    $.ajax({
        type: "POST",
        url: "Inicio.aspx/ObtenerDatos",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        error: handleAjaxError,
        success: function (response) {
            if (response.d.estado) {
                updateUserProfile(response.d.objeto);
                updateUserRoleUI(response.d.objeto.IdRol);
            } else {
                redirectToLogin();
            }
        }
    });
}

function handleAjaxError(xhr, ajaxOptions, thrownError) {
    console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
    // Aquí podrías añadir más lógica de manejo de errores, como mostrar un mensaje en la UI.
}

function updateUserProfile(user) {
    $(".ingg").attr("src", user.ImageFull);
    $(".flex-grow-1").text(user.oRol.NomRol);
    $(".rolnombree").text(user.Apellidos);
}

function updateUserRoleUI(roleId) {
    switch (roleId) {
        case 1:
            showAdminUI();
            break;
        case 2:
            showAccountantUI();
            break;
        default:
            showTechnicianUI();
            break;
    }
}

function showAdminUI() {
    $('#contad').hide();
    $('#tecnico').hide();
    $('#adminis').show();
}

function showAccountantUI() {
    $('#adminis').hide();
    $('#tecnico').hide();
    $('#contad').show();
}

function showTechnicianUI() {
    $('#adminis').hide();
    $('#contad').hide();
    $('#tecnico').show();
}

function redirectToLogin() {
    window.location.href = 'Default.aspx';
}

function CerrarSesion() {

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
                //sessionStorage.removeItem('usuario');
                sessionStorage.clear();
                //window.location.href = 'Default.aspx';
                // Limpiar el historial antes de redirigir
                window.location.replace('Default.aspx');
            }
        }
    });
}

function oDetalleUsuarioRzz() {

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

                $(".ingg").attr("src", response.d.objeto.ImageFull);
                $(".flex-grow-1").text(response.d.objeto.oRol.NomRol);
                $(".rolnombree").text(response.d.objeto.Apellidos);

                if (response.d.objeto.IdRol === 1) {
                    $('#contad').hide();
                    $('#tecnico').hide();
                    $('#adminis').show();
                } else if (response.d.objeto.IdRol === 2) {
                    $('#adminis').hide();
                    $('#tecnico').hide();
                    $('#contad').show();
                } else {
                    $('#adminis').hide();
                    $('#contad').hide();
                    $('#tecnico').show();
                }

            } else {
                window.location.href = 'Default.aspx';
            }

        }
    });
}



