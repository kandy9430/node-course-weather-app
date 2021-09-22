const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const unitsSelect = document.querySelector("select");
const weatherInfoDiv = document.querySelector("#weather-info-container");
const weatherInfoEls = document.querySelectorAll(".weather-info");
const errorMessage = document.querySelector("#error-message");
const locationTitle = document.querySelector("#location");
const descriptionParagraph = document.querySelector("#description");
const temperatureParagraph = document.querySelector("#temperature");
const precipParagraph = document.querySelector("#precip");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  errorMessage.textContent = "Loading...";

  weatherInfoDiv.style.display = "none";

  for (let els of weatherInfoEls) {
    els.textContent = "";
  }

  const location = searchInput.value;
  const units = unitsSelect.value;

  fetch(
    `http://localhost:3000/weather?address=${location}&units=${units}`
  ).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        return (errorMessage.textContent = data.error);
      }
      const { description, deg, iconUrl, precip, temperature } = data.forecast;
      errorMessage.textContent = "";
      weatherInfoDiv.style.display = "flex";
      locationTitle.textContent = data.location;
      weatherInfoDiv.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${iconUrl})`;
      descriptionParagraph.textContent = description;
      temperatureParagraph.textContent = `${temperature}\u00B0${deg}`;
      precipParagraph.textContent = `${precip}% chance of rain`;
    });
  });
});
