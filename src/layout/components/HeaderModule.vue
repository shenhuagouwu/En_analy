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
        <p class="adminmaintopfr">你好，聂亚兵&nbsp;&nbsp;|&nbsp;&nbsp;权限：美工&nbsp;&nbsp;|&nbsp;&nbsp;<span>退出</span>&nbsp;&nbsp;当前服务器时间: {{currentTime}}</p>
    </div>
</template>
<script>
export default {
  name:"HeaderModule",
  data() {
    return {
      timer: "",                 //定义一个定时器的变量
      currentTime: new Date(),   // 获取当前时间
    }
  },
  created() {
    var $this = this;           //声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(function() {
      //修改数据date
      $this.currentTime = 
        new Date().getFullYear() +
        "-" +
        $this.appendZero(new Date().getMonth() + 1) +
        "-" +
        $this.appendZero(new Date().getDate()) +
        " " +
        $this.appendZero(new Date().getHours()) +
        ":" +        
        $this.appendZero(new Date().getMinutes()) +
        ": " +
        $this.appendZero(new Date().getSeconds());
    }, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
  methods:{
      appendZero(obj) {
        if (obj < 10) {
           return "0" + obj;
        } else {
          return obj;
        }
      },
  }
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


