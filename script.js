const unsplashApi = 'https://api.unsplash.com/search/photos?page=1&query=office&client_id=d1463f432cce4150640ff56ee13c1f94ec0b2993db4395bcb8913f34daeb0d48';
const thumbParent = document.querySelector(".thumbs");
const photoParent = document.querySelector(".photo");
const fullSize = [];
const photographerArr = [];
const formParent = document.querySelector(".search");
const credits = document.querySelector("#credit-user");

// generates the api url with location 
const generateApi = (location) => {
    if (location == undefined) {
        location = "london";
    }
    const openWeatherApi = `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=a5f7c750d155ca20e98664c5fb5fe010`;
    fetchWeather(openWeatherApi);
    
};

// 
function getDescription(body) {
    const weatherDescription = body.weather[0].description;
    const weatherDescriptionNoSpace = weatherDescription.replace(" ", "-");
    console.log(weatherDescriptionNoSpace);
    const weatherURL = `https://api.unsplash.com/search/photos?page=1&query=${weatherDescriptionNoSpace}&client_id=d1463f432cce4150640ff56ee13c1f94ec0b2993db4395bcb8913f34daeb0d48`
    fetchPhotos(weatherURL);
}

function displayPhotos(body) {
    const images = body.results;
    thumbParent.innerHTML = "";
    images.forEach((image, index) => {
        console.log(image.urls.full);
        thumbParent.innerHTML += `<img class="thumb" id="${index}" src="${image.urls.thumb}">`
        fullSize[index] = image.urls.regular;
        photographerArr[index] = image.user.name;
        console.log(photographerArr);
    })
    photoParent.innerHTML = `<img class="img" src="${fullSize[0]}">`
    credits.textContent = photographerArr[0];
}

thumbParent.addEventListener('click', event => {
    console.log(event.target.id)
    photoParent.innerHTML = `<img class="img" src="${fullSize[event.target.id]}">`
    const thumbList = document.querySelectorAll(".thumb");
    thumbList.forEach(thumb => {
        thumb.classList.remove("active");
        console.log(thumb);
    })
    event.target.classList.toggle("active");
    console.log(event.target.className);
    credits.textContent = photographerArr[event.target.id];

});

formParent.addEventListener('submit', event => {
    event.preventDefault();
    const location = event.target['0'].value;
    generateApi(location);
})

function fetchWeather(url) {
    // main news body fetch - button changeable
    fetch(url) // by default fetch makes a GET request
        .then(function (response) {

            return response.json();
        })
        .then(function (body) {
            //  parentNode.innerHTML = "";
            getDescription(body);
        });
}

function fetchPhotos(url) {
    // main news body fetch - button changeable
    fetch(url) // by default fetch makes a GET request
        .then(function (response) {

            return response.json();
        })
        .then(function (body) {
            //  parentNode.innerHTML = "";
            displayPhotos(body);
        });
}

generateApi();