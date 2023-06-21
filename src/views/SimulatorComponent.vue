<template>
  <el-main>
    <!-- 上半区 -->
    <el-row class='row-top'>
      <el-col :span="12" class="col-left-top">
        <div class="tabs-container">
          <el-tabs tab-position="top" v-model="weekday" style="height: 30vh; font: bold;" type="card"
            @tab-change="[getCurrentDelCusList, getCurrentTableData]" stretch>
            <el-scrollbar height="30vh">
              <el-tab-pane label="周一" name="周一"></el-tab-pane>
              <el-tab-pane label="周二" name="周二"></el-tab-pane>
              <el-tab-pane label="周三" name="周三"></el-tab-pane>
              <el-tab-pane label="周四" name="周四"></el-tab-pane>
              <el-tab-pane label="周五" name="周五"></el-tab-pane>

              <div class="wlcontainer">

                <div class="wlbox">

                  <el-tag v-for="  del in delCustomers1     " :key="del" type="info"
                    :color="colorForTag[del.Visit[0].拜访建议]"
                    :closable="colorForTag[del.Visit[0].拜访建议] == 'red' ? false : true" @mouseover="showTagPreview(del)"
                    @mouseleave="hideTagPreview()" @close="handleClose(del, '周一')"
                    @click="dialogForm1Visible = true; handleTagClick(del, '周一')">

                    {{ del.Visit[0].客户简称 }}
                    <div class="tag-preview" v-if="showPreview" :style="{ top: previewTop, left: previewLeft }">
                      <div class="tag-pre-left"><el-icon size="large" color="blue">
                          <Bell />
                        </el-icon>
                        <el-badge :value="previewContent.拜访建议 == '本周期已拜访' ? '...' : previewContent.最晚线路规划时间_工作日"
                          :style="{ color: colorForTag[previewContent.拜访建议] }">
                          <h2 text="2xl" justify="center"> {{ previewContent.客户简称 }}</h2>
                        </el-badge>
                        <h3>{{ previewContent.客户代码_id }}</h3>
                        <el>
                          <h3>
                            <li><el-icon
                                v-if="previewContent.终端类型 == '现代终端' || previewContent.终端类型 == '加盟终端' || previewContent.终端类型 == '直营终端'">
                                <Star />
                              </el-icon>{{ previewContent.终端类型 }}</li>
                          </h3>
                          <h3>
                            <li>{{ previewContent.送货路段 }}</li>
                          </h3>
                          <h3>
                            <li>{{ previewContent.经营业态 }}</li>
                          </h3>
                        </el>

                      </div>

                    </div>

                  </el-tag>
                  <el-dialog v-model="dialogForm1Visible" title="移动至" style="width: 30vw;height: 25vh;">
                    <el-form :model="form1">
                      <el-form-item label="周期" :label-width="formLabelWidth">
                        <el-select v-model="form1.region" placeholder="请选择要调整到的日期">
                          <el-option label="周二" value="周二" />
                          <el-option label="周三" value="周三" />
                          <el-option label="周四" value="周四" />
                          <el-option label="周五" value="周五" />
                        </el-select>
                      </el-form-item>
                    </el-form>
                    <template #footer>
                      <span class="dialog-footer">
                        <el-button @click="dialogForm1Visible = false">取消</el-button>
                        <el-button type="primary" @click="dialogForm1Visible = false; moveCus(form1.region)">
                          确认
                        </el-button>
                      </span>
                    </template>
                  </el-dialog>

                </div>

                <div class="wlbox">
                  <el-tag v-for="     del      in      delCustomers2     " :key="del" type="info"
                    :color="colorForTag[del.Visit[0].拜访建议]"
                    :closable="colorForTag[del.Visit[0].拜访建议] == 'red' ? false : true" @mouseover="showTagPreview(del)"
                    @mouseleave="hideTagPreview()" @close="handleClose(del, '周二')"
                    @click="dialogForm2Visible = true; handleTagClick(del, '周二')">

                    {{ del.Visit[0].客户简称 }}
                    <div class="tag-preview" v-if="showPreview" :style="{ top: previewTop, left: previewLeft }">
                      <div class="tag-pre-left"><el-icon size="large" color="blue">
                          <Bell />
                        </el-icon>
                        <el-badge :value="previewContent.拜访建议 == '本周期已拜访' ? '...' : previewContent.最晚线路规划时间_工作日"
                          :style="{ color: colorForTag[previewContent.拜访建议] }">
                          <h2 text="2xl" justify="center"> {{ previewContent.客户简称 }}</h2>
                        </el-badge>
                        <h3>{{ previewContent.客户代码_id }}</h3>
                        <el>
                          <h3>
                            <li><el-icon
                                v-if="previewContent.终端类型 == '现代终端' || previewContent.终端类型 == '加盟终端' || previewContent.终端类型 == '直营终端'">
                                <Star />
                              </el-icon>{{ previewContent.终端类型 }}</li>
                          </h3>
                          <h3>
                            <li>{{ previewContent.送货路段 }}</li>
                          </h3>
                          <h3>
                            <li>{{ previewContent.经营业态 }}</li>
                          </h3>
                        </el>
                      </div>
                    </div>
                  </el-tag>
                  <el-dialog v-model="dialogForm2Visible" title="移动至" style="width: 30vw;height: 25vh;">
                    <el-form :model="form2">
                      <el-form-item label="周期" :label-width="formLabelWidth">
                        <el-select v-model="form2.region" placeholder="请选择要调整到的日期">
                          <el-option label="周一" value="周一" />
                          <el-option label="周三" value="周三" />
                          <el-option label="周四" value="周四" />
                          <el-option label="周五" value="周五" />
                        </el-select>
                      </el-form-item>
                    </el-form>
                    <template #footer>
                      <span class="dialog-footer">
                        <el-button @click="dialogForm2Visible = false">取消</el-button>
                        <el-button type="primary" @click="dialogForm2Visible = false; moveCus(form2.region)">
                          确认
                        </el-button>
                      </span>
                    </template>
                  </el-dialog>
                </div>
                <div class="wlbox">
                  <el-tag v-for="     del      in      delCustomers3     " :key="del" type="info"
                    :color="colorForTag[del.Visit[0].拜访建议]"
                    :closable="colorForTag[del.Visit[0].拜访建议] == 'red' ? false : true" @mouseover="showTagPreview(del)"
                    @mouseleave="hideTagPreview()" @close="handleClose(del, '周三')"
                    @click="dialogForm3Visible = true; handleTagClick(del, '周三')">

                    {{ del.Visit[0].客户简称 }}
                    <div class="tag-preview" v-if="showPreview" :style="{ top: previewTop, left: previewLeft }">
                      <div class="tag-pre-left"><el-icon size="large" color="blue">
                          <Bell />
                        </el-icon>
                        <el-badge :value="previewContent.拜访建议 == '本周期已拜访' ? '...' : previewContent.最晚线路规划时间_工作日"
                          :style="{ color: colorForTag[previewContent.拜访建议] }">
                          <h2 text="2xl" justify="center"> {{ previewContent.客户简称 }}</h2>
                        </el-badge>
                        <h3>{{ previewContent.客户代码_id }}</h3>
                        <el>
                          <h3>
                            <li><el-icon
                                v-if="previewContent.终端类型 == '现代终端' || previewContent.终端类型 == '加盟终端' || previewContent.终端类型 == '直营终端'">
                                <Star />
                              </el-icon>{{ previewContent.终端类型 }}</li>
                          </h3>
                          <h3>
                            <li>{{ previewContent.送货路段 }}</li>
                          </h3>
                          <h3>
                            <li>{{ previewContent.经营业态 }}</li>
                          </h3>
                        </el>
                      </div>
                    </div>
                  </el-tag>
                  <el-dialog v-model="dialogForm3Visible" title="移动至" style="width: 30vw;height: 25vh;">
                    <el-form :model="form3">
                      <el-form-item label="周期" :label-width="formLabelWidth">
                        <el-select v-model="form3.region" placeholder="请选择要调整到的日期">
                          <el-option label="周一" value="周一" />
                          <el-option label="周二" value="周二" />
                          <el-option label="周四" value="周四" />
                          <el-option label="周五" value="周五" />
                        </el-select>
                      </el-form-item>
                    </el-form>
                    <template #footer>
                      <span class="dialog-footer">
                        <el-button @click="dialogForm3Visible = false">取消</el-button>
                        <el-button type="primary" @click="dialogForm3Visible = false; moveCus(form3.region)">
                          确认
                        </el-button>
                      </span>
                    </template>
                  </el-dialog>
                </div>
                <div class="wlbox">
                  <el-tag v-for="     del      in      delCustomers4     " :key="del" type="info"
                    :color="colorForTag[del.Visit[0].拜访建议]"
                    :closable="colorForTag[del.Visit[0].拜访建议] == 'red' ? false : true" @mouseover="showTagPreview(del)"
                    @mouseleave="hideTagPreview()" @close="handleClose(del, '周四')"
                    @click="dialogForm4Visible = true; handleTagClick(del, '周四')">
                    {{ del.Visit[0].客户简称 }}
                    <div class="tag-preview" v-if="showPreview" :style="{ top: previewTop, left: previewLeft }">
                      <div class="tag-pre-left"><el-icon size="large" color="blue">
                          <Bell />
                        </el-icon>
                        <el-badge :value="previewContent.拜访建议 == '本周期已拜访' ? '...' : previewContent.最晚线路规划时间_工作日"
                          :style="{ color: colorForTag[previewContent.拜访建议] }">
                          <h2 text="2xl" justify="center"> {{ previewContent.客户简称 }}</h2>
                        </el-badge>
                        <h3>{{ previewContent.客户代码_id }}</h3>
                        <el>
                          <h3>
                            <li><el-icon
                                v-if="previewContent.终端类型 == '现代终端' || previewContent.终端类型 == '加盟终端' || previewContent.终端类型 == '直营终端'">
                                <Star />
                              </el-icon>{{ previewContent.终端类型 }}</li>
                          </h3>
                          <h3>
                            <li>{{ previewContent.送货路段 }}</li>
                          </h3>
                          <h3>
                            <li>{{ previewContent.经营业态 }}</li>
                          </h3>
                        </el>
                      </div>
                    </div>
                  </el-tag>
                  <el-dialog v-model="dialogForm4Visible" title="移动至" style="width: 30vw;height: 25vh;">
                    <el-form :model="form4">
                      <el-form-item label="周期" :label-width="formLabelWidth">
                        <el-select v-model="form4.region" placeholder="请选择要调整到的日期">
                          <el-option label="周一" value="周一" />
                          <el-option label="周二" value="周二" />
                          <el-option label="周三" value="周三" />
                          <el-option label="周五" value="周五" />
                        </el-select>
                      </el-form-item>
                    </el-form>
                    <template #footer>
                      <span class="dialog-footer">
                        <el-button @click="dialogForm4Visible = false">取消</el-button>
                        <el-button type="primary" @click="dialogForm4Visible = false; moveCus(form4.region)">
                          确认
                        </el-button>
                      </span>
                    </template>
                  </el-dialog>
                </div>
                <div class="wlbox">
                  <el-tag v-for="     del      in      delCustomers5     " :key="del" type="info"
                    :color="colorForTag[del.Visit[0].拜访建议]"
                    :closable="colorForTag[del.Visit[0].拜访建议] == 'red' ? false : true" @mouseover="showTagPreview(del)"
                    @mouseleave="hideTagPreview()" @close="handleClose(del, '周五')"
                    @click="dialogForm5Visible = true; handleTagClick(del, '周五')">

                    {{ del.Visit[0].客户简称 }}
                    <div class="tag-preview" v-if="showPreview" :style="{ top: previewTop, left: previewLeft }">
                      <div class="tag-pre-left"><el-icon size="large" color="blue">
                          <Bell />
                        </el-icon>
                        <el-badge :value="previewContent.拜访建议 == '本周期已拜访' ? '...' : previewContent.最晚线路规划时间_工作日"
                          :style="{ color: colorForTag[previewContent.拜访建议] }">
                          <h2 text="2xl" justify="center"> {{ previewContent.客户简称 }}</h2>
                        </el-badge>
                        <h3>{{ previewContent.客户代码_id }}</h3>
                        <el>
                          <h3>
                            <li><el-icon
                                v-if="previewContent.终端类型 == '现代终端' || previewContent.终端类型 == '加盟终端' || previewContent.终端类型 == '直营终端'">
                                <Star />
                              </el-icon>{{ previewContent.终端类型 }}</li>
                          </h3>
                          <h3>
                            <li>{{ previewContent.送货路段 }}</li>
                          </h3>
                          <h3>
                            <li>{{ previewContent.经营业态 }}</li>
                          </h3>
                        </el>
                      </div>
                    </div>
                  </el-tag>
                  <el-dialog v-model="dialogForm5Visible" title="移动至" style="width: 30vw;height: 25vh;">
                    <el-form :model="form5">
                      <el-form-item label="周期" :label-width="formLabelWidth">
                        <el-select v-model="form5.region" placeholder="请选择要调整到的日期">
                          <el-option label="周一" value="周一" />
                          <el-option label="周二" value="周二" />
                          <el-option label="周三" value="周三" />
                          <el-option label="周四" value="周四" />
                        </el-select>
                      </el-form-item>
                    </el-form>
                    <template #footer>
                      <span class="dialog-footer">
                        <el-button @click="dialogForm5Visible = false">取消</el-button>
                        <el-button type="primary" @click="dialogForm5Visible = false; moveCus(form5.region)">
                          确认
                        </el-button>
                      </span>
                    </template>
                  </el-dialog>
                </div>
              </div>
            </el-scrollbar>
          </el-tabs>
        </div>
      </el-col>
      <!-- 右上：客户列表展示 -->
      <el-col :span="12" class="col-right-top" style="z-index: 1;">
        <div style="height: auto; text-align: center; font-size: larger;">客户列表</div>
        <el-divider style="margin-bottom:15px;">
          <el-icon><star-filled /></el-icon>
        </el-divider>
        <el-scrollbar height="30  vh" always:true>
          <el-tag v-for="     cus, index      in        customers       " :key="index"
            @click="flag ? handleFalseClick(cus) : handleClick(cus)" :color="colorForTag[cus.Visit[0].拜访建议]"
            @mouseover="showTagPreview(cus)" @mouseleave="hideTagPreview()">{{
              cus.Visit[0].客户简称 }}
            <div class="tag-preview" v-if="showPreview" :style="{ top: previewTop, left: previewLeft }">
              <div class="tag-pre-left"><el-icon size="large" color="blue">
                  <Bell />
                </el-icon>
                <el-badge :value="previewContent.拜访建议 == '本周期已拜访' ? '...' : previewContent.最晚线路规划时间_工作日"
                  :style="{ color: colorForTag[previewContent.拜访建议] }">
                  <h2 text="2xl" justify="center"> {{ previewContent.客户简称 }}</h2>
                </el-badge>
                <h3>{{ previewContent.客户代码_id }}</h3>
                <el>
                  <h3>
                    <li><el-icon
                        v-if="previewContent.终端类型 == '现代终端' || previewContent.终端类型 == '加盟终端' || previewContent.终端类型 == '直营终端'">
                        <Star />
                      </el-icon>{{ previewContent.终端类型 }}</li>
                  </h3>
                  <h3>
                    <li>{{ previewContent.送货路段 }}</li>
                  </h3>
                  <h3>
                    <li>{{ previewContent.经营业态 }}</li>
                  </h3>
                  <h3>
                    <li>拜访建议:{{ previewContent.拜访建议 || '已拜访' }}</li>
                  </h3>
                </el>
              </div>
              <div class="tag-pre-right" style="max-height: 50vh;overflow: auto;">
                <h2 text=" 2xl" justify="center" style="text-align:center ;align-items: center;"> 任务列表</h2>
                <el-table :data="previewTaskContent">
                  <el-table-column prop="任务状态" label="任务状态" width="90" fixed="left" />
                  <el-table-column prop="任务内容" label="任务内容" width="180" />
                  <el-table-column prop="任务剩余完成时间_工作日" label="剩余天数" width="90" />
                  <el-table-column prop="预估时间_分钟" label="预估时长" />
                </el-table>
              </div>
            </div>

          </el-tag>
        </el-scrollbar>
      </el-col>
    </el-row>
    <!-- 下半区 -->
    <el-row class='row-bottom'>
      <!-- 左下：列表展示部分    -->
      <el-col :span="12" class="col-right-bottom">
        <el-button type="warning" @click="clearCurList(weekday)" style="z-index: 100;">重置当天客户</el-button>
        <el-button type="warning" @click="postRoad(weekday); setClick()" style="z-index: 100;">生成当天最优线路</el-button>
        <!-- <el-button @click="downloadExcel">导出 Excel</el-button> -->

        <!-- <el-button type="warning" @click="confirmRoute()" style="z-index: 100;">确认线路</el-button> -->
        <el-scrollbar height="42.5vh">
          <keep-alive>

            <el-table :data="tableData" :columns="tableColumns" style="width: 100%;" empty-text="没有客户被排入行程" height="40vh"
              sum-text="合计" stripe show-summary :summary-method="summaryMethod">
              <el-table-column type="expand">
                <template #default="props">
                  <div m="4" class="inTable">
                    <div class="p-info-father" style="display: flex;">
                      <div class="p-info" style="width:50%;">
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
                        <p style="font-weight:bold;">拜访建议: {{ props.row.visit_advice || (props.row.visit_advice + '已拜访')
                        }}
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
                      <el-table-column label="任务状态" prop="任务状态" />
                      <el-table-column label="任务内容" prop="任务内容" />
                      <el-table-column label="预估时长(分钟)" prop="预估时间_分钟" />

                      <el-table-column label="剩余完成时间(工作日)" prop="任务剩余完成时间_工作日" />
                    </el-table>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="周期" prop="date" width="auto" />
              <el-table-column label="客户代码" prop="id" width="auto" />
              <el-table-column label="客户名称" prop="name" width="auto" />
              <el-table-column label="客户地址" prop="address" width="auto" />
              <el-table-column label="任务数量" prop="tasknum" width="auto" />
              <el-table-column label="任务时间" prop="visit_time_cost" width="auto" />
              <el-table-column label="在途时间" prop="visit_road_time" width="auto" />
              <el-table-column label="总时间" prop="all_time" width="auto" />

            </el-table>




          </keep-alive>
        </el-scrollbar>
      </el-col>
    </el-row>
  </el-main>
</template>
<script setup lang="ts">
// 导入部分
import { StarFilled, Star, Avatar, InfoFilled, Sunny, MoonNight, Printer, Position, Bell } from '@element-plus/icons-vue'
import { onBeforeMount, onMounted, reactive, ref, computed } from 'vue';
import axios from "axios";
import { ElMessage, ElMessageBox, ElTable } from 'element-plus';
import { column } from 'element-plus/es/components/table-v2/src/common';
import XLSX from 'xlsx'
import FileSaver from 'file-saver'

function downloadExcel() {
  console.log(tableData.value);


  const blob = new Blob([tableData.value.map], { type: 'application/vnd.ms-excel' })
  const fileName = 'excel.xls'
  if (window.navigator.msSaveOrOpenBlob) { // IE
    navigator.msSaveBlob(blob, fileName)
  } else {
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = fileName
    link.click()
    window.URL.revokeObjectURL(link.href)

  }


}


const tableColumns = ref([
  { prop: 'date', label: 'date' },
  { prop: 'id', label: 'id' },
  { prop: 'name', label: 'name' },
  { prop: 'address', label: 'address' },
  { prop: 'tasknum', label: 'tasknum' },
  { prop: 'visit_time_cost', label: 'visit_time_cost' },
  { prop: 'visit_road_time', label: 'visit_road_time' },
  { prop: 'all_time', label: 'all_time' },

])
// const sums: any = ref([]);

// function summaryMethod({ columns, data }: any) {
//   columns.forEach((column: any, columnIndex: any) => {
//     const values = data.map((item: any) => Number(item[column.property]));
//     if (column.property === 'date') {
//       sums.value[columnIndex] = '合计';
//       return;
//     }
//     if (column.property === 'id') {
//       sums.value[columnIndex] = data.length + "家";
//       return;
//     }
//     if (!values.every((value: any) => isNaN(value))) {
//       sums.value[columnIndex] = values.reduce((prev: any, curr: any) => {
//         const value = Number(curr);
//         if (!isNaN(value)) {
//           return prev + curr;
//         } else {
//           return prev;
//         }
//       }, 0);
//     } else {
//       sums.value[columnIndex] = '';
//     }
//   });
//   sums.value[5] = sums.value[5] + "个"
//   sums.value[6] = Math.floor(parseInt(sums.value[6]) / 60) + "小时" + parseInt(sums.value[6]) % 60 + "分钟"
//   sums.value[7] = Math.floor(parseInt(sums.value[7]) / 60) + "小时" + parseInt(sums.value[7]) % 60 + "分钟"
//   TotalTime.value = sums.value[8]
//   sums.value[8] = Math.floor(parseInt(sums.value[8]) / 60) + "小时" + parseInt(sums.value[8]) % 60 + "分钟"
//   return sums.value;
// }

function summaryMethod({ columns, data }: any) {
  const sums: string[] = []
  // const summaryMethod = async ({ columns, data }) => {
  columns.forEach((column: any, columnIndex: any) => {
    const values = data.map((item: any) => Number(item[column.property]));
    if (column.property === 'date') {
      sums[columnIndex] = '合计';
      return;
    }
    if (column.property === 'id') {
      sums[columnIndex] = data.length + "家";
      return;
    }
    if (!values.every((value: any) => isNaN(value))) {
      sums[columnIndex] = values.reduce((prev: any, curr: any) => {
        const value = Number(curr);
        if (!isNaN(value)) {
          return prev + curr;
        } else {
          return prev;
        }
      }, 0);
    } else {
      sums[columnIndex] = '';
    }
  });
  sums[5] = sums[5] + "个"
  sums[6] = Math.floor(parseInt(sums[6]) / 60) + "小时" + parseInt(sums[6]) % 60 + "分钟"
  sums[7] = Math.floor(parseInt(sums[7]) / 60) + "小时" + parseInt(sums[7]) % 60 + "分钟"
  TotalTime.value = sums[8]
  sums[8] = Math.floor(parseInt(sums[8]) / 60) + "小时" + parseInt(sums[8]) % 60 + "分钟"


  return sums;
}



const convertWeekdayToNum: any = {
  "周一": 1,
  "周二": 2,
  "周三": 3,
  "周四": 4,
  "周五": 5
}

const checkMoveValid = (cus: Cus, date: string) => {
  let minDate: number = parseInt(cus.Visit[0].最晚线路规划时间_工作日)
  const checkMoveFlag = ref(true)
  if (minDate < convertWeekdayToNum[date]) {
    checkMoveFlag.value = !checkMoveFlag.value
  }
  return checkMoveFlag.value
}



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
let customers = ref<Cus[]>([])//客户列表
let delCustomers1 = ref<Cus[]>([])///删除客户列表，即排入周一行程的客户列表
let delCustomers2 = ref<Cus[]>([])
let delCustomers3 = ref<Cus[]>([])
let delCustomers4 = ref<Cus[]>([])
let delCustomers5 = ref<Cus[]>([])
let delCustomers: DelCustomers = {//设置一个客户列表选择器
  "周一": delCustomers1,
  "周二": delCustomers2,
  "周三": delCustomers3,
  "周四": delCustomers4,
  "周五": delCustomers5
}
let tableData1 = ref([])
let tableData2 = ref([])
let tableData3 = ref([])
let tableData4 = ref([])
let tableData5 = ref([])
let tableDatas: TDPlus = {
  "周一": tableData1,
  "周二": tableData2,
  "周三": tableData3,
  "周四": tableData4,
  "周五": tableData5
}
//定义右下角拜访列表的数据
const weekdays: any = ["周一", "周二", "周三", "周四", "周五"]
let tableDataObj: {
  date: any, name: string, id: string, modern: string, road: string, visit_advice: string,
  open: string, close: string, visit_time: string, pos: string, type: string, address?: string, tasknum?: number,
  last_date?: string, task?: object[], time?: number, visit_time_cost?: number, visit_road_time?: number, all_time?: number,
}

interface TableData {
  date: any; name: string; id: string; modern: string; road: string; visit_advice: string;
  open: string; close: string; visit_time: string; pos: string; type: string; address?: string;
  last_date?: string; task?: object[]; time?: number; visit_time_cost?: number; tasknum?: number;
  visit_road_time?: number; all_time?: number;
}
//indexOf(weekdays,weekday)排序依据
function getTableData(cus: Cus) {
  tableDataObj = {
    name: cus.Visit[0].客户简称, modern: cus.Visit[0].终端类型, id: cus.Visit[0].客户代码_id,
    type: cus.Visit[0].经营业态, road: cus.Visit[0].送货路段, visit_advice: cus.Visit[0].拜访建议, visit_time_cost: cus.Visit[0].拜访时长预估,
    open: cus.Visit[0].开门时间, close: cus.Visit[0].关门时间, visit_time: cus.Visit[0].拜访日期, pos: cus.Visit[0].pos机类型, address: cus.Visit[0].客户地址,
    date: weekday, task: cus.Task, tasknum: cus.Task.length, visit_road_time: 0, all_time: 0
    //  day_index: ((indexOf(weekdays, weekday) as unknown as string) + (indexOf(getCurrentDelCusList(weekday), cus) + 2 as unknown as string)),

  }
  return (tableDataObj)
}

function getCurrentTableData(e: string) {
  return tableDatas[e]

}
//定义处理标签（即客户选择）的方法
const handleClick = (cus: Cus) => {
  // homeflag = true
  if (colorForTag[cus.Visit[0].拜访建议] == 'red') {
    if (checkMoveValid(cus, weekday.value)) {
      getCurrentDelCusList(weekday.value).value.push(cus)
      customers.value.splice(customers.value.indexOf(cus), 1)
      insertTableData(getTableData(cus))
    }
    else {
      alert(`该客户有一个${cus.Visit[0].最晚线路规划时间_工作日}天内的任务需要完成`)
    }

  }
  else {
    alert("请先处理红色客户")
  }
  stateFlag(customers.value)
}

const handleFalseClick = (cus: Cus) => {
  if (colorForTag[cus.Visit[0].拜访建议] != 'red') {
    getCurrentDelCusList(weekday.value).value.push(cus)
    customers.value.splice(customers.value.indexOf(cus), 1)
    insertTableData(getTableData(cus))
  }

}

//设置处理已选客户移动的逻辑
const dialogForm1Visible = ref(false)
const dialogForm2Visible = ref(false)
const dialogForm3Visible = ref(false)
const dialogForm4Visible = ref(false)
const dialogForm5Visible = ref(false)
const formLabelWidth = '140px'
const form1 = reactive({
  region: ''
})
const form2 = reactive({
  region: ''
})
const form3 = reactive({
  region: ''
})
const form4 = reactive({
  region: ''
})
const form5 = reactive({
  region: ''
})
let movedCus: any = {};
let temDay = '周一'
const handleTagClick = (del: Cus, e: string) => {
  movedCus = del
  temDay = e
};


const moveCus = (e: any) => {

  const temIndex = getCurrentDelCusList(temDay).value.indexOf(movedCus)
  if (temIndex > -1) {
    if (checkMoveValid(movedCus, e)) {
      getCurrentDelCusList(temDay).value.splice(temIndex, 1);
      getCurrentDelCusList(e).value.push(movedCus)

      tableDatas[temDay].value.splice(temIndex, 1)
      tableDatas[e].value.push(getTableData(movedCus))
    }
    else {
      alert(`您不能将该客户移动至${e},因为他有一个${movedCus.Visit[0].最晚线路规划时间_工作日}天内的任务需要完成`)
    }
  }

}



// 处理鼠标放在客户tag上悬停显示信息的逻辑
const showPreview = ref(false);
const previewContent = ref();
const previewTop = ref('');
const previewLeft = ref('');
const previewTaskContent = ref()
const showTagPreview = (del: any) => {
  showPreview.value = true;
  previewContent.value = del.Visit[0];
  previewTaskContent.value = del.Task;
  previewTop.value = 'calc(40vh - 10px)';
  previewLeft.value = 'calc(52vw - 10px)';
};

const hideTagPreview = () => {

  showPreview.value = false;
  previewTaskContent.value = '';
  previewContent.value = '';
  previewTop.value = '';
  previewLeft.value = '';


};
let weekday = ref("周一")
interface ColorMap {
  [key: string]: string;
}
//定义对象，给标签打颜色
const colorForTag: ColorMap = {
  "一周内拜访": "red",
  "两周内拜访": "orange",
  "可一月内拜访": "yellow",
  "本周期已拜访": "lightblue"
}



const routeInfo = ref([])
//方法定义部分
//处理原始客户
function getHandle() {
  axios.get("http://122.9.67.194:8000/api/customer/info/",
  )
    .then((res) => {


      routeInfo.value = res.data;
      // console.log(routeInfo.value[0]);
    }
    );
}
//处理线路重新规划逻辑
function resetRoad(array: any, newarray: any) {
  let temroad: any = ref([])
  for (let index = 0; index < newarray.value.length; index++) {
    const element1 = newarray.value[index];
    for (let i = 0; i < array.value.length; i++) {
      const element2: any = array.value[i];
      if (element1 == element2.Visit[0].客户代码_id) {
        temroad.value.push(element2)
      }
    }
  }
  return temroad
}
function resetTable(array: any, newarray: any) {
  let temroad: any = ref([])
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
const postRoad = async (e: string) => {
  // function postRoad(e) {


  let cusList11: any = ref([])
  cusList11.value = getCurrentDelCusList(e).value
  let idPost: any = ref([])
  for (let index = 0; index < cusList11.value.length; index++) {

    idPost.value.push(cusList11.value[index].Visit[0].客户代码_id);
  }
  axios.post("http://122.9.67.194:8000/api/customer/info/getRoad/",
    { text: idPost.value }, {})
    .then((res) => {
      let newRoad: any = ref([])
      newRoad.value = res.data
      getCurrentDelCusList(e).value = resetRoad(getCurrentDelCusList(e), newRoad).value
      tableData.value.sort((a: any, b: any) => {
        const indexA: number = newRoad.value.indexOf(a.id)
        const indexB: number = newRoad.value.indexOf(b.id)
        return indexA - indexB
      }
      )

      tableData.value[0].visit_road_time = 0
      tableData.value[0].all_time = tableData.value[0].visit_time_cost
      for (let i = 1; i < tableData.value.length; i++) {
        const targetRow: any = routeInfo.value.find((row: any, index) => {
          if (index > 0 && row.起点 === tableData.value[i - 1].id && row.终点 === tableData.value[i].id) {
            return true;
          }
        });
        tableData.value[i].visit_road_time = Math.floor(targetRow['时间'] / 60)
        tableData.value[i].all_time = Math.floor(targetRow['时间'] / 60) + tableData.value[i].visit_time_cost
      }
      summaryMethod({ columns: tableColumns.value, data: tableData.value })
      getTotalTime(1)
        .then((res) => {
          if (TotalTime.value > 350) {
            ElMessageBox.alert(
              '您今天的预计拜访时间已超5.5小时，建议您减少一些客户哦',
              '温馨提示',
              {
                confirmButtonText: 'OK',
                type: 'warning',

              }
            )
          }
          if (TotalTime.value < 270) {
            ElMessageBox.prompt(`你当天的拜访总时长不足4.5小时,请选择是否继续或备注原因`, '提示', {
              inputPlaceholder: "请输入原因"
              , confirmButtonText: '备注',
              cancelButtonText: '没啥问题，我要继续',
              showClose: false,
              closeOnClickModal: false,

            })
              .then(({ value }) => {
                ElMessage({
                  type: 'success',
                  message: `备注成功`,
                })
              })
              .catch(() => {
                ElMessage({
                  type: 'info',
                  message: '请继续选择客户',
                })
              })
          }

          // watch([TotalTime, clickCount], ([newVal1, newVal2], [oldVal1, oldVal2]) => {

          //   if (newVal1 > 300 && oldVal2 !== newVal2) {



          //   }
          //   if (newVal1 < 240 && oldVal2 !== newVal2) {
          //     console.log("旧的" + oldVal1);
          //     console.log("新的" + newVal1);

          // }
          // )
        })



    }
    );


}

const clickCount = ref(0);
const setClick = () => {
  clickCount.value++;
};
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
//处理地图原始渲染，此处必须加key  
//生命周期函数
onBeforeMount(() => {
})
onMounted(() => {
  postHandle("闻毅")
  getHandle()
})
interface DelCustomers {
  [key: string]: any // any[] 
}
interface TDPlus {
  [key: string]: any // any[] 
}



function getCurrentDelCusList(weekday: string) {
  return delCustomers[weekday]
}
function clearCurList(weekday: string) {
  let tempLi = [...delCustomers[weekday].value]

  for (let i = tempLi.length - 1; i >= 0; i--) {
    const element = tempLi[i]
    if (colorForTag[element.Visit[0].拜访建议] !== 'red') {
      handleClose(element, weekday)
      // customers.value.unshift(element)
      // delCustomers[weekday].value.splice(i, 1)
      // deleteTableData(getTableData(element))
    }
  }
}
const tableData: any = computed(() => {
  if (weekday.value === '周一') {
    return tableData1.value;
  } else if (weekday.value === '周二') {
    return tableData2.value;
  } else if (weekday.value === '周三') {
    return tableData3.value;
  } else if (weekday.value === '周四') {
    return tableData4.value;
  } else if (weekday.value === '周五') {
    return tableData5.value;
  }
  return tableData1.value;
});
const TotalTime = ref(tableData.value.reduce((acc: any, cur: any) => {
  const [hours, minutes] = cur.all_time.split("小时");
  const minutesValue = parseInt(minutes) || 0;
  return acc + parseInt(hours) * 60 + minutesValue;
}, 0))


const getTotalTime = async (e: any) => {
  // summaryMethod({ columns: tableColumns.value, data: tableData.value })
  return TotalTime
}




function clearTableData(tableData: any, weekday: string) {
  const tindex: any = []
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
//定义巡视flag的函数
function stateFlag(cus: any) {
  let state = cus.every(function (item: any) {
    return (colorForTag[item.Visit[0].拜访建议] != 'red');
  })
  flag = state
}
//定义处理标签（即客户退回）的方法
const handleClose = (del: Cus, e: string) => {

  let i_index: number = 0
  for (let i = 0; i < customers.value.length; i++) {
    const element: any = customers.value[i];
    if (colorForTag[element.Visit[0].拜访建议] == colorForTag[del.Visit[0].拜访建议]) {
      i_index = i; break
    }
  }
  customers.value.splice(i_index, 0, del)
  tableDatas[e].value.splice(getCurrentDelCusList(e).value.indexOf(del), 1)
  getCurrentDelCusList(e).value.splice(getCurrentDelCusList(e).value.indexOf(del), 1)
}
function insertTableData(tableDataObj: TableData) {
  tableDatas[weekday.value].value.push(tableDataObj)
}

function deleteTableData(tableDataObj: TableData) {
  for (let i = 0; i < tableData.value.length; i++) {
    const element: TableData = tableData.value[i];
    if (element.name == tableDataObj.name) {
      tableData.value.splice(i, 1)
    }
  }
}

</script>
      
<style>
.wl-tab {
  display: flex;
}

.wl-box {
  position: relative;
  flex: 1;
  height: 30vh;
  width: 9vw;
  border: 1px solid #000;
  justify-items: stretch;


}

.el-tabs__item {
  display: flex;
  align-items: center;
}

.highlight {
  background-color: yellow;
}

.tag-preview {
  display: flex;
  position: fixed;
  bottom: 10vh;
  right: 0vw;
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