import request from 'utils/request'
import store from '../store'

/**
 * 轮询宝盒是否登录
*/
export function checkIsLogin() {
  return request({
    url: `/user/mining/personnes?machineNum=${store.getters.machineNum}`,
    method: 'get'
  })
}
