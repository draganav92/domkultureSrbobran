document.getElementById("kontaktForma").addEventListener("submit", function(event) {

    event.preventDefault();

    var formData = new FormData(this);
    console.log(formData);
    fetch('http://localhost/kontaktForma.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("kontaktForma").reset();

        console.log(data);
        alert(data.message);
    })
    .catch(error => {
        console.error('Greška:', error);
    });
});

// OVO