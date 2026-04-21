let apiKey =  "d2f405a09cd52dd75818936f22e0cae2"

const apiUrl= "https://api.openweathermap.org/data/2.5/weather?&units=metric&q="

const cityInput = document.getElementById("cityInput")
const city = document.getElementById("city")
const weather = document.getElementById("weather")
const temp = document.getElementById("temp")

document.getElementById('search').addEventListener("click", async ()=>{
    const response = await fetch(apiUrl + cityInput.value + `&appid=${apiKey}`)
    let data = await response.json();
    console.log(apiUrl + cityInput.value + `&appid=${apiKey}`)
    console.log(data)
    city.innerHTML = "city: " + data.name
    weather.innerHTML = "Weather: " + data.weather[0].main
    temp.innerHTML = "Temperature: " + data.main.temp
})