import request from 'utils/request'

/**
 * 登录后广告列表接口
*/
export function getHomeAdList(batchNo) {
  return request({
    url: `advert/mining/list/v2/${batchNo}`,
    method: 'get'
  })
}

/**
 * 30分钟倒计时完毕后提交收益接口
*/
export function submitProfit(data) {
  return request({
    url: 'user/loginOut/mining/machineNum/v2',
    method: 'post',
    data
  })
}

/**
 * 登录成功后获取预计收益
*/
export function getEstimateProfit(batchNo) {
  return request({
    url: `advert/mining/audienceIncome/${batchNo}`,
    method: 'get'
  })
}
