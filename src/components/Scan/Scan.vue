<template>
  <div class="scan">
    <login-header @back="back" @handleLayout="handleLayout"></login-header>
    <div class="box">
      <p class="title">欢迎来到蒲公英链</p>
      <div class="devide"></div>
      <p class="desc">这是一个可以“挖金”的广告宝盒，观看者会根据不同观看时长获得相应赏金，还可以邀请朋友一起来“挖金”，大家一起赚赏金</p>
      <div class="scan-box">
        <span class="p1">立即扫一扫，启动宝盒</span>
        <span class="p2">（支持多人同时扫码）</span>
        <div class="scan">
          <img :src="qrUrl" alt="">
        </div>
        <vue-qr style="display:none" :text="message" :callback="creatQr" :size="236" :margin="10" colorDark="#fb9f32"></vue-qr>
        <span class="tip">小提示</span>
        <span class="p3">进入广告播放页后</span>
        <span class="p4">你会看到两种颜色的二维码</span>
      </div>
      <div class="notice">
        <div class="left">
          <img src="../../common/image/left_qr.png" alt="">
        </div>
        <div class="right">
          <img src="../../common/image/right_qr.png" alt="">
        </div>
        <div class="tip_left">
          <img src="../../common/image/left.png" alt="">
          <p class="left_text">看到黑色二维码会挖出赏金</p>
        </div>
        <div class="tip_right">
          <img src="../../common/image/right.png" alt="">
          <p class="right_text">看到红色二维码不仅会挖出赏金还可能直接中奖广告产品</p>
        </div>
      </div>
      <div class="rules">
        <h5 class="tit">友情提示：</h5>
        <p>一个广告播放周期最长为30分钟，小伙伴中途也可加入</p>
      </div>
    </div>
    <submit-loading></submit-loading>
  </div>
</template>

<script>
/* eslint-disable */
import LoginHeader from 'base/LoginHeader'
import SubmitLoading from 'base/SubmitLoading'
import VueQr from 'vue-qr'
import {mapGetters} from 'vuex'

export default {
  name: 'Scan',
  components: {
    LoginHeader,
    SubmitLoading,
    VueQr
  },
  data() {
    return {
      qrUrl: '',
      message: ''
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch('ResetCount')
      vm.$store.dispatch('RunCheck')
    })
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('SET_TIMEOUT', true)
    console.log('离开了')
    next()
  },
  created() {
    this.message = `http://47.105.37.204/#/scanLogin?machineNum=${this.machineNum}`
  },
  computed: {
    ...mapGetters([
      'count',
      'machineNum',
      'users'
    ])
  },
  watch: {
    count(newVal, oldVal) {
      console.log(newVal)
      if (newVal > 0) {
        this.checkIsLogin()
      } else {
        this.$router.back()
      }
    }
  },
  methods: {
    // 返回
    back() {
      this.$router.back()
    },
    handleLayout() {
      this.$router.back()
    },
    creatQr(dataUrl) {
      this.qrUrl = dataUrl
    },
    // 轮询宝盒是否登录
    checkIsLogin() {
      this.$store.dispatch('CheckIsLogin').then(res => {
        if (res.code === 0) {
          return
        }
        const result = res.result
        if (result.length > 0) {
          this.$store.commit('SET_BATCH_NO', result[0].batchNo)
        }
        var userLen = this.users.length
        if (userLen === result.length) {
          return
        } else {
          const len = result.length - 1
          const user = {
            userId: result[len].userId,
            nickname: result[len].nickname,
            profilePic: result[len].profilePic
          }
          this.$store.commit('SET_USERS', user)
          this.$store.commit('SET_USERINFO', result[0])
          this.$toast('登录成功', 'correct')
          setTimeout(() => {
            this.$router.replace({
              path: '/home'
            })
          }, 500)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.box
  position: absolute 
  top: 0
  left: 0
  right: 0
  bottom: 3.2rem
  padding: 2rem 1rem 0
  background: $color-theme
  color: #fff
  text-align: center
  overflow: hidden
  z-index: 0
  .title
    font-size: 1.2rem
    letter-spacing: 0.1rem
    font-weight: 600
  .devide
    height: 0.12rem
    background: #ffffff
    border-radius: 50px
    margin: 0.24rem 0
  .desc
    font-size: 0.36rem
    line-height: 1.5
    letter-spacing: 2px
  .scan-box
    display: flex
    flex-direction: column
    align-items: center
    padding: 1rem 0 0.45rem
    .p1
      font-size: 0.48rem
      letter-spacing: 0.06rem
      padding-bottom: 0.2rem
    .p2
      font-size: 0.34rem
      letter-spacing: 0.04rem
    .p3
      font-size: 0.36rem
      letter-spacing: 0.04rem
      padding-bottom: 0.15rem
    .p4
      font-size: 0.32rem
      letter-spacing: 0.04rem
    .tip
      font-size: 0.6rem
      letter-spacing: 0.06rem
      padding-bottom: 0.24rem
    .scan
      margin: 0.5rem
      border: 0.06rem solid #ffffff
      box-sizing: border-box
      width: 5rem
      height: 5rem
      display: flex
      align-items: center
      justify-content: center
      padding: 0.08rem
      background: $color-theme
      img
        display: block
        width: 100%
        height: 100%
        border: 0
  .notice
    position: relative
    width: 6rem
    height: 2.7rem
    display: flex
    justify-content: space-between
    align-items: center
    margin: 0 auto
    padding-bottom: 1rem
    .left,.right
      width: 2.7rem
      height: 2.7rem
      border: 0.06rem solid #ffffff
      box-sizing: border-box
      img
        display block
        width 100%
        height: 100%
        border: 0
    .tip_left
      position: absolute 
      left: -3.56rem
      top: -0.7rem
      width: 3.17rem
      height: 2.45rem
      img 
        display block
        width: 100%
      .left_text
        position: absolute 
        left: 0.7rem
        top: 0.46rem
        font-size: 0.24rem
        font-weight: 600
        color: #000
        line-height: 2.5
        text-align: left;
        width: 2rem;
        letter-spacing: 1px
        transform: rotate(-3deg)
    .tip_right
      position: absolute 
      right: -3.56rem
      top: -0.7rem
      width: 3.17rem
      height: 2.45rem
      img 
        display block
        width: 100%
      .right_text
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
        font-size: 0.24rem;
        font-weight: 600
        color: #000;
        line-height: 1.5;
        text-align: left;
        width: 2.4rem;
        letter-spacing: 1px;
        transform: rotate(3deg)
  .rules
    padding: 0 3.2rem
    text-align: left
    font-size: 0.28rem
    color: #ffffff
    line-height: 1.7
    .tit
      font-size: 0.34rem
      padding-bottom: 0.1rem
      letter-spacing: 2px
    p
      letter-spacing: 1px
</style>

