<template>
    <div class="Modaldialog">
        <p class="Modaldialogtit"><strong>所有{{type}}询盘</strong><span @click="handleClose" class="close el-icon-close"></span></p>
        <div class="Modaldialogbox">
             <div class="piechartbox"><pie-chart :piechartData="piechartData" v-if="piechartData.length>0" style="height:300px"></pie-chart></div>
        </div>
    </div>
</template>
<script>
import PieChart from "../../chart/PieChartVar";
export default {
    name:"ModalDialogPage",
    props: {
      ModalDog: {
        type: Object,
      }
    },
    data:function(){
      return{
        showAbs:false,
        ModalDogData:'',
        type:'',
        piechartData:[], //饼图需要传过去的国家数据
      }
    },
    components: {
      PieChart,
    },
    mounted () {
      var $this=this;
      $this.type=$this.ModalDog.type;
      $this.ModalDogData=$this.ModalDog.ModalDogData;
      $this.CountriePieChart($this.ModalDogData);
    },
    methods:{
      handleClose:function(){
        var $this=this;
        $this.$emit('childData',$this.showAbs);
      },
      CountriePieChart:function(CountrieData){
        var $this=this;
        var dataobj = CountrieData; //原始对象
        var arrlist = [];
        dataobj.forEach(function(item, index) {
              arrlist.push(item);
        });
        $this.piechartData=arrlist;
      },
    }
}
</script>
<style lang="scss" scoped>
.Modaldialog{position:absolute;z-index:2;width:700px;height:420px;left:50%;top:50%;margin-top:-210px;margin-left:-375px;background:#fff;}
.Modaldialog .Modaldialogtit{clear:both;display:block;text-align:right;overflow:hidden;background:#0177d5;padding-left:20px; padding-right:10px;}
.Modaldialog .Modaldialogtit strong{float:left;font-size:16px;line-height:40px;color:#fff; font-weight: normal;}
.Modaldialog .Modaldialogtit span{width:40px;height:40px;font-size:24px;line-height:40px;display:inline-block;text-align:center;color:#fff;cursor:pointer;font-weight: bold;}
.Modaldialog .Modaldialogtit span:hover{color: #ff0;}
.Modaldialog .Modaldialogbox{clear:both;padding:30px}
.Modaldialog .Modaldialogbox .adinput{clear:both;border:1px solid #e4e6ea;padding:5px 10px;line-height:24px;height:36px;text-align:left;color:#666;width:100%}
.Modaldialog .Modaldialogbox span{clear:both;display:block;width:60px;height:30px;background:#803af2;color:#fff;line-height:30px;border-radius:3px;font-style:normal;text-align:center;cursor:pointer;margin:30px auto 0px}
</style>