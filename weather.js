//document.write("Hello this is testing from java");


let appId = '1cb4083818cb04732f232a7a92da55f1';
let units = 'imperial';       //imperial for fahrenheit temperature
let searchMethod;


function getsearchMethod(searchTerm) {    
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
    searchMethod = 'zip';
    else
    searchMethod = 'q';

}



function searchWeather(searchTerm) { 
    getsearchMethod(searchTerm);                    
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {              //the & symbol will seperate each query premeter wich is the  searchMethod and searchTerm
        return result.json();

    }).then(result => {
       init(result);

    }) 
   
}

//this is for the background pictures
function init(resultFromServer) {
    console.log(resultFromServer);
    switch(resultFromServer.weather[0].main) {
        
        case 'Clear':
            document.body.style.backgroundImage = 'url("./img/clear.jpg")';
            break;

        case 'Clouds':
            document.body.style.backgroundImage = 'url("./img/cloudy.jpg")';

            break;
            
        case 'Rain':
        case 'Drizzle':

            document.body.style.backgroundImage = 'url("./img/rain.jpg")';
            break;
        
        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("./img/storm.jpg")';
            break;
        
        case 'Mist':
            document.body.style.backgroundImage = 'url("./img/mist.jpg")';
            break;

        case 'Haze':
            document.body.style.backgroundImage = 'url("./img/haze2.jpg")';
            break;
            
        case 'Snow':
            document.body.style.backgroundImage = 'url("./img/snow.jpg")';
            break;

        default:
            break;

    }

    
    
    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let widnSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');



    weatherIcon.src = 'http://openweathermap.org/img/w/' +  resultFromServer.weather[0].icon +  '.png';

    let resultDescription = resultFromServer.weather[0].description;    
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);


    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
    widnSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + 'm/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%'

   
    

}



function setPositionForWeather() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth
   
    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainerWidth.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer.style.visibility = 'visibility';

    
    setPositionForWeatherInfo();    
    
}
 


document.getElementById('searchBtn').addEventListener('click',() => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
    searchWeather(searchTerm);
});


