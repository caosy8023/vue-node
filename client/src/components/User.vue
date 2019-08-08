<template>
    <div class="user">
        <h3>用户管理</h3>
        <el-button type="primary" style="margin-left:200px" @click="newUser()">新增用户</el-button>
        <el-dialog
          title="用户信息"
          :visible.sync="dialogVisible"
          width="25%"
          :before-close="handleClose">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username" width="100px">
              <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input v-model="ruleForm.age"></el-input>
            </el-form-item>
            <el-form-item label="电话号码" prop="phone">
              <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="save()">保 存</el-button>
            <el-button type="danger" @click="dialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>
        <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="序号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          width="150"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="phone"
          width="150"
          label="电话号码"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="updateClick(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="deleteClick(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'User',
  components: {},
  props: {},
  data() {
    return {
      ruleForm:{
        username:'',
        age:'',
        phone:'',
        address:''
      },
      rules:{
          // username:[{ required: true, trigger: 'change' ,validator: validUsername}],
          // password: [{ required: true, trigger: 'change' ,validator: validPassword}]
      },
      dialogVisible:false,
      tableData:[]
    };
  },
  watch: {},
  computed: {},
  methods: {
    getUsersList(){
      axios({
        method:'get',
        url:'/api/usersList'
      }).then(res => {
        var list = res.data.list
        var data = []
        list.forEach((item,index) => {
          data.push({
            id:index+1,
            username:item.username,
            age:item.age,
            phone:item.phone,
            address:item.address
          })
        })
        this.tableData = data
        console.log(this.tableData)
      }).catch(err => {

      })
    },
    handleSelectionChange(){

    },
    updateClick(row){

    },
    deleteClick(row){

    },
    newUser(){
      this.dialogVisible = true
    },
    save(){
      axios({
        method:'post',
        url:'/api/addUser',
        data:{
          username:this.ruleForm.username,
          password:this.ruleForm.password,
          age:this.ruleForm.age,
          phone:this.ruleForm.phone,
          address:this.ruleForm.address,
        }
      }).then(res => {
        this.dialogVisible = false
        this.ruleForm = {}
        this.getUsersList()
      }).catch(err => {

      })
    },
    handleClose(){
      this.dialogVisible = false
    }
  },
  created() {},
  mounted() {
    this.getUsersList()
  }
};
</script>
<style>
  .user h3{
    text-align: center;
  }
  .el-table{
    top:50px;
    width: 60%;
    position: relative;
    left: 17%;
  }
  .el-input__inner{
    width: 90%;
  }
  .el-dialog__footer{
    text-align: center;
  }
  .el-dialog__body{
    padding: 20px;
  }
  .el-dialog__title{
    margin-left: 40%;
  }
  .el-dialog__header{
    margin-top: 10px;
  }
</style>