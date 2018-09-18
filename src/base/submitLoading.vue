<template>
  <div class="box" v-if="subLoading">
    <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
    <path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
      <animateTransform attributeType="xml"
        attributeName="transform"
        type="rotate"
        from="0 25 25"
        to="360 25 25"
        dur="0.6s"
        repeatCount="indefinite"/>
      </path>
    </svg>
    <p class="content">{{content}}</p>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'SubmitLoading',
  props: {
    content: {
      type: String,
      default: '正在计算收益中'
    }
  },
  computed: {
    ...mapGetters([
      'subLoading'
    ])
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

svg path, svg rect{
  fill: $color-theme
}
.box
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: rgba(0,0,0,.7)
  overflow: hidden
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  .content
    font-size: 0.4rem
    color: $color-theme
    padding-top: 0.3rem
    letter-spacing: 1px
</style>

