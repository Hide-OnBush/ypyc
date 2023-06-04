<template>
  <button @click="planRidingRoute" >规划骑行路径</button>
    <div style="height: 85vh;">
      
      <div id="map" style="width: 100%; height: 400px;"></div>
      
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import AMapLoader from '@amap/amap-jsapi-loader';
  let map = null;
  const path = ref([]);
  const startPoint = [121.529512, 31.32098]; // 起点坐标
  const endPoint = [121.527457, 31.318164]; // 终点坐标
  const waypoints = [  [121.557457, 31.338164],
  [121.577457, 31.418164]]; // 中间点坐标，可以传入更多的中间点坐标
  
  onMounted(() => {
    AMapLoader.load({
                  key:"97faaa07fd10db3b317137503de756ed",             // 申请好的Web端开发者Key，首次调用 load 时必填
                  version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                      // 需要使用的的插件列表，如比例尺'AMap.Scale'等
              })
              .then((AMap)=>{
                      const map = new AMap.Map("map",{  //设置地图容器id
                        // mapStyle: 'amap://styles/darkblue',
                        viewMode:"3D",    //是否为3D地图模式
                      zoom:13,           //初始化地图级别
                      center:[121.530682,31.297311], //初始化地图中心点位置
                      
                  });
      
                map.setDefaultCursor("pointer"); //使用CSS默认样式定义地图上的鼠标样式（default/pointer/move/crosshair）
                map.addControl(new AMap.Scale()); //异步同时加载多个插件
                map.addControl(new AMap.ToolBar());
                // map.addControl(new AMap.Geolocation());
      
      
              }).catch(e=>{
                  console.log(e);
              })
  });
  
  const planRidingRoute = () => {
    // 创建Riding实例
    const riding = new AMap.Riding({
      map: map,
      panel: 'panel'
    });
  
    // 规划骑行路径
    riding.search(startPoint, endPoint, { waypoints: waypoints }, (status, result) => {
      if (status === 'complete') {
        // 路径规划成功
        console.log(result);
        // 在地图上绘制路径
        drawRoute(result.routes[0].steps);
      } else {
        // 路径规划失败
        console.error('路径规划失败：', result);
      }
    });
  };
  
  const drawRoute = (steps) => {
    // 清除之前的路径
    path.value.forEach((polyline) => {
      polyline.setMap(null);
    });
    path.value = [];
  
    // 绘制路径
    for (let i = 0; i < steps.length; i++) {
      const polyline = new AMap.Polyline({
        map: map,
        path: steps[i].path,
        strokeColor: '#3366FF',
        strokeWeight: 4
      });
      path.value.push(polyline);
    }
  };
  </script>
  