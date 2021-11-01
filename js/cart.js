//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const CART2_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART2_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            let cart = resultObj.data;
            let cartArticles = cart.articles;
            let tbody = document.getElementById("tbody");
            let totalSpan = document.getElementById("total");
            let total = 0;

            function subtotalCalc(param1, param2) {
                return param1 * param2;
            };

            function sum(num1, num2) {
                return num1 + num2;
            };

            let cartDataToHTML = "";
            for (article of cartArticles) {
                let unitCost = article.unitCost;
                let unitCount = article.count;

                cartDataToHTML += `
                    <tr>
                        <td><img src="${article.src}" alt="${article.name}" height="100"></td>
                        <td>${article.name}</td>
                        <td class="articleCost">${article.unitCost}</td>
                        <td class="currency">${article.currency}</td>
                        <td><input type="number" class="amount" min="0" value="${unitCount}"></td>
                        <td class="subtotal">${article.currency === "USD" ? subtotalCalc(unitCost, unitCount) * 40 : subtotalCalc(unitCost, unitCount)}</td>
                    </tr>
                    `
                if (article.currency === "USD") {
                    total += subtotalCalc(unitCost, unitCount) * 40;
                } else {
                    total += subtotalCalc(unitCost, unitCount);
                };
            };
            tbody.innerHTML = cartDataToHTML;
            totalSpan.innerHTML = total;
            subtotalModifier();

        };

        function subtotalModifier() {
            for (let i = 0; i < amountElem.length; i++) {
                amountElem[i].addEventListener('input', (e) => {
                    let value = e.target.value;
                    let articleValue = articleCostElem[i].innerHTML;

                    if (value < 0) {
                        value = 0;
                    } else if (currencyElem[i].innerHTML === "USD") {
                        subtotalElem[i].innerHTML = parseInt(subtotalCalc(articleValue, value)) * 40;
                        totalValues[i] = parseInt(subtotalCalc(articleValue, value)) * 40;
                    } else {
                        subtotalElem[i].innerHTML = parseInt(subtotalCalc(articleValue, value));
                        totalValues[i] = parseInt(subtotalCalc(articleValue, value));
                    };
                    console.log(totalValues);
                    document.getElementById("total").innerHTML = totalValues.reduce(sum);
                });
            };
        };
    });

    let totalValues = [];
    let amountElem = document.getElementsByClassName('amount');
    let subtotalElem = document.getElementsByClassName('subtotal');
    let articleCostElem = document.getElementsByClassName('articleCost');
    let currencyElem = document.getElementsByClassName('currency');
});