
$(document).ready(function(){
    $('#carouselExampleControls').carousel({
      interval: 2000
    });
  });

  $(document).ready(function(){
    $(".card").hide();

    $(".card:lt(4)").show();

    $(".page-link").click(function(){
        var page = $(this).text();
        var cardsPerPage = 4;
        var start = (page - 1) * cardsPerPage;
        var end = start + cardsPerPage;

        $(".card").hide();

        $(".card").slice(start, end).show();
    });
});
