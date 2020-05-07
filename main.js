const api = {
  key: "93d1a0353b7c8ad9ac76dc7169e8b5f6",
  base: "https://api.openweathermap.org/data/2.5/"
}
const searchbox = document.querySelector('.search-box'),
temp = document.querySelector('.temp'),
hiLow = document.querySelector('.hi-low'),
city = document.querySelector('.city'),
date = document.querySelector('.location .date');


const dateBulder = (d) => {
  let months = ["January",	"February","March",	"April", "May",	"June", "July",	"August",	
              "September", "October",	"November",	"December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thurdsday", "Friday", "Saturday"];
  let day = days[d.getDate()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year =  d.getFullYear();
  return `${day} ${date} ${month} ${year}`;
};

const displayResults = (weather) => {
  console.log(weather)
  temp.textContent = Math.floor(weather.main.temp) + '°c';
  hiLow.textContent =  Math.floor(weather.main.temp_min) + '°c / ' + Math.floor(weather.main.temp_max) + ' °c';
  city.textContent = weather.name + ', ' + weather.sys.country;
  
}
const getResponse = (query) => {
  fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(response => {
      if(response.ok){
        return response.json();
      }
    })
    .then(displayResults)
    .catch((err) => {
      console.log(err);
    });
};
const setQuery = (evt) => {
  if(evt.keyCode === 13)
    getResponse(searchbox.value);
}

let now = new Date();
date.innerText = dateBulder(now);
searchbox.addEventListener('keypress', setQuery);

