function submitHandler(event){
  event.preventDefault();

  const searchBar = document.querySelector("#search-tf");
  const city = searchBar.value;

  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=98c20025c94e54346cce38d0c653d966`)
  .then(function(response){
    return response.json();
  }).then(function(jsonData){
    const weatherDescription = jsonData.weather[0].description;

    return fetch(`https://api.unsplash.com/search/photos?query=${weatherDescription}&client_id=f3dc3b6bb3462a90c7969a62d83c8e3dd552b928cc31041850388e8616e977a6`)


  }).then(function(response){
    return response.json();
  }).then(function(data){
    images = data.results.map(image =>
      `<img src="${image.links.download}" id="${image.id}" class="thumbs__link"></img>`
    )
    thumbs.innerHTML = images;
    console.log(data);

  }).catch(function(error){
    alert('I don\'t work');
  });
}

const getSearch = document.querySelector("#search");

const figure = document.querySelector('#photo');

const thumbs = document.querySelector('#thumbs');

let images;
getSearch.addEventListener("submit", submitHandler);

function clickHandler(event){
  figure.innerHTML= `<img src="${event.target.src}" class="photo"></img>`;
}

thumbs.addEventListener("click", clickHandler);
