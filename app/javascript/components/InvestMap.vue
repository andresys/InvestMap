<template>
<l-map :zoom="startPosition.zoom" :center="startPosition.center" :options="{zoomControl: false, attributionControl: false}" ref="map" @ready="initMap">
  <l-tile-layer :url="url"></l-tile-layer>
  <l-tile-layer :url="webcamurl"></l-tile-layer>

  <!--l-control-zoom position="bottomright"></!--l-control-zoom-->

  <l-control-attribution position="bottomleft" prefix="Инвестиционная карта города Твери <br/> Leaflet | &copy; Участники OpenStreetMap"></l-control-attribution>
  <!--l-control-attribution position="bottomleft" prefix="Инвестиционная карта города Твери"></!--l-control-attribution-->
  <l-control-scale position="bottomleft" :imperial="false" :metric="true"></l-control-scale>

  <l-control position="topright" class="leaflet-control-smartbar leaflet-left">
    <v-sheet color="white" elevation="2">
      <v-app-bar flat color="white">
        <v-app-bar-nav-icon @click.stop="$emit('panel')"></v-app-bar-nav-icon>

        <v-text-field hide-details single-line placeholder="Умный поиск"></v-text-field>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-app-bar>
    </v-sheet>
  </l-control>

  <l-control position="topright">
    <v-sheet color="white" elevation="2">
      <v-btn icon tile @click.stop="sidebar=!sidebar">
        <v-icon>mdi-layers-triple-outline</v-icon>
      </v-btn>
    </v-sheet>
  </l-control>

  <LControlSidebar position="right" :open="sidebar" :width="350">
    <v-card tile height="100%">
      <v-toolbar color="#17aee4" class="elevation-0" dark>
        <v-btn icon @click.stop="sidebar=!sidebar">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        <v-toolbar-title>Отображаемые слои</v-toolbar-title>
      </v-toolbar>
    </v-card>
  </LControlSidebar>

  <l-control position="topright">
    <v-sheet color="white" elevation="2">
      <v-btn icon tile>
        <v-icon>mdi-ruler</v-icon>
      </v-btn>
    </v-sheet>
  </l-control>

  <l-control position="topright">
    <v-sheet color="white" elevation="2">
      <v-btn icon tile @click="geolocation">
        <v-icon>mdi-target</v-icon>
      </v-btn>
    </v-sheet>
  </l-control>

  <l-control position="bottomright">
    <v-sheet color="white" elevation="2">
      <v-btn icon tile>
        <v-icon>mdi-compass-outline</v-icon>
      </v-btn>
    </v-sheet>
  </l-control>

  <l-control position="bottomright">
    <v-sheet color="white" elevation="2">
      <v-btn icon tile @click="map.zoomIn()" :disabled="map && (map.getZoom() == map.getMaxZoom()) || false">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-sheet>
    <!--v-slider max="16" min="0" vertical></!--v-slider-->
    <v-sheet color="white" elevation="2">
      <v-btn icon tile @click="map.zoomOut()" :disabled="map && (map.getZoom() == map.getMinZoom()) || false">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
    </v-sheet>
  </l-control>
</l-map>
</template>

<script>
import { LMap, LTileLayer, LMarker, LControlAttribution, LControl, LControlZoom, LControlScale } from 'vue2-leaflet';
import L from 'leaflet'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl-leaflet'
import 'mapbox-gl/dist/mapbox-gl.css'
import { latLngBounds, latLng } from "leaflet";
import LControlSidebar from "./LeafletControls/LControlSidebar.vue";
import '../plugins/leaflet-hash'
import 'leaflet/dist/leaflet.css';
// import { mapboxGL } from '../plugins/mapbox-gl-helper'

window.mapboxgl = mapboxgl

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LControlZoom,
    LControlScale,
    LControlAttribution,
    LControl,
    LControlSidebar,
  },
  data() {
    return {
      map: null,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      webcamurl: 'http://10.10.2.10/genplan/{z}/{x}/{y}.png?layer=webcam',
      sidebar: false,
      layerOptions: {
        accessToken: 'pk.eyJ1IjoiYW5kcmVzeXMiLCJhIjoiY2tiOTBseGQwMDlsNjJxbzhuY3V5YnVzZyJ9.GFa5a-XvBpHzJJauRAMfpw',
        style: 'mapbox://styles/mapbox/bright-v8'
      }
    };
  },
  computed: {
    startPosition: function () {
      let zoom = 12
      let lat = 56.8598
      let lng = 35.8948
      if (window.location.hash) {
        [zoom, lat, lng] = this.$route.hash.match(/([0-9]+)\/([0-9.]+)\/([0-9.]+)/).slice(1)
      }
      return { zoom: parseInt(zoom), center: [parseFloat(lat), parseFloat(lng)] }
    },
  },
  methods: {
    initMap() {
      this.map = this.$refs.map.mapObject;
      new L.Hash(this.map, []);
      this.map.invalidateSize(false);
      // console.log(L.mapboxGL(this.layerOptions))
    },
    geolocation() {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 1000
      }
      this.$getLocation(options)
        .then(coordinates => {
          const lat = coordinates.lat
          const lng = coordinates.lng
          const zoom = 16

          this.map.flyTo(latLng(lat, lng), zoom, { animate: true, duration: 0.5 })
        });
    },
  },
}
</script>
