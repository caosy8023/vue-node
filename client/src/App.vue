<template>
  <div id="app">
    <el-container v-if="$route.meta.keepAlive">
      <el-aside width="200px" style="background-color:rgb(84, 92, 100);height:969px">
        <keep-alive>
          <left></left>
        </keep-alive>
      </el-aside>
      <el-container>
        <el-header style="background-color:#b5bac3">
          <keep-alive>
            <heads></heads>
          </keep-alive>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
        <el-footer style="background-color:#8b919e"></el-footer>
      </el-container>
    </el-container>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import left from './components/Aside'
import heads from './components/Header'
export default {
  name: 'App',
  components:{
    left,
    heads
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
