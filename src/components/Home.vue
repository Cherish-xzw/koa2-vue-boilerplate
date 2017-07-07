<template>
  <el-row class="content">
    <el-col>
      <h2>欢迎 {{ userInfo.name }}</h2>
      <el-button type="primary" @click="postLogout">登 出</el-button>
    </el-col>
  </el-row>
</template>

<script>
  import Apis from '../apis';
  export default {
    created () {
      this.getCurrentUser()
    },

    data () {
      return {
        userInfo: {}
      }
    },

    methods: {
      getCurrentUser() {
        const userId = 12; // fake user id
        Apis.User.getCurrentUser(userId).then(res => {
          console.log(res);
          this.userInfo = res;
        })
      },

      postLogout() {
        Apis.User.postLogout().then(res => {
          console.log(res);
          sessionStorage.setItem('demo-token',null);
          this.$router.push('/')
          this.userInfo = res;
        })
      }
    }
  }
</script>
