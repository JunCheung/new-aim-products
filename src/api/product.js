import request from '@/utils/request'

export function getProducts(keyword, pageNo, limit) {
    let params = ''
    if (keyword) {
        params += 'keywords=' + keyword + '&'
    }
    return request({
        url: '/products?' + params + 'page_no=' + pageNo + '&limit=' + limit,
        method: 'get'
    })
}
