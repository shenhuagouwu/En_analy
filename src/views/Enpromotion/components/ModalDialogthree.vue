<template>
    <div class="Modaldialog">
        <p class="Modaldialogtit">
          <strong>{{valType}}</strong>
          <span @click="handleClose" class="close el-icon-close"></span>
        </p>
        <div class="Modaldialogbox">
             <ul class="clearfix" v-for="(item,index) in DialogWordlist">
                 <li v-for="(items,indexs) in item" v-if="showLI">
                     <i @click="See(items.name)">{{items.name}}</i>
                     <span>{{items.count}}</span>
                 </li>
                 <li v-for="(items,indexs) in item" v-if="!showLI">
                     <strong>{{items.name}}</strong>
                     <span>{{items.count}}</span>
                 </li>
             </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:"ModalWordDog",
    props:["ModalWordDog"],
    data:function(){
      return{
        inPronum:0,
        showLI:false,
        showAbs:false,
        DialogWordlist:[],
        valType:'',
      }
    },
    mounted () {
      var $this=this;
      var arrlist=[];
      var arrlistOne=[];
      var arrlistTwo=[];
      var arrlistThree=[];
      var Num=20;
      $this.DialogWordlist=$this.sliceArray($this.ModalWordDog.DialogWordlist,Num);
      $this.valType=$this.ModalWordDog.type;
      if($this.valType.indexOf("来源页面")>=0){
        $this.showLI=true;
      }
    },
    methods:{
      handleClose:function(){
        var $this=this;
        $this.$emit('childWordData',$this.showAbs);
      },
      //把数组分割成多个数组
      sliceArray:function(array, size) {
        var result = [];
        for (var x = 0; x < Math.ceil(array.length / size); x++) {
            var start = x * size;
            var end = start + size;
            result.push(array.slice(start, end));
        }
        return result;
      },
      //点击来源页面跳转
      See:function(e){
        window.open(e, '_blank');
      }
    }
}
</script>
<style lang="scss" scoped>
.Modaldialog{position:absolute;z-index:2;width:1200px;height:700px;left:50%;top:50%;margin-top:-350px;margin-left:-600px;background:#fff;}
.Modaldialog .Modaldialogtit{clear:both;display:block;text-align:right;overflow:hidden;background:#0177d5;padding-left:20px;padding-right:10px;}
.Modaldialog .Modaldialogtit strong{float:left;font-size:16px;line-height:40px;color:#fff;font-weight:normal;}
.Modaldialog .Modaldialogtit .close{float:right;width:40px;height:40px;font-size:24px;line-height:40px;display:inline-block;text-align:center;color:#fff;cursor:pointer;font-weight:bold;}
.Modaldialog .Modaldialogtit .close:hover{color:#ff0;}
.Modaldialog .Modaldialogbox{clear:both;padding:30px 10px;overflow:hidden;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;-webkit-flex-direction:row;flex-direction:row;-ms-flex-preferred-size:auto;-webkit-flex-basis:auto;flex-basis:auto;-webkit-box-sizing:border-box;box-sizing:border-box;min-width:0;}
.Modaldialog .Modaldialogbox ul{float:left;display:block;-webkit-box-flex:1;-ms-flex:1;-webkit-flex:1;flex:1;padding:0px 15px;}
.Modaldialog .Modaldialogbox ul li{clear:both;display:block;overflow:hidden;text-align:left;}
.Modaldialog .Modaldialogbox ul li strong{font-size:14px;font-weight:normal;color: #666;}
.Modaldialog .Modaldialogbox ul li i{font-size:14px;font-weight:normal;color: #666; cursor: pointer; font-style: normal;}
.Modaldialog .Modaldialogbox ul li i:hover{color: #f30;}
.Modaldialog .Modaldialogbox ul li span{float:right;font-weight:bold; color: #f30;}
</style>