import request from './request';
import cfg from '../config';

const config = {
    env: cfg.env,
    host: cfg.url,
    version: '1.0.0',
    appId: 'AptStarGuard'
};

/**
 * 接口地址的基础url前缀
 */
export const apiBaseUrl = `${config.host}/saas20/api/${config.version}/${config.appId}`;

export default {
    // 线下实人认证提交
    manualSubmit: (params) => {
        return request(apiBaseUrl + '/auth/manual/submit', {...params}, 'post');
    }
};
