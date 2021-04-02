<template>
  <v-app>
    <l-map
      :zoom="zoom"
      :center="center"
      :options="{zoomControl: false}"
      @ready="initMap"
      ref="map"
    >
      <l-tile-layer :url="url"></l-tile-layer>
      <l-control-zoom position="bottomright"  ></l-control-zoom>
      <l-control position="topleft" >
        <v-toolbar short flat rounded class="px-2 leaflet-bar">
          <v-app-bar-nav-icon
            small
          ></v-app-bar-nav-icon>
          
          <v-text-field
            class="mx-2"
            hide-details
            label="Умный поиск"
          ></v-text-field>

          <v-btn 
            icon 
            small
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-toolbar>
      </l-control>
    </l-map>
  </v-app>  
</template>

<script>
//import InvestMap from 'components/InvestMap'

export default {
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 12,
      center: [56.8598, 35.8948],
    };
  },
  methods: {
    initMap() {
      const map = this.$refs.map.mapObject;
      map.invalidateSize(false);
    }
  },
}
</script>