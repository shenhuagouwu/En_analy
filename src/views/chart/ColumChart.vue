<template>
  <div class="PieChart">
    <div :id="id"></div>
  </div>
</template>

<script>
import Vue from "vue";
const G2 = require("@antv/g2"); // 1. 引入g2plot
Vue.prototype.$G2 = G2; // 2. 将g2plot挂载到vue中
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
export default {
  props: ["columchartData"],
  data() {
    return {
      chart: null, //全局定义chart对象
      arrlist: this.columchartData,
      id: Math.random()
        .toString(36)
        .substr(2) //动态生成ID,便于多次引用
    };
  },
  mounted() {
    this.initComponent();
    //console.log(this.columchartData,'000')
  },
  methods: {
    initComponent() {
      const elWidthValue = this.$el.clientWidth;
      const elHeightValue = this.$el.clientHeight;
      // 此函数为个人习惯,喜欢创建一个初始化的函数
      const chart = new G2.Chart({
        container: this.id,
        width: elWidthValue,
        autoFit: true,
        height: elHeightValue
      });
      chart.data(this.arrlist);      
      chart.scale('count', {
        nice: true,
      });
      chart.axis('name', false);
      chart.tooltip({
        showMarkers: false
      });
      chart.interaction('active-region');
      chart.interval().position('name*count').color("name");
      chart.render();

      this.chart = chart;
      this.chart.render();
      //
    }
  }
};
</script>

<style scoped>
h2 {
  font-size: 24px;
  color: #333;
  text-align: center;
  line-height: 1;
  padding-top: 30px;
}
</style>
