<template>
  <div id="container"> </div>
</template>

<script setup lang="ts" >
import { onBeforeMount, onMounted, ref, version } from 'vue';
import axios from "axios";
import AMapLoader from '@amap/amap-jsapi-loader';

// let weekday = "周一"
// const value = ref('')//客户经理value
// const company = {
//   Lng: 121.525144, Lat: 31.29509
// }
//处理地图原始渲染，此处必须加key


const map = new AMap.Map("container", {
        center: [116.397559, 39.89621],
        zoom: 14
    });



const ridingOption={policy:1}

const riding=new AMap.Riding(ridingOption)

riding.search([121.536341, 31.324918],[121.503676, 31.293989],function(status,result){
  if(status==='complete'){
    console.log(1);
    
  }else{
    console.log("SHIBAI");
    
  }
})



onBeforeMount(() => {

})
onMounted(() => {
initMap()
})




</script>
<style lang="scss">
#container {
  padding: 0px;
  margin: 0px;
  height: 85vh;
  width: auto;
}
</style>