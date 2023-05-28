<template>
  <el-main>
    <!-- 上半区 -->
    <el-row class='row-top'>
      <!-- 左上：排线路部分 -->
      <!-- <el-tabs type="border-card" stretch="false">
  <el-tab-pane label="标签1">标签1的内容</el-tab-pane>
  <el-tab-pane label="标签2">标签2的内容</el-tab-pane>
  <el-tab-pane label="标签3">标签3的内容</el-tab-pane>
</el-tabs> -->
      <el-col :span="12" class="col-left-top">


<div class="tabs-container">
    <el-tabs tab-position="top" v-model="weekday" style="height: 30vh; font: bold;" type="card"
             @tab-change="getCurrentDelCusList" stretch>
      <el-scrollbar height="30vh">
        <el-tab-pane label="周一" name="周一"></el-tab-pane>
        <el-tab-pane label="周二" name="周二"></el-tab-pane>
        <el-tab-pane label="周三" name="周三"></el-tab-pane>
        <el-tab-pane label="周四" name="周四"></el-tab-pane>
        <el-tab-pane label="周五" name="周五"></el-tab-pane>
        <div class="wlcontainer">
    <div class="wlbox" >
                    <el-tag v-for="del in delCustomers1" :key="del" type="info"
                    :color="colorForTag[del.Visit[0].拜访建议]"
                    :closable="colorForTag[del.Visit[0].拜访建议] == 'red' ? false : true"
                    @mouseover="showTagPreview(del)"
                    @mouseleave="hideTagPreview()"
                    @close="handleClose(del)">
                     {{ del.Visit[0].客户简称 }}            
                     
                     
                      <div class="tag-preview" v-if="showPreview" :style="{ top: previewTop, left: previewLeft }">
              <!-- <div class="tag-preview" v-if="previewVisible">{{ previewContent }} -->
    <!-- 显示预览信息的内容 --><el-icon><BellFilled /></el-icon>
                        <div class="tag-pre-left"><el-icon size="large"  color="blue"><Bell/></el-icon>
                        <el-badge  :value="previewContent.拜访建议=='本周期已拜访'?'...':previewContent.最晚线路规划时间_工作日_field" :style="{color:colorForTag[previewContent.拜访建议]}"> <h2 text="2xl" justify="center">  {{ previewContent.客户简称 }}</h2>  </el-badge>
                        <h5>{{ previewContent.客户代码_id}}</h5>
                        <el>
                          <h3><li><el-icon  v-if="previewContent.是否现代终端=='是现代终端'"><Star /></el-icon>{{ previewContent.是否现代终端}}</li></h3>
                          <h3><li>{{ previewContent.送货路段}}</li></h3>
                          <h3><li>{{ previewContent.经营业态}}</li></h3>
                        </el>
                      
                      </div>

                        <div class="tag-pre-right">
                        <h2 text="2xl" justify="center" style="text-align:center ;align-items: center;"> 任务列表</h2>  
                        <el-table :data="previewTaskContent">
                          <el-table-column prop="任务内容" label="任务内容" width="180" />
                          <el-table-column prop="任务剩余完成时间_工作日" label="剩余天数" width="180" />
                          <el-table-column prop="预估时间_分钟" label="预估时长" />
                        </el-table>
                      
                      
                      </div>
  </div>
            </el-tag>
          </div>
    <div class="wlbox"> <el-tag v-for="del in delCustomers2" :key="del" type="info"
                    :color="colorForTag[del.Visit[0].拜访建议]"
                    :closable="colorForTag[del.Visit[0].拜访建议] == 'red' ? false : true"
                    @close="handleClose(del)">
              {{ del.Visit[0].客户简称 }}
            </el-tag></div>
    <div class="wlbox"><el-tag v-for="del in delCustomers3" :key="del" type="info"
                    :color="colorForTag[del.Visit[0].拜访建议]"
                    :closable="colorForTag[del.Visit[0].拜访建议] == 'red' ? false : true"
                    @close="handleClose(del)">
              {{ del.Visit[0].客户简称 }}
            </el-tag></div>
    <div class="wlbox"><el-tag v-for="del in delCustomers4" :key="del" type="info"
                    :color="colorForTag[del.Visit[0].拜访建议]"
                    :closable="colorForTag[del.Visit[0].拜访建议] == 'red' ? false : true"
                    @close="handleClose(del)">
              {{ del.Visit[0].客户简称 }}
            </el-tag></div>
    <div class="wlbox"><el-tag v-for="del in delCustomers5" :key="del" type="info"
                    :color="colorForTag[del.Visit[0].拜访建议]"
                    :closable="colorForTag[del.Visit[0].拜访建议] == 'red' ? false : true"
                    @close="handleClose(del)">
              {{ del.Visit[0].客户简称 }}
            </el-tag></div>
</div>
          <!-- <el-tab-pane label="周一" name="周一"> 
          <div class="tab-content">
            <el-tag v-for="del in delCustomers1" :key="del" type="info"
                    :color="colorForTag[del.Visit[0].拜访建议]"
                    :closable="colorForTag[del.Visit[0].拜访建议] == 'red' ? false : true"
                    @close="handleClose(del)">
              {{ del.Visit[0].客户简称 }}
            </el-tag>
          </div>
        </el-tab-pane>
        <el-tab-pane label="周二" name="周二">
          <div class="tab-content">
            <el-tag v-for="del in delCustomers2" :key="del" type="info"
                    :color="colorForTag[del.Visit[0].拜访建议]"
                    :closable="colorForTag[del.Visit[0].拜访建议] == 'red' ? false : true"
                    @close="handleClose(del)">
              {{ del.Visit[0].客户简称 }}
            </el-tag>
          </div>
        </el-tab-pane>
        <el-tab-pane label="周三" name="周三">
          <div class="tab-content">
            <el-tag v-for="del in delCustomers3" :key="del" type="info"
                    :color="colorForTag[del.Visit[0].拜访建议]"
                    :closable="colorForTag[del.Visit[0].拜访建议] == 'red' ? false : true"
                    @close="handleClose(del)">
              {{ del.Visit[0].客户简称 }}
            </el-tag>
          </div>
        </el-tab-pane>
        <el-tab-pane label="周四" name="周四">
          <div class="tab-content">
            <el-tag v-for="del in delCustomers4" :key="del" type="info"
                    :color="colorForTag[del.Visit[0].拜访建议]"
                    :closable="colorForTag[del.Visit[0].拜访建议] == 'red' ? false : true"
                    @close="handleClose(del)">
              {{ del.Visit[0].客户简称 }}
            </el-tag>
          </div>
        </el-tab-pane>
        <el-tab-pane label="周五" name="周五">
          <div class="tab-content">
            <el-tag v-for="del in delCustomers5" :key="del" type="info"
                    :color="colorForTag[del.Visit[0].拜访建议]"
                    :closable="colorForTag[del.Visit[0].拜访建议] == 'red' ? false : true"
                    @close="handleClose(del)">
              {{ del.Visit[0].客户简称 }}
            </el-tag>
          </div>
        </el-tab-pane>  -->



      </el-scrollbar>
    </el-tabs>
</div>























        <!-- <el-tabs tab-position="top" v-model="weekday" style="height: 30vh; font: bold;" type="card"
          @tab-change="getCurrentDelCusList" stretch>
          <el-scrollbar height="30vh">
            <el-tab-pane label="周一" name="周一"> -->
              <!-- <el-tag v-show="homeflag">{{ cusMangers[cusMIndex - 1].text }}家</el-tag> -->
              <!-- <el-tag v-for="del in delCustomers1" :key="del" type="info" :color="colorForTag[del.Visit[0].拜访建议]"
                :closable="colorForTag[del.Visit[0].拜访建议] == 'red' ? false : true" @close="handleClose(del)">
                {{ del.Visit[0].客户简称 }}
              </el-tag> -->
              <!-- <el-tag v-if="delCustomers1.length > 0">公司</el-tag> -->
            <!-- </el-tab-pane>
            <el-tab-pane label="周二" name="周二">
              <el-tag v-for="del in delCustomers2" :key="del" type="info" :color="colorForTag[del.Visit[0].拜访建议]"
                :closable="colorForTag[del.Visit[0].拜访建议] == 'red' ? false : true" @close="handleClose(del)"> {{
                  del.Visit[0].客户简称 }}
              </el-tag>
            </el-tab-pane>
            <el-tab-pane label="周三" name="周三">
              <el-tag v-for="del in delCustomers3" :key="del" type="info" :color="colorForTag[del.Visit[0].拜访建议]"
                :closable="colorForTag[del.Visit[0].拜访建议] == 'red' ? false : true" @close="handleClose(del)"> {{
                  del.Visit[0].客户简称 }}
              </el-tag>
            </el-tab-pane>
            <el-tab-pane label="周四" name="周四">
              <el-tag v-for="del in delCustomers4" :key="del" type="info" :color="colorForTag[del.Visit[0].拜访建议]"
                :closable="colorForTag[del.Visit[0].拜访建议] == 'red' ? false : true" @close="handleClose(del)"> {{
                  del.Visit[0].客户简称 }}
              </el-tag>
            </el-tab-pane>
            <el-tab-pane label="周五" name="周五">
              <el-tag v-for="del in delCustomers5" :key="del" type="info" :color="colorForTag[del.Visit[0].拜访建议]"
                :closable="colorForTag[del.Visit[0].拜访建议] == 'red' ? false : true" @close="handleClose(del)"> {{
                  del.Visit[0].客户简称 }}
              </el-tag>
            </el-tab-pane>
          </el-scrollbar>
        </el-tabs> -->
      </el-col>
      <!-- 右上：客户列表展示 -->
      <el-col :span="12" class="col-right-top" style="z-index: 1;">
        <div style="height: auto; text-align: center; font-size: larger;">客户列表</div>
        <el-divider style="margin-bottom:15px;">
          <el-icon><star-filled /></el-icon>
        </el-divider>
        <el-scrollbar height="75vh" always:true min-size:100>
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
          <el-button type="warning" @click="clearCurList(weekday)" style="z-index: 100;">重置当天客户</el-button>
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
                    <el-table :data="props.row.task" :row-key="(row) => row.id" :reserve-selection="true">
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
    </el-row>
  </el-main>
</template>
<script setup lang="ts">
// 导入部分
import { StarFilled, Star, Avatar, InfoFilled, Sunny, MoonNight, Printer, Position,Bell } from '@element-plus/icons-vue'
import { onBeforeMount, onMounted, ref } from 'vue';
import axios from "axios";
import { indexOf } from 'lodash';
import type { ElTable } from 'element-plus';
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
interface Visit {
  [key: string]: any;
}
interface Cus {
  // Visit: { 拜访建议: string, 客户简称: string, }[],
  Visit: Visit[],
  Task: object[]
}
//变量定义部分
let flag: boolean = false
// let homeflag: boolean = false
const customers = ref<Cus[]>([])//客户列表
let delCustomers1 = ref<Cus[]>([])///删除客户列表，即排入周一行程的客户列表
let delCustomers2 = ref<Cus[]>([])
let delCustomers3 = ref<Cus[]>([])
let delCustomers4 = ref<Cus[]>([])
let delCustomers5 = ref<Cus[]>([])
let delCustomers: DelCustomers = {
  "周一": delCustomers1,
  "周二": delCustomers2,
  "周三": delCustomers3,
  "周四": delCustomers4,
  "周五": delCustomers5
}
// let path1 = ref([]);
// let path2 = ref([]);
// let path3 = ref([]);
// let path4 = ref([]);
// let path5 = ref([]);
// let paths = [path1, path2, path3, path4, path5]
// function clearPaths(paths) {
//   for (let index = 0; index < paths.length; index++) {
//     paths[index].value = [];
//   }
// }

// const previewVisible = ref(false);
const showPreview = ref(false);
const previewContent = ref('');
const previewTop = ref('');
const previewLeft = ref('');
const previewTaskContent=ref('')
const showTagPreview = (del: any) => {
  showPreview.value = true;
  previewContent.value = del.Visit[0];
  previewTaskContent.value=del.Task;
  previewTop.value = 'calc(60vh - 10px)';
  previewLeft.value = 'calc(60vw - 10px)';
};

const hideTagPreview = () => {
  showPreview.value = false;
  previewTaskContent.value='';
  previewContent.value = '';
  previewTop.value = '';
  previewLeft.value = '';
};
// function showPreview(tag) {
//     previewTop.value = 'calc(50vh - 10px)';
//   previewLeft.value = 'calc(50vw - 10px)';
//   previewVisible.value = true;
//   previewContent.value = tag.preview;
// }

// function hidePreview() {
//   previewVisible.value = false;
// }









let weekday = "周一"
interface ColorMap {
  [key: string]: string;
}
const colorForTag: ColorMap = {
  "一周内拜访": "red",
  "两周内拜访": "orange",
  "可一月内拜访": "yellow",
  "本周期已拜访": "lightblue"
}//定义对象，给标签打颜色
//方法定义部分
//处理原始客户
// function getHandle() {
//   axios.get("http://122.9.67.194:8000/api/customer/info/",
//     { params: {}, headers: {} })
//     .then((res) => { customers.value = res.data; }
//     );
// }
//处理线路重新规划逻辑
// function resetRoad(array, newarray) {
//   let temroad = ref([])
//   for (let index = 0; index < newarray.value.length; index++) {
//     const element1 = newarray.value[index];
//     for (let i = 0; i < array.value.length; i++) {
//       const element2 = array.value[i];
//       if (element1 == element2.Visit[0].客户代码_id) {
//         temroad.value.push(element2)
//       }
//     }
//   }
//   return temroad
// }
// function resetTable(array, newarray) {
//   let temroad = ref([])
//   for (let index = 0; index < newarray.value.length; index++) {
//     const element1 = newarray.value[index];
//     for (let i = 0; i < array.value.length; i++) {
//       const element2 = array.value[i];
//       if (element1 == element2.id) {
//         temroad.value.push(element2)
//       }
//     }
//   }
//   return temroad
// }
//处理最终路线的渲染
// function postRoad(e) {
//   let cusList11 = ref([])
//   cusList11 = getCurrentDelCusList(e)
//   let idPost = ref([])
//   for (let index = 0; index < cusList11.value.length; index++) {
//     idPost.value.push(cusList11.value[index].Visit[0].客户代码_id);
//   }
//   axios.post("http://122.9.67.194:8000/api/customer/info/getRoad/",
//     { text: idPost.value }, {})
//     .then((res) => {
//       let newRoad = ref([])
//       newRoad.value = res.data
//       console.log(newRoad.value[0]);
//       console.log(resetRoad(getCurrentDelCusList(e), newRoad));
//       getCurrentDelCusList(e).value = resetRoad(getCurrentDelCusList(e), newRoad).value
//       tableData.value = resetTable(tableData, newRoad).value
//     }
//     );
// }
//处理请求客户(base客户经理)
function postHandle(e: string) {
  clearDelCusList()
  axios.post("http://122.9.67.194:8000/api/customer/info/cusForManTest/",
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
// const company:object = {
//   Lng: 121.525144, Lat: 31.29509
// }
//处理客户经理选择--处理方法
// function oncusMChange(e: number) {
//   const cusMName = cusMangers[e - 1].text
//   delCustomers1.value = []
//   tableData.value = []
//   cusMIndex = e
//   flag = true
//   postHandle(cusMName)
//   clearPaths(paths)
//   path1.value.push(new AMap.LngLat(cusMangers[e - 1].Lng, cusMangers[e - 1].Lat))
//   path2.value.push(new AMap.LngLat(cusMangers[e - 1].Lng, cusMangers[e - 1].Lat))
//   path3.value.push(new AMap.LngLat(cusMangers[e - 1].Lng, cusMangers[e - 1].Lat))
//   path4.value.push(new AMap.LngLat(cusMangers[e - 1].Lng, cusMangers[e - 1].Lat))
//   path5.value.push(new AMap.LngLat(cusMangers[e - 1].Lng, cusMangers[e - 1].Lat))
// }

//处理地图原始渲染，此处必须加key  
//生命周期函数
onBeforeMount(() => {
  // console.log("BEF"+customers)
  // getHandle()
  // console.log("BEF4")
  // initMap()
})
onMounted(() => {
  // getRoad(weekday)
  postHandle("闻毅")
})

interface DelCustomers {
  [key: string]: any // any[] 可以替换成您的特定类型
}

function getCurrentDelCusList(weekday: string) {
  return delCustomers[weekday]
}

function clearCurList(weekday: string) {
  let tempLi =[...delCustomers[weekday].value]

  for (let i = tempLi.length - 1; i >= 0; i--) {
    const element = tempLi[i]
    if (colorForTag[element.Visit[0].拜访建议] !== 'red') {
      customers.value.unshift(element)
      delCustomers[weekday].value.splice(i, 1)
      deleteTableData(getTableData(element))
    }
  }
  
  // delCustomers[weekday].value = []
  
  // clearTableData(tableData, weekday)
}
function clearTableData(tableData: TableData[], weekday: string) {
  const tindex: array = []
  for (let index = 0; index < tableData.value.length; index++) {
    const element = tableData.value[index];
    if (element.date == weekday) {
      tindex.push(index)
    }
  }
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
const handleClick = (cus: Cus) => {
  // homeflag = true
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
  // console.log(delCustomers1.value.length);
  // getTime(cus, getCurrentDelCusList(weekday))
  // updateMap()
}
const handleFalseClick = (cus: Cus) => {
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
function stateFlag(cus: any) {
  let state = cus.every(function (item: any) {
    return (colorForTag[item.Visit[0].拜访建议] != 'red');
  })
  flag = state
  // console.log(state);
}

//定义处理标签（即客户退回）的方法
const handleClose = (del: Cus) => {
  deleteTableData(getTableData(del))
  let i_index:number=ref()
  for (let i = 0; i < customers.value.length; i++) {
    const element: TableData = customers.value[i];
    if (colorForTag[element.Visit[0].拜访建议]==colorForTag[del.Visit[0].拜访建议])
       {i_index=i; break
      } 
     
    // customers.value.unshift(del)
  }
  console.log(i_index)
  customers.value.splice(i_index,0,del)
  getCurrentDelCusList(weekday).value.splice(getCurrentDelCusList(weekday).value.indexOf(del), 1)
  // console.log(tableData)
  // updateMap()
}
//定义右下角拜访列表的数据
const weekdays = ["周一", "周二", "周三", "周四", "周五"]
let tableDataObj: {
  date: string, name: string, id: string, modern: string, road: string, latest_time: string,
  open: string, close: string, visit_time: string, pos: string, type: string, address?: string,
  last_date?: string, task?: object[], day_index: string, time?: number, visit_time_cost?: number
}

interface TableData {
  date: string; name: string; id: string; modern: string; road: string; latest_time: string;
  open: string; close: string; visit_time: string; pos: string; type: string; address?: string;
  last_date?: string; task?: object[]; day_index: string; time?: number; visit_time_cost?: number;
}
//indexOf(weekdays,weekday)排序依据
function getTableData(cus: Cus) {
  tableDataObj = {
    name: cus.Visit[0].客户简称, modern: cus.Visit[0].是否现代终端, id: cus.Visit[0].客户代码_id,
    type: cus.Visit[0].经营业态, road: cus.Visit[0].送货路段, latest_time: cus.Visit[0].最晚线路规划时间, visit_time_cost: cus.Visit[0].拜访时长预估,
    open: cus.Visit[0].开门时间, close: cus.Visit[0].关门时间, visit_time: cus.Visit[0].拜访日期, pos: cus.Visit[0].pos机类型,
    date: weekday, task: cus.Task, day_index: ((indexOf(weekdays, weekday) as unknown as string) + (indexOf(getCurrentDelCusList(weekday), cus) + 2 as unknown as string)),

  }
  return (tableDataObj)
}

// function getTime(tableData, weekday) {
//   const s = getCurrentDelCusList(weekday)
//   for (let index = 0; index < tableData.value.length; index++) {
//     const element = tableData.value[index];
//   }
//   const ti = sss.value.filter(item => item.OD === ("<" + s.value[index_t].Visit[0].客户代码_id + "," + s.value[index_t + 11].Visit[0].客户代码_id + ">"))
//   console.log(ti);
// }

function insertTableData(tableDataObj: TableData) {
  tableData.value.push(tableDataObj)
}

const tableData = ref([])

function deleteTableData(tableDataObj: TableData) {
  for (let i = 0; i < tableData.value.length; i++) {
    const element: TableData = tableData.value[i];
    if (element.name == tableDataObj.name) {
      tableData.value.splice(i, 1)
    }
  }
}
// let sss = ref([])
// function getRoad(Q) {
//   axios.post("http://122.9.67.194:8000/api/customer/info/road/",
//     {
//       text: customers.value

//     }, {})
//     .then((res) => {
//       sss.value = res.data
//       console.log(sss.value[0].OD)
//     }
//     );
// }
</script>
      
<style>
.wl-tab {
  display: flex;
}

.wl-box {
  position: relative;
  flex:1;
  height: 30vh;
  width: 9vw;
  border: 1px solid #000;
  justify-items: stretch;


}
.tag-preview {
  display: flex;
  position: fixed;
  bottom: 10vh;
  right: 5vw;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(50px);
  color: #333;
  font-size: 14px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 15px;
}
.tag-pre-left {
  flex: 3;
  /* 根据需求设置样式 */
}

.tag-pre-right {
  flex: 7;
  /* 根据需求设置样式 */
}
.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}
</style>      