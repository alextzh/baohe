const Home = () => import('components/Home/Home')
const Scan = () => import('components/Scan/Scan')
const Index = () => import('components/Index/Index')
const Setting = () => import('components/Setting/Setting')
const ProfitDetail = () => import('components/ProfitDetail/ProfitDetail')

export default [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Index',
    component: Index
  },
  {
    path: '/scan',
    name: 'Scan',
    component: Scan
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      requireAuth: true
    },
    component: Home
  },
  {
    path: '/setting',
    name: 'Setting',
    // meta: {
    //   requireAuth: true
    // },
    component: Setting
  },
  {
    path: '/profitDetail',
    name: 'ProfitDetail',
    meta: {
      requireAuth: true
    },
    component: ProfitDetail
  }
]
