<template>
  <div class="index">
    <index-header></index-header>
    <div class="box">
      <cube-slide :data="items" :options="options" :interval="5000" :initial-index="0" :showDots="false" :autoPlay="true" :refreshResetCurrent="false" v-if="items.length > 0">
        <cube-slide-item v-for="(item, index) in items" :key="item.advertId">
          <a href="javascript:;">
            <img :src="item.contentUrl" v-if="index === 0 || index === items.length - 1">
            <img v-lazy="item.contentUrl" v-else>
          </a>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import IndexHeader from 'base/IndexHeader'

export default {
  name: 'Index',
  components: {
    IndexHeader
  },
  data() {
    return {
      items: [],
      options: {
        disableTouch: true,
        stopPropagation: true
      }
    }
  },
  mounted() {
    this.getAdList()
  },
  methods: {
    // 获取广告列表
    getAdList() {
      this.$store.dispatch('GetAdList').then(res => {
        if (res.code === 0) {
          this.$toast(res.msg, 'warn')
          return
        }
        const result = res.result
        this.items = result
      }).catch(err => {
        console.log(err)
        this.$toast('获取广告失败', 'error')
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
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
</style>
