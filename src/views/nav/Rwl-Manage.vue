<template>
  <el-form :label-position="labelPosition" :rules="rules" label-width="100px"  ref="formLabelAlign" :model="formLabelAlign"  >
    <el-form-item
      prop="psw"
      label="密码:"
    >
      <el-input v-model="formLabelAlign.psw"></el-input>
    </el-form-item>
    <el-form-item
      label="确认密码:"
      prop="okpsw"
    >
      <el-input v-model="formLabelAlign.okpsw"></el-input>
    </el-form-item>
    <el-form-item
      label="手机号码:"
      prop="phone"
    >
      <el-input v-model="formLabelAlign.phone"></el-input>
    </el-form-item>
    <el-form-item
      label="电子邮箱:"
      prop="email">
      <el-input v-model="formLabelAlign.email"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button @click="resetForm('formLabelAlign')" >重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        labelPosition: 'right',
        formLabelAlign: {
          psw: '',
          okpsw: '',
          email: '',
          phone:''
        },
        rules: {
            psw:[
              { required: true, message: '请输入密码', trigger: 'blur' },
              { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
            ],
            okpsw:[
            { required: true, message: '请再次输入密码', trigger: 'blur' },
          ],
            phone:[
             { min: 11, max: 11, message: '请输入正确的手机', trigger: 'blur' }

            ],
            email:[
              { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
            ]
        }
      }
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>

</style>
