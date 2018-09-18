console.log("hello World");

const generateApi = () => {
    fetchContent(openWeatherApi);
    
};


function displayContent(body) {
    console.log(body.weather[0].description);
    const weatherDescription = body.weather[0].description;
    const weatherURL = `https://api.unsplash.com/search/photos?page=1&query=${weatherDescription}&client_id=d1463f432cce4150640ff56ee13c1f94ec0b2993db4395bcb8913f34daeb0d48`
}



const openWeatherApi = 'http://api.openweathermap.org/data/2.5/weather?q=london&APPID=a5f7c750d155ca20e98664c5fb5fe010';
const unsplashApi = 'https://api.unsplash.com/search/photos?page=1&query=office&client_id=d1463f432cce4150640ff56ee13c1f94ec0b2993db4395bcb8913f34daeb0d48';



function fetchContent(url){
    // main news body fetch - button changeable
    fetch(url) // by default fetch makes a GET request
    .then(function(response) {
        
        return response.json();
    })
    .then(function(body){
      //  parentNode.innerHTML = "";
        displayContent(body);
    });   
}


generateApi();
console.log(generateApi);