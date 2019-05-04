let webpack = require('webpack')

module.exports = {
    lintOnSave: false,
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    PACKAGE_JSON: '"' + escape(JSON.stringify(require('./package.json'))) + '"'
                }
            })
        ],
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@c': '@/components/'
            },
        }
    },
}