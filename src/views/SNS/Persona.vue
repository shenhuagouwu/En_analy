<template>
  <el-container direction="vertical">
    <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <i class="icon el-icon-position"></i>
            <el-breadcrumb-item :to="{ path: '/SNS' }">SNS</el-breadcrumb-item>
            <el-breadcrumb-item>{{perName}}数据</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="searchtime">
              <nodefault-searchtime v-on:childNoTimeData="listenTime"></nodefault-searchtime>
              <span class="searchbtn" v-on:click="handleQueryBtn">查询</span>
        </div>
    </el-header>
    <el-main>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="grid-content bg-purple-light">
                 <p class="piecharttit">国家询盘<font>(默认2020年2月至今)</font><i v-on:click="handleMore(Countrie,'国家')" class="el-icon-more icon"></i></p>
                 <div class="piechartbox"><pie-chart :piechartData="pieCountrieData" v-if="pieCountrieData.length>0" style="height:280px"></pie-chart></div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">
                 <p class="piecharttit">大洲询盘<font>(默认2020年2月至今)</font><i v-on:click="handleMore(Continent,'大洲')" class="el-icon-more icon"></i></p>
                 <div class="piechartbox"><pie-chart :piechartData="pieContinentData" v-if="pieContinentData.length>0" style="height:280px"></pie-chart></div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">
                 <p class="piecharttit">渠道询盘<font>(默认2020年2月至今)</font><i v-on:click="handleMore(Channel,'渠道')" class="el-icon-more icon"></i></p>
                 <div class="piechartbox"><pie-chart :piechartData="pieChannelData" v-if="pieChannelData.length>0" style="height:280px"></pie-chart></div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content bg-purple-light">
                 <p class="piecharttit">三组询盘对比<font>(默认2020年2月至今)</font></p>
                 <div class="piechartbox"><line-charttwo :linechartData="lineEncomparedData" v-if="lineEncomparedData.length>0" style="height:290px"></line-charttwo></div>
            </div>
          </el-col>
        </el-row>
    </el-main>
    <modal-dialog v-on:childData="listenModal" v-bind:ModalDog="ModalDog" v-if="showAbs"></modal-dialog>
    <p class="mask" v-if="showMask"></p>
  </el-container>
</template>

<script>
import { mapGetters } from "vuex";
import PieChart from "../chart/PieChart";
import LineCharttwo from "../chart/LineCharttwo";
import nodefaultSearchtime from "../public/nodefaultSearchtime";
import ModalDialog from "./components/Modaldialog";
export default {
  name: 'snsPersonaPage',
  data() {
    return {
      Countrie:[],      //国家
      Continent:[],     //大洲
      Channel:[],       //渠道
      perName:'',
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
    LineCharttwo,
    nodefaultSearchtime,
    ModalDialog
  },
  computed: {
    ...mapGetters(["dataName"]),
  },
  mounted() {
    var $this=this;
    $this.perName=$this.dataName;
    $this.handleQueryBtn();
  },
  methods: {
    getCountrieInfo:function(){
      var $this = this;
      $this.$api.get("/index/sns_geren_area?name=" + $this.perName + "&starttime=" + $this.starttime + "&endtime=" + $this.endtime,null,function(res) {
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
      $this.$api.get("/index/sns_geren_continent?name=" + $this.perName + "&starttime=" + $this.starttime + "&endtime=" + $this.endtime,null,function(res) {
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
      $this.$api.get("/index/sns_geren_qudao?name=" + $this.perName + "&starttime=" + $this.starttime + "&endtime=" + $this.endtime,null,function(res) {
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
    getEncomparedInfo:function(){
      var $this = this;
      $this.$api.get("/index/sns_geren?starttime=" + $this.starttime + "&endtime=" + $this.endtime,null,function(res) {
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
      dataobj.forEach(function(item, index) {
          if(index<=10){
            arrlist.push(item);
          }
      });
      $this.pieCountrieData=arrlist;
    },
    ContinentPieChart:function(ContinentData){
      var $this=this;
      var dataobj = ContinentData;
      var arrlist = [];
      dataobj.forEach(function(item, index) {
          arrlist.push(item);
      });
      $this.pieContinentData=arrlist;
    },
    ChannelPieChart:function(ChannelData){
      var $this=this;
      var dataobj = ChannelData;
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
          arrlistObj.name=item.remark1;
          arrlistObj.count=item.count;
          arrlistObj.time=item.date;
          arrlist.push(arrlistObj);
      });
      $this.lineEncomparedData=arrlist;
    },
    //时间插件
    TimePlug:function(TimeData){      
      var $this = this;
      if($this.timeDate.starttime!=''&&$this.timeDate.endtime!=''){
          $this.starttime=$this.timeDate.starttime + '-01';
          $this.endtime=$this.timeDate.endtime + '-01';
      }else{
          $this.starttime='';
          $this.endtime='';
      }
    },
    listenTime:function(TDate){
      var $this=this;
      $this.timeDate=TDate;
    },
    //点击查询事件
    handleQueryBtn:function(){
      var $this = this;
      $this.pieCountrieData=[];
      $this.pieContinentData=[];
      $this.pieChannelData=[];
      $this.lineEncomparedData=[];
      $this.TimePlug();
      $this.getCountrieInfo();     //国家
      $this.getContinentInfo();    //大洲
      $this.getChannelInfo();      //渠道
      $this.getEncomparedInfo();   //三组询盘对比
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
      .piechartbox{
        clear: both;
        display: block;
        padding:20px;
      }
    }
    .bg-purple-light {
      background: #fff;
    }
  }
}
</style>
