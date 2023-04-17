<template>
  <el-main>
    <!-- 上半区 -->
    <el-row class='row-top'>
      <!-- 左上：排线路部分 -->
      <el-col :span="12" class="col-left-top">
        <el-tabs tab-position="top" v-model="weekday" style="height: 30vh; font: bold;" type="card"
          @tab-change="getCurrentDelCusList">
          <el-tab-pane label="周一" name="周一">
            <el-tag size="small" v-show="flag">{{ cusMangers[cusMIndex - 1].text }}家</el-tag>
            <el-tag v-for="del in delCustomers1" :key="del" type="info" size="large"
              :color="colorForTag[del.Visit[0].拜访建议]" closable @close="handleClose(del)"> {{ del.Visit[0].客户简称 }}
            </el-tag><el-tag size="large" v-if="delCustomers1.length > 0">公司</el-tag></el-tab-pane>
          <el-tab-pane label="周二" name="周二">
            <el-tag size="small" v-show="flag">{{ cusMangers[cusMIndex - 1].text }}家</el-tag>
            <el-tag v-for="del in delCustomers2" :key="del" type="info" size="large"
              :color="colorForTag[del.Visit[0].拜访建议]" closable @close="handleClose(del)"> {{ del.Visit[0].客户简称 }}
            </el-tag><el-tag size="large" v-if="delCustomers2.length > 0">公司</el-tag>
          </el-tab-pane>
          <el-tab-pane label="周三" name="周三">
            <el-tag size="small" v-show="flag">{{ cusMangers[cusMIndex - 1].text }}家</el-tag>
            <el-tag v-for="del in delCustomers3" :key="del" type="info" size="large"
              :color="colorForTag[del.Visit[0].拜访建议]" closable @close="handleClose(del)"> {{ del.Visit[0].客户简称 }}
            </el-tag><el-tag size="large" v-if="delCustomers3.length > 0">公司</el-tag></el-tab-pane>
          <el-tab-pane label="周四" name="周四">
            <el-tag size="small" v-show="flag">{{ cusMangers[cusMIndex - 1].text }}家</el-tag>
            <el-tag v-for="del in delCustomers4" :key="del" type="info" size="large"
              :color="colorForTag[del.Visit[0].拜访建议]" closable @close="handleClose(del)"> {{ del.Visit[0].客户简称 }}
            </el-tag><el-tag size="large" v-if="delCustomers4.length > 0">公司</el-tag></el-tab-pane>
          <el-tab-pane label="周五" name="周五">
            <el-tag size="small" v-show="flag">{{ cusMangers[cusMIndex - 1].text }}家</el-tag>
            <el-tag v-for="del in delCustomers5" :key="del" type="info" size="large"
              :color="colorForTag[del.Visit[0].拜访建议]" closable @close="handleClose(del)"> {{ del.Visit[0].客户简称 }}
            </el-tag><el-tag size="large" v-if="delCustomers5.length > 0">公司</el-tag></el-tab-pane>
        </el-tabs>
        <el-button type="warning" @click="clearCurList(weekday)" style="z-index: 100;">重置当天客户</el-button>
        <!-- <el-button type="warning" @click="getRoad(weekday)" style="z-index: 100;">发送数据</el-button> -->
        <el-button type="warning" @click="postRoad(weekday)" style="z-index: 100;">线路优化</el-button>
      </el-col>
      <!-- 右上：客户列表展示 -->
      <el-col :span="12" class="col-right-top" style="z-index: 1;">
        <div style="height: auto; text-align: center;font-size: larger;      ">客户列表</div>
        <!-- <el-select v-model="value" style="margin-left: 5px;" effect="dark" filterable placeholder="客户经理"
          @change="oncusMChange(value)">
          <el-option v-for="cusM in cusMangers" :key="cusM.value" :label="cusM.text" :value="cusM.value" />
        </el-select> -->
        <el-divider style="margin-bottom:15px;">
          <el-icon><star-filled /></el-icon>
        </el-divider>
        <el-scrollbar height="75vh" always:true min-size:100>
          <!-- <div style="display:inline-block;">
            <el-popover v-for="cus, index in customers" :hide-after="0" :key="index" placement="right" :width="400">
              <template #reference>
                <el-tag class="mx-1" :key="cus" type="info" size="large" :color="colorForTag[cus.Visit[0].拜访建议]" @click="{
                  handleClick(cus);
                }">
                  {{ cus.Visit[0].客户简称 }}
                </el-tag>
              </template>
              <el-table :data="cus.Task">
                <el-table-column width="150" prop="任务内容" label="任务内容"> </el-table-column>
                <el-table-column width="100" prop="任务剩余完成时间_工作日" label="剩余完成时间(天)" />
                <el-table-column width="300" prop="预估时间_分钟" label="预估时长(分钟)" />
              </el-table>
            </el-popover>
          </div> -->
          <!-- <el-tag v-for="cus,index in customers" :key="index"   @click="colorForTag[cus.Visit[0].拜访建议]=='red'?handleClick(cus):0"
                  
                 :color="colorForTag[cus.Visit[0].拜访建议]" >{{ cus.Visit[0].客户简称 }}</el-tag> -->
          <el-tag v-for="cus, index in customers" :key="index" @click="flag ? handleFalseClick(cus) : handleClick(cus)"
            :color="colorForTag[cus.Visit[0].拜访建议]">{{ cus.Visit[0].客户简称 }}</el-tag>
        </el-scrollbar>
      </el-col>
    </el-row>
    <!-- 下半区 -->
    <el-row class='row-bottom'>
      <!-- 左下：列表展示部分    -->
      <el-col :span="12" class="col-right-bottom">
        <el-scrollbar height="42.5vh">
          <KeepAlive>
            <el-table :data="tableData" style="width: 100%;" :default-sort='{ prop: "day_index", order: "ascending" }'
              empty-text="没有客户被排入行程" stripe>
              <el-table-column type="expand">
                <template #default="props">
                  <div m="4" class="inTable">
                    <div class="p-info-father" style="display: flex;">
                      <div class="p-info" style="width:50%">
                        <p style="font-weight:bold;"> {{ props.row.modern }}</p>
                        <p><el-icon>
                            <Avatar />
                          </el-icon> 客户代码: {{ props.row.id }}</p>
                        <p><el-icon>
                            <InfoFilled />
                          </el-icon> 经营业态: {{ props.row.type }}</p>
                        <p><el-icon>
                            <Sunny />
                          </el-icon>开门时间: {{ props.row.open }}</p>
                      </div>
                      <div style="width: 50%;">
                        <p style="font-weight:bold;">最晚拜访时间: {{ props.row.latest_time || (props.row.visit_time + '已拜访') }}
                        </p>
                        <p><el-icon>
                            <Position />
                          </el-icon>经营路段:{{ props.row.road }} </p>
                        <p><el-icon>
                            <Printer />
                          </el-icon> POS机类型: {{ props.row.pos }}</p>
                        <p><el-icon>
                            <MoonNight />
                          </el-icon>关门时间: {{ props.row.close }}</p>
                      </div>
                    </div>
                    <h3 style="color: #418525;">任务<el-icon>
                        <Star />
                      </el-icon></h3>
                    <el-table :data="props.row.task" :ref="multipleTableRef" :row-key="(row) => row.id"
                      :reserve-selection="true" @selection-change="handleSelectionChange">
                      <!-- <el-table-column type="selection" width="55" /> -->
                      <!-- <el-table-column label="任务编号" prop="id" /> -->
                      <el-table-column label="任务内容" prop="任务内容" />
                      <el-table-column label="预估时长(分钟)" prop="预估时间_分钟" />
                      <el-table-column label="剩余完成时间(工作日)" prop="任务剩余完成时间_工作日" />
                    </el-table>
                  </div>

                </template>

              </el-table-column>
              <el-table-column label="周期" prop="date" />
              <el-table-column label="客户名称" prop="name" />
              <el-table-column label="组别" prop="day_index" />
              <el-table-column label="时间" prop="time" />
            </el-table>
          </KeepAlive>
        </el-scrollbar>
      </el-col>
      <el-col :span="12" class="col-left-bottom" style="height: 0; z-index: -1">
      </el-col>
    </el-row>
  </el-main>
</template>
      





<script setup lang="ts">
// 导入部分
import { StarFilled, Location, Calendar, Star, User, Avatar, InfoFilled, Sunny, MoonNight, Printer, Position } from '@element-plus/icons-vue'
import { onBeforeMount, onMounted, ref } from 'vue';
import axios from "axios";
import initMap from '../views/Map.vue';
import { shallowRef } from 'vue';
import { indexOf, lowerFirst } from 'lodash';
import homeIcon from '@/assets/bg.jpg'
import type { ElTable } from 'element-plus';
import { stringLiteral } from '@babel/types';


interface TD {
  date: string,
  name: string,
  id: string,
  type: string,
  address?: string,
  last_date?: string,
  task?: object[],
  day_index: string
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<TD[]>([])
const toggleSelection = (rows?: TD[]) => {
  if (rows) {
    rows.forEach((row) => {
      // TODO: improvement typing when refactor table
      // esli-nt-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      multipleTableRef.value!.toggleRowSelection(row, undefined)
    })
  } else {
    multipleTableRef.value!.clearSelection()
  }
}
const handleSelectionChange = (val: TD[]) => {
  // multipleSelection.value = val

}


//变量定义部分
let flag: boolean = false
let customers = ref([])//客户列表
let delCustomers1 = ref([])//删除客户列表，即排入周一行程的客户列表
let delCustomers2 = ref([])
let delCustomers3 = ref([])
let delCustomers4 = ref([])
let delCustomers5 = ref([])
let delCustomers: Object = {
  "周一": delCustomers1,
  "周二": delCustomers2,
  "周三": delCustomers3,
  "周四": delCustomers4,
  "周五": delCustomers5
}
let path1 = ref([]);
let path2 = ref([]);
let path3 = ref([]);
let path4 = ref([]);
let path5 = ref([]);
let paths = [path1, path2, path3, path4, path5]
function clearPaths(paths) {
  for (let index = 0; index < paths.length; index++) {
    paths[index].value = [];
  }
}

let weekday = "周一"
const value = ref('')//客户经理value
const colorForTag: Object = {
  "一周内拜访": "red",
  "两周内拜访": "orange",
  "可一月内拜访": "yellow",
  "本周期已拜访": "lightblue"
}//定义对象，给标签打颜色
//方法定义部分
//处理原始客户
function getHandle() {
  axios.get("http://122.9.67.194:8000/api/customer/info/",
    { params: {}, headers: {} })
    .then((res) => { customers.value = res.data; }


    );
}
//处理线路重新规划逻辑
function resetRoad(array, newarray) {
  let temroad = ref([])
  for (let index = 0; index < newarray.value.length; index++) {
    const element1 = newarray.value[index];
    for (let i = 0; i < array.value.length; i++) {
      const element2 = array.value[i];
      if (element1 == element2.Visit[0].客户代码_id) {
        temroad.value.push(element2)
      }
    }

  }
  return temroad

}
function resetTable(array, newarray) {
  let temroad = ref([])
  for (let index = 0; index < newarray.value.length; index++) {
    const element1 = newarray.value[index];
    for (let i = 0; i < array.value.length; i++) {
      const element2 = array.value[i];
      if (element1 == element2.id) {
        temroad.value.push(element2)
      }
    }

  }
  return temroad

}

//处理最终路线的渲染
function postRoad(e) {
  let cusList11 = ref([])
  cusList11 = getCurrentDelCusList(e)
  let idPost = ref([])
  for (let index = 0; index < cusList11.value.length; index++) {
    idPost.value.push(cusList11.value[index].Visit[0].客户代码_id);
  }
  axios.post("http://122.9.67.194:8000/api/customer/info/getRoad/",
    { text: idPost.value }, {})
    .then((res) => {
      let newRoad = ref([])

      newRoad.value = res.data
      console.log(newRoad.value[0]);
      console.log(resetRoad(getCurrentDelCusList(e), newRoad));

      getCurrentDelCusList(e).value = resetRoad(getCurrentDelCusList(e), newRoad).value
      tableData.value = resetTable(tableData, newRoad).value

      // console.log(delCustomers1);


    }
    );
}
//处理请求客户(base客户经理)
function postHandle(e: string) {
  clearDelCusList()
  axios.post("http://122.9.67.194:8000/api/customer/info/cusForMan/",
    { text: e }, {})
    .then((res) => { customers.value = res.data; }
    );
}
let cusMIndex: number = 1
//处理客户经理选择--定义数据
const cusMangers = [
  { value: 1, text: "闻毅", Lng: 121.529512, Lat: 31.32098 },
  { value: 2, text: "王毅", Lng: 121.521791, Lat: 31.279471 },
  { value: 3, text: "邹宸", Lng: 121.538858, Lat: 31.296965 },
  { value: 4, text: "刘昌敏", Lng: 121.525144, Lat: 31.29509 },
  { value: 5, text: "王宏燕", Lng: 121.519169, Lat: 31.282271 },
  { value: 6, text: "潘琦", Lng: 121.530509, Lat: 31.293561 },
  { value: 7, text: "沈磊", Lng: 121.536999, Lat: 31.324108 },
  { value: 8, text: "于丽琴", Lng: 121.54199, Lat: 31.287674 },
  { value: 9, text: "刘嘉", Lng: 121.519169, Lat: 31.282271 },
  { value: 10, text: "何玉萍", Lng: 121.51352, Lat: 31.306419 },
  { value: 11, text: "沈秀月", Lng: 121.532549, Lat: 31.281506 },
]
const company = {
  Lng: 121.525144, Lat: 31.29509
}
//处理客户经理选择--处理方法
function oncusMChange(e: number) {
  const cusMName = cusMangers[e - 1].text
  delCustomers1.value = []
  tableData.value = []
  cusMIndex = e
  flag = true
  postHandle(cusMName)
  clearPaths(paths)
  path1.value.push(new AMap.LngLat(cusMangers[e - 1].Lng, cusMangers[e - 1].Lat))
  path2.value.push(new AMap.LngLat(cusMangers[e - 1].Lng, cusMangers[e - 1].Lat))
  path3.value.push(new AMap.LngLat(cusMangers[e - 1].Lng, cusMangers[e - 1].Lat))
  path4.value.push(new AMap.LngLat(cusMangers[e - 1].Lng, cusMangers[e - 1].Lat))
  path5.value.push(new AMap.LngLat(cusMangers[e - 1].Lng, cusMangers[e - 1].Lat))
}


//处理地图原始渲染，此处必须加key  
//生命周期函数
onBeforeMount(() => {
  // console.log("BEF"+customers)
  // getHandle()
  // console.log("BEF4")
  // initMap()
})
onMounted(() => {
  getRoad(weekday)
  // console
  // getHandle()
  postHandle("闻毅")

})


function getCurrentDelCusList(weekday: string) {
  return delCustomers[weekday]
}

function clearCurList(weekday: string) {
  let temLi = ref([])
  temLi.value = delCustomers[weekday].value
  for (let index = 0; index < temLi.value.length; index++) {
    const element = temLi.value[index]
    customers.value.unshift(element)
    // getCurrentDelCusList(weekday).value.splice(getCurrentDelCusList(weekday).value.indexOf(element), 1)


  }
  flag = false
  delCustomers[weekday].value = []
  clearTableData(tableData, weekday)
}
function clearTableData(tableData: array, weekday: string) {
  const tindex: array = []
  for (let index = 0; index < tableData.value.length; index++) {
    const element = tableData.value[index];
    if (element.date == weekday) {
      tindex.push(index)
    }


  }
  console.log(tindex);
  tableData.value.splice(tindex[0], tindex.length)
}
function clearDelCusList() {
  delCustomers1.value = []
  delCustomers2.value = []
  delCustomers3.value = []
  delCustomers4.value = []
  delCustomers5.value = []
}
//定义处理标签（即客户选择）的方法
const handleClick = (cus: string) => {

  if (colorForTag[cus.Visit[0].拜访建议] == 'red') {
    getCurrentDelCusList(weekday).value.push(cus)
    customers.value.splice(customers.value.indexOf(cus), 1)
    insertTableData(getTableData(cus))
    // console.log({ cus }.cus.Task[0]);
    // console.log(customers.value[1]);
    // console.log(delCustomers[weekday]);
    // console.log(customers.value.map(item => (item)));
    // console.log(sss.value)
    // console.log(delCustomers1.value[0].Visit[0].客户代码_id);
  }
  stateFlag(customers.value)
  console.log(delCustomers1.value.length);

  // getTime(cus, getCurrentDelCusList(weekday))


  // updateMap()

}
const handleFalseClick = (cus: string) => {

  if (colorForTag[cus.Visit[0].拜访建议] != 'red') {
    getCurrentDelCusList(weekday).value.push(cus)
    customers.value.splice(customers.value.indexOf(cus), 1)
    insertTableData(getTableData(cus))
    // console.log({ cus }.cus.Task[0]);
    // console.log(customers.value[1]);
    // console.log(delCustomers[weekday]);
    // console.log(customers.value.map(item => (item)));
    // console.log(sss.value)
    // console.log(delCustomers1.value[0].Visit[0].客户代码_id);

  }


  // getTime(cus, getCurrentDelCusList(weekday))


  // updateMap()

}


//定义巡视flag的函数
function stateFlag(cus: array) {
  let state = cus.every(function (item, index, array) {
    return (colorForTag[item.Visit[0].拜访建议] != 'red');
  })
  flag = state
  console.log(state);

  // let res:number=0
  // for (let index=0;index<cus.value.length;index++){
  //   if (colorForTag[cus.Visit[0].拜访建议]=='red'){
  //      res+=1
  //   }
  // }
  // if (res<1){
  //   flag=false
  // }
}



//定义处理标签（即客户退回）的方法
const handleClose = (del: string) => {
  deleteTableData(getTableData(del))
  customers.value.unshift(del)
  getCurrentDelCusList(weekday).value.splice(getCurrentDelCusList(weekday).value.indexOf(del), 1)
  // console.log(tableData)
  // updateMap()
}




//定义右下角拜访列表的数据
const weekdays = ["周一", "周二", "周三", "周四", "周五"]
let tableDataObj: {
  date: string,
  name: string,
  id: string,
  type: string,
  address?: string,
  last_date?: string,
  task?: object[],
  day_index: string,
  time?: number,
  visit_time_cost?: number
}
//indexOf(weekdays,weekday)排序依据
function getTableData(cus) {
  tableDataObj = {
    name: cus.Visit[0].客户简称, modern: cus.Visit[0].是否现代终端, id: cus.Visit[0].客户代码_id,
    type: cus.Visit[0].经营业态, road: cus.Visit[0].送货路段, latest_time: cus.Visit[0].最晚线路规划时间, visit_time_cost: cus.Visit[0].拜访时长预估,
    open: cus.Visit[0].开门时间, close: cus.Visit[0].关门时间, visit_time: cus.Visit[0].拜访日期, pos: cus.Visit[0].pos机类型,
    date: weekday, task: cus.Task, day_index: ((indexOf(weekdays, weekday) as unknown as string) + (indexOf(getCurrentDelCusList(weekday), cus) + 2 as unknown as string)),

  }
  return (tableDataObj)
}

function getTime(tableData, weekday) {
  // if (delCustomers1.value.length == 1) {
  //   console.log("<" + delCustomers1.value[0].Visit[0].客户代码_id + "," + "公司>");
  //   const ti = sss.value.filter(item => item.OD === ("<" + delCustomers1.value[0].Visit[0].客户代码_id + "," + "公司>"))
  //   console.log(ti[0].time);
  //   return ti[0].times
  // }else{  
  //   for (let index = 0; index < array.value.length; index++) {


  // } }
  const s = getCurrentDelCusList(weekday)

  // console.log(index_t)
  // console.log(s[0].Visit[0].客户代码_id);
  for (let index = 0; index < tableData.value.length; index++) {
    const element = tableData.value[index];
  }
  const ti = sss.value.filter(item => item.OD === ("<" + s.value[index_t].Visit[0].客户代码_id + "," + s.value[index_t + 11].Visit[0].客户代码_id + ">"))

  console.log(ti);

  // return ti[0].time

}


function insertTableData(tableDataObj) {
  tableData.value.push(tableDataObj)
}

const tableData = ref([])


function deleteTableData(tableDataObj) {
  for (let i = 0; i < tableData.value.length; i++) {
    const element = tableData.value[i];
    if (element.name == tableDataObj.name) {
      tableData.value.splice(i, 1)
    }
  }
}


let sss = ref([])

function getRoad(Q) {

  axios.post("http://122.9.67.194:8000/api/customer/info/road/",
    {
      text: customers.value

    }, {})
    .then((res) => {
      sss.value = res.data
      console.log(sss.value[0].OD)
    }
    );
}





</script>
      
      