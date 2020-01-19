<template>
    <div class="container user">
        <div class="top">
          <el-form ref="users" label-width="90px">
            <el-row>
              <el-col :span="5">
                <el-form-item label="用户名" prop="uername">
                  <el-input v-model="username" placeholder="输入关键字" />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="phone" placeholder="输入关键字" />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="住址" prop="address">
                  <el-input v-model="address" placeholder="输入关键字" />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="email" placeholder="输入关键字" />
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-button class="btn-search" @click="getUsersList()" >搜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;索</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <el-button type="primary" style="margin-left:100px" @click="newUser()">新增用户</el-button>
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
            <el-form-item label="手机号" prop="phone">
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
          label="手机号"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="200"
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
            <el-button size="mini" style="background:orange;color:white" @click="updateClick(scope.row)">修改</el-button>
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
      username:'',
      phone:'',
      address:'',
      email:'',
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
    getUsersList(page){
      let pageNo = 1
      if(page != undefined){
        pageNo = page
      }
      axios({
        method:'get',
        url:'/api/usersList',
        params:{
          pageNo:pageNo,
          pageSize:10,
          username:this.username,
          phone:this.phone,
          address:this.address,
          email:this.email
        }
      }).then(res => {
        var list = res.data.list
        var data = []
        list.forEach((item,index) => {
          data.push({
            id:index+1,
            username:item.username,
            age:item.age,
            phone:item.phone,
            address:item.address,
            email:item.email
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
      this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        let res = await axios({
          url:'/api/deleteUser',
          method:'delete',
          data:{
            username:row.username
          }
        })
        if(res.data.code == 200){
          this.getUsersList()
          this.$message({
            type: 'success',
            showClose: true,
            message: '删除成功!'
          })
        }else{
          this.$message({
            type: 'error',
            showClose: true,
            message: '删除失败!'
          })
        } 
      }).catch(() => {
        this.$message({
          type: 'info',
          showClose: true,
          message: '已取消删除'
        })       
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
      axios.delete('/api/deleteList',{usernames:arr}).then(res => {
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
<style lang="scss">
  .container{
    .top{
      margin-top: 30px;
      margin-left: 30px;
    }
    .el-input__inner{
      border-color: #1B9DDE
    }
    .btn-search{
      border-color: rgb(128, 86, 86);
      background-color: #2A5976;
      color: white;
      margin-left: 50px;
      width: 120px;
    }
  }
  .el-table{
    margin-top:30px;
    width: 70%;
    margin-left: 60px; 
    /* left: 17%; */
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