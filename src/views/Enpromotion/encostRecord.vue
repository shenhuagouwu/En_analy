<template>
  <el-container direction="vertical">
    <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <i class="icon el-icon-position"></i>
            <el-breadcrumb-item :to="{ path: '/Enpromotion' }">英文推广</el-breadcrumb-item>
            <el-breadcrumb-item>花费</el-breadcrumb-item>
        </el-breadcrumb>
    </el-header>
    <el-scrollbar style="height:100%">
          <el-row :gutter="20">
            <el-col :span="15">
              <div class="grid-content bg-purple-light">
                  <p class="piecharttit">总花费<font>(每天月/月变化趋势)</font></p>
                  <div class="piechartbox"><costline-chartone :linechartData="DayCost" v-if="DayCost.length>0" style="height:300px"></costline-chartone></div>
              </div>
            </el-col>
            <el-col :span="5">
               <ul class="mouthcostul">
                 <li v-for="(item,index) in BrandMonthCost" :style="{height:(430/BrandMonthCost.length-20) + 'px' }">
                    <i class="mouthcostul_logo"><img :src="item.brandlogo" alt=""></i>
                    <span class="mouthcostul_tit">月花费总数</span>
                    <span class="mouthcostul_cost">￥{{item.count}}</span>
                    <span class="mouthcostul_name">{{item.name}}</span>
                 </li>
               </ul>
            </el-col>
            <el-col :span="4">
              <div class="mouthcost_zb">
                  <div class="piechartbox"><cost-ringchart :CostRingchartData="BrandMonthCost" v-if="BrandMonthCost.length>0" style="height:250px"></cost-ringchart></div>
                  <p class="piecharttit">红星、富特、中德月花费占比</p>
                  <p class="piecharttxt" v-for="(item,index) in BrandMonthCost">
                     <span>{{item.name}}</span><strong>{{item.percent}}%</strong>
                  </p>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="grid-content bg-purple-light">
                  <p class="piecharttit">性价比<font>(有效询盘数/总花费)</font></p>
                  <div class="piechartbox"><costline-charttwo :linechartData="DayCostPerformance" v-if="DayCostPerformance.length>0" style="height:300px"></costline-charttwo></div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="grid-content bg-purple-light">
                  <p class="piecharttit">单个搜索询盘成本变化趋势<font>(搜索渠道询盘总数/搜索点击次数)</font></p>
                  <div class="piechartbox"><costline-chartthree :linechartData="DayCostNumber" v-if="DayCostNumber.length>0" style="height:300px"></costline-chartthree></div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="grid-content bg-purple-light">
                  <p class="piecharttit">搜索单次点击费用变化趋势</p>
                  <div class="piechartbox"><costline-chartfour :linechartData="DayCostNumberTrend" v-if="DayCostNumberTrend.length>0" style="height:300px"></costline-chartfour></div>
              </div>
            </el-col>
          </el-row>
    </el-scrollbar>
  </el-container>
</template>
<script>
import CostlineChartone from "../chart/CostLineChartOne";
import CostlineCharttwo from "../chart/CostLineChartTwo";
import CostlineChartthree from "../chart/CostLineChartThree";
import CostlineChartfour from "../chart/CostLineChartFour";
import CostRingchart from "../chart/CostRingchartOne";
export default {
    name: 'encostRecordPage',
    data() {
      return {
        DayCost:[],                 // 总花费每天/月变化趋势
        BrandMonthCost:[],          // 每个品牌当月花费总数居
        DayCostPerformance:[],      // 性价比每天/月变化趋势（性价比：有效询盘数/总花费）
        DayCostNumber:[],           // 单个搜索询盘成本变化趋势（搜索渠道询盘总数/搜索点击次数）
        DayCostNumberTrend:[],      // 搜索单次点击费用变化趋势
        DayCostClickTrend:[],       // 搜索点击率变化趋势（点击次数/展示次数）
        timeDate:{
          starttime:'',
          endtime:'',
        },                             // 时间插件传递值
        starttime:'',                  // 查询开始时间
        endtime:'',                    // 查询结束时间
        pieDayCostData:[],             // (折线图(数量))需要传过去的总花费每天/月变化趋势数据
        pieDayCostPerformanceData:[],  // (折线图(百分数))需要传过去的性价比每天/月变化趋势数据
        pieDayCostNumberData:[],       // (折线图(百分数))需要传过去的单个搜索询盘成本变化趋势数据
        pieDayCostNumberTrendData:[],  // (折线图(百分数))需要传过去的搜索单次点击费用变化趋势数据
      }
    },
    components: {
      CostlineChartone,
      CostlineCharttwo,
      CostlineChartthree,
      CostlineChartfour,
      CostRingchart
    },
    mounted() {
      var $this=this;
      $this.CostRecord();
    },
    methods: {
      CostRecord:function(){
          var $this = this;
          $this.$api.get("/index/tg_huafei?starttime=" + $this.starttime + "&endtime=" + $this.endtime,null,function(res) {
            if(res){
                // 总花费每天/月变化趋势
                if(res.data.day_zhuafei.length>0){
                    var arr_zhuafei=[];
                    res.data.day_zhuafei.forEach(function(item){
                        var arrObj={
                          name:'',
                          count:0,
                          time:'',
                        };
                        if(item.pinpai==1){
                          arrObj.name="红星";
                        }else if(item.pinpai==2){
                          arrObj.name="富特";
                        }else{
                          arrObj.name="中德";
                        }
                        arrObj.count=parseFloat(item.zong_huafei);
                        arrObj.time=item.time;
                        arr_zhuafei.push(arrObj);
                    });
                    $this.DayCost=arr_zhuafei;
                    //三个品牌本月总花费及费用占比率
                    $this.MonthCost($this.DayCost);
                }
                // 性价比每天/月变化趋势（性价比：有效询盘数/总花费）
                if(res.data.day_xj.length>0){
                    var arr_day_xj=[];
                    res.data.day_xj.forEach(function(item){
                        var arrObj={
                          name:'',
                          percent:0,
                          time:'',
                        };
                        if(item.pinpai==1){
                          arrObj.name="红星";
                        }else if(item.pinpai==2){
                          arrObj.name="富特";
                        }else{
                          arrObj.name="中德";
                        }
                        arrObj.percent=Math.floor(item.bilv * 10000)/100;
                        arrObj.time=item.time;
                        arr_day_xj.push(arrObj);
                    });
                    $this.DayCostPerformance=arr_day_xj;
                }
                // 单个搜索询盘成本变化趋势（搜索渠道询盘总数/搜索点击次数）
                if(res.data.list.length>0){
                    var arr_list=[];
                    res.data.list.forEach(function(item){
                        var arrObj={
                          percent:0,
                          time:'',
                        };
                        arrObj.percent=Math.floor(item.cb * 1000);
                        arrObj.time=item.date;
                        arr_list.push(arrObj);
                    });
                    $this.DayCostNumber=arr_list;
                }
                // 搜索单次点击费用变化趋势
                if(res.data.day_seach_click.length>0){
                    var arr_day_seach_click=[];
                    res.data.day_seach_click.forEach(function(item){
                        var arrObj={
                          name:'',
                          count:0,
                          time:'',
                        };
                        if(item.pinpai==1){
                          arrObj.name="红星";
                        }else if(item.pinpai==2){
                          arrObj.name="富特";
                        }else{
                          arrObj.name="中德";
                        }
                        arrObj.count=Math.floor(item.click_huafei * 100)/100;;
                        arrObj.time=item.time;
                        arr_day_seach_click.push(arrObj);
                    });
                    $this.DayCostNumberTrend=arr_day_seach_click;
                }
                // 搜索点击率变化趋势（点击次数/展示次数）
            }
          });
      },
      MonthCost:function(CostData){
        var $this=this;
         var CostData=CostData;
         var arr_BrandMonth=[];
         var arrObj_zd={
            name:'',
            count:0,
            percent:0,
         };
         var arrObj_hx={
            name:'',
            count:0,
            percent:0,
         };
         var arrObj_ft={
            name:'',
            count:0,
            percent:0,
            brandlogo:''
         };
         var Num_count=0;
         CostData.forEach(function(item){
           if(item.name=="红星"){
             arrObj_hx.name=item.name;
             arrObj_hx.brandlogo=require('../../assets/images/costlogo01.png');
             arrObj_hx.count +=item.count;
           }
           if(item.name=="富特"){
             arrObj_ft.name=item.name;
             arrObj_ft.brandlogo=require('../../assets/images/costlogo02.png');
             arrObj_ft.count +=item.count;
           }
           if(item.name=="中德"){
             arrObj_zd.name=item.name;
             arrObj_zd.brandlogo=require('../../assets/images/costlogo03.png');
             arrObj_zd.count +=item.count;
           }
           Num_count += item.count;
         });
         Num_count=Math.floor(Num_count*100)/100;    
         arrObj_zd.percent=Math.floor(arrObj_zd.count/Num_count*10000)/100;
         arrObj_hx.percent=Math.floor(arrObj_hx.count/Num_count*10000)/100;
         arrObj_ft.percent=Math.floor(arrObj_ft.count/Num_count*10000)/100;
         if(arrObj_zd.name!=""){
            arrObj_zd.count=Math.floor(arrObj_zd.count*100)/100;
            arr_BrandMonth.push(arrObj_zd);
         }
         if(arrObj_ft.name!=""){
            arrObj_ft.count=Math.floor(arrObj_ft.count*100)/100;
            arr_BrandMonth.push(arrObj_ft);
         }
         if(arrObj_hx.name!=""){
            arrObj_hx.count=Math.floor(arrObj_hx.count*100)/100;
            arr_BrandMonth.push(arrObj_hx);
         }
         $this.BrandMonthCost=arr_BrandMonth;
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
        padding:30px 20px 20px 20px;
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
.mouthcost_zb{
  clear: both;
  display: block;
  width: 100%;
  border-radius: 5px;
  background: #fff;
  height:410px;
  .piecharttxt{
    clear: both;
    display: block;
    text-align: left;
    padding:5px 0px 8px 20px;
    line-height:1;
    overflow: hidden;
    span{
      float: left;
      font-size:12px;
      margin-right: 10px;
      line-height: 1;
      padding:0px 10px 0px 0px;
      border-radius:3px;
      color: #666;
    }
    strong{
      color: #62daab;
      font-size:16px;
    }
  }
  .piecharttit{
    padding:0px 20px 10px 20px;
    font-size:14px;
    color: #333;
    text-align: left;
    font-weight: bold;
  }
}
.mouthcostul{
  clear: both;
  display: block;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  -ms-flex-preferred-size: auto;
  -webkit-flex-basis: auto;
  flex-basis: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  min-width: 0;    
  -ms-flex-direction: column;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  li{
    clear: both;
    display: block;
    margin-top:20px;
    border-radius:5px;
    background: #fff;
    padding:20px;
    flex-direction: row;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    -ms-flex-preferred-size: auto;
    -webkit-flex-basis: auto;
    flex-basis: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    min-width: 0;
    text-align: left;
    position: relative;
    .mouthcostul_logo{
      position: absolute;
      z-index: 1;
      width: 40px;
      right:10px;
      top:10px;
      img{
        width:100%;
      }
    }
    span{
      clear: both;
      display: block;
      line-height: 1;   
      position: relative;
      z-index: 2;   
      &.mouthcostul_tit{
        font-size:12px;
        color:#fff;
      }
      &.mouthcostul_cost{
        font-size:24px;
        font-weight: bold;
        padding:13px 0px;
        color:#fff;
      }
      &.mouthcostul_name{
        font-size:16px;
        color:#fff;
        font-weight: bold;
      }
    }
    &:first-child{
      margin-top: 0px;
      background: #60b5ff;
    }
    &:first-child+li{
      background: #62daab;
    }
    &:first-child+li+li{
      background: #f59a2a;
    }
  }
}
</style>
