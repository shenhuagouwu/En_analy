<template>
<div class="appbody">
    <div class="login clearfix">
         <div class="loginfl">
              <h2>登陆</h2>
              <p class="loginfltit">输入您的账户和密码以访问管理面板。</p>
              <div class="section">
                  <p>账户</p>
                  <input
                      class="section-input"
                      v-model="form.username"
                      placeholder-class="input-holder"
                      placeholder="请输入您的账号"
                  />
              </div>
              <div class="section">
                  <p>密码</p>
                  <input
                      class="section-input"
                      type="password"
                      v-model="form.userpwd"
                      placeholder-class="input-holder"
                      placeholder="请输入您的密码"
                  />
              </div>
              <button class="btn" @click="login(form)">登录</button>
         </div>
         <div class="loginfr">
              <p class="loginfrlogo"><img src="../../assets/images/login_pic02.png" alt="" /></p>
              <p class="loginfrpic"><img src="../../assets/images/login_pic01.png" alt="" /></p>
              <h2>查看统计数据</h2>
              <h3>快速查看英文统计、SNS统计、长尾词统计数据</h3>
         </div>
    </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'LoginPage',
  data:function(){
    return{
        form: {
            username: "",
            userpwd: ""
        }
    }
  },
  beforeCreate: function() {
    var $this = this;
    $this.$nextTick(function() {
      var username = $this.zhanghu.username;
      var userpwd = $this.zhanghu.userpwd;
      $this.form.username=username;
      $this.form.userpwd=userpwd;
    });
  },
  computed: {
    ...mapGetters(["zhanghu"]),
  },
  methods:{
      login:function(value){
        var $this=this;
        var form = {};
        form.username = value.username.trim();
        form.userpwd = value.userpwd.trim();
        if(!form.username && !form.userpwd){
              alert("请填写账号密码");
              return false;
        }
        $this.$api.post("/master/login",form,function(res) {
            if(res){
                if(res.data.state==1){
                    $this.$message({
                      message:res.data.msg,
                      type: 'success'
                    });
                    form.id=res.data.id;
                    $this.$store.dispatch('user/zhanghu',JSON.stringify(form));
                    $this.$router.push("/");
                }else{
                    $this.$message.error(res.data.msg);
                }
            }
        });
        
      },
  }
}
</script>
<style lang="scss" scoped>
.appbody{
    clear: both;
    display: block;
    width: 100%;
    height: 100%;
    background:#d9eaff !important;
}
.login {
    position: relative;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    padding: 0px;
    width:720px;
    height: 640px;
    overflow: hidden;
    background: #fff;
    border-radius:10px;
    .loginfl{
        float: left;
        width: 50%;
        height: 100%;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;        
        -ms-flex-direction: column;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        flex-direction: column;
        -ms-flex-preferred-size: auto;
        -webkit-flex-basis: auto;
        flex-basis: auto;
        justify-content: center; /* 水平居中 */
        align-items: flex-start;     /* 垂直居中 */
        padding:0px 7%;
        h2{
            clear: both;
            display: block;
            text-align: left;
            font-size:35px;
            color: #3f414d;
            line-height: 1.5;
            font-weight: normal;
            padding-bottom: 10px;
            width: 100%;
        }
        .loginfltit{
            clear: both;
            display: block;
            text-align: left;
            font-size: 14px;
            color: #a09e9e;
            line-height: 1.2;
            width: 100%;
        }
        .section {
            width: 100%;
            padding-top:15px;
            .section-input {
                display: block;
                width: 100%;
                padding: .375rem .75rem;
                font-weight: 400;
                background-color: #fff;
                background-clip: padding-box;
                -webkit-transition: border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
                transition: border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
                transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
                transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
                height: 45px;
                line-height: 45px;
                background: transparent;
                border: 1px solid #d7dbda;
                font-size: 14px;
                color: #a09e9e;
                border-radius: 10px;
            }
            p{
                clear: both;
                display: block;
                width: 100%;
                color: #333;
                padding:10px 0px;
                line-height: 1.2;
                font-size: 16px;
            }
        }
        .btn {
            width: 70px;
            height: auto;
            color: #fff;
            margin-top: 20px;
            padding: 10px 5px;
            border-radius: 5px;
            font-size: 14px;
            cursor: pointer;
            background: #6773e8;
            background: -moz-linear-gradient(left, #6773e8 0%, #7b9eff 100%);
            background: -webkit-gradient(left top, right top, color-stop(0%, #6773e8), color-stop(100%, #7b9eff));
            background: -webkit-linear-gradient(left, #6773e8 0%, #7b9eff 100%);
            background: -o-linear-gradient(left, #6773e8 0%, #7b9eff 100%);
            background: -ms-linear-gradient(left, #6773e8 0%, #7b9eff 100%);
            background: linear-gradient(to right, #6773e8 0%, #7b9eff 100%);
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#827af3', endColorstr='#b47af3', GradientType=1);
            cursor: pointer;
            border: 0px;
            &:hover{
                background: #7b9eff;
                background: -moz-linear-gradient(left, #7b9eff 0%, #6773e8 100%); background: -webkit-gradient(left top, right top, color-stop(0%, #7b9eff), color-stop(100%, #6773e8));
                background: -webkit-linear-gradient(left, #7b9eff 0%, #6773e8 100%);
                background: -o-linear-gradient(left, #7b9eff 0%, #6773e8 100%);
                background: -ms-linear-gradient(left, #7b9eff 0%, #6773e8 100%);
                background: linear-gradient(to right, #7b9eff 0%, #6773e8 100%);
                filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#b47af3', endColorstr='#827af3', GradientType=1);
            }
        }
    }
    .loginfr{
        float: left;
        width: 50%;
        height: 100%;
        color: #ffffff;
        background: #6773e8 !important;
        background: -moz-linear-gradient(left, #6773e8 0%, #7b9eff 100%) !important;
        background: -webkit-gradient(left top, right top, color-stop(0%, #6773e8), color-stop(100%, #7b9eff)) !important;
        background: -webkit-linear-gradient(left, #6773e8 0%, #7b9eff 100%) !important; background: -o-linear-gradient(left, #6773e8 0%, #7b9eff 100%) !important;
        background: -ms-linear-gradient(left, #6773e8 0%, #7b9eff 100%) !important;
        background: linear-gradient(to right, #6773e8 0%, #7b9eff 100%) !important;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#827af3', endColorstr='#b47af3', GradientType=1) !important;        
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;        
        -ms-flex-direction: column;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        flex-direction: column;
        -ms-flex-preferred-size: auto;
        -webkit-flex-basis: auto;
        flex-basis: auto;
        justify-content: center; /* 水平居中 */
        align-items: center;     /* 垂直居中 */
        .loginfrlogo{clear: both; display: block; width: 50%; margin:0px auto;}
        .loginfrpic{clear: both; display: block; width:50%; margin: 30px auto;}
        .loginfrpic img,.loginfrlogo img{width: 100%;}
        h2{clear: both; display: block; text-align:center; font-size: 20px; line-height: 1.5; padding:0px 0px 15px;}
        h3{clear: both; display: block; text-align:center; font-size:14px; line-height: 1.5; font-weight: normal;}
    }
}
@media (min-width:992px){
    .login{width:960px;}
}
@media (min-width:1280px){
    .login{width:1140px;}
}
</style>
