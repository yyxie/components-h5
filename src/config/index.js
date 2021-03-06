const environment = {
  // 开发环境域名配置
  dev: {
    env: 'dev',
    url: 'http://172.18.2.15:28084'
  },
  // 测试环境域名配置
  test: {
    env: 'test',
    url: 'https://betaplus.unovo.com.cn'
  },
  // 生产环境域名配置
  production: {
    env: 'production',
    url: 'https://saas.lianyuplus.com'
  }
};

let config = environment.dev;

if (process.env.NODE_ENV === 'production') {
  config = { ...environment.production };
}

export default config;
