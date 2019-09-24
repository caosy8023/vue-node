<template>
<div class="container login">
  <div class="switch">
    <span @click="pwdLogin" :class="{active:loginWay}">密码登录</span><span @click="mailLogin" :class="{active:!loginWay}">邮箱登录</span>
  </div>
  <el-form v-if="loginWay" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="userForm">
    <el-form-item label="用户名" prop="username" style="width:450px">
      <el-input v-model="ruleForm.username" placeholder="username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password" style="width:450px">
      <el-input v-model="ruleForm.password" type="password" placeholder="password"></el-input>
    </el-form-item>
    <div v-if="flag" class="err">
      用户名或密码错误！
    </div>
    <el-button @click="login">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
    <span @click="register" class="register">马上注册</span>
  </el-form>
  <el-form v-else :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-width="100px" class="userForm">
    <el-form-item label="邮箱" prop="email" style="width:450px">
      <el-input v-model="ruleForm1.email" type="email" placeholder="目前支持QQ邮箱"></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="validate" style="width:450px">
      <el-input v-model="ruleForm1.validate" type="validate" placeholder="验证码"></el-input>
      <span :class="{send:timeSHow}" @click="handleHuoqu" class="huoqu">{{text}}</span>
    </el-form-item>
    <el-button @click="login">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
    <span @click="register" class="register">马上注册</span>
  </el-form>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name:'Login',
  components: {},
  props: {},
  data() {
    const username = /^\w+$/
    var validUsername=(rule, value,callback)=>{
          if(!username.test(value)){
            callback(new Error('请输入合法的账号！'))
      }else {
          callback()
      }
    }
    var validPassword=(rule, value,callback)=>{
          if(value.length<6){
            callback(new Error('密码长度不能小于6位！'))
      }else {
          callback()
      }
    }
    var validEmail = (rule,value,callback) => {
      const email = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      if(!email.test(value)){
        callback(new Error('请输入正确的邮箱格式！'))
      }else{
        callback()
      }
    }
    var validate = (rule,value,callback) => {
      if(!value){
        callback(new Error('验证码不能为空！'))
      }
    }
    return {
      text:'获取验证码',
      timeSHow:false,
      time:0,
      num:'',
      loginWay:true,
      ruleForm:{
        username:'',
        password:'',
      },
      ruleForm1:{
        email:'',
        validate:''
      },
      rules:{
        username:[{ required: true, trigger: 'change' ,validator: validUsername}],
        password: [{ required: true, trigger: 'change' ,validator: validPassword}]
      },
      rules1:{
        email:[{ required: true, trigger: 'change' ,validator: validEmail}],
        validate: [{ required: true, trigger: 'change' ,validator: validate}]
      },
      flag:false
    };
  },
  watch: {},
  computed: {},
  methods: {
    handleHuoqu(){
      if(this.text != '获取验证码'){
        return
      }
      this.timeSHow = true
      this.time = 10
      this.text = this.time+'s'
      let timeInter = setInterval(() => {
        this.time--
        this.text = this.time+'s'
        if(this.time == 0){
          clearInterval(timeInter)
          this.text = '获取验证码'
          this.timeSHow = false
        }
      },1000)
      axios({
        method:'get',
        url:'/api/email',
        params:{
          email:this.ruleForm1.email
        }
      }).then(res => {
        console.log(res)
      }).catch(err => {

      })
    },
    mailLogin(){
      this.loginWay = false
      this.$refs.ruleForm.clearValidate()
    },
    pwdLogin(){
      this.loginWay = true
      this.$refs.ruleForm1.clearValidate()
    },
    register(){
      this.$router.push({path:'/register'})
    },
    login(){
      if(this.loginWay){
        this.$refs.ruleForm.validate(valid => {
          if(valid){
            axios({
              url:'/api/email',
              method:'get',
            }).then(res => {
              console.log(res)
            }).catch(err => {

            })
            axios({
              url:'/api/login',
              method:'post',
              data:{
                username:this.ruleForm.username,
                password:this.ruleForm.password
              }
            }).then(res => {
              if(res.data.code == '0'){
                var data = {username:this.ruleForm.username,password:this.ruleForm.password}
                var d = JSON.stringify(data)
                window.sessionStorage.setItem('data',d)
                this.$router.push({
                  path: '/index'
                })
                this.flag = false
              }else if(res.data.code == '1'){
                this.flag = true
              }
            }).catch(err => {
              console.log(err)
            })
          }else{
            return false
          }
        })
      }else{
        axios({
          method:'post',
          url:'/api/emailLogin',
          data:{
            validate:this.ruleForm1.validate,
            email:this.ruleForm1.email
          }
        }).then(res => {
          if(res.data.code == 200){
            var data = {username:this.ruleForm1.email,password:this.ruleForm1.validate}
            var d = JSON.stringify(data)
            window.sessionStorage.setItem('data',d)
          }
          this.$router.push({
            path: '/index'
          })
        }).catch(err => [
          console.log(err)
        ])
        // console.log(this.$refs.ruleForm1)
        // this.$refs.ruleForm1.validate(() => {
        //   console.log(11)
        //   // if(val){
        //   //   // console.log(222)
        //   // }
        // })
      }
      
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss">
  /* body{
    background: -webkit-linear-gradient(left, #f5f7fa , #7c7cb7,#5f2626); 
    background: -o-linear-gradient(right, #f5f7fa , #7c7cb7,#5f2626); 
    background: -moz-linear-gradient(right, #f5f7fa , #7c7cb7,#5f2626); 
    background: linear-gradient(to right, #f5f7fa , #7c7cb7,#5f2626); 
  } */
  .login .el-form{
    position: relative;
    top:300px;
    left: 37%;
    .huoqu{
      position: absolute;
      top: 0;
      right: 15px;
      cursor: pointer;
    }
    .send{
      color: #d0c7c7;
    }
  }
  .login .el-form .err{
    color: red;
    font-size: 14px;
    position: absolute;
    left: 100px;
  }
  .login .el-form .el-button{
    display: block;
    position: relative;
    top: 30px;
    left: 100px;
    width: 350px;
    color: black;
    background-color: #a4bfa9;
  }
  .login .register{
    color: red;
    position: relative;
    top: 50px;
    left: 380px;
    cursor: pointer;
  }
  .login{
    .switch{
      position: relative;
      top:260px;
      left: 43.5%;
      font-size: 18px;
      .active{
        color: #3a9c09ed;
        border-bottom: 2px solid #3a9c09ed;
      }
      span{
        display: inline-block;
        width: 150px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
</style>