var productData = [];
var commentaryAndRating = [];

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            productData = resultObj.data;
            let productImages = productData.images;
            
            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostAndCurrencyHTML = document.getElementById("productCostAndCurrency");
            let productSoldCountHTML = document.getElementById("soldCount");

            productNameHTML.innerHTML = productData.name;
            productDescriptionHTML.innerHTML = productData.description;
            productCostAndCurrencyHTML.innerHTML = productData.currency + ' ' + productData.cost;
            productSoldCountHTML.innerHTML = productData.soldCount + ' vendidos';

            let imagesToHTML = "";
            for (let i = 0; i < productImages.length; i++) {
                if(i === 0){
                    imagesToHTML += `
                        <div class="carousel-item active">
                            <img src="` + productImages[i] + `" class="d-float w-100">
                        </div>
                        `
                } else {
                    imagesToHTML += `
                        <div class="carousel-item">
                            <img src="` + productImages[i] + `" class="d-float w-100">
                        </div>
                        `
                }
                
            }
            document.getElementById("currentCarousel").innerHTML = imagesToHTML;
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            commentaryAndRating = resultObj.data;

            let htmlContentToAppend = "";
            for(let i = 0; i < commentaryAndRating.length; i++){
                let comment = commentaryAndRating[i];        
                    htmlContentToAppend += `
                        <div class="list-group-item">
                            <div class="row">
                                <div class="col-3">
                                    <img src="img/defaultavatar.png" class="img-thumbnail">
                                </div>
                                <div class="col">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h4 class="mb-1">`+ comment.user +`</h4>
                                        <small class="text-muted">Puntaje: ` + puntajeEstrellas(comment.score) + `</small>
                                        <small class="text-muted">` + comment.dateTime + `</small>
                                    </div>
                                    <p class="mb-1">` + comment.description + `</p>
                                </div>
                            </div>
                        </div>
                        `
            }
            
        document.getElementById("commentsDiv").innerHTML = htmlContentToAppend;
        }
    });
});


function puntajeEstrellas(puntaje) {

    let starContentToAppend = "";

    for (let i = 0; i < puntaje; i++) {
        starContentToAppend +=`
        <span class="fa fa-star checked"></span>
        `
    }

    if(puntaje < 5){
        for (let i = puntaje; i < 5; i++) {
            starContentToAppend+=`
            <span class="fa fa-star"></span>
            `
            
        }
    }

    return starContentToAppend;
}

function commentValidate(event) {
    event.preventDefault();
    let inputValue = document.getElementById("exampleFormControlTextarea1").value;
    let currentUser = localStorage.getItem('usuario');
    let hoy = new Date();
    var fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora = fecha + ' ' + hora;
    let commentaryToAppend = "";
    let puntajeValue = document.getElementById("puntaje").value;
    commentaryToAppend += `
    <div class="list-group-item">
        <div class="row">
            <div class="col-3">
                <img src="img/defaultavatar.png" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">`+ currentUser +`</h4>
                    <small class="text-muted">Puntaje: `+ puntajeEstrellas(puntajeValue) +`</small>
                    <small class="text-muted">` + fechaYHora + `</small>
                </div>
                <p class="mb-1">` + inputValue + `</p>
            </div>
        </div>
    </div>
    `
    document.getElementById("commentsDiv").innerHTML += commentaryToAppend;
  }