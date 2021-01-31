var endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

var cities = [];

fetch(endpoint)
.then(allData => allData.json())
.then(data => cities.push(...data))

function findMatches(wordToMatch, cities){
    return cities.filter(place => {
        var regex1 = new RegExp(wordToMatch,'gi');
        return place.city.match(regex1) || place.state.match(regex1)
    })
}

function numWithCommas(comma){
    return comma.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches(){
    var matchArray = findMatches(this.value, cities)
    var html = matchArray.map(place=>{
        var regex2 = new RegExp(this.value, 'gi');
        var cityName = place.city.replace(regex2, `<span class="highlighted">${this.value}</span>`);
        var stateName = place.state.replace(regex2, `<span class="highlighted">${this.value}</span>`);
        console.log(stateName)
        return `
            <li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">POPULATION:${numWithCommas(place.population)}</span>
            </li>
        `;
    }).join("")
    suggestions.innerHTML = html;
}

var searchIn = document.querySelector(".search");
var suggestions = document.querySelector(".suggestions");

searchIn.addEventListener('change', displayMatches)
searchIn.addEventListener('keyup', displayMatches)

