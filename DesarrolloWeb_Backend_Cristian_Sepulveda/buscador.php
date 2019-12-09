<?php
$data_file = fopen("data-1.json","r");
$data_readed = fread($data_file, filesize("data-1.json"));
fclose($data_file);
$data = json_decode($data_readed);

$ciudad = $_POST["ciudad"];
$tipo =  $_POST["tipo"];
$precio_desde = $_POST["desde"];
$precio_hasta = $_POST["hasta"];

//print_r("DESDE:".$precio_desde);
//print_r("HASTA:".$precio_hasta);
$respuesta = [];
$i = 0;
foreach ($data as $key => $value) {
$precio=substr($value->Precio,1,strlen($value->Precio));
  if($value->Ciudad == $ciudad && $ciudad != "Elige una ciudad"){
    if($value->Tipo == $tipo && $tipo != "Elige un tipo"){
      if(($precio >= $precio_desde) && ($precio <= $precio_hasta)){
        $respuesta[$i][0]=$value->Direccion;
        $respuesta[$i][1]=$value->Ciudad;
        $respuesta[$i][2]=$value->Telefono;
        $respuesta[$i][3]=$value->Codigo_Postal;
        $respuesta[$i][4]=$value->Tipo;
        $respuesta[$i][5]=$value->Precio;
        $i++;
      }
    }
    elseif (($tipo == "Elige un tipo") && ($precio >= $precio_desde) && ($precio <= $precio_hasta)){
      $respuesta[$i][0]=$value->Direccion;
      $respuesta[$i][1]=$value->Ciudad;
      $respuesta[$i][2]=$value->Telefono;
      $respuesta[$i][3]=$value->Codigo_Postal;
      $respuesta[$i][4]=$value->Tipo;
      $respuesta[$i][5]=$value->Precio;
      $i++;
    }
  }
  elseif ( $ciudad =="Elige una ciudad" && $value->Tipo == $tipo && $tipo!="Elige un tipo"){
    if(($precio >= $precio_desde) && ($precio <= $precio_hasta)){
      $respuesta[$i][0]=$value->Direccion;
      $respuesta[$i][1]=$value->Ciudad;
      $respuesta[$i][2]=$value->Telefono;
      $respuesta[$i][3]=$value->Codigo_Postal;
      $respuesta[$i][4]=$value->Tipo;
      $respuesta[$i][5]=$value->Precio;
      $i++;
    }
  }
  elseif ($ciudad =="Elige una ciudad" && $tipo == "Elige un tipo" && ($precio >= $precio_desde) && ($precio <= $precio_hasta)) {
    $respuesta[$i][0]=$value->Direccion;
    $respuesta[$i][1]=$value->Ciudad;
    $respuesta[$i][2]=$value->Telefono;
    $respuesta[$i][3]=$value->Codigo_Postal;
    $respuesta[$i][4]=$value->Tipo;
    $respuesta[$i][5]=$value->Precio;
    $i++;
  }

}
//print_r($ciudad);
if (empty($respuesta)) {
  $respuesta[0][0] = "No hubo coincidencias con su búsqueda.";
  echo json_encode($respuesta);

  //   echo "No hubo coincidencias con su búsqueda.";
}
else {
  echo json_encode($respuesta);
}


//print($tipo);
//echo $precio_desde;
//echo $precio_hasta;

?>
