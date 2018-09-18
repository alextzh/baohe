<template>
  <div class="setting">
    <setting-header @back="back" @handleLayout="handleLayout"></setting-header>
    <div class="box"></div>
    <submit-loading></submit-loading>
  </div>
</template>

<script>
import SettingHeader from 'base/SettingHeader'
import SubmitLoading from 'base/SubmitLoading'

export default {
  name: 'Setting',
  components: {
    SettingHeader,
    SubmitLoading
  },
  methods: {
    back() {
      this.$router.back()
    },
    handleLayout() {
      this.submitProfit()
    },
    // 提交收益
    submitProfit() {
      this.$store.commit('SET_SUBLOADING', true)
      const data = {
        machineNum: this.$store.getters.machineNum,
        userList: JSON.stringify(this.$store.getters.users)
      }
      this.$store.dispatch('SubmitProfit', data).then(res => {
        this.$store.commit('SET_SUBLOADING', false)
        if (res.code === 0) {
          this.$toast(res.msg, 'warn')
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
.box
  position: absolute 
  top: 1.25rem
  left: 0
  right: 0
  bottom: 0
  overflow: hidden
  z-index: 0
</style>
