<<<<<<< HEAD
// Simulacija podataka - Korisnici i rezervacije
let usersData = [
    { id: 1, username: "korisnik1"  },
    { id: 2, username: "korisnik2" }
];

let bookingsData = [
    { id: 1,  user_id: 1, date: "2024-04-21", tickets: "1" },
    { id: 2,  user_id: 2, date: "2024-04-22", tickets: "2" },
    { id: 3,  user_id: 3, date: "2024-04-22", tickets: "1" },
    { id: 4,  user_id: 4, date: "2024-04-22", tickets: "2" },
    { id: 5,  user_id: 5, date: "2024-04-23", tickets: "1" },
    { id: 6,  user_id: 6, date: "2024-04-23", tickets: "1" },
    { id: 7,  user_id: 7, date: "2024-04-23", tickets: "3" },
    { id: 8,  user_id: 8, date: "2024-04-24", tickets: "2" },
    { id: 9,  user_id: 9, date: "2024-04-24", tickets: "4" },
    { id: 10, user_id: 10, date: "2024-04-24",tickets: "1" }
];

// Funkcija za popunjavanje tabele korisnika
function fillUsersTable() {
    let usersTable = document.getElementById("users-table");
    let html = "<tr><th>ID</th><th>Корисничко име</th><th>Akcije</th></tr>";

    usersData.forEach(user => {
        html += `<tr><td>${user.id}</td><td>${user.username}</td><td><button class="delete-user-btn" data-id="${user.id}">Обриши</button></td></tr>`;
    });

    usersTable.innerHTML = html;
}

// Funkcija za otvaranje modalnog prozora za dodavanje korisnika
function openAddUserModal() {
    let modal = document.getElementById("add-user-modal");
    modal.style.display = "block";
}

// Funkcija za zatvaranje modalnog prozora za dodavanje korisnika
function closeAddUserModal() {
    let modal = document.getElementById("add-user-modal");
    modal.style.display = "none";
}

// Event listener za dugme "Dodaj korisnika"
document.getElementById("add-user-btn").addEventListener("click", openAddUserModal);

// Event listener za zatvaranje modalnog prozora
document.getElementsByClassName("close")[0].addEventListener("click", closeAddUserModal);

// Pozivanje funkcije za popunjavanje tabele korisnika kada se stranica učita
window.onload = function() {
    fillUsersTable();
};

// Funkcija za dodavanje novog korisnika
function addUser() {
    let form = document.getElementById("add-user-form");
    let username = form.elements["username"].value;
    let email = form.elements["email"].value;

    // Generisanje ID-a novog korisnika (ovde možemo koristiti neki bolji mehanizam u praksi)
    let id = usersData.length + 1;

    // Dodavanje novog korisnika u listu
    usersData.push({ id: id, username: username, password: password });

    // Ponovno popunjavanje tabele korisnika
    fillUsersTable();

    // Zatvaranje modalnog prozora
    closeAddUserModal();

    // Resetovanje forme
    form.reset();
}

// Event listener za dodavanje novog korisnika
document.getElementById("add-user-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    addUser();
});

// Funkcija za brisanje korisnika
function deleteUser(userId) {
    // Filtriranje korisnika iz liste na osnovu ID-a
    usersData = usersData.filter(user => user.id !== userId);

    // Ponovno popunjavanje tabele korisnika
    fillUsersTable();
}

// Event listener za dugmad "Obriši" u tabeli korisnika
document.getElementById("users-table").addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-user-btn")) {
        let userId = parseInt(event.target.getAttribute("data-id"));
        deleteUser(userId);
    }
});

// Funkcija za popunjavanje tabele rezervacija
function fillBookingsTable() {
    let bookingsTable = document.getElementById("bookings-table");
    let html = "<tr><th>ID</th><th>Korisnik ID</th><th>Datum</th><th>Broj karata</th><th>Akcije</th></tr>";

    bookingsData.forEach(booking => {
        html += `<tr><td>${booking.id}</td><td>${booking.user_id}</td><td>${booking.date}</td><td>${booking.tickets}</td><td><button class="delete-booking-btn" data-id="${booking.id}">Обриши</button> <button class="edit-booking-btn" data-id="${booking.id}">Измени</button></td></tr>`;
    });

    bookingsTable.innerHTML = html;
}

// Pozivanje funkcije za popunjavanje tabele rezervacija kada se stranica učita
window.onload = function() {
    fillUsersTable();
    fillBookingsTable();
};

// Funkcija za brisanje rezervacije
function deleteBooking(bookingId) {
    // Filtriranje rezervacija iz liste na osnovu ID-a
    bookingsData = bookingsData.filter(booking => booking.id !== bookingId);

    // Ponovno popunjavanje tabele rezervacija
    fillBookingsTable();
}

// Event listener za dugmad "Obriši" u tabeli rezervacija
document.getElementById("bookings-table").addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-booking-btn")) {
        let bookingId = parseInt(event.target.getAttribute("data-id"));
        deleteBooking(bookingId);
    }
});

let showsData = [
    { id: 1, title: "Ко је убио Џенис Џоплин?", date: "28.04.2024", time: "20:00", tickets: 1000 },
    { id: 2, title: "Била једном једна земља", date: "29.04.2024", time: "19:00", tickets: 1100 },
    { id: 3, title: "Kaко сам постала фрајла", date: "30.04.2024", time: "20:00", tickets: 1200 },
    { id: 4, title: "Враголанка", date: "03.05.2024", time: "20:30", tickets: 800 },
    { id: 5, title: "Ујеж", date: "04.05.2024", time: "20:00", tickets: 1000 },
    { id: 6, title: "Вештице из Салема", date: "05.05.2024", time: "20:00", tickets: 1100 },
    { id: 7, title: "Не мо`ш побећи од недеље", date: "09.05.2024", time: "20:00", tickets: 900 },
    { id: 8, title: "Женидба на чардаку", date: "10.05.2024", time: "19:30", tickets: 1000 },
    { id: 9, title: "Мишја грозница", date: "12.05.2024", time: "20:00", tickets: 1000 },
    { id: 10, title: "Алабама", date: "15.05.2024", time: "20:00", tickets: 1000 },
    { id: 11, title: "Царство мрака", date: "16.05.2024", time: "20:00", tickets: 1000 },
    { id: 12, title: "Севиљски берберин", date: "21.05.2024", time: "20:00", tickets: 1000 },
    { id: 13, title: "Дејт", date: "30.05.2024", time: "20:00", tickets: 1400 }
];

function fillShowsTable() {
    let showsTable = document.getElementById("shows-table");
    let html = "<tr><th>ID</th><th>Назив представе</th><th>Датум</th><th>Време</th><th>Цена карте</th><th>Akcije</th></tr>";

    showsData.forEach(show => {
        html += `<tr><td>${show.id}</td><td>${show.title}</td><td>${show.date}</td><td>${show.time}</td><td>${show.tickets}</td><td><button class="delete-show-btn" data-id="${show.id}">Obriši</button></td></tr>`;
    });

    showsTable.innerHTML = html;
}

window.onload = function() {
    fillUsersTable();
    fillBookingsTable();
    fillShowsTable();
};

function deleteShow(showId) {
    showsData = showsData.filter(show => show.id !== showId);
    fillShowsTable();
}

document.getElementById("shows-table").addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-show-btn")) {
        let showId = parseInt(event.target.getAttribute("data-id"));
        deleteShow(showId);
    }
});

// Funkcija za otvaranje modalnog prozora za dodavanje predstave
function openAddShowModal() {
    let modal = document.getElementById("add-show-modal");
    modal.style.display = "block";
}

// Funkcija za zatvaranje modalnog prozora za dodavanje predstave
function closeAddShowModal() {
    let modal = document.getElementById("add-show-modal");
    modal.style.display = "none";
}

// Funkcija za dodavanje nove predstave
function addShow() {
    let form = document.getElementById("add-show-form");
    let title = form.elements["show-title"].value;
    let date = form.elements["show-date"].value;
    let time = form.elements["show-time"].value;
    let tickets = parseInt(form.elements["show-tickets"].value);

    // Generisanje ID-a nove predstave (ovde možemo koristiti neki bolji mehanizam u praksi)
    let id = showsData.length + 1;

    // Dodavanje nove predstave u listu
    showsData.push({ id: id, title: title, date: date, time: time, tickets: tickets });

    // Ponovno popunjavanje tabele predstava
    fillShowsTable();

    // Zatvaranje modalnog prozora
    closeAddShowModal();

    // Resetovanje forme
    form.reset();
}

// Event listener za otvaranje modalnog prozora za dodavanje predstave
document.getElementById("add-show-btn").addEventListener("click", openAddShowModal);

// Event listener za zatvaranje modalnog prozora za dodavanje predstave
document.getElementsByClassName("close")[1].addEventListener("click", closeAddShowModal);

// Event listener za dodavanje nove predstave
document.getElementById("add-show-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    addShow();
});
=======
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
>>>>>>> 893b85a (Message: Finish)
