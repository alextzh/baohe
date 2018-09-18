<template>
  <div class="home">
    <home-header @handleLayout="handleLayout"></home-header>
    <div class="box">
      <cube-slide ref="slide" :data="items" :options="options" :interval="5000" :initial-index="saveIndex" :showDots="false" :autoPlay="autoPlay" :refreshResetCurrent="false" @scroll-end="changePage" v-if="items.length > 0">
        <cube-slide-item v-for="(item, index) in items" :key="item.advertId">
          <img :src="item.contentUrl" v-if="index === 0 || index === items.length - 1">
          <img v-lazy="item.contentUrl" v-else>
          <div class="ad-qr">
            <qrcanvas :options="item.options"></qrcanvas>
            <img class="icon" v-show="item.campaignNum > 0" src="../../common/image/gift.png" alt="">
            <img class="icon" v-show="item.campaignNum === 0" src="../../common/image/yuanbao.png" alt="">
          </div>
        </cube-slide-item>
      </cube-slide>
    </div>
    <submit-loading></submit-loading>
  </div>
</template>

<script>
/* eslint-disable */
import HomeHeader from 'base/HomeHeader'
import SubmitLoading from 'base/SubmitLoading'
import {mapGetters} from 'vuex'
import Qrcanvas from 'qrcanvas-vue'

export default {
  name: 'Home',
  components: {
    HomeHeader,
    SubmitLoading,
    Qrcanvas
  },
  data() {
    return {
      items: [],
      options: {
        disableTouch: true
      },
      count: 0,
      total: 0,
      logoSrc: '/static/image/logo.png'
    }
  },
  created() {
    this.getHomeAdList()
    this.getEstimateProfit()
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.timer !== 0) {
        vm.$store.commit('SET_STOP', false)
        vm.$store.commit('SET_AUTO_PLAY', true)
        vm.$store.dispatch('RunTimer')
      }
      vm.count = vm.$store.getters.currentCount
    })
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('SET_STOP', true)
    this.$store.commit('SET_AUTO_PLAY', false)
    next()
  },
  computed: {
    ...mapGetters([
      'timer',
      'autoPlay',
      'saveIndex',
      'batchNo',
    ])
  },
  watch: {
    timer(newVal, oldVal) {
      if (newVal === 0) {
        this.$store.commit('SET_STOP', true)
        this.$store.commit('SET_AUTO_PLAY', false)
        this.submitProfit()
      } else {
        this.$store.commit('SET_STOP', false)
        this.$store.commit('SET_AUTO_PLAY', true)
      }
    }
  },
  methods: {
    // 轮播切换时获取当前index
    changePage(current) {
      console.log(current)
      this.count++
      let result = (this.count * this.total).toFixed(2)
      this.$store.commit('SET_CURRENT_COUNT', this.count)
      this.$store.commit('SET_CURRENT_PROFIT', result)
      this.$store.commit('SET_SAVE_INDEX', current)
    },
    // 获取广告列表
    getHomeAdList() {
      this.$store.dispatch('GetHomeAdList', this.batchNo).then(res => {
        if (res.code === 0) {
          this.$toast(res.msg, 'warn')
          return
        }
        let result = res.result
        this.items = this.createItems(result)
        this.$nextTick(() => {
          this.$refs.slide.refresh()
        })
      }).catch(err => {
        console.log(err)
        this.$toast('获取失败', 'error')
      })
    },
    // 获取预计收益
    getEstimateProfit() {
      this.$store.dispatch('GetEstimateProfit', this.batchNo).then(res => {
        if (res.code === 0) {
          this.$toast(res.msg, 'warn')
          return
        }
        this.total = res.result / 360
      }).catch(err => {
        console.log(err)
      })
    },
    // 给每张图片加二维码
    createItems(items) {
      let litems = items.slice()
      if (litems.length > 0) {
        litems.forEach(item => {
          item.options = {
            cellSize: 3,
            correctLevel: 'H',
            data: `advertId=${item.advertId}&machineNum=${this.$store.getters.machineNum}`,
            foreground: item.campaignNum > 0 ? '#db2048' : '#000000'
          }
        })
        return litems
      }
    },
    // 退出时触发
    handleLayout() {
      this.$store.commit('SET_STOP', true)
      this.$store.commit('SET_AUTO_PLAY', false)
      this.submitProfit()
    },
    // 提交收益
    submitProfit() {
      this.$store.commit('SET_SUBLOADING', true)
      const data = {
        machineNum: this.$store.getters.machineNum,
        batchNo: this.$store.getters.batchNo
      }
      this.$store.dispatch('SubmitProfit', data).then(res => {
        this.$store.commit('SET_SUBLOADING', false)
        if (res.code === 0) {
          this.$toast(res.msg, 'warn')
          this.$store.dispatch('ClearState')
          this.$store.commit('REMOVE_USERINFO')
          this.$store.commit('CLEAR_USERS')
          setTimeout(() => {
            this.$router.replace({
              path: '/index'
            })
          }, 0)
          return
        }
        setTimeout(() => {
          this.$router.push({
            path: '/profitDetail'
          })
        }, 0)
      }).catch(err => {
        this.$store.commit('SET_SUBLOADING', false)
        console.log(err)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.box >>> .cube-slide-item{
  position: relative
}
.box >>> .cube-slide-item > a{
  width: 100%
}
.box >>> .cube-slide-item img{
  width: 100%
}
.box
  position: absolute 
  bottom: 3.2rem
  left: 0
  right: 0
  top: 0
  overflow: hidden
  z-index: 0
  .ad-qr
    position: absolute;
    overflow: hidden;
    bottom: 1.4rem;
    right: 0.45rem;
    background: #fff;
    padding: 0.1rem;
    box-sizing: border-box;
    padding-bottom: 0;
    .icon
      position: absolute;
      width: 0.9rem;
      height: 0.9rem;
      top: 50%;
      left: 50%;
      margin-left: -0.45rem;
      margin-top: -0.45rem;
    img 
      display: block
      width: 100%
      height: 100%
      border: 0
    .text
      display: flex;
      justify-content: space-between;
      font-size: 0.46rem;
      color: #fb9f32;
      padding: 0.1rem;
      line-height: 1.5;
      span
        font-weight: 600
</style>
