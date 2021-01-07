const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    publicPath: '/temp-manim-projects/',
    configureWebpack: {
        optimization: {
            minimize: true,
            minimizer: [
              new TerserPlugin({
                terserOptions: {
                  format: {
                    comments: false,
                  }
                },
                extractComments: false,
              })
            ]
        }
    }
}