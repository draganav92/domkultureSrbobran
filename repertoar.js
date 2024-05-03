
function prikaziPredstave(pred) {
    var container = document.getElementById("predstave-container");
    container.innerHTML = ""; 

    pred.forEach(function(predst) {
    pred.forEach(function(predst) {
        var div = document.createElement("div");
        console.log(predst.predstava.NazivPredstave);
        console.log(predst.predstava.NazivPredstave);
        div.classList.add("predstava-div");


        var slikaDiv = document.createElement("div");
        slikaDiv.classList.add("slika-div");
        var slika = document.createElement("img");
        slika.src = `data:image/jpeg;base64, ${predst.predstava.Slika}`;
        slika.src = `data:image/jpeg;base64, ${predst.predstava.Slika}`;
        slika.alt = "Slika predstave";
        slikaDiv.appendChild(slika);
        div.appendChild(slikaDiv);

        var podaciDiv = document.createElement("div");
        podaciDiv.classList.add("podaci-div");
        podaciDiv.innerHTML = `
            <h2>${predst.predstava.NazivPredstave}</h2>
            <p>Жанр: ${predst.predstava.Zanr}</p>
            <p>Датум: ${predst.karta.Datum}</p>
            <p>Термин: ${predst.karta.Vreme}</p>
            <p>Цена улазнице: ${predst.karta.Cena} дин.</p>
            <p>Режисер: ${predst.predstava.Reziser}</p>
            <p>Tрајање: ${predst.predstava.Trajanje}</p>
            <button onclick='popup(${JSON.stringify(predst)})'>Погледај детаље</button>
            <h2>${predst.predstava.NazivPredstave}</h2>
            <p>Жанр: ${predst.predstava.Zanr}</p>
            <p>Датум: ${predst.karta.Datum}</p>
            <p>Термин: ${predst.karta.Vreme}</p>
            <p>Цена улазнице: ${predst.karta.Cena} дин.</p>
            <p>Режисер: ${predst.predstava.Reziser}</p>
            <p>Tрајање: ${predst.predstava.Trajanje}</p>
            <button onclick='popup(${JSON.stringify(predst)})'>Погледај детаље</button>
            <button onclick="window.location.href = 'rezervacija.html'">Резервиши улазнице</button>`;
        div.appendChild(podaciDiv);


        container.appendChild(div);
        container.innerHTML += "<hr></hr>";
    });
}



function pretrazi() {
    var input = document.getElementById("pretraga").value.toLowerCase();
    var filtriranePredstave = slike.filter(function(predst) {
        return predst.predstava.NazivPredstave.toLowerCase().includes(input);
    var filtriranePredstave = slike.filter(function(predst) {
        return predst.predstava.NazivPredstave.toLowerCase().includes(input);
    });
    prikaziPredstave(filtriranePredstave);
}




function popuniZanrove(pred) {
    var zanrovi = [];

    pred.forEach(function(predst) {
        if (!zanrovi.includes(predst.predstava.Zanr)) {
            zanrovi.push(predst.predstava.Zanr);

    pred.forEach(function(predst) {
        if (!zanrovi.includes(predst.predstava.Zanr)) {
            zanrovi.push(predst.predstava.Zanr);
        }
    });


    zanrovi.sort();


    var zanrSelect = document.getElementById("zanr");
    zanrovi.forEach(function(zanr) {
        var option = document.createElement("option");
        option.value = zanr.toLowerCase(); 
        option.textContent = zanr;
        console.log(option.value + "="  +option.textContent);
        console.log(option.value + "="  +option.textContent);
        zanrSelect.appendChild(option);
    });


    zanrSelect.addEventListener('change', function() {
        filtrirajPoZanru();
    });
}





document.getElementById("zanr").addEventListener('change', function() {
    filtrirajPoZanru();
    filtrirajPoZanru();
});



function filtrirajPoZanru() {
    var zanrSelect = document.getElementById("zanr");
    var izabraniZanr = zanrSelect.value.toLowerCase(); 


    var filtriranePredstave = slike.filter(function(predst) {
        return izabraniZanr === "svi" || predst.predstava.Zanr.toLowerCase() === izabraniZanr;
    var filtriranePredstave = slike.filter(function(predst) {
        return izabraniZanr === "svi" || predst.predstava.Zanr.toLowerCase() === izabraniZanr;
    });


    prikaziPredstave(filtriranePredstave);
}


function prikaziDetalje(odabranaPredstava) {
    var detaljiDiv = document.createElement("div");
function prikaziDetalje(odabranaPredstava) {
    var detaljiDiv = document.createElement("div");
        detaljiDiv.classList.add("detalji-div");


        detaljiDiv.innerHTML = `
            <h3>${odabranaPredstava.predstava.NazivPredstave}</h3>
            <p><strong>Жанр:</strong> ${odabranaPredstava.predstava.Zanr}</p>
            <p><strong>Режисер:</strong> ${odabranaPredstava.predstava.Reziser}</p>
            <p><strong>Трајање:</strong> ${odabranaPredstava.predstava.Trajanje}</p>
            <h3>${odabranaPredstava.predstava.NazivPredstave}</h3>
            <p><strong>Жанр:</strong> ${odabranaPredstava.predstava.Zanr}</p>
            <p><strong>Режисер:</strong> ${odabranaPredstava.predstava.Reziser}</p>
            <p><strong>Трајање:</strong> ${odabranaPredstava.predstava.Trajanje}</p>
            <p><strong> Улоге: </strong> </p>
            <p>${odabranaPredstava.predstava.Uloge}</p>
            <p>${odabranaPredstava.predstava.Uloge}</p>
            <p><strong>Опис представе:</strong></p>
            <p>${odabranaPredstava.predstava.Opis}</p>
            <p>${odabranaPredstava.predstava.Opis}</p>
            <button onclick="closePopup()">Затвори</button>
        `;


        var predstavaDiv = document.getElementById("popup");
        if (predstavaDiv) {
            predstavaDiv.appendChild(detaljiDiv);
        } else {
            console.error("Element with ID 'popup' not found.");
        }
        }
}

const popup = (pred) => {
    var popup = document.getElementById('popup');
    popup.innerHTML = "";
    popup.style.display = 'block';
    prikaziDetalje(pred);
    prikaziDetalje(pred);
}

const closePopup = () => {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}


function zatvoriModal() {
    var modalContainer = document.getElementById("modal-container");
    modalContainer.style.display = "none";
}






let slike = [];

async function dohvatiPodatke() {
    let response = await fetch('http://localhost/dropDownMenu.php');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}


async function main() {
    try {
        slike = await dohvatiPodatke();

        popuniZanrove(slike);
        prikaziPredstave(slike);
        pretrazi();

    } catch (error) {
        console.error('Greška prilikom povlačenja slika:', error);
    }
}

<<<<<<< HEAD
window.onload = main;