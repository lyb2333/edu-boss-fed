import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

function refreshToken () {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}

const request = axios.create({

})

let isRefreshing = false
let requests: Function[] = [] // 存储刷新 token 期间过来的 401 请求
request.interceptors.request.use(config => {
  if (store.state.user) {
    config.headers.Authorization = store.state.user.access_token
  }
  return config
}, err => {
  return Promise.reject(err)
})

request.interceptors.response.use(response => {
  return response
}, async err => {
  if (err.response) {
    // 请求发出去收到响应了，但是状态码超出了 2xx 范围
    const { status } = err.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(err)
      }

      if (!isRefreshing) {
        isRefreshing = true
        return refreshToken().then(res => {
          if (!res.data.success) {
            throw new Error('刷新 token 失败')
          }

          store.commit('setUser', res.data.content)

          requests.forEach(cb => cb())
          requests = []
          return request(err.config)
        }).catch(error => {
          store.commit('setUser', null)
          redirectLogin()
          console.dir(error)
          return Promise.reject(err)
        }).finally(() => {
          isRefreshing = false
        })
      }

      return new Promise(resolve => {
        requests.push(() => {
          resolve(request(err.config))
        })
      })
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误，请联系管理员')
    }
  } else if (err.request) {
    // 请求发出去没有收到响应
    Message.error('请求超时，请刷新重试')
  } else {
    // 在设置请求时发生了一些事情，触发了一个错误
    Message.error(`请求失败：${err.message}`)
  }
  return Promise.reject(err)
})

export default request
