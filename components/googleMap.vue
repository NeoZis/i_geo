<template>
    <div id="map_canvas" >

    </div>
</template>

<script>
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
          var geocoder = new google.maps.Geocoder;
          var position = {
            lat: coor.lat,
            lng: coor.lng
          };
          var map = new google.maps.Map(document.getElementById("map_canvas"), opt);
          map.setCenter(position);
          var marker = new google.maps.Marker({
            map: map,
            position: position
          });
        })
    },
    data() {
      return {
        zoom: 15,
        coor: ''
      }
    }
}
</script>

<style>
#map_canvas{
  width: 600px;
  height: 600px;
  background-color: grey;
}
</style>
