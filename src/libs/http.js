import http from 'axios'
import history from './history'
import { message } from 'antd';



// response处理
function handleResponse(response) {
    let result;
    if (response.status === 401) {
        result = '会话过期，请重新登录';
        if (history.location.pathname !== '/') {
            history.push('/', { from: history.location })
        } else {
            return Promise.reject()
        }
    } else if (response.status === 200) {
        if (response.data.error) {
            result = response.data.error
        } else if (response.data.hasOwnProperty('data')) {
            return Promise.resolve(response.data.data)
        } else if (response.headers['content-type'] === 'application/octet-stream') {
            return Promise.resolve(response)
        } else {
            result = '无效的数据格式'
        }
    } else {
        result = `请求失败: ${response.status} ${response.data.message}`
    }
    message.error(result);
    return Promise.reject(result)
}

// 请求拦截器
http.interceptors.request.use(request => {
    
    if (request.url.startsWith('/api/')) {
        request.headers['X-Token'] = localStorage.getItem('token')
    }
    request.timeout = 30000;
    return request;
});

// 返回拦截器
http.interceptors.response.use(response => {
    return handleResponse(response)
}, error => {
    if (error.response) {
        return handleResponse(error.response)
    }
    const result = '请求异常: ' + error.message;
    message.error(result);
    return Promise.reject(result)
});


http.defaults.timeout = 200000;
http.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
http.defaults.baseURL = 'http://devops-backend.faker.com'
http.defaults.withCredentials = true // session

export default http;
