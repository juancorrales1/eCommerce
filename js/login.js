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
  
  if(pass.length == 0 && user.length == 0){
    alert("Asegúrate de que has ingresado un usuario y contraseña.");
    return
}
  
  if(user.length == 0) {
    alert("Debes ingresar un usuario válido.");
    return;
  }
  
  if (pass.length == 0) {
    alert("Debes ingresar una contraseña válida.");
    return;
  }

  this.submit();
}