const prodMode = process.env.NODE_ENV === 'production';

module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  pwa: {
    name: 'Ultima',
    themeColor: '#a25387',
    msTileColor: '#a25387',
  },
  css: {
    sourceMap: !prodMode,
  },
}
