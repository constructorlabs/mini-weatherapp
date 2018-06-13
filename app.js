//const weatherReqkey= 'http://api.openweathermap.org/data/2.5/weather?q=london&APPID=b7aecc81c3f01e1eadcb367a666606c4';
//const imagesReqKey='https://api.unsplash.com/search/photos?query=snow&client_id=217d39354a152114b5bb4e0f77e4ca3c7ecdbe155bb9d43580e11138def7915a';


const goButton = document.querySelector('.btn');
const search = document.querySelector('#search');
const foreCast = document.querySelector('#conditions');
const smallPictures = document.querySelector('.thumbs');
const largeImage = document.querySelector('.photo');

//////get weather info//////////////////////////////////
function getWeather(city){
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=london&APPID=b7aecc81c3f01e1eadcb367a666606c4`)
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      //console.log(data);
      const weatherDesc = data.weather[0].description;
      const temperature = data.main.temp;
      foreCast.textContent= `${weatherDesc} ${temperature} `;
      getImage(weatherDesc);

    })
    .catch(function(error){
      console.log(error);
    });
  };

////////second function get images////////////////////////
  function getImage(weatherCondition){

    fetch(`https://api.unsplash.com/search/photos?query=${weatherCondition}&client_id=217d39354a152114b5bb4e0f77e4ca3c7ecdbe155bb9d43580e11138def7915a`)
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      //console.log(data);
      const ourImagesData = data.results;
      //console.log(ourImagesData);
      smallPictures.innerHTML= ourImagesData.map(function(element){
        return `<a href=${element.urls.regular} class='thumbs__link'><img src=${element.urls.thumb} class='thumbs__link__img'/></a>`

      })

    })
    .catch(function(error){
      console.log(error);
    });

  };
////event listener/////////////////////////////////
search.addEventListener('submit', function(event) {
  event.preventDefault();
        getWeather();
});


smallPictures.addEventListener('click',function(event){
if(event.target.className !== 'thumbs__link')return
const test=event.target.getAttribute('href');
event.preventDefault();
//console.log(event.target.className);

largeImage.innerHTML=`<img src=${test}/>`

})
