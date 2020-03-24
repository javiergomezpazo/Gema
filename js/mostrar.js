var page = 1;
var array_index = [];

$(document).ready(function () {
    loadData();
    

});

function loadData() {
    console.log(2);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(3);
            var empresas = JSON.parse(this.responseText);
            console.log(empresas);
            var table = $("table tbody");
            if (page === 1) {
                /* Engadimos o numero de paxinas */
                for (var j = 1; j <= empresas.number_page; j++) {
                    if (page == j) {
                        $("<li class='nav-item'><a href='#' class='nav-link active pagina'>" + j + "</a></li>").appendTo($("#ul_page"));
                    } else {
                        $("<li class='nav-item'><a href='#' class='nav-link pagina'>" + j + "</a></li>").appendTo($("#ul_page"));
                    }
                }

$(".pagina").click(function () {
        console.log($(this).html());
        page=$(this).html();
    loadData();

    });
            } else {
                /*Eliminamos os td da anterior paxina*/
                var tr = $("tbody tr");
                tr.remove();
                
            }
            for (var i = 0; i < empresas[0].length; i++) {
                var tr = $("<tr></tr>");
                for (var key in empresas[0][i]) {
                    var td = $("<td>" + empresas[0][i][key] + "</td>");
                    td.appendTo(tr);
                }
                tr.appendTo(table);
            }

            page++;
        }
    };


    xhttp.open("POST", "Actions.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("function=mostrar_empresas&&page=" + page);
}
