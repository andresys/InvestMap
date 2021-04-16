import mapboxgl from 'mapbox-gl';
import L from "leaflet";
import 'mapbox-gl-leaflet'
import 'mapbox-gl/dist/mapbox-gl.css'

function mapboxGL(optioins) {
  window.mapboxgl = mapboxgl
  return L.mapboxGL(options)
}

export default { mapboxGL }