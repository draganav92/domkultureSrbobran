
$(document).ready(function(){
    // Pokretanje carousel-a
    $('#carouselExampleControls').carousel({
      interval: 2000 // Broj milisekundi između svake promene slike
    });
  });

  $(document).ready(function(){
    // Skrivanje svih kartica
    $(".card").hide();

    // Prikaz prvih 4 kartica
    $(".card:lt(4)").show();

    // Funkcija za prebacivanje na sledeću stranu
    $(".page-link").click(function(){
        var page = $(this).text();
        var cardsPerPage = 4;
        var start = (page - 1) * cardsPerPage;
        var end = start + cardsPerPage;

        // Skrivanje svih kartica
        $(".card").hide();

        // Prikazivanje kartica na odgovarajućoj strani
        $(".card").slice(start, end).show();
    });
});