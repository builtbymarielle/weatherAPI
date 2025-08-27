const baseurl = `https://api.weatherapi.com/v1/forecast.json?key=`;
const apikey = `712d40b151cb433cb25211825232808`;

function getLocationWeather(len) {
  let city = $("#city").val();
  let length = len;

  if (city != "") {
    let cityURL = `${baseurl}${apikey}&q=${city}&days=${length}&aqi=no&alerts=no`;
    let url = cityURL;
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const today = new Date();
        const options = { month: "short", day: "numeric" };
        const formattedDate = today.toLocaleDateString("en-US", options);
        $(".weatherContent").empty();
        $(".weatherContent").append(`
            <div class="currentWeather">
            <div class="left">
              <p>${formattedDate}</p>
              <h1>${data.location.name}, ${data.location.region}</h1>
              <div class="line"></div>
    
              <h5>${data.current.condition.text}</h5>
              <h3>
                <span style="color: #a6d1f5; padding-right: 10px;">L: ${data.forecast.forecastday[0].day.mintemp_f}&deg;</span><span style="color: #e3f3ff;">H: ${data.forecast.forecastday[0].day.maxtemp_f}&deg;</span>
    
              </h3>
    
              <h2>${data.current.temp_f}&deg;F</h2>
            </div>
            <img class="weatherIcon" src="https:${data.current.condition.icon}" alt="weatherIcon">
          </div>
          
          <div class="weatherInfo">
          <h3>Daily Forecast</h3>
          <div class="hourInfoContent"></div>
          </div>`);

        $.each(data.forecast.forecastday[0].hour, (idx, hour) => {
          const time = hour.time;
          const formattedTime = new Date(time).toLocaleString("en-US", {
            hour12: true,
            hour: "numeric",
          });

          $(".hourInfoContent").append(`
            <div class="hourInfo">
              <div class="time">${formattedTime}</div>
              <img class="weatherIcon" src="https:${hour.condition.icon}" alt="weatherIcon">
              <div class="hourTemp">${hour.temp_f}&deg;</div>
            </div>`);
        });

        $(".bonusWeatherContent").empty();
        $(".bonusWeatherContent").append(`
          
        <div class="squareBox">
          <div class="squareTitle">UV INDEX</div>
          <div class="squareInfo">${data.current.uv}</div>
        </div>
        <div class="squareBox">
          <div class="squareTitle">SUNSET</div>
          <div class="squareInfo">${data.forecast.forecastday[0].astro.sunset}</div>
          <div class="squareInfo2">Sunrise: ${data.forecast.forecastday[0].astro.sunrise}</div>
        </div>
      
        <div class="squareBox">
          <div class="squareTitle">FEELS LIKE</div>
          <div class="squareInfo">${data.current.feelslike_f}&deg;</div>
        </div>
        <div class="squareBox">
          <div class="squareTitle">HUMIDITY</div>
          <div class="squareInfo">${data.current.humidity}%</div>
        </div>
    
        <div class="squareBox">
          <div class="squareTitle">WIND SPEED</div>
          <div class="squareInfo">${data.current.wind_mph}mph</div>
        </div>
        <div class="squareBox">
          <div class="squareTitle">PERCIPITATION</div>
          <div class="squareInfo">${data.current.precip_in}″</div>
          <div class="squareInfo2">in the last 24 hours</div>
        </div>
    
        <div class="squareBox">
          <div class="squareTitle">VISIBILITY</div>
          <div class="squareInfo">${data.current.vis_miles}miles</div>
        </div>
        <div class="squareBox">
          <div class="squareTitle">PRESSURE</div>
          <div class="squareInfo">${data.current.pressure_in}″</div>
        </div>
      
          `);

        $(".forecastSection").empty();
        $(".forecastSection").append(`
          <div class="forecastSectionContent">
        <h3>Forecast</h3>
      </div>
          
          
          `);
        $.each(data.forecast.forecastday, (idx, fday) => {
          $(".forecastSectionContent").append(`
            <div class="dayInfo">
          <div class="day">${fday.date}</div>
          <img class="weatherIcon" src="https:${fday.day.condition.icon}" alt="weatherIcon">
          <div class="daylow">Low:  ${fday.day.mintemp_f}&deg;</div>
          <div class="dayhigh">High:  ${fday.day.maxtemp_f}&deg;</div>
          
        </div>
            `);
        });
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function getLocationWeatherCelcius(len) {
  let city = $("#city").val();
  let length = len;

  if (city != "") {
    let cityURL = `${baseurl}${apikey}&q=${city}&days=${length}&aqi=no&alerts=no`;
    let url = cityURL;
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const today = new Date();
        const options = { month: "short", day: "numeric" };
        const formattedDate = today.toLocaleDateString("en-US", options);
        $(".weatherContent").empty();
        $(".weatherContent").append(`
            <div class="currentWeather">
            <div class="left">
              <p>${formattedDate}</p>
              <h1>${data.location.name}, ${data.location.region}</h1>
              <div class="line"></div>
    
              <h5>${data.current.condition.text}</h5>
              <h3>
                <span style="color: #a6d1f5; padding-right: 10px;">L: ${data.forecast.forecastday[0].day.mintemp_c}&deg;</span><span style="color: #e3f3ff;">H: ${data.forecast.forecastday[0].day.maxtemp_c}&deg;</span>
    
              </h3>
    
              <h2>${data.current.temp_c}&deg;C</h2>
            </div>
            <img class="weatherIcon" src="https:${data.current.condition.icon}" alt="weatherIcon">
          </div>
          
          <div class="weatherInfo">
          <h3>Daily Forecast</h3>
          <div class="hourInfoContent"></div>
          </div>`);

        $.each(data.forecast.forecastday[0].hour, (idx, hour) => {
          const time = hour.time;
          const formattedTime = new Date(time).toLocaleString("en-US", {
            hour12: true,
            hour: "numeric",
          });

          $(".hourInfoContent").append(`
            <div class="hourInfo">
              <div class="time">${formattedTime}</div>
              <img class="weatherIcon" src="https:${hour.condition.icon}" alt="weatherIcon">
              <div class="hourTemp">${hour.temp_c}&deg;</div>
            </div>`);
        });

        $(".bonusWeatherContent").empty();
        $(".bonusWeatherContent").append(`
          
        <div class="squareBox">
          <div class="squareTitle">UV INDEX</div>
          <div class="squareInfo">${data.current.uv}</div>
        </div>
        <div class="squareBox">
          <div class="squareTitle">SUNSET</div>
          <div class="squareInfo">${data.forecast.forecastday[0].astro.sunset}</div>
          <div class="squareInfo2">Sunrise: ${data.forecast.forecastday[0].astro.sunrise}</div>
        </div>
      
        <div class="squareBox">
          <div class="squareTitle">FEELS LIKE</div>
          <div class="squareInfo">${data.current.feelslike_c}&deg;</div>
        </div>
        <div class="squareBox">
          <div class="squareTitle">HUMIDITY</div>
          <div class="squareInfo">${data.current.humidity}%</div>
        </div>
    
        <div class="squareBox">
          <div class="squareTitle">WIND SPEED</div>
          <div class="squareInfo">${data.current.wind_mph}mph</div>
        </div>
        <div class="squareBox">
          <div class="squareTitle">PERCIPITATION</div>
          <div class="squareInfo">${data.current.precip_in}″</div>
          <div class="squareInfo2">in the last 24 hours</div>
        </div>
    
        <div class="squareBox">
          <div class="squareTitle">VISIBILITY</div>
          <div class="squareInfo">${data.current.vis_miles}miles</div>
        </div>
        <div class="squareBox">
          <div class="squareTitle">PRESSURE</div>
          <div class="squareInfo">${data.current.pressure_in}″</div>
        </div>
      
          `);

        $(".forecastSection").empty();
        $(".forecastSection").append(`
          <div class="forecastSectionContent">
        <h3>Forecast</h3>
      </div>
          `);

        $.each(data.forecast.forecastday, (idx, fday) => {
          $(".forecastSectionContent").append(`
            <div class="dayInfo">
          <div class="day">${fday.date}</div>
          <img class="weatherIcon" src="https:${fday.day.condition.icon}" alt="weatherIcon">
          <div class="daylow">Low:  ${fday.day.mintemp_c}&deg;</div>
          <div class="dayhigh">High:  ${fday.day.maxtemp_c}&deg;</div>
        </div>
            `);
        });
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function getCurrentLocationWeather(lat, lon) {
  var valueFromDayLength = dayLength();
  let tempURL = `https://api.weatherapi.com/v1/forecast.json?key=712d40b151cb433cb25211825232808&q=${lat},${lon}&days=${valueFromDayLength}&aqi=no&alerts=no`;
  let url = tempURL;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const today = new Date();
      const options = { month: "short", day: "numeric" };
      const formattedDate = today.toLocaleDateString("en-US", options);
      $(".weatherContent").empty();
      $(".weatherContent").append(`
        <div class="currentWeather">
        <div class="left">
          <p>${formattedDate}</p>
          <h1>${data.location.name}, ${data.location.region}</h1>
          <div class="line"></div>

          <h5>${data.current.condition.text}</h5>
          <h3>
            <span style="color: #a6d1f5; padding-right: 10px;">L: ${data.forecast.forecastday[0].day.mintemp_f}&deg;</span><span style="color: #e3f3ff;">H: ${data.forecast.forecastday[0].day.maxtemp_f}&deg;</span>

          </h3>

          <h2>${data.current.temp_f}&deg;F</h2>
        </div>
        <img class="weatherIcon" src="https:${data.current.condition.icon}" alt="weatherIcon">
      </div>
      
      <div class="weatherInfo">
      <h3>Daily Forecast</h3>
      <div class="hourInfoContent"></div>
      </div>`);

      $.each(data.forecast.forecastday[0].hour, (idx, hour) => {
        const time = hour.time;
        const formattedTime = new Date(time).toLocaleString("en-US", {
          hour12: true,
          hour: "numeric",
        });

        $(".hourInfoContent").append(`
        <div class="hourInfo">
          <div class="time">${formattedTime}</div>
          <img class="weatherIcon" src="https:${hour.condition.icon}" alt="weatherIcon">
          <div class="hourTemp">${hour.temp_f}&deg;</div>
        </div>`);
      });

      $(".bonusWeatherContent").empty();
      $(".bonusWeatherContent").append(`
      
    <div class="squareBox">
      <div class="squareTitle">UV INDEX</div>
      <div class="squareInfo">${data.current.uv}</div>
    </div>
    <div class="squareBox">
      <div class="squareTitle">SUNSET</div>
      <div class="squareInfo">${data.forecast.forecastday[0].astro.sunset}</div>
      <div class="squareInfo2">Sunrise: ${data.forecast.forecastday[0].astro.sunrise}</div>
    </div>
  
    <div class="squareBox">
      <div class="squareTitle">FEELS LIKE</div>
      <div class="squareInfo">${data.current.feelslike_f}&deg;</div>
    </div>
    <div class="squareBox">
      <div class="squareTitle">HUMIDITY</div>
      <div class="squareInfo">${data.current.humidity}%</div>
    </div>

    <div class="squareBox">
      <div class="squareTitle">WIND SPEED</div>
      <div class="squareInfo">${data.current.wind_mph}mph</div>
    </div>
    <div class="squareBox">
      <div class="squareTitle">PERCIPITATION</div>
      <div class="squareInfo">${data.current.precip_in}″</div>
      <div class="squareInfo2">in the last 24 hours</div>
    </div>

    <div class="squareBox">
      <div class="squareTitle">VISIBILITY</div>
      <div class="squareInfo">${data.current.vis_miles}miles</div>
    </div>
    <div class="squareBox">
      <div class="squareTitle">PRESSURE</div>
      <div class="squareInfo">${data.current.pressure_in}″</div>
    </div>
  
      `);

      $(".forecastSection").empty();
      $(".forecastSection").append(`
      <div class="forecastSectionContent">
    <h3>Forecast</h3>
  </div>
      `);
      $.each(data.forecast.forecastday, (idx, fday) => {
        $(".forecastSectionContent").append(`
        <div class="dayInfo">
      <div class="day">${fday.date}</div>
      <img class="weatherIcon" src="https:${fday.day.condition.icon}" alt="weatherIcon">
      <div class="daylow">Low:  ${fday.day.mintemp_f}&deg;</div>
      <div class="dayhigh">High:  ${fday.day.maxtemp_f}&deg;</div>
    </div>
        `);
      });
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

function getCurrentLocationWeatherCelcius(lat, lon) {
  var valueFromDayLength = dayLength();
  let tempURL = `https://api.weatherapi.com/v1/forecast.json?key=712d40b151cb433cb25211825232808&q=${lat},${lon}&days=${valueFromDayLength}&aqi=no&alerts=no`;
  let url = tempURL;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const today = new Date();
      const options = { month: "short", day: "numeric" };
      const formattedDate = today.toLocaleDateString("en-US", options);
      $(".weatherContent").empty();
      $(".weatherContent").append(`
        <div class="currentWeather">
        <div class="left">
          <p>${formattedDate}</p>
          <h1>${data.location.name}, ${data.location.region}</h1>
          <div class="line"></div>

          <h5>${data.current.condition.text}</h5>
          <h3>
            <span style="color: #a6d1f5; padding-right: 10px;">L: ${data.forecast.forecastday[0].day.mintemp_c}&deg;</span><span style="color: #e3f3ff;">H: ${data.forecast.forecastday[0].day.maxtemp_c}&deg;</span>

          </h3>

          <h2>${data.current.temp_c}&deg;C</h2>
        </div>
        <img class="weatherIcon" src="https:${data.current.condition.icon}" alt="weatherIcon">
      </div>
      
      <div class="weatherInfo">
      <h3>Daily Forecast</h3>
      <div class="hourInfoContent"></div>
      </div>`);

      $.each(data.forecast.forecastday[0].hour, (idx, hour) => {
        const time = hour.time;
        const formattedTime = new Date(time).toLocaleString("en-US", {
          hour12: true,
          hour: "numeric",
        });

        $(".hourInfoContent").append(`
        <div class="hourInfo">
          <div class="time">${formattedTime}</div>
          <img class="weatherIcon" src="https:${hour.condition.icon}" alt="weatherIcon">
          <div class="hourTemp">${hour.temp_c}&deg;</div>
        </div>`);
      });

      $(".bonusWeatherContent").empty();
      $(".bonusWeatherContent").append(`
      
    <div class="squareBox">
      <div class="squareTitle">UV INDEX</div>
      <div class="squareInfo">${data.current.uv}</div>
    </div>
    <div class="squareBox">
      <div class="squareTitle">SUNSET</div>
      <div class="squareInfo">${data.forecast.forecastday[0].astro.sunset}</div>
      <div class="squareInfo2">Sunrise: ${data.forecast.forecastday[0].astro.sunrise}</div>
    </div>
  
    <div class="squareBox">
      <div class="squareTitle">FEELS LIKE</div>
      <div class="squareInfo">${data.current.feelslike_c}&deg;</div>
    </div>
    <div class="squareBox">
      <div class="squareTitle">HUMIDITY</div>
      <div class="squareInfo">${data.current.humidity}%</div>
    </div>

    <div class="squareBox">
      <div class="squareTitle">WIND SPEED</div>
      <div class="squareInfo">${data.current.wind_mph}mph</div>
    </div>
    <div class="squareBox">
      <div class="squareTitle">PERCIPITATION</div>
      <div class="squareInfo">${data.current.precip_in}″ </div>
      <div class="squareInfo2">in the last 24 hours</div>
    </div>

    <div class="squareBox">
      <div class="squareTitle">VISIBILITY</div>
      <div class="squareInfo">${data.current.vis_miles}miles</div>
    </div>
    <div class="squareBox">
      <div class="squareTitle">PRESSURE</div>
      <div class="squareInfo">${data.current.pressure_in}″</div>
    </div>
  
      `);

      $(".forecastSection").empty();
      $(".forecastSection").append(`
      <div class="forecastSectionContent">
    <h3>Forecast</h3>
  </div>
      `);

      $.each(data.forecast.forecastday, (idx, fday) => {
        $(".forecastSectionContent").append(`
        <div class="dayInfo">
      <div class="day">${fday.date}</div>
      <img class="weatherIcon" src="https:${fday.day.condition.icon}" alt="weatherIcon">
      <div class="daylow">Low:  ${fday.day.mintemp_c}&deg;</div>
      <div class="dayhigh">High:  ${fday.day.maxtemp_c}&deg;</div>
    </div>
        `);
      });
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

$(document).ready(function () {
  getLocationWeather(2);
  dayLength();
  degreeType();
  var valueFromDayLength = dayLength();
  navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getCurrentLocationWeather(latitude, longitude, valueFromDayLength);
  });
});

function dayLength() {
  var value = parseInt($("#length").val());

  // Increment the value when the + button is clicked
  $("#increment").on("click", function () {
    if (value < 3) {
      value++;
      $("#length").val(value);

      let city = $("#city").val();
      let length = value;

      if (city == "" || city == "undefined") {
        navigator.geolocation.getCurrentPosition((position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          getCurrentLocationWeather(latitude, longitude, length);
        });
      } else {
        let cityURL = `${baseurl}${apikey}&q=${city}&days=${length}&aqi=no&alerts=no`;
        let url = cityURL;
        return fetch(url)
          .then((response) => response.json())
          .then((data) => {
            const today = new Date();
            const options = { month: "short", day: "numeric" };
            const formattedDate = today.toLocaleDateString("en-US", options);

            $(".weatherContent").empty();
            $(".weatherContent").append(`
                  <div class="currentWeather">
                  <div class="left">
                    <p>${formattedDate}</p>
                    <h1>${data.location.name}, ${data.location.region}</h1>
                    <div class="line"></div>
          
                    <h5>${data.current.condition.text}</h5>
                    <h3>
                      <span style="color: #a6d1f5; padding-right: 10px;">L: ${data.forecast.forecastday[0].day.mintemp_f}&deg;</span><span style="color: #e3f3ff;">H: ${data.forecast.forecastday[0].day.maxtemp_f}&deg;</span>
          
                    </h3>
          
                    <h2>${data.current.temp_f}&deg;F</h2>
                  </div>
                  <img class="weatherIcon" src="https:${data.current.condition.icon}" alt="weatherIcon">
                </div>
                
                <div class="weatherInfo">
                <h3>Daily Forecast</h3>
                <div class="hourInfoContent"></div>
                </div>`);

            $.each(data.forecast.forecastday[0].hour, (idx, hour) => {
              const time = hour.time;
              const formattedTime = new Date(time).toLocaleString("en-US", {
                hour12: true,
                hour: "numeric",
              });

              $(".hourInfoContent").append(`
                  <div class="hourInfo">
                    <div class="time">${formattedTime}</div>
                    <img class="weatherIcon" src="https:${hour.condition.icon}" alt="weatherIcon">
                    <div class="hourTemp">${hour.temp_f}&deg;</div>
                  </div>`);
            });

            $(".bonusWeatherContent").empty();
            $(".bonusWeatherContent").append(`
                
              <div class="squareBox">
                <div class="squareTitle">UV INDEX</div>
                <div class="squareInfo">${data.current.uv}</div>
              </div>
              <div class="squareBox">
                <div class="squareTitle">SUNSET</div>
                <div class="squareInfo">${data.forecast.forecastday[0].astro.sunset}</div>
                <div class="squareInfo2">Sunrise: ${data.forecast.forecastday[0].astro.sunrise}</div>
              </div>
            
              <div class="squareBox">
                <div class="squareTitle">FEELS LIKE</div>
                <div class="squareInfo">${data.current.feelslike_f}&deg;</div>
              </div>
              <div class="squareBox">
                <div class="squareTitle">HUMIDITY</div>
                <div class="squareInfo">${data.current.humidity}%</div>
              </div>
          
              <div class="squareBox">
                <div class="squareTitle">WIND SPEED</div>
                <div class="squareInfo">${data.current.wind_mph}mph</div>
              </div>
              <div class="squareBox">
                <div class="squareTitle">PERCIPITATION</div>
                <div class="squareInfo">${data.current.precip_in}″</div>
                <div class="squareInfo2">in the last 24 hours</div>
              </div>
          
              <div class="squareBox">
                <div class="squareTitle">VISIBILITY</div>
                <div class="squareInfo">${data.current.vis_miles}miles</div>
              </div>
              <div class="squareBox">
                <div class="squareTitle">PRESSURE</div>
                <div class="squareInfo">${data.current.pressure_in}″</div>
              </div>
            
                `);

            $(".forecastSection").empty();
            $(".forecastSection").append(`
                <div class="forecastSectionContent">
              <h3>Forecast</h3>
            </div>
                `);

            $.each(data.forecast.forecastday, (idx, fday) => {
              $(".forecastSectionContent").append(`
                  <div class="dayInfo">
                <div class="day">${fday.date}</div>
                <img class="weatherIcon" src="https:${fday.day.condition.icon}" alt="weatherIcon">
                <div class="daylow">Low:  ${fday.day.mintemp_f}&deg;</div>
                <div class="dayhigh">High:  ${fday.day.maxtemp_f}&deg;</div>
              </div>
                  `);
            });
            return data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  });

  // Decrement the value when the - button is clicked
  $("#decrement").on("click", function () {
    if (value > 1) {
      value--;
      $("#length").val(value);

      let city = $("#city").val();
      let length = value;

      if (city == "" || city == "undefined") {
        navigator.geolocation.getCurrentPosition((position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          getCurrentLocationWeather(latitude, longitude, length);
        });
      } else {
        let cityURL = `${baseurl}${apikey}&q=${city}&days=${length}&aqi=no&alerts=no`;
        let url = cityURL;
        return fetch(url)
          .then((response) => response.json())
          .then((data) => {
            const today = new Date();
            const options = { month: "short", day: "numeric" };
            const formattedDate = today.toLocaleDateString("en-US", options);

            $(".weatherContent").empty();
            $(".weatherContent").append(`
                  <div class="currentWeather">
                  <div class="left">
                    <p>${formattedDate}</p>
                    <h1>${data.location.name}, ${data.location.region}</h1>
                    <div class="line"></div>
          
                    <h5>${data.current.condition.text}</h5>
                    <h3>
                      <span style="color: #a6d1f5; padding-right: 10px;">L: ${data.forecast.forecastday[0].day.mintemp_f}&deg;</span><span style="color: #e3f3ff;">H: ${data.forecast.forecastday[0].day.maxtemp_f}&deg;</span>
          
                    </h3>
          
                    <h2>${data.current.temp_f}&deg;F</h2>
                  </div>
                  <img class="weatherIcon" src="https:${data.current.condition.icon}" alt="weatherIcon">
                </div>
                
                <div class="weatherInfo">
                <h3>Daily Forecast</h3>
                <div class="hourInfoContent"></div>
                </div>`);

            $.each(data.forecast.forecastday[0].hour, (idx, hour) => {
              const time = hour.time;
              const formattedTime = new Date(time).toLocaleString("en-US", {
                hour12: true,
                hour: "numeric",
              });

              $(".hourInfoContent").append(`
                  <div class="hourInfo">
                    <div class="time">${formattedTime}</div>
                    <img class="weatherIcon" src="https:${hour.condition.icon}" alt="weatherIcon">
                    <div class="hourTemp">${hour.temp_f}&deg;</div>
                  </div>`);
            });

            $(".bonusWeatherContent").empty();
            $(".bonusWeatherContent").append(`
                
              <div class="squareBox">
                <div class="squareTitle">UV INDEX</div>
                <div class="squareInfo">${data.current.uv}</div>
              </div>
              <div class="squareBox">
                <div class="squareTitle">SUNSET</div>
                <div class="squareInfo">${data.forecast.forecastday[0].astro.sunset}</div>
                <div class="squareInfo2">Sunrise: ${data.forecast.forecastday[0].astro.sunrise}</div>
              </div>
            
              <div class="squareBox">
                <div class="squareTitle">FEELS LIKE</div>
                <div class="squareInfo">${data.current.feelslike_f}&deg;</div>
              </div>
              <div class="squareBox">
                <div class="squareTitle">HUMIDITY</div>
                <div class="squareInfo">${data.current.humidity}%</div>
              </div>
          
              <div class="squareBox">
                <div class="squareTitle">WIND SPEED</div>
                <div class="squareInfo">${data.current.wind_mph}mph</div>
              </div>
              <div class="squareBox">
                <div class="squareTitle">PERCIPITATION</div>
                <div class="squareInfo">${data.current.precip_in}″</div>
                <div class="squareInfo2">in the last 24 hours</div>
              </div>
          
              <div class="squareBox">
                <div class="squareTitle">VISIBILITY</div>
                <div class="squareInfo">${data.current.vis_miles}miles</div>
              </div>
              <div class="squareBox">
                <div class="squareTitle">PRESSURE</div>
                <div class="squareInfo">${data.current.pressure_in}″</div>
              </div>
            
                `);

            $(".forecastSection").empty();
            $(".forecastSection").append(`
                <div class="forecastSectionContent">
              <h3>Forecast</h3>
            </div>   
                `);

            $.each(data.forecast.forecastday, (idx, fday) => {
              $(".forecastSectionContent").append(`
                  <div class="dayInfo">
                <div class="day">${fday.date}</div>
                <img class="weatherIcon" src="https:${fday.day.condition.icon}" alt="weatherIcon">
                <div class="daylow">Low:  ${fday.day.mintemp_f}&deg;</div>
                <div class="dayhigh">High:  ${fday.day.maxtemp_f}&deg;</div>
              </div>
                  `);
            });
            return data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  });
  return value;
}

// setup navigation bar
{
  const navMenu = document.querySelector(".nav");
  const navOverlay = document.querySelector(".nav-overlay");
  const navButton = document.querySelector(".nav-btn");
  const closeBtn = document.querySelector(".closebtn");

  //opens up nav menu when hambuger clicked
  navButton.addEventListener("click", () => {
    navMenu.classList.add("nav-open");
    navOverlay.classList.add("nav-overlay-open");
  });

  //closes nav menu when  clicked outside  nav menu
  navOverlay.addEventListener("click", () => {
    navMenu.classList.remove("nav-open");
    navOverlay.classList.remove("nav-overlay-open");
  });

  //closes nav menu when X button is clicked
  closeBtn.addEventListener("click", () => {
    navMenu.classList.remove("nav-open");
    navOverlay.classList.remove("nav-overlay-open");
  });
}

let degree = "F";
function degreeType() {
  getLocationWeather(2);
  dayLength();
  var valueFromDayLength = dayLength();
  if (degree == "C") {
    degree = "F";
    let city = $("#city").val();
    if (city != "") {
      getLocationWeatherCelcius(valueFromDayLength);
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getCurrentLocationWeatherCelcius(
          latitude,
          longitude,
          valueFromDayLength
        );
      });
    }
  } else {
    degree = "C";
    let city = $("#city").val();
    if (city != "") {
      getLocationWeather(valueFromDayLength);
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getCurrentLocationWeather(latitude, longitude, valueFromDayLength);
      });
    }
  }
}

function createAccount() {}
