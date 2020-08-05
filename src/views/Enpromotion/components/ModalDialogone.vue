<template>
    <div class="Modaldialog">
        <p class="Modaldialogtit">
          <strong>产品分析</strong>
          <span @click="handleClose" class="close el-icon-close"></span>
          <span class="iconbtn">
              <i @click="inPronum=0" :class="{active:inPronum==0}">占比图</i>
              <i @click="inPronum=1" :class="{active:inPronum==1}">对比图</i>
          </span>
        </p>
        <div class="Modaldialogbox">
            <div class="piechartbox" v-if="inPronum==0"><pie-chart :piechartData="pieProductsAccountData" v-if="pieProductsAccountData.length>0" style="height:300px"></pie-chart></div>
            <div class="piechartbox" v-if="inPronum==1"><colum-chart :columchartData="pieProductsAccountData" v-if="pieProductsAccountData.length>0" style="height:300px"></colum-chart></div>
        </div>
    </div>
</template>
<script>
import PieChart from "../../chart/PieChartVar";
import ColumChart from "../../chart/ColumChart";
export default {
    name:"ModalDialogPage",
    props: {
      ModalDog: {
        type: Array,
      }
    },
    data:function(){
      return{
        inPronum:0,
        showAbs:false,
        ModalDogData:[],
        type:'',
        pieProductsAccountData:[], //饼图需要传过去的国家数据
      }
    },
    components: {
      PieChart,
      ColumChart,
    },
    mounted () {
      var $this=this;
      $this.ModalDogData=$this.ModalDog;
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
        $this.pieProductsAccountData=arrlist;
      },
    }
}
</script>
<style lang="scss" scoped>
.Modaldialog{position:absolute;z-index:2;width:1000px;height:420px;left:50%;top:50%;margin-top:-210px;margin-left:-500px;background:#fff;}
.Modaldialog .Modaldialogtit{clear:both;display:block;text-align:right;overflow:hidden;background:#0177d5;padding-left:20px; padding-right:10px;}
.Modaldialog .Modaldialogtit strong{float:left;font-size:16px;line-height:40px;color:#fff; font-weight: normal;}
.Modaldialog .Modaldialogtit .close{float: right; width:40px;height:40px;font-size:24px;line-height:40px;display:inline-block;text-align:center;color:#fff;cursor:pointer;font-weight: bold;}
.Modaldialog .Modaldialogtit .close:hover{color: #ff0;}
.Modaldialog .Modaldialogtit .iconbtn{
  float: right;
  padding-top: 8px;
  padding-right: 10px;
  i{
    float: left;
    font-style: normal;
    font-size: 12px;
    border: 1px solid #ccc;
    background: #f5f5f5;
    margin-left: -1px;
    padding: 5px 10px;
    line-height: 1;
    cursor: pointer;
    font-weight: normal;
    color: #666;
    &.active{
      background: #f6c02a;
      border: 1px solid #f6c02a;
      color: #fff;
    }
    &:first-child{
      border-top-left-radius:3px;
      border-bottom-left-radius:3px;
    }
    &:first-child+i{
      border-top-right-radius:3px;
      border-bottom-right-radius:3px;
    }
  }
}
.Modaldialog .Modaldialogbox{clear:both;padding:50px 30px 30px 30px}
.Modaldialog .Modaldialogbox .adinput{clear:both;border:1px solid #e4e6ea;padding:5px 10px;line-height:24px;height:36px;text-align:left;color:#666;width:100%}
.Modaldialog .Modaldialogbox span{clear:both;display:block;width:60px;height:30px;background:#803af2;color:#fff;line-height:30px;border-radius:3px;font-style:normal;text-align:center;cursor:pointer;margin:30px auto 0px}
</style>