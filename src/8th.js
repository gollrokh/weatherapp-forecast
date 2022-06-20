
function formateDate(timestamp) {
    let date=new Date(timestamp);
    let hours=date.getHours();
    if (hours<10) {
        hours=`0${hours}`;
    }
    let minutes=date.getMinutes();
    if (minutes<10) {
        minutes=`0${minutes}`;
    }
    let day=date.getDay();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
    return `${days[day]} ${hours} : ${minutes}`;

}
function displayForecast() {
    let forecastElement=document.querySelector("#forecast");
    let forecastHTML=`<div class=row>`;
    let days=["mon","thu","wed","thr","fri","sat","sun"];
    days.forEach(function (day) {
        forecastHTML= forecastHTML+`
    <div class="col-1">
        <div class="forecast-date">
            ${day} <img src="src/PngItem_352806.png" alt="" width="30">
        </div>
        <div class="forecast-temp">
            <span class="forecast-temp-max">
                18°
            </span>
            <span class="forecast-temp-min">
                12°
            </span>  
        </div>
    </div>`
    })
    

forecastHTML=forecastHTML+`</div>`
forecastElement.innerHTML=forecastHTML;
}

function displayWeatherCondition(response) {
    let cityName=response.data.name;
    document.querySelector("#city").innerHTML=`${cityName}`;
    let temp =Math.round(response.data.main.temp);
    document.querySelector("#temperature").innerHTML=`${temp}`;
    let weatherDescription=response.data.weather[0].description;
    document.querySelector("#situation").innerHTML=`${weatherDescription}`;
    let humidity=response.data.main.humidity;
    document.querySelector("#humidity").innerHTML=` Humidity: ${humidity} % ` ;
    let wind=Math.round(response.data.wind.speed);
    document.querySelector("#wind").innerHTML=` Wind Speed: ${wind} Km/h `;
    document.querySelector("#date").innerHTML=formateDate(response.data.dt *1000);
    let iconElement=document.querySelector("#icon");
    celsiusTemp=response.data.main.temp;
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt",response.data.weather[0].description);
    
}
function searchCity(city) {
    let apiKey="79fbf0fd751ad25907ac459fc1d6c647";
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
}
function submitHolder(event) {
    event.preventDefault();
    let cityElement=document.querySelector("#city-input");
    searchCity(cityElement.value);
}
function showFahrenhite(event) {
    event.preventDefault();
    let temElement=document.querySelector("#temperature");
    cLink.classList.remove("active");
    fLink.classList.add("active");
    let fTemp=(celsiusTemp *9 ) / 5 + 32;
    temElement.innerHTML= Math.round(fTemp);
}
function showCel(event) {
    event.preventDefault();
    let celTemp=document.querySelector("#temperature");
    fLink.classList.remove("active");
    cLink.classList.add("active");
    celTemp.innerHTML=Math.round(celsiusTemp);
}
let fLink=document.querySelector("#fahrenhite-link");
fLink.addEventListener("click", showFahrenhite);
let form=document.querySelector("#search-form");
form.addEventListener("submit" , submitHolder);
let celsiusTemp=null;
let cLink=document.querySelector("#cel-link");
cLink.addEventListener("click", showCel);
searchCity("new york");
displayForecast();