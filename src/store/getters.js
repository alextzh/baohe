
const getters = {
  userInfo: state => state.user.userInfo,
  users: state => state.user.users,
  machineNum: state => state.user.machineNum,
  timeOut: state => state.user.timeOut,
  count: state => state.user.count,
  homeAdList: state => state.home.homeAdList,
  profitList: state => state.home.profitList,
  timer: state => state.home.timer,
  stop: state => state.home.stop,
  autoPlay: state => state.home.autoPlay,
  subLoading: state => state.home.subLoading,
  saveIndex: state => state.home.saveIndex,
  batchNo: state => state.home.batchNo,
  estimateProfit: state => state.home.estimateProfit,
  currentProfit: state => state.home.currentProfit,
  currentCount: state => state.home.currentCount,
  confirmCount: state => state.home.confirmCount,
  over: state => state.home.over,
  adList: state => state.index.adList,
  loading: state => state.index.loading
}

export default getters
