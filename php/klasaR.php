<?php
    header("Access-Control-Allow-Origin: http://localhost:5500");
    header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
    header("Content-Type: application/json");

    include 'dbConnection.php';

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

        public static function constructWithoutID($IDPredstava, $IDKorisnik, $BrojSedista) {
            return new self(null, $IDPredstava, $IDKorisnik, $BrojSedista);
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

        public static function getAllReservationsByIDPerformance($idPred) {
            global $conn;
            $sql = "SELECT *
            FROM rezervacije
            WHERE IDPredstava = ?";

            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $idPred);
            $stmt->execute();

            $result = $stmt->get_result();

            $rez = array();

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
                $conn->close();
                return json_encode($rez);
            }
            else
            {
                $rez = array();
                $rezervacija = new Rezervacija(
                    0,
                    0,
                    0,
                    0
                );
                array_push($rez, $rezervacija);
                $stmt->close();
                $conn->close();
                return json_encode($rez);
            }
        }

        public static function createReservation($rezervacije) {
            global $conn;
            $response = array();
        
            $query = "INSERT INTO rezervacije (IDPredstava, IDKorisnik, BrojSedista)
                      VALUES (?, ?, ?)";

            $stmt = $conn->prepare($query);
        
            foreach($rezervacije as $rezervacija) {
                if(isset($rezervacija['IDPredstave']) && isset($rezervacija['IDKorisnika']) && isset($rezervacija['sediste'])) {
                    $objRezervacija = Rezervacija::constructWithoutID(
                        $rezervacija['IDPredstave'],
                        $rezervacija['IDKorisnika'],
                        $rezervacija['sediste']
                    );
                
                    $stmt->bind_param("iii", $objRezervacija->IDPredstava, $objRezervacija->IDKorisnik, $objRezervacija->BrojSedista);
                
                    if($stmt->execute()) {
                        $response[] = array(
                            "success" => true,
                            "message" => "Rezervacija uspešno dodata."
                        );
                    } else {
                        $response[] = array(
                            "success" => false,
                            "message" => "Došlo je do greške prilikom dodavanja rezervacije: " . $stmt->error
                        );
                    }
                } else {
                    $response[] = array(
                        "success" => false,
                        "message" => "Nedostaju ključevi u nizu rezervacije."
                    );
                }
            }
        
            return json_encode($response);
        }

        public static function deleteReservation($reservationId) {
            global $conn;

            $query = "DELETE FROM rezervacije WHERE IDRezervacija = ?";

            $stmt = $conn->prepare($query);
            $stmt->bind_param("i", $reservationId);

            if ($stmt->execute()) {
                return true;
            } else {
                return false;
            }
        }


    }


    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if(isset($_POST['idPredstave'])) {
            $idPredstave = $_POST['idPredstave'];
            $rez = Rezervacija::getAllReservationsByIDPerformance($idPredstave);
            echo json_encode($rez);
        }
        else if (isset($_POST['rezervacije'])) {
            $rezervacije = json_decode($_POST['rezervacije'], true);
            if (count($rezervacije) === 0) {
                echo json_encode(array("message" => "Nema rezervacija za slanje."));
                return;
            }

            $rez = Rezervacija::createReservation($rezervacije);
            echo $rez;
        }
        else if (isset($_POST['deleteReservationId'])) {
            $deleteReservationId = $_POST['deleteReservationId'];
            $success = Rezervacija::deleteReservation($deleteReservationId);
            if ($success) {
                echo json_encode(array("success" => true, "message" => "Rezervacija uspešno obrisana."));
            } else {
                echo json_encode(array("success" => false, "message" => "Došlo je do greške prilikom brisanja rezervacije."));
            }
        }
    }
    else {
        echo json_encode(array("message" => "Greška: Nisu prosleđeni parametri preko POST."));
    }
?>
