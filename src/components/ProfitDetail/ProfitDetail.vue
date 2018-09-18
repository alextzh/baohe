<template>
  <div class="profit-detail">
    <div class="box">
      <cube-scroll>
        <div class="tip">
          <h3>总收益</h3>
          <p style="color:#faf691;">{{total}} DDO</p>
        </div>
        <ul class="list" v-if="profitList.length > 0">
          <li class="item" v-for="item in profitList" :key="item.userId">
            <img class="avatar" :src="item.profilePic" alt="">
            <div class="content">
              <span class="name">{{item.nickname}}</span>
              <p class="profit"><span class="blank">{{item.thisIncome}}</span>DDO</p>
            </div>
          </li>
        </ul>
        <div class="download-desc">
          <p class="txt">扫码提现</p>
        </div>
        <div class="download-box">
          <div class="download-item">
            <div class="download">
              <img class="image" :src="androidQr" alt="">
            </div>
            <a class="anchor" href="javascript:;">安卓版下载</a>
            <vue-qr style="display:none" :text="androidText" :callback="creatAndroidQr" :size="150" :margin="5" colorDark="#fb9f32" qid="android"></vue-qr>
          </div>
        </div>
        <div class="ios-tip">（ios用户可前往微信公众号进行操作）</div>
        <div class="description">
          <p class="question"><span>什么是DDO（度）？</span>DDO能干嘛用？</p>
          <p class="answer">DDO是一种数字加密通证，用于广告主在蒲公英链上的广告发布及对广告受众的奖励，全球发行数量有限。用户可将DDO兑换成自己喜爱的商品服务，还可以像黄金一样保值增值</p>
        </div>
        <a class="confirm-btn" href="javascript:;" @click="handleConfirm">确定</a>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import VueQr from 'vue-qr'

export default {
  name: 'ProfitDetail',
  components: {
    VueQr
  },
  data() {
    return {
      androidQr: '',
      androidText: 'http://47.105.37.204/pugongyin.apk'
    }
  },
  computed: {
    total() {
      const list = this.profitList
      let num = 0
      list.forEach(item => {
        num += item.thisIncome
      })
      return num
    },
    ...mapGetters([
      'profitList',
      'confirmCount'
    ])
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.commit('SET_CONFIRM_COUNT', 180)
      vm.$store.commit('SET_OVER', false)
      vm.$store.dispatch('RunConfirm')
    })
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('SET_OVER', true)
    next()
  },
  watch: {
    confirmCount(newVal) {
      if (newVal === 0) {
        this.handleConfirm()
      }
    }
  },
  methods: {
    creatAndroidQr(dataUrl, id) {
      this.androidQr = dataUrl
    },
    handleConfirm() {
      this.$store.dispatch('ResetCount')
      this.$store.dispatch('ClearState')
      this.$store.commit('REMOVE_USERINFO')
      this.$store.commit('CLEAR_USERS')
      this.$store.commit('SET_PROFIT_LIST', [])
      this.$router.replace({
        path: '/index'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.box
  position: absolute 
  top: 0
  left: 0
  right: 0
  bottom: 0
  overflow: hidden
  z-index: 0
  background: $color-theme
  .tip
    padding: 2.6rem 0 1.2rem
    color: #fff
    text-align: center
    h3
      font-size: 0.58rem
      letter-spacing: 0.06rem
    p
      font-size: 0.9rem
      padding-top: 0.4rem
  .list
    min-height: 7.38rem;
    padding: 0 2rem
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    align-items: flex-start
    .item
      width: 50%
      display: flex
      align-items: center
      justify-content: flex-start
      padding-bottom: 1.2rem;
      .avatar
        display: block
        width: 1.26rem
        height: 1.26rem
        border-radius: 50%
        box-shadow: 0px 4px 18px 0px rgba(4, 0, 0, 0.2)
        border: 0
      .content
        display: flex
        flex-direction column
        align-items: flex-start
        justify-content center
        padding-left: 0.3rem
        .name
          color: #fff;
          padding: 0;
          display: inline-block;
          width: 100%;
          font-size: 0.46rem
          no-wrap()
          box-sizing: border-box;
          padding-bottom: 0.14rem
        .profit
          color: #faf691
          font-size: 0.46rem
          .blank
            padding-right: 0.2rem
            font-size: 0.66rem
  .download-desc
    color: #fff
    display: flex
    align-items: center
    justify-content: center
    padding-bottom: 0.3rem
    .txt
      font-size: 0.48rem
      letter-spacing: 0.06rem
  .download-box
    padding: 0 1.8rem
    display: flex
    .download-item
      flex: 1
      display: flex
      flex-direction: column
      align-items: center
      .download
        width: 150px
        height: 150px
        border: 0.04rem solid #fff
        box-sizing: border-box
        display: flex
        align-items center
        justify-content center
        padding: 0.06rem
        background: $color-theme
        .image
          display: block
          width: 140px
          height: 140px
          border: 0
      .anchor
        color: #fff
        text-decoration: underline
        font-size: 0.38rem
        padding-top: 0.3rem
        letter-spacing: 1px
  .ios-tip
    padding-top: 0.4rem
    color: #ffffff
    font-size: 0.38rem
    letter-spacing: 1px
    text-align: center
  .description
    padding: 1.3rem 3.18rem
    text-align: left
    font-size: 0.34rem
    color: #fff
    .question
      color: #fff
      padding-bottom: 0.2rem;
      font-size: 0.36rem
      span
        padding-right: 0.64rem
    .answer
      line-height: 1.5
  .confirm-btn
    display: flex
    justify-content: center
    align-items: center
    width: 6.1rem
    height: 0.92rem
    border: 0.03rem solid #fff
    border-radius: 50px
    font-size: 0.46rem
    color: #fff
    margin-left: auto 
    margin-right: auto
    letter-spacing: 0.5rem
    padding-left: 0.5rem;
    box-sizing: border-box;
    &:active
      background: $color-theme
      color: #fff
</style>
