<?php
include 'dbConnection.php';
include 'klasePK.php'; // Uključujemo datoteku s definicijama klasa

header("Access-Control-Allow-Origin: http://localhost:5500");
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Content-Type: application/json");

$predstave = Predstava::getAllPerformances();

echo $predstave;

$conn->close();
?>