<template>
      <div class="adminmainfl">
          <ul class="adminmainflmain">
              <li v-for="(item,index) in leftNavList" v-bind:class="item.isOn?'on01':''" v-bind:key="index" v-on:click="changeType(item.type)">
                  <router-link tag="span" v-bind:to="item.url" ><i v-bind:class="item.icon"></i>{{item.name}}</router-link>
                  <ul v-bind:class="item.isOn?'on':''">
                      <li v-for="(items,index) in item.children">
                          <router-link tag="span" v-bind:to="items.url">{{items.name}}<font v-if="items.typeNumBool">{{items.expiredTimeNum}}</font></router-link>
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
                id:2,
                type:'enCost',
                name:'花费统计',
                isOn:true,
                url:"/Enpromotion/encostRecord",
                pid:1,
            }
          ]
        },
        {
          id: 3,
          type: "SNSanaly",
          name: "SNS",
          isOn: false,
          url: "/SNS",
          icon:"el-icon-data-analysis",
          pid: 0
        },
        {
          id: 4,
          type: "longword",
          name: "长尾词",
          isOn: false,
          url: "/longword",
          icon:"el-icon-date",
          pid: 0,
          children:[
            {
                id:5,
                type:'addlong',
                name:'添加长尾词',
                isOn:true,
                typeNumBool:false,
                expiredTimeNum:0,
                url:"/longword/addlong",
                pid:4,
            },
            {
                id:6,
                type:'longtail',
                name:'长尾词询盘',
                isOn:true,
                typeNumBool:false,
                expiredTimeNum:0,
                url:"/longword/longtail",
                pid:4,
            },
            {
                id:7,
                type:'DomainTime',
                name:'域名过期提醒',
                isOn:true,
                typeNumBool:false,
                expiredTimeNum:0,
                url:"/longword/DomainTime",
                pid:4,
            }
          ]
        }
        ,{
          id: 8,
          type: "changePassword",
          name: "修改密码",
          isOn: false,
          url: "/changePassword",
          icon:"el-icon-setting",
          pid: 0,
        }
      ]
    };
  },
  beforeCreate: function() {
    var $this = this;
    $this.$nextTick(function() {
      var types = $this.type;
      $this.leftNavList.forEach(function(item, index) {
        if (item.type == types) {
          item.isOn = true;
        } else {
          item.isOn = false;
        }
      });
    });
  },
  created() {
    var $this = this;
    $this.numType($this.leftNavList,$this.expiredTimeNum);
  },
  watch:{
    expiredTimeNum:function(){
       this.numType(this.leftNavList,this.$store.state.numType.expiredTimeNum);
    }
  },
  computed: {
    ...mapGetters(["expiredTimeNum"])
  },
  methods: {
    numType(varData,Numa){
      varData.forEach(function(item) {
        if(item.id==4){
          item.children.forEach(function(items) {
              if(items.id==7){
                items.expiredTimeNum=Numa;
                items.typeNumBool=true;
              }
          })
        }
      });
    },
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
                   font{
                     height:20px;
                     background:#f00;
                     border-radius:10px;
                     color:#fff;
                     font-weight: bold;
                     line-height:18px;
                     text-align:center;
                     display: inline-block;
                     margin-left:10px;
                     font-size:12px;
                     padding:0px 5px;
                   }
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