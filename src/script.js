window.addEventListener("load", () => {
  const locationInput = document.getElementById("location-input");
  const submitBtn = document.getElementById("submit-btn");

  submitBtn.addEventListener("click", () => {
    const location = locationInput.value.trim();

    if (location !== "") {
      getWeatherData(location);
      locationInput.value = "";
    }
  });

  function getWeatherData(location) {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=fa90059de676957ea12c56ca95e4c1ca`;

    fetch(api)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lokasi tidak valid.");
        }
        return response.json();
      })
      .then((data) => {
        const { name, weather, main } = data;
        const { description, icon } = weather[0];
        const { temp, humidity } = main;

        const weatherElement = document.getElementById("weather");
        weatherElement.innerHTML = `
            <h2>${name}</h2>
            <p>${description}</p>
            <img src="http://openweathermap.org/img/wn/${icon}.png" />
            <p>Temperature: ${Math.round(temp - 273.15)}°C</p>
            <p>Humidity: ${humidity}%</p>
          `;

        const iconElement = document.createElement("img");
        iconElement.src = `http://openweathermap.org/img/wn/${icon}.png`;
        iconElement.alt = "Weather Icon";
        iconElement.classList.add("weather-icon");
        weatherElement.appendChild(iconElement);
      })
      .catch((error) => {
        document.getElementById(
          "weather"
        ).innerHTML = `<p>${error.message}</p>`;
      });
  }
});
