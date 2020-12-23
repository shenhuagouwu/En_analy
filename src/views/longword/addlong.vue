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
                          <span class="span01">ID</span>
                          <span class="span01">域名ID</span>
                          <span class="span02">姓名</span>
                          <span class="span03">域名分配日期</span>
                          <span class="span04">域名</span>
                          <span class="span06">主题</span>
                          <span class="span07">组别</span>
                          <span class="span08">备注</span>
                          <span class="span09">操作</span>
                       </dt>
                       <dd v-for="(item,index) in Information" :key="index">
                          <span class="span01">{{item.id}}</span>
                          <span class="span01">{{item.ymid}}</span>
                          <span class="span02">{{item.name}}</span>
                          <span class="span03">{{item.time}}</span>
                          <span class="span04"><i @click="See('https://'+item.domain)">{{item.domain}}</i></span>
                          <span class="span06">{{item.zhuti}}</span>
                          <span class="span07">{{item.zu}}</span>
                          <span class="span08">{{item.beizhu}}</span>
                          <span class="span09">
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
                      <el-date-picker v-model="uploadTime" type="date" placeholder="选择域名分配日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" ></el-date-picker>
                    </li>
                    <li>
                      <el-input placeholder="请输入主题" v-model="uploadZhuti" clearable></el-input>
                    </li>
                    <li>
                      <el-select v-model="uploadzb" class="selectbrands" clearable placeholder="请选择小组">
                        <el-option v-for="item in searchzuNameList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                      </el-select>
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
            ],
            searchName:'',
            searchzuNameList:[
              {name:'组合一'},
              {name:'组合三'},
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
            ],
            uploadName:'',
            uploadymid:'',
            uploadDomain:'',
            uploadTime:'',
            uploadZhuti:'',
            uploadBeizhu:'',
            uploadzb:'',
            uploadArr:{
              name:'',
              ymid:'',
              domain:'',
              time:'',
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
       $this.handleSearchBtn();
    },
    methods: {
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
            if(res){
                var searchParam={};
                searchParam.searchName=$this.searchName;
                searchParam.searchzu=$this.searchzuName;
                searchParam.DomainNa=$this.searchDomainNa;
                searchParam.DomainID=$this.searchDomainID
                $this.searchParam=searchParam;
                $this.Information=$this.filterResult(res.data,$this.searchParam);
            }
          }
        );
      },
      filterResult:function(initData, searchParam){
          var filtersearchName = this.filtersearchName(initData,searchParam.searchName);
          var filtersearchzu = this.filtersearchzu(filtersearchName,searchParam.searchzu);
          var filterDomainNa = this.filterDomainNa(filtersearchzu,searchParam.DomainNa);
          var filterDomainID = this.filterDomainID(filterDomainNa,searchParam.DomainID);
          return filterDomainID;
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
        $this.uploadTime=DaT.time;
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
        //$this.uploadTime='';
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
          console.log($this.uploadName +"," + $this.uploadDomain +"," + $this.uploadTime + "," +$this.uploadZhuti +"," + $this.uploadBeizhu +"," + $this.uploadzb +"," + $this.uploadymid);
          $this.uploadArr.name=$this.uploadName;               
          $this.uploadArr.ymid=$this.uploadymid;
          $this.uploadArr.domain=$this.uploadDomain;
          $this.uploadArr.time=$this.uploadTime;
          $this.uploadArr.zhuti=$this.uploadZhuti;
          $this.uploadArr.beizhu=$this.uploadBeizhu;
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
                    //$this.initInfo();
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
                    //$this.initInfo();
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
        &.span09{
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

.span01{width:5%; text-align:left;color: #3e404f;}
.span02{width:5%;  text-align:left;  color: #3e404f;i{font-style: normal;}}
.span03{width:10%; text-align:left;color: #3e404f;}
.span04{width:17%; text-align:left;color: #3e404f;i{font-style: normal;cursor: pointer;}&:hover{color:#f60;}}
.span05{width:8%; text-align:left;color: #3e404f;}
.span06{width:7%; text-align:left;color: #3e404f;}
.span07{width:6%; text-align:left;color: #3e404f;}
.span08{width:33%; text-align:left;color: #3e404f;}
.span09{width:8%; text-align:center;color: #3e404f;}

.ModelPopup {
    position: absolute;
    z-index: 2;
    width: 800px;
    height:420px;
    left: 50%;
    top: 50%;
    margin-top: -210px;
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
            width:50%;
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
