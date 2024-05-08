<?php
include 'dbConnection.php';

header("Access-Control-Allow-Origin: http://localhost:5500");
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");

header("Content-Type: application/json");


$sql = "SELECT *
FROM predstave
JOIN karte ON predstave.IDPredstava = karte.IDPredstava;
";
$result = $conn->query($sql);

$predstave = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $encodedImage = base64_encode($row["Slika"]);

        $predstava = array(
            "naziv" => $row["NazivPredstave"],
            "datum" => date("d.m.Y", strtotime($row["Datum"])),
            "termin" => date("H:i", strtotime($row["Vreme"])),
            "cena" => $row["Cena"],
            "reziser" => $row["Reziser"],
            "trajanje" => $row["Trajanje"],
            "slika" => $encodedImage,
            "zanr" => $row["Zanr"],
            "uloge" => $row["Uloge"],
            "opis" => $row["Opis"]
        );
        array_push($predstave, $predstava);
    }
} else {
    echo "Nema rezultata.";
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($predstave);
?>