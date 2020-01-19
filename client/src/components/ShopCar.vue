<template>
    <div class="container car">
      <h3 class="shopcar">购物车管理</h3>
       <el-table
        :data="car"
        style="width: 90%">
        <el-table-column
          prop="id"
          label="编号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          width="320">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="200">
        </el-table-column>
        <el-table-column
          prop="price"
          label="商品价格(RMB)"
          width="150">
        </el-table-column>
        <el-table-column
          prop="count"
          label="购买数量"
          width="150">
        </el-table-column>
        <el-table-column
          prop="allPrice"
          label="总价(RMB)"
          width="150">
        </el-table-column>
        <el-table-column
          label="操作"
          width="320">
          <template slot-scope="scope">
            <el-button @click="add(scope.row.id)" type="mini" style="background: #3a8ee6">添加</el-button>
            <el-button @click="removeFromCar(scope.row)" type="mini" style="background: orange">减少</el-button>
            <el-button @click="deleteRow(scope.row)" type="mini" style="background: red">清除</el-button>
            <el-button type="mini" style="background: #631bb1">购买</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
import axios from 'axios'
import {mapState, mapMutations,mapActions} from 'vuex'
export default {
  name:'ShopCar',
  components: {},
  props: {},
  data() {
    return {

    };
  },
  watch: {},
  computed: {
    ...mapState([
      'car'
    ])
  },
  methods: {
    ...mapMutations([
      'ADD_COUNT',
      'REMOVE_COUNT',
      'SHOPCAR_LIST'
    ]),
    ...mapActions(['add','SHOPCAR_LIST']),
    // ADD_COUNT(){

    // },
    addToCar(row){
      this.ADD_COUNT(row.id)
    },
    removeFromCar(row){
      this.REMOVE_COUNT(row.id)
    },
    async deleteRow(row){
      let res = await axios({
          url:'/api/deleteCart',
          method:'delete',
          data:{
              id:row.id
          }
      })
      if(res.data.code == 200){
        this.SHOPCAR_LIST(JSON.parse(sessionStorage.data).username)
      }
    }
  },
  created() {},
  mounted() {
    this.SHOPCAR_LIST(JSON.parse(sessionStorage.data).username)
  }
};
</script>
<style lang="scss">
  .car{
    .shopcar{
      text-align: center;
      margin-top: 40px;
    }
    .el-table{
      margin-top: 40px;
      .el-button{
        color: white;
        border-radius: 4px;
      }
    }
  }
  
</style>