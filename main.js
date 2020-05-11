const api = {
  key: "93d1a0353b7c8ad9ac76dc7169e8b5f6",
  base: "https://api.openweathermap.org/data/2.5/"
};
const searchbox = document.querySelector('.search-box'),
main = document.querySelector('.main');


const dateBulder = () => {
  let d = new Date();
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
  console.log(weather);
  
  const spinner = document.querySelector('.spinner');
  spinner.remove();
  const { temp_min : min, temp_max : max, temp : t } = weather.main;

  const card = `
    <section class="location">
      <div class="city">${weather.name}, ${weather.sys.country}</div>
      <div class="date">${dateBulder()}</div>
    </section>
    <div class="current">
      <div class="temp">${Math.floor(t)}<span>°c</span></div>
      <div class="weather">${weather.weather[0].main}</div>
      <div class="description">${weather.weather[0].description}</div>
      <div class="hi-low">${Math.floor(min)}°c / ${Math.floor(max)}°c</div>
    </div>
  `;
  main.insertAdjacentHTML('beforeend', card);
  
};

const getResponse = (query) => {
  fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        console.error(response.status);
      }
    })
    .then(displayResults)
    .catch((err) => {
      console.error(err);
    });
};

const getData = async (query) => {
	const response = await fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`);
	if (!response.ok) {
    main.innerHTML = '<h2>Вы ввели нвеерный город попробуйте еще раз!!!</h2>';
    throw new Error (`Cтатус ${response.status}`);
  }
	return await response.json();
};


const setQuery = (evt) => {
  let card = '<div class="spinner></div>';
  if(evt.keyCode === 13) {
    main.innerHTML = '<div class="spinner"></div>';
    //getResponse(searchbox.value);
    getData(searchbox.value).then(displayResults);
  }
  
};

searchbox.addEventListener('keypress', setQuery);

