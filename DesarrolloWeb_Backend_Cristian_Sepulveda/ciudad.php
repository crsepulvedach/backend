<?php
$data_file = fopen("data-1.json","r");
$data_readed = fread($data_file, filesize("data-1.json"));
fclose($data_file);
$data = json_decode($data_readed);
$city = [];
$i = 0;
foreach ($data as $key => $value) {
  //print_r($value);
  //print_r($value->Ciudad);
  if (in_array($value->Ciudad , $city)) {
    //pass ;
  }
  else{
    $city[$i]=$value->Ciudad;
    $i++;
  }
}
//echo $city
//echo i


  //print_r($city);
  echo json_encode($city);
  //$data = json_decode($data_readed, true);
  //echo json_encode($data_readed);
  ?>
