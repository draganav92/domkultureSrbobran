function toggleLoginRegister() {
    var container = document.querySelector('.login-register-container');
    container.classList.toggle('active');
}

function showLogin() {
    document.getElementById('login-card').classList.add('active');
    document.getElementById('register-card').classList.remove('active');
}

function showRegister() {
    document.getElementById('register-card').classList.add('active');
    document.getElementById('login-card').classList.remove('active');
}

function register(event) {
    event.preventDefault();
    let username = document.getElementById('register-username').value;
    let password = document.getElementById('register-password').value;
    let email = document.getElementById('register-email').value;

    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('email', email);

    fetch('http://localhost/login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        alert("Poruka: " + data.message.text);

        location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function login(event) {
    event.preventDefault();
    let username = document.getElementById('login-username').value;
    let password = document.getElementById('login-password').value;

    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    console.log(formData);

    fetch('http://localhost/login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.success && data.korisnik && data.korisnik.IDKorisnik == 1) {
            localStorage.setItem('loggedInUser', JSON.stringify(data));

            console.log("ovde sam");
            document.getElementById("admin-link").style.display = 'block';
            document.getElementById('logout-btn').style.display = 'block';
            document.getElementById('loginRegister-btn').style.display = 'none';
            document.getElementById('loginRegisterDiv').style.display = 'none';
        } else {
            localStorage.setItem('loggedInUser', JSON.stringify(data));
            console.log("nisam di treba");
            console.log(data.success);
            console.log(data.korisnik.IDKorisnik);
            document.getElementById('logout-btn').style.display = 'block';
            document.getElementById('loginRegister-btn').style.display = 'none';
            document.getElementById('loginRegisterDiv').style.display = 'none';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}



function logout() {

    let formData = new FormData();
    formData.append('logout', true);
    fetch('http://localhost/login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data); 
        localStorage.removeItem('loggedInUser');
        location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        var kor = JSON.parse(loggedInUser);
        console.log(kor.korisnik.IDKorisnik);
        document.getElementById('logout-btn').style.display = 'block';
        document.getElementById('loginRegister-btn').style.display = 'none';
        if(kor.korisnik.IDKorisnik === 1) {
            document.getElementById('admin-link').style.display = 'block';
        }
    }
});
