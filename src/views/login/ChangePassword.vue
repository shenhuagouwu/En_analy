<template>
<div class="appbody">
    <div class="login clearfix">
        <h2>修改密码</h2>              
        <el-form class="user-account-key" ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="原密码" prop="lastpassword">
                <el-input type="password" placeholder="请输入原密码" v-model="form.lastpassword"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
                <el-input type="password" placeholder="请设置新密码" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="qrpassword">
                <el-input type="password" placeholder="请确认新密码" v-model="form.qrpassword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="changePass('form')">修改</el-button>
                <el-button @click="$refs['form'].resetFields()">重置</el-button>
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
        return {
            zhanghao: '',
            form: {
                lastpassword: '',
                password: '',
                qrpassword: ''
            },
            rules: {
                //验证规则
                lastpassword: [{
                    required: true,
                    message: '请输入原密码',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请设置新密码',
                    trigger: 'blur'
                }, ],
                qrpassword: [{
                    required: true,
                    message: '请确认新密码',
                    trigger: 'blur'
                }, ]
            }
        }
  },
  created() {
    //若无身份信息，则跳转登录页
    if(!(sessionStorage.getItem("zhanghu"))) {
        this.$router.push('/login')
    }
    //初始化
    this.getZhang()
  },
  methods:{
    getZhang() {
        var $this=this;
        $this.zhanghu = JSON.parse(sessionStorage.getItem("zhanghu"))
        $this.zhanghao = $this.zhanghu.username
    },
    changePass:function(){
        var $this=this;
        $this.zhanghu = JSON.parse(sessionStorage.getItem("zhanghu"));
        $this.form.id = $this.zhanghu.id;
        if($this.form.lastpassword === $this.form.password) {
            $this.$message({
                message: '原密码不能与新密码相同',
                type: 'warning'
            });
            return
        }
        if($this.form.password != $this.form.qrpassword) {
            $this.$message({
                message: '确认密码与新密码不一致',
                type: 'warning'
            });
            return
        }
        $this.$api.post("/master/update_pwd",$this.form,function(res) {
                if(res){
                    if(res.data.state==1){
                        $this.$message({
                        message:res.data.msg,
                        type: 'success'
                        });
                        $this.$store.dispatch('user/zhanghu');
                        setTimeout(() => {
                            location.reload()
                        }, 1000)
                    }else{
                        $this.$message.error(res.data.msg);
                        return false
                    }
                }
        });
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
