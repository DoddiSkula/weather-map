import { getWeather } from './weather.js';
import { addMarker, removeMarkers } from './map.js';

let cities;

export async function getCities() {
  let result;

  try {
    // eslint-disable-next-line no-undef
    result = await fetch('cities.json');
  } catch (e) {
    console.error('Error fetching data', e);
    return null;
  }

  if (!result.ok) {
    console.error('No response 200', await result.text());
    return null;
  }

  const data = await result.json();
  cities = data;

  return cities;
}

export async function search(key) {
  const results = [];

  if (key !== null) {
    cities.forEach((i) => {
      if (i.name.match(new RegExp(`^${key}`, 'i'))) {
        if (results.length <= 10) {
          results.push(i.id);
        }
      }
    });
  }

  if (results.length !== 0) {
    removeMarkers();
    const searchResult = await getWeather(results.join(','));
    searchResult.list.forEach((element) => {
      addMarker(element);
    });
  }

  return results;
}
