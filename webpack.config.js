const path = require("path")

const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin")
const DelWebpackPlugin = require("del-webpack-plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = (env, argv) => {
  const webpackConfig = {
    entry: {
      app: path.resolve("./src/index.ts"),
    },
    mode: "production",
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.(jsx?|tsx?)$/,
          exclude: { test: /node_modules/ },
          loader: "eslint-loader",
        },
        {
          test: /\.(jsx?|tsx?)$/,
          loader: "babel-loader",
          exclude: { test: /node_modules/ },
          options: { rootMode: "root" },
        },
        {
          test: /\.css$/,
          loaders: [
            argv.mode === "production"
              ? // mini-css-extract-plugin의 loader 설정
                // https://github.com/webpack-contrib/mini-css-extract-plugin
                MiniCssExtractPlugin.loader
              : "style-loader",
            "css-loader",
          ],
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: "file-loader",
          options: {
            name:
              argv.mode === "production"
                ? "images/image.[hash:6].[ext]"
                : "images/image.[name].[hash:6].[ext]",
          },
        },
        {
          test: [/\.woff2?$/, /\.ttf$/, /\.eot$/, /\.otf$/],
          loader: "file-loader",
          options: {
            name:
              argv.mode === "production"
                ? "fonts/font.[hash:6].[ext]"
                : "fonts/font.[name].[hash:6].[ext]",
          },
        },
      ],
    },
    // https://webpack.js.org/plugins/split-chunks-plugin/
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
          // css 파일을 하나로 묶음
          // https://github.com/webpack-contrib/mini-css-extract-plugin#extracting-all-css-in-a-single-file
          styles: {
            test: /\.css$/,
            name: "style",
            chunks: "all",
            enforce: true,
          },
        },
      },
    },
    // webpack output 설정
    // https://webpack.js.org/configuration/output/
    output: {
      filename:
        argv.mode === "production"
          ? "scripts/script.[hash:6].js"
          : "scripts/script.[name].[hash:6].js",
      chunkFilename:
        argv.mode === "production"
          ? "scripts/script.[chunkhash:6].js"
          : "scripts/script.[name].[chunkhash:6].js",
      path: path.resolve("./dist/"),
      publicPath: "/",
    },
    plugins: [
      // import 하는 파일 경로와 실제 파일명이 다르면 에러를 내 주는 플러그인
      // (macOS 파일시스템은 대소문자 구분을 하지 않아서, 작업한 결과물이 다른 파일시스템에서 문제가 생길 수 있다)
      // https://github.com/Urthen/case-sensitive-paths-webpack-plugin
      new CaseSensitivePathsPlugin(),
      // webpack 실행 시 변경이 있는 파일만 삭제해주는 플러그인
      // https://github.com/jackypan1989/del-webpack-plugin
      // * 주의: exclude 설정에 추가되지 않은 하위폴더는 빌드 완료 후 삭제된다 (!)
      new DelWebpackPlugin({
        info: true,
        exclude: ["fonts", "images", "scripts", "styles"],
      }),
      // 지정한 html 파일에 결과물 *.js 파일을 넣어주는 플러그인
      new HtmlWebpackPlugin({
        template: path.resolve("./src/index.html"),
      }),
      // mini-css-extract-plugin의 plugin 설정
      // css 파일을 묶어주는 플러그인. extract-text-webpack-plugin에서 css쪽만 분리됨
      // https://github.com/webpack-contrib/mini-css-extract-plugin
      new MiniCssExtractPlugin({
        filename: "styles/style.[hash:6].css",
        chunkFilename: "styles/style.[chunkhash:6].css",
      }),
      // typescript 타입 체크 플러그인
      // https://github.com/Realytics/fork-ts-checker-webpack-plugin
      new ForkTsCheckerWebpackPlugin({ async: false, formatter: "codeframe" }),
    ],
    resolve: {
      // alias 규칙을 사용하면 복잡한 상대경로를 사용하지 않아도 됩니다
      // ex) import {...} from "../../../src/components/Todo" -> import {...} from "@src/components/Todo"
      // * 주의: webpack은 잘 동작하여 빌드, 개발서버는 에러 없이 돌아가는데,
      //         vscode/linter는 jsconfig.json(for *.js), tsconfig.json(for *.ts)에 compileOptions.paths 설정을 추가해야 합니다
      alias: {
        "@assets": path.resolve("./assets"),
        "@src": path.resolve("./src"),
        // 🔥 version of React-DOM
        // https://github.com/gaearon/react-hot-loader#react--dom
        // https://github.com/hot-loader/react-dom
        "react-dom": "@hot-loader/react-dom",
      },
      // resolve.extensions에 선언된 확장자는 import 할 때 확장자명을 붙이지 않아도 됩니다
      // ex) import Person from "./Person.ts" -> import Person from "./Person"
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
  }

  switch (argv.mode) {
    case "development":
      webpackConfig.devServer = {
        compress: true,
        disableHostCheck: true,
        historyApiFallback: true,
        hot: true,
        host: "0.0.0.0",
        port: 8080,
      }
      webpackConfig.plugins = webpackConfig.plugins.filter(
        (plugin) =>
          !(plugin instanceof DelWebpackPlugin) &&
          !(plugin instanceof MiniCssExtractPlugin)
      )
      break
  }

  return webpackConfig
}
