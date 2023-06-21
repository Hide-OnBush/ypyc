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


const initMap = () => {
  AMapLoader.load({
    key: "97faaa07fd10db3b317137503de756ed",
    version: "2.0",
    plugins: ['AMap.Scale', "AMap.ToolBar", "AMap.Driving"],
  })
    .then((AMap) => {
      const initMap = () => {
        const map = new AMap.Map("container", {
          viewMode: "3D",
          zoom: 13,
          center: [121.530682, 31.297311],
        });

        // 在这里可以添加其他地图相关的操作
        // 例如添加标记、绘制路线等

        // 示例：添加一个标记
        const marker = new AMap.Marker({
          position: [121.530682, 31.297311],
          map: map,
        });

        // 示例：绘制一条路线
        const driving = new AMap.Driving({
          map: map,
          policy: AMap.DrivingPolicy.LEAST_TIME,
        });
        const start = [121.530682, 31.297311];
        const waypoints = [
          [122.541682, 31.307311], // 第一个途径点
          [121.550682, 31.317311], // 第二个途径点
        ];
        const end = [121.540682, 31.307311];
        driving.search(start, end, waypoints, (status, result) => {
          if (status === "complete") {
            // 绘制路线成功
            console.log(result);
          } else {
            // 绘制路线失败
            console.error(result);
          }
        });

        // 其他地图操作和功能可以在这里添加

      };

      console.log("初始化绘制");
      initMap();
    })
    .catch((error) => {
      console.error("地图加载失败：", error);
    });
}


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