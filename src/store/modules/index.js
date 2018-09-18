import {getAdList} from 'api/index'

const shop = {
  state: {
    adList: [],
    loading: false
  },
  mutations: {
    SET_AD_LIST: (state, list) => {
      state.adList = list
    },
    SET_LOADING: (state, flag) => {
      state.loading = flag
    }
  },
  actions: {
    // 获取未登录广告列表
    GetAdList({commit}) {
      return new Promise((resolve, reject) => {
        getAdList().then(response => {
          const data = response.data
          commit('SET_AD_LIST', data.result)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default shop
