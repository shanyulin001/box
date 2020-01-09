module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/styles/var.scss";',
      },
      less: {
        modifyVars: {
          // 'tabbar-background-color': '#3D4258',
          // 'tabbar-item-active-color': '#fff',
          // 'tabbar-item-color': '#999',
        },
      },
    },
  },
  publicPath: './',
  devServer: {
    proxy: { // 配置跨域
      '/api': {
        target: 'http://api.yh.hetonglian.top', // 要访问的跨域的api的域名
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
      '/bwApi': {
        target: 'https://www.bw.io', // 要访问的跨域的api的域名
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/bwApi': '',
        },
      },
    },
  },
  productionSourceMap: false,
  // outputDir: './../cordovaApp/www',
};
