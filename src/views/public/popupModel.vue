<template>
    <div class="adminfloat">
        <p class="adminfloattit"><strong>修改信息</strong><span @click="handleClose" class="close">X</span></p>
        <div class="adminfloatbox"><input class="adinput" v-model="keyword" type="text" value=""><span class="adminqd" @click="handleSaveClick">确定</span></div>
    </div>
</template>
<script>
export default {
    name:"popupModel",
    props:["type","popup"],
    data:function(){
      return{
        showAbs:false,
        keyword:'',
        title:'',
      }
    },
    mounted () {
      var $this=this;
      $this.keyword=$this.popup.title;
      $this.title=$this.type=='add'?'添加':'编辑';
    },
    methods:{
      handleSaveClick:function(){
        var $this=this;
        var adinput = $(".adinput").val();
        if(adinput==""){
            alert("新闻标题不能为空")
            return false;
        }
        if($this.type == "add"){
            $this.popup.name='项目名称';
            $this.popup.title=adinput;
            $this.popup.Check=false;
            $this.popup.is_del=1;
            $this.$emit('childData',$this.popup,$this.showAbs);
          }else{
              $this.popup.title=adinput;
              $this.$emit('childData',$this.popup,$this.showAbs);
          }
      },
      handleClose:function(){
        var $this=this;
        $this.$emit('childData',$this.popup,$this.showAbs);
      }
    }
}
</script>
<style lang="scss" scoped>
.adminfloat{position:absolute;z-index:2;width:500px;height:300px;left:50%;top:50%;margin-top:-250px;margin-left:-150px;border:1px solid #e4e6ea;background:#fff;}
.adminfloat .adminfloattit{clear:both;display:block;text-align:right;border-bottom:1px solid #eee;overflow:hidden;background:#f5f5f5;padding-left:20px}
.adminfloat .adminfloattit strong{float:left;font-size:20px;line-height:40px;color:#333}
.adminfloat .adminfloattit span{width:40px;height:40px;font-size:18px;line-height:40px;display:inline-block;text-align:center;color:#666;cursor:pointer}
.adminfloat .adminfloatbox{clear:both;padding:80px 80px 30px 80px}
.adminfloat .adminfloatbox .adinput{clear:both;border:1px solid #e4e6ea;padding:5px 10px;line-height:24px;height:36px;text-align:left;color:#666;width:100%}
.adminfloat .adminfloatbox span{clear:both;display:block;width:60px;height:30px;background:#803af2;color:#fff;line-height:30px;border-radius:3px;font-style:normal;text-align:center;cursor:pointer;margin:30px auto 0px}
</style>