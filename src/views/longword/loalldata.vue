<template>
  <el-container direction="vertical">
    <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <i class="icon el-icon-position"></i>
            <el-breadcrumb-item>长尾词</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="searchtime">
              <search-timeday v-on:childTimeDayData="listenTimeday"></search-timeday>
              <span class="searchbtn" v-on:click="handleQueryBtn">查询</span>
        </div>
    </el-header>
    <el-main>
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content bg-purple-light">
                 <p class="piecharttit">域名询盘<font>(默认2020年2月至今)</font></p>
                 <div class="piechartbox"><columitalic-chart :columchartData="pieDomainNaData" v-if="pieDomainNaData.length>0" style="height:350px"></columitalic-chart></div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
                 <p class="piecharttit">后缀询盘询盘<font>(默认2020年2月至今)</font></p>
                 <div class="piechartbox"><colum-chart :columchartData="piesuffixData" v-if="piesuffixData.length>0" style="height:280px"></colum-chart></div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
                 <p class="piecharttit">主题分布询盘<font>(默认2020年2月至今)</font></p>
                 <div class="piechartbox"><pie-chart :piechartData="pieThemeData" v-if="pieThemeData.length>0" style="height:280px"></pie-chart></div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
              <div class="grid-content bg-purple-light">
                  <p class="piecharttit">长尾词站询盘-组合一<font>(默认当前一天)</font></p>
                  <ul class="sources">
                      <li v-for="(item,index) in LongTail.LongTail_02">
                          <strong>{{item.name}}</strong>
                          <span>{{item.count}}</span>
                      </li>
                      <li>
                          <strong>总计</strong>
                          <span>{{LongTail.num02}}</span>
                      </li>
                  </ul>
              </div>
          </el-col>
          <el-col :span="12">
              <div class="grid-content bg-purple-light">
                  <p class="piecharttit">长尾词站询盘-组合三<font>(默认当前一天)</font></p>
                  <ul class="sources">
                      <li v-for="(item,index) in LongTail.LongTail_01">
                          <strong>{{item.name}}</strong>
                          <span>{{item.count}}</span>
                      </li>
                      <li>
                          <strong>总计</strong>
                          <span>{{LongTail.num01}}</span>
                      </li>
                  </ul>
              </div>
          </el-col>
        </el-row>
    </el-main>
  </el-container>
</template>
<script>
import PieChart from "../chart/PieChart";
import ColumitalicChart from "../chart/ColumitalicChart";
import ColumChart from "../chart/ColumChart";
import searchTimeday from "../public/searchTimeDay";
export default {
  name: 'loalldataPage',
  data() {
    return {
      DomainNa:[],      //域名询盘
      suffix:[],     //后缀询盘
      Theme:[],       //主题分布
      LongTail:[],
      timeDayDate:{
        startDaytime:'',
        endDaytime:'', 
      },                              // 日期插件传递值
      startDaytime:'',                // 查询开始日期
      endDaytime:'',                  // 查询结束日期
      pieDomainNaData:[], //饼图需要传过去的域名询盘数据
      piesuffixData:[], //饼图需要传过去的后缀询盘数据
      pieThemeData:[], //饼图需要传过去的主题分布数据
    }
  },
  components: {
    PieChart,
    ColumChart,
    ColumitalicChart,
    searchTimeday
  },
  mounted() {
    var $this=this;
    $this.handleQueryBtn();
  },
  methods: {
    getDomainNaInfo:function(){
      var $this = this;      
      $this.$api.get("/index/ym_changwei?starttime=" + $this.startDaytime + "&endtime=" + $this.endDaytime,null,function(res) {
          if (res) {
            var arrlist=[];
            res.data.forEach(function(item,index){
               var arrObj={
                  name:'',
                  count:0,
               };               
                var hostArr=[]
                hostArr=item.host.split('.');
                if(hostArr.length>2){
                  arrObj.name=hostArr[1] + '.' + hostArr[2]
                }else{
                  arrObj.name=hostArr[0] + '.' + hostArr[1]
                }
               arrObj.count=item.count;
               arrlist.push(arrObj);
            });
            $this.DomainNa=$this.CustomSort(arrlist);
            $this.DomainNaPieChart($this.DomainNa);
          }
        }
      );
    },
    getsuffixInfo:function(){
      var $this = this;      
      $this.$api.get("/index/houzhui_changwei?starttime=" + $this.startDaytime + "&endtime=" + $this.endDaytime,null,function(res) {
          if (res) {
            var arrlist=[];
            res.data.forEach(function(item,index){
               var arrObj={
                  name:'',
                  count:0,
               };
               arrObj.name=item.ym_hou;
               arrObj.count=item.count;
               arrlist.push(arrObj);
            });
            $this.suffix=$this.CustomSort(arrlist);
            $this.suffixPieChart($this.suffix);
          }
        }
      );
    },
    getThemeInfo:function(){
      var $this = this;
      $this.$api.get("/index/zhuti_changwei?starttime=" + $this.startDaytime + "&endtime=" + $this.endDaytime,null,function(res) {
          if (res) {
            var arrlist=[];
            res.data.forEach(function(item,index){
               if(item.zhuti==""||item.zhuti==undefined||item.zhuti==null){
                 item.zhuti="无主题"
               }
               var arrObj={
                  name:'',
                  count:0,
                  s:0,
                  percent:0,
               };
               arrObj.name=item.zhuti;
               arrObj.count=item.n;
               arrObj.s=item.s;
               arrObj.percent=parseFloat(item.rat);
               arrlist.push(arrObj);
            });
            $this.Theme=$this.CustomSort(arrlist);
            var arrTheme=[];
            $this.Theme.forEach(function(item, index) {
                if(index<=10){
                  arrTheme.push(item);
                }         
            });
            $this.pieThemeData=arrTheme;
          }
        }
      );
    },
    getLongTailInfo:function(){
      var $this = this;
      $this.$api.get("/index/day_longword?starttime=" + $this.startDaytime + "&endtime=" + $this.endDaytime,null,function(res) {
          if (res) {
            console.log(res,'longtail');
            $this.LongTail=[];
            var LongTail_01=[];
            var LongTail_02=[];
            var arrlist=[];
            res.data.forEach(function(item,index){
              var arrObj={
                name:'',
                count:0
              }
              if(item.zu=="1"){
                arrObj.name=item.remark1;
                arrObj.count=item.count;
                LongTail_01.push(arrObj);
              }
              if(item.zu=="2"){
                arrObj.name=item.remark1;
                arrObj.count=item.count;
                LongTail_02.push(arrObj);
              }
            });
            var num01=0;
            var num02=0;
            LongTail_01.forEach(function(item,index){
                 num01 += item.count;
            });
            LongTail_02.forEach(function(item,index){
                 num02 += item.count;
            });
            $this.LongTail.LongTail_01=$this.CustomSort(LongTail_01);
            $this.LongTail.LongTail_02=$this.CustomSort(LongTail_02);
            $this.LongTail.num01=num01;
            $this.LongTail.num02=num02;
            console.log($this.LongTail,'$this.LongTail');
          }
        }
      );
    },
    //排序函数
    CustomSort:function(SortData){
        var SortD=SortData;
        var t='';
        for(var i=0;i<SortD.length;i++){
          for(var j=0;j<SortD.length;j++){
            if(SortD[i].count>SortD[j].count){
                t = SortD[i];
                SortD[i] = SortD[j];
                SortD[j] = t;
            }
          };
        };
        return SortData;
    },
    DomainNaPieChart:function(DomainNaData){
      var $this=this;
      var dataobj = DomainNaData; //原始对象
      var arrlist = [];
      dataobj.forEach(function(item,index){
          if(index<=14){
            arrlist.push(item);
          }
      });
      $this.pieDomainNaData=arrlist;
    },
    suffixPieChart:function(suffixData){
      var $this=this;
      var dataobj = suffixData; //原始对象
      var arrlist = [];
      dataobj.forEach(function(item,index){
           arrlist.push(item);
      });
      $this.piesuffixData=arrlist;
    },
    //时间插件
    TimePlug:function(){
      var $this = this;
      if($this.timeDayDate.startDaytime!=''&&$this.timeDayDate.endDaytime!=''){
          $this.startDaytime=$this.timeDayDate.startDaytime;
          $this.endDaytime=$this.timeDayDate.endDaytime;
      }else{
          $this.startDaytime='';
          $this.endDaytime='';
      }
    },
    //点击查询事件
    handleQueryBtn:function(){
      var $this = this;
      $this.pieDomainNaData=[];
      $this.piesuffixData=[];
      $this.pieThemeData=[];
      $this.TimePlug();
      $this.getDomainNaInfo();     //域名询盘
      $this.getsuffixInfo();    //后缀询盘
      $this.getThemeInfo();      //主题分布
      $this.getLongTailInfo();
    },
    //接收传递的时间
    listenTimeday:function(TDate){
      var $this=this;
      $this.timeDayDate=TDate;
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
      //padding: 20px;
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
.sources{  
    clear: both;
    display: block;
    //padding:5px 0px;
    li{
      clear: both;
      display: block;
      text-align: left;
      overflow: hidden;
      padding:12px 20px;
      line-height:24px;
      border-top:1px solid #e8e8ea;
      &:first-child{border-top:0px;}
      strong{
        font-size: 15px;
        color: #666;
        line-height:24px;
        display: inline-block;
        font-weight: normal;
        i{
          float: left;
          width:25px;
          margin-right: 10px;
          margin-top:4px;
          img{width: 100%;display: block;}
        }
      }
      span{
        float: right;
        text-align: right;
        line-height:24px;
        font-style: normal;
        font-size: 15px;
        font-weight: bold;
        display: inline-block;
        color: #3e404f;
      }
    }
}
</style>
