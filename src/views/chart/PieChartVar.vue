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
  props: ["piechartData"],
  data() {
    return {
      chart: null, //全局定义chart对象
      arrlist: this.piechartData,
      id: Math.random()
        .toString(36)
        .substr(2) //动态生成ID,便于多次引用
    };
  },
  mounted() {
    this.initComponent();
  },
  methods: {
    initComponent() {
      const elWidthValue = this.$el.clientWidth;
      const elHeightValue = this.$el.clientHeight;
      // 此函数为个人习惯,喜欢创建一个初始化的函数
      const chart = new G2.Chart({
        container: this.id,
        width: elWidthValue,
        autoFit: false,
        height: elHeightValue
      });
      chart.coordinate("theta", {
        radius: 0.75
      });
      chart.data(this.arrlist);

      chart.scale("percent", {
        formatter: val => {
          val = val*100 + "%";
          return val;
        }
      });
      chart.tooltip({
        showTitle: false,
        showMarkers: false,
      });
      chart.legend('name', {
        position: 'right',
        custom: true,
        items: this.arrlist.map((obj, index) => {
          return {
            name: obj.name,                                 // 对应 itemName
            value: obj.count,                             // 对应 itemValue
            marker: {
              symbol: 'square',                             // marker 的形状
              style: {
                r: 5,                                       // marker 图形半径
                fill: chart.getTheme().colors10[index],     // marker 颜色，使用默认颜色，同图形对应
              },
            },                                              // marker 配置
          };
        }),
        itemValue: {
          style: {
            fill: '#666',
          },                                               // 配置 itemValue 样式
          formatter: val => `${val}`                // 格式化 itemValue 内容
        },
      }),
      chart
        .interval()
        .position("percent")
        .color("name")
        .label()
        .adjust("stack")
      chart.interaction('element-single-selected');
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
