import { http } from 'libs/http'
import api from 'api'
import qs from 'qs'

const urlPrefix = '/v1/acl'


// 登录接口
export function login(params) {
    return http({
        url: api.Login,
        method: 'POST',
        data: params
    })
}
// 获取用户信息
export function getInfo() {
    return http({
        url: urlPrefix + api.UserInfo,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

// 获取菜单接口
export function getMenu(id, params) {
    return http({
        url: urlPrefix + api.Menu + `/${id}/permissions`,
        method: 'GET',
        data: params
    })
}