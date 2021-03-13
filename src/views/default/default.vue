<template>
  <el-container direction="vertical" style="padding-top:25px;">
    <el-scrollbar style="height:100%">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content row01 bg-purple-light">
                 <p class="row_tit">李伟东组</p>
                 <div class="row_box">
                      <p class="row_boxTop clearfix">
                         <span>姓名</span>
                         <span>今天个数<i><s v-on:click="handleAscDaycou(arrListOne,'0')" class="el-icon-caret-top"></s><s v-on:click="handleDesDaycou(arrListOne,'0')" class="el-icon-caret-bottom"></s></i></span>
                         <span>昨天个数<i><s v-on:click="handleAscYesdaycou(arrListOne,'0')" class="el-icon-caret-top"></s><s v-on:click="handleDesYesdaycou(arrListOne,'0')" class="el-icon-caret-bottom"></s></i></span>
                         <span>本月个数<i><s v-on:click="handleAscMonthcou(arrListOne,'0')" class="el-icon-caret-top"></s><s v-on:click="handleDesMonthcou(arrListOne,'0')" class="el-icon-caret-bottom"></s></i></span>
                         <span>上月个数<i><s v-on:click="handleAscLastmonthcou(arrListOne,'0')" class="el-icon-caret-top"></s><s v-on:click="handleDesLastmonthcou(arrListOne,'0')" class="el-icon-caret-bottom"></s></i></span>
                         <span>本月评比<i><s v-on:click="handleAscMonthcom(arrListOne,'0')" class="el-icon-caret-top"></s><s v-on:click="handleDesMonthcom(arrListOne,'0')" class="el-icon-caret-bottom"></s></i></span>
                         <span>上月评比<i><s v-on:click="handleAscLastmonthcom(arrListOne,'0')" class="el-icon-caret-top"></s><s v-on:click="handleDesLastmonthcom(arrListOne,'0')" class="el-icon-caret-bottom"></s></i></span>
                      </p>
                      <ul class="row_boxMid">
                          <li class="clearfix"  v-for="(item,index) in arrListOne" :key="index">
                              <span>{{item.name}}</span>
                              <span>{{item.today_count}}</span>
                              <span>{{item.yesterday_count}}</span>
                              <span>{{item.month_count}}</span>
                              <span>{{item.lastmonth_count}}</span>
                              <span>{{item.month_comparison}}</span>
                              <span>{{item.lastmont_comparison}}</span>
                          </li>
                      </ul>
                      <p class="row_boxBom clearfix">
                         <span>合计</span>
                         <span>{{totalOneArr.totalDay}}</span>
                         <span>{{totalOneArr.totalYesterDay}}</span>
                         <span>{{totalOneArr.totalMonth}}</span>
                         <span>{{totalOneArr.totalLastMonth}}</span>
                         <span>{{totalOneArr.totalMonthCom}}</span>
                         <span>{{totalOneArr.totalLastMontCom}}</span>
                      </p>
                 </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content row01 bg-purple-light">
                 <p class="row_tit">刘松海组</p>
                 <div class="row_box">
                      <p class="row_boxTop clearfix">
                         <span>姓名</span>
                         <span>今天个数<i><s v-on:click="handleAscDaycou(arrListTwo,'1')" class="el-icon-caret-top"></s><s v-on:click="handleDesDaycou(arrListTwo,'1')" class="el-icon-caret-bottom"></s></i></span>
                         <span>昨天个数<i><s v-on:click="handleAscYesdaycou(arrListTwo,'1')" class="el-icon-caret-top"></s><s v-on:click="handleDesYesdaycou(arrListTwo,'1')" class="el-icon-caret-bottom"></s></i></span>
                         <span>本月个数<i><s v-on:click="handleAscMonthcou(arrListTwo,'1')" class="el-icon-caret-top"></s><s v-on:click="handleDesMonthcou(arrListTwo,'1')" class="el-icon-caret-bottom"></s></i></span>
                         <span>上月个数<i><s v-on:click="handleAscLastmonthcou(arrListTwo,'1')" class="el-icon-caret-top"></s><s v-on:click="handleDesLastmonthcou(arrListTwo,'1')" class="el-icon-caret-bottom"></s></i></span>
                         <span>本月评比<i><s v-on:click="handleAscMonthcom(arrListTwo,'1')" class="el-icon-caret-top"></s><s v-on:click="handleDesMonthcom(arrListTwo,'1')" class="el-icon-caret-bottom"></s></i></span>
                         <span>上月评比<i><s v-on:click="handleAscLastmonthcom(arrListTwo,'1')" class="el-icon-caret-top"></s><s v-on:click="handleDesLastmonthcom(arrListTwo,'1')" class="el-icon-caret-bottom"></s></i></span>
                      </p>
                      <ul class="row_boxMid">
                          <li class="clearfix"  v-for="(item,index) in arrListTwo" :key="index">
                              <span>{{item.name}}</span>
                              <span>{{item.today_count}}</span>
                              <span>{{item.yesterday_count}}</span>
                              <span>{{item.month_count}}</span>
                              <span>{{item.lastmonth_count}}</span>
                              <span>{{item.month_comparison}}</span>
                              <span>{{item.lastmont_comparison}}</span>
                          </li>
                      </ul>
                      <p class="row_boxBom clearfix">
                         <span>合计</span>
                         <span>{{totalTwoArr.totalDay}}</span>
                         <span>{{totalTwoArr.totalYesterDay}}</span>
                         <span>{{totalTwoArr.totalMonth}}</span>
                         <span>{{totalTwoArr.totalLastMonth}}</span>
                         <span>{{totalTwoArr.totalMonthCom}}</span>
                         <span>{{totalTwoArr.totalLastMontCom}}</span>
                      </p>
                 </div>
            </div>
          </el-col>
          </el-col>
        </el-row>
    </el-scrollbar>
  </el-container>
</template>
<script>
export default {
  name: 'defaultPage',
  data() {
    return {
      arrListOne:[],
      arrListTwo:[],
      totalOneArr:{},
      totalTwoArr:{},
    }
  },
  mounted() {
    var $this=this;
    $this.getInfo();
  },
  methods: {
    getInfo:function(){
      var $this = this;
      $this.$api.get("/index/personal_time_inquiry",null,function(res) {
          if (res.data) {
            var arrList = Object.keys(res.data).map(function (key) { return res.data[key]; });
            console.log(arrList,'0');
            var arrOne=[];
            var arrTwo=[];
            var totalOneObj={
              totalDay:0,
              totalYesterDay:0,
              totalMonth:0,
              totalLastMonth:0,
              totalMonthCom:0,
              totalLastMontCom:0,
            }
            var totalTwoObj={
              totalDay:0,
              totalYesterDay:0,
              totalMonth:0,
              totalLastMonth:0,
              totalMonthCom:0,
              totalLastMontCom:0,
            }
            arrList.forEach(function(item,index){
                var item = Object.keys(item).map(function (key) { return item[key]; });
                item.forEach(function(items){
                    if(index==0){
                          totalOneObj.totalDay+=items.today_count
                          totalOneObj.totalYesterDay+=items.yesterday_count
                          totalOneObj.totalMonth+=items.month_count
                          totalOneObj.totalLastMonth+=items.lastmonth_count
                          totalOneObj.totalMonthCom+=items.month_comparison
                          totalOneObj.totalLastMontCom+=items.lastmont_comparison
                          arrOne.push(items);
                          $this.totalOneArr=totalOneObj;
                    }else{
                          totalTwoObj.totalDay+=items.today_count
                          totalTwoObj.totalYesterDay+=items.yesterday_count
                          totalTwoObj.totalMonth+=items.month_count
                          totalTwoObj.totalLastMonth+=items.lastmonth_count
                          totalTwoObj.totalMonthCom+=items.month_comparison
                          totalTwoObj.totalLastMontCom+=items.lastmont_comparison
                          arrTwo.push(items);
                          $this.totalTwoArr=totalTwoObj;
                    }
                });
            });
            $this.arrListOne=arrOne;
            $this.arrListTwo=arrTwo;
          }else{
            $this.$message("暂时没有数据");
          }
        }
      );
    },
    // 今天个数升序排列
    handleAscDaycou:function(DateList,NumData){
      var $this = this;
      var newArr = DateList;
      if(NumData=="0"){
         $this.arrListOne=[];
      }else{
         $this.arrListTwo=[];
      }
      newArr.sort(function(a, b) {
          var value1 = a.today_count;
          var value2 = b.today_count;
          return value1 - value2;
      });
      if(NumData=="0"){
          $this.arrListOne = newArr;
      }else{
          $this.arrListTwo = newArr;
      }
    },
    // 今天个数降序排列
    handleDesDaycou:function(DateList,NumData){
      var $this = this;
      var newArr = DateList;
      if(NumData=="0"){
         $this.arrListOne=[];
      }else{
         $this.arrListTwo=[];
      }
      newArr.sort(function(a, b) {
          var value1 = a.today_count;
          var value2 = b.today_count;
          return value2 - value1;
      });
      if(NumData=="0"){
          $this.arrListOne = newArr;
      }else{
          $this.arrListTwo = newArr;
      }
    },
    // 昨天个数升序排列
    handleAscYesdaycou:function(DateList,NumData){
      var $this = this;
      var newArr = DateList;
      if(NumData=="0"){
         $this.arrListOne=[];
      }else{
         $this.arrListTwo=[];
      }
      newArr.sort(function(a, b) {
          var value1 = a.yesterday_count;
          var value2 = b.yesterday_count;
          return value1 - value2;
      });
      if(NumData=="0"){
          $this.arrListOne = newArr;
      }else{
          $this.arrListTwo = newArr;
      }
    },
    // 昨天个数降序排列
    handleDesYesdaycou:function(DateList,NumData){
      var $this = this;
      var newArr = DateList;
      if(NumData=="0"){
         $this.arrListOne=[];
      }else{
         $this.arrListTwo=[];
      }
      newArr.sort(function(a, b) {
          var value1 = a.yesterday_count;
          var value2 = b.yesterday_count;
          return value2 - value1;
      });
      if(NumData=="0"){
          $this.arrListOne = newArr;
      }else{
          $this.arrListTwo = newArr;
      }
    },
    // 本月个数升序排列
    handleAscMonthcou:function(DateList,NumData){
      var $this = this;
      var newArr = DateList;
      if(NumData=="0"){
         $this.arrListOne=[];
      }else{
         $this.arrListTwo=[];
      }
      newArr.sort(function(a, b) {
          var value1 = a.month_count;
          var value2 = b.month_count;
          return value1 - value2;
      });
      if(NumData=="0"){
          $this.arrListOne = newArr;
      }else{
          $this.arrListTwo = newArr;
      }
    },
    // 本月个数降序排列
    handleDesMonthcou:function(DateList,NumData){
      var $this = this;
      var newArr = DateList;
      if(NumData=="0"){
         $this.arrListOne=[];
      }else{
         $this.arrListTwo=[];
      }
      newArr.sort(function(a, b) {
          var value1 = a.month_count;
          var value2 = b.month_count;
          return value2 - value1;
      });
      if(NumData=="0"){
          $this.arrListOne = newArr;
      }else{
          $this.arrListTwo = newArr;
      }
    },
    // 上月个数升序排列
    handleAscLastmonthcou:function(DateList,NumData){
      var $this = this;
      var newArr = DateList;
      if(NumData=="0"){
         $this.arrListOne=[];
      }else{
         $this.arrListTwo=[];
      }
      newArr.sort(function(a, b) {
          var value1 = a.lastmonth_count;
          var value2 = b.lastmonth_count;
          return value1 - value2;
      });
      if(NumData=="0"){
          $this.arrListOne = newArr;
      }else{
          $this.arrListTwo = newArr;
      }
    },
    // 上月个数降序排列
    handleDesLastmonthcou:function(DateList,NumData){
      var $this = this;
      var newArr = DateList;
      if(NumData=="0"){
         $this.arrListOne=[];
      }else{
         $this.arrListTwo=[];
      }
      newArr.sort(function(a, b) {
          var value1 = a.lastmonth_count;
          var value2 = b.lastmonth_count;
          return value2 - value1;
      });
      if(NumData=="0"){
          $this.arrListOne = newArr;
      }else{
          $this.arrListTwo = newArr;
      }
    },
    // 本月评比升序排列
    handleAscMonthcom:function(DateList,NumData){
      var $this = this;
      var newArr = DateList;
      if(NumData=="0"){
         $this.arrListOne=[];
      }else{
         $this.arrListTwo=[];
      }
      newArr.sort(function(a, b) {
          var value1 = a.month_comparison;
          var value2 = b.month_comparison;
          return value1 - value2;
      });
      if(NumData=="0"){
          $this.arrListOne = newArr;
      }else{
          $this.arrListTwo = newArr;
      }
    },
    // 本月评比降序排列
    handleDesMonthcom:function(DateList,NumData){
      var $this = this;
      var newArr = DateList;
      if(NumData=="0"){
         $this.arrListOne=[];
      }else{
         $this.arrListTwo=[];
      }
      newArr.sort(function(a, b) {
          var value1 = a.month_comparison;
          var value2 = b.month_comparison;
          return value2 - value1;
      });
      if(NumData=="0"){
          $this.arrListOne = newArr;
      }else{
          $this.arrListTwo = newArr;
      }
    },
    // 上月评比升序排列
    handleAscLastmonthcom:function(DateList,NumData){
      var $this = this;
      var newArr = DateList;
      if(NumData=="0"){
         $this.arrListOne=[];
      }else{
         $this.arrListTwo=[];
      }
      newArr.sort(function(a, b) {
          var value1 = a.lastmont_comparison;
          var value2 = b.lastmont_comparison;
          return value1 - value2;
      });
      if(NumData=="0"){
          $this.arrListOne = newArr;
      }else{
          $this.arrListTwo = newArr;
      }
    },
    // 上月评比降序排列
    handleDesLastmonthcom:function(DateList,NumData){
      var $this = this;
      var newArr = DateList;
      if(NumData=="0"){
         $this.arrListOne=[];
      }else{
         $this.arrListTwo=[];
      }
      newArr.sort(function(a, b) {
          var value1 = a.lastmont_comparison;
          var value2 = b.lastmont_comparison;
          return value2 - value1;
      });
      if(NumData=="0"){
          $this.arrListOne = newArr;
      }else{
          $this.arrListTwo = newArr;
      }
    },
  }
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
    }
    .bg-purple-light {
      background: #fff;
    }
  }
}
.row01{
  padding:0px;
  text-align: left;
  .row_tit{
    clear: both;
    display: block;
    font-size:18px;
    font-weight: bold;
    padding:10px 20px;
    border-bottom:1px solid #eee;
  }
  .row_box{
    span{
      float: left;
      width:15%;
      text-align:center;
      padding:5px 10px;
      border-left:1px solid #eee;
      &:first-child{
        border-left:0px solid #eee;
        width:10%;
      }
    }
    .row_boxTop{
       font-weight: bold;
       font-size:14px;;
       span{
            i{
              display: inline-block;
              width:16px;
              height: 17px;
              position: relative;
              top:2px;
              margin-left:5px;
              s{
                clear: both;
                display: block;
                cursor: pointer;
                position: absolute;
                left:0px;
                bottom:0px;
                width:100%;
                height:8px;
                line-height:8px;
                text-decoration: none;
                color:#ff9800;
                font-size:16px;
                &:first-child{
                  bottom:auto;
                  top:0px;
                }
                &:hover{
                color:#f60;
                }
              }
            }
       }
    }
    .row_boxMid{
       li{         
         color:#666;
         &:nth-child(odd){
            background:#f5f5f5;
         }
       }
    }
    .row_boxBom{
       background:#cdd5de;
       span{
         border-color:#d8e1ea;
       }
    }
  }
}
</style>
