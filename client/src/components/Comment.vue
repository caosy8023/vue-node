<template>
<div class="comment">
    <div class="chat">
      <div class="content">

      </div>
      <div class="textarea">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
        <el-button size="small" type="danger">发送</el-button>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name:'Comment',
  components: {},
  props: {},
  data() {
    return {
      socket:'',
      textarea:''
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {
    this.socket = io.connect('http://127.0.0.1:3000/chat')
    console.log(this.socket)
    // this.socket.emit('msg',222)
    this.socket.on('msg',(data) => {
      console.log(data)
    })
  }
};
</script>
<style lang="scss">
  .comment{
    overflow: hidden;
    position: relative;
    .chat{
      float: right;
      width: 25%;
      .textarea{
        .el-textarea{
          width: 80%;
          // float: left;
          display: inline-block;
        }
        position: relative;
        .el-button{
          display: inline-block;
          // float: right;
        }
      }
    }
  }
</style>