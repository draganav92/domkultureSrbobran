<?php
include 'dbConnection.php';

header("Access-Control-Allow-Origin: http://localhost:5500");
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Content-Type: application/json");

class KontaktPoruka {
    public $id;
    public $ime;
    public $prezime;
    public $email;
    public $poruka;

    public function __construct($ime, $prezime, $email, $poruka) {
        $this->ime = $ime;
        $this->prezime = $prezime;
        $this->email = $email;
        $this->poruka = $poruka;
    }

    public function createMessage() {
        global $conn;

        $sql = "INSERT INTO kontaktporuke (ime, prezime, email, poruka) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssss", $this->ime, $this->prezime, $this->email, $this->poruka);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST" &&
    !empty($_POST['ime']) && !empty($_POST['prezime']) &&
    !empty($_POST['email']) && !empty($_POST['poruka']))
{
    $ime = $_POST['ime'];
    $prezime = $_POST['prezime'];
    $email = $_POST['email'];
    $poruka = $_POST['poruka'];

    $porukaObj = new KontakPoruka($ime, $prezime, $email, $poruka);
    
    if ($porukaObj->createMessage()) {
        echo json_encode(array("message" => "Vaša poruka je uspješno poslana."));
    } else {
        echo json_encode(array("message" => "Greška prilikom slanja poruke"));
    }
} else {
    echo json_encode(array("message" => "Greška: Nedostaju podaci iz forme."));
}

$conn->close();
?>
