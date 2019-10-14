<template>
    <div class="container">
      <el-upload
        class="upload-demo"
        drag
        ref="upload"
        action="http://127.0.0.1:3000/upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
</template>
<script>
import axios from 'axios'
export default {
  name:'Order',
  components: {},
  props: {},
  data() {
    return {
      form: {//form里面的参数
        name: ''
      },
      param:new FormData(), 
      fileList:[]
    };
  },
  watch: {},
  computed: {},
  methods: {
    submitUpload() {
      let file = document.querySelector('.el-upload__input').files[0]
      var formdata = new FormData()
      formdata.append('img',file)
      let config = {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      };
      console.log(formdata.get('img'))
      axios.post('/api/upload',formdata,config).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
      // console.log(data)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
</style>