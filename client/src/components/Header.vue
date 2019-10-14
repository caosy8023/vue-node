<template>
    <div class="header">
        <el-button style="float:right;margin-top:5px;color:red;background-color:#b5bac3;border:none" @click="logout">退出</el-button>
        <div style="float:right;height:100%;margin-top:5px;line-height:47px;margin-left:15px">
            <img style="height:40px;width:40px;border-radius:50%" src="http://localhost:3000/public/upload/45866284.png" alt="">
        </div>
        
        <span style="float:right;line-height:47px">{{userId}}</span>
        
    </div>
</template>

<script>
export default {
  name:'Header',
  components: {},
  props: {},
  data() {
    return {
        
    };
  },
  watch: {},
  computed: {
      userId(){
          return JSON.parse(sessionStorage.data).username
      }
  },
  methods: {
      logout(){
          window.sessionStorage.removeItem('data')
          this.$router.push({
              path:'/login'
          })
      }
  },
  created() {},
  mounted() {
      console.log(this.userId)
  }
};
</script>
<style scoped>

</style>