//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    var usuarioGuardado = localStorage.getItem('usuario');

    var usernameOnScreen = document.getElementById('username');

    if (usuarioGuardado === null) {
        alert("Ingresa con tu cuenta de usuario para acceder a eMercado.");
        window.location.href = "login.html";
    } else {
        usernameOnScreen.innerHTML = '<b>' + usuarioGuardado + '</b>';
    }
});

function relogin() {
    let savedUser = localStorage.getItem('usuario');
    if (savedUser !== null) {
        localStorage.removeItem('usuario');
    };
};