import L from 'leaflet';
import { element } from './utils.js';

let map;

export function makeMap(mapEl) {
  const corner1 = L.latLng(-90, -200);
  const corner2 = L.latLng(90, 200);
  const bounds = L.latLngBounds(corner1, corner2);

  const options = {
    center: [0, 0],
    minZoom: 2,
    maxZoom: 7,
    zoom: 2,
    maxBounds: bounds,
    maxBoundsViscosity: 1.0,
  };

  map = L.map(mapEl, options);

  L.tileLayer(
    'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
    {
      maxZoom: 20,
      attribution:
        '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
}

function getContent(elem) {
  const {
    main, name, weather,
  } = elem;

  return element(
    'div',
    { class: 'card' },
    element(
      'div',
      { class: 'container' },
      element('p', { class: 'city-name' }, name),
      element(
        'div',
        { class: 'weather-icon' },
        element(
          'img',
          { class: 'icon', src: `./icons/${weather[0].icon}.png` },
          ' ',
        ),
      ),
      element('p', { class: 'temp' }, `${main.temp.toFixed(1)}°C`),
    ),
  );
}

const markers = [];

export function addMarker(location) {
  const { coord } = location;

  const content = getContent(location);

  const icon = L.icon({
    iconUrl: './icons/placeholder.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -32],
  });

  const popupOptions = {
    maxWidth: 500,
    className: 'popup',
  };
  const popup = L.popup(popupOptions).setContent(content);

  const mark = L.marker([coord.lat, coord.lon], { icon })
    .addTo(map)
    .bindPopup(popup);

  mark.addEventListener('mouseover', (e) => {
    e.target.openPopup();
  });

  markers.push(mark);
}

export function removeMarkers() {
  markers.forEach((i) => {
    map.removeLayer(i);
  });
}
