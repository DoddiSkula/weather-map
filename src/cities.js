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

export function search(key) {
  const results = [];

  cities.forEach((i) => {
    if (i.name.includes(key)) {
      results.push(`${i.name} - ${i.country}`);
    }
  });

  return results;
}
