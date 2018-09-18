import axios from 'axios'
import qs from 'qs'
import router from '../router'
import Vue from 'vue'

const vm = new Vue()

// create an axios instance
const service = axios.create({
  baseURL: process.env.API_ROOT, // api的base_url  process.env.BASE_API
  timeout: 10000, // request timeout
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
  responseType: 'json'
})

// request interceptor
service.interceptors.request.use(config => {
  if (config.method.toLocaleLowerCase() === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, error => {
  vm.$toast('请求超时', 'error')
  setTimeout(() => {
    router.push({
      path: '/error',
      querry: {redirect: router.currentRoute.fullPath} // 从哪个页面跳转
    })
  }, 500)
  console.log(error)
  return Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(response => {
  return response
}, error => {
  // setTimeout(() => {
  //   router.push({
  //     path: '/error',
  //     querry: {redirect: router.currentRoute.fullPath} // 从哪个页面跳转
  //   })
  // }, 500)
  console.log('err' + error) // for debug
  return Promise.reject(error)
})

export default service
