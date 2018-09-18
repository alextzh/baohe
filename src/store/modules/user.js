import {checkIsLogin} from 'api/login'

const user = {
  state: {
    userInfo: null, // 用户信息
    users: [], // 保存的用户头像、昵称数组
    machineNum: '123456', // 设备uuid
    count: 60, // 扫码页面3分钟倒计时
    timeOut: false // 扫码页面是否过期
  },
  mutations: {
    SET_MACHINE_NUM: (state, num) => {
      state.machineNum = num
    },
    REMOVE_USERINFO: (state) => {
      state.userInfo = null
      localStorage.removeItem('userInfo')
    },
    SET_USERINFO: (state, obj) => {
      var newObj = JSON.parse(JSON.stringify(obj))
      state.userInfo = newObj
      localStorage.setItem('userInfo', JSON.stringify(obj))
    },
    SET_USERS: (state, obj) => {
      state.users.unshift(obj)
    },
    CLEAR_USERS: (state) => {
      state.users = []
    },
    SET_TIMEOUT: (state, flag) => {
      state.timeOut = flag
    },
    SET_INIT_COUNT: (state, num) => {
      state.count = num
    },
    SET_COUNT: (state) => {
      state.count--
    }
  },
  actions: {
    ResetCount({commit}) {
      commit('SET_INIT_COUNT', 60)
      commit('SET_TIMEOUT', false)
    },
    // 3秒轮询一次
    RunCheck({state, commit}) {
      const timer = setInterval(() => {
        if (!state.timeOut) {
          if (state.count > 0) {
            commit('SET_COUNT')
          } else {
            clearInterval(timer)
          }
        } else {
          clearInterval(timer)
        }
      }, 3000)
    },
    // 检测宝盒是否登录
    CheckIsLogin() {
      return new Promise((resolve, reject) => {
        checkIsLogin().then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
