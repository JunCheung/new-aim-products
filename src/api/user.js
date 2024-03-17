import request from '@/utils/request'

export function login() {
    let data = {
        'email': 'test_account@dsz.com.au',
        'password': 'asdf_123456'
    }
    return request({
        url: '/auth',
        method: 'post',
        data
    })
}
