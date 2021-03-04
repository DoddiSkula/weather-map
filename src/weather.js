export async function getWeather(cityid) {
  const key = 'f3152b4316fa515ea02d748191665d8e'; // should be hidden as a environmental variable but will let it slide for this simple project!
  const url = `https://api.openweathermap.org/data/2.5/group?id=${cityid}&units=metric&APPID=${key}`;
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

  return data;
}
