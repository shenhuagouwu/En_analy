<template>
  <el-container direction="vertical">
    <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <i class="icon el-icon-position"></i>
            <el-breadcrumb-item>长尾词</el-breadcrumb-item>
            <el-breadcrumb-item>添加长尾词</el-breadcrumb-item>
        </el-breadcrumb>
    </el-header>
    <el-scrollbar style="height:100%">
        <el-row :gutter="20">
          <el-col :span="24">
                <dl class="Infotop">
                    <dt @click="handleBtn"><i class="el-icon-plus"></i>添加</dt>
                    <dd>                      
                      <el-select v-model="searchName" class="selectbrands" clearable placeholder="请选择姓名">
                        <el-option v-for="item in searchNameList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                      </el-select>
                    </dd>
                    <dd>
                      <el-select v-model="searchzuName" class="selectbrands" clearable placeholder="请选择小组">
                        <el-option v-for="item in searchzuNameList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                      </el-select>
                    </dd>
                    <dd>
                      <el-input placeholder="域名ID" v-model="searchDomainID" clearable></el-input>
                    </dd>
                    <dd>
                      <el-input placeholder="模板序号" v-model="searchMuban" clearable></el-input>
                    </dd>
                    <dd>
                      <el-input placeholder="请选择域名" v-model="searchDomainNa" clearable></el-input>
                    </dd>
                    <dd class="Infotopdd">
                      <search-time class="timebox" v-on:childTimeData="listenTimeday"></search-time>
                    </dd>
                    <dt @click="handleSearchBtn"><i class="el-icon-search"></i>查询</dt>
                    <dd>
                      <el-upload
                        class="upload-demo"
                        action=""                  
                        accept=".csv,.xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        :http-request="httpRequest"                        
                        :file-list="fileList">
                        <el-button type="primary">点击上传</el-button>
                      </el-upload>
                    </dd>
                </dl>
                <div class="InformationList">
                     <dl>
                       <dt>
                          <span class="span00">序号</span>
                          <span class="span01">ID</span>
                          <span class="span02">域名ID<i><s v-on:click="handleAscYmid(Information)" class="el-icon-caret-top"></s><s v-on:click="handleDesYmid(Information)" class="el-icon-caret-bottom"></s></i></span>
                          <span class="span03">姓名</span>
                          <span class="span04">分配日期<i><s v-on:click="handleAscOrderTime(Information)" class="el-icon-caret-top"></s><s v-on:click="handleDesOrderTime(Information)" class="el-icon-caret-bottom"></s></i></span>
                          <span class="span05">上线日期<i><s v-on:click="handleAscOrderOnlineTime(Information)" class="el-icon-caret-top"></s><s v-on:click="handleDesOrderOnlineTime(Information)" class="el-icon-caret-bottom"></s></i></span>
                          <span class="span06">域名</span>
                          <span class="span07">主题</span>
                          <span class="span08">模板序号</span>
                          <span class="span09">组别</span>
                          <span class="span10">备注</span>
                          <span class="span11">操作</span>
                       </dt>
                       <dd v-for="(item,index) in Information" :key="index">
                          <span class="span00">{{index+1}}</span>
                          <span class="span01">{{item.id}}</span>
                          <span class="span02">{{item.ymid}}</span>
                          <span class="span03">{{item.name}}</span>
                          <span class="span04">{{item.time}}</span>
                          <span class="span05">{{item.online_time}}</span>
                          <span class="span06"><i @click="See('https://'+item.domain)">{{item.domain}}</i></span>
                          <span class="span07">{{item.zhuti}}</span>
                          <span class="span08">{{item.moban_no}}</span>
                          <span class="span09">{{item.zu}}</span>
                          <span class="span10">{{item.beizhu}}</span>
                          <span class="span11">
                                <i title="修改" @click="handleEdiClick(item)" class="el-icon-edit"></i>
                                <i title="删除" @click="handleDelClick(item.id)" class="el-icon-delete"></i>
                          </span>
                       </dd>
                     </dl>
                </div>                
          </el-col>
        </el-row>
        <div class="ModelPopup" v-if="showAbs">
            <p class="ModelPopupTit"><strong>{{type=='add'?'添加':'编辑'}}信息</strong><span @click="handleClose" class="close el-icon-close"></span></p>
            <div class="ModelPopupBox">
                 <ul class="ModelPopupBoxmain">
                    <li>
                      <el-select v-model="uploadName" class="selectbrands" clearable placeholder="请选择姓名">
                        <el-option v-for="item in uploadNameList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                      </el-select>
                    </li>
                    <li>
                      <el-input placeholder="请输入域名ID" v-model="uploadymid" clearable></el-input>
                    </li>
                    <li>
                      <el-input placeholder="请输入域名" v-model="uploadDomain" clearable></el-input>
                    </li>
                    <li>
                      <el-input placeholder="请输入主题" v-model="uploadZhuti" clearable></el-input>
                    </li>
                    <li>
                      <el-input placeholder="请输入模板序号" v-model="uploadMuban" clearable></el-input>
                    </li>
                    <li>
                      <el-select v-model="uploadzb" class="selectbrands" clearable placeholder="请选择小组">
                        <el-option v-for="item in searchzuNameList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                      </el-select>
                    </li>
                    <li>
                      <el-date-picker v-model="uploadTime" type="date" placeholder="选择分配日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" ></el-date-picker>
                    </li>
                    <li>
                      <el-date-picker v-model="uploadonline_time" type="date" placeholder="选择上传日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" ></el-date-picker>
                    </li>
                    <li>
                      <el-date-picker v-model="uploadExpiredTime" type="date" placeholder="域名到期日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" ></el-date-picker>
                    </li>
                    <li>
                      <el-input type="textarea" :rows="2" placeholder="请输入备注" v-model="uploadBeizhu" clearable></el-input>
                    </li>
                 </ul>
                 <p class="ModelPopupBoxbom">
                    <span @click="handleClose">取消</span>
                    <span @click="handleSaveClick">确定</span>
                 </p>
            </div>
        </div>
        <p class="mask" v-if="showAbs"></p>
    </el-scrollbar>
  </el-container>
</template>
<script>
import axios from 'axios';
import searchTime from "../public/searchTime";
export default {
    name: 'addlongPage',
    data() {
        return {
            showAbs:false,
            type:'',
            item_Id:0,
            fileList:[],
            timeDate:{
              starttime:'',
              endtime:'', 
            },                           // 日期插件传递值
            starttime:'',                // 查询开始日期
            endtime:'',                  // 查询结束日期
            searchDomainNa:'',           // 查询域名
            searchDomainID:'',           // 查询域名ID
            searchMuban:'',              // 查询前端模板
            Information:[],
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
              {name:'孙朝帅'},
            ],
            searchName:'',
            searchzuNameList:[
              {name:'李伟东组'},
              {name:'刘松海组'},
            ],
            searchzuName:'',
            searchParam:{
              searchName:'',
              searchzu:'',
            },
            uploadNameList:[
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
              {name:'孙朝帅'},
            ],
            uploadName:'',
            uploadymid:'',
            uploadDomain:'',
            uploadMuban:'',
            uploadTime:'',
            uploadonline_time:'',
            uploadZhuti:'',
            uploadBeizhu:'',
            uploadzb:'',
            uploadExpiredTime:'',
            uploadArr:{
              name:'',
              ymid:'',
              domain:'',
              time:'',
              moban_no:'',
              online_time:'',
              domain_expired_time:'',
              zhuti:'',
              beizhu:'',
              zu:''
            }
        }
    },
    components: {
      searchTime,
    },
    mounted() {
       var $this=this;       
       $this.uploadTime=$this.uploadonline_time=$this.currentTime();
       $this.uploadExpiredTime=$this.dueTime();
       $this.handleSearchBtn();
    },
    methods: {
      //默认当前时间
      currentTime:function(){
       var $this=this;
       var start = new Date();
       var year=start.getFullYear();  //取得4位数的年份
       var month=start.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
       var date=start.getDate();      //返回日期月份中的天数（1到31）
	     return year+'-'+month+'-'+date; 
      },
      //默认到期时间
      dueTime:function(){
       var $this=this;
       var start = new Date();
       var year=start.getFullYear()+1;  //取得4位数的年份
       var month=start.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
       var date=start.getDate();      //返回日期月份中的天数（1到31
	     return year+'-'+month+'-'+date; 
      },
      //接收传递的时间
      listenTimeday:function(TDate){
        var $this=this;
        $this.timeDate=TDate;
      },
      //时间插件
      TimePlug:function(){
        var $this = this;
        if($this.timeDate.starttime!=''&&$this.timeDate.endtime!=''){
            $this.starttime=$this.timeDate.starttime + '-01';
            $this.endtime=$this.timeDate.endtime + '-01';
        }else{
            $this.starttime='';
            $this.endtime='';
        }
      },
      handleSearchBtn:function(){
          var $this = this;
          $this.Information=[];
          $this.TimePlug();
          $this.initInfo(); 
      },
      initInfo:function(){
        var $this = this;      
        $this.$api.get("/index/month_longword?starttime=" + $this.starttime + "&endtime=" + $this.endtime,null,function(res) {
            if(res.data){
                var searchParam={};
                searchParam.searchName=$this.searchName;
                searchParam.searchzu=$this.searchzuName;
                searchParam.DomainNa=$this.searchDomainNa;
                searchParam.DomainID=$this.searchDomainID;
                searchParam.Muban=$this.searchMuban;
                $this.searchParam=searchParam;
                var arrList=[];
                res.data.forEach(function(item,index){
                    var arrObj={
                      beizhu: "",
                      domain: "",
                      id:0,
                      name:"",
                      online_time:"",
                      domain_expired_time:"",
                      state:0,
                      moban_no:'',
                      time:"",
                      ymid:0,
                      zhuti:"",
                      zu:"",
                      zym:"",
                    }
                    arrObj.beizhu=item.beizhu;
                    arrObj.domain=item.domain;
                    arrObj.id=item.id;
                    arrObj.name=item.name;
                    arrObj.moban_no=item.moban_no;
                    arrObj.online_time=item.online_time;
                    arrObj.domain_expired_time=item.domain_expired_time;
                    arrObj.state=item.state
                    arrObj.time=item.time;
                    arrObj.ymid=item.ymid;
                    arrObj.zhuti=item.zhuti;
                    arrObj.zu=item.zu;
                    arrObj.zym=item.zym;
                    arrList.push(arrObj);
                });
                $this.Information=$this.filterResult(arrList,$this.searchParam);                
            }
          }
        );
      },
      filterResult:function(initData, searchParam){
          var filtersearchName = this.filtersearchName(initData,searchParam.searchName);
          var filtersearchzu = this.filtersearchzu(filtersearchName,searchParam.searchzu);
          var filterDomainNa = this.filterDomainNa(filtersearchzu,searchParam.DomainNa);
          var filterDomainID = this.filterDomainID(filterDomainNa,searchParam.DomainID);
          var filterMuban = this.filterMuban(filterDomainID,searchParam.Muban);
          return filterMuban;
      },
      filtersearchName:function(initData, searchParam){
          var newData = [];
          if (searchParam.length > 0) {
            initData.forEach(function(item) {
                if (item.name == searchParam) {
                  newData.push(item);
                }
            });
          } else {
            newData = initData;
          }
          return newData;
      },
      filtersearchzu:function(initData, searchParam){
          var newData = [];
          if (searchParam.length > 0) {
            initData.forEach(function(item) {
                if (item.zu == searchParam) {
                  newData.push(item);
                }
            });
          } else {
            newData = initData;
          }
          return newData;
      },
      filterDomainNa:function(initData, searchParam){
          var newData = [];
          if (searchParam.length > 0) {
            initData.forEach(function(item) {
                if (item.domain == searchParam) {
                  newData.push(item);
                }
            });
          } else {
            newData = initData;
          }
          return newData;
      },
      filterDomainID:function(initData, searchParam){
          var newData = [];
          if (searchParam.length > 0) {
            initData.forEach(function(item) {
                if (item.ymid == searchParam) {
                  newData.push(item);
                }
            });
          } else {
            newData = initData;
          }
          return newData;
      },
      filterMuban:function(initData, searchParam){
          var newData = [];
          if (searchParam.length > 0) {
            initData.forEach(function(item) {
                if (item.moban_no == searchParam) {
                  newData.push(item);
                }
            });
          } else {
            newData = initData;
          }
          return newData;
      },
      //点击来源页面跳转
      See:function(e){
        window.open(e, '_blank');
      },
      //修改弹出
      handleEdiClick:function(DaT){
        var $this=this;
         $this.type='edit';
        $this.showAbs=!$this.showAbs;
        $this.item_Id=DaT.id;
        $this.uploadName=DaT.name;
        $this.uploadymid=DaT.ymid;
        $this.uploadDomain=DaT.domain;
        $this.uploadMuban=DaT.moban_no;
        $this.uploadTime=DaT.time;
        $this.uploadonline_time=DaT.online_time;
        $this.uploadExpiredTime=DaT.domain_expired_time;
        $this.uploadZhuti=DaT.zhuti;
        $this.uploadBeizhu=DaT.beizhu;  
        $this.uploadzb=DaT.zu;
      },
      //添加弹出
      handleBtn:function(){
         var $this=this;
         $this.type='add';
         $this.showAbs=!$this.showAbs;
        $this.uploadName='';        
        $this.uploadymid='';
        $this.uploadDomain='';
        //$this.uploadExpiredTime='';
        //$this.uploadonline_time='';
        $this.uploadMuban='';
        $this.uploadZhuti='';
        $this.uploadBeizhu='';  
        $this.uploadzb='';
      },
      //删除
      handleDelClick:function(itemID){
          var $this=this;
          $this.item_Id=itemID;
          $this.$api.get("/index/delete_longword?id=" + $this.item_Id,null,function(res) {
               if(res){
                   $this.Information=[];
                   $this.initInfo();
               }
            }
          );
      },
      handleSaveClick:function(){
          var $this=this;
          $this.uploadArr.name=$this.uploadName;               
          $this.uploadArr.ymid=$this.uploadymid;
          $this.uploadDomain=$this.uploadDomain.toLowerCase();
          if($this.uploadDomain.indexOf("www.")>=0){            
              $this.uploadArr.domain = $this.uploadDomain.substr($this.uploadDomain.indexOf(".")+1);
          }else{
              $this.uploadArr.domain=$this.uploadDomain;
          }
          $this.uploadArr.time=$this.uploadTime;
          $this.uploadArr.online_time=$this.uploadonline_time;
          $this.uploadArr.domain_expired_time=$this.uploadExpiredTime;
          $this.uploadArr.zhuti=$this.uploadZhuti;
          $this.uploadArr.beizhu=$this.uploadBeizhu;
          $this.uploadArr.moban_no=$this.uploadMuban;
          $this.uploadArr.zu=$this.uploadzb;
          if($this.type == "add"){
            $this.$api.post("/index/add_longword",$this.uploadArr,function(res) {
                if(res){
                  if(res.data.state==1){
                    $this.$message({
                      message:res.data.msg,
                      type: 'success'
                    });
                    $this.Information=[];
                    $this.handleSearchBtn();
                  }else{
                    $this.$message.error(res.data.msg);
                  }
                }
              }
            );
          }else{
            $this.uploadArr.id=$this.item_Id;
            $this.$api.post("/index/edit_longword",$this.uploadArr,function(res) {
                if(res){
                  if(res.data.state==1){
                    $this.$message({
                      message:res.data.msg,
                      type: 'success'
                    });
                    $this.Information=[];
                    $this.handleSearchBtn();
                  }else{
                    $this.$message.error(res.data.msg);
                  }
                }
              }
            );
          }
          $this.showAbs=!$this.showAbs;
      },
      handleClose:function(){
        var $this=this;
        $this.showAbs=!$this.showAbs;
      },
      httpRequest:function(parm){
        var $this=this;
        var formData  = new FormData()// FormData 对象
        formData.append('file',parm.file)// 文件对象   
        axios({
          method: 'post',
          data:formData,
          url: '/index/excel_dao_longword'
        }).then(res => {
            if(res.data.state==1){
              if(res.data.msg.length>0){
                  $this.$alert(res.data.msg, '上传失败的数据', {
                    dangerouslyUseHTMLString: true
                  });
              }else{
                $this.$message({
                  message:res.data.tiao,
                  type: 'success'
                });
              }
              $this.handleSearchBtn();
            }else{
              $this.$message.error(res.data.msg);
            }
        })
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
      // 域名ID升序排列
      handleAscYmid:function(DateList){
        var $this = this;
        var newArr = DateList;
        $this.Information=[];
        newArr.sort(function(a, b) {
            var value1 = a.ymid;
            var value2 = b.ymid;
            return value1 - value2;
        });
        $this.Information = newArr;
      },
      // 域名ID降序排列
      handleDesYmid:function(DateList){
        var $this = this;
        var newArr = DateList;
        $this.Information=[];
        newArr.sort(function(a, b) {
            var value1 = a.ymid;
            var value2 = b.ymid;
            return value2 - value1;
        });
        $this.Information = newArr;
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
.Infotop{
  clear: both;
  display: block;
  background: #fff;
  padding:15px;
  overflow: hidden;
  border-radius:5px;
  dd{
    float: left;
    width:150px;
    margin-right: 20px;
    text-align: left;
    /deep/ .el-date-editor.el-input{width: 100%!important;}
    &.Infotopdd{
        width:250px;
       /deep/ .el-date-editor--monthrange.el-input__inner{width: 100%!important;}
       /deep/ .el-date-editor .el-range-separator{width:auto!important;}
    }
  }
  dt{
    float: left;
    display: inline-block;
    line-height: 1;
    cursor: pointer;
    border: 1px solid #409eff;
    -webkit-appearance: none;
    text-align: center;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #409eff;
    margin-right: 20px;
    cursor: pointer;
    i{
      float: left;
      margin-right: 5px;
      font-size:14px;
      font-weight: bold;
    }
    &:hover{
      opacity:0.8;
    }
  }
}
.InformationList{
  clear: both;
  display: block;
  background: #fff;
  padding:25px;
  margin-top:25px;
  overflow: hidden;
  border-radius:5px;
  dl{
    clear: both;
    dt{
      clear: both;
      display: block;
      overflow: hidden;
      padding-bottom:5px;
      span{
        float: left;
        font-size:14px;
        line-height:24px;
        padding:10px 10px;
        font-weight: bold;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
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
    dd{
      clear: both;
      display: block;
      overflow: hidden;
      border-top:1px solid #eee;
      padding:6px 0px;
      &:nth-child(2n){
        background: #f5f5f5;
      }
      span{
        float: left;
        font-size:14px;
        line-height:30px;
        padding:4px 10px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        &.span04{
          i{
            cursor: pointer;
            color:#3e404f;
            &:hover{
              color: #f60;
            }
          }
        }
        &.span11{
          i{
            display: inline-block;
            width: 30px;
            height:30px;
            line-height: 30px;
            box-shadow: 0px 0px 5px #ccc;
            border-radius:5px;
            cursor: pointer;
            color: #888;
            text-align: center;
            margin-right: 10px;
            font-size:16px;
            transition: all 0.5s;
            &:hover{
              color: #fff;
              box-shadow: 0px 0px 0px #f60;
              background:#f60;
            }
          }
        }
      }
    }
  }
}

.span00{width:5%; text-align:center;color: #3e404f;}
.span01{width:4%; text-align:left;color: #3e404f;}
.span02{width:6%; text-align:left;color: #3e404f;}
.span03{width:6%; text-align:left;color: #3e404f;}
.span04{width:8%;  text-align:left;  color: #3e404f;i{font-style: normal;}}
.span05{width:8%; text-align:left;color: #3e404f;}
.span06{width:13%; text-align:left;color: #3e404f;i{font-style: normal;cursor: pointer;}&:hover{color:#f60;}}
.span07{width:6%; text-align:left;color: #3e404f;}
.span08{width:6%; text-align:left;color: #3e404f;}
.span09{width:5%; text-align:left;color: #3e404f;}
.span10{width:23%; text-align:left;color: #3e404f;}
.span11{width:10%; text-align:left;color: #3e404f;}
.ModelPopup {
    position: absolute;
    z-index: 2;
    width: 800px;
    height:424px;
    left: 50%;
    top: 50%;
    margin-top: -212px;
    margin-left: -400px;
    border: 1px solid #e4e6ea;
    background: #fff;
    border-radius:10px;
    overflow: hidden;
    .ModelPopupTit {
        clear: both;
        display: block;
        text-align: left;
        border-bottom: 1px solid #eee;
        overflow: hidden;
        background: #f5f5f5;
        padding-left:30px;
        strong {
          float: left;
          font-size:18px;
          line-height: 40px;
          color: #333;
        }
        span {
          float: right;
          width: 40px;
          height: 40px;
          font-size: 20px;
          line-height: 40px;
          margin-right:10px;
          display: inline-block;
          text-align: center;
          color: #333;
          font-weight: bold;
          cursor: pointer;
          &:hover{
            color: #f00;
          }
        }
    }
    .ModelPopupBox {
        clear: both;
        padding:30px;
        .ModelPopupBoxmain {
          overflow: hidden;
          li{
            float: left;
            width:33.3333%;
            padding:10px;
            text-align: left;
            .el-select{width: 100%!important;}
            /deep/ .el-date-editor.el-input{width: 100%!important;}
            &.Infotopdd{
                width:250px;
              /deep/ .el-date-editor--monthrange.el-input__inner{width: 100%!important;}
              /deep/ .el-date-editor .el-range-separator{width:auto!important;}
            }
            &:last-child{
              float: none;
              clear: both;
              width: 100%;
            }
          }
        }
        .ModelPopupBoxbom {
          clear: both;
          display: block;
          text-align: center;
          margin: 30px auto 0px;
          span{
            &:first-child{
              background: #f5f5f5;
              color: #333;
            }
            background: #803af2;
            color: #fff;
            line-height: 30px;
            border-radius: 3px;
            cursor: pointer;
            padding:3px 30px;
            margin: 0px 10px;
            display: inline-block;
            &:hover{
              background: #0277d5;
              color: #fff;
            }
          }
        }
    }
}
.mask{
  position: absolute;
  background: rgba(0,0,0,0.5);
  left:0px;
  bottom:0px;
  right:0px;
  top:0px;
  transition: all 0.5s;
}
</style>
