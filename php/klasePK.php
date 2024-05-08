<?php

    class Predstava {
        public $IDPredstava;
        public $NazivPredstave;
        public $Zanr;
        public $Reziser;
        public $Trajanje;
        public $Uloge;
        public $Opis;
        public $Slika;

        public function __construct($idPredstava, $naziv, $zanr, $reziser, $trajanje, $uloge, $opis, $slika) {
            $this->IDPredstava = $idPredstava;
            $this->NazivPredstave = $naziv;
            $this->Zanr = $zanr;
            $this->Reziser = $reziser;
            $this->Trajanje = $trajanje;
            $this->Uloge = $uloge;
            $this->Opis = $opis;
            $this->Slika = $slika;
        }

        public static function getAllPerformances() {
            global $conn;

            $sql = "SELECT *
            FROM predstave
            JOIN karte ON predstave.IDPredstava = karte.IDPredstava";

            $result = $conn->query($sql);

            $predstave = array();

            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $predstava = new Predstava(
                        $row["IDPredstava"],
                        $row["NazivPredstave"],
                        $row["Zanr"],
                        $row["Reziser"],
                        $row["Trajanje"],
                        $row["Uloge"],
                        $row["Opis"],
                        base64_encode($row["Slika"])
                    );
                    $newDate = date("d.m.Y", strtotime($row["Datum"]));
                    $newTime = date("H:i", strtotime($row["Vreme"]));

                    $karta = new Karta(         
                        $row["Cena"],
                        $row["BrojKarte"],
                        $newDate,
                        $newTime,
                        $row["IDPredstava"]
                    );
                
                    $objedinjeniPodaci = new stdClass();
                    $objedinjeniPodaci->predstava = $predstava;
                    $objedinjeniPodaci->karta = $karta;
                
                    array_push($predstave, $objedinjeniPodaci);
                }
            } else {
                echo "Nema rezultata.";
            }
            return json_encode($predstave);
        }

        public static function createPerformance($naziv, $zanr, $reziser, $trajanje, $uloge, $opis, $slika) {
            global $conn;
    
            $sql_predstava = "INSERT INTO predstave (NazivPredstave, Zanr, Reziser, Trajanje, Uloge, Opis, Slika) VALUES (?, ?, ?, ?, ?, ?, ?)";
            $stmt_predstava = $conn->prepare($sql_predstava);
            $stmt_predstava->bind_param("sssssss", $naziv, $zanr, $reziser, $trajanje, $uloge, $opis, $slika);
    
            $rezultat_predstava = $stmt_predstava->execute();
    
            if ($rezultat_predstava) {
                return $conn->insert_id;
            } else {
                return false;
            }
    
            $stmt_predstava->close();
        }

        public static function deletePerformance($idPredstava) {
            global $conn;
            $sql = "DELETE FROM predstave WHERE IDPredstava = ?";
        
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $idPredstava);
        
            if ($stmt->execute()) {
                return true;
            } else {
                return false;
            }
        }
    }

    class Karta {
        public $Cena;
        public $BrojKarte;
        public $Datum;
        public $Vreme;
        public $IDPredstave;

        public function __construct($cena, $brojKarte, $datum, $vreme, $idPredstava) {
            $this->Cena = $cena;
            $this->BrojKarte = $brojKarte;
            $this->Datum = $datum;
            $this->Vreme = $vreme;
            $this->IDPredstave = $idPredstava;
        }

        public static function createTicket($cena, $brojKarte, $datum, $vreme, $idPredstava) {
            global $conn;
    
            $sql_karta = "INSERT INTO karte (Cena, BrojKarte, Datum, Vreme, IDPredstava) VALUES (?, ?, ?, ?, ?)";
            $stmt_karta = $conn->prepare($sql_karta);
            $stmt_karta->bind_param("iissi", $cena, $brojKarte, $datum, $vreme, $idPredstava);
    
            $rezultat_karta = $stmt_karta->execute();
    
            if ($rezultat_karta) {
                return true;
            } else {
                return false;
            }

            $stmt_karta->close();
        }
    }
?>
