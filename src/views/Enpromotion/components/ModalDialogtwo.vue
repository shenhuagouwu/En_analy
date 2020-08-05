<template>
    <div class="Modaldialog">
        <p class="Modaldialogtit">
          <strong>来源国家</strong>
          <span @click="handleClose" class="close el-icon-close"></span>
        </p>
        <div class="Modaldialogbox">
            <div class="piechartbox" v-if="inPronum==0"><map-chart :piechartSouCouData="pieModalSouCouDog" v-if="pieModalSouCouDog.length>0" style="height:400px"></map-chart></div>
        </div>
    </div>
</template>
<script>
import MapChart from "../../chart/MapChart";
export default {
    name:"ModalSouCouDogPage",
    props: {
      ModalSouCouDog: {
        type: Array,
      }
    },
    data:function(){
      return{
        inPronum:0,
        showAbs:false,
        ModalDogData:[],
        type:'',
        pieModalSouCouDog:[], //需要传过去的国家数据
      }
    },
    components: {
      MapChart,
    },
    mounted () {
      var $this=this;
      $this.ModalDogData=$this.ModalSouCouDog;
      $this.CountriePieChart($this.ModalDogData);
    },
    methods:{
      handleClose:function(){
        var $this=this;
        $this.$emit('childSouCouData',$this.showAbs);
      },
      CountriePieChart:function(CountrieData){
        var $this=this;
        var dataobj = CountrieData; //原始对象
        var arrlist = [];
        dataobj.forEach(function(item, index) {
              arrlist.push(item);
        });
        $this.pieModalSouCouDog=arrlist;
      },
    }
}
</script>
<style lang="scss" scoped>
.Modaldialog{position:absolute;z-index:2;width:1000px;height:500px;left:50%;top:50%;margin-top:-250px;margin-left:-500px;background:#fff;}
.Modaldialog .Modaldialogtit{clear:both;display:block;text-align:right;overflow:hidden;background:#0177d5;padding-left:20px; padding-right:10px;}
.Modaldialog .Modaldialogtit strong{float:left;font-size:16px;line-height:40px;color:#fff; font-weight: normal;}
.Modaldialog .Modaldialogtit .close{float: right; width:40px;height:40px;font-size:24px;line-height:40px;display:inline-block;text-align:center;color:#fff;cursor:pointer;font-weight: bold;}
.Modaldialog .Modaldialogtit .close:hover{color: #ff0;}
.Modaldialog .Modaldialogbox{clear:both;padding:30px}
.Modaldialog .Modaldialogbox .adinput{clear:both;border:1px solid #e4e6ea;padding:5px 10px;line-height:24px;height:36px;text-align:left;color:#666;width:100%}
.Modaldialog .Modaldialogbox span{clear:both;display:block;width:60px;height:30px;background:#803af2;color:#fff;line-height:30px;border-radius:3px;font-style:normal;text-align:center;cursor:pointer;margin:30px auto 0px}
</style>