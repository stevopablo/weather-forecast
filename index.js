document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    // const temperatura = document.querySelector('.number-temp');
    // const pais = document.querySelector('.title');
    // const descricao = document.querySelector('.number-2-temp');
    // const icone = document.querySelector('.img-temp');
    // const min_temp = document.querySelector('#min-temp');
    // const max_temp = document.querySelector('#max-temp');
    const cityName = document.getElementById('city-name').value;

    if (!cityName) {
        MostrarAlerta('Campo não pode ser vazio');
        console.warn('Campo vazio');
    } else {
        console.log('procurando cidade por:', cityName);
    }

    const API_KEY = 'd75cdc25dc703dcbdb6daf83c3a0f474';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${API_KEY}&units=metric&lang=pt_br`;

    const resultado = await fetch(apiUrl);
    const dados = await resultado.json();
    console.log(dados);

    if (dados.cod == 200) {
        displayWeather({
            cidade: dados.name,
            pais: dados.sys.country,
            temperatura: dados.main.temp,
            descricao: dados.weather[0].description,
            icone: dados.weather[0].icon,
            velocidade_vento: dados.wind.speed,
            umidade: dados.main.humidity,
            pressao: dados.main.pressure,
            visibilidade: dados.visibility,
            nascer_sol: dados.sys.sunrise,
            por_sol: dados.sys.sunset,
            temperatura_min: dados.main.temp_min,
            temperatura_max: dados.main.temp_max,
            temperatura_feels: dados.main.feels_like,
            temperatura_sea: dados.main.sea_level,
            temperatura_grnd: dados.main.grnd_level
        });
    } else {
        MostrarAlerta('Não foi possível encontrar, tente outra vez');
    }
});

function displayWeather(info) {
    document.querySelector('.title').innerText = `${info.cidade}, ${info.pais}`;
    document.querySelector('.number-temp').innerHTML = `${info.temperatura} <sup>°C</sup>`;
    document.querySelector('.number-2-temp').innerText = info.descricao;
    document.querySelector('.img-temp').src = `https://openweathermap.org/img/wn/${info.icone}@2x.png`;
    document.querySelector('#min_temp').innerHTML = `${info.temperatura_min} <sup>°C</sup>`;
    document.querySelector('#max_temp').innerHTML = `${info.temperatura_max} <sup>°C</sup>`;
    document.querySelector('#wind_speed').innerHTML = `${info.velocidade_vento} km/h`
    document.querySelector('#humidity').innerHTML = `${info.umidade} %`
}

function MostrarAlerta(msg) {
    document.querySelector('#alert').innerHTML = msg;
}
