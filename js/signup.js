$(document).ready(function () {
    loadPaises();
    loadTipos();
    $("#formSocio").submit(comprobarUsuario);
    $("form").submit(function () {
        event.preventDefault();
    });
    $("#formInstitucion").submit(sendData);
});

function loadPaises() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var paises = JSON.parse(this.responseText);
            console.log(paises);
            var select_socio = $("select[name='pais_socio']");
            var select_institucion = $("select[name='pais_institucion']");
            for (var i = 0; i < paises.length; i++) {
                var option_socio = $("<option value='" + paises[i].id_pais + "'>" + paises[i].nombre + "</option>");
                option_socio.appendTo(select_socio);
                
                var option_institucion = $("<option value='" + paises[i].id_pais + "'>" + paises[i].nombre + "</option>");
                option_institucion.appendTo(select_institucion);
            }
        }
    };
    xhttp.open("POST", "Actions.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("function=getPaises");

}

function loadTipos() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var tipos = JSON.parse(this.responseText);
            console.log(tipos);
            var select = $("select[name='tipo_institucion']");
            for (var i = 0; i < tipos.length; i++) {
                var option = $("<option value='" + tipos[i].ID_TIPO_INSTITUCION + "'>" + tipos[i].tipo + "</option>");
                option.appendTo(select);
            }
        }
    };
    xhttp.open("POST", "Actions.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("function=getTipo_Institucion");

}

function comprobarUsuario() {
    var user_socio = $("input[name='usuario_socio']").val();
    var email_socio = $("input[name='email_socio']").val();
    var vat_socio = $("input[name='vat_socio']").val();
    console.log(vat_socio);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            if (this.responseText === "true") {
                $("#formSocio").css("display", "none");
                $("#formInstitucion").css("display", "block");
            } else {

            }
        }
    };
    xhttp.open("POST", "Actions.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("function=comprobarDatosUsuario" + "&&usuario_socio=" + user_socio + "&&email_socio=" + email_socio+"&&vat_socio=" + vat_socio );
}

function sendData() {
    console.log(1);
    var user_socio = $("input[name='usuario_socio']").val();
    var password_socio = $("input[name='password_socio']").val();
    var name_socio = $("input[name='name_socio']").val();
    var email_socio = $("input[name='email_socio']").val();
    var telephone_socio = $("input[name='telephone_socio']").val();
    var cargo_socio = $("input[name='cargo_socio']").val();
    var departamento_socio = $("input[name='departamento_socio']").val();
    var vat_socio = $("input[name='vat_socio']").val();
    var pais_socio = $("select[name='pais_socio']").val();
    

    var name_institucion = $("input[name='name_institucion']").val();
    var email_institucion = $("input[name='email_institucion']").val();
    var telephone_institucion = $("input[name='telephone_institucion']").val();
    var direccion_institucion = $("input[name='direccion_institucion']").val();
    var codigo_postal_institucion = $("input[name='codigo_postal_institucion']").val();
    var web_institucion = $("input[name='web_institucion']").val();
    var description_institucion = $("input[name='description_institucion']").val();
    var vat_institucion = $("input[name='vat_institucion']").val();
    var pais_institucion = $("select[name='pais_institucion']").val();
    var tipo_institucion = $("select[name='tipo_institucion']").val();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
console.log(this.responseText);
        }
    };
    xhttp.open("POST", "Actions.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("function=signUp" + "&&usuario_socio=" + user_socio + "&&password_socio=" + password_socio + "&&name_socio=" + name_socio + "&&email_socio=" + email_socio + "&&telephone_socio=" + telephone_socio + "&&cargo_socio=" + cargo_socio + "&&departamento_socio=" + departamento_socio + "&&vat_socio=" + vat_socio + "&&pais_socio=" + pais_socio + 
    "&&name_institucion=" + name_institucion + "&&email_institucion=" + email_institucion + "&&telephone_institucion=" + telephone_institucion + "&&direccion_institucion=" + direccion_institucion + "&&codigo_postal_institucion=" + codigo_postal_institucion + "&&vat_institucion=" + vat_institucion + "&&pais_institucion=" + pais_institucion + "&&description_institucion=" + description_institucion + "&&tipo_institucion=" + tipo_institucion + "&&web_institucion="+web_institucion);
}

function isNull() {

}
