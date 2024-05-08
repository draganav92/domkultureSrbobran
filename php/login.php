<?php
    header("Access-Control-Allow-Origin: http://localhost:5500");
    header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
    
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");
    
    class Database {
        private static $instance = null;
        private $pdo;
    
        private function __construct() {
            $this->pdo = new PDO('mysql:host=localhost;dbname=pozoriste', 'root', '');
        }
    
        public static function getInstance() {
            if (!self::$instance) {
                self::$instance = new Database();
            }
            return self::$instance;
        }
    
        public function getConnection() {
            return $this->pdo;
        }
    }
    
    class Korisnik {
        public $IDKorisnik;
        public $Username;
        public $Password;
        public $Email;

        public function __construct($Username, $Password, $Email) {
            $this->Username = $Username;
            $this->Password = $Password;
            $this->Email = $Email;
        }
        public function setID($idkor) {
            $this->IDKorisnik = $idkor;
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
    
        public function createUser() {
            $pdo = Database::getInstance()->getConnection();
        
            $statement = $pdo->prepare("INSERT INTO korisnici (Username, Password, Email) VALUES (:username, :password, :email)");
        
            $statement->bindParam(':username', $this->Username);
            $statement->bindParam(':password', $this->Password);
            $statement->bindParam(':email', $this->Email);
        
            $statement->execute();
        }
    
        public static function checkIfExists($username) {
            $pdo = Database::getInstance()->getConnection();
        
            $statement = $pdo->prepare("SELECT COUNT(*) FROM korisnici WHERE Username = :username");
        
            $statement->bindParam(':username', $username);
        
            $statement->execute();
        
            $result = $statement->fetch(PDO::FETCH_ASSOC);
        
            return $result['COUNT(*)'] > 0;
        }
    
        public static function Login($username, $password) {
            $pdo = Database::getInstance()->getConnection();
        
            $statement = $pdo->prepare("SELECT * FROM korisnici WHERE Username = :username");
        
            $statement->execute([':username' => $username]);
        
            $korisnik = $statement->fetch(PDO::FETCH_ASSOC);
        
            if ($korisnik && $password === $korisnik['Password']) {
                $kor = new Korisnik($korisnik['Username'], $korisnik['Password'], $korisnik["Email"]);
                $kor->setID($korisnik['IDKorisnik']);
            
                return $kor;
            } else {
                return null;
            }
        }
    
        public static function deleteUser($userId) {
            $pdo = Database::getInstance()->getConnection();
        
            $statement = $pdo->prepare("DELETE FROM korisnici WHERE IDKorisnik = :userId");
        
            $statement->bindParam(':userId', $userId);
        
            if($statement->execute()) {
                return "Korisnik sa ID-jem $userId je uspešno obrisan.";
            } else {
                return "Došlo je do greške prilikom brisanja korisnika: " . $statement->errorInfo()[2];
            }
        }
    
        
    
        // public function startSession() {
        //     session_start();
        
        //     $pdo = Database::getInstance()->getConnection();
        //     $statement = $pdo->prepare("SELECT * FROM korisnici WHERE Username = :username");
        //     $statement->bindParam(':username', $this->Username);
        //     $statement->execute();
        //     $result = $statement->fetch(PDO::FETCH_ASSOC);
        //     $idKorisnik = $result['IDKorisnik'];
        //     $username = $result['Username'];
        //     $password = $result['Password'];
        
        //     $_SESSION['IDKorisnik'] = $idKorisnik;
        //     $_SESSION['Username'] = $username;
        //     $_SESSION['Password'] = $password;
        // }
        
    
        // public static function endSession() {
        //     session_start();
        //     session_destroy();
        // }
    }
    
    if(count($_POST) === 3) {
        $username = $_POST['username'];
        $password = $_POST['password'];
        $email = $_POST['email'];

        $noviKorisnik = new Korisnik($username, $password, $email);
        if (!Korisnik::checkIfExists($noviKorisnik->Username)) {
            $noviKorisnik->createUser();
            echo "Korisnik uspešno registrovan.";
        } else {
            echo json_encode(array("success" => true, "message" => "Korisničko ime već postoji, izaberite drugo."));
        }
    }
    elseif(count($_POST) === 2) {
        $username = $_POST['username'];
        $password = $_POST['password'];

        $korisnik = Korisnik::Login($username, $password);

        if ($korisnik) {
            //$korisnik->startSession();
            echo json_encode(array("success" => true, "korisnik" => $korisnik, "message" => "Uspešno ste se ulogovali"));
        } else {
            echo json_encode(array("success" => false, "message" => "Pogrešno korisničko ime ili lozinka."));
        }
    }
    elseif(isset($_POST['logout']) && $_POST['logout'] === 'true') {
        //Korisnik::endSession();
        echo "Uspešno ste se izlogovali.";
    }
    elseif(isset($_POST['deleteUserId'])) {

        $userId = $_POST['deleteUserId'];
        
        $result = Korisnik::deleteUser($userId);
        
        echo $result;
    }      
    else {
        echo "Nevalidan zahtev";
    }
?>
