<template>
  <div class="PieChart">
    <div :id="id"></div>
  </div>
</template>

<script>
import DataSet from '@antv/data-set';
import Vue from "vue";
const G2 = require("@antv/g2"); // 1. 引入g2plot
Vue.prototype.$G2 = G2; // 2. 将g2plot挂载到vue中
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
export default {
  props: ["piechartSouCouData"],
  data() {
    return {
      chart: null, //全局定义chart对象
      arrlist: this.piechartSouCouData,
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
      fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/world.geo.json')
        .then((res) => res.json())
        .then(mapData => {
          chart.tooltip({
            showTitle: false,
            showMarkers: false,
            shared: true,
          });
          // 同步度量
          chart.scale({
            longitude: {
              sync: true
            },
            latitude: {
              sync: true
            }
          });
          chart.axis(false);
          chart.legend('trend', {
            position: 'left'
          });
          const ds = new DataSet();
          const worldMap = ds.createView('back')
            .source(mapData, {
              type: 'GeoJSON'
            });
          const worldMapView = chart.createView();
          worldMapView.data(worldMap.rows);
          worldMapView.tooltip(false);
          worldMapView.polygon().position('longitude*latitude').style({
            fill: '#fff',
            stroke: '#ccc',
            lineWidth: 1
          });
          const userData = this.arrlist;
          const userDv = ds.createView()
          .source(userData)
          .transform({
            geoDataView: worldMap,
            field: 'Enname',
            type: 'geo.region',
            as: ['longitude', 'latitude']
          })
          .transform({
            type: 'map',
            callback: obj => {
              if(obj.count <10){
                  obj.trend="0-10";
              }else if(obj.count <20 && obj.count>=10){
                  obj.trend="10-20";
              }else if(obj.count <30 && obj.count>=20){
                  obj.trend="20-30";
              }else if(obj.count <40 && obj.count>=30){
                  obj.trend="30-40";
              }else if(obj.count <50 && obj.count>=40){
                  obj.trend="40-50";
              }else if(obj.count <60 && obj.count>=50){
                  obj.trend="50-60";
              }else if(obj.count <100 && obj.count>=60){
                  obj.trend="60-100";
              }else if(obj.count <300 && obj.count>=100){
                  obj.trend="100-300";
              }else if(obj.count <500 && obj.count>=300){
                  obj.trend="300-500";
              }else if(obj.count <800 && obj.count>=500){
                  obj.trend="500-800";
              }else{
                  obj.trend="大于800";
              }
              return obj;
            }
          });
          const userView = chart.createView();
          userView.data(userDv.rows);
          userView.scale({
            longitude: {
              sync: true,
            },
            latitude: {
              sync: true,
            },
          });
          userView.polygon()
            .position('longitude*latitude')
            .color('trend', ['#8f0303', '#ac191a', '#b52b2c', '#bf3e41', '#c95356', '#d4686c', '#de7d82', '#e89196', '#f1a2a8', '#f9b1b8', '#febbc3', 'fbdee2'])
            .tooltip('name*count*percent')
            .style({
              fillOpacity: 0.85
            })
            .animate({
              leave: {
                animation: 'fade-out'
              }
            });
          userView.interaction('element-active');
          chart.render(); 
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
