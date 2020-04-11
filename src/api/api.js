import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.hgbrasil.com'
});

const getClima = async (city) => {
    let response = await api.get(`/weather?array_limit=5&fields=only_results,temp,city_name,forecast,max,min,date,condition,description&key=5bded5df&city_name=${city}`);

    return response;
}

export default getClima;