$(document).ready(function(){
  var inputCiudad = $("#selectCiudad")
  inputCiudad.before("<br><br>");
  inputCiudad.attr('style','display: block;')

  var inputTipo = $("#selectTipo");
  inputTipo.before("<br>");
  inputTipo.attr('style','display: block;');

  $.ajax({
    dataType: "json",
    type: "POST",
    url: 'ciudad.php',
    data:{},
    success: function (obj) {
      //console.log(obj);
      var res = obj;
      var data = [];
      for (var i in res) {
        $("#selectCiudad").append('<option value="'+res[i]+'">'+res[i]+'</option>');
      }
    }
  })

  $.ajax({
    dataType: "json",
    type: "POST",
    url: 'tipo.php',
    data:{},
    success: function (obj) {
      //console.log(obj);
      var res = obj;
      var data = [];
      for (var i in res) {
        $("#selectTipo").append('<option value="'+res[i]+'">'+res[i]+'</option>');
      }
    }
  })

})




$(".btn-flat").on("click",function(){
  $('.total').remove();
  $.ajax({
    dataType: "json",
    type: "POST",
    url: 'index.php',
    data:{},
    success: function (obj) {
      var res = JSON.parse(obj);
      var data = [];
      var ppal = document;
      var hijo = $('.colContenido')[0];
      for (var i in res) {
        var itemData = {};
        itemData.direccion = res[i].Direccion;
        itemData.ciudad = res[i].Ciudad;
        itemData.telefono = res[i].Telefono;
        itemData.cod_Postal = res[i].Codigo_Postal;
        itemData.tipo = res[i].Tipo;
        itemData.precio = res[i].Precio;
        data.push(itemData);
        var card = ppal.createElement('div');
        card.setAttribute('class','tituloContenido card total');
        var row01 = ppal.createElement('div');
        row01.setAttribute('class','row');
        var im1 = ppal.createElement('div');
        im1.setAttribute('class','col s3');
        im1.setAttribute('style','padding-left: 0px;padding-right: 0px;');
        row01.appendChild(im1)
        var im2 = ppal.createElement('img');
        im2.setAttribute('src','img/home.jpg');
        im2.setAttribute('style','width:100%');
        im1.appendChild(im2);
        card.appendChild(row01);
        var cuerpo = ppal.createElement('div');
        cuerpo.setAttribute('class','col s9');
        var lista = ppal.createElement('div');
        cuerpo.appendChild(lista);
        var b = ppal.createElement('div');
        b.setAttribute('class','divider');
        cuerpo.appendChild(b);
        var c = ppal.createElement('div');
        c.setAttribute('class','valign');
        cuerpo.appendChild(c);
        var e = ppal.createElement('div');
        var elem = ppal.createElement('button');
        elem.setAttribute('type','button');
        elem.setAttribute('name','mas');
        elem.setAttribute('class','btn-flat waves-effect right');
        elem.setAttribute('id',res[i].Id);
        elem.append("VER MAS");
        e.appendChild(elem);
        c.appendChild(e);
        var parte = ppal.createElement('ul');
        lista.appendChild(parte);
        //Inicio
        var subparte = ppal.createElement('li')
        parte.appendChild(subparte);
        subparte.append("Dirección: "+res[i].Direccion);

        subparte = ppal.createElement('li')
        parte.appendChild(subparte);
        subparte.append("Ciudad: "+res[i].Ciudad);

        subparte = ppal.createElement('li')
        parte.appendChild(subparte);
        subparte.append("Teléfono: "+res[i].Telefono);

        subparte = ppal.createElement('li')
        parte.appendChild(subparte);
        subparte.append("Código Postal: "+res[i].Codigo_Postal);

        subparte = ppal.createElement('li')
        parte.appendChild(subparte);
        subparte.append("Tipo: "+res[i].Tipo);

        subparte = ppal.createElement('li')
        parte.appendChild(subparte);
        subparte.append("Precio: "+res[i].Precio);

        row01.appendChild(cuerpo);
        hijo.appendChild(card)

      };
    }
  })
  .done(function( data, textStatus, jqXHR ) {
    if ( console && console.log ) {
      console.log( "La solicitud se ha completado correctamente." );
    }
  })
  .fail(function( jqXHR, textStatus, errorThrown ) {
    if ( console && console.log ) {
      console.log( "La solicitud a fallado: " +  textStatus);
    }
  });
});



$("#submitButton").on("click",function(e){
  e.preventDefault();
  $('.total').remove();
  ciudad = document.getElementById('selectCiudad').selectedOptions[0].innerText;
  tipo = document.getElementById('selectTipo').selectedOptions[0].innerText;
  //  desde=document.getElementsByClassName('irs-from')[0].innerText;
  //  hasta=document.getElementsByClassName('irs-to')[0].innerText;
  desde=from;
  hasta=to;
  resultado=document.getElementsByClassName('tituloContenido card');
  if (resultado.length>1) {
    for(var i=0;i<resultado.length;i++){
      resultado[1].remove();
    }
  }
  $.ajax(
    {
      type: "POST",
      url: 'buscador.php',
      data: {ciudad: ciudad, tipo: tipo, desde: desde, hasta: hasta},
      success: function (obj) {
        console.log(obj);
        var res = JSON.parse(obj);
        var data = [];
        var ppal = document;
        var hijo = $('.colContenido')[0];

        if (res[0][0]=="No hubo coincidencias con su b\u00fasqueda."){
          var card = ppal.createElement('div');
          card.setAttribute('class','tituloContenido card total');
          var row01 = ppal.createElement('div');
          row01.setAttribute('class','row');
          var parte = ppal.createElement('ul');

          card.appendChild(row01);
          var cuerpo = ppal.createElement('div');
          cuerpo.setAttribute('class','col s9');
          var lista = ppal.createElement('div');
          cuerpo.appendChild(lista);
          lista.appendChild(parte);
          //Inicio
          var subparte = ppal.createElement('li')
          parte.appendChild(subparte);
          subparte.append("Mensaje: "+res[0][0]);
          row01.appendChild(cuerpo);
          hijo.appendChild(card)
        }
        else {



        for (var i in res) {
          var card = ppal.createElement('div');
          card.setAttribute('class','tituloContenido card total');
          var row01 = ppal.createElement('div');
          row01.setAttribute('class','row');
          var im1 = ppal.createElement('div');
          im1.setAttribute('class','col s3');
          im1.setAttribute('style','padding-left: 0px;padding-right: 0px;');
          row01.appendChild(im1)
          var im2 = ppal.createElement('img');
          im2.setAttribute('src','img/home.jpg');
          im2.setAttribute('style','width:100%');
          im1.appendChild(im2);
          card.appendChild(row01);
          var cuerpo = ppal.createElement('div');
          cuerpo.setAttribute('class','col s9');
          var lista = ppal.createElement('div');
          cuerpo.appendChild(lista);
          var b = ppal.createElement('div');
          b.setAttribute('class','divider');
          cuerpo.appendChild(b);
          var c = ppal.createElement('div');
          c.setAttribute('class','valign');
          cuerpo.appendChild(c);
          var e = ppal.createElement('div');
          var elem = ppal.createElement('button');
          elem.setAttribute('type','button');
          elem.setAttribute('name','mas');
          elem.setAttribute('class','btn-flat waves-effect right');
          elem.setAttribute('id',res[i].Id);
          elem.append("VER MAS");
          e.appendChild(elem);
          c.appendChild(e);
          var parte = ppal.createElement('ul');
          lista.appendChild(parte);
          //Inicio
          var subparte = ppal.createElement('li')
          parte.appendChild(subparte);
          subparte.append("Dirección: "+res[i][0]);

          subparte = ppal.createElement('li')
          parte.appendChild(subparte);
          subparte.append("Ciudad: "+res[i][1]);

          subparte = ppal.createElement('li')
          parte.appendChild(subparte);
          subparte.append("Teléfono: "+res[i][2]);

          subparte = ppal.createElement('li')
          parte.appendChild(subparte);
          subparte.append("Código Postal: "+res[i][3]);

          subparte = ppal.createElement('li')
          parte.appendChild(subparte);
          subparte.append("Tipo: "+res[i][4]);

          subparte = ppal.createElement('li')
          parte.appendChild(subparte);
          subparte.append("Precio: "+res[i][5]);

          row01.appendChild(cuerpo);
          hijo.appendChild(card)
        }
        }
      }
    }
  ).done(function(data){
    console.log(data);
  })

})
/*
Función que permite obtener los datos desde archivo con datos en json.
Creando por cada registro un elemento card para desplegar los datos.
*/
function leejson() {
  $.getJSON('data-1.json', function (data) {
    var ppal = document;
    var hijo = $('.colContenido')[0];
    $.each(data, function(idx, el){
      var card = ppal.createElement('div');
      card.setAttribute('class','tituloContenido card');
      var row01 = ppal.createElement('div');
      row01.setAttribute('class','row');
      var im1 = ppal.createElement('div');
      im1.setAttribute('class','col s3');
      im1.setAttribute('style','padding-left: 0px;padding-right: 0px;');
      row01.appendChild(im1)
      var im2 = ppal.createElement('img');
      im2.setAttribute('src','img/home.jpg');
      im2.setAttribute('style','width:100%');
      im1.appendChild(im2);

      card.appendChild(row01);
      var cuerpo = ppal.createElement('div');
      cuerpo.setAttribute('class','col s9');
      var lista = ppal.createElement('div');
      cuerpo.appendChild(lista);
      var b = ppal.createElement('div');
      b.setAttribute('class','divider');
      cuerpo.appendChild(b);
      var c = ppal.createElement('div');
      c.setAttribute('class','valign');
      cuerpo.appendChild(c);
      var e = ppal.createElement('div');
      var elem = ppal.createElement('button');
      elem.setAttribute('type','button');
      elem.setAttribute('name','mas');
      elem.setAttribute('class','btn-flat waves-effect right');
      elem.setAttribute('id',res[i].Id);
      elem.append("VER MAS");
      e.appendChild(elem);
      c.appendChild(e);
      var parte = ppal.createElement('ul');
      lista.appendChild(parte);
      //Inicio
      var subparte = ppal.createElement('li')
      parte.appendChild(subparte);
      subparte.append("Dirección: "+res[i].Direccion);

      subparte = ppal.createElement('li')
      parte.appendChild(subparte);
      subparte.append("Ciudad: "+res[i].Ciudad);

      subparte = ppal.createElement('li')
      parte.appendChild(subparte);
      subparte.append("Teléfono: "+res[i].Telefono);

      subparte = ppal.createElement('li')
      parte.appendChild(subparte);
      subparte.append("Código Postal: "+res[i].Codigo_Postal);

      subparte = ppal.createElement('li')
      parte.appendChild(subparte);
      subparte.append("Tipo: "+res[i].Tipo);

      subparte = ppal.createElement('li')
      parte.appendChild(subparte);
      subparte.append("Precio: "+res[i].Precio);

      r.appendChild(cuerpo);
      hijo.appendChild(card)
    });
  });
}




/*
Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};

var $range = $(".js-range-slider"),
$result = $(".js-result"),
$getvalues = $(".js-get-values"),
from = 200,
to = 80000;


var saveResult = function (data) {
  from = data.from;
  to = data.to;
};

// var writeResult = function () {
//     var result = "<br>De " + from + ", a: " + to;
//     $result.html(result);
// };

/*
Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: from,
    to: to,
    prefix: "$",
    onStart: function (data) {
      saveResult(data);
      //writeResult();
    },
    onChange: saveResult,
    onFinish: saveResult
  });
}

/*
Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){

}

inicializarSlider();









//$getvalues.on("click", writeResult);
