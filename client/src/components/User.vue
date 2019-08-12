<template>
    <div class="container user">
        <h3>用户管理</h3>
        <el-button type="primary" style="margin-left:200px" @click="newUser()">新增用户</el-button>
        <el-button type="primary" @click="deleteList()">批量删除</el-button>
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
            <el-button type="primary" v-if="saveFlag" @click="save()">保 存</el-button>
            <el-button type="primary" v-if="!saveFlag" @click="update()">更 新</el-button>
            <el-button type="danger" @click="handleClose">取 消</el-button>
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
          width="150"
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
      usernames:[],
      saveFlag:'',
      userInfo:{},
      ruleForm:{
        username:'',
        password:'',
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
        // console.log(this.tableData)
      }).catch(err => {

      })
    },
    handleSelectionChange(val){
      this.usernames = val
    },
    updateClick(row){
      this.dialogVisible = true
      this.saveFlag = false
      axios({
        method:'get',
        url:'/api/user',
        params:{
          username:row.username
        }
      }).then(res => {
        this.userInfo = res.data.msg[0]
        this.ruleForm.username = this.userInfo.username
        this.ruleForm.age = this.userInfo.age
        this.ruleForm.phone = this.userInfo.phone
        this.ruleForm.address = this.userInfo.address
        this.ruleForm.password = this.userInfo.password
      }).catch(err => {
        console.log(err)
      })
    },
    deleteClick(row){
      var _this = this
      axios({
        method:'post',
        url:'/api/deleteUser',
        data:{
          username:row.username
        }
      }).then(res => {
        if(res.data.code == '200'){
          
          this.getUsersList()
          alert('删除成功')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    deleteList(){
      var arr = []
      this.usernames.forEach((item,index) => {
        arr.push(item.username)
      })
      if(arr.length == 0){
        return
      }
      axios.put('/api/deleteList',{usernames:arr}).then(res => {
        if(res.data.code == '200'){
          alert('删除成功')
          this.getUsersList()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    newUser(){
      this.dialogVisible = true
      this.saveFlag = true
      this.userInfo = {}
      this.ruleForm.username = ''
      this.ruleForm.age = ''
      this.ruleForm.phone = ''
      this.ruleForm.address = ''
      this.ruleForm.password = ''
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
        this.ruleForm.username = ''
        this.ruleForm.age = ''
        this.ruleForm.phone = ''
        this.ruleForm.address = ''
        this.ruleForm.password = ''
        this.userInfo = {}
        this.getUsersList()
      }).catch(err => {

      })
    },
    update(){
      axios({
        method:'post',
        url:'/api/updateUser',
        data:{
          username:this.ruleForm.username,
          age:this.ruleForm.age,
          phone:this.ruleForm.phone,
          address:this.ruleForm.address,
          password:this.ruleForm.password
        }
      }).then(res => {
        this.dialogVisible = false
        this.getUsersList()
      }).catch(err => {
        console.log(err)
      })
    },
    handleClose(){
      this.dialogVisible = false
      this.ruleForm.username = ''
      this.ruleForm.age = ''
      this.ruleForm.phone = ''
      this.ruleForm.address = ''
      this.ruleForm.password = ''
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