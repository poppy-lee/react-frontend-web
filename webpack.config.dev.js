const path = require("path")

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
        // react-hot-loader 사용
        // https://github.com/gaearon/react-hot-loader
        "react-hot-loader/babel",
      ],
      presets: [
        ["@babel/preset-env", { targets: { ie: "11" } }],
        "@babel/preset-typescript",
        "@babel/preset-react",
      ],
    },
  },
  // react-hot-loader: webpack ExtractTextPlugin is not compatible with React Hot Loader
  // https://github.com/gaearon/react-hot-loader#webpack-extracttextplugin
  {
    test: /\.css$/,
    loaders: ["style-loader", "css-loader"],
  },
  {
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    loader: "file-loader",
    options: { name: "images/image.[name].[ext]" },
  },
  {
    test: [/\.woff2?$/, /\.ttf$/, /\.eot$/, /\.otf$/],
    loader: "file-loader",
    options: { name: "fonts/font.[name].[ext]" },
  },
]
webpackConfig.output = {
  filename: "scripts/script.[name].js",
  chunkFilename: "scripts/script.[name].js",
  path: path.resolve("./dist/"),
  publicPath: "/",
}
webpackConfig.plugins = [
  new CaseSensitivePathsPlugin(),
  // del-webpack-plugin 사용하지 않음
  new HtmlWebpackPlugin({ template: "./index.html" }),
  // mini-css-extract-plugin 사용하지 않음
]
webpackConfig.resolve = {
  alias: {
    "@assets": path.resolve("./assets"),
    "@src": path.resolve("./src"),
    // 🔥 version of React-DOM
    // https://github.com/gaearon/react-hot-loader#react--dom
    // https://github.com/hot-loader/react-dom
    "react-dom": "@hot-loader/react-dom",
  },
  extensions: [".js", ".jsx", ".ts", ".tsx"],
}

module.exports = webpackConfig
