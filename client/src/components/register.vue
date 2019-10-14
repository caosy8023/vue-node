<template>
    <div class="register">
      <h3 class="title">注册页面</h3>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="username" v-model="ruleForm.username" style="width:450px"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.checkPass" style="width:450px" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input type="checkPassword" v-model="ruleForm.checkPassword" style="width:450px" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">提交</el-button>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
export default {
  name:'Register',
  components: {},
  props: {},
  data() {
    return {
      ruleForm:{
        username:'',
        password:'',
        checkPassword:''
      },
      rules:{

      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    register(){
      
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
      top: 10%;
      text-align: center;
    }
    .demo-ruleForm{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-275px) translateY(-180px)
    }
  }
</style>