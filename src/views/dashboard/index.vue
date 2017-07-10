<template>
  <div class="dashboard-container">
    <div class='dashboard-text'>current name:{{userInfo.name}}</div>
    <div class='dashboard-text'>current role:<span v-for='role in userInfo.roles' :key='role'>{{role}}</span></div>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
      name: 'dashboard',
      computed: {
        ...mapGetters([
          'userInfo',
        ])
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
