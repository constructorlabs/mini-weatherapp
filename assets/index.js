const weatherAPIKey = "4afe87cd7eddc53b1473c2bc0ddb2e37";
const unsplashAPIKey =
  "17de354439973eb34b4aae66cb3c27ceea000efc05a8c6c94da17edac9cd3a7b";
const form = document.querySelector("#search");

function createRequest(service, request) {
  return service === "weather"
    ? `http://api.openweathermap.org/data/2.5/weather?q=${request}&APPID=${weatherAPIKey}`
    : `https://api.unsplash.com/search/photos?query=${request}&client_id=${unsplashAPIKey}`;
}

// api.openweathermap.org/data/2.5/weather?q=$london&APPID=4afe87cd7eddc53b1473c2bc0ddb2e37

http: function submitForm(e) {
  const input = form.querySelector("#search-tf");
  const conditions = document.querySelector("#conditions");

  e.preventDefault();
  fetch(createRequest("weather", input.value))
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      conditions.textContent = data.weather[0].description;
    })
    .catch(function(error) {
      console.log(error);
    });
}

form.addEventListener("submit", submitForm);
