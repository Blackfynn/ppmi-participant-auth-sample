process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: '@import "@/assets/styles/_variables.scss";'
            }
        }
    }
}