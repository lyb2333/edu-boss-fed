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
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="loginForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          :loading="loginBtnLoading"
          @click="onSubmit"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { login } from '@/services/user'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      loginForm: {
        phone: '18201288771',
        password: '111111'
      },
      loginBtnLoading: false,
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
        await (this.$refs.ruleForm as Form).validate()
        this.loginBtnLoading = true
        const { data } = await login(this.loginForm)
        if (data.state !== 1) {
          this.$message.error(data.message)
        } else {
          this.$store.commit('setUser', data.content)
          this.$message.success('登录成功')
          this.$router.push(this.$route.query.redirect as string || '/')
        }
      } catch (err) {
        console.log('登录失败：', err)
      }
      this.loginBtnLoading = false
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
