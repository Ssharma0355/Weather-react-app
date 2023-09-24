import React, { useState } from 'react'
import "./WeatherApp.css"
import clear from "../asset/clear.png"
import snow from "../asset/snow.png"
import humidity from "../asset/humidity.png"
import wind from "../asset/wind.png"
import rain from "../asset/rain.png"
import partialcloud from "../asset/partialcloud.png"
import searchicon from "../asset/searchicon.png"



function WeatherApp() {

    let api_key = "9d15dfe2825341415b0cd9512fa7dea6";

    const [wicon, setWicon] = useState(partialcloud);
    const [errorText, setError] = useState('')
    const search = async () => {
        const element = document.getElementsByClassName("cityInput")
        if (element[0].value === "") {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let response = await fetch(url);
        if (response.status === 200) {
            let data = await response.json();

            const humidity = document.getElementsByClassName("humidity-percent");
            const wind = document.getElementsByClassName("wind-rate");
            const temperature = document.getElementsByClassName("weather-temp");
            const location = document.getElementsByClassName("weather-location");

            humidity[0].innerHTML = data.main.humidity + "%";
            wind[0].innerHTML = data.wind.speed + " Km/h";
            temperature[0].innerHTML = data.main.temp + " °c";
            location[0].innerHTML = data.name;

            if (data.weather[0].icon === "01n" || data.weather[0].icon === "01n") {

                setWicon(clear);
            }
            else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
                setWicon(partialcloud);
            }
            else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
                setWicon(partialcloud);
            }
            else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
                setWicon(rain);
            }
            else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
                setWicon(rain);
            }
            else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
                setWicon(snow);
            }
            else {
                setWicon(clear);
            }
        } else {
            setError(response?.statusText)
        }

    }


    return (
        <div className='container'>
            <div className='w-100'>
                <div className='top-bar'>
                    <input type='text' className='cityInput' placeholder='Search' onKeyUp={event => event.key === 'Enter' && search()} />
                    <div className="search-icon" onClick={() => { search() }}>
                        <img src={searchicon} alt='Search' />
                    </div>

                </div>
            </div>
            <div className={`${errorText ? 'show error' : 'hide'}`}>
                <h2>{errorText}</h2>
            </div>
            <div className={`${errorText ? 'hide' : 'show'}`}>
                <div className='weather-image'>
                    <img src={wicon} alt="partialcloud" />
                </div>
                <div className='weather-temp'>{ }</div>
                <div className='weather-location'></div>
                <div className='data-container'>
                    <div className="element">
                        <img src={humidity} alt="" className='icon' />
                        <div className="data">
                            <div className="humidity-percent">{ }</div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>
                    <div className="element">
                        <img src={wind} alt="" className='icon' />
                        <div className="data">
                            <div className="wind-rate">{ }</div>
                            <div className="text">Wind Speed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp