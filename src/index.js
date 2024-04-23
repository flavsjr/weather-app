const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = 'api key';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(` https://api.weatherapi.com/v1/forecast.json?q=${city}&days=1&key=${APIKey}`)
        .then(response => {
            const statusCode = response.status;
            return response.json()
                .then(data => ({ data: data, statusCode: statusCode }));
        })
        .then(result => {
            
            if (result.statusCode === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const maxtemp = document.querySelector('.weather-box .chance-of-rain');
            const mintemp = document.querySelector('.weather-box .min-temp');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            image.src = `${result.data.forecast.forecastday[0].day.condition.icon}`;
            console.log(result.data.forecast.forecastday[0].day);
            //console.log(result.data.forecast.forecastday[0].day);
            temperature.innerHTML = `${result.data.forecast.forecastday[0].day.maxtemp_c}<span>°C</span>`;
            description.innerHTML = `${result.data.forecast.forecastday[0].day.condition.text}`;
            maxtemp.innerHTML = 'Chance of rain: ' + `${result.data.forecast.forecastday[0].day.daily_chance_of_rain}%`;
            mintemp.innerHTML = 'Min temp: ' + `${result.data.forecast.forecastday[0].day.mintemp_c}`;
            humidity.innerHTML = `${result.data.forecast.forecastday[0].day.avghumidity}%`;
            wind.innerHTML = `${result.data.forecast.forecastday[0].day.maxwind_kph} KM/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';

        })
});