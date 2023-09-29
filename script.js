


const apiKey = 'a2d981634a393ddfbc2f77ca8efaf368'; 

const weatherDisplay = document.getElementById('weatherDisplay');

function getWeather() {
    const locationInput = document.getElementById('locationInput').value;

    if (!locationInput) {
        alert('Please enter a location.');
        return;
    }
    
    
    
    const unit = document.getElementById('unitSelect').value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&units=${unit}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            console.error('Error fetching data:', error);
            displayError('Error fetching data. Please try again.');
        });
}

function displayWeather(data) {
    const { name, main, wind, weather } = data;

    const temperature = main.temp;
    const humidity = main.humidity;
    const windSpeed = wind.speed;
    const weatherDescription = weather[0].description;

    const displayHtml = `
        <h2>${name}</h2>
        <p>Temperature: ${temperature} &deg;${document.getElementById('unitSelect').value === 'metric' ? 'C' : 'F'}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <p>Weather Description: ${weatherDescription}</p>
    `;

    weatherDisplay.innerHTML = displayHtml;
}

function displayError(message) {
    weatherDisplay.innerHTML = `<p class="error">${message}</p>`;
}
