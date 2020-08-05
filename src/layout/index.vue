<template>
  <el-container>
    <el-header><header-module></header-module></el-header>
    <el-container style="overflow:hidden;">
      <el-aside><left-module></left-module></el-aside>
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script>
import HeaderModule from './components/HeaderModule';
import LeftModule from './components/LeftModule';
export default {
  name: 'Layout',
  components: {
    HeaderModule,
    LeftModule,
  }
}
</script>
<style lang="scss">
#app{
  clear:both;
  display:block;
  height:100%;
}
.el-container{
  height:100%;
  .el-header{
    background-color:#0177d5;
    text-align: center;
    padding:20px 30px 20px 30px;
    height:auto!important;
  }
  .el-container {
    min-width: 0;
      .el-aside {
        background: #21262e;
        text-align: center;
        width:240px!important;
      }
      .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height:30px;
        padding:0px;
      }
  }
}
</style>
