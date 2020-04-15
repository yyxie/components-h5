const {
    override,
    addLessLoader,
    addPostcssPlugins,
    fixBabelImports,
    addDecoratorsLegacy,
    enableEslintTypescript,
} = require("customize-cra");
const fs = require('fs');
const path = require('path');

module.exports = override(
    enableEslintTypescript(),
    addDecoratorsLegacy(),
    addLessLoader(),
    addPostcssPlugins([require("postcss-px2rem-exclude")({
        remUnit: 16,
        propList: ['*'],
        exclude: ''
    })]),
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: 'css',
    }),
    //setWebpackPublicPath('.'),
    (config) => { //暴露webpack的配置 config ,evn
        config.output.publicPath = './'
        return config;
    }
);
