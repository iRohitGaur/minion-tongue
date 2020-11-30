var body = document.getElementsByTagName('body')[0];
var inputText = document.querySelector("#input-text");
var btnTranslate = document.querySelector("#button-translate");
btnTranslate.addEventListener("click", translateToMinion)
var outputDiv = document.querySelector("#output-translated");

let serverURL = "https://api.funtranslations.com/translate/minion.json"

function translateToMinion() {

    let textInput = inputText.value;

    if (textInput === "") {
        alert("Please enter a message first")
    } else {
        body.classList.add("running");

        let reqURL = serverURL + "?text=" + textInput

        fetch(reqURL)
        .then(function(response) {
            if (!response.ok) {
                throw (response.status);
            }
            return response.json();
        })
        .then(json => {
            outputDiv.innerText = json.contents.translated;
            body.classList.remove("running");
        })
        .catch(errorHandler)
    }
}

function errorHandler(error) {
    body.classList.remove("running");
    if (error === 429) {
        alert("Oops! We ran out of coins. Please try again in an hour.");
    } else if (error == "TypeError: Failed to fetch") {
        alert("Oops! Failed to fetch - Looks like you're not connected to Internet. Check that please and try again.");
    } else {
        alert(error);
    }
}