const api = {
  key: "93d1a0353b7c8ad9ac76dc7169e8b5f6",
  base: "https://api.openweathermap.org/data/2.5/"
};
const searchbox = document.querySelector('.search-box'),
temp = document.querySelector('.temp'),
hiLow = document.querySelector('.hi-low'),
city = document.querySelector('.city'),
date = document.querySelector('.location .date'),
main = document.querySelector('.main');
//location = document.querySelector('.location');


const dateBulder = (d) => {
  let months = ["January",	"February","March",	"April",
                "May",	"June", "July",	"August",	
                "September", "October",	"November",	"December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", 
              "Thurdsday", "Friday", "Saturday"];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year =  d.getFullYear();
  return `${day} ${date} ${month} ${year}`;
};

const displayResults = (weather) => {

  const { temp_min : min, temp_max : max, temp : t } = weather.main;
  console.log(weather);
  temp.textContent = Math.floor(t) + '°c';

  hiLow.textContent =  `${Math.floor(min)} °c /
                        ${Math.floor(max)}  °c`;

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
  let card = '<div class="spinner></div>';
  main.insertAdjacentHTML('beforebegin', card);
  if(evt.keyCode === 13)
    getResponse(searchbox.value);
}

let now = new Date();
date.innerText = dateBulder(now);
searchbox.addEventListener('keypress', setQuery);

