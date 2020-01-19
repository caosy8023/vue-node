<template>
    <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left"
             label-width="0px"
             class="card-box login-form">
      <h3 class="title">后台管理系统</h3>
      <el-form-item prop="username">
        <h3>账号</h3>
        <el-input v-model="loginForm.phone" autoComplete="on"/>
      </el-form-item>
      <el-form-item prop="password">
        <h3>密码</h3>
        <el-input type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                  autoComplete="on"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import mapMutations from 'vuex'
import dokey from "../utils/dokey";


export default {
     data() {
            return {
                loginForm: {
                    phone: '18705329637',
                    password: 'Wrz19920929'
                },
                loginRules: {
                    phone: [{required: true, trigger: 'blur', message: "请输入手机号"}],
                    password: [{required: true, trigger: 'blur', message: "请输入密码"}]
                },
                loading:false
            }
        },
        methods:{
            ...mapMutations(["changeLogin"]),
          //登陆按钮方法
            handleLogin(){
                let postData = 'phone=' + this.loginForm.phone + '&password=' + this.loginForm.password
                this.loading = true;
                this.$axios({url:'/app/users/login',method:'post',
                    data: postData,
                    headers:
                        {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
                        'Tops-AppId': '100000',
                        'Tops-Signature': dokey.Encrypt()}})
                    .then(resp=> {
                    this.loading = false;
                    if (resp.status == 200) {
                        //成功
                        var json = resp.data;
                        if (json.retCode == '0') {

                            this.changeLogin({ Authorization: this.userToken })
                            this.$router.replace({path: '/hi'});
                            console.log(userToken)
                        } else {
                            this.$alert('登录失败!', '失败!');
                            console.log('saaaaa')
                        }
                    } else {
                        //失败
                        this.$alert('登录失败!', '失败!');
                        console.log('aaaaaaaaaaaa')
                    }
                }, resp=> {
                    this.loading = false;
                    this.$alert('找不到服务器⊙﹏⊙∥!', '失败!');
                });
            }
        }

}
</script>

<style scoped rel="stylesheet/css" >
.login-container{
    padding: 5px;
    position: relative;
     width: 250px;
    height: 300px;
    margin: 0 auto;
    top: 100px;
    background: #ddeecc;
    border-radius: 20px;
}
</style>
