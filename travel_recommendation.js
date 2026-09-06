const keyWords = {"beach": 0, "temple": 1, "countr": 2};
const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById("rstSearch");

btnSearch.addEventListener("click", displayRecommendations);
btnClear.addEventListener("click", clearRecommendation)


function clearRecommendation() {
    document.getElementById("recommendation-display").innerHTML = "";
}


async function displayRecommendations() {
    const categoryIndex = getInputRecommendation();
    const section = document.getElementById("recommendation-display");
    clearRecommendation(section);
    if (categoryIndex < 0) {
        return;
    }
   
    const stringJson = await getTravelRecommendation();
    const travelJson = JSON.parse(stringJson);

    const categories = ["beaches", "temples", "countries"];
    const category = categories[categoryIndex];
    const recommendations = travelJson[category];
    if (category != "countries") {
        recommendations.forEach((place) => {
            const card = document.createElement("article");
            card.className = "recommendation-card";

            card.innerHTML = `
                <img src="${place.imageUrl}" alt="${place.name}">
                <div class="recommendation-content">
                    <h2>${place.name}</h2>
                    <p>${place.description}</p>
                </div>
            `;

            section.appendChild(card);
        });
    } else {
        recommendations.forEach((country) => {
            let cities = country.cities;
            cities.forEach((city) => {
            
                const card = document.createElement("article");
                card.className = "recommendation-card";
    
                card.innerHTML = `
                    <img src="${city.imageUrl}" alt="${city.name}">
                    <div class="recommendation-content">
                        <h2>${city.name}</h2>
                        <p>${city.description}</p>
                    </div>
                `;
                section.appendChild(card);
            });
        });
    }
}

function getInputRecommendation() {
    let userInput = document.getElementById("recommendation").value.trim();
    if ( userInput != "" ) {
        const regex = RegExp("beach|temple|countr","i");
        let result = userInput.match(regex);
        if ( result !== null ) {
            console.log(keyWords[result[0]]);
            return keyWords[result[0]];
        } else {
            console.log(result);
            return -1;
        }
    }
}

//Retrieve JSON contents
async function getTravelRecommendation() {
    debugger;
    const URL = "./travel_recommendation_api.json";
    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error(`response status: ${response.status}`);
        }
        
        const travelJson = await response.json()
        console.log(travelJson);
        return JSON.stringify(travelJson);

    } catch (e) {
        console.error(e.message);
    }
}

