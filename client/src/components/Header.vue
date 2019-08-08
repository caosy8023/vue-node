<template>
    <div class="header">
        <el-button style="float:right;margin-top:5px;color:red;background-color:#b5bac3;border:none" @click="logout">退出</el-button>
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
  computed: {},
  methods: {
      logout(){
          window.sessionStorage.removeItem('data')
          this.$router.push({
              path:'/login'
          })
      }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>

</style>