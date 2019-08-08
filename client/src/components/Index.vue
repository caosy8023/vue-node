<template>
    <div class="container">
      <el-carousel :interval="5000" arrow="always" height="400px" style="width:1000px">
        <el-carousel-item v-for="item in lunbo" :key="item.img">
          <img :src="item.img" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
</template>

<script>
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
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style>
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
</style>