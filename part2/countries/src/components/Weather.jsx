import axios from 'axios';
import { useEffect, useState } from 'react';

const Weather = ({ country }) => {
	const [weather, setWeather] = useState();
	const api_key = process.env.REACT_APP_API_KEY;
	// const country = filteredCountries[0];
	const lat = country && country.latlng[0];
	const lon = country && country.latlng[1];

	useEffect(() => {
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
			)
			.then((response) => setWeather(response.data));
	}, [api_key, lat, lon]);

	const temperature = weather ? weather.main.temp : '';
	const iconId = weather ? weather.weather[0].icon : '';
	const wind = weather ? weather.wind.speed : '';
	return (
		<div>
			<h2>Weather in {country.capital[0]}</h2>
			<p>temperature {temperature} C</p>
			{iconId && (
				<img
					src={`http://openweathermap.org/img/wn/${iconId}@2x.png`}
					alt={iconId}
				/>
			)}
			<p>wind {wind} m/s</p>
		</div>
	);
};

export default Weather;
