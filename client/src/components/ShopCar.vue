<template>
    <div class="container">
      <h3 class="shopcar">购物车管理</h3>
       <el-table
        :data="car"
        style="width: 90%">
        <el-table-column
          prop="goods_id"
          label="商品编号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="200">
        </el-table-column>
        <el-table-column
          prop="price"
          label="商品价格(RMB)"
          width="120">
        </el-table-column>
        <el-table-column
          prop="count"
          label="购买数量"
          width="120">
        </el-table-column>
        <el-table-column
          prop="allPrice"
          label="总价(RMB)"
          width="120">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="add(scope.row.id)" type="text" size="small">添加</el-button>
            <el-button @click="removeFromCar(scope.row)" type="text" size="small">减少</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
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
    }
  },
  created() {},
  mounted() {
    this.SHOPCAR_LIST(JSON.parse(sessionStorage.data).username)
  }
};
</script>
<style scoped>
  .shopcar{
    text-align: center;
    margin-top: 40px;
  }
  .el-table{
    margin-top: 40px;
  }
</style>