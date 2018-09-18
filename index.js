//Weather URL set up
const weatherURLBase = 'https://api.openweathermap.org/data/2.5/weather?q=London';
const APIKey = '73a0db73557b252a663d1be585b65045';
const weatherURL = `${weatherURLBase}&APPID=${APIKey}`;

//Unsplash URL set up

let query = '';
const unsplashAPIKey = 'ad9982e29de08ede9a9626876b58459ede10d6946a4a7dd0f66e6cd8da0b4bb4';

//HTML references
const thumbsRef = document.querySelector('.thumbs');
const bigPhotoRef = document.querySelector('.photo');


//Fetch
fetch(weatherURL)
.then(response => response.json())
.then(body => {
    
    query = body.weather[0].description;
    query = query.split(" ").join("%20");
    const unsplashURL = `https://api.unsplash.com/search/photos?query=${query}&client_id=${unsplashAPIKey}`;
    
    fetch(unsplashURL)
    .then(response => response.json())
    .then(body => {
        console.log(body);
        bigPhotoRef.innerHTML = `<img src=${body.results[0].urls.regular}>`;
        body.results.forEach(item => {
            const thumb = document.createElement('img');
            thumb.setAttribute('src',item.urls.thumb);
            thumb.setAttribute('class','thumbImg');
            thumb.setAttribute('id',item.id);
            thumbsRef.appendChild(thumb);
        });

        const thumbImgRef = document.querySelectorAll('.thumbImg');
        thumbImgRef.forEach(item => {
            item.addEventListener('click', event => {
                body.results.forEach(item => {
                    if (item.id === event.target.getAttribute('id')) {
                        bigPhotoRef.innerHTML = `<img src=${item.urls.regular}>`;   
                    }
                });
                
    });
});
    });
});







