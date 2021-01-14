<template>
  <el-container direction="vertical">
    <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <i class="icon el-icon-position"></i>
            <el-breadcrumb-item :to="{ path: '/Enpromotion' }">英文推广</el-breadcrumb-item>
        </el-breadcrumb>
    </el-header>
    <el-scrollbar style="height:100%">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple-light">
                  <p class="piecharttit">一组七天询盘趋势</p>
                  <dl class="weeknum">
                      <dd>
                          <strong>7日总询盘</strong>
                          <span>{{A_trendAccount.count}}</span>
                      </dd>
                      <dt>
                          <strong>昨日占比</strong>
                          <span>{{A_trendAccount.percent}}</span>
                      </dt>
                  </dl>
                  <div class="piechartbox areabox"><area-chart :areachartData="pieA_trendWeekData" v-if="pieA_trendWeekData.length>0" style="height:120px"></area-chart></div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">
                  <p class="piecharttit">一组七天询盘占比</p>
                  <dl class="piechartbox ringbox">
                      <dt><ring-chart :ringchartData="pieA_AccountWeekData" v-if="pieA_AccountWeekData.length>0" style="height:150px"></ring-chart></dt>
                      <dd>
                          <span>{{A_AccountWeek.total}}</span>
                          <strong>7日总询盘</strong>
                      </dd>               
                  </dl>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">
                  <p class="piecharttit">三组七天询盘趋势</p>
                  <dl class="weeknum">
                      <dd>
                          <strong>7日总询盘</strong>
                          <span>{{C_trendAccount.count}}</span>
                      </dd>
                      <dt>
                          <strong>昨日占比</strong>
                          <span>{{C_trendAccount.percent}}</span>
                      </dt>
                  </dl>
                  <div class="piechartbox areabox"><area-chart :areachartData="pieA_trendWeekData" v-if="pieA_trendWeekData.length>0" style="height:120px"></area-chart></div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">
                  <p class="piecharttit">三组七天询盘占比</p>
                  <dl class="piechartbox ringbox">
                      <dt><ring-chart :ringchartData="pieC_AccountWeekData" v-if="pieC_AccountWeekData.length>0" style="height:150px"></ring-chart></dt>
                      <dd>
                          <span>{{C_AccountWeek.total}}</span>
                          <strong>7日总询盘</strong>
                      </dd>               
                  </dl>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                  <p class="piecharttit">品牌对比<font>(最近七天)</font>
                      <span class="iconbtn">
                          <i @click="inBrandnum=0" :class="{active:inBrandnum==0}">趋势图</i>
                          <i @click="inBrandnum=1" :class="{active:inBrandnum==1}">对比图</i>
                      </span>
                  </p>
                  <div class="piechartbox" v-if="inBrandnum==0"><enline-chartone :linechartData="pieBrandTrendData" v-if="pieBrandTrendData.length>0" style="height:300px"></enline-chartone></div>
                  <div class="piechartbox" v-if="inBrandnum==1"><encolum-chartone :columchartColData="pieBrandTrendData" v-if="pieBrandTrendData.length>0" style="height:300px"></encolum-chartone></div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                  <p class="piecharttit">产品分析<font>(最近七天)</font>
                      <i v-on:click="handleProMore" class="el-icon-more icon"></i>
                      <span class="iconbtn">
                          <i @click="inPronum=0" :class="{active:inPronum==0}">占比图</i>
                          <i @click="inPronum=1" :class="{active:inPronum==1}">对比图</i>
                      </span>
                  </p>
                  <div class="piechartbox" v-if="inPronum==0"><pie-chart :piechartData="pieProductsAccountData" v-if="pieProductsAccountData.length>0" style="height:300px"></pie-chart></div>
                  <div class="piechartbox" v-if="inPronum==1"><colum-chart :columchartData="pieProductsAccountData" v-if="pieProductsAccountData.length>0" style="height:300px"></colum-chart></div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                  <p class="piecharttit">组别二来源渠道对比<font>(最近一个月)</font></p>
                  <ul class="sources">
                      <li v-for="(item,index) in A_sources" :key="index">
                          <strong>{{item.name}}</strong>
                          <span>                                  
                              <i class="sources_count">{{item.count}}</i>
                              <i class="sources_percent">{{item.percent}}%</i>
                          </span>
                      </li>
                  </ul>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                  <p class="piecharttit">组别三来源渠道对比<font>(最近一个月)</font></p>
                  <ul class="sources">
                      <li v-for="(item,index) in C_sources" :key="index">
                          <strong>{{item.name}}</strong>
                          <span>                                  
                              <i class="sources_count">{{item.count}}</i>
                              <i class="sources_percent">{{item.percent}}%</i>
                          </span>
                      </li>
                  </ul>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple-light">
                  <p class="piecharttit">来源国家<font>(默认2020-02到现在所有英文来源国家占比)</font><i v-on:click="handleCountriesMore" class="el-icon-more icon"></i></p>
                  <ul class="sources">
                      <li v-for="(item,index) in pieSourceCountriesData" :key="index">
                          <strong><i><img :src="item.ConPic"  alt=""></i>{{item.name}}</strong>
                          <span>                                  
                              <i class="sources_count">{{item.count}}</i>
                              <i class="sources_percent">{{item.percent}}%</i>
                          </span>
                      </li>
                  </ul>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" v-if="Submenu[0].isOn">
            <el-col :span="24">
              <div class="grid-content bg-purple-light">
                  <div class="piecharttit">
                       <strong>组员</strong>
                       <font>(最近一个月)</font>
                       <div class="searchtime">
                            <nodefault-searchtimeday class="timebox" v-on:childNoTimeDayData="listenTimeday"></nodefault-searchtimeday>
                            <span class="searchbtn" v-on:click="handlezuyuanBtn">查询</span>
                       </div>
                  </div>
                  <div class="piechartbox" v-if="inBrandnum==0"><enline-chartone :linechartData="pieTeamMemberData" v-if="pieTeamMemberData.length>0" style="height:300px"></enline-chartone></div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" v-if="Submenu[1].isOn||Submenu[2].isOn">
            <el-col :span="10" v-if="Submenu[1].isOn">
              <div class="grid-content bg-purple-light">
                  <div class="piecharttit">
                       <strong>时段</strong>
                       <font>(最近一个月)</font>
                       <div class="searchtime">
                            <nodefault-searchtimeday class="timebox" v-on:childNoTimeDayData="listenTimeday"></nodefault-searchtimeday>
                            <span class="searchbtn" v-on:click="handleshiduanBtn">查询</span>
                       </div>
                  </div>
                  <div class="piechartbox"><colum-chart :columchartData="pieTimeParagraphData" v-if="pieTimeParagraphData.length>0" style="height:300px"></colum-chart></div>
              </div>
            </el-col>
            <el-col :span="14" v-if="Submenu[2].isOn">
              <div class="grid-content bg-purple-light">
                  <div class="piecharttit">
                       <strong>页面受众特</strong>
                       <font>(默认2020-02到现在)</font>
                  </div>
                  <div class="piechartbox"><colum-chart :columchartData="pieAudienceCharacterData" v-if="pieAudienceCharacterData.length>0" style="height:300px"></colum-chart></div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" v-if="Submenu[5].isOn||Submenu[3].isOn||Submenu[4].isOn">
            <el-col :span="9" v-if="Submenu[3].isOn">
              <div class="grid-content bg-purple-light">
                  <p class="piecharttit">来源词<font>(默认2020-02到现在)</font></p>
                  <ul class="sources">
                      <li v-for="(item,index) in pieSourceTermData" :key="index">
                          <strong>{{item.name}}</strong>
                          <span>                                  
                              <i class="sources_count">{{item.count}}</i>
                          </span>
                      </li>
                      <li class="sourcesbtn" v-on:click="handleSearchWordMore(SourceTerm,'来源词')">查看更多</li>
                  </ul>
              </div>
            </el-col>
            <el-col :span="9" v-if="Submenu[4].isOn">
              <div class="grid-content bg-purple-light">
                  <p class="piecharttit">客户搜索词<font>(默认2020-02到现在)</font></p>
                  <ul class="sources">
                      <li v-for="(item,index) in pieSearchWordData" :key="index">
                          <strong>{{item.name}}</strong>
                          <span>                                  
                              <i class="sources_count">{{item.count}}</i>
                          </span>
                      </li>
                      <li class="sourcesbtn" v-on:click="handleSearchWordMore(SearchWord,'客户搜索词')">查看更多</li>
                  </ul>
              </div>
            </el-col>
            <el-col :span="6" v-if="Submenu[5].isOn">
              <div class="grid-content bg-purple-light">
                  <div class="piecharttit">
                       <strong>来源设备</strong>
                       <font>(默认2020-02到现在)</font>
                  </div>
                  <div class="piechartbox"><pie-chartdevice :piechartData="pieSourceDeviceData" v-if="pieSourceDeviceData.length>0" style="height:300px"></pie-chartdevice></div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" v-if="Submenu[6].isOn">
              <el-col :span="8" v-for="(item,index) in pieSourcePageData">
                <div class="grid-content bg-purple-light">
                    <p class="piecharttit">{{item[0].pinpai}}来源页面<font>(默认2020-02到现在)</font></p>
                    <ul class="sourcesPage">
                        <li v-for="(items,indexs) in item" :key="indexs">
                            <strong @click="See(items.name)">{{items.url}}</strong>
                            <span>{{items.count}}</span>
                        </li>
                        <li class="sourcesPagebtn" v-on:click="handleSearchWordMore(SourcePage[index],item[0].pinpai+'来源页面')">查看更多</li>
                    </ul>
                </div>
            </el-col>
          </el-row>
    </el-scrollbar>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-purple-light">
            <div class="searchnav">
                <span v-for="(item,index) in Submenu" :key="index" v-bind:class="item.isOn?'active':''" v-on:click="handleType(item.type)">{{item.type}}</span>
            </div>
        </div>
      </el-col>
    </el-row>
    <modal-dialogone v-on:childData="listenModal" v-bind:ModalDog="ProductsAccount" v-if="showAbs"></modal-dialogone>
    <modal-dialogtwo v-on:childSouCouData="listenSouCouModal" v-bind:ModalSouCouDog="SourceCountries" v-if="showCou"></modal-dialogtwo>
    <modal-dialogthree v-on:childWordData="listenWordModal" v-bind:ModalWordDog="DialogWord" v-if="showWord"></modal-dialogthree>
    <p class="mask" v-if="showMask"></p>
  </el-container>
</template>
<script>
import RingChart from "../chart/RingChart";
import AreaChart from "../chart/AreaChart";
import EncolumChartone from "../chart/EncolumChartone";
import EnlineChartone from "../chart/EnlineChartone";
import PieChart from "../chart/PieChart";
import PieChartdevice from "../chart/PieChartdevice";
import ColumChart from "../chart/ColumChart";
import ModalDialogone from "./components/ModalDialogone";
import ModalDialogtwo from "./components/ModalDialogtwo";
import ModalDialogthree from "./components/ModalDialogthree";
import nodefaultSearchtimeday from "../public/nodefaultSearchtimeday";
import AreaJson from "@/assets/json/area";
import floatObj from "@/assets/js/floatObj";
export default {
    name: 'enalldataPage',
    data() {
      return {
        typeData:{
          "user":false
        },
        showMask:false,
        showCou:false,
        showAbs:false,
        showWord:false,
        inBrandnum:0,
        inPronum:0,
        A_trendWeek:[],                 // 一组本周趋势
        A_trendAccount:{
          count:0,
          percent:'',
        },
        A_AccountWeek:{},               // 一组本周占比
        C_trendWeek:[],                 // 三组本周趋势
        C_trendAccount:{
          count:0,
          percent:'',
        },
        C_AccountWeek:{},               // 三组本周占比
        BrandTrend:[],                  // 品牌趋势
        ProductsAccount:[],             // 产品占比
        A_sources:[],                   // 一组来源渠道
        C_sources:[],                   // 三组来源渠道
        SourceCountries:[],             // 来源国家
        TeamMember:[],                  // 组员
        SourceDevice:[],                // 来源设备
        TimeParagraph:[],               // 时段
        SourceTerm:[],                  //来源词
        SearchWord:[],                  //客户搜索词
        SourcePage:[],                  //来源页面
        AudienceCharacter:[],           //页面受众特
        pieA_trendWeekData:[],          // (面积图)需要传过去的一组本周趋势数据
        pieA_AccountWeekData:[],        // (环形图)需要传过去的一组本周占比数据
        pieC_trendWeekData:[],          // (面积图)需要传过去的三组本周趋势数据
        pieC_AccountWeekData:[],        // (环形图)需要传过去的三组本周占比数据
        pieBrandTrendData:[],           // (折线图)需要传过去的品牌趋势数据
        pieProductsAccountData:[],      // (饼图)需要传过去的产品占比数据
        pieSourceCountriesData:[],      // 需要传过去的来源国家数据        
        pieTeamMemberData:[],           // (折线图)需要传过去的组员数据
        pieSourceDeviceData:[],         // (饼图)需要传过去的来源设备数据
        pieTimeParagraphData:[],        // (柱状图)需要传过去的时段数据
        pieAudienceCharacterData:[],    // (柱状图)需要传过去的页面受众特数据
        pieSourceTermData:[],           // (列表)需要传过去的来源词数据
        pieSearchWordData:[],           // (列表)需要传过去的客户搜索词数据
        pieSourcePageData:[],                  //来源页面
        DialogWord:{},                  // 传递弹出词
        
        timeDayDate:{
          startDaytime:'',
          endDaytime:'', 
        },                              // 日期插件传递值
        startDaytime:'',                // 查询开始日期
        endDaytime:'',                  // 查询结束日期

        Submenu:[{
          type:'组员',
          isOn:false
        },{
          type:'时段',
          isOn:false,
        },{
          type:'受众特征',
          isOn:false,
        },{
          type:'来源词',
          isOn:false,
        },{
          type:'客户搜索词',
          isOn:false,
        },{
          type:'来源设备',
          isOn:false,
        },{
          type:'来源页面',
          isOn:false,
        }],
      }
    },
    components: {
      RingChart,
      AreaChart,
      EncolumChartone,
      EnlineChartone,
      PieChart,
      PieChartdevice,
      ColumChart,
      ModalDialogone,
      ModalDialogtwo,
      ModalDialogthree,
      nodefaultSearchtimeday
    },
    mounted() {
      var $this=this;
      $this.handleQueryBtn();
      $this.handlezuyuanBtn();
      $this.handleshiduanBtn();

      $this.getSourceTermInfo()
      $this.getSearchWordInfo()
      $this.getSourcePageInfo()
      $this.getAudienceCharacterInfo()
    },
    methods: {
      EnallData:function(){
          var $this = this; 
          $this.$api.get("/index/tg_zu_duibi",null,function(res) {
              if (res) {
                $this.A_trendWeek=res.data.a1;
                if($this.A_trendWeek.length>0){
                   $this.A_trendWeekPieChart($this.A_trendWeek);
                }
                $this.C_trendWeek=res.data.c1;
                if($this.C_trendWeek.length>0){
                   $this.C_trendWeekPieChart($this.C_trendWeek);
                }
                if(res.data.a2!=""){
                   $this.A_AccountWeekRingChart(res.data.a2);
                } 
                if(res.data.c2!=""){
                   $this.C_AccountWeekRingChart(res.data.c2);
                } 
                if(res.data.pinpai.length>0){
                   $this.BrandTrendPieChart(res.data.pinpai);
                } 
                var arrproAcclist = [];
                res.data.pro.forEach(function(item){
                   var arrObj={
                       name:'',
                       count:0,
                       percent:0,
                       total:0,
                   };
                   arrObj.name=item.product;
                   arrObj.count=item.n;
                   arrObj.percent=parseFloat(item.rat);
                   arrObj.total=item.s;
                   arrproAcclist.push(arrObj);
                });
                $this.ProductsAccount=$this.CustomSort(arrproAcclist);
                if($this.ProductsAccount.length>0){
                   $this.ProductsAccountPieChart($this.ProductsAccount);
                }                
                //渠道01
                var arrAsour = [];
                var ortherAsourObj={
                  name:'其它',
                  count:0,
                  total:0,
                  percent:0,
                };   
                res.data.qudao1.forEach(function(item){
                  var arrObj={
                    name:'',
                    count:0,
                    total:0,
                    percent:0,
                  };                  
                  if(item.remark2==""){
                    ortherAsourObj.count += item.n;
                    ortherAsourObj.percent += parseFloat(item.rat);
                    ortherAsourObj.total = item.s;
                  }else{
                    arrObj.name=item.remark2;
                    arrObj.count=item.n;
                    arrObj.total=item.s;
                    arrObj.percent=parseFloat(item.rat);
                    arrAsour.push(arrObj);
                  }                  
                });
                arrAsour.push(ortherAsourObj);
                $this.A_sources=$this.CustomSort(arrAsour);
                //渠道02
                var arrCsour = [];
                var ortherCsourObj={
                  name:'其它',
                  count:0,
                  total:0,
                  percent:0,
                };   
                res.data.qudao2.forEach(function(item){
                  var arrObj={
                    name:'',
                    count:0,
                    total:0,
                    percent:0,
                  };                  
                  if(item.remark2==""){
                    ortherCsourObj.count += item.n;
                    ortherCsourObj.percent += parseFloat(item.rat);
                    ortherCsourObj.total = item.s;
                  }else{
                    arrObj.name=item.remark2;
                    arrObj.count=item.n;
                    arrObj.total=item.s;
                    arrObj.percent=parseFloat(item.rat);
                    arrCsour.push(arrObj);
                  } 
                });
                arrCsour.push(ortherCsourObj);
                $this.C_sources=$this.CustomSort(arrCsour);
                //来源国家
                var arrSourCoun = [];
                var arrSourchinaObj={
                  name:'中国',
                  Enname:'China',
                  count:0,
                  total:0,
                  percent:0,
                  ConPic:''
                }
                res.data.list.forEach(function(item){
                    var arrObj={
                      name:'',
                      Enname:'',
                      count:0,
                      total:0,
                      percent:0,
                      ConPic:''
                    }  
                    if(item.area.indexOf("中国") >= 0){
                      arrSourchinaObj.count += item.s;
                      arrSourchinaObj.total = item.n;
                      arrSourchinaObj.percent += parseFloat(item.bilv);
                      arrSourchinaObj.ConPic=require('../../assets/images/Countrie/Countrie031.jpg');
                    }else{                          
                      AreaJson.forEach(function(items,index){
                         if(item.area==items.Name){
                            arrObj.name=item.area;
                            arrObj.Enname=items.EnName;
                            arrObj.count=item.s;
                            arrObj.total=item.n;
                            arrObj.ConPic=require('@/assets/images/Countrie/'+items.ConPic+ '.jpg');                            
                            arrObj.percent=parseFloat(item.bilv);
                            arrSourCoun.push(arrObj);
                         }
                      });
                    }             
                });
                if(arrSourchinaObj.percent!=0){
                  arrSourCoun.push(arrSourchinaObj);
                };
                $this.SourceCountries=$this.CustomSort(arrSourCoun);                
                if($this.SourceCountries.length>0){
                   $this.SourceCountriesPieChart($this.SourceCountries);
                } 
              }
            }
          );
      },
      getTeamMemberInfo:function(){
          var $this = this; 
          $this.$api.get("/index/tg_zuyuan?starttime=" + $this.startDaytime + "&endtime=" + $this.endDaytime,null,function(res) {
               if(res){
                var arrTeam = [];
                res.data.forEach(function(item){
                   var arrObj={
                       name:'',
                       time:'',
                       count:0,
                   };
                   arrObj.name=item.remark1;
                   arrObj.time=item.date;
                   arrObj.count=item.count;
                   arrTeam.push(arrObj);
                });
                $this.TeamMember=arrTeam;
                if($this.TeamMember.length > 0){
                    var timeList = [];
                    var timeDatelist = [];
                    $this.TeamMember.forEach(function(item,index){
                      timeList.push(item.time);
                    });
                    var max = timeList[0],
                      min = timeList[0];
                    timeList.forEach(function(item, index) {
                      if ($this.compareDate(item, max) >= 0) {
                        max = item;
                      }
                      if ($this.compareDate(item, min) <= 0) {
                        min = item;
                      }
                    });
                    timeDatelist = $this.gettimeDate(min, max);
                    $this.pieTeamMemberData = $this.sortlist($this.TeamMember, $this.screenlist($this.TeamMember),timeDatelist);
                }
               }
            }
          );
      },
      getSourceDeviceInfo:function(){
          var $this = this; 
          $this.$api.get("/index/tg_laiyuan",null,function(res) {
               if(res){
                var arrproAcclist = [];
                res.data.forEach(function(item){
                   var arrObj={
                       name:'',
                       count:0,
                       percent:0,
                       total:0,
                   };
                   arrObj.name=item.device;
                   arrObj.count=item.n;
                   arrObj.percent= floatObj.multiply(parseFloat(item.rat),10000);
                   arrObj.total=item.s;
                   arrproAcclist.push(arrObj);
                });
                $this.SourceDevice=$this.CustomSort(arrproAcclist);
                if($this.SourceDevice.length>0){
                    $this.pieSourceDeviceData=$this.SourceDevice;
                }
               }
            }
          );
      },
      getTimeParagraphInfo:function(){
          var $this = this; 
          $this.$api.get("/index/tg_shiduan?starttime=" + $this.startDaytime + "&endtime=" + $this.endDaytime,null,function(res) {
               if(res){
                var arrTeam = [];
                res.data.forEach(function(item){
                   var arrObj={
                       name:'',
                       count:0,
                   };
                   arrObj.name=item.time;
                   arrObj.count=item.count;
                   arrTeam.push(arrObj);
                });
                $this.TimeParagraph=$this.CustomSort($this.sortShiDuanlist(arrTeam));
                if($this.TimeParagraph.length > 0){
                    $this.pieTimeParagraphData=$this.TimeParagraph;
                }
               }
            }
          );
      },
      //来源词 sourceterm
      getSourceTermInfo:function(){
          var $this = this; 
          $this.$api.get("/index/tg_laiyuanword",null,function(res) {
               if(res){
                  var arrTeam = [];
                  res.data.forEach(function(item){
                    var arrObj={
                        name:'',
                        count:0,
                    };
                    arrObj.name=item.source;
                    arrObj.count=item.count;
                    arrTeam.push(arrObj);
                  });
                  $this.SourceTerm=$this.CustomSort(arrTeam);
                  var arrTeamlist = [];
                  $this.SourceTerm.forEach(function(item,index){
                      if(index<=5){
                        arrTeamlist.push(item);
                      }
                  });
                  $this.pieSourceTermData=arrTeamlist;
               }
            }
          );
      },
      //客户搜索词 searchword
      getSearchWordInfo:function(){
          var $this = this; 
          $this.$api.get("/index/tg_searchword",null,function(res) {
               if(res){
                  var arrTeam = [];
                  res.data.forEach(function(item){
                    var arrObj={
                        name:'',
                        count:0,
                    };
                    arrObj.name=item.search;
                    arrObj.count=item.count;
                    arrTeam.push(arrObj);
                  });
                  $this.SearchWord=$this.CustomSort(arrTeam);
                  var arrTeamlist = [];
                  $this.SearchWord.forEach(function(item,index){
                      if(index<=5){
                        arrTeamlist.push(item);
                      }
                  });
                  $this.pieSearchWordData=arrTeamlist;
               }
            }
          );
      },
      //来源页面 sourcepage
      getSourcePageInfo:function(){
          var $this = this; 
          $this.$api.get("/index/tg_laiyuanpage?starttime=" + $this.startDaytime + "&endtime=" + $this.endDaytime,null,function(res) {
               if(res){
                  var arrPage = [];
                  var arrHx = [];
                  var arrFt = [];
                  var arrZd = [];
                  res.data.forEach(function(item){
                    var arrObj={
                        name:'',
                        pinpai:'',
                        count:0,
                        url:''
                    };
                    if(item.pinpai==1){
                      arrObj.pinpai="红星";
                      arrObj.url=item.url.substring(item.url.lastIndexOf("\/") + 1, item.url.length);
                      arrObj.count=item.count;
                      arrObj.name=item.url;
                      arrHx.push(arrObj);
                    }else if(item.pinpai==2){
                      arrObj.pinpai="富特";
                      arrObj.url=item.url.substring(item.url.lastIndexOf("\/") + 1, item.url.length);
                      arrObj.count=item.count;
                      arrObj.name=item.url;
                      arrFt.push(arrObj);
                    }else{
                      arrObj.pinpai="中德";
                      arrObj.url=item.url.substring(item.url.lastIndexOf("\/") + 1, item.url.length);
                      arrObj.count=item.count;
                      arrObj.name=item.url;
                      arrZd.push(arrObj);
                    }
                  });
                  arrPage.push($this.CustomSort(arrHx),$this.CustomSort(arrFt),$this.CustomSort(arrZd));
                  $this.SourcePage=arrPage;
                  var arrPagelist = [];
                  $this.SourcePage.forEach(function(item,index){
                    var arrPageitemlist = [];
                    item.forEach(function(items,indexs){
                      if(indexs<=5){
                        arrPageitemlist.push(items);
                      }
                    });
                    arrPagelist.push(arrPageitemlist);
                  });
                  $this.pieSourcePageData=arrPagelist;
               }
            }
          );
      },
      //页面受众特征 Audience character
      getAudienceCharacterInfo:function(){
          var $this = this; 
          $this.$api.get("/index/tg_shouzhong",null,function(res) {
               if(res){
                  var arrTeam = [];
                  res.data.forEach(function(item){
                    var arrObj={
                        name:'',
                        count:0,
                    };
                    arrObj.name=item.year;
                    arrObj.count=item.count;
                    arrTeam.push(arrObj);
                  });                  
                  $this.pieAudienceCharacterData=$this.AudienceCharacter=$this.CustomSort(arrTeam);
               }
            }
          );
      },
      A_trendWeekPieChart:function(Atrend){
        var $this=this;
        var EnData=Atrend;
        var arrlist = [];
        var otherObj={
          count:0,
          percent:'',
        };
        EnData.forEach(function(item,index){
            var arrObj={
              name:'',
              count:0,
            };
            arrObj.name=item.date;
            arrObj.count=item.count;
            otherObj.count += item.count;
            arrlist.push(arrObj);
        });
        $this.pieA_trendWeekData=arrlist;
        otherObj.percent=Math.floor(EnData[EnData.length-1].count/otherObj.count * 10000)/100 + '%';
        $this.A_trendAccount=otherObj;
      },
      A_AccountWeekRingChart:function(Atrend){
        var $this=this;
        var EnData=Atrend;
        var arrlist=[];        
        var otherOne={
          name:'一组',
          count:0,
          total:0,
          percent:0,
        };
        otherOne.count=EnData.n;
        otherOne.total=EnData.s;
        otherOne.percent=parseFloat(EnData.rat);
        arrlist.push(otherOne);
        $this.pieA_AccountWeekData=arrlist;
        $this.A_AccountWeek=otherOne;
      },
      C_trendWeekPieChart:function(Atrend){
        var $this=this;
        var EnData=Atrend;
        var arrlist = [];
        var otherObj={
          count:0,
          percent:'',
        };
        EnData.forEach(function(item,index){
            var arrObj={
              name:'',
              count:0,
            };
            arrObj.name=item.date;
            arrObj.count=item.count;
            otherObj.count += item.count;
            arrlist.push(arrObj);
        });
        $this.pieC_trendWeekData=arrlist;
        otherObj.percent=Math.floor(EnData[EnData.length-1].count/otherObj.count * 10000)/100 + '%';
        $this.C_trendAccount=otherObj;
      },
      C_AccountWeekRingChart:function(Atrend){
        var $this=this;
        var EnData=Atrend;
        var arrlist=[];
        var otherOne={
          name:'三组',
          count:0,
          total:0,
          percent:0,
        };
        otherOne.count=EnData.n;
        otherOne.total=EnData.s;
        otherOne.percent=parseFloat(EnData.rat);
        arrlist.push(otherOne);
        $this.pieC_AccountWeekData=arrlist;
        $this.C_AccountWeek=otherOne;
      },
      BrandTrendPieChart:function(Atrend){
        var $this=this;
        var EnData=Atrend;
        var arrlist=[];
        EnData.forEach(function(item,index){
          var arrObj={
              name:'',
              count:0,
              time:''
          };
          if(item.pinpai==1){
            arrObj.name="红星"
          }
          if(item.pinpai==2){
            arrObj.name="中德"
          }
          if(item.pinpai==3){
            arrObj.name="富特"
          }
          arrObj.count=item.count;
          arrObj.time=item.date;
          arrlist.push(arrObj);
        });
        $this.BrandTrend=arrlist;
        $this.pieBrandTrendData=arrlist;
        console.log($this.pieBrandTrendData,'$this.pieBrandTrendData');
      },
      ProductsAccountPieChart:function(Atrend){
        var $this=this;
        var EnData=Atrend;
        var arrlist = [];
        var otherObj={
          name:'其它',
          count:0,
          percent:0,
          total:0
        };
        EnData.forEach(function(item,index){
          if(index<=8){
            arrlist.push(item);
          }else{
            otherObj.count += item.count;
            otherObj.total = item.total;
            otherObj.percent += item.percent;
          }
        });
        arrlist.push(otherObj);
        $this.pieProductsAccountData=arrlist;
      },
      SourceCountriesPieChart:function(Atrend){
        var $this=this;
        var EnData=Atrend;
        var arrlist = [];
        EnData.forEach(function(item,index){
          if(index<=5){
            arrlist.push(item);
          }
        });
        $this.pieSourceCountriesData=arrlist;
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
      handleQueryBtn:function(){
        var $this = this;
        $this.EnallData();
        $this.getSourceDeviceInfo();
      },
      handlezuyuanBtn:function(){
        var $this = this;
        $this.TimePlug();
        $this.pieTeamMemberData=[];
        $this.getTeamMemberInfo();
      },
      handleshiduanBtn:function(){
        var $this = this;
        $this.TimePlug();
        $this.pieTimeParagraphData=[];
        $this.getTimeParagraphInfo();
      },
      // 排序列表并补齐缺失数据
      sortlist: function(element, list,timeDate) {
        var typeList = timeDate;
        var brandList = list;
        var brandData = [];
        
        brandList.forEach(function(item) {
          var itemArray = [];
          element.forEach(function(items) {
            if (item == items.name) {
              itemArray.push(items);
            }
          });
          brandData.push(itemArray);
        });
        var sortList = [];
        brandData.forEach(function(items) {
          typeList.forEach(function(item) {
            var itemData = {};
            itemData.time = item;
            var itemTime = items.find(function(e) {
              return e.time == item;
            });
            if (itemTime) {
              itemData.count = itemTime.count;
              itemData.name = itemTime.name;
            } else {
              itemData.count = 0;
              itemData.name = items[0].name;
            }
            sortList.push(itemData);
          });
        });
        return sortList;
      },
      // 时段排序列表并补齐缺失数据
      sortShiDuanlist: function(element) {
        var typeList =[
          "0-3",
          "3-6",
          "6-9",
          "9-12",
          "12-15",
          "15-18",
          "18-21",
          "21-24"
        ];        
        var shiduanData = [];
        var sortList = [];
        shiduanData = [element];
        shiduanData.forEach(function(items) {
          typeList.forEach(function(item) {
            var itemData = {};
            itemData.name = item;
            var itemTime = items.find(function(e) {
              return e.name == item;
            });
            if (itemTime) {
              itemData.count = itemTime.count;
              itemData.name = itemTime.name;
            } else {
              itemData.count = 0;
              itemData.name = items[0].name;
            }
            sortList.push(itemData);
          });
        });
        return sortList;
      },
      // 获取图表中的线条所属名称列表
      screenlist: function(element) {
        var result = [];
        element.forEach(function(item,index){
          if (result.indexOf(item.name) == -1) {
            result.push(item.name);
          }
        });
        return result;
      },
      // 日期比较大小
      compareDate: function(a, b) {
        var reg = /[^\d+]/;
        var arr1 = a.split(reg);
        var arr2 = b.split(reg);
        var date1 = new Date(arr1[0], arr1[1], arr1[2]);
        var date2 = new Date(arr2[0], arr2[1], arr2[2]);
        return date1 - date2;
      },
      // 计算总日期列表
      gettimeDate(begin, end) {
        var arr1= begin.split("-");
        var arr2= end.split("-");
        var arr1_= new Date();
        var arrTime = [];
        arr1_.setUTCFullYear(arr1[0], arr1[1] - 1, arr1[2]);
        var arr2_= new Date();
        arr2_.setUTCFullYear(arr2[0], arr2[1] - 1, arr2[2]);
        var unixDb = arr1_.getTime();
        var unixDe = arr2_.getTime();
        for (var k = unixDb; k <= unixDe;) {
          arrTime.push(this.datetimeparse(k, 'YY-MM-DD'));
          k = k + 24 * 60 * 60 * 1000;
        }
        return arrTime;
      },  
      // 时间格式处理
      datetimeparse(timestamp, format, prefix) {
        if (typeof timestamp == "string") {
          timestamp = Number(timestamp);
        }
        //转换时区
        var currentZoneTime = new Date(timestamp);
        var currentTimestamp = currentZoneTime.getTime();
        var offsetZone = currentZoneTime.getTimezoneOffset() / 60; //如果offsetZone>0是西区，西区晚
        var offset = null;
        //客户端时间与服务器时间保持一致，固定北京时间东八区。
        offset = offsetZone + 8;
        currentTimestamp = currentTimestamp + offset * 3600 * 1000;

        var newtimestamp = null;
        if (currentTimestamp) {
          if (currentTimestamp.toString().length === 13) {
            newtimestamp = currentTimestamp.toString();
          } else if (currentTimestamp.toString().length === 10) {
            newtimestamp = currentTimestamp + "000";
          } else {
            newtimestamp = null;
          }
        } else {
          newtimestamp = null;
        }
        var dateobj = newtimestamp
          ? new Date(parseInt(newtimestamp))
          : new Date();
        var YYYY = dateobj.getFullYear();
        var MM =
          dateobj.getMonth() > 8
            ? dateobj.getMonth() + 1
            : "0" + (dateobj.getMonth() + 1);
        var DD =
          dateobj.getDate() > 9 ? dateobj.getDate() : "0" + dateobj.getDate();
        var HH =
          dateobj.getHours() > 9 ? dateobj.getHours() : "0" + dateobj.getHours();
        var mm =
          dateobj.getMinutes() > 9
            ? dateobj.getMinutes()
            : "0" + dateobj.getMinutes();
        var ss =
          dateobj.getSeconds() > 9
            ? dateobj.getSeconds()
            : "0" + dateobj.getSeconds();
        var output = "";
        var separator = "/";
        if (format) {
          separator = format.match(/-/) ? "-" : "/";
          output += format.match(/yy/i) ? YYYY : "";
          output += format.match(/MM/)
            ? (output.length ? separator : "") + MM
            : "";
          output += format.match(/dd/i)
            ? (output.length ? separator : "") + DD
            : "";
          output += format.match(/hh/i) ? (output.length ? " " : "") + HH : "";
          output += format.match(/mm/) ? (output.length ? ":" : "") + mm : "";
          output += format.match(/ss/i) ? (output.length ? ":" : "") + ss : "";
        } else {
          output += YYYY + separator + MM + separator + DD;
        }
        output = prefix ? prefix + output : output;

        return newtimestamp ? output : "";
      },
      //点击查看更多
      handleProMore:function(){
        var $this=this;
        $this.showMask=!$this.showMask;
        $this.showAbs=!$this.showAbs;
      },
      //点击查看更多词
      handleSearchWordMore:function(valdata,valtype){
        var $this=this;
        $this.showMask=!$this.showMask;
        $this.showWord=!$this.showWord;
        var DialogWord={};
        DialogWord.type=valtype;
        DialogWord.DialogWordlist=valdata;
        $this.DialogWord=DialogWord;
      },
      //点击来源页面跳转
      See:function(e){
        window.open(e, '_blank');
      },
      //监听模态框数据
      listenModal:function(a){
        var $this=this;
        $this.showAbs = a;
        $this.showMask = a;
      },
      listenSouCouModal:function(a){
        var $this=this;
        $this.showCou = a;
        $this.showMask = a;
      },
      listenWordModal:function(a){
        var $this=this;
        $this.showWord = a;
        $this.showMask = a;
      },
      //点击查看更多来源国家
      handleCountriesMore:function(){
        var $this=this;
        $this.showMask=!$this.showMask;
        $this.showCou=!$this.showCou;
      },
      //
      handleType:function(type){
        var $this=this;
        var v_type=type;
        $this.Submenu.forEach(function(item){
             if(v_type==item.type){
               item.isOn=!item.isOn;
             }
        })
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
        &.areabox{
        padding:0px;
        }
        &.ringbox{
           padding:30px 30px 30px 20px;
           overflow: hidden;
           dt{
             float: left;
             width:150px;
             text-align: left;
           }
           dd{
             float: right;
             width:40%;
             text-align:right;
             padding-top:45px;
              strong{
              clear: both;
              display: block;
              font-size: 12px;
              color: #7c818a;
              font-weight: normal;
              }
              span{
              clear: both;
              display: block;
              font-size:25px;
              color: #21262e;
              font-weight: bold;
              line-height: 1;
              padding-bottom:5px;
              }
           }
        }
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
      overflow: hidden;
    }
  }
}
.weeknum{
  clear: both;
  display: block;
  padding:15px 20px 15px 20px;
  overflow: hidden;
  dd{
    float: left;
    width: 50%;
    text-align: left;
    strong{
    clear: both;
    display: block;
    font-size: 12px;
    color: #7c818a;
    font-weight: normal;
    }
    span{
    clear: both;
    display: block;
    font-size: 30px;
    color: #21262e;
    font-weight: bold;
    }
  }
  dt{
    float: right;
    width: 50%;
    text-align: right;
    strong{
    clear: both;
    display: block;
    font-size: 12px;
    color: #7c818a;
    font-weight: normal;
    }
    span{
    clear: both;
    display: block;
    font-size: 20px;
    color: #02d560;
    font-weight: bold;
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
        .sources_count{
           float: left;
           font-style: normal;
           font-size: 15px;
           font-weight: bold;
           display: inline-block;
           color: #3e404f;
        }
        .sources_percent{
           font-style: normal;
           font-size: 15px;
           font-weight: bold;
           width:100px;
           display: inline-block;
           color: #4dae67;
        }
      }
      &.sourcesbtn{
        clear: both;
        text-align: center;
        background: #f9f9f9;
        padding: 8px 20px;
        font-size: 14px;
        font-weight: bold;
        color: #5f5f5f;
        cursor: pointer;
        &:hover{
          color: #fff;
          background:#f30;
        }
      }
    }
}
.sourcesPage{  
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
        font-size:14px;
        color: #666;
        line-height:24px;
        display: inline-block;
        font-weight: normal;
        cursor: pointer;
        &:hover{
          color: #f30;
          font-weight: bold;
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
        color:#3e404f;
      }
      &.sourcesPagebtn{
        clear: both;
        text-align: center;
        background: #f9f9f9;
        padding: 8px 20px;
        font-size: 14px;
        font-weight: bold;
        color: #5f5f5f;
        cursor: pointer;
        &:hover{
          color: #fff;
          background:#f30;
        }
      }
    }
}
.searchnav{
  clear: both;
  display: block;
  padding:15px 15px 10px 15px;
  overflow: hidden;
  span{
    
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #FFF;
    border: 1px solid #DCDFE6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    float: left;
    margin-bottom: 5px;
    margin-left: 5px;
    color: #409EFF;
    background: #ecf5ff;
    border-color: #b3d8ff;
    padding: 9px 15px;    
    font-size: 12px;
    border-radius: 3px;
    &.active{      
      background: #3a8ee6;
      border-color: #3a8ee6;
      color: #FFF;
      outline: 0;
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
</style>
