import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import MainPage from "./pages/MainPage"

const Router: React.FunctionComponent = () => (
  <BrowserRouter>
    <header>Hello, React!</header>
    <Switch>
      <Route path="/" component={MainPage} />
    </Switch>
  </BrowserRouter>
)

export default Router
