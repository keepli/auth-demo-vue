<template>
  <div class="dashboard-container">
    <div class="dashboard-text">用户: {{ name }}</div>
    <div class="dashboard-text">角色: {{ roleNames }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  created() {
    //获取计算函数的值并从角色中取出角色名集合
    this.roleNames = this.roles.map(obj => {return obj.name})
  },
  data() {
    return {
      roleNames: []
    }
  }
}
</script>

<style lang="scss" scoped>
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
