const path = require("path")

const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin")
const DelWebpackPlugin = require("del-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: {
    app: [
      // @babel/polyfill을 포함하는 다양한 방법이 있는데, 아래 글을 읽어보고 적합한 형태로 사용하면 됩니다
      // https://babeljs.io/docs/en/babel-polyfill
      "@babel/polyfill",
      // @babel/polyfill에 포함되지 않은 polyfill들
      "whatwg-fetch", // https://github.com/github/fetch
      "whatwg-url", // https://github.com/jsdom/whatwg-url
      path.resolve("./src/index.ts"),
    ],
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        loader: "babel-loader",
        options: {
          plugins: [
            // class constructor 내부가 아니어도 멤버변수의 초기화 및 대입이 가능하게 됩니다
            // constructor에서 bind를 해줘야하는 메소드 대신, 멤버변수에 arrow function을 대입하면 bind가 필요 없어집니다
            // https://babeljs.io/docs/en/next/babel-plugin-proposal-class-properties.html
            ["@babel/plugin-proposal-class-properties", { loose: true }],
            // React.lazy를 지원하기 위한 dynamic import 설정
            // https://reactjs.org/docs/code-splitting.html
            // https://babeljs.io/docs/en/next/babel-plugin-syntax-dynamic-import.html
            "@babel/plugin-syntax-dynamic-import",
          ],
          presets: [
            // 최신문법 트랜스파일 범위를 브라우저 버전이나 점유율을 이용하여 결정
            // https://babeljs.io/docs/en/babel-preset-env
            ["@babel/preset-env", { targets: { ie: "11" } }],
            "@babel/preset-typescript", // typescript 변환
            "@babel/preset-react", // jsx 문법 지원
          ],
        },
      },
      // mini-css-extract-plugin의 loader 설정
      // https://github.com/webpack-contrib/mini-css-extract-plugin
      {
        test: /\.css$/,
        loaders: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "file-loader",
        options: { name: "images/image.[hash:6].[ext]" },
      },
      {
        test: [/\.woff2?$/, /\.ttf$/, /\.eot$/, /\.otf$/],
        loader: "file-loader",
        options: { name: "fonts/font.[hash:6].[ext]" },
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
    filename: "scripts/script.[hash:6].js",
    chunkFilename: "scripts/script.[chunkhash:6].js",
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
    new HtmlWebpackPlugin({ template: "./index.html" }),
    // mini-css-extract-plugin의 plugin 설정
    // css 파일을 묶어주는 플러그인. extract-text-webpack-plugin에서 css쪽만 분리됨
    // https://github.com/webpack-contrib/mini-css-extract-plugin
    new MiniCssExtractPlugin({
      filename: "styles/style.[hash:6].css",
      chunkFilename: "styles/style.[chunkhash:6].css",
    }),
  ],
  resolve: {
    // alias 규칙을 사용하면 복잡한 상대경로를 사용하지 않아도 됩니다
    // ex) import {...} from "../../../src/components/Todo" -> import {...} from "@src/components/Todo"
    // * 주의: webpack은 잘 동작하여 빌드, 개발서버는 에러 없이 돌아가는데,
    //         vscode/linter는 jsconfig.json(for *.js), tsconfig.json(for *.ts)에 compileOptions.paths 설정을 추가해야 합니다
    alias: {
      "@assets": path.resolve("./assets"),
      "@src": path.resolve("./src"),
    },
    // resolve.extensions에 선언된 확장자는 import 할 때 확장자명을 붙이지 않아도 됩니다
    // ex) import Person from "./Person.ts" -> import Person from "./Person"
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
}
