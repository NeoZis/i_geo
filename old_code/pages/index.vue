<template>
  <div class="container">
    <ViewPlaces />
    <div id="map_canvas" >

    </div>
    <!-- <input type="range" name="" id="" min="5" max="18" v-model="zoom"> -->
  </div>
</template>

<script>
import ViewPlaces from "~/components/ViewPlaces"

  export default {
    components:{
      ViewPlaces
    },
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
          var geocoder = new google.maps.Geocoder;
          var position = {lat: coor.lat, lng: coor.lng};
          var map = new google.maps.Map(document.getElementById("map_canvas"), opt);
          map.setCenter(position);
          var marker = new google.maps.Marker({
            map: map,
            position: position
          });
        })
    },
    data () {
      return {
        zoom: 15,
        coor: ''
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
</style>