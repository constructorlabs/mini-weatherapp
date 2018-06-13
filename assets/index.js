const weatherAPIKey = "4afe87cd7eddc53b1473c2bc0ddb2e37";
const unsplashAPIKey =
  "17de354439973eb34b4aae66cb3c27ceea000efc05a8c6c94da17edac9cd3a7b";
const form = document.querySelector("#search");
const mainImage = document.querySelector("#photo");
const thumbnails = document.querySelector("#thumbs");
const input = form.querySelector("#search-tf");
const conditions = document.querySelector("#conditions");
const creditUser = document.querySelector("#credit-user");
let imagesCollection = {};

function createRequest(service, request) {
  return service === "weather"
    ? `http://api.openweathermap.org/data/2.5/weather?q=${request}&APPID=${weatherAPIKey}`
    : `https://api.unsplash.com/search/photos?query=${request}&client_id=${unsplashAPIKey}`;
}

// api.openweathermap.org/data/2.5/weather?q=$london&APPID=4afe87cd7eddc53b1473c2bc0ddb2e37
function displayImage(imageData, size, numToShow) {
  const imageArr = imageData.results;
  let html = "";
  if (numToShow) {
    for (let i = 0; i < numToShow; i += 1) {
      html += `
         <img src="${imageArr[i].urls[size]}" />
         `;
    }
  } else {
    let markup = imageArr
      .map((item, index) => {
        return `
         <li>
            <a href="${item.urls["regular"]}" id="${
          item.id
        }" class="thumbs__link" alt="${
          item.description ? item.description : conditions.textContent
        }">
                <img class="thumbs__image" src="${item.urls[size]}" />
            </a>
        </li>
         `;
      })
      .join("");
    html = `<ul class="thumbs__list">${markup}</ul>`;
  }
  return html;
}

function submitForm(e) {
  e.preventDefault();
  fetch(createRequest("weather", input.value))
    .then(function(weatherResponse) {
      return weatherResponse.json();
    })
    .then(function(weatherData) {
      conditions.textContent = weatherData.weather[0].description;
      document.querySelector(
        "#weather__data-temp"
      ).innerHTML = `<strong>Temperature: </strong> ${(
        weatherData.main.temp - 273.15
      ).toFixed(1)} Celsius`;
      document.querySelector(
        "#weather__data-wind-direction"
      ).innerHTML = `<strong>Wind direction: </strong> ${
        weatherData.wind.deg
      } deg`;
      document.querySelector(
        "#weather__data-wind-speed"
      ).innerHTML = `<strong>Wind speed: </strong> ${
        weatherData.wind.speed
      } mph`;
      document.querySelector(
        "#weather__data-pressure"
      ).innerHTML = `<strong>Pressure: </strong> ${
        weatherData.main.pressure
      } bar`;
      document.querySelector(
        "#weather__data-humidity"
      ).innerHTML = `<strong>Humidity: </strong> ${weatherData.main.humidity}%`;
      return fetch(createRequest("unsplash", conditions.innerHTML));
    })
    .then(function(imageResponse) {
      return imageResponse.json();
    })
    .then(function(imageData) {
      imagesCollection = imageData;
      mainImage.innerHTML = displayImage(imageData, "full", 1);
      creditUser.textContent = imageData.results[0].user.name;
      thumbnails.innerHTML = displayImage(imageData, "thumb");
    })
    .catch(function(error) {
      console.log(error);
    });
}

function thumbToMain(e) {
  e.preventDefault();
  if (e.target.className === "thumbs__image") {
    const fullImg = mainImage.querySelector("img");
    imagesCollection.results.forEach(function(image) {
      if (image.id === e.target.parentNode.id) {
        creditUser.textContent = image.user.name;
        creditUser.setAttribute("href", image.user.links.html);
        creditUser.setAttribute("target", "_blank");
      }
    });
    return (fullImg.src = e.target.parentNode.getAttribute("href"));
  }
}

form.addEventListener("submit", submitForm);
thumbnails.addEventListener("click", thumbToMain);
