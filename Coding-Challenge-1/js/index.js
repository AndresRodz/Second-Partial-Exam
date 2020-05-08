let meal;

function fetchMeal(meal) {
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`;

    let settings = {
        method: 'GET'
    };

    fetch(url,settings)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJSON => {
            let results = document.querySelector('.js-search-results');
            results.innerHTML = "";

            if(responseJSON.items.length == 0) {
                results.innerHTML +=
                `
                <div>
                    <h1>Meal not found</h1>
                </div>
                `
            }
            else {
                for(let i = 0; i < responseJSON.items.length; i++) {
                    results.innerHTML +=
                    `
                    <div>
                        <h2>Name: ${responseJSON.items[i].id.strMeal}</h2>
                        <h4>Area: ${responseJSON.items[i].id.strArea}</h4>
                        <p>Instructions: ${responseJSON.items[i].id.strInstructions}</p>
                        <img src = "${responseJSON.items[i].id.strMealThumb}"/>
                    </div>
                    `
                }
            }
        })
        .catch(error => {
            console.log(error);
        });
}

function watchForm() {
    let submitButton = document.querySelector('.js-search-form');

    submitButton.addEventListener('click', (event) => {
        event.preventDefault();

        meal = document.querySelector('#query');
        fetchMeal(meal);
    });
}

function init() {
    watchForm();
}

init();