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
  makeMap(map);
  await getCities();

  const urlParams = new URLSearchParams(window.location.search);  // eslint-disable-line
  const searchKey = urlParams.get('search');

  if (searchKey === null) {
    weather = await getWeather('6692263,2643743,5128581,5368361,3451190,1816670,3369157,2147714,524901,292223');
    init();
  } else {
    await search(searchKey);
  }
});
