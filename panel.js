
function fillUsersTable() {
    let usersTable = document.getElementById("users-table");
    let html = "<tr><th>ID</th><th>Корисничко име</th><th>Akcija</th></tr>";

    dataKorisnici.forEach(user => {
        html += `<tr><td>${user.IDKorisnik}</td><td>${user.Username}</td><td><button class="delete-user-btn" data-id="${user.IDKorisnik}">Обриши</button></td></tr>`;
    });

    usersTable.innerHTML = html;
}


function openAddUserModal() {
    let modal = document.getElementById("add-user-modal");
    modal.style.display = "block";
}


function closeAddUserModal() {
    let modal = document.getElementById("add-user-modal");
    modal.style.display = "none";
}


document.getElementById("add-user-btn").addEventListener("click", openAddUserModal);


document.getElementsByClassName("close")[0].addEventListener("click", closeAddUserModal);



document.getElementById('add-user-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var formData = new FormData(this);

    fetch('http://localhost/login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        alert(data);
        location.reload();
    })
    .catch(error => {
        console.error('Panel problem sa fetch addUser:', error);
    });
});


document.getElementById('users-table').addEventListener('click', function(event) {
    event.preventDefault();
    if (event.target.classList.contains('delete-user-btn')) {
        var userId = event.target.dataset.id;
        var formData = new FormData();
        formData.append('deleteUserId', userId);
        console.log(formData);
        fetch('http://localhost/login.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log(data);
            location.reload();
        })
        .catch(error => {
            console.error('Panel problem sa fetch deleteUser:', error);
        });
    }
});



function fillBookingsTable() {
    let bookingsTable = document.getElementById("bookings-table");
    let html = "<tr><th>ID</th><th>IDPredstave</th><th>IDKorisnika</th><th>BrojSedista</th><th>Akcija</th></tr>";

    dataRezervacije.forEach(booking => {
        html += `<tr><td>${booking.IDRezervacija}</td><td>${booking.IDPredstava}</td><td>${booking.IDKorisnik}</td><td>${booking.BrojSedista}</td><td><button class="delete-booking-btn" data-id="${booking.IDRezervacija}">Обриши</button></td></tr>`;
    });

    bookingsTable.innerHTML = html;
}


document.getElementById('bookings-table').addEventListener('click', function(event) {
    event.preventDefault();
    if (event.target.classList.contains('delete-booking-btn')) {
        var reservationId = event.target.dataset.id;
        var formData = new FormData();
        formData.append('deleteReservationId', reservationId);
        console.log(formData);
        fetch('http://localhost/klasaR.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log(data);
            location.reload();
        })
        .catch(error => {
            console.error('Panel problem sa fetch deleteBookings:', error);
        });
    }
});


function fillShowsTable() {
    let showsTable = document.getElementById("shows-table");
    let html = "<tr><th>ID</th><th>Назив представе</th><th>Датум</th><th>Време</th><th>Цена карте</th><th>Akcija</th></tr>";

    dataPredstave.forEach(show => {
        html += `<tr><td>${show.predstava.IDPredstava}</td><td>${show.predstava.NazivPredstave}</td><td>${show.karta.Datum}</td><td>${show.karta.Vreme}</td><td>${show.karta.Cena}</td><td><button class="delete-show-btn" data-id="${show.predstava.IDPredstava}">Obriši</button></td></tr>`;
    });

    showsTable.innerHTML = html;
}

document.getElementById('add-show-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(this);

    fetch('http://localhost/showsTable.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        console.log(data);
        location.reload();
    })
    .catch(error => {
        console.error('Problem sa fetch addShows:', error);
    });
});


document.getElementById('shows-table').addEventListener('click', function(event) {
    event.preventDefault();
    if (event.target.classList.contains('delete-show-btn')) {
        var showId = event.target.dataset.id;
        console.log(showId);
        var formData = new FormData();
        formData.append('deleteShowId', showId);
        console.log(formData);
        fetch('http://localhost/showsTable.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log(data);
            location.reload();
        })
        .catch(error => {
            console.error('Panel problem sa fetch deleteShows:', error);
        });
    }
});




function openAddShowModal() {
    let modal = document.getElementById("add-show-modal");
    modal.style.display = "block";
}


function closeAddShowModal() {
    let modal = document.getElementById("add-show-modal");
    modal.style.display = "none";
}



document.getElementById("add-show-btn").addEventListener("click", openAddShowModal);


document.getElementsByClassName("close")[1].addEventListener("click", closeAddShowModal);






let dataPredstave = [];
let dataKorisnici = [];
let dataRezervacije = [];

async function dohvatiPredstave() {
    let response = await fetch('http://localhost/dropDownMenu.php');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function dohvatiKorisnike() {
    let response = await fetch('http://localhost/getKorisnike.php?getAllKorisnici=1');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function dohvatiRezervacije() {
    let response = await fetch('http://localhost/getRezervacije.php?getAllRezervacije=1');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    let data = await response.json();
    return data;
}


async function predMain() {
    try {
        dataPredstave = await dohvatiPredstave();

        fillShowsTable();

    } catch (error) {
        console.error('Greska sa fetch kod dohvatiPredstave: ', error);
    }
}

async function korMain() {
    try {
        dataKorisnici = await dohvatiKorisnike();
        
        fillUsersTable();

    } catch (error) {
        console.error('Greška prilikom povlačenja korisnika:', error);
    }
}

async function rezMain() {
    try {
        dataRezervacije = await dohvatiRezervacije();

        fillBookingsTable();

    } catch (error) {
        console.error('Greška prilikom povlačenja rezervacija:', error);
    }
}
window.onload = function(){
    predMain();
    korMain();
    rezMain();
};

// OVO