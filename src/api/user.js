import request from '@/utils/request'
/**
 * 
 * @param {Object} data password mobile
 * @returns promise
 */
export function login(data) {
    return request({
        url: '/sys/login',
        method: 'POST',
        data,
    })
}

/**
 * 获取用户信息
 * @returns promise
 */
export function getUserInfoApi() {
    return request({
        url: '/sys/profile',
        method: 'POST',
    })
}
/**
 * 
 * @param {*} id 用户id
 * @returns promise
 */
export function getUserDetailsApi(id) {
    return request({
        url: '/sys/user/' + id
    })
}
