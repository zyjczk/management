import axios from 'axios'
import { Loading, Message } from 'element-ui'
import errors from '../config/errors'
import router from '@/router'

// 超时时间
axios.defaults.timeout = 10000

var loadinginstace

axios.interceptors.request.use(
  config => {
    loadinginstace = Loading.service({ fullscreen: true })
    config.headers['X-Auth-Token'] = sessionStorage.getItem('token')
    return config
  },
  error => {
    loadinginstace.close()
    Message.error({
      message: '请求超时，请稍后重试！'
    })
    return Promise.reject(error)
  }
)
// http响应拦截器
axios.interceptors.response.use(
  res => {
    loadinginstace.close()

    const tokeError = Object.keys(errors.tokeError)

    if (tokeError.indexOf(`${res.data.code}`) > -1) {
      router.push({ path: '/' })
    }

    return res
  },
  error => {
    loadinginstace.close()
    Message.error({
      message: '请求失败，请稍后重试！'
    })
    return Promise.reject(error)
  }
)

export default axios
