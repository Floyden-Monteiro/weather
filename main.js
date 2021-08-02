const api = {
    key:"1407b38d16bff19b039e384acb37c41a",
    base : "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress',setQuery);

function setQuery(evt){
    if(evt.keyCode == 13){
        getResults(searchbox.value);
       
    }
}
function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=.metric&APPID=${api.key}`)
    .then(weather =>{
        return weather.json();
    }).then(diplayResults);
}
function diplayResults(weather){
   
    let city = document.querySelector('.location .city');
    city.innerText =`${weather.name},${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>&#8451;</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)} C / ${Math.round(weather.main.temp_max)} C`;
}
function dateBuilder (d){
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days = ["Sunday", "Monday", "Tuesday" ,"Wednesday","Thursday","Friday","Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year =d.getFullYear();1

    return `${day} ${date} ${month} ${year}`;
}