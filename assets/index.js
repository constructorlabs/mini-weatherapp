const weatherAPIKey = "4afe87cd7eddc53b1473c2bc0ddb2e37";
const unsplashAPIKey =
  "17de354439973eb34b4aae66cb3c27ceea000efc05a8c6c94da17edac9cd3a7b";
const form = document.querySelector("#search");
const mainImage = document.querySelector("#photo");
const thumbnails = document.querySelector("#thumbs");
const input = form.querySelector("#search-tf");
const conditions = document.querySelector("#conditions");

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
            <a id="${item.id}" class="thumbs__link" alt="${
          item.description ? item.description : conditions.textContent
        }">
                <img src="${item.urls[size]}" />
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
      return fetch(createRequest("unsplash", conditions.textContent));
    })
    .then(function(imageResponse) {
      return imageResponse.json();
    })
    .then(function(imageData) {
      mainImage.innerHTML = displayImage(imageData, "full", 1);
      thumbnails.innerHTML = displayImage(imageData, "thumb");
    })
    .catch(function(error) {
      console.log(error);
    });
}

form.addEventListener("submit", submitForm);
