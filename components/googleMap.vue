<template>
<div class="google-map" :id="name">
    </div>   
</template>

<script>
export default {
        name: 'google-map',
        props: ['name'],
        data: function () {
            return {}
        },
        mounted: function () {
            const element = document.getElementById(this.name)
            const options = {
                zoom: 14,
                center: new google.maps.LatLng(59.93, 30.32)
            }
            this.map = new google.maps.Map(element, options)
        },
        methods: {
        geoLocation () {
        this.$getLocation({
    enableHighAccuracy: true, //defaults to false
    timeout: Infinity, //defaults to Infinity
    maximumAge: 0 //defaults to 0
    
})
  .then(coordinates => {
    return coordinates;
  });
      }
        }
}
</script>

<style>
    .google-map {
        width: 640px;
        height: 480px;
        margin: 0 auto;
        background: gray;
    }
</style>
