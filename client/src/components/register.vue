<template>
    <div class="register">
      <h3 class="title">注册页面</h3>
      <el-form :model="regForm" status-icon :rules="regRule" ref="regForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="username" v-model="regForm.username" style="width:450px"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="regForm.password" style="width:450px" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input type="password" v-model="regForm.checkPassword" style="width:450px" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="address">
          <el-input type="address" v-model="regForm.address" style="width:450px" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input type="age" v-model="regForm.age" style="width:450px" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input type="phone" v-model="regForm.phone" style="width:450px" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="regForm.email" style="width:450px" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-input class="avatar" type="file" v-model="regForm.avatar" style="width:450px" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn-reg" @click="register">注册</el-button>
          <el-button type="primary" class="btn-log" @click="toLogin">账号登录</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'Register',
  components: {},
  props: {},
  data() {
    let password = ''
    const username = /^\w+$/
    const validUsername = (rule,value,callback) => {
      if(!username.test(value)){
        callback(new Error('请输入合法的账号'))
      }else{
        callback()
      }
    }
    let validPassword = (rule,value,callback) => {
      password = value
      if(value.length < 6){
        callback(new Error('密码长度不能小于6'))
      }else{
        callback()
      }
    }
    const validCheckPassword = (rule,value,callback) => {
      if(value !== password){
        callback(new Error('两次密码不相同！'))
      }else{
        callback()
      }
    }
    const validEmail = (rule,value,callback) => {
      const email = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      if(!email.test(value) && value.length != 0){
        callback(new Error('请输入正确的邮箱格式！'))
      }else{
        callback()
      }
    }
    const validPhone = (rule,value,callback) => {
      const phone = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/
      if(!phone.test(value) && value.length != 0){
        callback(new Error('请输入合法的手机号！'))
      }else{
        callback()
      }
    }
    return {
      regForm:{
        username:'',
        password:'',
        checkPassword:'',
        address:'',
        age:'',
        phone:'',
        email:'',
        avatar:''
      },
      regRule:{
        username:[{ required: true, trigger: 'change' ,validator: validUsername}],
        password: [{ required: true, trigger: 'change' ,validator: validPassword}],
        checkPassword:[{ required: true, trigger: 'change' ,validator: validCheckPassword}],
        email:[{ required: true, trigger: 'change' ,validator: validEmail}],
        phone:[{ required: true, trigger: 'change' ,validator: validPhone}]
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    toLogin(){
      this.$router.push({path:'/login'})
    },
    register(){
      // console.log(this.$refs.regForm.validate)
      this.$refs.regForm.validate(async valid => {
        if(valid){
          console.log(document.querySelector('.register .avatar .el-input__inner'))
          let file = document.querySelector('.register .avatar .el-input__inner').files[0]
          var formdata = new FormData()
          formdata.append('img',file)
          let config = {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          };
          console.log(formdata.get('img'))
          let result = await axios.post('/api/upload',formdata,config)
          console.log(result)
          if(result.data.code == 500){
            return
          }
          let res = await axios({
            url:'/api/register',
            method:'post',
            data:{
              username:this.regForm.username,
              password:this.regForm.password,
              age:this.regForm.age,
              phone:this.regForm.phone,
              address:this.regForm.address,
              email:this.regForm.email,
              avatar:result.data.url
            }
          })
          if(res.data.code == 500){
            alert(res.data.msg)
          }    
          
        }
      })
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss">
  .register{
    .title{
      position: absolute;
      top: 50px;
      text-align: center;
      left: 50%;
      transform: translateX(-25px);
    }
    .demo-ruleForm{
      position: absolute;
      top: 150px;
      left: 50%;
      transform: translateX(-275px);
      .btn-reg{
        width: 150px;
        background-color: #A4BFA9;
        color: black;
        border: none;
      }
      .btn-log{
        width: 150px;
        position: absolute;
        right: 2px;
        background-color: #A4BFA9;
        color: black;
        border: none;
      }
    }
  }
</style>