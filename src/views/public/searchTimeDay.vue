<template>
    <el-date-picker
      v-model="subDayTime"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions">
    </el-date-picker>
</template>

<script>
import moment from "moment";
export default {
  name: 'searchTimeDay',
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      subDayTime: "",
      timeDayDate:{
        startDaytime:'',
        endDaytime:'',
      }, //时间插件传递值
    }
  },
  beforeMount() {
    var $this = this;
    $this.getTimeInfo($this.subDayTime);
  },
  watch: {
    subDayTime: function(val) {
      this.getTimeInfo(val);
    }
  },
  methods:{
    getTimeInfo:function(tDA){
      var $this = this;
      if ($this.subDayTime != "") {
        $this.timeDayDate.startDaytime=moment(tDA[0]).format("YYYY-MM-DD");
        $this.timeDayDate.endDaytime=moment(tDA[1]).format("YYYY-MM-DD");
      }else{
        $this.timeDayDate.startDaytime="";
        $this.timeDayDate.endDaytime="";
      }
      $this.$emit('childTimeDayData',$this.timeDayDate);
    }
  }
}
</script>

<style scoped>
</style>
