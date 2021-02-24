<template>
    <el-date-picker
      v-model="subtime"
      type="monthrange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始月份"
      end-placeholder="结束月份"
      :picker-options="pickerOptions">
    </el-date-picker>
</template>

<script>
import moment from "moment";
export default {
  name: 'searchTimePage',
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '本月',
          onClick(picker) {
            picker.$emit('pick', [new Date(), new Date()]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end01 = new Date();
            const end = new Date(end01.getFullYear(), end01.getMonth() + 1, 0);
            const start01 = new Date(end);
            start01.setMonth(start01.getMonth()-3);
            const start = new Date(start01.getFullYear(), start01.getMonth() + 1, 0);
            start.setTime(start.getTime() + 3600 * 1000 * 24 * 1);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近六个月',
          onClick(picker) {
            const end01 = new Date();
            const end = new Date(end01.getFullYear(), end01.getMonth() + 1, 0);
            const start01 = new Date(end);
            start01.setMonth(start01.getMonth()-6);
            const start = new Date(start01.getFullYear(), start01.getMonth() + 1, 0);
            start.setTime(start.getTime() + 3600 * 1000 * 24 * 1);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      subtime:"",
      timeDate:{
        starttime:'',
        endtime:'',
      }, //时间插件传递值
    }
  },
  beforeMount() {
    var $this = this;
    $this.getTimeInfo($this.subtime);
  },
  watch: {
    subtime: function(val) {
      this.getTimeInfo(val);
    }
  },
  methods:{
    getTimeInfo:function(tDA){
      var $this = this;
      if ($this.subtime != ""&&$this.subtime != null) {
        $this.timeDate.starttime=moment(tDA[0]).format("YYYY-MM");
        var year = tDA[1].getFullYear();
        var month = tDA[1].getMonth() + 2;
        if (month > 12) {
          month = month - 12;
          year = year + 1;
        }
        if(month < 10){
          month = '0' + month;
        }
        $this.timeDate.endtime=year + '-' + month
      }else{
        $this.timeDate.starttime="";
        $this.timeDate.endtime="";
      }
      $this.$emit('childNoTimeData',$this.timeDate);
    }
  }
}
</script>

<style scoped>
</style>
