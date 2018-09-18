//Weather URL set up
let cityName = "london";
const weatherURLBase = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}`;
const APIKey = '73a0db73557b252a663d1be585b65045';
const weatherURL = `${weatherURLBase}&APPID=${APIKey}`;

//Unsplash URL set up

let query = '';
const unsplashAPIKey = 'ad9982e29de08ede9a9626876b58459ede10d6946a4a7dd0f66e6cd8da0b4bb4';

//HTML references
const thumbsRef = document.querySelector('.thumbs');
const bigPhotoRef = document.querySelector('.photo');

fetchWeather(weatherURL);

//Fetch weather description 

function fetchWeather(weatherURL) {
    fetch(weatherURL)
    .then(response => response.json())
    .then(body => {
        fetchPhoto(removeSpaces(body.weather[0].description));
        });
    }

//Removes spaces for url
function removeSpaces(searchTerm) { 
    console.log(searchTerm);
    return searchTerm.split(" ").join("%20");
    }


//Fetches unsplash Json object
function fetchPhoto(serchTerm) {
    const unsplashURL = `https://api.unsplash.com/search/photos?query=${serchTerm}&client_id=${unsplashAPIKey}`;
    fetch(unsplashURL)
    .then(response => response.json())
    .then(body => {
        createThumbnails(body.results);
        createLargeImage(body.results);
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
function createLargeImage(imageArr) {
    bigPhotoRef.innerHTML = `<img src=${imageArr[0].urls.regular}>`;
    bigPhotoRef.setAttribute("data-id", imageArr[0].id);
    const thumb = document.querySelectorAll(".thumb");
    [...thumb][0].classList.toggle("active");
    //Listens for thumbnail click.
    const thumbImgRef = document.querySelectorAll('.thumb');
    thumbImgRef.forEach(item => {
        item.addEventListener('click', event => {
            event.target.classList.toggle("active");
            imageArr.forEach(item => {
                if (item.id === event.target.getAttribute('id')) {
                    bigPhotoRef.innerHTML = `<img src=${item.urls.regular}>`;
                    bigPhotoRef.setAttribute("data-id", item.id);
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

const form = document.querySelector("form");
const searchInput = document.querySelector(".search__input");
form.addEventListener("submit", function(event){
    event.preventDefault();
    cityName = searchInput.value;
    const weatherURLBase = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}`;
    const APIKey = '73a0db73557b252a663d1be585b65045';
    const weatherURL = `${weatherURLBase}&APPID=${APIKey}`;
    console.log(weatherURL);
    fetchWeather(weatherURL);
 })







