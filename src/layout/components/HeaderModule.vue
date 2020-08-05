<!--
 * @Author: your name
 * @Date: 2020-05-14 16:27:38
 * @LastEditTime: 2020-05-19 10:59:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \git_Enxlsx\src\layout\components\HeaderModule.vue
--> 
<template>    
    <div class="adminmaintop">
        <p class="adminmaintoplogo"><span><img src="../../assets/images/logo.png" alt=""></span>英文推广数据分析系统</p>
        <p class="adminmaintopfr">你好，聂亚兵&nbsp;&nbsp;|&nbsp;&nbsp;权限：美工&nbsp;&nbsp;|&nbsp;&nbsp;<span>退出</span>&nbsp;&nbsp;当前服务器时间: 2020-07-10 13:59</p>
    </div>
</template>
<script>
export default {
    name:"HeaderModule",
}
</script>
<style lang="scss">
  .adminmaintop{
    overflow:hidden;
    .adminmaintoplogo{
      float:left;
      color:#fff;
      font-size:18px;
      line-height:32px;
      span{
        display: block;
        float:left;
        height: 32px;
        margin-right:10px;
        img{
          display: block;
          height: 100%;
        }
      }
    }
    .adminmaintopfr{
      float: right;
      text-align:left;
      color: #fff;
      font-size: 14px;
      line-height: 1;
      padding-top: 18px;
    }
  }
</style>


