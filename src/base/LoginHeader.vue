<template>
  <header class="header">
    <div class="left" @click="handleBack">
      <i class="iconfont icon-back"></i>
    </div>
    <h1 class="middle"><span>微信扫码登录</span></h1>
    <nav-bar @layout="handleLayout"></nav-bar>
  </header>
</template>

<script>
import NavBar from 'base/NavBar'

export default {
  name: 'LoginHeader',
  components: {
    NavBar
  },
  methods: {
    handleBack() {
      this.$emit('back')
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
    padding: 0 0.3rem
    color: #fff
    font-size: 0.8rem
    span 
      font-size: 0.48rem;
      letter-spacing: 1px;
      padding: 0.4rem 0.6rem;
      border: 1px solid #ffffff;
      border-radius: 50px;
</style>
