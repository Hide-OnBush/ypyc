<template>
  <div id="container"> </div>
  <div>

  </div>
</template>

<script setup lang="ts" >
import { onBeforeMount, onMounted, ref, version,inject, onUpdated, type Ref} from 'vue';
import axios from "axios";
import AMapLoader from '@amap/amap-jsapi-loader';
import { useRoute } from 'vue-router';
import { useMapStore } from '@/stores/counter';
const store=useMapStore();
const initMap = () => {
  AMapLoader.load({
    key: "97faaa07fd10db3b317137503de756ed",
    version: "2.0",
    plugins: ['AMap.Scale', "AMap.ToolBar", "AMap.Driving", "AMap.Riding"],
  })
    .then((AMap) => {
      const map = new AMap.Map("container", {
        viewMode: "3D",
        zoom: 13,
        center: [121.530682, 31.297311],
      });
      const driving = new AMap.Riding({
        map: map,
        hideMarkers: true,
      });
      // const P = [[121.491344, 31.293496], [121.500719, 31.336273], [121.525161, 31.281641], [121.548550, 31.267749]]

      for (let index = 0; index < store.mapData.length-1; index++) {
        let startP =new AMap.LngLat(store.mapData[index].lng, store.mapData[index].lat);
        let endP = new AMap.LngLat(store.mapData[index+1].lng, store.mapData[index+1].lat);
        driving.search(startP, endP, function (status, result) {
          if (status === 'complete') {
            let pointPosition = new AMap.LngLat(store.mapData[index].lng, store.mapData[index].lat);
            let pointMarker = new AMap.Marker({
              position: pointPosition,
              icon: createMarkerIcon(index + 1),
            });
            let shopText = new AMap.Text({
              text: store.mapData[index].name, // 文字内容
              position: pointPosition, // 文字位置
              map: map,// 将文字添加到地图上
              style: {
                'verticalAlign': 'bottom', // 垂直对齐方式为底部
                'fontSize': '12px', // 字体大小
                'color': '#000', // 文字颜色
                'fontWeight': 'bold',
                'background': 'rgba(255, 255, 255, 0.8)', // 文字背景颜色
                'padding': '4px 8px' // 内边距
              }
            })
            map.add(shopText);
            map.add(pointMarker);
            map.setFitView(pointMarker);



            if (index === (store.mapData.length-2) ) {
              let lastPosition = new AMap.LngLat(store.mapData[index + 1].lng, store.mapData[index + 1].lat);
              let lastOneMarker = new AMap.Marker({
                position: lastPosition,
                icon: createMarkerIcon(index + 2),

              });
              let lastText = new AMap.Text({
                text: store.mapData[index+1].name, // 文字内容
                position: lastPosition, // 文字位置
                map: map,// 将文字添加到地图上
                style: {
                  'verticalAlign': 'bottom', // 垂直对齐方式为底部
                  'fontSize': '12px', // 字体大小
                  'color': '#000', // 文字颜色
                  'fontWeight': 'bold',
                  'background': 'rgba(255, 255, 255, 0.8)', // 文字背景颜色
                  'padding': '4px 8px' // 内边距
                }
              })
              map.add(lastText)
              map.add(lastOneMarker)
            }

            if (result.routes && result.routes.length) {
              drawRoute(result.routes[0])
            }
          } 
        });
      }
      function createMarkerIcon(number) {
        return new AMap.Icon({
          size: new AMap.Size(18, 18), // 图标尺寸
          imageSize: new AMap.Size(18, 18), // 图片尺寸
          angle: 90,
          image: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b' + number + '.png', // 图标图片 URL
          text: number, // 显示的文本
          textAlign: 'center', // 文本对齐方式
          verticalAlign: 'middle' // 文本垂直对齐方式
        });
      }
      function drawRoute(route) {
        let path = parseRouteToPath(route)

        let routeLine = new AMap.Polyline({
          path: path,
          showDir: true,
          isOutline: true,
          outlineColor: '#ffffff',
          borderWeight: 2,
          strokeWeight: 5,
          strokeColor: '#089C2E',
          strokeOpacity: 0.9,
          lineJoin: 'round'
        })
        map.add(routeLine);
        map.setFitView(routeLine)
      }

    })
    .catch((error) => {
      console.error("地图加载失败：", error);
    });
}


function parseRouteToPath(route) {
  let path = []

  for (let i = 0, l = route.rides.length; i < l; i++) {
    let step = route.rides[i]

    for (let j = 0, n = step.path.length; j < n; j++) {
      path.push(step.path[j])
    }
  }
  return path
}







onBeforeMount(() => {

})
onMounted(() => {
  initMap()
  console.log(store.mapData.name)
})

onUpdated(()=>{
  initMap()
  console.log(store.mapData.name)
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