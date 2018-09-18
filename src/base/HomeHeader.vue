<template>
  <header class="header">
    <div class="left">
      <ul class="avatars" v-if="showUsers.length > 0">
        <li class="avatar" v-for="item in showUsers" :key="item.userId">
          <img :src="item.profilePic" alt="">
          <p class="name">{{item.nickname}}</p>
        </li>
      </ul>
    </div>
    <h1 class="middle">
      <span class="profit">{{animatedNumber}}</span>
      <span class="danwei">预计收益（DDO）</span>
    </h1>
    <nav-bar @layout="handleLayout" @handleInvite="handleInvite"></nav-bar>
  </header>
</template>

<script>
/* eslint-disable */
import NavBar from 'base/NavBar'
import {mapGetters} from 'vuex'

export default {
  name: 'HomeHeader',
  components: {
    NavBar
  },
  data() {
    return {
      tweenedNumber: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      TweenLite.to(this.$data, 0.5, { tweenedNumber: this.currentProfit })
    })
  },
  computed: {
    animatedNumber() {
      return this.tweenedNumber.toFixed(2)
    },
    showUsers() {
      return this.users.length > 4 ? this.users.slice(0, 4) : this.users
    },
    ...mapGetters([
      'users',
      'currentProfit'
    ])
  },
  watch: {
    currentProfit(newValue) {
      TweenLite.to(this.$data, 0.5, { tweenedNumber: newValue })
    }
  },
  methods: {
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
@import '~common/stylus/mixin'

.header
  position: absolute
  z-index: 99
  bottom: 0
  left: 0
  width: 100%
  height: 3.2rem
  box-sizing: border-box
  display: flex
  align-items: center
  justify-content: flex-start
  background: #333333
  .left 
    padding-left: 0.6rem
    font-size: 0.4rem
    color: #525252
    display: flex;
    align-items: center;
    height: 3.2rem
    .avatars
      width: auto
      height: 3.2rem
      overflow: hidden
      transition: all 0.3s ease-in-out
      .avatar
        width: 1.2rem
        height: 3.2rem
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        float: left
        margin-right: 0.4rem
        img 
          width: 1.2rem
          height: 1.2rem
          border-radius: 50%
          box-shadow: 0 0.03rem 0.07rem 0px rgba(4, 0, 0, 0.21)
        .name
          padding-top: 0.2rem
          font-size: 0.32rem
          text-align: center
          color: #fff
          width: 100%
          no-wrap()
        &:last-child
          margin-right: 0
    .stretch
      display: flex
      align-items: center
      justify-content: flex-start
      height: 3.2rem
      padding: 0 0.2rem
      i 
        font-size: 0.6rem
        color: #c7c7c7
  .middle
    flex: 1
    height: 3.2rem
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    color: #ffffff
    .profit
      font-size: 0.8rem
    .danwei
      padding-top: 0.2rem
      font-size: 0.44rem
</style>
