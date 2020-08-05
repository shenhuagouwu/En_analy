<template>
  <el-container direction="vertical">
    <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <i class="icon el-icon-position"></i>
            <el-breadcrumb-item>长尾词</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="searchtime">
              <search-time v-on:childTimeData="listenTime"></search-time>
              <span class="searchbtn" v-on:click="handleQueryBtn">查询</span>
        </div>
    </el-header>
    <el-main>
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content bg-purple-light">
                 <p class="piecharttit">域名询盘</p>
                 <div class="piechartbox"><columitalic-chart :columchartData="pieDomainNaData" v-if="pieDomainNaData.length>0" style="height:350px"></columitalic-chart></div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
                 <p class="piecharttit">后缀询盘询盘</p>
                 <div class="piechartbox"><colum-chart :columchartData="piesuffixData" v-if="piesuffixData.length>0" style="height:280px"></colum-chart></div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
                 <p class="piecharttit">主题分布询盘</p>
                 <div class="piechartbox"><pie-chart :piechartData="pieThemeData" v-if="pieThemeData.length>0" style="height:280px"></pie-chart></div>
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
import SearchTime from "../public/searchTime";
export default {
  name: 'loalldataPage',
  data() {
    return {
      DomainNa:[],      //域名询盘
      suffix:[],     //后缀询盘
      Theme:[],       //主题分布
      timeDate:{
        starttime:'',
        endtime:'',
      },                //时间插件传递值
      starttime:'',     //查询开始时间
      endtime:'',       //查询结束时间
      pieDomainNaData:[], //饼图需要传过去的域名询盘数据
      piesuffixData:[], //饼图需要传过去的后缀询盘数据
      pieThemeData:[], //饼图需要传过去的主题分布数据
    }
  },
  components: {
    PieChart,
    ColumChart,
    ColumitalicChart,
    SearchTime
  },
  mounted() {
    var $this=this;
    $this.handleQueryBtn();
  },
  methods: {
    getDomainNaInfo:function(){
      var $this = this;      
      $this.$api.get("http://172.16.10.128:8031/index/ym_changwei?starttime=" + $this.starttime + "&endtime=" + $this.endtime,null,function(res) {
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
      $this.$api.get("http://172.16.10.128:8031/index/houzhui_changwei?starttime=" + $this.starttime + "&endtime=" + $this.endtime,null,function(res) {
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
      $this.$api.get("http://172.16.10.128:8031/index/zhuti_changwei?starttime=" + $this.starttime + "&endtime=" + $this.endtime,null,function(res) {
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
            $this.ThemePieChart($this.Theme);
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
    ThemePieChart:function(ThemeData){
      var $this=this;
      var dataobj = ThemeData;
      var arrlist = [];
      var otherObj={
        name:'其它',
        count:0,
        s:0,
        percent:0,
      }
      dataobj.forEach(function(item, index) {
          if(index<=10){
            arrlist.push(item);
          }else{
            otherObj.count += item.count;
            otherObj.s = item.s;
            otherObj.percent += item.percent;
          }          
      });
      if(otherObj.percent!=0){
        arrlist.push(otherObj);
      }
      $this.pieThemeData=arrlist;
    },
    //时间插件
    TimePlug:function(TimeData){
      var $this = this;
      if(TimeData==''){
          $this.starttime='';
          $this.endtime='';
      }else{
          $this.starttime=TimeData.starttime;
          $this.endtime=TimeData.endtime;
      }
    },
    //点击查询事件
    handleQueryBtn:function(){
      var $this = this;
      $this.TimePlug($this.timeDate);
      $this.getDomainNaInfo();     //域名询盘
      $this.getsuffixInfo();    //后缀询盘
      $this.getThemeInfo();      //主题分布
    },
    //接收传递的时间
    listenTime:function(TDate){
      var $this=this;
      $this.timeDate=TDate;
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
      .piecharttit{
        clear: both;
        display: block;
        text-align: left;
        padding:5px 15px;
        font-size:16px;
        font-weight: bold;
        color: #333;
        background: #f9f9f9;        
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
