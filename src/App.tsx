// https://babeljs.io/docs/en/babel-polyfill (🚨 As of Babel 7.4.0. babel-polyfill has been deprecated)
// https://github.com/zloirock/core-js (ECMAScript features)
// https://github.com/facebook/regenerator (to transpile generator functions)
import "core-js"
import "regenerator-runtime/runtime"

// https://github.com/github/fetch
import "whatwg-fetch"

import "./App.css"

import React from "react"
import { hot } from "react-hot-loader/root"

import { withRouter, Switch, Route } from "react-router"
import { BrowserRouter, Link } from "react-router-dom"

const Header = withRouter(props => (
  <nav>
    HEADER
    <ul>
      <li>
        <Link to="/">root</Link>
      </li>
      <li>
        <Link to="/hello">hello</Link>
      </li>
      <li>
        <button
          onClick={() => {
            props.history.push(`/${Date.now()}`)
          }}
        >
          go to Date.now()
        </button>
      </li>
    </ul>
  </nav>
))

const Router: React.FunctionComponent = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" render={() => <h1>ROOT</h1>} />
      <Route exact path="/hello" render={() => <h1>hello world</h1>} />
      <Route
        path="/"
        render={props => <h1>Not Found: {props.location.pathname}</h1>}
      />
    </Switch>
  </BrowserRouter>
)

const App: React.FunctionComponent = () => <Router />

export default hot(App)
