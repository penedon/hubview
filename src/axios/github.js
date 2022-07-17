import axios from 'axios'

const instance = axios.create({ baseURL: 'https://api.github.com/' })
// 
// instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
instance.interceptors.request.use(request => {
  request.headers['Authorization'] = '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'
  return request
})

export default instance
