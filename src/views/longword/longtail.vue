<template>
  <el-container direction="vertical">
    <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <i class="icon el-icon-position"></i>
            <el-breadcrumb-item>长尾词</el-breadcrumb-item>
            <el-breadcrumb-item>长尾词询盘</el-breadcrumb-item>
        </el-breadcrumb>
    </el-header>
    <el-scrollbar style="height:100%">
        <el-row :gutter="20">
          <el-col :span="24">
              <div class="grid-content bg-purple-light searchdlBox">
                  <div class="piecharttit"><font>(默认当前一天)</font></div>
                  <dl class="searchdl01">
                    <dd>
                      <el-select v-model="searchGroup" clearable placeholder="请选择小组">
                        <el-option v-for="item in searchGroupList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                      </el-select>
                    </dd>
                    <dd>
                      <el-input placeholder="请选择域名" v-model="searchDomainNa" clearable></el-input>
                    </dd>
                    <dd>    
                      <el-select v-model="searchName" clearable placeholder="请选择姓名">
                        <el-option v-for="item in searchNameList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                      </el-select>
                    </dd>
                    <dd>
                      <el-input placeholder="请选择后缀" v-model="searchSuffix" clearable></el-input>
                    </dd>
                  </dl>
                  <dl class="searchdl02">
                    <dt>
                        <span class="searchdl02Txt">域名分配日期</span>
                        <search-timeday class="timebox" v-on:childTimeDayData="listenDomainday"></search-timeday>
                    </dt>
                    <dt>
                        <span class="searchdl02Txt">询盘时间</span>
                        <search-timeday class="timebox" v-on:childTimeDayData="listenTimeday"></search-timeday>
                        <span class="searchbtn" v-on:click="handleResBtn">查询</span>
                    </dt>
                  </dl>
              </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
              <div class="grid-content bg-purple-light PersonallongBox">
                  <dl class="Personallong" v-for="(item,index) in teamNum" :key="index">
                      <dt v-for="(items) in item">
                          <i class="el-icon-user-solid"></i>{{items.name}}<span>{{items.count}}</span>
                      </dt>
                  </dl>
              </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
              <div class="grid-content bg-purple-light">
                  <div class="sources">
                      <ul>                    
                          <li class="sources_tit">
                              <span class="span01">姓名</span>
                              <span class="span02">组合</span>
                              <span class="span03">域名分配日期<i><s v-on:click="handleAscOrderOnlineTime(LongTail)" class="el-icon-caret-top"></s><s v-on:click="handleDesOrderOnlineTime(LongTail)" class="el-icon-caret-bottom"></s></i></span>
                              <span class="span04">域名</span>
                              <span class="span05">国家</span>
                              <span class="span06">询盘来源</span>
                              <span class="span07">产品名称</span>
                              <span class="span08">来询盘时间<i><s v-on:click="handleAscOrderEnqTime(LongTail)" class="el-icon-caret-top"></s><s v-on:click="handleDesOrderEnqTime(LongTail)" class="el-icon-caret-bottom"></s></i></span>
                          </li>
                          <li class="sources_main" v-for="(item,index) in LongTail" :key="index">
                              <span class="span01">{{item.remark1}}</span>
                              <span class="span02">{{item.remark3}}</span>
                              <span class="span03">{{item.online_time}}</span>
                              <span class="span04"><i @click="See(item.url)">{{item.host}}</i></span>
                              <span class="span05">{{item.area}}</span>
                              <span class="span06">{{item.mode}}</span>
                              <span class="span07">{{item.key}}</span>
                              <span class="span08">{{item.datetimeday}}<i>{{item.datetimedate}}</i></span>
                          </li>
                      </ul>
                  </div>
              </div>
          </el-col>
        </el-row>
    </el-scrollbar>
  </el-container>
</template>
<script>
import axios from 'axios';
import searchTimeday from "../public/searchTimeDay";
export default {
    name: 'addlongPage',
    data() {
      return {
        isClick:false,
        LongTail:[],
        teamNum:[],
        timeDomainDate:{
          startDaytime:'',
          endDaytime:'', 
        },
        timeDayDate:{
          startDaytime:'',
          endDaytime:'', 
        },                              // 日期插件传递值
        startDomaintime:'',             // 查询域名开始日期
        endDomaintime:'',               // 查询域名结束日期
        startDaytime:'',                // 查询开始日期
        endDaytime:'',                  // 查询结束日期
        searchGroup:'',                 // 查询组别        
        searchGroupList:[
          {name:'组合一'},
          {name:'组合三'},
        ],
        searchDomainNa:'',              // 查询域名
        searchName:'',                  // 查询姓名        
        searchNameList:[
          {name:'李伟东'},
          {name:'刘燕永'},
          {name:'徐凌霄'},
          {name:'王雷'},
          {name:'王文博'},
          {name:'常怡广'},
          {name:'王俊威'},
          {name:'李鹏远'},
          {name:'梁迎春'},
          {name:'刘培斌'},
          {name:'刘松海'},
          {name:'孟君豪'},
          {name:'张旭'},
        ],
        searchSuffix:'',                // 查询后缀
      }
    },
    components: {
      searchTimeday
    },
    mounted() {
      var $this=this;
      $this.handleResBtn();
    },
    methods: {
      getLongTailInfo:function(){
        var $this = this;
        $this.$api.get("/index/longword_liebiao?starttime=" + $this.startDaytime + "&endtime=" + $this.endDaytime + "&remark1=" + $this.searchName + "&host=" + $this.searchDomainNa + "&ym_hou=" + $this.searchSuffix,null,function(res) {
            if (res.data.length>0) {
              var arr01=[];
              var arr02=[];
              res.data.forEach(function(item,index){
                  var arrObj={
                    area:'',
                    datetimeday:'',
                    datetimedate:'',
                    online_time:'',
                    host:'',
                    key:'',
                    mode:'',
                    remark1:'',
                    remark3:'',
                    url:''
                  }
                  arrObj.area=item.area;
                  arrObj.datetime=item.datetime;
                  if(item.remark1=='Email'){
                      arrObj.online_time=item.datetime.split(" ")[0];
                  }else{                  
                      arrObj.online_time=item.online_time;
                  }
                  //arrObj.online_time=item.online_time;
                  arrObj.datetimeday=item.datetime.split(" ")[0];
                  arrObj.datetimedate=item.datetime.split(" ")[1];
                  arrObj.host=item.host;
                  arrObj.key=item.key;
                  arrObj.mode=item.mode;
                  arrObj.remark1=item.remark1;
                  arrObj.remark3=item.remark3;
                  arrObj.url=item.url;
                  arr01.push(arrObj);
              });
              arr02=$this.filterDate(arr01,$this.startDomaintime,$this.endDomaintime);
              $this.LongTail=$this.filtergroup(arr02,$this.searchGroup);
              $this.getTeamNum();
              $this.isClick=!$this.isClick;
            }
          }
        );
      },
      getTeamNum:function(){
        var $this = this;
        var OldArr=[];
        $this.LongTail.forEach(function(item, index) {
            var arrObj={
                name:'',
                count:0,
                team:''
            }
            arrObj.name=item.remark1;
            arrObj.team=item.remark3;
            OldArr.push(arrObj);
        });
        //数组去重然后放在一个新的数组里面
        var newStrArr = [];
        OldArr.forEach(function(item, index) {
          var newStr=JSON.stringify(item);
          if(newStrArr.indexOf(newStr)==-1){
              newStrArr.push(newStr);
            }
        });
        var newObjArr=[];
        newStrArr.forEach(function(item, index) {
          newObjArr.push(JSON.parse(item));
        });
        //把新的数组与之前的数组进行对比如果相同就让number++最后得出vant-v需要的数组
        OldArr.map(function(item, index) {
          newObjArr.map(function(item1, index1) {
            if (item.name == item1.name && item.team == item1.team) {
              item1.count++;
            }
          });
        });
        $this.getTeamArr(newObjArr);
      },
      getTeamArr:function(arrDate){
        var $this = this;
        var arrList01=[];
        var arrList02=[];
        arrDate.forEach(function(item,index){
            var arrObj={
                name:'',
                count:0,
                team:''
            }
            if(item.team=='组合一'){
              arrObj.name=item.name;
              arrObj.count=item.count;
              arrObj.team=item.team;
              arrList01.push(arrObj);
            }
            if(item.team=='组合三'){
              arrObj.name=item.name;
              arrObj.count=item.count;
              arrObj.team=item.team;
              arrList02.push(arrObj);
            }
        });
        var arrTotal01={
            name:'组合一',
            count:0,
            team:'组合一'
        }
        var arrTotal02={
            name:'组合三',
            count:0,
            team:'组合三'
        }
        arrList01.forEach(function(item,index){
            arrTotal01.count += item.count;
        });
        arrList02.forEach(function(item,index){
            arrTotal02.count += item.count;
        });
        arrList01.unshift(arrTotal01);
        arrList02.unshift(arrTotal02);
        $this.teamNum.push(arrList01,arrList02);
      },
      //点击来源页面跳转
      See:function(e){
        window.open(e, '_blank');
      },
      //接收域名分配日期
      listenDomainday:function(TDate){
        var $this=this;
        $this.timeDomainDate=TDate;
      },
      //接收来询盘时间
      listenTimeday:function(TDate){
        var $this=this;
        $this.timeDayDate=TDate;
      },
      //域名时间插件
      TimeDomainPlug:function(){
        var $this = this;
        if($this.timeDomainDate.startDaytime!=''&&$this.timeDomainDate.endDaytime!=''){
            $this.startDomaintime=$this.timeDomainDate.startDaytime;
            $this.endDomaintime=$this.timeDomainDate.endDaytime;
        }else{
            $this.startDomaintime='';
            $this.endDomaintime='';
        }
      },
      //询盘时间插件
      TimeDayPlug:function(){
        var $this = this;
        if($this.timeDayDate.startDaytime!=''&&$this.timeDayDate.endDaytime!=''){
            $this.startDaytime=$this.timeDayDate.startDaytime;
            $this.endDaytime=$this.timeDayDate.endDaytime;
        }else{
            $this.startDaytime='';
            $this.endDaytime='';
        }
      },
      handleResBtn:function(){
        var $this = this;
        if(!$this.isClick){
          $this.isClick = !$this.isClick;
          $this.LongTail=[];
          $this.teamNum=[];
          $this.TimeDayPlug();
          $this.TimeDomainPlug();
          $this.getLongTailInfo();
        }
      },
      // 过滤日期
      filterDate: function(initData, date1, date2) {
        var $this = this;
        var startDate = date1;
        var endDate = date2;
        var newData = [];
        if (date1 == "" && date2 == "") {
          newData = initData;
        } else {
          initData.forEach(function(item) {
              if ($this.compareDate(item.online_time, startDate) >= 0 && $this.compareDate(endDate, item.online_time) >= 0){
                if(item.remark1!="Email"){
                    newData.push(item);
                }
              }
          });
        }
        return newData;
      },
      // 日期比较大小
      compareDate: function(a, b) {
        var reg = /[^\d+]/;
        var date1 = new Date(a);
        var date2 = new Date(b); 
        if(date1>date2){     
           return date1 - date2;
        }
        // var arr1 = a.split(reg);
        // var arr2 = b.split(reg);
        // var date1 = new Date(arr1[0], arr1[1], arr1[2]);
        // var date2 = new Date(arr2[0], arr2[1], arr2[2]);   
      },
      filtergroup:function(initData, searchGroupData){
          var newData = [];
          if (searchGroupData) {
            initData.forEach(function(item) {
                if (item.remark3 == searchGroupData) {
                  newData.push(item);
                }
            });
          } else {
            newData = initData;
          }
          return newData;
      },
      // 域名上传时间升序排列
      handleAscOrderOnlineTime:function(DateList){
        var $this = this;
        var newArr = DateList;
        $this.LongTail=[];
        newArr.sort(function(a, b) {
            var value1 = a.online_time.replace(/-/g,'/');
            var value2 = b.online_time.replace(/-/g,'/');
            var aTime = new Date(value1).getTime();
            var bTime = new Date(value2).getTime();
            return aTime - bTime;
        });
        $this.LongTail = newArr;
      },
      // 域名上传时间降序排列
      handleDesOrderOnlineTime:function(DateList){
        var $this = this;
        var newArr = DateList;
        $this.LongTail=[];
        newArr.sort(function(a, b) {
            var value1 = a.online_time.replace(/-/g,'/');
            var value2 = b.online_time.replace(/-/g,'/');
            var aTime = new Date(value1).getTime();
            var bTime = new Date(value2).getTime();
            return bTime - aTime;
        });
        $this.LongTail = newArr;
      },      
      // 询盘时间升序排列
      handleAscOrderEnqTime:function(DateList){
        var $this = this;
        var newArr = DateList;
        $this.LongTail=[];
        newArr.sort(function(a, b) {
            var value1 = a.datetimeday.replace(/-/g,'/');
            var value2 = b.datetimeday.replace(/-/g,'/');
            var aTime = new Date(value1).getTime();
            var bTime = new Date(value2).getTime();
            return aTime - bTime;
        });
        $this.LongTail = newArr;
      },
      // 询盘时间降序排列
      handleDesOrderEnqTime:function(DateList){
        var $this = this;
        var newArr = DateList;
        $this.LongTail=[];
        newArr.sort(function(a, b) {
            var value1 = a.datetimeday.replace(/-/g,'/');
            var value2 = b.datetimeday.replace(/-/g,'/');
            var aTime = new Date(value1).getTime();
            var bTime = new Date(value2).getTime();
            return bTime - aTime;
        });
        $this.LongTail = newArr;
      },
    }
}
</script>

<style lang="scss" scoped>
.el-header{
  background-color:#fff;
  padding:10px 30px;
  margin-bottom:20px;
  overflow:hidden;
}
.el-row {
  margin-bottom:20px;
  margin-left:0px!important;
  margin-right:0px!important;
  padding:0px 10px;
  .el-col {
    border-radius:5px;
    .grid-content {
      clear:both;
      display:block;
      width:100%;
      border-radius:5px;
      //padding:20px;
      .piechartbox{
        clear:both;
        display:block;
        padding:20px;
      }
      &.perclass{
        clear:both;
        display:block;
        text-align:left;
        padding:20px;
        font-size:16px;
        cursor:pointer;
        span{
          font-weight:bold;
          color:#0277d5;
          font-size:20px;
        }
      }
    }
    .bg-purple-light {
      background:#fff;
    }
  }
}
.sources{
    clear:both;
    display:block;
    padding:5px 20px;
    overflow:hidden;
    ul{
      clear:both;
      display:block;
      width:100%;
      padding-top:15px;
      padding-bottom:15px;
      li{
        clear:both;
        display:block;
        text-align:left;
        overflow:hidden;
        padding:12px 0px;
        line-height:24px;
        &:nth-child(odd){
          background:#f5f5f5;
        }
        &.sources_tit{
          clear:both;
          overflow:hidden;
          background:#e9eef3;
          span{
            float:left;
            line-height:24px;
            font-size:15px;
            color:#3e404f;
            font-weight:bold;
            height:24px;
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
        &.sources_main{
          clear:both;
          overflow:hidden;
          span{
            float:left;
            line-height:24px;
            font-size:14px;
            min-height:24px;
            word-break:break-all;
            &.span02{
              height:auto;
              min-height:24px;
              i{
                display:inline-block;
                font-style:normal;
                  cursor:pointer;
                  &:hover{
                    color:#f30;
                    font-weight:bold;
                  }
              }
            }
            &.span06{
               font-size:14px;
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
    /deep/ .el-date-editor .el-range-separator {
        padding:0px!important;
        }
    /deep/ .timebox {
        padding:3px 10px!important;
        height:30px!important;
        line-height:24px!important;
        .el-input__icon {
            line-height:24px!important;
        }
        &.el-date-editor .el-range-separator {
            line-height:24px!important;
        }
        &.el-date-editor .el-range__icon{
            line-height:24px!important;
        }
    }
    /deep/ .searchbtn {
        font-size:14px;
        height:30px!important;
        padding:0px 10px;
    }
}
.searchdlBox{padding:10px 0px;}
.searchdl01 {
  clear: both;
  display: block;
  overflow: hidden;
  padding:10px 20px;
  dd{
    float:left;
    width:150px;
    margin-right:15px;
    // /deep/ .el-input__inner{height:30px!important;line-height:28px!important;}
    // /deep/ .el-input__icon{line-height:30px!important;}
  }
}
.searchdl02 {
  clear: both;
  display: block;
  overflow: hidden;
  padding:10px 20px 10px 0px;
  dt{
    float:left;
    .searchdl02Txt{
      float: left;
      font-size:16px;
      color:#666;
      line-height:40px;
      padding:0px 20px;
    }
    /deep/ .searchbtn {
        float: right;
        background: #409EFF;
        color: #fff;
        border-radius: 5px;
        line-height: 40px;
        margin-left: 15px;
        font-size: 16px;
        height: 40px !important;
        padding: 0px 30px;
        cursor: pointer;
        &:hover {
          background:#67b0fb;
        }
    }
    /deep/ .el-date-editor .el-range-separator{    width: auto !important;}
  }
}
.PersonallongBox{padding:10px 0px;}
.Personallong{
  clear:both;
  overflow:hidden;
  padding:10px 20px 10px 20px;
  dt{
    float:left;
    width:8.5%;
    text-align:left;
    padding:10px 15px;
    cursor:pointer;
    background:#f7f7f7;
    border-radius:10px;
    margin-right:1%;
    text-align:left;
    font-size:14px;
    color:#647698;
    font-weight:bold;
    i{
      float:left;
      font-size:16px;
      color:#647698;
      margin-right:7px;
      margin-top:7px;
    }
    span{
      float:right;
      color:#0277d5;
      font-size:14px;
    }
  }
}
.span01{width:8%;text-align:center;color:#3e404f;}
.span02{width:8%;text-align:left;color:#3e404f;}
.span03{width:14%;text-align:left;color:#3e404f;}
.span04{width:25%;text-align:left;i{display:inline-block;font-style:normal;cursor:pointer;color:#3e404f;&:hover{color:#f60;}}}
.span05{width:10%;text-align:left;color:#3e404f;}
.span06{width:10%;text-align:left;color:#3e404f;}
.span07{width:15%;text-align:left;color:#3e404f;}
.span08{width:10%;text-align:left;color:#3e404f;position:relative;i{clear:both;display:block;font-style:normal;font-size:12px;color:#bfbfbf;line-height:1;margin-top:-6px;}}
</style>