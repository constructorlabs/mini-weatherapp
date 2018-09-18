let descriptionOfWeather = '';
let searchItem = "";
let thumbChildren = [];
let cityName = 'london';
let currentTemperature;
let weatherIcon;
const photoClass = document.querySelector('.photo');
const thumbsClass = document.querySelector('.thumbs');
const searchClass = document.querySelector('.search');
const searchInputClass = document.querySelector('.search__input');
const creditUserClass = document.querySelector('#credit-user');
const conditionsId = document.querySelector('#conditions');
const weatherIconClass = document.querySelector('.info__item__icon');

searchClass.addEventListener('submit', (e) => {
    e.preventDefault();
    cityName = searchInputClass.value;
    runFetch(cityName);
    searchInputClass.value = "";
});

function runFetch (cityName) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=4357f1e42f31557280f32160d930b53b`)
        .then(function (response) {
            return response.json();
        })
        .then(function (body) {
            descriptionOfWeather = body.weather[0].description;
            photoRetrieve(descriptionOfWeather);
            currentTemperature = (body.main.temp - 273.15).toFixed(0);
            weatherIcon = `http://openweathermap.org/img/w/${body.weather[0].icon}.png`;
        });
}

runFetch(cityName);


function photoRetrieve(descriptionOfWeather) {
    searchItem = descriptionOfWeather;
    fetch(`https://api.unsplash.com/search/photos?query=${searchItem}&client_id=6a4f4e5b8174d85cf0999bc9ae0e6fbd6e377e0e8d97cf30b63de811b03a4c89`)
        .then(function (response) {
            return response.json();
        })
        .then(function (body) {
            photoCreate(body.results)
        })
}

function photoCreate(results) {
    thumbChildren  = results.map(element => `<img class="thumbs__link thumb" data-name="${element.user.name}" data-portfolio="${element.user.portfolio_url}" data-fullPhoto="${element.urls.full}" src=${element.urls.thumb}/>`).join('');
    thumbsClass.innerHTML = thumbChildren;
    thumbsClass.children[0].className += ' active';
    photoClass.innerHTML = `<img src=${results[0].urls.full}/>`;
    creditUserClass.textContent = results[0].user.name;
    if (results[0].user.portfolio_url !==  'null') {
        creditUserClass.setAttribute('href', results[0].user.portfolio_url);
        creditUserClass.setAttribute('target', "_blank");
    }
    weatherIconClass.innerHTML = `<img src='${weatherIcon}'/>`;
    conditionsId.textContent = `${descriptionOfWeather} ${currentTemperature}˚C in ${cityName}`;
}

thumbsClass.addEventListener('click', () => {
    thumbsClass.children[0].classList.remove('active');
    event.target.classList.toggle('.active');
    photoClass.innerHTML = `<img src=${event.target.dataset.fullphoto}/>`;
    creditUserClass.textContent = event.target.dataset.name;
    if (event.target.dataset.portfolio !== "null") {
        creditUserClass.setAttribute('href', event.target.dataset.portfolio);
        creditUserClass.setAttribute('target', "_blank");
    } else {
        creditUserClass.setAttribute('href', '#');
    }
});