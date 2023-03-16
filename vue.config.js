module.exports = {
    devServer: {
        port: 8888,
        proxy: {
            '/api': {
                target: 'http://60.214.223.40:8000',
                secure: false,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    },
    productionSourceMap: false,
    lintOnSave: false
}
