<template>
        <div class="history overflow-auto">
      <button type="button" class="btn btn-info" @click="clear">Очистить локальное хранилище</button>
      <ul class="list-group">
        <li v-for="plac in place"
            class="list-group-item" :key="plac.id"
             @click="geocodeLatLng(plac.lat,plac.lng)">
          <b>Место {{plac.id}} :</b>
          <p>
          Широта: {{plac.lat}}
          Долгота: {{plac.lng}}
          </p>
        </li>
      </ul>
    </div>
</template>

<script>
import {mapState} from 'vuex';

export default {

  computed: mapState(["place"]),
  methods: {
    clear() {
      this.$store.dispatch('clearLocStor');
    },
    geocodeLatLng(latPlace, lngPlace) {
      var map = new google.maps.Map(document.getElementById("map_canvas"), {
        zoom: 5,
        center: {
          lat: latPlace,
          lng: lngPlace
        }
      });
      var geocoder = new google.maps.Geocoder;
      var infowindow = new google.maps.InfoWindow;
      var latlng = {
        lat: latPlace,
        lng: lngPlace
      };
      geocoder.geocode({
        'location': latlng
      }, function (results, status) {
        if (status === 'OK') {
          if (results[0]) {
            map.setZoom(16);
            var marker = new google.maps.Marker({
              position: latlng,
              map: map
            });
            infowindow.setContent(results[0].formatted_address);
            infowindow.open(map, marker);
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
    }
  }
}
</script>

<style>
.history{
  width: 600px;
  height: 600px;
  background-color: rgb(238, 238, 238);
  margin-right: 20px;
}
li {
  margin: 5px;
}
.btn{
  margin: 5px;
}
</style>
