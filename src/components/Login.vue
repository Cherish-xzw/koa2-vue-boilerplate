<template>
  <el-row class="content">
    <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <img src="../assets/logo.png" height="200" width="200">
      <span class="title">
       欢迎登录
      </span>
      <el-row>
        <el-input
          v-model="account"
          placeholder="账号"
          type="text">
        </el-input>
        <el-input
          v-model="password"
          placeholder="密码"
          type="password"
          @keyup.enter.native="login">
        </el-input>
        <el-button type="primary" @click="login">登录</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import Apis from '../apis';
export default {
  data () {
    return {
      account: '',
      password: ''
    };
  },
  methods: {
    login() {
      const param = {
        name: this.account,
        password: this.password
      }
      console.log(Apis.User.postLogin)
      Apis.User.postLogin(param)
        .then((res) => {
          console.log(res);
          sessionStorage.setItem('demo-token',res.token);
          this.$message({
            type: 'success',
            message: '登录成功！'
          });
          this.$router.push('/home')
        }, (err) => {
            this.$message.error('请输入正确的用户名和密码！')
            sessionStorage.setItem('demo-token',null);
        })
    }
  }
};
</script>

<style lang="stylus" scoped>
  .el-row.content
    padding 16px
  .title
    font-size 28px
  .el-input
    margin 12px 0
  .el-button
    width 100%
    margin-top 12px
</style>
