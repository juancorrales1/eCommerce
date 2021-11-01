//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    document.getElementById("profileForm").addEventListener('submit', profileFormValidate);
    let name = document.getElementById('nameInput');
    let surname = document.getElementById('surnameInput');
    let email = document.getElementById('emailInput');
    let number = document.getElementById('numberInput');
    let modificationDate = document.getElementById('modificationDate');
    let dateElement = new Date();
    var date = dateElement.getFullYear() + '-' + (dateElement.getMonth() + 1) + '-' + dateElement.getDate();
    var time = dateElement.getHours() + ':' + dateElement.getMinutes() + ':' + dateElement.getSeconds();
    var dateAndTime = date + ' ' + time;

    if (localStorage.getItem('profileData')) {

        let data = JSON.parse(localStorage.getItem('profileData'));

        let nameContainer = document.getElementById('nameContainer');
        let surnameContainer = document.getElementById('surnameContainer');
        let emailContainer = document.getElementById('emailContainer');
        let numberContainer = document.getElementById('numberContainer');



        nameContainer.innerHTML = data.name;
        surnameContainer.innerHTML = data.surname;
        emailContainer.innerHTML = data.email;
        numberContainer.innerHTML = data.number;
    };
});


function profileFormValidate(event) {
    event.preventDefault();
    let name = document.getElementById('nameInput');
    let surname = document.getElementById('surnameInput');
    let email = document.getElementById('emailInput');
    let number = document.getElementById('numberInput');
    let nameContainer = document.getElementById('nameContainer');
    let surnameContainer = document.getElementById('surnameContainer');
    let emailContainer = document.getElementById('emailContainer');
    let numberContainer = document.getElementById('numberContainer');



    nameContainer.innerHTML = name.value;
    surnameContainer.innerHTML = surname.value;
    emailContainer.innerHTML = email.value;
    numberContainer.innerHTML = number.value;


    var profileData = {
        name: name.value,
        surname: surname.value,
        email: email.value,
        number: number.value,
    };

    localStorage.setItem('profileData', JSON.stringify(profileData));
    name.value = "";
    surname.value = "";
    email.value = "";
    number.value = "";
};