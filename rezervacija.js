
function popuniPadajuciMeni(pred) {
    var dropPredstava = document.getElementById("dropPredstava");

    pred.forEach(function(predst) {
        var option = document.createElement("option");
        option.value = predst.predstava.IDPredstava; 
        option.textContent = predst.predstava.NazivPredstave; 
        dropPredstava.appendChild(option);

    });
}


function generisiSedista(nizSedista) {
    var pozorisnaSala = document.querySelector('.pozorisna-sala');
    pozorisnaSala.innerHTML = "";
    for (var i = 1; i <= 5; i++) {
        var redDiv = document.createElement('div');
        redDiv.classList.add('red' + i);
        for (var j = 1; j <= 10; j++) {
            var sedisteDiv = document.createElement('div');
            sedisteDiv.classList.add('sediste');
            sedisteDiv.id = 'sediste_' + j;
            sedisteDiv.textContent = (i - 1) * 10 + j;

            var objekat = nizSedista.find(function(obj) {
                return parseInt(sedisteDiv.textContent) === obj.BrojSedista;
            });
            if (objekat) {
                sedisteDiv.style.backgroundColor = 'blue';
                sedisteDiv.style.color = 'white';
                sedisteDiv.style.pointerEvents = "none";
            }

            redDiv.appendChild(sedisteDiv);
        }
        pozorisnaSala.appendChild(redDiv);
    }


    var sedista = document.querySelectorAll('.sediste');
    sedista.forEach(function(sediste) {
        sediste.addEventListener('click', klikNaSediste);
    });
}



function klikNaSediste(event) {
    var sediste = event.target;

    if (sediste.classList.contains('rezervisano')) {
        ukloniRezervaciju(sediste.textContent);
        sediste.classList.remove('rezervisano');
    } else {
        dodajRezervaciju(sediste.textContent);
        sediste.classList.add('rezervisano');
    }

    prikaziInformacijeORezervaciji();
}


let rezervacije = [];
function dodajRezervaciju(sediste) {
    const selectedShow = document.getElementById('dropPredstava').value;
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        alert('Morate biti prijavljeni da biste rezervisali sedište.');
        return;
    }

    rezervacije.push({
        IDRezervacija: parseInt(),
        IDPredstave: parseInt(selectedShow),
        IDKorisnika: loggedInUser.korisnik.IDKorisnik,
        sediste: parseInt(sediste)
    });
    console.log(rezervacije)
}

function ukloniRezervaciju(sediste) {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        alert('Morate biti prijavljeni da biste uklonili rezervaciju.');
        return;
    }

    rezervacije = rezervacije.filter(rezervacija => {
        return !(rezervacija.sediste === sediste && rezervacija.IDKorisnika === loggedInUser.korisnik.IDKorisnik);
    });
    console.log(rezervacije);
}


function prikaziInformacijeORezervaciji() {
    var rezervisanaSedista = document.querySelectorAll('.rezervisano');
    var rezervacijaInfo = document.getElementById('rezervacija-info');

    var ukupnaCena = 0;


    if (rezervisanaSedista.length === 0) {
        rezervacijaInfo.style.display = 'none';
        return;
    }

    var rezervacijaHTML = '<h3>Резервисана седишта:</h3><ul>';

    rezervisanaSedista.forEach(function(sediste) {
        var index = document.getElementById('dropPredstava').value;

        var red = Math.ceil(parseInt(sediste.textContent) / 10);
        var cena = parseInt(dropDM[index].karta.Cena);

        ukupnaCena += cena;
        rezervacijaHTML += `<li>Ред: ${red}, Број седишта: ${parseInt(sediste.textContent)}, Цена улазнице: ${cena} дин</li>`;
    });

    rezervacijaHTML += `</ul><p><strong>Укупна цена:</strong> ${ukupnaCena} дин</p><button onclick="rezervisi()">Резервиши</button>`;

    rezervacijaInfo.innerHTML = rezervacijaHTML;
        
    rezervacijaInfo.style.display = 'block';
}



async function rezervisi() {
    let response;

    try {
        if (rezervacije.length === 0) {
            alert('Nema rezervacija za slanje.');
            return;
        }
        console.info(JSON.parse(JSON.stringify(rezervacije)));
        let formData = new FormData();
        formData.append('rezervacije', JSON.stringify(rezervacije));
        try {
            response = await fetch('http://localhost/klasaR.php', {
                method: 'POST',
                body: formData
            });
        } catch(error) {
            console.error('Greška prilikom slanja zahteva:', error);
            alert("Greška prilikom slanja zahteva: " + error);
            return;
        }

        try {
            if (!response.ok) {
                throw new Error('Došlo je do greške prilikom slanja rezervacija.');
            }
            console.log(response);
        } catch(error) {
            console.error('Greška prilikom provere odgovora:', error);
            alert("Greška prilikom provere odgovora: " + error);
            return;
        }
        
        try {
            const data = await response.json();
            console.log(data);
            alert('Rezervacija uspešno poslata.');

            rezervacije = [];
            location.reload();
        } catch(error) {
            console.error('Greška prilikom obrade podataka:', error);
            alert("Greška prilikom obrade podataka: " + error);
        }
    } catch (error) {
        console.error('Greška:', error);
        alert('Došlo je do greške.');
    } 
}





document.addEventListener('click', function(event) {
    if (event.target.classList.contains('sediste')) {
        event.target.classList.toggle('selected');
    }
});


function prikaziInformacijeOSedistu(sediste) {
    var red = Math.ceil(sediste / 10);
    var brojSedista = sediste; 
    var cena = predstave[dropPredstava.selectedIndex].cena;
    let informacije = `Ред: ${red}, Број седишта: ${brojSedista}, Цена улазнице: ${cena} дин`;

    console.log(informacije);

    return informacije;
}

function postaviDogadjajZaSedista() {
    var sedista = document.querySelectorAll('.sediste');

    sedista.forEach(function(sediste) {
        sediste.addEventListener('mouseenter', function() {
            var informacije = prikaziInformacijeOSedistu(parseInt(this.textContent));

            var dropdown = document.createElement('div');
            dropdown.classList.add('dropdown');
            dropdown.textContent = informacije;
            dropdown.style.position = 'absolute';
            dropdown.style.top = sediste.offsetTop + sediste.offsetHeight + 'px'; 
            dropdown.style.left = sediste.offsetLeft + 'px';
            sediste.appendChild(dropdown);
        });

        sediste.addEventListener('mouseleave', function() {

            var dropdown = this.querySelector('.dropdown');
            if (dropdown) {
                dropdown.remove();
            }
        });
    });
}







let dropDM = [];
let greenDiv = [];

async function dohvatiPodatke() {
    let response = await fetch('http://localhost/dropDownMenu.php');
    if (!response.ok) {
        throw new Error('Network response was not ok1');
    }
    return response.json();
}


document.getElementById('dropPredstava').addEventListener('change', function() {
    var selectedValue = this.value;
    posaljiVrednostNaServer(selectedValue);
});

async function posaljiVrednostNaServer(selectedValue) {
    try {
        const formData = new FormData();
        formData.append('idPredstave', selectedValue);

        const response = await fetch('http://localhost/klasaR.php', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Došlo je do greške prilikom slanja zahteva.');
        }

        const rezultat = await response.json();

        console.log('Odgovor sa servera:', rezultat);
        var nizRezultata = JSON.parse(rezultat);
        
        console.log(typeof nizRezultata);
        nizRezultata.forEach(function(obj) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    console.log('Tip vrednosti za ključ ' + key + ' je: ' + typeof obj[key]);
                }
            }
        });
        generisiSedista(nizRezultata);
    } catch (error) {
        console.error('Greška:', error);
    }
}
  





async function main() {
    try {
        dropDM = await dohvatiPodatke();
        popuniPadajuciMeni(dropDM);

        postaviDogadjajZaSedista();

        prikaziInformacijeORezervaciji();
    } catch (error) {
        console.error('Greška prilikom povlačenja slika:', error);
    }
}

window.onload = main;