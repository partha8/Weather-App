// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}


const weatherAPI = {
    key: "8ec595fadba89eda784ce3fecdbc6ed1",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

const searchInputBox= document.getElementById('input-box');

searchInputBox.addEventListener('keypress',(event)=>{
    
    if(event.keyCode ===13){
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display = 'block';

    }
});

function errorHandler(error){
    console.log(error);
    alert("Error with the server. Please check your input or try again later");
}
function getWeatherReport(city) {
    fetch(
      `${weatherAPI.baseUrl}?q=${city}&appid=${weatherAPI.key}&units=metric`)
      .then(resp=>resp.json())
      .then(showWeatherReport)
      .catch(errorHandler);
}

function showWeatherReport (weather){
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temp = document.getElementById('temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxtemp= document.getElementById ('min-max');
    minMaxtemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

    let weatherType= document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main} ${weather.weather[0].icon} `;

    let date= document.getElementById('date');
    let todayDate = new Date();
    date.innerText= dateManage(todayDate);
}

// Date manage
function dateManage(dateArg){
    let days = ["Monday", "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday" , "Sunday"];
    let months = ["January" , "February" , "March" , "April" , "May" , "June" , "July" , "August" , "September" , "October" , "November" , "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}