// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}


const weatherAPI = {
    key: "8ec595fadba89eda784ce3fecdbc6ed1",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

const searchInputBox= document.getElementById('input-box');

// Event listener function on keypress
searchInputBox.addEventListener('keypress',(event)=>{
    
    if(event.keyCode ===13){
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display = 'block';

    }
});

// get weather report
function getWeatherReport(city){
    fetch(`${weatherAPI.baseUrl}?q=${city}&appid=${weatherAPI.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}

// show weather report
function showWeatherReport (weather){
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temp = document.getElementById('temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxtemp= document.getElementById ('min-max');
    minMaxtemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

    let weatherType= document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date= document.getElementById('date');
    let todayDate = new Date();
    date.innerText= dateManage(todayDate);

  /*  if(weatherType.textContent === 'Clear'){
        document.body.style.backgroundImage = "url('images/Clear.jpg')";
    }
    else if(weatherType.textContent === 'Clouds'){
        document.body.style.backgroundImage = "url('images/Clouds.jpg')";
    }
    else if(weatherType.textContent === 'Rain'){
        document.body.style.backgroundImage = "url('images/Rain.jpg')";
    }
    else if(weatherType.textContent === 'Snow'){
        document.body.style.backgroundImage = "url('images/snow.jpg')";
    }
    else if(weatherType.textContent === 'Sunny'){
        document.body.style.backgroundImage = "url('images/sunny.jpg')";
    }
    else if(weatherType.textContent === 'Thunderstorm'){
        document.body.style.backgroundImage = "url('images/Thunderstorm.jpg')";
    }
    else if(weatherType.textContent === 'Mist'){
        document.body.style.backgroundImage = "url('images/mist.jpg')";
    }
    else if(weatherType.textContent === 'Haze'){
        document.body.style.backgroundImage = "url('images/haze.jpg')";
    }
    else if(weatherType.textContent === 'Drizzle'){
        document.body.style.backgroundImage = "url('images/drizzle.jpg')";
    }*/

    document.body.style.backgroundImage = ("url('images/" + weatherType.textContent + ".jpg')");
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