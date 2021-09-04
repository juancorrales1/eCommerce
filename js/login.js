//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("formBox").addEventListener('submit', formValidate); 
});

function formValidate(event) {
  event.preventDefault();
  var user = document.getElementById('loginUser').value;
  var pass = document.getElementById('loginPassword').value;
  
  localStorage.setItem('usuario', user);

  this.submit();
}