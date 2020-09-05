<template>
  <el-container direction="vertical">
    <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <i class="icon el-icon-position"></i>
            <el-breadcrumb-item>长尾词</el-breadcrumb-item>
            <el-breadcrumb-item>添加长尾词</el-breadcrumb-item>
        </el-breadcrumb>
    </el-header>
    <el-main>
        <el-row :gutter="20">
          <el-col :span="24">
                <dl class="Infotop">
                    <dt @click="handleBtn"><i class="el-icon-plus"></i>添加</dt>
                    <dd class="Infotopdd">
                      <search-time class="timebox" v-on:childTimeData="listenTimeday"></search-time>
                    </dd>
                    <dt @click="handleSearchBtn"><i class="el-icon-search"></i>查询</dt>
                    <dd>
                      <el-upload
                        class="upload-demo"
                        action=""                  
                        accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        :before-upload="onBeforeUpload"
                        :on-success="onSuccess"

                        :on-preview="onpreview"
                        :on-remove="onRemove"
                        :before-remove="beforeRemove"
                        :http-request="httpRequest"
                        :on-change="handleChange"
                        :limit="3"
                        :on-exceed="onExceed"
                        :file-list="fileList">
                        <el-button type="primary">点击上传</el-button>
                      </el-upload>
                    </dd>
                </dl>
                <div class="InformationList">
                     <dl>
                       <dt>
                          <span class="span06">ID</span>
                          <span class="span03">上传时间</span>
                          <span class="span01">姓名</span>
                          <span class="span02">域名</span>
                          <span class="span03">主题</span>
                          <span class="span04">备注</span>
                          <span class="span05">操作</span>
                       </dt>
                       <dd v-for="(item,index) in Information" :key="index">
                          <span class="span06">{{item.id}}</span>
                          <span class="span03">{{item.time}}</span>
                          <span class="span01">{{item.name}}</span>
                          <span class="span02"><i @click="See(item.domain)">{{item.domain}}</i></span>
                          <span class="span03">{{item.zhuti}}</span>
                          <span class="span04">{{item.beizhu}}</span>
                          <span class="span05">
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
                      <el-select v-model="uploadName" class="selectbrands" placeholder="请选择姓名">
                        <el-option v-for="item in uploadNameList" :key="item.name" :label="item.name" :value="item.name"></el-option>
                      </el-select>
                    </li>
                    <li>
                      <el-input placeholder="请输入域名" v-model="uploadDomain" clearable></el-input>
                    </li>
                    <li>
                      <el-date-picker v-model="uploadTime" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" ></el-date-picker>
                    </li>
                    <li>
                      <el-input placeholder="请输入主题" v-model="uploadZhuti" clearable></el-input>
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
    </el-main>
  </el-container>
</template>
<script>
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
            },                              // 日期插件传递值
            starttime:'',                // 查询开始日期
            endtime:'',                  // 查询结束日期
            Information:[],
            uploadNameList:[
              {name:'李伟东'},
              {name:'刘燕永'},
              {name:'徐凌霄'},
              {name:'王雷'},
              {name:'王文博'},
            ],
            uploadName:'',
            uploadDomain:'',
            uploadTime:'',
            uploadZhuti:'',
            uploadBeizhu:'',
            uploadArr:{
              name:'',
              domain:'',
              time:'',
              zhuti:'',
              beizhu:''
            }
        }
    },
    components: {
      searchTime,
    },
    mounted() {
       var $this=this;
       $this.initInfo();
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
                console.log(res.data,"res02");
                $this.Information=res.data;
            }
          }
        );
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
        $this.uploadDomain=DaT.domain;
        $this.uploadTime=DaT.time;
        $this.uploadZhuti=DaT.zhuti;
        $this.uploadBeizhu=DaT.beizhu;   

      },
      //添加弹出
      handleBtn:function(){
         var $this=this;
         $this.type='add';
         $this.showAbs=!$this.showAbs;
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
          console.log($this.uploadName +"," + $this.uploadDomain +"," + $this.uploadTime + "," +$this.uploadZhuti +"," + $this.uploadBeizhu);
          $this.uploadArr.name=$this.uploadName;
          $this.uploadArr.domain=$this.uploadDomain;
          $this.uploadArr.time=$this.uploadTime;
          $this.uploadArr.zhuti=$this.uploadZhuti;
          $this.uploadArr.beizhu=$this.uploadBeizhu;
          if($this.type == "add"){
            $this.$api.post("/index/add_longword",$this.uploadArr,function(res) {
                if(res){
                    console.log(res,"添加成功");
                    $this.Information=[];
                    $this.initInfo();
                }
              }
            );
          }else{            
            $this.uploadArr.id=$this.item_Id;
            $this.$api.post("/index/edit_longword",$this.uploadArr,function(res) {
                if(res){
                    console.log(res,"修改成功");
                    $this.Information=[];
                    $this.initInfo();
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
      onRemove:function(file, fileList) {
        console.log(file, fileList);
      },
      onpreview:function(file) {
        var $this=this;
        console.log(file);
        console.log($this.fileList);
      },
      onExceed:function(files, fileList) {
        var $this=this;
        $this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove:function(file, fileList) {
        var $this=this;
        return $this.$confirm(`确定移除 ${ file.name }？`);
      },      
      onBeforeUpload:function(file){
        var $this=this;
        var isIMAGE = file.type === 'csv'||'xls'||'xlsx';
        var isLt1M = file.size / 1024 / 1024 < 5;
        if (!isIMAGE) {
          $this.$message.error('上传文件只能是EXCEL格式!');
        }
        if (!isLt1M) {
          $this.$message.error('上传文件大小不能超过 5MB!');
        }
        return isIMAGE && isLt1M;
      },
      handleChange:function(file, fileList){
        var $this=this;
        $this.fileList=fileList;
        console.log($this.fileList);
      },
      onSuccess:function(file){
          var $this=this;
          console.log("上传成功");
          $this.httpRequest(file);
      },
      httpRequest:function(param){
        var $this=this;
        var file = param.file; // 相当于input里取得的files
        var formData  = new FormData()// FormData 对象
        formData .append('file', file)// 文件对象        
        var config = {
          headers: {
          'Content-Type': 'multipart/form-data'
          }
        }
        $this.$api.post("/index/excel_dao_longword",formData,config,function(res) {
              if(res){
                  console.log(res,"httpRequest上传成功");
              }
            }
        );
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
        font-size:16px;
        line-height:24px;
        padding:10px 10px;
        font-weight: bold;
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
        font-size:16px;
        line-height:30px;
        padding:4px 10px;
        &.span02{
          i{
            cursor: pointer;
            color:#3e404f;
            &:hover{
              color: #0277d5;
              font-weight: bold;
            }
          }
        }
        &.span05{
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
              color: #0277d5;
              box-shadow: 0px 0px 5px #0277d5;
            }
          }
        }
      }
    }
  }
}
.span01{width:6%; text-align:left;color: #3e404f;}
.span02{width:18%;  text-align:left;  color: #3e404f;i{font-style: normal;}}
.span03{width:8%; text-align:left;color: #3e404f;}
.span04{width:44%; text-align:left;color: #3e404f;}
.span05{width:9%; text-align:left;color: #3e404f;}
.span06{width:6%; text-align:left;color: #3e404f;}
.ModelPopup {
    position: absolute;
    z-index: 2;
    width: 800px;
    height:370px;
    left: 50%;
    top: 50%;
    margin-top: -185px;
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
