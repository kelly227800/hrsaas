import request from '@/utils/request'

export function getDeptsApi() {
    return request({
        url: '/company/department'
    })

}