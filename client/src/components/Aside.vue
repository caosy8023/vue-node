<template>
<div class="container" >
    <el-row class="tac">
        <el-col width="200px">
        <el-menu
            :default-active="defaultActive"
            :router=true
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>首页</span>
            </template>
            <el-menu-item-group>
                <!-- <template slot="title">分组一</template> -->
                <el-menu-item index="/home/index">商品主页</el-menu-item>
                <el-menu-item index="/home/goods">商品管理</el-menu-item>
            </el-menu-item-group>
            <!-- <el-menu-item-group title="分组2"> -->
                <!-- <el-menu-item index="1-3">选项3</el-menu-item> -->
            </el-menu-item-group>
            <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
            </el-submenu>
            <el-menu-item index="/shopcar/index">
            <i class="el-icon-menu"></i>
            <span slot="title">购物车</span>
            </el-menu-item>
            <el-menu-item index="/order/index">
            <i class="el-icon-document"></i>
            <span slot="title">我的订单</span>
            </el-menu-item>
            <el-menu-item index="/user/index">
            <i class="el-icon-setting"></i>
            <span slot="title">用户管理</span>
            </el-menu-item>
        </el-menu>
        </el-col>
    </el-row>
</div>
</template>

<script>
export default {
  name:'Aside',
  components: {},
  props: {},
  data() {
    return {
        defaultActive:this.$router.history.current.path
    };
  },
  watch: {
    '$route' (to, from){
      this.defaultActive = to.path
    }
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {
    //   console.log(this.$refs.menu.defaultActive)
  }
};
</script>
<style scoped>
    .container .el-menu{
        text-align: start;
    }
</style>