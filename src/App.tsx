import "@assets/stylesheet.css"

import React from "react"
import { setConfig } from "react-hot-loader"
import { hot } from "react-hot-loader/root"

import Router from "./Router"

const App: React.FunctionComponent = () => <Router />
setConfig({ logLevel: "none" })

export default hot(App)
