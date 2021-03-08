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
  let found;
  // const BreakException = {};

  if (key !== null) {
    found = cities.find((city) => city.name.match(new RegExp(`^${key}$`, 'i')));
    results.push(found.id);
  /* try {
      cities.forEach((i) => {
        if (i.name.match(new RegExp(`^${key}$`, 'i'))) {
          results.push(i.id);
          if (results.length >= 1) {
            throw BreakException;
          }
        }
      });
    } catch (e) {
      if (e !== BreakException) throw e;
    } */
  }

  if (found) {
    removeMarkers();
    let searchResult;
    try {
      searchResult = await getWeather(results.join(','));
    } catch (e) {
      console.error('Error fetching data: ', e);
    }

    if (searchResult !== null) {
      searchResult.list.forEach((element) => {
        addMarker(element);
      });
    }
  }

  return results;
}
