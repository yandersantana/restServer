var v;
var controladorImagenes = 0;
//ver todos los cuentos que hay
function escribirPreguntas(pregunta, imagenes, respuesta) {
    console.log("soy imagenes"+imagenes[0].src+imagenes[1].src +imagenes[2].src  )
    $("#validacion").append('<div class="container"><h1>' + pregunta + '</h1><div class="row"><div class="col-lg-3"><a id="1"><img   alt=" " class="img-responsive" src="' + imagenes[0].src + '  "></a></div><div class="col-lg-3"><a id="2"><img   alt=" " class="img-responsive" src="' + imagenes[1].src + '  "></a></div><div class="col-lg-3"><a id="3"><img   alt=" " class="img-responsive" src="' + imagenes[2].src + '  "></a></div></div></div>');

    $('body').on('click', '#validacion a', function () {
        iden = $(this).attr('id'); //extrae el id de la imagen clickeada
        if (iden == respuesta) { //si el id es igual a la respuesta
            alert("c: Eres genial Respuesta Correcta");
        } else {
            alert(":c Pum pin pum pin");
        }
    })

}

function indiceCuentos() {

    $("#principal").empty();
    peticionCuentos(function (result) {

        $.each(result, function (index, elem) {
            var img;
            console.log(elem);
            var datosid = elem.id;
            peticionImagenes(elem, function (imagen) {
                //  alert("Pinterest amigos")
                $("#principal").append('<li><a id=' + elem.id + '><h2 class="myTitle">' + elem.title + '</h2><p class="myId">'+elem.id+'</p><div class="col-lg-4"> <img class="imagenesCuentos"  src=' + imagen[0].src + '></div></li>');

            });
        });
    });
} 

//ver imagenes
function peticionImagenes(elem, callback) {
    var img;
    console.log(elem);
    $.ajax({
        url: '/imagenes',
        type: 'POST',
        data: elem,
        cache: false,

        success: function (data) {
            img = data;
            callback(img);
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");

        }
    });

}

function peticionImagenesPreguntas(elem, callback) {
    var objImg;
    console.log(elem);
    $.ajax({
        url: '/imagenesPreguntas',
        type: 'POST',
        data: elem,
        cache: false,

        success: function (data) {
            objImg = data;
            callback(objImg);
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");

        }
    });

}

function peticionPreguntas(elem, callback) {
    var objPre;
    console.log(elem);
    $.ajax({
        url: '/preguntas',
        type: 'POST',
        data: elem,
        cache: false,

        success: function (data) {
            console.log(data);
            console.log(data);
            objPre = data;
            callback(objPre);
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");

        }
    });

}

function peticionAudios(elem, callback) {
    var audio;
    console.log(elem);
    $.ajax({
        url: '/audios',
        type: 'POST',
        data: elem,
        cache: false,

        success: function (data) {
            console.log(data);
            console.log(data);
            audio = data;
            callback(audio);
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");

        }
    });

}

function peticionCuentos(callback) {
    var datos = "";
    $.ajax({
        url: '/cargar',
        type: 'GET',

        cache: false,
        contentType: false,
        processData: false,

        success: function (data) {
            datos = data;
            console.log("holaaa" + datos);
            callback(datos);
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");

        }
    });

}



function mostrarCuento(e) {
    //llamas a la peticion
    peticionCuentos(function (result) {

        $.each(result, function (index, elem) { //elem es el cuento que trae
            var datosid = elem.id;

            if (datosid == e) {

                $(".col-lg-10").empty(); //elimina todos los nodos que tenga
                $("#nombreCuento").text(elem.title);
                $("#descripcion").text(elem.description);
                $("#creditos").text(elem.credits);
                //elem es el parametro e imagen es lo q devuelve en el callback
                peticionImagenes(elem, function (imagen) {
                    peticionAudios(elem, function (audio) {
                        var nrodeImagen = 0;
                        var nrodeAudio = 0;
                        //solo llama a la primera
                        $(".col-lg-10").append('<img   alt=" " class="img-responsive" src="' + imagen[0].src + '  ">');
                        $("#au").empty();
                        if (audio[0] != undefined) {
                            $("#au").append("<audio controls><source src='" + audio[0].src + "' type='audio/mpeg'></audio>");
                        }
                        var nroDePregunta = 1;


                        //cuando da click a siguiente
                        $("#siguiente").click(function () {
                            //pregunta 1
                            if (nrodeImagen == 1 && nroDePregunta == 1) {
                                nroDePregunta = 2;
                                $(".col-lg-10").empty(); //elimina todos los nodos que tenga
                                peticionPreguntas(elem, function (pre) {
                                    if (pre[0] != undefined) { //si existen preguntas
                                        peticionImagenesPreguntas(pre[0], function (imPreg) {
                                            if (imPreg != undefined) { //si hay imagenes de las preguntas
                                                escribirPreguntas(pre[0].question, imPreg, pre[0].answer); //llama a la funcion 

                                            }
                                        });
                                    }


                                });

                            } //sino es =1 se va a la pregunta 2 la tercera vez que clickea siguiente
                            else if (nrodeImagen == 3 && nroDePregunta == 2) {
                                nroDePregunta = 1; //vuelve a su estado inicial
                                $(".col-lg-10").empty(); //elimina todos los nodos que tenga
                                peticionPreguntas(elem, function (pre) {
                                    if (pre[1] != undefined) { //si existen preguntas
                                        peticionImagenesPreguntas(pre[1], function (imPreg) {
                                            if (imPreg != undefined) { //si hay imagenes de las preguntas
                                                escribirPreguntas(pre[1].question, imPreg, pre[1].answer); //llama a la funcion 

                                            }
                                        });
                                    }


                                });

                            } else {

                                $("#au").empty();
                                $(".col-lg-10").empty();
                                nrodeImagen++;
                                nrodeAudio++;
                                console.log("final es" + imagen.length);
                                if (nrodeImagen < imagen.length) { //si hay imagenes en el arreglo
                                    $(".col-lg-10").append('<img   alt=" " class="img-responsive" src="' + imagen[nrodeImagen].src + '  ">');

                                } else { //
                                    alert("fin del cuento");

                                    $("#siguiente").prop('disabled', true); //cuando llegue a la ultima se deshabilita el boton sgt
                                }
                                //audio
                                if (nrodeAudio < audio.length && audio[nrodeAudio] != undefined) {

                                    $("#au").append("<audio controls><source src='" + audio[nrodeAudio].src + "' type='audio/mpeg'></audio>");
                                }
                            }
                        });

                        $("#anterior").click(function () {
                            $("#siguiente").prop('disabled', false); //cuando llegue a la ultima se deshabilita el boton sgt
                            nrodeImagen = 0;
                            nrodeAudio = 0;
                            console.log(nrodeImagen);
                            $(".col-lg-10").empty();
                            $(".col-lg-10").append('<img   alt=" " class="img-responsive" src="' + imagen[0].src + '  ">');
                            $("#au").empty();
                            if (audio[0] != undefined) {
                                $("#au").append("<audio controls><source src='" + audio[0].src + "' type='audio/mpeg'></audio>");
                            }
                        });

                    });
                });
            }
        });
    });

}



$(document).ready(function () {

    indiceCuentos();




    //Ver cuentos
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        location.reload();
        modal.style.display = "none";

    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";

        }
    }


    $('body').on('click', '#principal a', function () {
        modal.style.display = "block";
        var v = $(this).attr('id');
        alert("Has seleccionado el cuento " + v);
        mostrarCuento(v);
    })

});



/*
//exportar Json para el usuario
function exportar(arrayCuentos) {
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(arrayCuentos)); //preparo la data para ser adjuntada al link de exportación
    $('.exportar').attr('href', 'data:' + data);
    //var slug = string_to_slug(title); //convierto el titulo de la partirura a slug para que el archivo contenga ese nombre
    $('.exportar').attr('download', 'pix-data-cuentos.json'); // indico el nombre con el cual se descargará el archivo
    $('.exportar').trigger('click'); // El trigger() método activa el evento especificado y el comportamiento predeterminado de un evento 
}*/