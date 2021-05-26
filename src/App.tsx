import "./App.css"

import { FunctionComponent, lazy, Suspense } from "react"
import { hot } from "react-hot-loader/root"
import { withRouter, Switch, Route } from "react-router"
import { BrowserRouter, Link } from "react-router-dom"

const CardListLazy = lazy(() => import(/*webpackChunkName: "CardList" */ "./CardList"))

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
        <Link to="/card-list">card-list</Link>
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

const Router: FunctionComponent = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" render={() => <h1>ROOT</h1>} />
      <Route exact path="/hello" render={() => <h1>hello world</h1>} />
      <Route exact path="/card-list">
        <Suspense fallback={null}>
          <CardListLazy />
        </Suspense>
      </Route>
      <Route path="/" render={(props) => <h1>Not Found: {props.location.pathname}</h1>} />
    </Switch>
  </BrowserRouter>
)

const App: FunctionComponent = () => <Router />

export default hot(App)
