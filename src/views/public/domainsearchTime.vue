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
    <el-date-picker v-model="uploadExpiredTime" type="date" placeholder="域名到期日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" ></el-date-picker>
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
            const end01 = new Date();
            const end = new Date(end01.getFullYear(), end01.getMonth() + 1, 0);
            const start = new Date(end.getFullYear(), end.getMonth(), 0);
            start.setTime(start.getTime() + 3600 * 1000 * 24 * 1);
            picker.$emit('pick', [start, end]);
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
            const start = new Date(start01.getFullYear(), start01.getMonth(), 0);
            start.setTime(start.getTime() + 3600 * 1000 * 24 * 1);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      subDayTime:[],
      timeDomain:{
        startDomaintime:'',
        endDomaintime:'',
      }, //时间插件传递值 
    }
  },
  created () {
    var $this = this;
    var creatDate = new Date();
    var end = new Date(creatDate.getFullYear(), creatDate.getMonth() + 1, 0);
    // var start01 = new Date(end);
    // start01.setMonth(start01.getMonth()-1);
    var start = new Date(end.getFullYear(), end.getMonth(), 0);
    start.setTime(start.getTime() + 3600 * 1000 * 24 * 1);
    $this.subDayTime[0]=start;
    $this.subDayTime[1]=end;
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
      if ($this.subDayTime != ""&&$this.subDayTime != null) {
        $this.timeDomain.startDomaintime=moment(tDA[0]).format("YYYY-MM-DD");
        var year = tDA[1].getFullYear();
        var month = tDA[1].getMonth()+1;
        var day = tDA[1].getDate()+1;
        var lastday = new Date(year,month,0).getDate();
        if(day>lastday){
          day=day-lastday;
          month=month+1;
          if (month > 12) {
            month = month - 12;
            year = year + 1;
          }
          if(month < 10){
            month = '0' + month;
          }
        }      
        $this.timeDomain.endDomaintime=year + '-' + month + '-' + day
      }else{
        $this.timeDomain.startDomaintime="";
        $this.timeDomain.endDomaintime="";
      }
      $this.$emit('childDomainSearchTimeData',$this.timeDomain);
    }
  }
}
</script>

<style scoped>
</style>
