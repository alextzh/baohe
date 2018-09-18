<template>
  <header class="header">
    <div class="left">
      <img class="avatar" src="../common/image/avatar_default.png" alt="">
      <p class="name">未登录</p>
    </div>
    <h1 class="middle" @click.stop="handleScan"><span>点此开始赚钱</span></h1>
    <nav-bar></nav-bar>
  </header>
</template>

<script>
import NavBar from 'base/NavBar'

export default {
  name: 'IndexHeader',
  components: {
    NavBar
  },
  methods: {
    handleScan() {
      this.$router.push({
        path: '/scan'
      })
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
    padding-left: 0.6rem
    padding-right: 0.2rem
    color: #ffffff
    display: flex;
    flex-direction: column
    justify-content: center
    align-items: center
    height: 3.2rem
    .avatar
      display: block
      width: 1.2rem
      height: 1.2rem
      border: 0
    .name
      font-size: 0.32rem
      padding-top: 0.2rem
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

