<template>
<div class="comment">
    <div class="top">
      <el-form ref="goods" label-width="90px">
        <el-row>
          <el-col :span="5">
            <el-form-item label="商品编号" prop="goodsId">
              <el-input v-model="goodsId" placeholder="输入关键字" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="商品类型" prop="goodsType">
              <el-input v-model="goodsType" placeholder="输入关键字" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="商品名称" prop="goodsName">
              <el-input v-model="goodsName" placeholder="输入关键字" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button class="btn-add" @click="addGoods" >新增商品</el-button>
          </el-col>
          <el-col :span="3">
            <el-button class="btn-search" @click="searchGoods" >搜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;索</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="goodsTab">
      <el-table
        :data="tableData"
        style="width: 90%">
        <el-table-column
          prop="id"
          label="商品编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          label="商品类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="goodsName"
          width="180"
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="price"
          width="180"
          label="商品价格">
        </el-table-column>
        <el-table-column
          prop="count"
          width="180"
          label="商品库存">
        </el-table-column>
        <el-table-column
          label="操作"
          width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="updateGoods(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="deleteGoods(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
          title="商品信息"
          :visible.sync="dialogVisible"
          width="25%"
          :before-close="handleClose">
          <el-form :model="goodsForm" status-icon :rules="goodsRules" ref="goodsForm" label-width="90px" class="goodsForm">
            <el-form-item label="商品类型" prop="type">
              <el-input v-model="goodsForm.type"></el-input>
            </el-form-item>
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="goodsForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
              <el-input v-model="goodsForm.price"></el-input>
            </el-form-item>
            <el-form-item label="商品库存" prop="count">
              <el-input v-model="goodsForm.count"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" v-if="saveFlag" @click="save()">保 存</el-button>
            <el-button type="primary" v-if="!saveFlag" @click="update()">更 新</el-button>
            <el-button type="danger" @click="handleClose">取 消</el-button>
          </span>
        </el-dialog>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name:'Comment',
  components: {},
  props: {},
  data() {
    const validType = (rules,value,callback) => {
      if(!value){
        callback(new Error('不能为空'))
      }else{
        callback()
      }
    }
    const validName = (rules,value,callback) => {
      if(!value){
        callback(new Error('不能为空'))
      }else{
        callback()
      }
    }
    const validPrice = (rules,value,callback) => {
      if(!value){
        callback(new Error('不能为空'))
      }else{
        callback()
      }
    }
    const validCount = (rules,value,callback) => {
      if(!value){
        callback(new Error('不能为空'))
      }else{
        callback()
      }
    }
    return {
      id:'',
      socket:'',
      goodsId:'',
      goodsType:'',
      goodsName:'',
      tableData:[],
      dialogVisible:false,
      goodsForm:{
        type:'',
        name:'',
        price:'',
        count:''
      },
      goodsRules:{
        type:[{ required: true, trigger: 'change' ,validator: validType}],
        name:[{ required: true, trigger: 'change' ,validator: validName}],
        price:[{ required: true, trigger: 'change' ,validator: validPrice}],
        count:[{ required: true, trigger: 'change' ,validator: validCount}]
      },
      saveFlag:true
    };
  },
  watch: {},
  computed: {
    
  },
  methods: {
    handleClose(){
      this.goodsForm.name = ''
      this.goodsForm.type = ''
      this.goodsForm.price = ''
      this.goodsForm.count = ''
      this.dialogVisible = false
    },
    async save(){
      this.$refs.goodsForm.validate(async(valid) => {
        if(valid){
          let res = await axios({
            url:'/api/addGoods',
            method:'post',
            data:{
              goodsName:this.goodsForm.name,
              type:this.goodsForm.type,
              price:this.goodsForm.price,
              count:this.goodsForm.count
            }
          })
          if(res.data.code == 200){
            this.searchGoods()
            this.goodsForm.name = ''
            this.goodsForm.type = ''
            this.goodsForm.price = ''
            this.goodsForm.count = ''
            this.dialogVisible = false
            this.$message({
              type: 'success',
              message: res.data.msg
            })
          }else{
            this.$message({
              type: 'fail',
              message: res.data.msg
            })
          }
        }
      })
    },
    update(){
      this.$refs.goodsForm.validate(async valid => {
        if(valid){
          let res = await axios({
            url:'/api/updateGoods',
            method:'post',
            data:{
              id:this.id,
              goodsName:this.goodsForm.name,
              type:this.goodsForm.type,
              price:this.goodsForm.price,
              count:this.goodsForm.count
            }
          })
          if(res.data.code == 200){
            this.goodsForm.name = ''
            this.goodsForm.type = ''
            this.goodsForm.price = ''
            this.goodsForm.count = ''
            this.searchGoods()
            this.dialogVisible = false
            this.$message({
              type: 'success',
              message: res.data.msg
            })
          }else{
            this.$message({
              type: 'fail',
              message: res.data.msg
            })
          }
        }
      })
    },
    async updateGoods(row){
      this.id = row.id
      this.saveFlag = false
      this.goodsForm.type = row.type
      this.goodsForm.name = row.goodsName
      this.goodsForm.price = row.price
      this.goodsForm.count = row.count
      this.dialogVisible = true
    },
    deleteGoods(row){
        this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          let res = await axios({
            url:'/api/deleteGoods',
            method:'post',
            data:{
              id:row.id
            }
          })
          if(res.data.code == 200){
            this.searchGoods()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }else{
            this.$message({
              type: 'fail',
              message: '删除失败!'
            })
          } 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })       
        })
    },
    async init () {
      let result = await this.searchGoods()
      this.tableData = result.data.list
      console.log(result)
    },
    async searchGoods(){
      let res = await axios({
        url:'/api/goodsList',
        method:'get',
        params:{
          id:this.goodsId,
          type:this.goodsType,
          goodsName:this.goodsName
        }
      })
      this.tableData = res.data.list
      return res
    },
    async addGoods(){
      this.dialogVisible = true
      this.saveFlag = true
    }
  },
  created() {},
  mounted() {
    this.socket = io.connect('http://127.0.0.1:3000/chat')
    console.log(this.socket)
    // this.socket.emit('msg',222)
    this.socket.on('msg',(data) => {
      console.log(data)
    })
    this.init()
  }
};
</script>
<style lang="scss">
  .comment{
    .top{
      position: relative;
      left: 30px;
    }
    .goodsTab{
      position: relative;
      top: 30px;
      left: 40px;
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
    .btn-add{
      border-color: rgb(128, 86, 86);
      background-color: #2A5976;
      color: white;
      margin-left: 50px;
      width: 120px;
    }
  }
</style>