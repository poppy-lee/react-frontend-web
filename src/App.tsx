// https://github.com/github/fetch
import "whatwg-fetch"

import "./App.css"

import React from "react"
import { hot } from "react-hot-loader/root"

import { withRouter, Switch, Route } from "react-router"
import { BrowserRouter, Link } from "react-router-dom"

const Header = withRouter((props) => (
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
        render={(props) => <h1>Not Found: {props.location.pathname}</h1>}
      />
    </Switch>
  </BrowserRouter>
)

const App: React.FunctionComponent = () => <Router />

export default hot(App)
