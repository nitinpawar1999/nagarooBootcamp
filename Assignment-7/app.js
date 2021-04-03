const form = document.getElementById('form');
const place = document.getElementById('city');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const temp_min_max = document.getElementById('temp_min_max');

const getTVshows = async (searchText) => {

    const api = 'e3b1633ab23579f0f6f4fafe63306d13';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&units=metric&appid=${api}`;

    const fetchData = await fetch(url)
                            .then( (data) => {
                                return data.json();
                            }).then( (parsedData) =>{
                                if(parsedData){
                                let city =  parsedData.name+' , '+parsedData.sys.country;
                                place.innerHTML = city;
                                let d = new Date(0); 
                                d.setUTCSeconds(parsedData.dt);
                                date.innerText=d.toDateString();
                                temp.innerText = parsedData.main.temp+"\u00B0C";
                                weather.innerText = parsedData.weather[0].main;
                                temp_min_max.innerText = parsedData.main.temp_min+"\u00B0C/"+parsedData.main.temp_max+"\u00B0C";
                                }
                            })

}

getTVshows('new delhi');

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const searchText = form.elements[0].value;
    getTVshows(searchText);
    form.elements[0].value = "";
})


