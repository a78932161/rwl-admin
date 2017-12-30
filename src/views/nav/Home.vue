<template>
  <el-row class="top">
    <el-col :span="24" style="margin: 0 0 30px 0">
      <el-row type="flex" class="row-bg" justify="center" align="middle" >
        <el-col :span="6"><div class="logo"><img style="width: 250px;height: 40px;" src="../../assets/logo.png"/></div></el-col>
        <el-col :span="6"><div class="top-title"><label>让我来商城管理中心</label></div></el-col>
        <el-col :span="6"><div class="top-button"><el-button type="text" style="font-size: 15px" @click="cancel()">注销</el-button></div></el-col>
      </el-row>
    </el-col>

    <el-col :span="24">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="6" >
          <div class="logo-font">
            <img src="../../assets/logo-font.png">
          </div>
          <div class="NavMenu">
            <ul>
              <router-link  to="/statistics"><li>平台统计</li></router-link>
              <router-link  to="/order"><li>订单中心</li></router-link>
              <a href="#" @click="NavMenuok"><li>基础资料</li></a>
              <div v-if="NavMenu">
                <div><i v-if="swl" class="iconfont icon-sjx-r" style="color:rgb(56,200,243);width: 30px" ></i><el-button type="text" @click="showswl" style="color: rgb(106,119,127)" >服务类</el-button></div>
                <div><i v-if="fwl" class="iconfont icon-sjx-r" style="color:rgb(56,200,243);width: 30px" ></i><el-button type="text" @click="showfwl" style="color: rgb(106,119,127)">实物类</el-button></div>
              </div>
              <router-link  to="/manage"><li class="li4">平台管理</li></router-link>
            </ul>
          </div>
        </el-col>
        <el-col :span="16" style="margin: 50px 0 0 0 ">
          <el-row type="flex" class="row-bg"  align="middle" >
          <router-view>
        </router-view>
          </el-row>
        </el-col>

      </el-row>
    </el-col>

  </el-row>


</template>

<script>
  import {removeToken} from '@/auth'
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
  export default{
    components: {ElButton},
    data(){
          return{
            NavMenu:false,
            swl:false,
            fwl:false,

          }
      },

    methods:{
      NavMenuok() {
        this.NavMenu=!this.NavMenu;
        this.swl=false;
        this.fwl=false;
      },
      showswl() {
        this.swl=true;
        this.fwl=false;
        this.$router.push({path: '/gservice'});
      },
      showfwl() {
        this.swl=false;
        this.fwl=true;
        this.$router.push({path: '/gobject'});
      },
      cancel(){
        this.$confirm('确认注销 吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          removeToken();
          this.$router.push({path: '/login'});
        }).catch(() => {
        });
      }
    },

  }

</script>

<style>
  @import "//at.alicdn.com/t/font_490729_9vf2zrour4oq1tt9.css";
  .top{
    width: 100%;
    height: 50px;
    border-bottom: 1px solid rgb(56,200,243);
  }
  .logo{
    text-align: right;

  }
  .top-title{
    color: rgb(56,200,243);
    font-size: 20px;
    letter-spacing:2px;
    text-indent: 25px;
  }
  .top-button{
    color: rgb(56,200,243);
    text-align: center;
  }
  .logo-font{
    text-align: center;
  }
  .NavMenu ul{
    list-style: none;
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;

  }
  .NavMenu li {
    padding: 20px 0 0 0;
    border: 1px solid rgb(205,210,212);
    width: 160px;
    height: 40px;
    text-align: center;
  }
  a{
    text-decoration:none;
    color:rgb(106,119,127) ;
  }
  ul>a:hover  {
    background: rgb(56,200,243);
    color: white;
  }
  li>a:hover  {
    background: rgb(56,200,243);
    color: white;
  }

  .router-link-active {
    background: rgb(56,200,243);
    color: white;
  }

</style>
