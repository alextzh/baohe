import request from 'utils/request'

/**
 * 未登录广告列表接口
*/
export function getAdList() {
  return request({
    url: '/advert/mining/list',
    method: 'get'
  })
}
