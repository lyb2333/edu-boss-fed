import axios from 'axios'
import store from '@/store'

const request = axios.create({

})

request.interceptors.request.use(config => {
  if (store.state.user) {
    config.headers.Authorization = store.state.user.access_token
  }
  return config
}, err => {
  return Promise.reject(err)
})

export default request
