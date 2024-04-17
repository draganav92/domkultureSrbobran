var predstave = [
    {
        naziv: "Ко је убио Џенис Џоплин?",
        datum: "28.04.2024",
        termin: "20:00",
        cena: 1000,
        reziser: "Соња Петровић",
        trajanje: "2 sata",
        slika: "slike/dzenisdzoplin.jpg",
        zanr: "драма"
    },
    {
        naziv: "Била једном једна земља",
        datum: "29.04.2024",
        termin: "19:00",
        cena: 1100,
        reziser: "Кокан Младеновић",
        trajanje: "2 sata",
        slika: "slike/bilajednomjednazemlja.jpg",
        zanr: "драма"
    },
    {
        naziv: "Kaко сам постала фрајла",
        datum: "30.04.2024",
        termin: "20:00",
        cena: 1200,
        reziser: "Вишња Обрадовић",
        trajanje: "2 sata",
        slika: "slike/kakosampostalafrajla.jpg",
        zanr: "комедија"
    },
    {
        naziv: "Враголанка",
        datum: "03.05.2024",
        termin: "20:30",
        cena: 800,
        reziser: "Калин Ханциу",
        trajanje: "1.5 sati",
        slika: "slike/vragolanka.jpg",
        zanr: "балет"
    },
    {
        naziv: "Ујеж",
        datum: "03.05.2024",
        termin: "20:00",
        cena: 1000,
        reziser: "Радослав Миленковић",
        trajanje: "2 sata",
        slika: "slike/ujez.jpg",
        zanr: "комедија"
    },
    {
        naziv: "Вештице из Салема",
        datum: "05.05.2024",
        termin: "20:00",
        cena: 1100,
        reziser: "Никита Миливојевић",
        trajanje: "2 sata",
        slika: "slike/vesticeizsalema.jpg",
        zanr: "драма"
    },
    {
        naziv: "Не мо`ш побећи од недеље",
        datum: "09.05.2024",
        termin: "20:00",
        cena: 900,
        reziser: "Тамара Кострешевић",
        trajanje: "2 sata",
        slika: "slike/nemospobeciodnedelje.jpg",
        zanr: "драма"
    },
    {
        naziv: "Женидба на чардаку",
        datum: "10.05.2024",
        termin: "19:30",
        cena: 1000,
        reziser: "Соња Петровић",
        trajanje: "2 sata",
        slika: "slike/zenidbanacardaku.jpg",
        zanr: "драма"
    },
    {
        naziv: "Мишја грозница",
        datum: "12.05.2024",
        termin: "20:00",
        cena: 1000,
        reziser: "Ђорђе Нешовић",
        trajanje: "2 sata",
        slika: "slike/misjagroznica.jpg",
        zanr: "драма"
    },
    {
        naziv: "Алабама",
        datum: "15.05.2024",
        termin: "20:00",
        cena: 1000,
        reziser: "Рахим Бурхан",
        trajanje: "2 sata",
        slika: "slike/alabama.jpg",
        zanr: "драма"
    },
    {
        naziv: "Царство мрака",
        datum: "16.05.2024",
        termin: "20:00",
        cena: 1000,
        reziser: "Игор Вук Торбица",
        trajanje: "2 sata",
        slika: "slike/carstvomraka.jpg",
        zanr: "драма"
    },
    {
        naziv: "Севиљски берберин",
        datum: "21.05.2024",
        termin: "20:00",
        cena: 1000,
        reziser: "Иван Клеменц",
        trajanje: "2 sata",
        slika: "slike/seviljskiberberin.jpg",
        zanr: "опера"
    },
    {
        naziv: "Дејт",
        datum: "30.05.2024",
        termin: "20:00",
        cena: 1400,
        reziser: "Сандра Силађев",
        trajanje: "2 sata",
        slika: "slike/dejt.jpg",
        zanr: "драма"
    },
];

// Funkcija za popunjavanje padajućeg menija sa opcijama za predstave
function popuniPadajuciMeni() {
    var dropPredstava = document.getElementById("dropPredstava");

    // Iteriramo kroz sve predstave i dodajemo opcije u padajući meni
    predstave.forEach(function(predstava) {
        var option = document.createElement("option");
        option.value = predstava.naziv; // Postavljamo vrednost opcije na naziv predstave
        option.textContent = predstava.naziv; // Postavljamo tekst opcije na naziv predstave
        dropPredstava.appendChild(option);
    });
}

// Funkcija za generisanje sedišta unutar redova pozorisne sale
function generisiSedista() {
    var pozorisnaSala = document.querySelector('.pozorisna-sala');
    for (var i = 1; i <= 5; i++) {
        var redDiv = document.createElement('div');
        redDiv.classList.add('red' + i);
        for (var j = 1; j <= 10; j++) {
            var sedisteDiv = document.createElement('div');
            sedisteDiv.classList.add('sediste');
            sedisteDiv.id = 'sediste_' + j;
            sedisteDiv.textContent = (i - 1) * 10 + j;
            redDiv.appendChild(sedisteDiv);
        }
        pozorisnaSala.appendChild(redDiv);
    }

    // Dodavanje event listenera na sva sedišta
    var sedista = document.querySelectorAll('.sediste');
    sedista.forEach(function(sediste) {
        sediste.addEventListener('click', klikNaSediste);
    });
}

// Pozivamo funkciju za popunjavanje padajućeg menija kada se stranica učita
window.onload = function() {
    popuniPadajuciMeni();
    generisiSedista();
    postaviDogadjajZaSedista();

};

// Funkcija za obradu klika na sedište
function klikNaSediste(event) {
    var sediste = event.target;

    // Proveravamo da li je sedište već rezervisano
    if (sediste.classList.contains('rezervisano')) {
        // Ako jeste, odustajemo od rezervacije
        sediste.classList.remove('rezervisano');
    } else {
        // Ako nije, označavamo sedište kao rezervisano
        sediste.classList.add('rezervisano');
    }

    // Prikazujemo informacije o rezervaciji
    prikaziInformacijeORezervaciji();
}

// Funkcija za prikazivanje informacija o rezervaciji
function prikaziInformacijeORezervaciji() {
    var rezervisanaSedista = document.querySelectorAll('.rezervisano');
    var rezervacijaInfo = document.getElementById('rezervacija-info');

    var ukupnaCena = 0;

    // Ako nema rezervisanih sedišta, sakrijemo div rezervacija-info
    if (rezervisanaSedista.length === 0) {
        rezervacijaInfo.style.display = 'none';
        return; // Izlazimo iz funkcije jer nema potrebe za daljim izvršavanjem
    }

    // Kreiramo HTML za informacije o rezervaciji
    var rezervacijaHTML = '<h3>Резервисана седишта:</h3><ul>';

    rezervisanaSedista.forEach(function(sediste) {
        var red = Math.ceil(parseInt(sediste.textContent) / 10);
        var cena = predstave[dropPredstava.selectedIndex].cena;

        ukupnaCena += cena;

        rezervacijaHTML += `<li>Ред: ${red}, Број седишта: ${sediste.textContent}, Цена улазнице: ${cena} дин</li>`;
    });

    rezervacijaHTML += `</ul><p><strong>Укупна цена:</strong> ${ukupnaCena} дин</p><button onclick="rezervisi()">Резервиши</button>`;

    // Postavljamo HTML sadržaj u div rezervacija-info
    rezervacijaInfo.innerHTML = rezervacijaHTML;

    // Prikazujemo div rezervacija-info
    rezervacijaInfo.style.display = 'block';
}

// Funkcija za rezervisanje odabranih sedišta
function rezervisi() {
    // Ovde možeš dodati logiku za slanje rezervacije na server ili neku drugu akciju koju želiš da izvršiš
    // Na primer, možeš poslati AJAX zahtev sa informacijama o rezervaciji
    alert('Rezervacija uspešno izvršena!');
}

// Funkcija za obradu klika na sedište
function klikNaSediste(event) {
    var sediste = event.target;

    // Proveravamo da li je sedište već rezervisano
    if (!sediste.classList.contains('rezervisano')) {
        // Ako nije rezervisano, označavamo ga kao rezervisano (bojimo ga)
        sediste.classList.add('rezervisano');
    } else {
        // Ako je već rezervisano, odustajemo od rezervacije (uklanjamo boju)
        sediste.classList.remove('rezervisano');
    }

    // Prikazujemo informacije o rezervaciji
    prikaziInformacijeORezervaciji();
}

// Dodajemo event listener za klik na sedišta
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('sediste')) {
        event.target.classList.toggle('selected'); // Toggle klasu 'selected' na kliknutom sedištu
    }
});

// Funkcija za prikazivanje informacija o sedištu
function prikaziInformacijeOSedistu(sediste) {
    var red = Math.ceil(sediste / 10); // Računamo red sedišta
    var brojSedista = sediste; // Broj sedišta je upravo broj koji je generisan
    var cena = predstave[dropPredstava.selectedIndex].cena; // Dobavljamo cenu izabranog filma

    var informacije = `Ред: ${red}, Број седишта: ${brojSedista}, Цена улазнице: ${cena} din`;

    return informacije;
}
// Funkcija za postavljanje događaja pri prelasku mišem preko sedišta
function postaviDogadjajZaSedista() {
    var sedista = document.querySelectorAll('.sediste');

    sedista.forEach(function(sediste) {
        sediste.addEventListener('mouseenter', function() {
            var informacije = prikaziInformacijeOSedistu(parseInt(this.textContent));
            // Kreiramo padajući meni sa informacijama i pozicioniramo ga u odnosu na sedište
            var dropdown = document.createElement('div');
            dropdown.classList.add('dropdown');
            dropdown.textContent = informacije;
            dropdown.style.position = 'absolute';
            dropdown.style.top = sediste.offsetTop + sediste.offsetHeight + 'px'; // Pozicioniramo ispod sedišta
            dropdown.style.left = sediste.offsetLeft + 'px';
            sediste.appendChild(dropdown);
        });

        sediste.addEventListener('mouseleave', function() {
            // Uklanjamo padajući meni kada miš napusti sedište
            var dropdown = this.querySelector('.dropdown');
            if (dropdown) {
                dropdown.remove();
            }
        });
    });
}





// var predstave = [
//     {
//         naziv: "Ко је убио Џенис Џоплин?",
//         datum: "28.04.2024",
//         termin: "20:00",
//         cena: 1000,
//         reziser: "Соња Петровић",
//         trajanje: "2 sata",
//         slika: "slike/dzenisdzoplin.jpg",
//         zanr: "драма"
//     },
//     {
//         naziv: "Била једном једна земља",
//         datum: "29.04.2024",
//         termin: "19:00",
//         cena: 1100,
//         reziser: "Кокан Младеновић",
//         trajanje: "2 sata",
//         slika: "slike/bilajednomjednazemlja.jpg",
//         zanr: "драма"
//     },
//     {
//         naziv: "Kaко сам постала фрајла",
//         datum: "30.04.2024",
//         termin: "20:00",
//         cena: 1200,
//         reziser: "Вишња Обрадовић",
//         trajanje: "2 sata",
//         slika: "slike/kakosampostalafrajla.jpg",
//         zanr: "комедија"
//     },
//     {
//         naziv: "Враголанка",
//         datum: "03.05.2024",
//         termin: "20:30",
//         cena: 800,
//         reziser: "Калин Ханциу",
//         trajanje: "1.5 sati",
//         slika: "slike/vragolanka.jpg",
//         zanr: "балет"
//     },
//     {
//         naziv: "Ујеж",
//         datum: "03.05.2024",
//         termin: "20:00",
//         cena: 1000,
//         reziser: "Радослав Миленковић",
//         trajanje: "2 sata",
//         slika: "slike/ujez.jpg",
//         zanr: "комедија"
//     },
//     {
//         naziv: "Вештице из Салема",
//         datum: "05.05.2024",
//         termin: "20:00",
//         cena: 1100,
//         reziser: "Никита Миливојевић",
//         trajanje: "2 sata",
//         slika: "slike/vesticeizsalema.jpg",
//         zanr: "драма"
//     },
//     {
//         naziv: "Не мо`ш побећи од недеље",
//         datum: "09.05.2024",
//         termin: "20:00",
//         cena: 900,
//         reziser: "Тамара Кострешевић",
//         trajanje: "2 sata",
//         slika: "slike/nemospobeciodnedelje.jpg",
//         zanr: "драма"
//     },
//     {
//         naziv: "Женидба на чардаку",
//         datum: "10.05.2024",
//         termin: "19:30",
//         cena: 1000,
//         reziser: "Соња Петровић",
//         trajanje: "2 sata",
//         slika: "slike/zenidbanacardaku.jpg",
//         zanr: "драма"
//     },
//     {
//         naziv: "Мишја грозница",
//         datum: "12.05.2024",
//         termin: "20:00",
//         cena: 1000,
//         reziser: "Ђорђе Нешовић",
//         trajanje: "2 sata",
//         slika: "slike/misjagroznica.jpg",
//         zanr: "драма"
//     },
//     {
//         naziv: "Алабама",
//         datum: "15.05.2024",
//         termin: "20:00",
//         cena: 1000,
//         reziser: "Рахим Бурхан",
//         trajanje: "2 sata",
//         slika: "slike/alabama.jpg",
//         zanr: "драма"
//     },
//     {
//         naziv: "Царство мрака",
//         datum: "16.05.2024",
//         termin: "20:00",
//         cena: 1000,
//         reziser: "Игор Вук Торбица",
//         trajanje: "2 sata",
//         slika: "slike/carstvomraka.jpg",
//         zanr: "драма"
//     },
//     {
//         naziv: "Севиљски берберин",
//         datum: "21.05.2024",
//         termin: "20:00",
//         cena: 1000,
//         reziser: "Иван Клеменц",
//         trajanje: "2 sata",
//         slika: "slike/seviljskiberberin.jpg",
//         zanr: "опера"
//     },
//     {
//         naziv: "Дејт",
//         datum: "30.05.2024",
//         termin: "20:00",
//         cena: 1400,
//         reziser: "Сандра Силађев",
//         trajanje: "2 sata",
//         slika: "slike/dejt.jpg",
//         zanr: "драма"
//     },
// ];

// // Funkcija za popunjavanje padajućeg menija sa opcijama za predstave
// function popuniPadajuciMeni() {
//     var dropPredstava = document.getElementById("dropPredstava");

//     // Iteriramo kroz sve predstave i dodajemo opcije u padajući meni
//     predstave.forEach(function(predstava) {
//         var option = document.createElement("option");
//         option.value = predstava.naziv; // Postavljamo vrednost opcije na naziv predstave
//         option.textContent = predstava.naziv; // Postavljamo tekst opcije na naziv predstave
//         dropPredstava.appendChild(option);
//     });
// }

// // Funkcija za generisanje sedišta unutar redova pozorisne sale
// function generisiSedista() {
//     var pozorisnaSala = document.querySelector('.pozorisna-sala');
//     for (var i = 1; i <= 5; i++) {
//         var redDiv = document.createElement('div');
//         redDiv.classList.add('red' + i);
//         for (var j = 1; j <= 10; j++) {
//             var sedisteDiv = document.createElement('div');
//             sedisteDiv.classList.add('sediste');
//             sedisteDiv.id = 'sediste_' + j;
//             sedisteDiv.textContent = (i - 1) * 10 + j;
//             redDiv.appendChild(sedisteDiv);
//         }
//         pozorisnaSala.appendChild(redDiv);
//     }

//     // Dodavanje event listenera na sva sedišta
//     var sedista = document.querySelectorAll('.sediste');
//     sedista.forEach(function(sediste) {
//         sediste.addEventListener('click', klikNaSediste);
//     });
// }

// // Pozivamo funkciju za popunjavanje padajućeg menija kada se stranica učita
// window.onload = function() {
//     popuniPadajuciMeni();
//     generisiSedista();
//     postaviDogadjajZaSedista();

// };

// function prikaziInformacijeORezervaciji() {
//     var rezervisanaSedista = document.querySelectorAll('.rezervisano');
//     var rezervacijaInfo = document.getElementById('rezervacija-info');

//     var ukupnaCena = 0;

//     // Očistimo postojeći sadržaj div-a rezervacija-info
//     rezervacijaInfo.innerHTML = '';

//     // Ako nema rezervisanih sedišta, sakrijemo div rezervacija-info
//     if (rezervisanaSedista.length === 0) {
//         rezervacijaInfo.style.display = 'none';
//         return; // Izlazimo iz funkcije jer nema potrebe za daljim izvršavanjem
//     }

//     // Kreiramo niz stringova sa informacijama o rezervaciji
//     var rezervacijaHTMLArray = [];
//     rezervisanaSedista.forEach(function(sediste) {
//         var red = Math.ceil(parseInt(sediste.textContent) / 10);
//         var cena = predstave[dropPredstava.selectedIndex].cena;

//         ukupnaCena += cena;

//         rezervacijaHTMLArray.push(`<li>Ред: ${red}, Број седишта: ${sediste.textContent}, Цена улазнице: ${cena} дин</li>`);
//     });

//     // Spajamo sve stringove u jedan string
//     var rezervacijaHTML = '<h3>Резервисана седишта:</h3><ul>' + rezervacijaHTMLArray.join('') + `</ul><p><strong>Укупна цена:</strong> ${ukupnaCena} дин</p><button onclick="rezervisi()">Резервиши</button>`;

//     // Postavljamo HTML sadržaj u div rezervacija-info
//     rezervacijaInfo.innerHTML = rezervacijaHTML;

//     // Prikazujemo div rezervacija-info
//     rezervacijaInfo.style.display = 'block';
// }

// // Funkcija za obradu klika na sedište
// function klikNaSediste(event) {
//     var sediste = event.target;

//     // Proveravamo da li je sedište već rezervisano
//     if (!sediste.classList.contains('rezervisano')) {
//         // Ako nije rezervisano, označavamo ga kao rezervisano (bojimo ga)
//         sediste.classList.add('rezervisano');
//     } else {
//         // Ako je već rezervisano, uklanjamo oznaku rezervacije (uklanjamo klasu 'rezervisano')
//         sediste.classList.remove('rezervisano');
//     }

//     // Prikazujemo informacije o rezervaciji
//     prikaziInformacijeORezervaciji();
// }


// // Funkcija za rezervisanje odabranih sedišta
// function rezervisi() {
//     // Ovde možeš dodati logiku za slanje rezervacije na server ili neku drugu akciju koju želiš da izvršiš
//     // Na primer, možeš poslati AJAX zahtev sa informacijama o rezervaciji
//     alert('Rezervacija uspešno izvršena!');
// }


// // Dodajemo event listener za klik na sedišta
// document.addEventListener('click', function(event) {
//     if (event.target.classList.contains('sediste')) {
//         event.target.classList.toggle('selected'); // Toggle klasu 'selected' na kliknutom sedištu
//     }
// });

// // Funkcija za prikazivanje informacija o sedištu
// function prikaziInformacijeOSedistu(sediste) {
//     var red = Math.ceil(sediste / 10); // Računamo red sedišta
//     var brojSedista = sediste; // Broj sedišta je upravo broj koji je generisan
//     var cena = predstave[dropPredstava.selectedIndex].cena; // Dobavljamo cenu izabranog filma

//     var informacije = `Ред: ${red}, Број седишта: ${brojSedista}, Цена улазнице: ${cena} din`;

//     return informacije;
// }
// // Funkcija za postavljanje događaja pri prelasku mišem preko sedišta
// function postaviDogadjajZaSedista() {
//     var sedista = document.querySelectorAll('.sediste');

//     sedista.forEach(function(sediste) {
//         sediste.addEventListener('mouseenter', function() {
//             var informacije = prikaziInformacijeOSedistu(parseInt(this.textContent));
//             // Kreiramo padajući meni sa informacijama i pozicioniramo ga u odnosu na sedište
//             var dropdown = document.createElement('div');
//             dropdown.classList.add('dropdown');
//             dropdown.textContent = informacije;
//             dropdown.style.position = 'absolute';
//             dropdown.style.top = sediste.offsetTop + sediste.offsetHeight + 'px'; // Pozicioniramo ispod sedišta
//             dropdown.style.left = sediste.offsetLeft + 'px';
//             sediste.appendChild(dropdown);
//         });

//         sediste.addEventListener('mouseleave', function() {
//             // Uklanjamo padajući meni kada miš napusti sedište
//             var dropdown = this.querySelector('.dropdown');
//             if (dropdown) {
//                 dropdown.remove();
//             }
//         });
//     });
// }
