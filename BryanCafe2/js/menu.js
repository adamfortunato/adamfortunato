const XHR = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
let mealList, hotBevs, otherBevs;

XHR.onreadystatechange = function() {
    if (XHR.readyState === 4 && XHR.status === 200) {
        console.log(XHR.responseXML);  // Log the XML data to ensure it's being fetched
        if (fetchMenu()) {
            populateMenu(mealList, hotBevs, otherBevs);
        }
    }
};

XHR.open("GET", "xml/menu.xml", true);
XHR.send();

function fetchMenu() {
    if (XHR.readyState === 4 && XHR.status === 200) {
        // Fetch the correct elements from the XML structure and check for null values
        const meals = XHR.responseXML.getElementsByTagName('meals');
        const hotBeverages = XHR.responseXML.getElementsByTagName('hotBeverages');
        const otherBeverages = XHR.responseXML.getElementsByTagName('otherBeverages');

        // Ensure meals exist before accessing
        if (meals.length > 0) {
            mealList = meals[0].children;
        } else {
            console.error("No meals found in the XML");
            mealList = [];  // Prevent further errors
        }

        // Ensure hot beverages exist before accessing
        if (hotBeverages.length > 0) {
            hotBevs = hotBeverages[0].children;
        } else {
            console.error("No hot beverages found in the XML");
            hotBevs = [];  // Prevent further errors
        }

        // Ensure other beverages exist before accessing
        if (otherBeverages.length > 0) {
            otherBevs = otherBeverages[0].children;
        } else {
            console.error("No other beverages found in the XML");
            otherBevs = [];  // Prevent further errors
        }

        return true;
    }
    return false;
}

function populateMenu(meals, hotBevs, otherBevs) {
    populateMeals(meals);
    populateBeverages(hotBevs, otherBevs);
}

function populateMeals(meals) {
    let menu = document.getElementById('menu');
    
    for (let i = 0, n = meals.length; i < n; i++) {
        let name = meals[i].getElementsByTagName("name")[0]?.textContent || "Unnamed Meal";
        let price = meals[i].getElementsByTagName("price")[0]?.textContent || "N/A";
        let imageURL = meals[i].getElementsByTagName("imageURL")[0]?.textContent || "images/default.jpg";
        let desc = meals[i].getElementsByTagName("description")[0]?.textContent || "No description available.";

        menu.appendChild(generateCard(name, price, desc, imageURL));
    }
}

function populateBeverages(hotBevs, otherBevs) {
    let menu = document.getElementById('menu');

    // Populate hot beverages
    for (let i = 0, n = hotBevs.length; i < n; i++) {
        let size = `Coffee and hot chocolates - ${hotBevs[i].getElementsByTagName("size")[0]?.textContent || "Unknown size"}`;
        let price = hotBevs[i].getElementsByTagName("price")[0]?.textContent || "N/A";
        let imageURL = "images/beverage.jpg";
        let desc = hotBevs[i].getElementsByTagName("description")[0]?.textContent || "No description available.";

        menu.appendChild(generateCard(size, price, desc, imageURL));
    }

    // Populate other beverages
    for (let i = 0, n = otherBevs.length; i < n; i++) {
        let name = otherBevs[i].getElementsByTagName("name")[0]?.textContent || "Unnamed Beverage";
        let price = otherBevs[i].getElementsByTagName("price")[0]?.textContent || "N/A";
        let imageURL = "images/beverage.jpg";
        let desc = "";  // Optional description

        menu.appendChild(generateCard(name, price, desc, imageURL));
    }
}

function generateCard(name, price, desc, imageURL) {
    let card = document.createElement("div");
    card.classList.add("col");

    card.innerHTML = `
        <div class="card">
            <img src="${imageURL}" class="card-img-top" alt="Menu item ${name}">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${desc}</p>
                <p class="card-text">$${price}</p>
            </div>
        </div>
    `;

    return card;
}
