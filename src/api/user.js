import request from '@/utils/request'

export function login() {
    let data = {
        'email': 'test_account@dsz.com.au',
        'password': 'asdf_123456'
    }
    return request({
        url: '/api/dsz-api/auth',
        method: 'post',
        data
    })
}
