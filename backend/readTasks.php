<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
header("Access-Control-Expose-Headers: access-control-allow-origin");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    $servername = "mysql";
    $username = "user";
    $password = "test";
    $base = "react_php";

    $conn = mysqli_connect($servername, $username, $password, $base);
    
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    $info = array();
    $lista_sql = $conn ->query("SELECT
    `id`, `text`, `done`
    FROM texts WHERE flag = '0'");
    if ($lista_sql->num_rows > 0){
        while($row = $lista_sql->fetch_assoc()){
            $info[] = $row;
        }
    }
    echo json_encode($info);
?>
