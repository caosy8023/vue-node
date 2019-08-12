<template>
<div class="container login">
  <el-form :model="ruleForm" :rules="rules" ref="user" label-width="100px" class="userForm">
    <el-form-item label="用户名" prop="username" style="width:450px">
      <el-input v-model="ruleForm.username" placeholder="username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password" style="width:450px">
      <el-input v-model="ruleForm.password" type="password" placeholder="password"></el-input>
    </el-form-item>
    <div v-show="flag" class="err">
      用户名或密码错误！
    </div>
    <el-button @click="login">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
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
            callback(new Error('请输入合法的账号'))
      }else {
          callback()
      }
    }
    var validPassword=(rule, value,callback)=>{
          if(value.length<6){
            callback(new Error('密码长度不能小于6位'))
      }else {
          callback()
      }
    }
    return {
        ruleForm:{
          username:'',
          password:''
        },
        rules:{
          username:[{ required: true, trigger: 'change' ,validator: validUsername}],
          password: [{ required: true, trigger: 'change' ,validator: validPassword}]
        },
        flag:false
    };
  },
  watch: {},
  computed: {},
  methods: {
    login(){
      this.$refs.user.validate(valid => {
        if(valid){
          axios({
            url:'/api/login',
            method:'post',
            data:{
              username:this.ruleForm.username,
              password:this.ruleForm.password
            }
          }).then(res => {
            if(res.data.code == '0'){
              var data = [{username:this.ruleForm.username,password:this.ruleForm.password}]
              var d = JSON.stringify(data[0])
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
    }
  },
  created() {},
  mounted() {}
};
</script>
<style>
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
</style>