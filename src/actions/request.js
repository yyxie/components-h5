import axios from 'axios';
import qs from 'qs';
import Tips from '../utils/Tips';

// 拦截发送请求
axios.interceptors.request.use(
    config => {
        Tips.addLoading();
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 拦截响应response，并做一些错误处理
axios.interceptors.response.use(
    response => {
        const data = response.data;
        // 根据返回的code值来做tips不同的处理（和后端约定）
        if (data.errorCode === -9999) {
            // 无权限
            // 不显示提示消息
            data.message = '登录信息失效，请重新登录';
            localStorage.removeItem('token');

            return Promise.reject(data);
        }
        return Promise.resolve(data);
    },
    err => {
        // 这里是返回状态码不为200时候的错误处理
        if (err && err.response) {
            switch (err.response.status) {
                case 400:
                    err.message = '请求错误';
                    break;

                case 401:
                    err.message = '未授权，请登录';
                    break;

                case 403:
                    err.message = '拒绝访问';
                    break;

                case 404:
                    err.message = `请求地址出错: ${err.response.config.url}`;
                    break;

                case 408:
                    err.message = '请求超时';
                    break;

                case 500:
                    err.message = '服务器内部错误';
                    break;

                case 501:
                    err.message = '服务未实现';
                    break;

                case 502:
                    err.message = '网关错误';
                    break;

                case 503:
                    err.message = '服务不可用';
                    break;

                case 504:
                    err.message = '网关超时';
                    break;

                case 505:
                    err.message = 'HTTP版本不受支持';
                    break;

                default:
            }
        } else {
            err.message = '网络断了';
        }
        // 删除loading
        return Promise.reject(err);
    }
);

// content-type 类型映射
const contentTypeMapping = {
    form: 'application/x-www-form-urlencoded',
    formData: 'multipart/form-data',
    text: 'text/plain',
    json: 'application/json'
};

const request = (
    url,
    param,
    method = 'POST',
    {
        dataType = 'json',
        loadingEle = false,
        contentType = 'form',
        ...restOptions
    } = {}
) => {
    return axios({
        method: method || 'POST',
        url: url,
        params: method.toUpperCase() === 'GET' && param,
        data: contentType === 'form' ? qs.stringify(param) : param,
        dataType: dataType || 'json',
        headers: {
            'Content-type': contentTypeMapping[contentType] || contentType
        },
        loadingEle: loadingEle,
        timeout: 60000,
        ...restOptions
    })
        .then(data => {
            Tips.removeLoading();
            restOptions.successHandler && restOptions.successHandler(data);
            if (data) {
                // 附加请求参数，用于判断同一个接口请求后与返回数据进行匹配
                data.params = param;
            }
            return Promise.resolve(data);
        })
        .catch(error => {
            // 避免再次提示
            if (error.errorCode !== -9999) {
                console.error(error.message);
            }
            Loading.removeLoading();
            restOptions.failureHandler && restOptions.failureHandler(error);

            return Promise.reject(error);
        });
};
export default request;
