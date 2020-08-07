<template>
  <el-scrollbar style="height:100%">
      <el-header>
          <el-breadcrumb separator-class="el-icon-arrow-right">
              <i class="icon el-icon-position"></i>
              <el-breadcrumb-item>SNS</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="searchtime">
              <search-time v-on:childTimeData="listenTime"></search-time>
              <span class="searchbtn" v-on:click="handleQueryBtn">查询</span>
          </div>
      </el-header>
      <el-main>
          <el-row :gutter="20">
            <el-col :span="3" v-for="(item,index) in personal" :key="index">
              <dl class="grid-content bg-purple-light perclass" v-on:click="handleClick(item.name)">
                  <dt><i class="el-icon-user-solid"></i>{{item.name}}<span>{{item.count}}</span></dt>
                  <dd><el-progress :show-text="false" :percentage="Math.floor(item.count/item.total * 10000)/100"></el-progress></dd>
              </dl>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                  <p class="piecharttit">国家询盘<i v-on:click="handleMore(Countrie,'国家')" class="el-icon-more icon"></i></p>
                  <div class="piechartbox"><pie-chart :piechartData="pieCountrieData" v-if="pieCountrieData.length>0" style="height:300px"></pie-chart></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                  <p class="piecharttit">大洲询盘<i v-on:click="handleMore(Continent,'大洲')" class="el-icon-more icon"></i></p>
                  <div class="piechartbox"><pie-chart :piechartData="pieContinentData" v-if="pieContinentData.length>0" style="height:300px"></pie-chart></div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                  <p class="piecharttit">渠道询盘<i v-on:click="handleMore(Channel,'渠道')" class="el-icon-more icon"></i></p>
                  <div class="piechartbox"><pie-chart :piechartData="pieChannelData" v-if="pieChannelData.length>0" style="height:300px"></pie-chart></div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="grid-content bg-purple-light">
                  <p class="piecharttit">三组询盘对比</p>
                  <div class="piechartbox"><line-chartone :linechartData="lineEncomparedData" v-if="lineEncomparedData.length>0" style="height:300px"></line-chartone></div>
              </div>
            </el-col>
          </el-row>
      </el-main> 
      <modal-dialog v-on:childData="listenModal" v-bind:ModalDog="ModalDog" v-if="showAbs"></modal-dialog>
      <p class="mask" v-if="showMask"></p>
  </el-scrollbar>
</template>
<script>
import { mapGetters } from "vuex";
import PieChart from "../chart/PieChart";
import LineChartone from "../chart/LineChartone";
import SearchTime from "../public/searchTime";
import ModalDialog from "./components/Modaldialog";
export default {
  name: 'snsalldataPage',
  data() {
    return {
      Countrie:[],      //国家
      Continent:[],     //大洲
      Channel:[],       //渠道
      personal:[],       //个人询盘
      Encompared:[],       //三组询盘对比
      timeDate:{
        starttime:'',
        endtime:'',
      },                //时间插件传递值
      starttime:'',     //查询开始时间
      endtime:'',       //查询结束时间
      pieCountrieData:[], //饼图需要传过去的国家数据
      pieContinentData:[], //饼图需要传过去的大洲数据
      pieChannelData:[], //饼图需要传过去的渠道数据
      lineEncomparedData:[], //三组询盘对比线型图传递过去的渠道数据
      showMask:false,
      showAbs:false,
      ModalDog:{
        ModalDogData:[],
        type:""
      },     //向弹出框传递数据
    }
  },
  components: {
    PieChart,
    LineChartone,
    SearchTime,
    ModalDialog
  },
  mounted() {
    var $this=this;
    $this.handleQueryBtn();
  },
  methods: {
    getCountrieInfo:function(){
      var $this = this;
      $this.$api.get("http://172.16.10.128:8031/index/sns_group_area?starttime=" + $this.starttime + "&endtime=" + $this.endtime,null,function(res) {
          if (res) {
            var arrlist=[];
            var chinaObj={
              name:'中国',
              count:0,
              s:0,
              percent:0,
            }
            res.data.forEach(function(item,index){
               var arrObj={
                  name:'',
                  count:0,
                  s:0,
                  percent:0,
               };
              if(item.area.indexOf("中国") >= 0){
                chinaObj.count += item.n;
                chinaObj.s = item.s;
                chinaObj.percent += parseFloat(item.rat);
              }else{
                arrObj.name=item.area;
                arrObj.count=item.n;
                arrObj.s=item.s;
                arrObj.percent=parseFloat(item.rat);
                arrlist.push(arrObj);
              }              
            });
            if(chinaObj.percent!=0){
              arrlist.push(chinaObj);
            }
            $this.Countrie=$this.CustomSort(arrlist);
            $this.CountriePieChart($this.Countrie);
          }
        }
      );
    },
    getContinentInfo:function(){
      var $this = this;      
      $this.$api.get("http://172.16.10.128:8031/index/sns_group_continent?starttime=" + $this.starttime + "&endtime=" + $this.endtime,null,function(res) {
          if (res) {
            var arrlist=[];
            res.data.forEach(function(item,index){
               var arrObj={
                  name:'',
                  count:0,
                  s:0,
                  percent:0,
               };
               arrObj.name=item.continent;
               arrObj.count=item.n;
               arrObj.s=item.s;
               arrObj.percent=parseFloat(item.rat);
               arrlist.push(arrObj);
            });
            $this.Continent=$this.CustomSort(arrlist);
            $this.ContinentPieChart($this.Continent);
          }
        }
      );
    },
    getChannelInfo:function(){
      var $this = this;
      $this.$api.get("http://172.16.10.128:8031/index/sns_group_qudao?starttime=" + $this.starttime + "&endtime=" + $this.endtime,null,function(res) {
          if (res) {
            var arrlist=[];
            res.data.forEach(function(item,index){
               var arrObj={
                  name:'',
                  count:0,
                  s:0,
                  percent:0,
               };
               arrObj.name=item.remark2;
               arrObj.count=item.n;
               arrObj.s=item.s;
               arrObj.percent=parseFloat(item.rat);
               arrlist.push(arrObj);
            });
            $this.Channel=$this.CustomSort(arrlist);
            $this.ChannelPieChart($this.Channel);
          }
        }
      );
    },
    getpersonalInfo:function(){
      var $this = this;
      $this.$api.get("http://172.16.10.128:8031/index/sns?starttime=" + $this.starttime + "&endtime=" + $this.endtime,null,function(res) {
          if (res) {
            var totalNum=0;
            var arrlist=[];
            res.data.forEach(function(item,index){
               var arrObj={
                  name:'',
                  count:0,
                  total:0
               };
               if(item.remark1 != ""){
                 arrObj.name=item.remark1;
                 arrObj.count=item.count;
                 totalNum += item.count;
                 arrlist.push(arrObj);
               }             
            });
            arrlist.forEach(function(item,index){
                item.total=totalNum;
            });
            $this.personal=arrlist;
          }
        }
      );
    },
    getEncomparedInfo:function(){
      var $this = this;
      $this.$api.get("http://172.16.10.128:8031/index/sns_group?starttime=" + $this.starttime + "&endtime=" + $this.endtime,null,function(res) {
          if (res) {
            $this.Encompared=res.data;
            $this.EncomparedLineChart($this.Encompared);
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
    CountriePieChart:function(CountrieData){
      var $this=this;
      var dataobj = CountrieData; //原始对象
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
      $this.pieCountrieData=arrlist;
    },
    ContinentPieChart:function(ContinentData){
      var $this=this;
      var dataobj = ContinentData; //原始对象
      var arrlist = [];
      dataobj.forEach(function(item, index) {
          arrlist.push(item);
      });
      $this.pieContinentData=arrlist;
    },
    ChannelPieChart:function(ChannelData){
      var $this=this;
      var dataobj = ChannelData; //原始对象
      var arrlist = [];
      var otherObj={
        name:'未知渠道',
        count:0,
        s:0,
        percent:0,
      }
      dataobj.forEach(function(item, index) {
          if(item.name==""||item.name=="未知"){
            otherObj.count += item.count;
            otherObj.s = item.s;
            otherObj.percent += item.percent;
          }else{
            arrlist.push(item);
          }
      }); 
      if(otherObj.percent!=0){
         arrlist.push(otherObj); 
      }
      $this.pieChannelData=arrlist;
    },
    EncomparedLineChart:function(EncomparedData){
      var $this=this;
      var dataobj = EncomparedData; //原始对象
      var arrlist = [];
      dataobj.forEach(function(item, index) {
          var arrlistObj={
            name:'',
            count:0,
            time:'',
          }
          arrlistObj.name='英文' + item.zubie + '组';
          arrlistObj.count=item.count;
          arrlistObj.time=item.date;
          arrlist.push(arrlistObj);
      });
      $this.lineEncomparedData=arrlist;
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
      $this.personal=[];
      $this.pieCountrieData=[];
      $this.pieContinentData=[];
      $this.pieChannelData=[];
      $this.lineEncomparedData=[];
      $this.TimePlug($this.timeDate);
      $this.getCountrieInfo();     //国家
      $this.getContinentInfo();    //大洲
      $this.getChannelInfo();      //渠道
      $this.getpersonalInfo();     //个人询盘
      $this.getEncomparedInfo();   //三组询盘对比
    },
    //接收传递的时间
    listenTime:function(TDate){
      var $this=this;
      if(TDate.starttime==''&&TDate.endtime==''){
        $this.timeDate.starttime='';
        $this.timeDate.endtime='';
      }else{
        $this.timeDate.starttime=TDate.starttime + '-01';
        var endtimeVal =TDate.endtime.split("-");
        $this.timeDate.endtime=TDate.endtime + '-' +new Date(endtimeVal[0],endtimeVal[1],0).getDate();
      }
    },
    //点击姓名缓存
    handleClick:function(value){
      var $this = this;
      var typeValue = value;
      $this.$store.dispatch("printdata/handleClick", typeValue);
      $this.$router.push({
          name: 'snsPersonaPage',  
          params: {   
              plan:typeValue  
          }  
      })
    },
    //点击查看更多
    handleMore:function(CountrieMore,v){
      var $this=this;
      $this.showMask=!$this.showMask;
      $this.showAbs=!$this.showAbs;
      var ModalDog={};
      ModalDog.ModalDogData=CountrieMore;
      ModalDog.type=v;
      $this.ModalDog=ModalDog;
    },
    //监听模态框数据
    listenModal:function(a){
      var $this=this;
      $this.showAbs = a;
      $this.showMask = a;
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
        padding:12px 20px 20px 20px;
        cursor: pointer;
        dt{
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
        dd{
          clear: both;
          line-height: 1;
          margin-top:10px;
        }
      }
    }
    .bg-purple-light {
      background: #fff;
    }
  }
}
</style>
