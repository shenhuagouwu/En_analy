<template>
  <el-container direction="vertical">
    <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <i class="icon el-icon-position"></i>
            <el-breadcrumb-item>长尾词</el-breadcrumb-item>
        </el-breadcrumb>
    </el-header>
    <el-main>
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
                            <search-timeday class="timebox" v-on:childTimeDayData="listenTimeday"></search-timeday>
                            <span class="searchbtn" v-on:click="handleThemeBtn">查询</span>
                       </div>
                  </div>
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
import searchTimeday from "../public/searchTimeDay";
export default {
  name: 'loalldataPage',
  data() {
    return {
      DomainNa:[],      //域名询盘
      suffix:[],     //后缀询盘
      Theme:[],       //主题分布
      timeDayDate:{
        startDaytime:'',
        endDaytime:'', 
      },                              // 日期插件传递值
      startDaytime:'',                // 查询开始日期
      endDaytime:'',                  // 查询结束日期
      searchDomainNa:'',              // 查询域名
      searchName:'',                  // 查询姓名
      searchSuffix:'',                // 查询后缀
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
    $this.handleHostBtn();
    $this.handleHouzhuiBtn();
    $this.handleThemeBtn();
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
    getLongTailInfo:function(){
      var $this = this;
      $this.$api.get("/index/longword_liebiao?starttime=" + $this.startDaytime + "&endtime=" + $this.endDaytime + "&remark1=" + $this.searchName + "&host=" + $this.searchDomainNa + "&ym_hou=" + $this.searchSuffix,null,function(res) {
          if (res) {
            console.log(res,'$this.LongTailres'); 
            if(res.data!=''){
            var arr01=[];
            var arr02=[];
            res.data.forEach(function(item,index){
              var arrObj={
                area:'',
                datetimeday:'',
                datetimedate:'',
                host:'',
                key:'',
                mode:'',
                remark1:'',
                remark3:'',
                url:''
              }
              if(item.remark3=='组合一'&&item.remark3!=''){
                arrObj.area=item.area;
                arrObj.datetime=item.datetime;
                arrObj.datetimeday=item.datetime.split(" ")[0];
                arrObj.datetimedate=item.datetime.split(" ")[1];
                arrObj.host=item.host;
                arrObj.key=item.key;
                arrObj.mode=item.mode;
                arrObj.remark1=item.remark1;
                arrObj.remark3=item.remark3;
                arrObj.url=item.url;
                arr01.push(arrObj);
              }
              if(item.remark3=='组合三'&&item.remark3!=''){
                arrObj.area=item.area;
                arrObj.datetimeday=item.datetime.split(" ")[0];
                arrObj.datetimedate=item.datetime.split(" ")[1];
                arrObj.host=item.host;
                arrObj.key=item.key;
                arrObj.mode=item.mode;
                arrObj.remark1=item.remark1;
                arrObj.remark3=item.remark3;
                arrObj.url=item.url;
                arr02.push(arrObj);
              }
            });
            $this.LongTail.push(arr01,arr02);  
            console.log($this.LongTail,'$this.LongTail');
            }          
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
    //接收传递的时间
    listenTimeday:function(TDate){
      var $this=this;
      $this.timeDayDate=TDate;
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
      $this.TimePlug();
      $this.getThemeInfo();      //主题分布
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
