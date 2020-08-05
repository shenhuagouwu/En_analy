<template>
      <div class="adminmainfl">
          <ul class="adminmainflmain">
              <li v-for="(item,index) in leftNavList" v-bind:class="item.isOn?'on01':''" v-bind:key="index" v-on:click="changeType(item.type)">
                  <router-link tag="span" v-bind:to="item.url" ><i v-bind:class="item.icon"></i>{{item.name}}</router-link>
                  <ul v-bind:class="item.isOn?'on':''">
                      <li v-for="(items,index) in item.children">
                          <router-link tag="span" v-bind:to="items.url">{{items.name}}</router-link>
                      </li>
                  </ul>
              </li>
          </ul>
      </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "LeftModule",
  data: function() {
    return {
      isOpen: false,
      leftNavList: [
        {
          id: 1,
          type: "Enpromotion",
          name: "英文推广",
          isOn: true,
          url: "/Enpromotion",
          icon:"el-icon-pie-chart",
          pid: 0,
          children:[
            {
                id:3,
                type:'enPersona',
                name:'个人数据',
                isOn:true,
                url:"/Enpromotion/enPersona",
                pid:0,
            },
            {
                id:3,
                type:'enCost',
                name:'花费统计',
                isOn:true,
                url:"/Enpromotion/encostRecord",
                pid:0,
            },
            {
                id:3,
                type:'enSearch',
                name:'搜索统计',
                isOn:true,
                url:"/Enpromotion/ensearchRecord",
                pid:0,
            }
          ]
        },
        {
          id: 4,
          type: "SNSanaly",
          name: "SNS",
          isOn: false,
          url: "/SNS",
          icon:"el-icon-data-analysis",
          pid: 0
        },
        {
          id: 7,
          type: "longword",
          name: "长尾词",
          isOn: false,
          url: "/longword",
          icon:"el-icon-date",
          pid: 0
        }
      ],
      childList: []
    };
  },
  beforeCreate: function() {
    var $this = this;
    $this.$nextTick(function() {
      var types = $this.type;
      $this.leftNavList.forEach(function(item, index) {
        if (item.type == types) {
          item.isOn = true;
          $this.childList = item.children;
        } else {
          item.isOn = false;
        }
      });
    });
  },
  computed: {
    ...mapGetters(["editorType"]),
    type: function() {
      return this.editorType;
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changeType(value) {
      var $this = this;
      var typeValue = value;
      $this.leftNavList.forEach(function(item, index) {
        if (item.type == typeValue) {
          item.isOn = true;
          var children;
          $this.childList = item.children;
        } else {
          item.isOn = false;
        }
      });
      $this.$store.dispatch("leftnav/changeType", typeValue);
    },
    choicetoggle: function() {
      var $this = this;
      $this.isOpen = !$this.isOpen;
    }
  }
};
</script>
<style lang="scss">
    .adminmainfl{
      width:100;
      height:100%;
      padding-top:0px;
      &>.adminmainflmain{
        clear:both;
        display:block;
        li{
          clear:both;
          display:block;
          span{
            clear:both;
            display:block;
            padding-top:15px;
            padding-bottom:15px;
            padding-left:10px;
            color:rgba(255,255,255,0.4);
            font-size:14px;
            line-height: 24px;
            position: relative;
            text-align: left;
            cursor: pointer;
            i{
              float: left;
              width: 20px;
              height: 20px;
              margin-right:10px;
              font-size: 20px;
              margin-top: 2px;
            }
            &:hover{              
              background:#2f343c;
              color:rgba(255,255,255,0.4);
            }
          }
          &.on01{
            background: #262c35;
          }
          .router-link-active{
            font-weight: bold;
            color: #fff;
          }
          .router-link-active.router-link-exact-active{
            background:#14171b!important;
            color:#fff;
          }
          ul{
            display:none;
            &.on{
              display: block;
              li{
                 span{
                   padding-left:42px;
                 }
              }
            }
          }
          &.mainnav{
            span{
               padding-left:20px;
               font-weight: bold;           
               &:hover{              
                  background:#434856;
               }
               &:after{
                content:'';
                position: absolute;
                left:0px;
                top:0px;
                bottom:0px;
                width:2px;
               }
            }
          }
        }
        .active{
          background:#191c22;
        }
      }
    } 
</style>