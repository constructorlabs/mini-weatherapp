let descriptionOfWeather = '';
let searchItem = "";
let thumbChildren = [];
const photoClass = document.querySelector('.photo');
const thumbsClass = document.querySelector('.thumbs');
fetch('http://api.openweathermap.org/data/2.5/weather?q=london&APPID=4357f1e42f31557280f32160d930b53b')
.then(function (response) {
    return response.json();
})
.then(function (body) {
    descriptionOfWeather = body.weather[0].description;
    photoRetrieve(descriptionOfWeather);
});



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
    thumbChildren  = results.map(element => `<img src=${element.urls.thumb}/>`).join('');
    thumbsClass.innerHTML = thumbChildren;
}