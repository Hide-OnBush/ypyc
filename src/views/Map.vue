<template><div  id="container"> </div></template>
<script setup lang="ts" >
      import { onBeforeMount, onMounted, ref } from 'vue';
      import axios from "axios";
      import AMapLoader from '@amap/amap-jsapi-loader';
      
      
      let path1 =ref([]);
      let path2 =ref([]);
      let path3 =ref([]);
      let path4 =ref([]);
      let path5 =ref([]);
      let paths=[path1,path2,path3,path4,path5]
      function clearPaths(paths){
          for (let index = 0; index < paths.length; index++) {
             paths[index].value=[];
          }
          }
      
      let weekday="周一"
      const value = ref('')//客户经理value
 /*     const colorForTag:Object={
        "一周内拜访":"red",
        "两周内拜访":"orange",
        "可一月内拜访":"yellow",
        "本周期已拜访":"lightblue"
      }
      
     */ 
      //定义对象，给标签打颜色
      //方法定义部分
      //处理原始客户
        // function getHandle(){
        //   axios.get("http://122.9.67.194:8000/api/customer/info/",
        //   {params:{},headers:{}})
        //   .then((res)=>{customers.value=res.data;}
          
          
        //   );
        // }
      //处理请求客户(base客户经理)
  /*       function postHandle(e:string){
          clearDelCusList()
          axios.post("http://122.9.67.194:8000/api/customer/info/cusForMan/",
          {text:e},{})
          .then((res)=>{customers.value=res.data;}
          );
        } 
*/       let cusMIndex:number=1
        //处理客户经理选择--定义数据
        const cusMangers = [
        { value: 1, text: "闻毅" ,Lng:121.529512,Lat:31.32098},
          { value: 2, text: "王毅" ,Lng:121.521791,Lat:31.279471},
          { value: 3, text: "邹宸" ,Lng:121.538858,Lat:31.296965},
          { value: 4, text: "刘昌敏" ,Lng:121.525144,Lat:31.29509},
          { value: 5, text: "王宏燕" ,Lng:121.519169,Lat:31.282271},
          { value: 6, text: "潘琦" ,Lng:121.530509,Lat:31.293561},
          { value: 7, text: "沈磊" ,Lng:121.536999,Lat:31.324108},
          { value: 8, text: "于丽琴" ,Lng:121.54199,Lat:31.287674},
          { value: 9, text: "刘嘉" ,Lng:121.519169,Lat:31.282271},
          { value: 10, text: "何玉萍", Lng:121.51352,Lat:31.306419},
          { value: 11, text: "沈秀月" ,Lng:121.532549,Lat:31.281506},
      ]
      
      const company={
        Lng:121.525144,Lat:31.29509
      }
      
      
      //处理地图原始渲染，此处必须加key
      function initMap(){
              AMapLoader.load({
                  key:"97faaa07fd10db3b317137503de756ed",             // 申请好的Web端开发者Key，首次调用 load 时必填
                  version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                  plugins:['AMap.Scale',"AMap.ToolBar"],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
              })
              .then((AMap)=>{
                      const map = new AMap.Map("container",{  //设置地图容器id
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
          }
      
      
      function get_path(path:array,cusArray:array){
                path.value.length=1
            for (let index = 0; index < cusArray.value.length; index++) {
             path.value.push (new AMap.LngLat(cusArray.value[index].Visit[0].经营地址的经度,cusArray.value[index].Visit[0].经营地址的纬度));
            }
            path.value.push(new AMap.LngLat(121.525144,31.29509))
           console.log(path.value);
           
            
      }
      //处理地图更新
       function updateMap( ){
            AMapLoader.load({
                key:"97faaa07fd10db3b317137503de756ed",
                  version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                  plugins:['AMap.Scale',"AMap.ToolBar"],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
              }).then((AMap)=>{
                      const map = new AMap.Map("container",{  //设置地图容器id
                      // mapStyle: 'amap://styles/darkblue',
                      viewMode:"3D",    //是否为3D地图模式
                      zoom:13,           //初始化地图级别
                      center:[121.530682,31.297311], //初始化地图中心点位置
                      
                  });
                
                get_path(path1,delCustomers1)
                get_path(path2,delCustomers2)
                get_path(path3,delCustomers3)
                get_path(path4,delCustomers4)
                get_path(path5,delCustomers5)
                var polyline1 = new AMap.Polyline({
                path: path1.value, 
                strokeWeight:6, 
                borderWeight: 100, // 线条宽度，默认为 1
                showDir:true,
                strokeColor: 'red', // 线条颜色
                lineJoin: 'round' // 折线拐点连接处样式
                 });
                 var polyline2 = new AMap.Polyline({
                path: path2.value, 
                strokeWeight:6,  
                borderWeight: 100, // 线条宽度，默认为 1
                showDir:true,
                strokeColor: 'green', // 线条颜色
                lineJoin: 'round' // 折线拐点连接处样式
                 });
                 var polyline3 = new AMap.Polyline({
                path: path3.value, 
                strokeWeight:6,  
                borderWeight: 1, // 线条宽度，默认为 1
                showDir:true,
                strokeColor: 'yellow', // 线条颜色
                lineJoin: 'round' // 折线拐点连接处样式
                 });
                 var polyline4 = new AMap.Polyline({
                path: path4.value,  
                showDir:true,
                strokeWeight:6, 
                borderWeight: 1, // 线条宽度，默认为 1
                strokeColor: 'orange', // 线条颜色
                lineJoin: 'round' // 折线拐点连接处样式
                 });
                 var polyline5 = new AMap.Polyline({
                path: path5.value,  
                showDir:true,
                strokeWeight:6, 
                borderWeight: 1, // 线条宽度，默认为 1
                strokeColor: 'black', // 线条颜色
                lineJoin: 'round' // 折线拐点连接处样式
                 });
      
              map.add(polyline1)
              map.add(polyline2)
              map.add(polyline3)
              map.add(polyline4)
              map.add(polyline5)
      }).catch(e=>{
        console.log(e);
        
      })}
       
      
      //生命周期函数
      onBeforeMount(()=>{

      })
      onMounted(()=>{
        
        initMap()
      })
      
      function getCurrentDelCusList(weekday:string){
        return delCustomers[weekday]         
      }
      function clearDelCusList(){
        delCustomers1.value=[]
        delCustomers2.value=[]
        delCustomers3.value=[]
        delCustomers4.value=[]
        delCustomers5.value=[]
      }
      
      
      //定义处理标签（即客户选择）的方法
      const handleClick = (cus:string) => {
        getCurrentDelCusList(weekday).value.push(cus)  
        customers.value.splice(customers.value.indexOf(cus), 1)
        insertTableData(getTableData(cus))
        updateMap()
        console.log(tableData)
      }
      
      
      
      
      //定义右下角拜访列表的数据
      
 /*       let tableDataObj :{
          date:string,
          name:string,
          id:string,
          type:string,
          address?:string,
          last_date?:string,
          task?:object[],
          modern:string,
          road:string,
          latest_time:string
          open:string,close:string,
          visit_time:string,
          pos:string
        }
      
      function getTableData(cus){
          // tableDataObj={name:delCustomers[weekday].value[delCustomers[weekday].value.indexOf(cus)].Visit[0].客户简称,
          // date:weekday}
          tableDataObj={
            name:cus.Visit[0].客户简称,modern:cus.Visit[0].是否现代终端,id:cus.Visit[0].客户代码_id,
            type:cus.Visit[0].经营业态,road:cus.Visit[0].送货路段,latest_time:cus.Visit[0].最晚线路规划时间,
            open:cus.Visit[0].开门时间,close:cus.Visit[0].关门时间,visit_time:cus.Visit[0].拜访日期,pos:cus.Visit[0].pos机类型,
            date:weekday,task:cus.Task}
          
          return(tableDataObj)
        }
      
      function insertTableData(tableDataObj){
          tableData.value.push(tableDataObj)
          
      }
      
      const tableData = ref([])
        
 */     
      function deleteTableData(tableDataObj){
              for (let i = 0; i < tableData.value.length; i++) {
                const element = tableData.value[i];
                if (element.name==tableDataObj.name){
                tableData.value.splice(i,1)}
                
              }
              console.log(tableData.value);
              
      }
      

      
</script>
<style lang="scss">
      #container{
              padding:0px;
              margin: 0px;
              height: 85vh;
              width: auto;
          }</style>