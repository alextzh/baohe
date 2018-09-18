import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import home from './modules/home'
import index from './modules/index'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    home,
    index
  },
  getters
})

export default store
