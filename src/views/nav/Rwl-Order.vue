<template>
  <el-row style="margin: 60px 0 0 0 ">
    <el-col :span="24" style="display: flex; flex-direction:column; ">
      <router-link to="/oservice">
        <el-button type="warning" style="width: 99px;height: 60px; margin: 0 0 15px 0;">服务类</el-button>
      </router-link>
      <router-link to="/oobject">
        <el-button type="primary" style="width: 99px;height: 60px; margin: 0 0 0 0">实物类</el-button>
      </router-link>
    </el-col>
  </el-row>
</template>

<script>

</script>

<style>

</style>
