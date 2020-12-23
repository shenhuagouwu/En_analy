<template>
  <el-container direction="vertical">
    <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <i class="icon el-icon-position"></i>
            <el-breadcrumb-item>长尾词</el-breadcrumb-item>
        </el-breadcrumb>
    </el-header>
    <el-scrollbar style="height:100%">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content bg-purple-light">
                  <div class="piecharttit">
                       <strong>网站统计</strong>
                       <div class="searchtime">
                            <nodefault-searchtime class="timebox" v-on:childNoTimeData="listenNoTimeMonth"></nodefault-searchtime>
                            <span class="searchbtn" v-on:click="handleSiteBtn">查询</span>
                       </div>                      
                        <span class="sucbtn">
                            <i @click="inBrandnum=0" :class="{active:inBrandnum==0}">新站成功率</i>
                            <i @click="inBrandnum=1" :class="{active:inBrandnum==1}">成功站个数</i>
                            <i @click="inBrandnum=2" :class="{active:inBrandnum==2}">总站个数</i>
                            <i @click="inBrandnum=3" :class="{active:inBrandnum==3}">个人询盘</i>
                        </span>
                  </div>
                  <div class="piechartbox" v-if="inBrandnum==0">
                      <sitecostline-chartone :linechartData="pienewSiteSucData" :key="new Date().getTime()" v-if="pienewSiteSucData.length>0" style="height:300px"></sitecostline-chartone>
                  </div>
                  <div class="piechartbox" v-if="inBrandnum==1">
                      <sitecostline-charttwo :sitecostlineData="pieSucSiteNumData" :key="new Date().getTime()" v-if="pieSucSiteNumData.length>0" style="height:300px"></sitecostline-charttwo>
                  </div>
                  <div class="piechartbox" v-if="inBrandnum==2">
                      <sitecostline-charttwo :sitecostlineData="pieTotalSiteNumData" :key="new Date().getTime()" v-if="pieTotalSiteNumData.length>0" style="height:300px"></sitecostline-charttwo>
                  </div>
                  <div class="piechartbox" v-if="inBrandnum==3">
                      <sitecostline-charttwo :sitecostlineData="pieTotalPersonNumData" :key="new Date().getTime()" v-if="pieTotalPersonNumData.length>0" style="height:300px"></sitecostline-charttwo>
                  </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content bg-purple-light">
                  <div class="piecharttit">
                       <strong>域名询盘</strong>
                       <font>(默认2020年2月至今)</font>
                       <div class="searchtime">
                            <search-timeday  class="timebox" v-on:childTimeDayData="listenTimeday"></search-timeday>
                            <span class="searchbtn" v-on:click="handleHostBtn">查询</span>
                       </div>
                  </div>
                 <div class="piechartbox"><columitalic-chart :columchartData="pieDomainNaData" v-if="pieDomainNaData.length>0" style="height:350px"></columitalic-chart></div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
                  <div class="piecharttit">
                       <strong>后缀询盘询盘</strong>
                       <font>(默认2020年2月至今)</font>
                       <div class="searchtime">
                            <search-timeday class="timebox" v-on:childTimeDayData="listenTimeday"></search-timeday>
                            <span class="searchbtn" v-on:click="handleHouzhuiBtn">查询</span>
                       </div>
                  </div>
                 <div class="piechartbox"><colum-chart :columchartData="piesuffixData" v-if="piesuffixData.length>0" style="height:280px"></colum-chart></div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
                  <div class="piecharttit">
                       <strong>主题分布询盘</strong>
                       <font>(默认2020年2月至今)</font>
                       <div class="searchtime">                            
                            <search-time class="timebox" v-on:childTimeData="listenTimeMonth"></search-time>
                            <span class="searchbtn" v-on:click="handleThemeBtn">查询</span>
                       </div>
                  </div>
                 <div class="piechartbox"><pie-chart :piechartData="pieThemeData" v-if="pieThemeData.length>0" style="height:280px"></pie-chart></div>
            </div>
          </el-col>
        </el-row>
    </el-scrollbar>
  </el-container>
</template>
<script>
import LineChartone from "../chart/LineChartone";
import SitecostlineChartone from "../chart/SitecostlineChartone";
import SitecostlineCharttwo from "../chart/SitecostlineCharttwo";
import SitecostlineChartthree from "../chart/SitecostlineChartthree";
import PieChart from "../chart/PieChart";
import ColumitalicChart from "../chart/ColumitalicChart";
import ColumChart from "../chart/ColumChart";
import searchTimeday from "../public/searchTimeDay";
import searchTime from "../public/searchTime";
import nodefaultSearchtime from "../public/nodefaultSearchtime";
export default {
  name: 'loalldataPage',
  data() {
    return {
      inBrandnum:0,
      DomainNa:[],         //域名询盘
      suffix:[],           //后缀询盘
      Theme:[],            //主题分布
      SiteStat:[],         //网站统计

      timeDayDate:{
        startDaytime:'',
        endDaytime:'', 
      },                              // 日期插件传递值
      startDaytime:'',                // 查询开始日期
      endDaytime:'',                  // 查询结束日期

      timeMonthDate:{
        starttime:'',
        endtime:'', 
      },                              // 月份插件传递值
      startMonthtime:'',                // 查询开始月份
      endMonthtime:'',                  // 查询结束月份

      timeNoMonthDate:{
        starttime:'',
        endtime:'', 
      }, 
      startNoMonthtime:'',                // 查询开始月份
      endNoMonthtime:'',                  // 查询结束月份


      searchDomainNa:'',              // 查询域名
      searchName:'',                  // 查询姓名
      searchSuffix:'',                // 查询后缀
      pieDomainNaData:[], //饼图需要传过去的域名询盘数据
      piesuffixData:[], //饼图需要传过去的后缀询盘数据
      pieThemeData:[], //饼图需要传过去的主题分布数据
      pienewSiteSucData:[],       //新站成功率
      pieSucSiteNumData:[],       //成功站个数
      pieTotalSiteNumData:[],     //总站个数
      pieTotalPersonNumData:[],     //个人询盘
    }
  },
  components: {
    PieChart,
    ColumChart,
    ColumitalicChart,
    searchTimeday,
    searchTime,
    nodefaultSearchtime,
    LineChartone,
    SitecostlineChartone,
    SitecostlineCharttwo,
    SitecostlineChartthree
  },
  mounted() {
    var $this=this;
    $this.handleHostBtn();
    $this.handleHouzhuiBtn();
    $this.handleThemeBtn();
    $this.handleSiteBtn();
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
               if(item.zhuti!=""||item.zhuti!=undefined||item.zhuti!=null){
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
               }
            });
            $this.Theme=$this.CustomSort(arrlist);
            var arrTheme=[];
            $this.Theme.forEach(function(item, index) {
                if(index<10){
                  arrTheme.push(item);
                }         
            });
            $this.pieThemeData=arrTheme;
          }
        }
      );
    },
    getSiteStatInfo:function(){
      var $this = this;
      $this.$api.get("/index/conversion_longword?starttime=" + $this.startNoMonthtime + "&endtime=" + $this.endNoMonthtime,null,function(res) {
        if(res.data.length>0){   
          console.log(res.data,"res.data");     
          var arrlist=[];
          res.data.forEach(function(item,index){
            item.forEach(function(items,indexs){
                var arrObj={
                    name:'',
                    times:'',
                    domain_number:0,
                    xunpan_number:0,
                    conversion:0,
                };
                arrObj.name=items.name;
                arrObj.times=items.times;
                arrObj.domain_number=items.domain_number;
                arrObj.xunpan_number=items.xunpan_number;
                arrObj.conversion=items.conversion;
                arrlist.push(arrObj);
            });
          });
          $this.SiteStat=arrlist;
          $this.newSiteSucPieChart($this.SiteStat);
          $this.SucSiteNumPieChart($this.SiteStat);
          $this.TotalSiteNumPieChart($this.SiteStat);
        }
      });
      $this.$api.get("/index/month_people_doamin?starttime=" + $this.startNoMonthtime + "&endtime=" + $this.endNoMonthtime,null,function(res) {
        if(res.data.length>0){            
          var arrlist=[];
          res.data.forEach(function(item,index){
            item.forEach(function(items,indexs){
                var arrObj={
                    name:'',
                    time:'',
                    count:0,
                };
                arrObj.name=items.name;
                arrObj.time=items.times;
                arrObj.count=items.count;
                arrlist.push(arrObj);
            });
          });
          $this.pieTotalPersonNumData=arrlist;
        }  
      });
    },
    //新站成功率
    newSiteSucPieChart:function(ListData){
        var $this=this;
        var EnData=ListData;
        var arrlist=[];
        EnData.forEach(function(item,index){
          var arrObj={
              name:'',
              percent:0,
              time:''
          };
          arrObj.name=item.name;
          arrObj.percent=Math.floor(item.conversion * 10000)/100;
          arrObj.time=item.times;
          arrlist.push(arrObj);
        });
        $this.pienewSiteSucData=arrlist;
        console.log($this.pienewSiteSucData,'$this.pienewSiteSucData');
    },
    //成功站个数
    SucSiteNumPieChart:function(ListData){
        var $this=this;
        var EnData=ListData;
        var arrlist=[];
        EnData.forEach(function(item,index){
            var arrObj={
                name:'',
                count:0,
                time:''
            };
            arrObj.name=item.name;
            arrObj.count=item.xunpan_number;
            arrObj.time=item.times;
            arrlist.push(arrObj);
        });
        $this.pieSucSiteNumData=arrlist;
        console.log($this.pieSucSiteNumData,'$this.pieSucSiteNumData');
    },
    //总站个数
    TotalSiteNumPieChart:function(ListData){
        var $this=this;
        var EnData=ListData;
        var arrlist=[];
        EnData.forEach(function(item,index){
            var arrObj={
                name:'',
                count:0,
                time:''
            };
            arrObj.name=item.name;
            arrObj.count=item.domain_number;
            arrObj.time=item.times;
            arrlist.push(arrObj);
        });
        $this.pieTotalSiteNumData=arrlist;
        console.log($this.pieTotalSiteNumData,'$this.pieTotalSiteNumData');
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
    //无默认接收传递的时间  年-月
    listenNoTimeMonth:function(TDate){
      var $this=this;
      $this.timeNoMonthDate=TDate;
    },
    //无默认时间插件  年-月
    TimeNoMonthPlug:function(){
      var $this = this;
      if($this.timeNoMonthDate.starttime!=''&&$this.timeNoMonthDate.endtime!=''){
          $this.startNoMonthtime=$this.timeNoMonthDate.starttime + '-01';
          $this.endNoMonthtime=$this.timeNoMonthDate.endtime + '-01';
      }else{
          $this.startNoMonthtime='';
          $this.endNoMonthtime='';
      }
    },
    //接收传递的时间  年-月
    listenTimeMonth:function(TDate){
      var $this=this;
      $this.timeMonthDate=TDate;
    },
    //时间插件  年-月
    TimeMonthPlug:function(){
      var $this = this;
      if($this.timeMonthDate.starttime!=''&&$this.timeMonthDate.endtime!=''){
          $this.startMonthtime=$this.timeMonthDate.starttime + '-01';
          $this.endMonthtime=$this.timeMonthDate.endtime + '-01';
      }else{
          $this.startMonthtime='';
          $this.endMonthtime='';
      }
    },
    //接收传递的时间  年-月-日
    listenTimeday:function(TDate){
      var $this=this;
      $this.timeDayDate=TDate;
    },
    //时间插件  年-月-日
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
    handleHostBtn:function(){
      var $this = this;
      $this.pieDomainNaData=[];
      $this.TimePlug();
      $this.getDomainNaInfo();     //域名询盘
    },
    handleHouzhuiBtn:function(){
      var $this = this;
      $this.piesuffixData=[];
      $this.TimePlug();
      $this.getsuffixInfo();    //后缀询盘
    },
    handleThemeBtn:function(){
      var $this = this;
      $this.pieThemeData=[];
      $this.TimeMonthPlug();
      $this.getThemeInfo();      //主题分布
    },
    handleSiteBtn:function(){
      var $this = this;
      $this.TimeNoMonthPlug();
      $this.getSiteStatInfo();
    }
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
.piecharttit{
  clear: both;
  display: block;
  text-align: left;
  padding:10px 15px;
  font-size:16px;
  font-weight: bold;
  color: #333;
  .sucbtn{
    float: right;
    padding-right: 30px;
    i{
      float: left;
      font-style: normal;
      font-size: 14px;
      border: 1px solid #ccc;
      background: #f5f5f5;
      margin-left: -1px;
      padding:7px 18px;
      line-height: 1;
      cursor: pointer;
      font-weight: normal;
      color: #666;
      &.active{
        background:#0277d5;
        border:1px solid #0277d5;
        color: #fff;
      }
      &:first-child{
        border-top-left-radius:3px;
        border-bottom-left-radius:3px;
      }
      &:first-child+i+i{
        border-top-right-radius:3px;
        border-bottom-right-radius:3px;
      }
    }
  }
}
.sources{  
    clear: both;
    display: block;
    padding:5px 20px;
    overflow: hidden;
      margin-left:-2%;
    ul{
      float: left;
      margin-left:2%;
      width: 48%;
      padding-top:15px;
      li{
        clear: both;
        display: block;
        text-align: left;
        overflow: hidden;
        padding:12px 0px;
        line-height:24px;
        &.sources_tit{
          clear: both;
          overflow: hidden;
          background: #e9eef3;
          border-radius: 10px;
          span{
            float: left;
            line-height:24px;
            font-size: 15px;
            color: #3e404f;
            font-weight: bold;
            height: 24px;
          }
        }
        &.sources_main{
          clear: both;
          overflow: hidden;
          border-bottom:1px solid #e8e8ea;
          span{
            float: left;
            line-height:24px;
            font-size: 14px;
            min-height: 24px;
            word-break: break-all;
            &.span02{
              height:auto;
              min-height:24px;
              i{
                display:inline-block;
                font-style: normal;
                  cursor: pointer;  
                  &:hover{
                    color: #f60;
                  }
              }
            }
            &.span06{
               font-size: 14px;
            }
          }
        }
        &:last-child{
          border-bottom:0px;
        }
      }
    }
}
.searchtime {
    /deep/ .timebox {
        padding: 3px 10px!important;
        height: 30px!important;
        line-height: 24px!important;
        .el-input__icon {
            line-height: 24px!important;
        }
        &.el-date-editor .el-range-separator {
            line-height: 24px!important;
        }
        &.el-date-editor .el-range__icon{
            line-height: 24px!important;
        }
    }
    /deep/ .searchbtn {
        font-size: 14px;
        height: 30px!important;
        padding: 0px 10px;
    }
}
.searchdl {
  float: right;
  dd{
    float: left;
    width: 150px;
    margin-right: 15px;
    /deep/ .el-input__inner{height:30px!important; line-height:28px!important;}
    /deep/ .el-input__icon{line-height:30px!important;}
  }
  dt{
    float: left;
    /deep/ .timebox {
        padding: 3px 10px!important;
        height: 30px!important;
        line-height: 24px!important;
        .el-input__icon {
            line-height: 24px!important;
        }
        &.el-date-editor .el-range-separator {
            line-height: 24px!important;
            width: auto!important;
        }
        &.el-date-editor .el-range__icon{
            line-height: 24px!important;
        }
    }
    /deep/ .searchbtn {
        float: right;
        background: #21262e;
        color: #fff;
        border-radius: 5px;
        line-height: 30px;
        margin-left: 15px;
        font-size: 14px;
        height: 30px!important;
        padding: 0px 10px;
        cursor: pointer;
        &:hover {
          background: #f13331;
        }
    }
  }
}
.Personallong{
  clear: both;
  overflow: hidden;
  padding-top:15px;
  dt{
    float: left;
    width:8.5%;
    text-align: left;
    padding: 10px 15px;
    cursor: pointer;
    background: #f7f7f7;
    border-radius: 10px;
    margin-left: 1%;
    text-align: left;
    font-size: 14px;
    color: #647698;
    font-weight: bold;
    i{
      float: left;
      font-size: 16px;
      color: #647698;
      margin-right: 7px;
      margin-top: 7px;
    }
    span{
      float: right;
      color: #0277d5;
      font-size: 14px;
    }
  }
}
.span01{width:10%; text-align:center;color: #3e404f;}
.span02{
  width:28%;
  text-align:left;
  color: #3e404f;
}
.span03{width:10%; text-align:left;color: #3e404f;}
.span04{width:10%; text-align:left;color: #3e404f;}
.span05{width:30%; text-align:left;color: #3e404f;}
.span06{
  width:12%; text-align:left;color: #3e404f;position: relative;
    
  i{
    clear: both;
    display: block;
    font-style: normal;
    font-size: 12px;
    color: #bfbfbf;
    line-height: 1;
    margin-top: -6px;
  }
}
</style>
