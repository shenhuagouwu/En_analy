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
        <p class="adminmaintopfr">你好，{{username}}&nbsp;&nbsp;|&nbsp;&nbsp;权限：美工&nbsp;&nbsp;|&nbsp;&nbsp;<span class="back" @click="handleBack">退出</span>&nbsp;&nbsp;当前服务器时间: {{currentTime}}</p>
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
    //若无身份信息，则跳转登录页
    if(!(sessionStorage.getItem("zhanghu"))) {
        $this.$router.push('/login')
    }
    //初始化
    $this.username();
    $this.timer = setInterval(function() {
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
      username() {
          var $this=this;
          $this.zhanghu = JSON.parse(sessionStorage.getItem("zhanghu"))
          $this.username = $this.zhanghu.username
      },
      appendZero(obj) {
        if (obj < 10) {
           return "0" + obj;
        } else {
          return obj;
        }
      },
      handleBack:function(){
        var $this=this;
        $this.$confirm('确定退出系统?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          $this.$store.dispatch('user/zhanghu');
          $this.$message({
            type: 'success',
            message: '退出成功!'
          })
          setTimeout(() => {
            //$this.$router.push("/login");
            location.reload() // 强制刷新
          }, 1000)
        }).catch(() => {
          $this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
      }
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
      .back{
        cursor: pointer;
        &:hover{
          color:#ff0;
        }
      }
    }
  }
</style>


