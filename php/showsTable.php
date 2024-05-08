<?php
    include 'dbConnection.php';
    include 'klasePK.php';

    header("Access-Control-Allow-Origin: http://localhost:5500");
    header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
    header("Content-Type: application/json");

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if(count($_POST)==9)
        {
            if (
                isset($_POST['show-title']) && isset($_POST['show-genre']) && isset($_POST['show-director']) && 
                isset($_POST['show-duration']) && isset($_POST['show-roles']) && isset($_POST['show-description']) && 
                isset($_FILES['show-image']) && isset($_POST['show-tickets']) && isset($_POST['show-date']) && 
                isset($_POST['show-time'])
            ) {
                $naziv = $_POST['show-title'];
                $zanr = $_POST['show-genre'];
                $reziser = $_POST['show-director'];
                $trajanje = $_POST['show-duration'];
                $uloge = $_POST['show-roles'];
                $opis = $_POST['show-description'];
                $slika = $_FILES['show-image']['tmp_name'];
                $cena = $_POST['show-tickets'];
                $datum = $_POST['show-date'];
                $vreme = $_POST['show-time'];
    
                if (is_uploaded_file($slika)) {
                    $slikaBase64 = base64_encode(file_get_contents($slika));
    
                    $idPredstava = Predstava::createPerformance($naziv, $zanr, $reziser, $trajanje, $uloge, $opis, $slikaBase64);
    
                    if ($idPredstava) {
                        $rezultat = Karta::createTicket($cena, 50, $datum, $vreme, $idPredstava); 
    
                        if ($rezultat) {
                            echo json_encode(array("success" => true, "message" => "Predstava i karta uspešno dodati u bazu."));
                        } else {
                            echo json_encode(array("success" => false, "message" => "Došlo je do greške prilikom dodavanja karte u bazu."));
                        }
                    } else {
                        echo json_encode(array("success" => false, "message" => "Došlo je do greške prilikom dodavanja predstave u bazu."));
                    }
                } else {
                    echo json_encode(array("success" => false, "message" => "Došlo je do greške prilikom učitavanja slike."));
                }
        }   
        } elseif (isset($_POST['deleteShowId'])) {
            $showId = isset($_POST['deleteShowId']) ? intval($_POST['deleteShowId']) : null;

            echo $showId;
            var_dump($showId);
            $success = Predstava::deletePerformance($showId);

            if ($success) {
                echo json_encode(array("success" => true, "message" => "Predstava uspešno obrisana."));
            } else {
                echo json_encode(array("success" => false, "message" => "Došlo je do greške prilikom brisanja predstave."));
            }
        } else {
            echo json_encode(array("success" => false, "message" => "Nedostaju potrebni podaci za unos predstave i karte."));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "Neispravan zahtev showTable."));
    }

    $conn->close();
?>
