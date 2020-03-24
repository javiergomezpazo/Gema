$(document).scroll(function() {

            var btn = $('#btnTop');
            var home = $('#nav_principal');

            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                btn.fadeIn("slow");
            } else {
                btn.fadeOut("slow");
            }
        });

        $(document).ready(function() {
            $("#btnTop").click(backtoTop);
            $("#cerrar").click(cerrarDivCookies); //cerrar div cookies
            comprobarConexion();//mostra elementos en nav
        });

        function backtoTop() {
            $('body, html').animate({
                scrollTop: '0px'
            }, 1000);
        }

        function cerrarDivCookies() {
            var div = $("#bannerCookies");
            div.fadeOut("slow");
        }
        
        function comprobarConexion() {
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var respuesta = (this.responseText);
                        console.log(respuesta);
                        if(respuesta=="true"){
                            $("#ul_connect").html("");
                            $('<div class="row px-0 py-3"><li class=" nav-item"><a href="#" class="nav-link px-0 py-3 montserrat_light">Javier Denega</a></li><li class=" nav-item dropdown"><a class="nav-link dropdown-toggle pl-3 py-3" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-user"></i> </a><div class="dropdown-menu py-0" aria-labelledby="navbarDropdownMenuLink"> <a class="dropdown-item text-dark p-2 pl-3 text-left" href="perfil.html">Profile</a> <a class="dropdown-item text-dark p-2 pl-3" href="History">History</a> <p class="dropdown-item text-danger p-2 pl-3 mb-0" id="log_out">Log Out</p>  </div> </li>                </div>').appendTo($("#ul_connect")); 
                        }else{
                            $("#ul_connect").html("");                            
                            $('<li class="nav-item"><a href="login.html" class="nav-link  pl-4 pr-0 py-3"><button type="button" class="btn btn-outline-light">Login</button></a></li>                <li class="nav-item"><a href="SignUp.html" class="nav-link  pl-4 pr-0 py-3"><button type="button" class="btn btn-warning">Sign Up</button></a></li>').appendTo($("#ul_connect"));
                            $(' <div id="footer_boton_connect"> <a href="login.html"><button type="button" class="btn btn-outline-light mt-3">Login</button></a>  <a href="SignUp.html"><button type="button" class="btn btn-warning mt-3">Sign Up</button></a>  </div>').insertBefore($("#footer_botones").children()[0]);
                            
                        }
                    }
                };
                xhttp.open("POST", "Actions.php", true);
                xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp.send("function=comprobarSession_AJAX");

            }