import * as path from "path"
import * as webpack from "webpack"

const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

export default (env: any, argv: Record<string, string>): webpack.Configuration => {
  const webpackConfig: webpack.Configuration = {
    entry: {
      app: path.resolve("./src/index.ts"),
    },
    mode: "production",
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.(jsx?|tsx?)$/,
          exclude: /node_modules/,
          loader: "eslint-loader",
        },
        {
          test: /\.(jsx?|tsx?)$/,
          loader: "babel-loader",
          exclude:
            argv.mode === "development"
              ? /node_modules/
              : /node_modules\/(core-js|regenerator-runtime)/,
          options: {
            rootMode: "root",
            plugins: [
              // React.lazy를 지원하기 위한 dynamic import 설정
              // https://reactjs.org/docs/code-splitting.html
              // https://babeljs.io/docs/en/next/babel-plugin-syntax-dynamic-import.html
              "@babel/plugin-syntax-dynamic-import",
              // react-hot-loader 사용
              // https://github.com/gaearon/react-hot-loader
              "react-hot-loader/babel",
            ],
            presets: [
              // 최신문법 트랜스파일 범위를 브라우저 버전이나 점유율을 이용하여 결정
              // https://babeljs.io/docs/en/babel-preset-env
              ["@babel/preset-env", { corejs: 3, useBuiltIns: "entry", targets: { ie: "11" } }],
              ["@babel/preset-react", { runtime: "automatic" }], // jsx 문법 지원
              "@babel/preset-typescript", // typescript 변환
            ],
          },
        },
        {
          test: /\.css$/,
          use: [
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
                ? "images/image.[contenthash:6].[ext]"
                : "images/image.[name].[contenthash:6].[ext]",
          },
        },
        {
          test: [/\.woff2?$/, /\.ttf$/, /\.eot$/, /\.otf$/],
          loader: "file-loader",
          options: {
            name:
              argv.mode === "production"
                ? "fonts/font.[contenthash:6].[ext]"
                : "fonts/font.[name].[contenthash:6].[ext]",
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
          ? "scripts/script.[contenthash:6].js"
          : "scripts/script.[name].[contenthash:6].js",
      chunkFilename:
        argv.mode === "production"
          ? "scripts/script.[contenthash:6].js"
          : "scripts/script.[name].[contenthash:6].js",
      path: path.resolve("./dist/"),
      // https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder
      clean: true,
    },
    plugins: [
      // import 하는 파일 경로와 실제 파일명이 다르면 에러를 내 주는 플러그인
      // (macOS 파일시스템은 대소문자 구분을 하지 않아서, 작업한 결과물이 다른 파일시스템에서 문제가 생길 수 있다)
      // https://github.com/Urthen/case-sensitive-paths-webpack-plugin
      new CaseSensitivePathsPlugin(),
      // 지정한 html 파일에 결과물 *.js 파일을 넣어주는 플러그인
      new HtmlWebpackPlugin({
        template: path.resolve("./src/index.html"),
      }),
      // mini-css-extract-plugin의 plugin 설정
      // css 파일을 묶어주는 플러그인. extract-text-webpack-plugin에서 css쪽만 분리됨
      // https://github.com/webpack-contrib/mini-css-extract-plugin
      new MiniCssExtractPlugin({
        filename: "styles/style.[contenthash:6].css",
        chunkFilename: "styles/style.[contenthash:6].css",
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
      return {
        ...webpackConfig,
        devServer: {
          compress: true,
          disableHostCheck: true,
          historyApiFallback: true,
          hot: true,
          host: "0.0.0.0",
          port: 8080,
        },
        plugins:
          webpackConfig.plugins instanceof Array
            ? webpackConfig.plugins.filter((plugin) => !(plugin instanceof MiniCssExtractPlugin))
            : undefined,
      } as webpack.Configuration
  }

  return webpackConfig
}
