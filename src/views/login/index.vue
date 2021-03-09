<template>
  <div class="login">
    <div class="title">拉勾教育</div>
    <el-form
      ref="ruleForm"
      class="login-form"
      label-position="top"
      :model="loginForm"
      label-width="80px"
      :rules="rules"
    >
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="loginForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      loginForm: {
        userName: '18201288771',
        password: '111111'
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('sss')
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    font-size: 80px;
    color: $success-color;
    margin-top: 100px;
  }
  .login-form {
    width: 300px;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    margin-top: 100px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
