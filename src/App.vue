<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="linker" style="display: flex;justify-items: center;">
          <h3>
            <RouterLink to="/">线路模拟器</RouterLink>
          </h3>
          <h3>
            <RouterLink to="/map" style="margin-left: 15px;">地图页</RouterLink>
          </h3>
        </div>
        <div class="header-child" style="display: flex;vertical-align: middle;">
          <div><img :src="homeIcon" style="height: 9vh;width: 16vh;margin-top: 0.5vh;"></div>
          <div>
            <h1 style="color:aliceblue;margin: 0 10px;">杨帆畅行</h1>
            <h3 style="color: aquamarine;margin: 0 10px">----基于营销任务的智能行程规划辅助模块</h3>
          </div>
        </div>
      </el-header>
      <!-- <keep-alive><RouterView></RouterView></keep-alive> -->
      <!-- <RouterView v-slot="{Component}" ><keep-alive :is="Component"></keep-alive></RouterView> -->
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
      <el-footer>
        <span>此网站非生产环境，仅供测试使用</span>
      </el-footer>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import homeIcon from '@/assets/logo.png'



</script>
<style lang="scss">
body {
  margin: 0px;
  padding: 0;
  height: 100vh;
  width: 100vw;
}

//地图容器的样式，注意不要加display:flex 否则会抖动
#container {
  padding: 5px;
  margin: 5px;
  height: 85vh;
  width: auto;
}

//整体视图样式    
.common-layout {
  height: 100vh;
  background-color: #57606f;
  .wlcontainer {
  display: flex;
}

.wlbox {
  flex: 1;
  height: 30vh;
 


}
  .el-header {
    //header
    padding: 0;
    display: flex;
    position: relative;
    height: 10vh;
    background-color: #6e96c7;
  }

  .header-child {
    position: absolute;
    right: 0;
  }

  .el-footer {
    //footer
    padding: 0;
    height: 5vh;
    background-color: #dfe4ea;
  }

  .el-main {
    //身子
    overflow: hidden;
    padding: 0;
    height: 85vh;

  }

  .el-row {
    //分行，行高可定义为1/2的el-main的height
    height: 42.5vh;

  }

  .el-col {
    //分列 根据具体的span赋值，12即为1/2的vw
    // border:solid;

  }

  // .col-left-top{
  //   height: 40vh;
  // }
  // .col-right-bottom{

  //   height: 100vh;
  // }

  .el-tag {
    //标签原始样式
    font-size: small;
    margin-right: 15px;
    margin-bottom: 20px;
    padding: 5px 10px;
    // border-radius: 10px;
    color: #2f3542;
    opacity: 1;
    transition: 1s;

    &:hover {
      opacity: 0.6;
      cursor: pointer;
      color: #5a87bd;
    }

  }

  .el-steps--vertical {
    //左侧周一至周五分栏的样式
    height: 10%;
    flex-flow: column;
  }

  .el-popper {

    position: absolute;
    border-radius: var(--el-popper-border-radius);
    padding: 5px 11px;
    z-index: 2000;
    font-size: 12px;
    line-height: 20px;
    min-width: 10px;
    max-width: 60px;

    word-wrap: break-word;
    flex-wrap: wrap;
    visibility: visible;
  }

  .el-tab-pane {
    //分栏高度
    height: 30 vh;
    border: #2f3542 ;
    border: solid;
  }


  .el-tabs__item {
    //分栏内边距
    padding-bottom: 50px;
  }

  .el-divider--horizontal {
    margin: 5px; //分割线上移
  }
}

.scrollbar-flex-content {
  display: flex;
}

.col-right-top {
  height: 75vh;
}
.tab-content {
  display: flex;
  flex-wrap: wrap;
}

.el-tab-pane:nth-child(1) .tab-content {
  width: 10vw;
}

.el-tab-pane:nth-child(2) .tab-content {
  width: 20vw;
  margin-left: 10vw;
}

.el-tab-pane:nth-child(3) .tab-content {
  width: 20vw;
  margin-left: 20vw;
}

.el-tab-pane:nth-child(4) .tab-content {
  width: 20vw;
  margin-left: 30vw;
}

.el-tab-pane:nth-child(5) .tab-content {
  width: 20vw;
  margin-left: 40vw;
}



</style>