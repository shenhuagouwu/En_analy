<template>
<div class="appbody">
    <div class="login clearfix">
        <h2>修改密码</h2>              
        <el-form class="user-account-key" ref="form" :model="form" :rules="rules" label-width="70px">
            <el-form-item label="原密码" prop="lastpassword">
                <el-input type="password" placeholder="请输入原密码" v-model="form.olduserpwd"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
                <el-input type="password" placeholder="请设置新密码" v-model="form.newuserpwd"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="qrpassword">
                <el-input type="password" placeholder="请确认新密码" v-model="form.confirmuserpwd"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="changePass('form')">修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'changePasswordPage',
  data:function(){
    return{
        form: {
            username: "",
            userpwd: ""
        },
        rules: {
            //验证规则
            olduserpwd: [{
                required: true,
                message: '请输入原密码',
                trigger: 'blur'
            }],
            newuserpwd: [{
                required: true,
                message: '请设置新密码',
                trigger: 'blur'
            }, ],
            confirmuserpwd: [{
                required: true,
                message: '请确认新密码',
                trigger: 'blur'
            }, ]
        }
    }
  },
  beforeCreate: function() {
    var $this = this;
    $this.$nextTick(function() {
      var username = $this.username;
      var userpwd = $this.userpwd;
      $this.form.username=username;
      $this.form.userpwd=userpwd;
    });
  },
  computed: {
    ...mapGetters(["username"]),
    ...mapGetters(["userpwd"]),
  },
  methods:{
    changePass:function(){
        var $this=this;
        $this.uploadArr.id=$this.item_Id;
        $this.$api.post("/index/edit_longword",$this.form,function(res) {              
            if (res) {
              $this.$message.success('密码已修改')
            } else {
                $this.$message.error('请正确填写表单')
                return false
            }
          }
        );
    }
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
    width:520px;
    padding:20px 20px 1px 20px;
    overflow: hidden;
    background: #fff;
    border-radius:10px;
    h2{
        clear: both;
        display: block;
        text-align: left;
        font-size:24px;
        color: #3f414d;
        line-height: 1.5;
        font-weight: normal;
        padding-bottom:20px;
        width: 100%;
    }
}
</style>
