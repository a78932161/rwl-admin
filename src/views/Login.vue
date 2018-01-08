<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="user">
      <el-input type="text" v-model="ruleForm2.username"  placeholder="账号" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item prop="psd">
      <el-input type="password" v-model="ruleForm2.password" placeholder="密码" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click="handleSubmit2">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {setToken,getToken} from '../auth'

  export default {
    data() {
      return {
        ruleForm2: {
          username: 'user',
          password: 'user'
        },
        rules2: {
          user: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          psd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },

      };
    },
    methods: {

      handleSubmit2() {
       this.axios({
          url: "http://rtest.rwlai.cn/shop/shop/login",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          method: "post",
          data:{ username: this.ruleForm2.username,password:this.ruleForm2.password}
        }).then(res=>{
           console.log(res);
           if(res.status===200){
              setToken(res.headers['x-auth-token'])
           }
        });

      }
    }
  }

</script>

<style  scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;}

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }


</style>
