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
  props: ["ringchartData"],
  data() {
    return {
      chart: null, //全局定义chart对象
      arrlist: this.ringchartData,
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
      chart.data(this.arrlist);      
      chart.legend(false);
      chart.tooltip({
        showTitle: false,
        showMarkers: false
      });
      chart.facet('rect', {
        fields: ['name'],
        showTitle: false,
        eachView: (view, facet) => {
          const data = this.arrlist;
          let color;
          if (data[0].name === '一组') {
            color = '#0a9afe';
          } else {
            color = '#f0657d';
          }
          data.push({ name: '其他', count: 100 - data[0].count });
          view.data(this.arrlist);
          view.coordinate('theta', {
            radius: 1,
            innerRadius: 0.85
          });
          view
            .interval()
            .adjust('stack')
            .position('count')
            .color('name', [color, '#eceef1'])
            .style({
              opacity: 1,
            });
          view.annotation().text({
            position: [ '50%', '50%' ],
            content: data[0].name,
            style: {
              fontSize:16,
              fill: '#8c8c8c',
              fontWeight: 300,
              textBaseline: 'bottom',
              textAlign: 'center'
            },
            offsetY: -12,
          });
          view.annotation().text({
            position: ['50%', '50%'],
            content: data[0].count,
            style: {
              fontSize:24,
              fill: '#000',
              fontWeight: 500,
              textAlign: 'center'
            },
            offsetY: 10,
          });
          view.interaction('element-active');
        }
      });
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
