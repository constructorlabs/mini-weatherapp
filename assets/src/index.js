function submitHandler(event){
  event.preventDefault();

  const searchBar = document.querySelector("#search-tf");
  const city = searchBar.value;

  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=98c20025c94e54346cce38d0c653d966`)
  .then(function(response){
    return response.json();
  }).then(function(jsonData){
    const weatherDescription = jsonData.weather[0].description;

    fetch(`https://api.unsplash.com/search/photos?query=${weatherDescription}&client_id=f3dc3b6bb3462a90c7969a62d83c8e3dd552b928cc31041850388e8616e977a6`)
    .then(function(response){
      return response.json();
    }).then(function(data){
      const firstImage = `<img src="${data.results[0].links.download}"></img>`;
      figure.innerHTML = firstImage;
      console.log(data);
    }).catch(function(error){
      alert('I don\'t work');
    });

  }).catch(function(error){
    alert('I don\'t work');
  });
}

const getSearch = document.querySelector("#search");

const figure = document.querySelector('#photo');

getSearch.addEventListener("submit", submitHandler);
