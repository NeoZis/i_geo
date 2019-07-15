<template>
  <div class="container">
    <div class="history overflow-auto">
      <button @click="clear">Clear local storage</button>
      <ul class="list-group">
        <li v-for="plac in place"
            class="list-group-item">
          Место
          <p @click="geocodeLatLng(plac.lat,plac.lng)">
          Широта: {{plac.lat}}
          Долгота: {{plac.lng}}
          </p>
        </li>
      </ul>
    </div>
    <div id="map_canvas" >

    </div>
    <!-- <input type="range" name="" id="" min="5" max="18" v-model="zoom"> -->
  </div>
</template>

<script>
import {mapState} from 'vuex'
  export default {
    mounted() {
      this.$getLocation({
          enableHighAccuracy: true, //defaults to false
          timeout: Infinity, //defaults to Infinity
          maximumAge: 0 //defaults to 0})
        })
        .then(coor => {
          this.$store.dispatch('savePlace', {
            ...coor
          });
          var opt = {
            zoom: this.zoom
          };
          var map = new google.maps.Map(document.getElementById("map_canvas"), opt);
          map.setCenter({
            lat: coor.lat,
            lng: coor.lng
          });
          var marker = new google.maps.Marker({
            map: map,
            position: {
              lat: coor.lat,
              lng: coor.lng
            }
          });
        })
    },
    data () {
      return {
        zoom: 15,
        coor: ''
      }
    },
    computed: mapState(["place"]),
    methods: {
      clear() {
        this.$store.dispatch('clearLocStor');
      },
      geocodeLatLng(latPlace,lngPlace) {
        var map = new google.maps.Map(document.getElementById("map_canvas"),{zoom:5, 
        center: {lat: latPlace, lng: lngPlace}});
        var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow;
        var latlng = {lat: latPlace, lng: lngPlace};
        geocoder.geocode({'location': latlng}, function(results, status) {
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

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}
#map_canvas{
  width: 600px;
  height: 600px;
  background-color: grey;
}
.history{
  width: 600px;
  height: 600px;
  background-color: yellow;
  margin-right: 20px;
}
li {
  margin: 5px;
}
</style>