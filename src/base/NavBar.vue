<template>
  <div class="right">
    <div class="item" @click="handleInvite" v-if="$route.path === '/home' || $route.path === '/setting'">
      <img class="image" src="../common/image/shape.png" alt="">
      <span class="text"><i class="iconfont icon-add"></i></span>
    </div>
    <div class="item" @click="handleMine" v-else>
      <img class="image" src="../common/image/shape.png" alt="">
      <span class="text"><i class="iconfont icon-user"></i></span>
    </div>
    <div class="item" @click="handleMute">
      <img class="image" src="../common/image/shape.png" alt="">
      <span class="text"><i class="iconfont icon-jingyin"></i></span>
    </div>
    <div class="item" @click="handleSetting">
      <img class="image" src="../common/image/shape.png" alt="">
      <span class="text"><i class="iconfont icon-setting"></i></span>
    </div>
    <div class="item" @click="handleClose">
      <img class="image" src="../common/image/shape.png" alt="">
      <span class="text"><i class="iconfont icon-close"></i></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    handleMine() {
      this.$router.push({
        path: '/home'
      })
    },
    handleInvite() {
      this.$emit('handleInvite')
    },
    handleMute() {
      console.log('静音')
    },
    handleSetting() {
      this.$alert('该功能暂未开放，敬请期待')
    },
    handleClose() {
      if (!this.$store.getters.userInfo) {
        this.$router.push({
          path: '/index'
        })
      } else {
        this.$emit('layout')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.right
  padding-right: 0.6rem
  position: relative
  height: 2.2rem
  width: 2.74rem
  box-sizing: border-box;
  .item
    position: absolute
    width: 1rem
    height: 1rem
    .image
      position: absolute 
      top: 0
      right: 0
      display: block
      width: 1rem
    .text
      display: flex;
      width: 1rem;
      height: 1rem;
      align-items: center;
      justify-content: center;
      position: relative;
      i 
        font-size: 0.6rem
        color: #060606
    &:nth-child(1)
      right: 1.76rem
      top: 0
      .image
        transform: rotate(90deg)
    &:nth-child(2)
      right: 0.6rem
      top: 0
      .image
        transform: rotate(0deg)
    &:nth-child(3)
      right: 1.76rem
      bottom: 0
      .image
        transform: rotate(0deg)
    &:nth-child(4)
      right: 0.6rem
      bottom: 0
      .image
        transform: rotate(90deg)
</style>
