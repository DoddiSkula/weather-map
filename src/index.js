import { getWeather } from './weather.js';
import { makeMap, addMarker } from './map.js';
import { getCities, search } from './cities.js';

let weather;
const map = document.querySelector('.map'); // eslint-disable-line

function init() {
  weather.list.forEach((element) => {
    addMarker(element);
  });
}

document.addEventListener('DOMContentLoaded', async () => { // eslint-disable-line
  weather = await getWeather();
  makeMap(map);
  init();
  await getCities();
  search('Gru');
});
