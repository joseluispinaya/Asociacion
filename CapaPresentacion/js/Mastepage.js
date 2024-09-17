

$(document).ready(async function () {

    const tokenSesion = sessionStorage.getItem('tokenSesion');
    const usuarioL = sessionStorage.getItem('usuarioA');

    if (tokenSesion && usuarioL) {
        // Parsear el usuario almacenado
        const usuParaenviar = JSON.parse(usuarioL);
        const idUsu = usuParaenviar.IdUsuario; // Obtener IdUsuario

        // Llamar a obtenerDetalleUsuarioR pasando el IdUsuario
        await oDetalleUsuarioR(idUsu);
    } else {
        // Si no hay sesión, redirigir al login
        window.location.href = 'Login.aspx';
    }
});


$('#salirs').on('click', async function (e) {
    e.preventDefault();
    await CerrarSesion();
});


async function oDetalleUsuarioR(idUsu) {
    try {
        const response = await $.ajax({
            type: "POST",
            url: "Inicio.aspx/ObtenerToken",
            data: JSON.stringify({ IdUsu: idUsu }),
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
        });

        if (response.d.estado) {
            const tokenSession = sessionStorage.getItem('tokenSesion');
            if (tokenSession !== response.d.valor) {
                await CerrarSesion();
            } else {
                const usuario = JSON.parse(sessionStorage.getItem('usuarioA'));
                updateUserProfile(usuario);
                updateUserRoleUI(usuario.IdRol);
            }
        } else {
            redirectToLogin();
        }
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        window.location.href = 'Login.aspx';
        //handleAjaxError(error);
    }
}

function handleAjaxError(error) {
    console.error("Error:", error.status + " \n" + error.responseText + "\n" + error.thrownError);
    // Puedes mostrar un mensaje en la UI si lo deseas
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
    window.location.href = 'Login.aspx';
}

async function CerrarSesion() {
    try {
        const response = await $.ajax({
            type: "POST",
            url: "Inicio.aspx/CerrarSesion",
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
        });

        if (response.d.estado) {
            sessionStorage.clear();
            window.location.replace('Login.aspx');
        }
    } catch (error) {
        handleAjaxError(error);
    }
}
