<?php
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pozoriste";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>