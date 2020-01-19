<template>
    <div class="container">
      <div class="carousel">
        <el-carousel :interval="5000" arrow="always" height="150px" style="width:450px">
          <el-carousel-item v-for="item in lunbo" :key="item.img">
            <img :src="item.img" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="content">
        <div id="goodsList">
          <div class="goods-item" v-for="(item,index) in goodsList" :key="index">
            <a class="goods-target">
              <div class="item-img">
                <img v-lazy="`http://localhost:3000${item.img}`" alt="">
              </div>
              <div class="item-title">
                <p>{{item.goodsName}}</p>
              </div>
              <div class="item-price">
                <p>{{`￥ ${item.price}`}}</p>
              </div>
              <div class="item-btn">
                <el-button type="small">立即购买</el-button>
                <el-button type="small" @click="addShopcar(item)">加入购物车</el-button>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
  name:'Index',
  components: {},
  props: {},
  data() {
    return {
      lunbo:[
        {img:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2511631290,3022265621&fm=26&gp=0.jpg'},
        {img:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2186390900,4026180499&fm=26&gp=0.jpg'},
        {img:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3081108087,555312235&fm=26&gp=0.jpg'}
      ],
      goodsList:[]
    };
  },
  watch: {},
  computed: {
    ...mapState(['car'])
  },
  methods: {
    ...mapActions(['SHOPCAR_LIST','add']),
    async getGoodsDetail(){
      let res = await axios({
        url:'/api/goodsDetail',
        method:'get',
      })
      if(res.data.code == 200){
        this.goodsList = res.data.list
      }
    },
    async addShopcar(item){
      // let result = await 
      await this.SHOPCAR_LIST(JSON.parse(sessionStorage.data).username)
      const cart = this.car
      let flag = false
      let id
      cart.forEach((value,index) => {
        if(value.goods_id == item.id){
          flag = true
          id = value.id
        }
      })
      if(flag){
        await this.add(id)
        this.$router.push({path:'/shopcar/index'})
      }else{
        let res = await axios({
          url:'/api/addShopcar',
          method:'put',
          data:{
            name:item.goodsName,
            address:'',
            price:item.price,
            count:1,
            goodsId:item.id,
            allPrice:item.price,
            userId:JSON.parse(sessionStorage.data).username
          }
        })
        if(res.data.code == 200){
          this.$router.push({path:'/shopcar/index'})
        }
      }
    }
  },
  created() {},
  mounted() {
    this.getGoodsDetail()
  }
};
</script>
<style lang="scss">
  .container{
    height: 835px;
    .carousel{
      // margin-bottom: 20px;
      .el-carousel{
        margin: auto;
      }
      .el-carousel img{
        width: 100%;
        height: 100%;
      }
      .el-carousel__item{
        background-color: aqua
      }
    }
    @media screen and (max-width: 1400px){
      .content{
        width: 880px;
        margin: auto;
      }
    }
    @media screen and (min-width: 1400px){
      .content{
        width: 1100px;
        margin: auto;
      }
    }
    #goodsList{
      .goods-item{
        box-sizing: border-box;
        padding: 0 20px;
        margin-top: 50px;
        width: 220px;
        display: inline-block;
        .goods-target{
          cursor: pointer;
          display: block;
          .item-img{
            img{
              height: 160px;
              width: 180px;
            }
          }
          .item-title{
            p{
              color: gray;
            }
          }
          .item-price{
            text-align: center;
            p{
              color: red;
              font-size: 18px;
              font-weight: bold;
            }
          }
          .item-btn{
            display: flex;
            justify-content: space-between;
            .el-button{
              background-color: #dcdfe6;
            }
          }
        }
      }
    }
  }
</style>