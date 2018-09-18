<template>
  <header class="header">
    <div class="left" @click="handleBack">
      <i class="iconfont icon-back"></i>
    </div>
    <h1 class="middle"><span class="text-btn">设</span></h1>
    <nav-bar @handleInvite="handleInvite" @layout="handleLayout"></nav-bar>
  </header>
</template>

<script>
import NavBar from 'base/NavBar'

export default {
  name: 'SettingHeader',
  components: {
    NavBar
  },
  methods: {
    handleBack() {
      this.$emit('back')
    },
    handleInvite() {
      this.$router.push({
        path: '/scan'
      })
    },
    handleLayout() {
      this.$emit('handleLayout')
    }
  }
}
</script>

<style lang="stylus" scoped>
.header
  position: absolute
  z-index: 99
  left: 0
  bottom: 0
  width: 100%
  height: 3.2rem
  box-sizing: border-box
  display: flex
  align-items: center
  justify-content: flex-start
  background: #333333
  .left
    display: flex;
    align-items: center;
    height: 3.2rem
    padding: 0 0.6rem
    i 
      color: #ffffff
      font-size: 0.8rem
  .middle
    height: 3.2rem
    flex: 1
    display: flex
    justify-content: center
    align-items: center
    padding: 0 0.6rem
</style>
