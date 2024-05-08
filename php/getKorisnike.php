<?php
include 'dbConnection.php';
header("Access-Control-Allow-Origin: http://localhost:5500");
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");

header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

class Korisnik {
    public $IDKorisnik;
    public $Username;
    public $Password;
    public $Email;

    public function __construct($IDKor, $Username, $Password, $Email) {
        $this->IDKorisnik = $IDKor;
        $this->Username = $Username;
        $this->Password = $Password;
        $this->Email = $Email;
    }

    public static function getAllUsers() {
        global $conn;

        $sql = "SELECT * FROM korisnici";

        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $result = $stmt->get_result();
        
        $kor = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $korisnik = new Korisnik(
                    $row["IDKorisnik"],
                    $row["Username"],
                    $row["Password"],
                    $row["Email"]
                );
                array_push($kor, $korisnik);
            }
            $stmt->close();
            return json_encode($kor);
        } else {
            return [];
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['getAllUsers'])) {
    $korisnici = Korisnik::getAllUsers();

    if ($korisnici !== "") {
        echo $korisnici;
    } else {
        echo json_encode([]);
    }
}

$conn->close();
?>
