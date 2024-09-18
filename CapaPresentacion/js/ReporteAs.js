

$(document).ready(function () {
    dtPresidente();
});

function dtPresidente() {
    $.ajax({
        type: "POST",
        url: "ReporteAs.aspx/ObtenerPresidentes",
        data: '{}',
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (data) {
            if (data.d.estado) {
                var presidentes = data.d.objeto; // Lista de presidentes

                // Limpiar el contenedor antes de agregar las nuevas cards
                $("#addPres").empty();

                var htmlContent = '';

                // Iterar sobre los presidentes y generar las cards dinámicamente
                $.each(presidentes, function (index, presidente) {
                    htmlContent += `
                        <div class="col-xl-4 col-md-6">
                            <div class="cardz">
                                <div class="headz">
                                    <div class="circlez"></div>
                                    <div class="imgz">
                                        <img src="${presidente.ImageFull}" alt="">
                                    </div>
                                </div>
                                <div class="descriptionz">
                                    <h3>${presidente.Nombres}</h3>
                                    <h4>${presidente.Apellidos}</h4>
                                    <p>Presidente responsable de la asociación -- ${presidente.oAsociacion.Nombre}</p>
                                </div>
                                <div class="contactz">
                                    <a href="#" onclick="verAfiliados(${presidente.Idasoci})">Ver Afiliados</a>
                                </div>
                            </div>
                        </div>`;
                });

                // Insertar el HTML generado en el contenedor
                $("#addPres").html(htmlContent);
            } else {
                console.log("Error al obtener los presidentes.");
            }
        }
    });
}

// Función para manejar el evento de "Ver Afiliados"
function verAfiliados(Idasoci) {
    console.log("Ver afiliados de la asociación con ID: " + Idasoci);
    // Por ejemplo, redirigir a otra página:
    // window.location.href = "VerAfiliados.aspx?Idasoci=" + Idasoci;
}

//$(document).ready(function () {
//    dtPresidente();
//})


//function dtPresidente() {

//    $.ajax({
//        type: "POST",
//        url: "ReporteAs.aspx/ObtenerPresidentes",
//        data: {},
//        contentType: 'application/json; charset=utf-8',
//        dataType: "json",
//        error: function (xhr, ajaxOptions, thrownError) {
//            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
//        },
//        success: function (data) {
//            if (data.d.estado) {
//                var presidentes = data.d.objeto;
//            }

//        }
//    });
//}