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

if (empty($_POST)) die();
$query = "INSERT INTO `texts` (`id`, `text`, `keyTask`, `done`, `flag`) VALUES (NULL, '{$_POST["task"]}', NULL, '0', '0')";

$lastTask = array();

if(mysqli_query($conn, $query)) {
    $lista_sql = $conn ->query("SELECT
    *
    FROM texts ORDER BY id DESC LIMIT 1");
    if ($lista_sql->num_rows > 0){
        while($row = $lista_sql->fetch_assoc()){
            $lastTask[] = $row;
        }
    }
    echo json_encode($lastTask);
}
else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
?>
