const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

// webpack.config.js 설정을 불러와서 development 환경에 맞도록 수정합니다
const webpackConfig = require("./webpack.config.js")

// webpack-dev-server 설정
webpackConfig.devServer = {
  compress: true,
  disableHostCheck: true,
  historyApiFallback: true,
  hot: true,
  host: "0.0.0.0",
  port: 8080,
  // proxy: {
  //   "/api": {
  //     target: "http://api.example.com",
  //     changeOrigin: true,
  //     secure: false,
  //     pathRewrite: {
  //       "^/api": "",
  //     },
  //   },
  // },
}

webpackConfig.mode = "development" // mode는 development로 설정
webpackConfig.module.rules = [
  // webpack.config.js /\.(jsx?|tsx?)$/ 룰과 같음
  {
    test: /\.(jsx?|tsx?)$/,
    loader: "babel-loader",
    options: {
      plugins: [
        ["@babel/plugin-proposal-class-properties", { loose: true }],
        "@babel/plugin-syntax-dynamic-import",
      ],
      presets: [
        ["@babel/preset-env", { targets: { ie: "11" } }],
        "@babel/preset-typescript",
        "@babel/preset-react",
      ],
    },
  },
  // mini-css-extract-plugin 대신 style-loader 사용 (hot reload 권장사항)
  {
    test: /\.css$/,
    loaders: ["style-loader", "css-loader"],
  },
  {
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    loader: "file-loader",
    options: { name: "images/[name].[ext]" },
  },
  {
    test: [/\.woff2?$/, /\.ttf$/, /\.eot$/, /\.otf$/],
    loader: "file-loader",
    options: { name: "fonts/[name].[ext]" },
  },
]
webpackConfig.plugins = [
  // del-webpack-plugin과 mini-css-extract-plugin 제외
  new CaseSensitivePathsPlugin(),
  new HtmlWebpackPlugin({ template: "./index.html" }),
]

module.exports = webpackConfig
