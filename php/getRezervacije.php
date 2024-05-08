<?php
include 'dbConnection.php';
header("Access-Control-Allow-Origin: http://localhost:5500");
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");

header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

class Rezervacija {
    public $IDRezervacija;
    public $IDPredstava;
    public $IDKorisnik;
    public $BrojSedista;

    public function __construct($IDRezervacija, $IDPredstava, $IDKorisnik, $BrojSedista) {
        $this->IDRezervacija = $IDRezervacija;
        $this->IDPredstava = $IDPredstava;
        $this->IDKorisnik = $IDKorisnik;
        $this->BrojSedista = $BrojSedista;
    }

    public static function getAllResevations() {
        global $conn;

        $sql = "SELECT * FROM rezervacije";

        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $result = $stmt->get_result();
        
        $rez = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $rezervacija = new Rezervacija(
                    $row["IDRezervacija"],
                    $row["IDPredstava"],
                    $row["IDKorisnik"],
                    $row["BrojSedista"]
                );
                array_push($rez, $rezervacija);
            }
            $stmt->close();
            return json_encode($rez);
        } else {
            return [];
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['getAllResevations'])) {
    $rezervacije = Rezervacija::getAllResevations();

    
    if ($rezervacije !== "") {
        echo $rezervacije;
    } else {
        echo json_encode([]);
    }
}

$conn->close();
?>
