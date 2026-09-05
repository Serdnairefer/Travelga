const keyWords = {"beach": 0, "temple": 1, "countr": 2};
const btnSearch = document.getElementById("btnSearch");
btnSearch.addEventListener("click", getInputRecommendation);


function getInputRecommendation() {
    debugger;
    let userInput = document.getElementById("recommendation").value.trim();
    if ( userInput != "" ) {
        const regex = "/beach|temple|countr/i";
        let result = userInput.match(regex)
        if ( typeof(result) != null ) {
            console.log("Found recommendation");
            return keyWords[result[0]];
        } else {
            console.log("Foundn't recommendation");
            return -1;
        }
    }
}

//Retrieve JSON contents
async function getTravelRecommendation() {
    const URL = "./travel_recommendation_api.json";
    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error(`response status: ${response.status}`);
        }
        
        const travelJson = await response.json()
        console.log(travelJson);

    } catch (e) {
        console.error(e.message);
    }
    return travelJson;
}

