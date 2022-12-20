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

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$completed = 0;
if($_POST['completed']) {
    $completed = 1;
}

$query = "UPDATE `texts` SET `done` = '{$completed}'";

if(!mysqli_query($conn, $query)) {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
?>
