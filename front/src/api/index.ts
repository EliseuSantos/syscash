import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use(config => {
  if (config.headers) {
      config.headers['Authorization'] = `Bearer ${window.localStorage.getItem('accessToken')}`
  }

  return config
})

export const post = (url: string, options: any = {}) => axiosInstance.post(url, options).then(response => response.data)

export default axiosInstance