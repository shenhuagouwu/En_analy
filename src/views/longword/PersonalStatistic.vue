<template>
  <el-container direction="vertical">
    <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <i class="icon el-icon-position"></i>
            <el-breadcrumb-item>长尾词</el-breadcrumb-item>
            <el-breadcrumb-item>个人询盘站统计</el-breadcrumb-item>
        </el-breadcrumb>
    </el-header>
    <el-scrollbar style="height:100%">
        <el-row :gutter="20">
          <el-col :span="24">
              <div class="grid-content bg-purple-light searchdlBox">
                  <div class="piecharttit"><font>(默认当前一天)</font></div>
                  <dl class="searchdl01">
                    <dd>
                      <el-input placeholder="请选择域名" v-model="searchDomainNa" clearable></el-input>
                    </dd>
                    <dd>    
                      <el-select v-model="searchName" clearable placeholder="请选择姓名">
                        <el-option v-for="item in searchNameList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                      </el-select>
                    </dd>
                    <dd>
                      <el-select v-model="searchGroup" clearable placeholder="请选择小组">
                        <el-option v-for="item in searchGroupList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                      </el-select>
                    </dd>
                    <dt>
                        <span class="searchdl02Txt">域名分配日期</span>
                        <search-timeday class="timebox" v-on:childTimeDayData="listenTimeday"></search-timeday>
                        <span class="searchbtn" v-on:click="handleResBtn">查询</span>
                    </dt>
                  </dl>
              </div>
          </el-col>
        </el-row>
        <el-row :gutter="20"  v-if="Loading">
          <el-col :span="24">
              <loader></loader>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-else>
          <el-col :span="24">
              <div class="grid-content bg-purple-light">
                  <div class="sources">
                      <ul>                    
                          <li class="sources_tit">
                              <span class="span01">序号</span>
                              <span class="span02">域名</span>
                              <span class="span03">组合</span>
                              <span class="span04">询盘个数<i><s v-on:click="handleAscNum(Information)" class="el-icon-caret-top"></s><s v-on:click="handleDesNum(Information)" class="el-icon-caret-bottom"></s></i></span>
                              <span class="span05">姓名</span>
                              <span class="span06">分配日期<i><s v-on:click="handleAscOrderTime(Information)" class="el-icon-caret-top"></s><s v-on:click="handleDesOrderTime(Information)" class="el-icon-caret-bottom"></s></i></span>
                              <span class="span07">上线日期<i><s v-on:click="handleAscOrderOnlineTime(Information)" class="el-icon-caret-top"></s><s v-on:click="handleDesOrderOnlineTime(Information)" class="el-icon-caret-bottom"></s></i></span>
                              <span class="span08">过期日期<i><s v-on:click="handleAscOrderExpiredTime(Information)" class="el-icon-caret-top"></s><s v-on:click="handleDesOrderExpiredTime(Information)" class="el-icon-caret-bottom"></s></i></span>
                          </li>
                          <li class="sources_main" v-for="(item,index) in Information" :key="index">
                              <span class="span01">{{index+1}}</span>
                              <span class="span02">{{item.domain}}</span>
                              <span class="span03">{{item.zu}}</span>
                              <span class="span04">{{item.count}}</span>
                              <span class="span05">{{item.name}}</span>
                              <span class="span06">{{item.time}}</span>
                              <span class="span07">{{item.online_time}}</span>
                              <span class="span08">{{item.domain_expired_time}}</span>
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
import loader from "../public/loading";
import { mapGetters } from "vuex";
export default {
    name: 'personalstatisticPage',
    data() {
      return {
        isClick:false,
        Information:[],
        timeDate:{
          startDaytime:'',
          endDaytime:'', 
        },                           // 日期插件传递值
        starttime:'',                // 查询开始日期
        endtime:'',                  // 查询结束日期
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
        searchGroup:'',                 // 查询组别        
        searchGroupList:[
          {name:'组合一'},
          {name:'组合三'},
        ],
      }
    },
    components: {
      searchTimeday,
      loader
    },
    computed: {
      ...mapGetters(["Loading"]),
    },
    mounted() {
      var $this=this;
      $this.handleResBtn();
    },
    methods: {
      getInformationInfo:function(){
        var $this = this;
        $this.$store.commit('loading/showLoading');
        $this.$api.get("/index/web_inquiries_statistics?starttime=" + $this.starttime + "&endtime=" + $this.endtime + "&domain=" + $this.searchDomainNa + "&name=" + $this.searchName + "&zu=" + $this.searchGroup,null,function(res) {
            if (res.data) {
              var OldArr=res.data;
              $this.Information=OldArr;
              $this.$store.commit('loading/hideLoading');
            }
            $this.isClick=!$this.isClick;
          }
        );
      },
      //接收传递的时间
      listenTimeday:function(TDate){
        var $this=this;
        $this.timeDate=TDate;
      },
      //时间插件
      TimePlug:function(){
        var $this = this;
        if($this.timeDate.startDaytime!=''&&$this.timeDate.endDaytime!=''){
            $this.starttime=$this.timeDate.startDaytime;
            $this.endtime=$this.timeDate.endDaytime;
        }else{
            $this.starttime='';
            $this.endtime='';
        }
      },
      // 域名分配日期升序排列
      handleAscOrderTime:function(DateList){
        var $this = this;
        var newArr = DateList;
        $this.Information=[];
        newArr.sort(function(a, b) {
            var value1 = a.time.replace(/-/g,'/');
            var value2 = b.time.replace(/-/g,'/');
            var aTime = new Date(value1).getTime();
            var bTime = new Date(value2).getTime();
            return aTime - bTime;
        });
        $this.Information = newArr;
      },
      // 域名分配日期降序排列
      handleDesOrderTime:function(DateList){
        var $this = this;
        var newArr = DateList;
        $this.Information=[];
        newArr.sort(function(a, b) {
            var value1 = a.time.replace(/-/g,'/');
            var value2 = b.time.replace(/-/g,'/');
            var aTime = new Date(value1).getTime();
            var bTime = new Date(value2).getTime();
            return bTime - aTime;
        });
        $this.Information = newArr;
      },  
      // 域名上线日期升序排列
      handleAscOrderOnlineTime:function(DateList){
        var $this = this;
        var newArr = DateList;
        $this.Information=[];
        newArr.sort(function(a, b) {
            var value1 = a.online_time.replace(/-/g,'/');
            var value2 = b.online_time.replace(/-/g,'/');
            var aTime = new Date(value1).getTime();
            var bTime = new Date(value2).getTime();
            return aTime - bTime;
        });
        $this.Information = newArr;
      },
      // 域名上线日期降序排列
      handleDesOrderOnlineTime:function(DateList){
        var $this = this;
        var newArr = DateList;
        $this.Information=[];
        newArr.sort(function(a, b) {
            var value1 = a.online_time.replace(/-/g,'/');
            var value2 = b.online_time.replace(/-/g,'/');
            var aTime = new Date(value1).getTime();
            var bTime = new Date(value2).getTime();
            return bTime - aTime;
        });
        $this.Information = newArr;
      },
      // 域名过期日期升序排列
      handleAscOrderExpiredTime:function(DateList){
        var $this = this;
        var newArr = DateList;
        $this.Information=[];
        newArr.sort(function(a, b) {
            var value1 = a.domain_expired_time.replace(/-/g,'/');
            var value2 = b.domain_expired_time.replace(/-/g,'/');
            var aTime = new Date(value1).getTime();
            var bTime = new Date(value2).getTime();
            return aTime - bTime;
        });
        $this.Information = newArr;
      },
      // 域名过期日期降序排列
      handleDesOrderExpiredTime:function(DateList){
        var $this = this;
        var newArr = DateList;
        $this.Information=[];
        newArr.sort(function(a, b) {
            var value1 = a.domain_expired_time.replace(/-/g,'/');
            var value2 = b.domain_expired_time.replace(/-/g,'/');
            var aTime = new Date(value1).getTime();
            var bTime = new Date(value2).getTime();
            return bTime - aTime;
        });
        $this.Information = newArr;
      },
      // 询盘个数升序排列
      handleAscNum:function(DateList){
        var $this = this;
        var newArr = DateList;
        $this.Information=[];
        newArr.sort(function(a, b) {
            var value1 = a.count;
            var value2 = b.count;
            return value1 - value2;
        });
        $this.Information = newArr;
      },
      // 询盘个数降序排列
      handleDesNum:function(DateList){
        var $this = this;
        var newArr = DateList;
        $this.Information=[];
        newArr.sort(function(a, b) {
            var value1 = a.count;
            var value2 = b.count;
            return value2 - value1;
        });
        $this.Information = newArr;
      },
      handleResBtn:function(){
        var $this = this;
        if(!$this.isClick){
          $this.isClick = !$this.isClick;
          $this.Information=[];
          $this.TimePlug();
          $this.getInformationInfo(); 
        }
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
.PersonallongBox{padding:10px 0px; margin-bottom:20px;}
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
.span01{width:5%;text-align:center;color:#3e404f;}
.span02{width:20%;text-align:left;color:#3e404f;}
.span03{width:15%;text-align:center;color:#3e404f;}
.span04{width:10%;text-align:left;i{display:inline-block;font-style:normal;cursor:pointer;color:#3e404f;&:hover{color:#f60;}}}
.span05{width:10%;text-align:left;color:#3e404f;}
.span06{width:14%;text-align:left;color:#3e404f;}
.span07{width:13%;text-align:left;color:#3e404f;}
.span08{width:13%;text-align:left;color:#3e404f;position:relative;i{clear:both;display:block;font-style:normal;font-size:12px;color:#bfbfbf;line-height:1;margin-top:-6px;}}
</style>