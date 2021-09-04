let currentArray = [];

const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentSortCriteria = ORDER_ASC_BY_NAME;
var minCount = undefined;
var maxCount = undefined;

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentArray = resultObj.data;
            //Llamamos a la funcion que procesa los datos
            procesar_datos(currentArray);
        }
    })
});

//Funcion general, que va a comprobar que los input de min y max contengan algo, en el caso de que no, rellenaremos las variables con undefined. 
function procesar_datos() {
    
    // Colocamos undefined para que el if al momento de imprimir la lista no falle, por como esta hecho el metodo.
    minCount = document.getElementById('rangeFilterCountMin_product').value;
    maxCount = document.getElementById('rangeFilterCountMax_product').value;

    if (minCount == ""){
        minCount = undefined; 
    }

    if (maxCount == ""){
        maxCount = undefined;
    }

    //Llamamos a la funcion general que aplica los filtros.
    currentArray = sortProduct(currentSortCriteria, currentArray);
    
    //Llamamos a la funcion que recorre el array e imprime.
    showProductsList(currentArray);
}

//Cambian el sistema de ordenamiento actual y ejecuta el filtro, luego imprime nuevamente la lista. Se llaman desde HTML.
function changeOrderFilterAZ() {
    currentSortCriteria = ORDER_ASC_BY_NAME;
    procesar_datos(currentArray);
}

function changeOrderFilterZA() {
    currentSortCriteria = ORDER_DESC_BY_NAME;
    procesar_datos(currentArray);
}

function changeOrderFilterCount() {
    currentSortCriteria = ORDER_BY_PROD_COUNT;
    procesar_datos(currentArray);
}

//Coloca las variables a como vienen por default y genera la lista nuevamente. Se llama desde HTML.
function limpiarProducto() {
    document.getElementById('rangeFilterCountMin_product').value = "";
    document.getElementById('rangeFilterCountMax_product').value = "";
    procesar_datos(currentArray);
}

function sortProduct(criteria, array) {
    let result = [];

    //Realizamos una serie de if para comprobar que filtro se debe aplicar.
    //En el primer y segundo caso comprueba sin necesidad de usar funciones adicionales ya que son caracteres.
    //En el tercer caso se usa parseInt para que no haya errores, ya que el tipo de dato que se pasa por parámetro es un número. 
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    //Retorna el nuevo array ya ordenado.
    return result;
}

//Recorre el array y genera html en base a los objetos.
function showProductsList(array){
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let category = array[i];

        //En caso de no cumplir con los filtros no se agrega a la variable.
        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))){

            htmlContentToAppend += `
            <a href="category-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ category.name +`</h4>
                            <small class="text-muted">` + category.soldCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + category.description + `</p>
                        <p class="mb-1">` + category.currency + " " + category.cost + `</p>
                    </div>
                </div>
            </a>
            `
        }

        //Por ultimo modificamos el DOM directamente con el nuevo HTML.
        document.getElementById("currentDiv").innerHTML = htmlContentToAppend;
    }
}
