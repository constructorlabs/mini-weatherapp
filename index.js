//HTML references
const thumbsRef = document.querySelector('.thumbs');
const bigPhotoRef = document.querySelector('.photo');
const geoButtonRef = document.querySelector('.fa-map-marked-alt');
const form = document.querySelector("form");
const searchInput = document.querySelector(".search__input");
const conditionsRef = document.querySelector('#conditions');

//Weather URL set up
let cityName = "london";
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&APPID=73a0db73557b252a663d1be585b65045`;

fetchWeather(weatherURL);

//Fetch weather description 
function fetchWeather(weatherURL) {
    fetch(weatherURL)
    .then(response => response.json())
    .then(body => {
        console.log(body);
        fetchPhoto(removeSpaces(cityName + " " + body.weather[0].description + " weather"));
        populateCondition(body.weather[0].description,body.main.temp);
        });
    }  

//Removes spaces for url
function removeSpaces(searchTerm) { 
    return searchTerm.split(" ").join("%20");
}

//Populate weather condition and temperature on bottom left
function populateCondition(condition,temp) {
    conditionsRef.innerHTML = `${condition}, ${Math.round(temp)}°C`;
}  

//Fetches unsplash Json object
function fetchPhoto(serchTerm) {
    const unsplashURL = `https://api.unsplash.com/search/photos?query=${serchTerm}&client_id=ad9982e29de08ede9a9626876b58459ede10d6946a4a7dd0f66e6cd8da0b4bb4`;
    fetch(unsplashURL)
    .then(response => response.json())
    .then(body => {
        createThumbnails(body.results);
        createLargeImage(body.results[0]);
        const thumb = document.querySelectorAll(".thumb");
        [...thumb][0].classList.toggle("active");
        listenThumbnails(body.results);
    });
}
//Creates thumbnail element for each image in array
function createThumbnails(imageArr) {
    thumbsRef.innerHTML = "";
    imageArr.forEach(item => {
        const thumb = document.createElement('img');
        thumb.setAttribute('src',item.urls.thumb);
        thumb.setAttribute('class','thumb');
        thumb.setAttribute('id',item.id);
        thumbsRef.appendChild(thumb);
    });
}

//Creates large image and outline thumbnail
function createLargeImage(item) {
    bigPhotoRef.innerHTML = `<img src=${item.urls.regular}>`;
    bigPhotoRef.setAttribute("data-id", item.id);
    const creditUserRef = document.querySelector('#credit-user');
    creditUserRef.innerHTML = item.user.name;
    creditUserRef.setAttribute('href',item.user.links.html);
}

//Listens for thumbnail click.
function listenThumbnails(imageArr) {  
    const thumbImgRef = document.querySelectorAll('.thumb');
    thumbImgRef.forEach(item => {
        item.addEventListener('click', event => {
            event.target.classList.toggle("active");
            imageArr.forEach(item => {
                if (item.id === event.target.getAttribute('id')) {
                    createLargeImage(item);
                    turnOffBorder();   
                }
            });
        });
    });
}

//turns off all other outlines on thumbnails
function turnOffBorder() {
    const activeBorder = document.querySelectorAll(".active");
    activeBorder.forEach(image => {
        if (image.getAttribute('id') !== bigPhotoRef.getAttribute('data-id')) {
            image.classList.toggle("active"); 
        }
    })
}

//Listen for search submit
form.addEventListener("submit", function(event){
    event.preventDefault();
    cityName = searchInput.value;
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&APPID=73a0db73557b252a663d1be585b65045`;
    fetchWeather(weatherURL);
 });


 //Listen for location click
 geoButtonRef.addEventListener('click', event => {
    navigator.geolocation.getCurrentPosition(position => {
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${position.coords.latitude}&lon=${position.coords.longitude}&APPID=73a0db73557b252a663d1be585b65045`;
        fetchWeather(weatherURL);
    });
});







