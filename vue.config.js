module.exports = {
    transpileDependencies: [
        'vuetify'
    ],
    publicPath: process.env.NODE_ENV === 'production'
    ? '/todopwa/'
    : '/',
    pwa: {
        name : 'gggg',
        themeColor: '#0e67ff',
        manifestOptions:{
            background_color: "#ff00e9"
        }
    }
}
