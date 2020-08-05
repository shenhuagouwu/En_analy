<template>
  <el-container direction="vertical">
    <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <i class="icon el-icon-position"></i>
            <el-breadcrumb-item :to="{ path: '/Enpromotion' }">英文推广</el-breadcrumb-item>
            <el-breadcrumb-item>搜索</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="searchtime">
            <search-time></search-time>
        </div>
    </el-header>
    <el-main>
    </el-main>
  </el-container>
</template>
<script>
import SearchTime from "../public/searchTime";
export default {
    name: 'ensearchRecordPage',
    components: {
      SearchTime
    },
}
</script>

<style lang="scss" scoped>
.el-header{
  background-color:#fff;
  padding: 10px 30px;
  margin-bottom: 20px;
  overflow: hidden;
}
.el-row {
  margin-bottom: 20px;
  margin-left:0px!important;
  margin-right:0px!important;
  padding:0px 10px;
  .el-col {
    border-radius:5px;
    .grid-content {
      clear: both;
      display: block;
      width:100%;
      border-radius:5px;
      //padding: 20px;
      .piecharttit{
        clear: both;
        display: block;
        text-align: left;
        padding:5px 15px;
        font-size:16px;
        font-weight: bold;
        color: #333;
        background: #f9f9f9; 
        .icon{
          float: right;
          color: #0277d5;
          font-size: 24px;
          line-height: 30px;
          cursor: pointer;
        }        
      }
      .piechartbox{
        clear: both;
        display: block;
        padding:20px;
      }
      &.perclass{
        clear: both;
        display: block;
        text-align: left;
        padding:20px;
        font-size:16px;
        cursor: pointer;
        span{
          font-weight: bold;
          color: #0277d5;
          font-size:20px;
        }
      }
    }
    .bg-purple-light {
      background: #fff;
    }
  }
}
</style>
