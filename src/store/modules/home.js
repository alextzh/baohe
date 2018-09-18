import {getHomeAdList, submitProfit, getEstimateProfit} from 'api/home'

const home = {
  state: {
    homeAdList: [],
    profitList: [],
    timer: 1800, // 登陆后30分钟定时任务
    stop: false, // 是否停止倒计时
    autoPlay: true, // 轮播是否自动播放
    subLoading: false, // 提交后等待loading
    saveIndex: 0, // 离开当前页面时保存的当前轮播的index,
    batchNo: '', // 当前广告组的编号
    estimateProfit: 0, // 预计收益
    currentProfit: 0, // 当前预计收益
    currentCount: 0, // 当前第几张
    confirmCount: 180, // 确定收益倒计时
    over: false
  },
  mutations: {
    SET_CONFIRM_COUNT: (state, count) => {
      state.confirmCount = count
    },
    SET_OVER: (state, flag) => {
      state.over = flag
    },
    SET_CURRENT_COUNT: (state, count) => {
      state.currentCount = count
    },
    SET_CURRENT_PROFIT: (state, profit) => {
      state.currentProfit = profit
    },
    SET_ESTIMATE_PROFIT: (state, num) => {
      state.estimateProfit = num
    },
    SET_BATCH_NO: (state, no) => {
      state.batchNo = no
    },
    SET_SAVE_INDEX: (state, index) => {
      state.saveIndex = index
    },
    SET_PROFIT_LIST: (state, list) => {
      state.profitList = list
    },
    SET_HOME_AD_LIST: (state, list) => {
      state.homeAdList = list
    },
    SET_STOP: (state, flag) => {
      state.stop = flag
    },
    SET_AUTO_PLAY: (state, flag) => {
      state.autoPlay = flag
    },
    SET_SUBLOADING: (state, flag) => {
      state.subLoading = flag
    },
    SET_TIMER_INIT: (state, num) => {
      state.timer = num
    },
    SET_TIMER: (state) => {
      state.timer--
    },
    SET_CONFIRM: (state) => {
      state.confirmCount--
    }
  },
  actions: {
    // 退出清除状态
    ClearState({commit}) {
      commit('SET_CURRENT_COUNT', 0)
      commit('SET_CURRENT_PROFIT', 0)
      commit('SET_ESTIMATE_PROFIT', 0)
      commit('SET_SAVE_INDEX', 0)
      commit('SET_HOME_AD_LIST', [])
      commit('SET_TIMER_INIT', 1800)
    },
    // 获取登录成功后的预计收益
    GetEstimateProfit({commit}, batchNo) {
      return new Promise((resolve, reject) => {
        getEstimateProfit(batchNo).then(response => {
          const data = response.data
          commit('SET_ESTIMATE_PROFIT', data.result)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取登录后广告列表
    GetHomeAdList({commit}, batchNo) {
      return new Promise((resolve, reject) => {
        getHomeAdList(batchNo).then(response => {
          const data = response.data
          commit('SET_HOME_AD_LIST', data.result)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 30分钟倒计时结束提交
    SubmitProfit({commit}, data) {
      return new Promise((resolve, reject) => {
        submitProfit(data).then(response => {
          const data = response.data
          commit('SET_PROFIT_LIST', data.result)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登录成功30分钟倒计时开始
    RunTimer({state, commit}) {
      const timer = setInterval(() => {
        if (!state.stop) {
          if (state.timer > 0) {
            commit('SET_TIMER')
          } else {
            clearInterval(timer)
          }
        } else {
          clearInterval(timer)
        }
      }, 1000)
    },
    // 30秒倒计时离开提交页面
    RunConfirm({state, commit}) {
      const timer = setInterval(() => {
        if (!state.over) {
          if (state.confirmCount > 0) {
            commit('SET_CONFIRM')
          } else {
            clearInterval(timer)
          }
        } else {
          clearInterval(timer)
        }
      }, 1000)
    }
  }
}

export default home
