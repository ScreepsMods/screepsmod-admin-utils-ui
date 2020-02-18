const path = require('path')

module.exports = {
  publicPath: '/web',

  devServer: {
    proxy: {
      '^/(api|stats)': {
        target: 'https://server2.screepspl.us/',
        ws: true,
        changeOrigin: true
      }
    }
  },

  transpileDependencies: [
    'vuetify'
  ],

  configureWebpack: {
    resolve: {
      alias: {
        ws: path.join(__dirname, 'src/ws-browser')
      }
    }
  },

  pluginOptions: {
    autoRouting: {
      chunkNamePrefix: 'page-'
    }
  }
}
