import axios from 'axios'
import store from '../store'
import {getToken} from './auth'
import {login} from "@/api/user";

// axios.defaults.headers['Content-Type'] = 'application/json'
// axios.defaults.headers['Access-Control-Allow-Origin'] = '*'
// create an axios instance
const service = axios.create({
    baseURL: '', // url = base url + request url
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent

        if (store.getters.token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['Authorization'] = 'jwt ' + getToken()
        }
        // config.headers['Content-Type'] = 'application/json'
        // config.headers['Access-Control-Allow-Origin'] = '*'
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        // if the custom code is not 20000, it is judged as an error.

        if (response.status !== 200) {
            return Promise.reject(new Error('Error'))
        } else {
            return response
        }
    },
    error => {
        if (error.response && error.response.status === 401) {
            // 401 错误，重新登录
            return login().then((response) => {
                return store.dispatch('user/setToken', response.data.token).then(() => {
                    error.config.headers['Authorization'] = 'jwt ' + getToken()
                    return axios(error.config)
                }).catch(() => {
                    return Promise.reject(error)
                })
            })
        }
        return Promise.reject(error)
    }
)

export default service
