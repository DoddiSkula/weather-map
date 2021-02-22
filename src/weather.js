const cityid = '6692263,2643743,5128581,5368361,3451190,1816670,3369157,2147714,524901,292223';
const APIkey = 'f3152b4316fa515ea02d748191665d8e';
const url = `http://api.openweathermap.org/data/2.5/group?id=${cityid}&units=metric&APPID=${APIkey}`;

export async function getWeather() {
  let result;

  try {
    result = await fetch(url); // eslint-disable-line
  } catch (e) {
    console.error('Error fetching data', e);
    return null;
  }

  if (!result.ok) {
    console.error('No response 200', await result.text());
    return null;
  }

  const data = await result.json();

  console.info(data);

  return data;
}
