// https://babeljs.io/docs/en/babel-polyfill (🚨 As of Babel 7.4.0. babel-polyfill has been deprecated)
// https://github.com/zloirock/core-js (ECMAScript features)
// https://github.com/facebook/regenerator (to transpile generator functions)
import "core-js"
import "regenerator-runtime/runtime"

// https://github.com/github/fetch
import "whatwg-fetch"

import "@assets/stylesheet.css"

import React from "react"
import { setConfig } from "react-hot-loader"
import { hot } from "react-hot-loader/root"

import Router from "./Router"

const App: React.FunctionComponent = () => <Router />
setConfig({ logLevel: "none" })

export default hot(App)
