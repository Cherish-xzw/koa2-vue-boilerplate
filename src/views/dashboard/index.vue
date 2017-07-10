<template>
  <div class="dashboard-container">
    <div class="dashboard-content">
      <h2 class='dashboard-text'>Welcome {{userInfo.name}}</h2>
      <div class="content-placeholer">
        <img src="http://7xr387.com1.z0.glb.clouddn.com/superman" alt="">
      </div>
    </div>
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
  };
</script>

<style rel="stylesheet/scss" lang="scss">
.dashboard {
  &-text {
    font-size: 30px;
    line-height: 46px;
    color: red;
    text-align: center;
  }
}
.dashboard-content {
  background-color: #e3e3e3;
  min-height: 100vh;
  margin-top: -25px;
  padding-top: 25px;
}
.content-placeholer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
